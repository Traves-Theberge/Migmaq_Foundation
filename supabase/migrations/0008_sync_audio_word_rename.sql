-- Fixes a gap found in a follow-up audit: audio_recordings.word is
-- intentionally not a foreign key to dictionary_words (0001's design note
-- — recordings can exist for lesson phrases that aren't standalone
-- headwords), but that means renaming a dictionary word in the admin CMS
-- (app/admin/dictionary/actions.ts lets `word` be edited) silently orphaned
-- every audio_recordings row that matched the old spelling, with no error
-- and no signal anywhere that playback for that word just broke.
--
-- Fixed by keeping them in sync automatically: when dictionary_words.word
-- changes, cascade the same rename to any audio_recordings rows that
-- exactly matched the old value. Recordings tied to lesson phrases (not a
-- dictionary headword) never match any dictionary_words.word to begin
-- with, so this can't affect them.

create function sync_audio_recordings_word() returns trigger as $$
begin
  if new.word is distinct from old.word then
    update audio_recordings set word = new.word where word = old.word;
  end if;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger dictionary_words_sync_audio_word
  after update on dictionary_words
  for each row execute function sync_audio_recordings_word();
