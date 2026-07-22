-- Tracks whether a human has confirmed the machine-translated French fields
-- are accurate — distinct from merely having fr_definitions/fr_translations
-- populated. The admin's "reviewed" toggle flips this; the public dictionary
-- page's "machine-translated, unreviewed" disclaimer is keyed off it.
alter table dictionary_words add column fr_reviewed boolean not null default false;
