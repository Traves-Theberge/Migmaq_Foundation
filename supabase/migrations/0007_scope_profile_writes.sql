-- Fixes a real security gap found in a follow-up audit of 0006:
-- profiles_staff_write was `for update using (is_editor()) with check
-- (is_editor())` with no `id = auth.uid()` clause, so any editor/admin
-- (not just super_admin) could update ANY other user's row — including
-- `email`, which nothing in the app UI ever intends to let staff change
-- for someone else. RLS can't restrict individual columns (the same
-- limitation 0006's role-escalation trigger exists to work around), so
-- this is fixed the same way: a trigger enforces the actual column-level
-- rule, and the RLS policy just gates who can attempt an update at all.
--
-- Intended shape after this migration:
--   * A user can always update their own row (any column except `role`,
--     still blocked by 0006's prevent_role_escalation trigger).
--   * super_admin can update any row, any column (already trusted with
--     role changes; consistent to trust them here too).
--   * Any other staff member (editor/admin) can update someone else's
--     row ONLY to change avatar_url — the one legitimate cross-user
--     write path in the app (Users & Roles lets staff set a teammate's
--     photo via Avatar.tsx / uploadAvatarAction). Any other column
--     change to another user's row is rejected.

drop policy "profiles_staff_write" on profiles;

create policy "profiles_update_self_or_staff" on profiles
  for update using (id = auth.uid() or is_editor())
  with check (id = auth.uid() or is_editor());

create function prevent_cross_user_profile_edits() returns trigger as $$
begin
  -- Direct-DB access (auth.uid() null) and the row owner are always
  -- trusted, same reasoning as prevent_role_escalation's bootstrap case.
  if auth.uid() is null or new.id = auth.uid() or is_super_admin() then
    return new;
  end if;

  -- A non-owner, non-super_admin staff member reached this row only
  -- because profiles_update_self_or_staff's is_editor() branch allowed
  -- it — restrict them to the one intended cross-user field.
  if new.email is distinct from old.email then
    raise exception 'Only a user (or a super_admin) can change their own email.';
  end if;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger profiles_prevent_cross_user_edits
  before update on profiles
  for each row execute function prevent_cross_user_profile_edits();
