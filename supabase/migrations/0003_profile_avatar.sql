-- Profile photo support. Storage bucket + upload policies are set up in
-- 0004_avatar_storage.sql; this just adds the column the admin UI reads/
-- writes. Null falls back to the org logo in the UI.
alter table profiles add column avatar_url text;
