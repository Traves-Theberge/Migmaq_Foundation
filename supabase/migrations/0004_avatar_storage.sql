-- Storage bucket for admin user profile photos. Public read (so <img> tags
-- work without signed URLs); writes restricted to staff (admin/editor),
-- covering both "upload your own photo" and "an admin changes someone
-- else's photo" from the Users & Roles screen — a single is_editor() gate
-- rather than a per-user-folder policy, since only staff ever touch this
-- bucket at all.

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "avatar_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "avatar_staff_write" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and public.is_editor());

create policy "avatar_staff_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and public.is_editor());

create policy "avatar_staff_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and public.is_editor());
