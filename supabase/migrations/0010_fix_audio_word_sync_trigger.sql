-- Hardens 0008's sync_audio_recordings_word trigger, prompted by a
-- follow-up audit that raised a same-statement multi-row interleaving
-- concern: could a single UPDATE that swaps/chains two dictionary_words
-- values (e.g. word A -> B and word B -> C in one statement) cause the old
-- AFTER UPDATE FOR EACH ROW trigger's per-row cascades to interfere with
-- each other and merge two different words' audio recordings?
--
-- Verified against a local Postgres stub that this specific exploit is
-- NOT actually reachable: dictionary_words.word has a plain (non-
-- deferrable) `unique` constraint, so any single UPDATE statement that
-- would momentarily need two rows to hold the same word value — which is
-- required for the interleaving to matter — fails with a duplicate-key
-- violation before the trigger's cascade logic ever runs (tested both a
-- direct swap and a same-statement chain rename; both correctly rejected
-- by Postgres before this trigger fires).
--
-- Switched anyway to a single AFTER UPDATE FOR EACH STATEMENT trigger with
-- transition tables — not a fix for a reachable bug, but strictly better
-- practice: one trigger firing per statement instead of one per row (real
-- savings on a bulk update), and it removes any future dependency on the
-- word-uniqueness constraint being what keeps this safe.



drop trigger dictionary_words_sync_audio_word on dictionary_words;
drop function sync_audio_recordings_word();

create function sync_audio_recordings_word() returns trigger as $$
begin
  update audio_recordings a
  set word = n.word
  from old_table o
  join new_table n on n.id = o.id
  where a.word = o.word and o.word is distinct from n.word;
  return null;
end;
$$ language plpgsql security definer set search_path = public;

create trigger dictionary_words_sync_audio_word
  after update on dictionary_words
  referencing old table as old_table new table as new_table
  for each statement execute function sync_audio_recordings_word();
