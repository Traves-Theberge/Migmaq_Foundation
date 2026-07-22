# Data Model

The source of truth for the schema is `supabase/migrations/*.sql`, applied in order. This document is a
navigable map on top of that: every table, its columns, its Postgres-enforced rules (constraints, RLS,
triggers), and the Zod schema(s) and API route(s)/Server Action(s) that read or write it. When the two
disagree, the migrations win — update this file to match, not the other way around.

Two independent content surfaces exist and this doc covers only the second:
- **Static JSON/TS** (`public/assets/dictionary.json`, `public/assets/audio-manifest.json`, `lib/lessons/**`,
  `lib/books/**`) — the original source content, still what the *public* site's read paths use directly.
- **Supabase Postgres** (this document) — the CMS's live store. `npm run data:migrate-to-supabase` is the
  one-time bridge that loads the static content into these tables.

## Conventions used below

- **RLS** — every table has `row level security` enabled; "Read" / "Write" describe the effective policy.
  `is_editor()` is true for `editor`, `admin`, and `super_admin` roles; `is_super_admin()` is true only for
  `super_admin`.
- **Audit** — tables with a trigger into `audit_log` (migration `0002`) are marked ✅. Every insert/update/delete
  is captured there regardless of which client (admin UI, script, SQL editor) made the change.
