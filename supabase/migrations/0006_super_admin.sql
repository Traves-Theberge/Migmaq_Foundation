-- Adds a super_admin tier above admin/editor. Two things super_admin
-- uniquely gets: (1) the /admin/api-docs (Swagger) link in the sidebar,
-- gated in application code, not RLS — API docs aren't a database
-- resource; (2) the ability to grant/revoke admin and super_admin roles,
-- which regular admins should NOT be able to do to themselves or anyone
-- else (privilege escalation).

alter type app_role add value 'super_admin';

-- Postgres will not let a newly-added enum value be referenced anywhere
-- (a function body, a `role in (...)` list) within the same transaction
-- that added it — everything below uses 'super_admin', so the ADD VALUE
-- above must commit first. Confirmed via `supabase start` against a real
-- local stack: without this commit, applying this file fails with
-- "unsafe use of new value \"super_admin\" of enum type app_role
-- (SQLSTATE 55P04)". (If this statement ever fails partway after the
-- commit — unlikely, everything below is DDL with no external
-- dependency — the enum value itself would still be permanently added on
-- retry; `alter type app_role add value 'super_admin'` is safe to leave
-- as-is since re-running this whole file addresses that by re-applying
-- the rest against the now-committed enum value.)
commit;

-- is_editor() already gates all content-table writes; super_admin must
-- pass that check too (a super_admin who can't edit the dictionary would
-- be a strange product decision), so it's redefined to include the new
-- value rather than adding a parallel is_super_admin()-only content gate.
create or replace function is_editor() returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'editor', 'super_admin')
  );
$$ language sql stable security definer set search_path = public;

create function is_super_admin() returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'super_admin'
  );
$$ language sql stable security definer set search_path = public;

-- RLS's per-row USING/WITH CHECK can't restrict a single column, so the
-- "only super_admin can change roles" rule needs a trigger: any UPDATE
-- that changes profiles.role is rejected unless the actor is super_admin
-- (this also blocks a user from promoting themselves).
create function prevent_role_escalation() returns trigger as $$
begin
  -- auth.uid() is null for direct-DB access (SQL editor, service-role key,
  -- migration scripts) — a trusted context that already has full control
  -- regardless of this trigger, and the only way to bootstrap the very
  -- first super_admin (nobody starts as one, so gating on is_super_admin()
  -- alone would permanently lock out that first promotion). Only an
  -- authenticated end-user session is required to already be super_admin.
  if new.role is distinct from old.role and auth.uid() is not null and not is_super_admin() then
    raise exception 'Only a super_admin can change a user''s role.';
  end if;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger profiles_prevent_role_escalation
  before update on profiles
  for each row execute function prevent_role_escalation();

-- profiles_staff_write policy (RLS "for all" on profiles) doesn't exist yet
-- in 0001 — profiles only had a select policy — so add write access for
-- staff here, now that the trigger above makes role changes safe to allow
-- at the RLS layer for admin/editor too (the trigger rejects the role
-- column specifically; editors can still update other future profile
-- columns like a display name).
create policy "profiles_staff_write" on profiles
  for update using (is_editor()) with check (is_editor());
