-- Audit logging + created_by/updated_by tracking for admin-editable content.
--
-- Design:
--   * A single generic audit_log table captures every insert/update/delete
--     on every content table via one trigger function attached everywhere,
--     rather than a bespoke history table per content type — one place to
--     query "what changed" across dictionary/lessons/books/audio/roles.
--   * Every content table in 0001 uses either `id` or `slug` as its primary
--     key column name, so the trigger can extract record_id generically
--     with a single coalesce — no per-table special-casing needed.
--   * The trigger function is SECURITY DEFINER so it can always write to
--     audit_log regardless of the calling user's own grants — audit_log
--     itself has no direct-write policy for anyone.
--   * created_by/updated_by are added directly on the four "parent" record
--     tables (dictionary_words, lesson_categories, lessons, books) for a
--     cheap "last touched by" display in list views, without querying
--     audit_log. Child rows (usages, steps, pages, recordings) rely on
--     audit_log alone for history — they're always edited as part of their
--     parent's form, not as standalone records in a list.

create table audit_log (
  id uuid primary key default gen_random_uuid(),
  table_name text not null,
  record_id text not null,
  action text not null check (action in ('insert', 'update', 'delete')),
  actor_id uuid references profiles (id) on delete set null,
  actor_email text,
  diff jsonb not null,
  created_at timestamptz not null default now()
);

create index audit_log_table_record_idx on audit_log (table_name, record_id, created_at desc);
create index audit_log_actor_idx on audit_log (actor_id, created_at desc);
create index audit_log_created_at_idx on audit_log (created_at desc);

alter table audit_log enable row level security;

-- Staff can read; nobody (not even staff) can write directly — all writes
-- happen through the trigger function below, which bypasses RLS via
-- SECURITY DEFINER.
create policy "audit_log_staff_read" on audit_log for select using (is_editor());

create function audit_log_capture() returns trigger as $$
declare
  v_record_id text;
  v_actor_email text;
begin
  v_record_id := coalesce(
    (case when TG_OP = 'DELETE' then to_jsonb(old) else to_jsonb(new) end) ->> 'id',
    (case when TG_OP = 'DELETE' then to_jsonb(old) else to_jsonb(new) end) ->> 'slug'
  );

  select email into v_actor_email from profiles where id = auth.uid();

  insert into audit_log (table_name, record_id, action, actor_id, actor_email, diff)
  values (
    TG_TABLE_NAME,
    v_record_id,
    lower(TG_OP),
    auth.uid(),
    v_actor_email,
    case TG_OP
      when 'INSERT' then jsonb_build_object('new', to_jsonb(new))
      when 'UPDATE' then jsonb_build_object('old', to_jsonb(old), 'new', to_jsonb(new))
      when 'DELETE' then jsonb_build_object('old', to_jsonb(old))
    end
  );

  return coalesce(new, old);
end;
$$ language plpgsql security definer set search_path = public;

create trigger audit_dictionary_words after insert or update or delete on dictionary_words
  for each row execute function audit_log_capture();
create trigger audit_dictionary_word_usages after insert or update or delete on dictionary_word_usages
  for each row execute function audit_log_capture();
create trigger audit_lesson_categories after insert or update or delete on lesson_categories
  for each row execute function audit_log_capture();
create trigger audit_lessons after insert or update or delete on lessons
  for each row execute function audit_log_capture();
create trigger audit_lesson_steps after insert or update or delete on lesson_steps
  for each row execute function audit_log_capture();
create trigger audit_books after insert or update or delete on books
  for each row execute function audit_log_capture();
create trigger audit_book_pages after insert or update or delete on book_pages
  for each row execute function audit_log_capture();
create trigger audit_audio_recordings after insert or update or delete on audio_recordings
  for each row execute function audit_log_capture();
-- Role changes are security-relevant, so profiles gets audited too.
create trigger audit_profiles after insert or update or delete on profiles
  for each row execute function audit_log_capture();

-- ── created_by / updated_by on the four "parent" record tables ─────────────

alter table dictionary_words add column created_by uuid references profiles (id) on delete set null default auth.uid();
alter table dictionary_words add column updated_by uuid references profiles (id) on delete set null;

alter table lesson_categories add column created_by uuid references profiles (id) on delete set null default auth.uid();
alter table lesson_categories add column updated_by uuid references profiles (id) on delete set null;

alter table lessons add column created_by uuid references profiles (id) on delete set null default auth.uid();
alter table lessons add column updated_by uuid references profiles (id) on delete set null;

alter table books add column created_by uuid references profiles (id) on delete set null default auth.uid();
alter table books add column updated_by uuid references profiles (id) on delete set null;

-- Replaces the 0001 version: same updated_at behavior, plus stamps updated_by.
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  new.updated_by = auth.uid();
  return new;
end;
$$ language plpgsql;
