-- Two missing indexes found in a follow-up audit, both matching real query
-- patterns already in the admin CMS:
--
--   * dictionary_words.fr_reviewed is filtered on nearly every admin page
--     load (Home dashboard, Dictionary list, the sidebar nav-count query)
--     via `.eq('fr_reviewed', false).not('fr_definitions', 'is', null)`,
--     with no index — a sequential scan every time. A partial index
--     matching that exact predicate (only rows that actually have an FR
--     translation) is smaller and more targeted than an index on the
--     whole boolean column would be.
--   * audio_recordings.word is searched with a leading-wildcard
--     `.ilike('word', '%q%')` on /admin/audio — the existing
--     audio_recordings_word_idx (plain btree, 0001) can't serve that
--     pattern at all, unlike dictionary_words_word_trgm_idx (already
--     gin_trgm_ops for the same reason). Mirrors that existing index.

create index dictionary_words_fr_unreviewed_idx on dictionary_words (fr_reviewed)
  where fr_definitions is not null;

create index audio_recordings_word_trgm_idx on audio_recordings using gin (word gin_trgm_ops);
