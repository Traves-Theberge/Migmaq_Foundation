-- Migmaq Foundation — initial Supabase schema
--
-- Mirrors the four content areas currently authored as static files
-- (public/assets/dictionary.json, lib/lessons/**, lib/books/**,
-- public/assets/audio-manifest.json) plus an admin role table.
--
-- Design notes (see accompanying write-up for the full rationale):
--   * usages and lesson_steps are normalized into child tables (not jsonb)
--     so the admin UI can add/remove/reorder individual rows cleanly.
--   * book pages/lines and gloss_overrides stay as jsonb — richly nested,
--     no relational access pattern needed.
--   * `dictionary_word_usages.migmaq` replaces the legacy `Usage.translation`
--     field name (which actually holds the Mi'gmaq sentence, not a
--     translation) — the data-access layer maps this back to `translation`
--     so existing app code and types are unaffected.
--   * audio_recordings.word is intentionally NOT a foreign key to
--     dictionary_words — recordings may exist for lesson phrases that
--     aren't standalone dictionary headwords.

create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create type app_role as enum ('admin', 'editor');
create type lesson_difficulty as enum ('beginner', 'intermediate', 'advanced');
create type lesson_step_type as enum ('vocabulary', 'phrase', 'info');
create type recording_kind as enum ('word', 'example');

create function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ── Admin roles ──────────────────────────────────────────────────────────

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role app_role not null default 'editor',
  created_at timestamptz not null default now()
);

-- Every new Supabase Auth signup gets a matching profiles row (defaulting
-- to 'editor') — without this, nothing ever inserts into profiles, so
-- is_editor() below would be false for everyone, including the intended
-- admin.
create function handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Bootstrapping the first admin: sign up once via Supabase Auth (this
-- creates their profiles row as 'editor' via the trigger above), then in
-- the SQL editor run
--   update profiles set role = 'admin' where email = 'you@example.com';
-- Role changes after that can be done by an admin through the app.

-- ── Dictionary ───────────────────────────────────────────────────────────

create table dictionary_words (
  id uuid primary key default gen_random_uuid(),
  word text not null unique,
  type text,
  definitions text[] not null default '{}',
  translations text[] not null default '{}',
  fr_definitions text[],
  fr_translations text[],
  pronunciation_guide text,
  alternate_forms text[],
  document_references text[],
  entry_url text,
  -- Not a GENERATED column: to_tsvector(regconfig, text) is STABLE, not
  -- IMMUTABLE, so Postgres rejects it in a generated-column expression.
  -- Maintained instead by the trigger below.
  search_vector tsvector,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index dictionary_words_search_idx on dictionary_words using gin (search_vector);
create index dictionary_words_word_trgm_idx on dictionary_words using gin (word gin_trgm_ops);

create trigger dictionary_words_set_updated_at
  before update on dictionary_words
  for each row execute function set_updated_at();

create function dictionary_words_search_vector_update() returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('simple', coalesce(new.word, '')), 'A') ||
    setweight(to_tsvector('simple', array_to_string(coalesce(new.definitions, '{}'), ' ')), 'B') ||
    setweight(to_tsvector('simple', array_to_string(coalesce(new.translations, '{}'), ' ')), 'B');
  return new;
end;
$$ language plpgsql;

create trigger dictionary_words_search_vector_trigger
  before insert or update on dictionary_words
  for each row execute function dictionary_words_search_vector_update();

create table dictionary_word_usages (
  id uuid primary key default gen_random_uuid(),
  word_id uuid not null references dictionary_words (id) on delete cascade,
  sort_order int not null default 0,
  migmaq text not null,
  english text not null,
  french text
);

create index dictionary_word_usages_word_id_idx on dictionary_word_usages (word_id, sort_order);

-- ── Lessons ──────────────────────────────────────────────────────────────

create table lesson_categories (
  id text primary key,
  title text not null,
  description text,
  icon text,
  color text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger lesson_categories_set_updated_at
  before update on lesson_categories
  for each row execute function set_updated_at();

create table lessons (
  id text primary key,
  category_id text not null references lesson_categories (id) on delete cascade,
  title text not null,
  description text,
  difficulty lesson_difficulty not null default 'beginner',
  estimated_minutes int,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index lessons_category_id_idx on lessons (category_id, sort_order);

create trigger lessons_set_updated_at
  before update on lessons
  for each row execute function set_updated_at();

create table lesson_steps (
  id uuid primary key default gen_random_uuid(),
  lesson_id text not null references lessons (id) on delete cascade,
  sort_order int not null default 0,
  type lesson_step_type not null,
  term text,
  translation text,
  pronunciation text,
  description text,
  constraint lesson_steps_shape check (
    (type = 'info' and description is not null and term is null and translation is null)
    or
    (type in ('vocabulary', 'phrase') and term is not null and translation is not null)
  )
);

create index lesson_steps_lesson_id_idx on lesson_steps (lesson_id, sort_order);

-- ── Storybooks ───────────────────────────────────────────────────────────

create table books (
  slug text primary key,
  title jsonb not null,
  subtitle text not null,
  teaser text,
  cover_image_alt text,
  cover_image_url text,
  note text,
  gloss_overrides jsonb not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger books_set_updated_at
  before update on books
  for each row execute function set_updated_at();

create table book_pages (
  id uuid primary key default gen_random_uuid(),
  book_slug text not null references books (slug) on delete cascade,
  sort_order int not null default 0,
  label text not null,
  lines jsonb not null default '[]',
  image_alt text not null,
  image_url text,
  unique (book_slug, sort_order)
);

create index book_pages_book_slug_idx on book_pages (book_slug, sort_order);

-- ── Audio ────────────────────────────────────────────────────────────────

create table audio_recordings (
  id uuid primary key default gen_random_uuid(),
  word text not null,
  file text not null unique,
  speaker text not null,
  kind recording_kind not null,
  url text not null,
  created_at timestamptz not null default now()
);

create index audio_recordings_word_idx on audio_recordings (word);

-- ── Row Level Security ───────────────────────────────────────────────────

create function is_editor() returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$ language sql stable security definer set search_path = public;

alter table profiles enable row level security;
alter table dictionary_words enable row level security;
alter table dictionary_word_usages enable row level security;
alter table lesson_categories enable row level security;
alter table lessons enable row level security;
alter table lesson_steps enable row level security;
alter table books enable row level security;
alter table book_pages enable row level security;
alter table audio_recordings enable row level security;

-- profiles: a user reads their own row; editors/admins can read all
create policy "profiles_select_own_or_staff" on profiles
  for select using (id = auth.uid() or is_editor());

-- content tables: public read, editor/admin write
create policy "dictionary_words_public_read" on dictionary_words for select using (true);
create policy "dictionary_words_staff_write" on dictionary_words for all
  using (is_editor()) with check (is_editor());

create policy "dictionary_word_usages_public_read" on dictionary_word_usages for select using (true);
create policy "dictionary_word_usages_staff_write" on dictionary_word_usages for all
  using (is_editor()) with check (is_editor());

create policy "lesson_categories_public_read" on lesson_categories for select using (true);
create policy "lesson_categories_staff_write" on lesson_categories for all
  using (is_editor()) with check (is_editor());

create policy "lessons_public_read" on lessons for select using (true);
create policy "lessons_staff_write" on lessons for all
  using (is_editor()) with check (is_editor());

create policy "lesson_steps_public_read" on lesson_steps for select using (true);
create policy "lesson_steps_staff_write" on lesson_steps for all
  using (is_editor()) with check (is_editor());

create policy "books_public_read" on books for select using (true);
create policy "books_staff_write" on books for all
  using (is_editor()) with check (is_editor());

create policy "book_pages_public_read" on book_pages for select using (true);
create policy "book_pages_staff_write" on book_pages for all
  using (is_editor()) with check (is_editor());

create policy "audio_recordings_public_read" on audio_recordings for select using (true);
create policy "audio_recordings_staff_write" on audio_recordings for all
  using (is_editor()) with check (is_editor());
