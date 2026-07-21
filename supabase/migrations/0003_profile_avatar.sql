-- Profile photo support. Storage bucket + upload policies are set up
-- separately (see docs/admin-setup.md); this just adds the column the
-- admin UI reads/writes. Null falls back to the org logo in the UI.
alter table profiles add column avatar_url text;