- **Zod schema** column links each table to the runtime-validated shape(s) in `lib/validation/**`. Two shapes
  commonly exist for one table: an **OpenAPI-documented** response schema (public API JSON contract) and a
  **form schema** (admin Server Action input — not part of the OpenAPI spec, since Server Action form posts
  aren't a stable external HTTP contract).

## Entity relationship overview

```
auth.users (Supabase-managed)
  └─ profiles (1:1, role: editor|admin|super_admin)
       └─ audit_log.actor_id (1:many)

dictionary_words (word, definitions[], translations[], fr_*, ...)
  └─ dictionary_word_usages (many:1, cascade delete)
  ⇢ audio_recordings.word (soft link by value, kept in sync by trigger — not a FK)

lesson_categories (id: text slug)
  └─ lessons (many:1, cascade delete)
       └─ lesson_steps (many:1, cascade delete)

books (slug: text PK)
  └─ book_pages (many:1, cascade delete, unique per (book_slug, sort_order))

audio_recordings (word: text, file: text unique) — standalone; word may or may not
  match a dictionary_words.word (lesson-phrase recordings have no headword)

audit_log — generic append-only log, one row per insert/update/delete on any
  audited table above, written only via SECURITY DEFINER trigger (no direct
  write policy for anyone, including staff)

storage.buckets['avatars'] — profiles.avatar_url points here (public read,
  staff write)
```

## Tables

### `profiles`

Mirrors `auth.users` 1:1 (auto-created by the `handle_new_user` trigger on signup, defaulting to `editor`).

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | `references auth.users(id) on delete cascade` |
| `email` | `text` | Denormalized copy of the auth email for display/audit without a join |
| `role` | `app_role` enum | `editor` \| `admin` \| `super_admin` (0006 added `super_admin`) |
| `avatar_url` | `text` | Nullable; points into the `avatars` storage bucket (0003/0004) |
| `created_at` | `timestamptz` | |

- **Read**: own row, or any staff (`is_editor()`) row.
- **Write**: own row (any column except `role`), or any staff member may update someone else's row but
  **only** `avatar_url` (enforced by the `prevent_cross_user_profile_edits` trigger, 0007). `role` changes on
  *any* row require `super_admin` (`prevent_role_escalation` trigger, 0006) — this is the actual privilege
  boundary; RLS alone can't restrict individual columns, so both are trigger-enforced.
- **Audit**: ✅ (role changes are security-relevant, so `profiles` is audited too, unlike other user-facing
  metadata tables).
- **Zod**: `lib/validation/users.ts` (`UpdateUserRoleSchema` — form input for `/admin/users`' role dropdown).
  No OpenAPI schema; profiles are never exposed over `/api/**`.
- **Consumers**: `app/admin/users/actions.ts` (`updateUserRoleAction`), `app/admin/actions.ts`
  (`uploadAvatarAction`), `lib/supabase/auth.ts` (role checks throughout the admin layout/pages).

### `dictionary_words`

The CMS-editable mirror of `public/assets/dictionary.json`'s ~7,000 headwords.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `word` | `text` unique, not null | The headword. Renaming cascades to `audio_recordings.word` (0008/0010, see below). |
| `type` | `text` | e.g. `"noun inanimate"` |
| `definitions` | `text[]` not null | |
| `translations` | `text[]` not null | |
| `fr_definitions`, `fr_translations` | `text[]` nullable | Machine-translated French |
| `fr_reviewed` | `boolean` not null, default `false` | Whether a human confirmed the FR fields (0005) — distinct from merely having FR content |
| `pronunciation_guide` | `text` | |
| `alternate_forms` | `text[]` | Inflected/alternate spellings; resolved against other headwords at read time (`resolveAlternateForms`) |
| `document_references` | `text[]` | |
| `entry_url` | `text` | |
| `search_vector` | `tsvector` | Maintained by trigger, not `GENERATED` (its expression is `STABLE` not `IMMUTABLE`) — weighted A (word) / B (definitions, translations) |
| `created_at`, `updated_at` | `timestamptz` | `updated_at` auto-stamped by `set_updated_at()` |
| `created_by`, `updated_by` | `uuid` → `profiles(id) on delete set null` | Added in 0002 for cheap "last touched by" display |

- **Indexes**: GIN on `search_vector`; GIN trigram on `word` (fuzzy/`ilike` search); partial index on
  `fr_reviewed` where `fr_definitions is not null` (0009 — matches the admin dashboard's actual filter).
- **Read**: public (`using (true)`).
- **Write**: staff (`is_editor()`).
- **Audit**: ✅
- **Side effect**: renaming `word` cascades to every `audio_recordings` row that matched the old spelling
  (statement-level trigger, 0008 → hardened in 0010 — see `audio_recordings` below).
- **Zod (OpenAPI)**: `DictionaryEntrySchema` / `DictionaryListResponseSchema` / `WordDetailsResponseSchema`
  in `lib/validation/dictionary.ts` — backs `GET /api/dictionary` and `GET /api/word-details`.
- **Zod (form)**: `DictionaryWordFormSchema`, `DictionaryWordIdSchema` in `lib/validation/admin-dictionary.ts`.
- **Consumers**: `app/admin/dictionary/actions.ts`, `app/admin/dictionary/**` pages, `app/api/dictionary/route.ts`,
  `app/api/word-details/route.ts`, `app/api/admin/search/route.ts`.

### `dictionary_word_usages`

Example sentences for a word — normalized (not `jsonb`) so the admin UI can add/remove/reorder rows.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `word_id` | `uuid` → `dictionary_words(id) on delete cascade` | |
| `sort_order` | `int` default `0` | |
| `migmaq` | `text` not null | The Mi'gmaq sentence. Named `migmaq`, not `translation` — the legacy static-JSON field was misleadingly named `Usage.translation` even though it holds the Mi'gmaq text; the data-access layer maps this column back to `translation` in the app's TS types so existing code/UI is unaffected. |
| `english` | `text` not null | |
| `french` | `text` nullable | |

- **Read**: public. **Write**: staff. **Audit**: ✅
- **Zod (OpenAPI)**: `WordUsageSchema` (inline in `DictionaryEntrySchema`, `lib/validation/dictionary.ts`).
- **Zod (form)**: `DictionaryWordUsagesFormSchema` in `lib/validation/admin-dictionary.ts` — client serializes
  the full set as JSON; a save replaces all of a word's usages (delete + reinsert) rather than diffing, since
  there are only ever a handful per word.
- **Consumers**: `app/admin/dictionary/actions.ts`, `components/admin/UsagesEditor.tsx`.

### `lesson_categories`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `text` PK | Slug, e.g. `basics` |
| `title`, `description`, `icon`, `color` | `text` | |
| `sort_order` | `int` default `0` | |
| `created_at`, `updated_at`, `created_by`, `updated_by` | | Same pattern as `dictionary_words` |

- **Read**: public. **Write**: staff. **Audit**: ✅. Deleting a category cascades to every `lessons` row in
  it (and transitively every `lesson_steps` row) — the admin UI warns before this (`app/admin/lessons/**`).
- **Zod (form)**: `LessonCategoryFormSchema` in `lib/validation/admin-lessons.ts`.
- No OpenAPI schema — lessons are not exposed over `/api/**`; the public lesson pages read `lib/lessons/**`
  static data directly, not this table. (The Supabase mirror exists for the admin CMS to edit against;
  syncing edits back out to the static files is a manual step, same as dictionary/books.)

### `lessons`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `text` PK | Slug |
| `category_id` | `text` → `lesson_categories(id) on delete cascade` | |
| `title`, `description` | `text` | |
| `difficulty` | `lesson_difficulty` enum | `beginner` \| `intermediate` \| `advanced` |
| `estimated_minutes` | `int` nullable | |
| `sort_order` | `int` default `0` | |
| `created_at`, `updated_at`, `created_by`, `updated_by` | | |

- Index on `(category_id, sort_order)`. **Read**: public. **Write**: staff. **Audit**: ✅
- **Zod (form)**: `LessonFormSchema` in `lib/validation/admin-lessons.ts`.

### `lesson_steps`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `lesson_id` | `text` → `lessons(id) on delete cascade` | |
| `sort_order` | `int` default `0` | |
| `type` | `lesson_step_type` enum | `vocabulary` \| `phrase` \| `info` |
| `term`, `translation`, `pronunciation`, `description` | `text` nullable | Shape enforced by a `check` constraint (see below) |

- **Constraint** `lesson_steps_shape`: `info` steps require `description` and forbid `term`/`translation`;
  `vocabulary`/`phrase` steps require both `term` and `translation`. Mirrored in application code by
  `LessonStepFormSchema`'s `superRefine` (`lib/validation/admin-lessons.ts`) so a bad submission gets a
  friendly Zod message instead of a raw Postgres constraint-violation error.
- Index on `(lesson_id, sort_order)`. **Read**: public. **Write**: staff. **Audit**: ✅
- **Zod (form)**: `LessonStepFormSchema`, `LessonStepIdSchema` in `lib/validation/admin-lessons.ts`.

### `books`

| Column | Type | Notes |
| --- | --- | --- |
| `slug` | `text` PK | |
| `title` | `jsonb` not null | Array of `LineToken` (`{word, display?}` \| `{literal}`) — the same rich-text token shape `<StoryBook>` renders |
| `subtitle` | `text` not null | |
| `teaser`, `cover_image_alt`, `cover_image_url`, `note` | `text` nullable | |
| `gloss_overrides` | `jsonb` not null, default `{}` | `Record<word, {gloss, pron?, source?}>` — click-to-gloss overrides |
| `sort_order` | `int` default `0` | |
| `created_at`, `updated_at`, `created_by`, `updated_by` | | |

- **Read**: public. **Write**: staff. **Audit**: ✅
- `title`/`gloss_overrides` stay `jsonb` (not normalized) — richly nested, no relational access pattern needed;
  authored as raw JSON in an admin textarea, validated against the reader's exact expected shape
  (`lib/validation/admin-books.ts`) so a malformed submission gets a Zod error instead of silently corrupting
  the page.
- **Zod (OpenAPI)**: none — book content isn't exposed over `/api/**`; the public storybook pages read
  `lib/books/**` static data directly (see `lessons` note above for why the Supabase mirror still exists).
- **Zod (form)**: `BookFormSchema` in `lib/validation/admin-books.ts`.

### `book_pages`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `book_slug` | `text` → `books(slug) on delete cascade` | |
| `sort_order` | `int` default `0` | `unique (book_slug, sort_order)` |
| `label` | `text` not null | |
| `lines` | `jsonb` not null, default `[]` | Array of `{mikmaq: LineToken[], english: string}` |
| `image_alt` | `text` not null | |
| `image_url` | `text` nullable | |

- Index on `(book_slug, sort_order)`. **Read**: public. **Write**: staff. **Audit**: ✅
- **Zod (form)**: `BookPageFormSchema`, `BookPageIdSchema` in `lib/validation/admin-books.ts`.

### `audio_recordings`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `word` | `text` not null | **Not** a foreign key to `dictionary_words.word` — recordings may exist for lesson phrases that aren't standalone headwords. Kept in sync when a headword is renamed (see trigger below), but otherwise a free-text value. |
| `file` | `text` unique, not null | |
| `speaker` | `text` not null | |
| `kind` | `recording_kind` enum | `word` \| `example` |
| `url` | `text` not null | Playable URL — Vercel Blob once uploaded, else the local `/api/audio/[file]` fallback |
| `created_at` | `timestamptz` | |

- Indexes: btree on `word`; GIN trigram on `word` (0009, for the admin's `ilike` search — mirrors
  `dictionary_words_word_trgm_idx`).
- **Read**: public. **Write**: staff. **Audit**: ✅
- **Trigger** `dictionary_words_sync_audio_word` (statement-level, `0010`, replacing a row-level version from
  `0008`): when a `dictionary_words.word` UPDATE changes the value, every `audio_recordings` row that matched
  the old spelling is renamed to match. Uses transition tables (`old_table`/`new_table`) so the whole
  statement's renames are handled in one pass rather than one trigger firing per row. (0010's commit note: a
  same-statement swap/chain rename was investigated and found *not* reachable in practice — `word`'s plain
  `unique` constraint already rejects any UPDATE that would momentarily need two rows to hold the same value
  — but the statement-level rewrite is strictly better practice regardless, independent of that constraint.)
- **Zod (OpenAPI)**: `RecordingSchema` (`lib/validation/common.ts`), `LessonAudioResponseSchema`
  (`lib/validation/audio.ts`) — backs `GET /api/lesson-audio` and the `recordings` field of
  `GET /api/word-details`.
- **Zod (form)**: `AudioRecordingFormSchema`, `AudioRecordingIdSchema` in `lib/validation/admin-audio.ts`.
- **Consumers**: `app/admin/audio/actions.ts`, `app/api/lesson-audio/route.ts`, `app/api/audio/[file]/route.ts`
  (local-dev file-streaming fallback, reads the on-disk archive directly rather than this table).

### `audit_log`

Generic, append-only change history for every table above.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `table_name` | `text` not null | `TG_TABLE_NAME` |
| `record_id` | `text` not null | The changed row's `id` or `slug` (whichever the table uses as PK) |
| `action` | `text` | `insert` \| `update` \| `delete` |
| `actor_id` | `uuid` → `profiles(id) on delete set null` | Nullable — direct-DB changes (SQL editor, service-role scripts) have no actor |
| `actor_email` | `text` | Denormalized at write time, so the log stays readable even after `profiles.email` later changes or the actor row is deleted |
| `diff` | `jsonb` not null | `{new}` (insert), `{old, new}` (update), or `{old}` (delete) |
| `created_at` | `timestamptz` | |

- Indexes: `(table_name, record_id, created_at desc)`, `(actor_id, created_at desc)`, `(created_at desc)`.
- **Read**: staff (`is_editor()`). **Write**: nobody, directly — every row is written by the
  `audit_log_capture()` trigger function (`security definer`), attached to all nine audited tables above; no
  RLS write policy exists for any role, including `super_admin`.
- **Consumers**: `app/admin/activity/page.tsx` (the audit log viewer).

### `storage.buckets['avatars']` (Supabase Storage, not a `public` schema table)

- Public bucket (`insert into storage.buckets ... public = true`) — reads need no signed URL.
- Writes (insert/update/delete on `storage.objects` where `bucket_id = 'avatars'`) require `is_editor()`.
- Referenced by `profiles.avatar_url`. Consumer: `app/admin/actions.ts` (`uploadAvatarAction`),
  `components/admin/Avatar.tsx`.

## Enums

| Type | Values |
| --- | --- |
| `app_role` | `admin`, `editor`, `super_admin` (added 0006) |
| `lesson_difficulty` | `beginner`, `intermediate`, `advanced` |
| `lesson_step_type` | `vocabulary`, `phrase`, `info` |
| `recording_kind` | `word`, `example` |

## Access-control functions

| Function | Returns true when | Used by |
| --- | --- | --- |
| `is_editor()` | caller's `profiles.role` is `editor`, `admin`, or `super_admin` | Every content table's write policy |
| `is_super_admin()` | caller's `profiles.role` is `super_admin` | `prevent_role_escalation`, `prevent_cross_user_profile_edits`, and app-layer gating of `/admin/api-docs` and the role-change UI |

Both are `security definer stable sql` functions — they run with the function owner's privileges (so they can
read `profiles` regardless of the calling user's own RLS visibility into it) and are marked `stable` so
Postgres can cache the result within one statement.

## Data-model matrix: table → Zod schema → API surface → auth

| Table | Public read? | OpenAPI schema (`lib/validation/`) | Public route | Form schema (`lib/validation/`) | Admin Server Action |
| --- | --- | --- | --- | --- | --- |
| `dictionary_words` + `dictionary_word_usages` | ✅ | `dictionary.ts` | `GET /api/dictionary`, `GET /api/word-details` | `admin-dictionary.ts` | `app/admin/dictionary/actions.ts` |
| `lesson_categories` / `lessons` / `lesson_steps` | — (public site reads static `lib/lessons/**`) | — | — | `admin-lessons.ts` | `app/admin/lessons/actions.ts` |
| `books` / `book_pages` | — (public site reads static `lib/books/**`) | — | — | `admin-books.ts` | `app/admin/books/actions.ts` |
| `audio_recordings` | ✅ | `audio.ts`, `common.ts` | `GET /api/lesson-audio`, `GET /api/audio/{file}` | `admin-audio.ts` | `app/admin/audio/actions.ts` |
| `profiles` | — (own row / staff only) | — | — | `users.ts`, `auth.ts` | `app/admin/users/actions.ts`, `app/admin/actions.ts`, `app/admin/login/actions.ts` |
| `audit_log` | — (staff only) | — | — | — (read-only viewer, no form) | `app/admin/activity/page.tsx` |
| *(none — computed)* | — (staff only) | `admin-search.ts` | `GET /api/admin/search` | — | — |
| *(none — process check)* | ✅ | `health.ts` | `GET /api/health` | — | — |
| *(none — pure functions)* | ✅ | `games.ts` | `GET /api/games/flashcard`, `GET /api/games/quiz` | — | — |

Three routes have no backing table at all: `/api/health` (a live Postgres round-trip, not a row read —
see `app/api/health/route.ts`), and `/api/games/*` (randomly sampled from the static dictionary JSON via
`lib/games.ts`, not from `dictionary_words`).

The full, browsable OpenAPI 3.1 document (generated from these same Zod schemas, so it cannot drift from
actual runtime validation) is served at `GET /api/openapi.json` and rendered as Swagger UI at
`/admin/api-docs` (`super_admin` only).
