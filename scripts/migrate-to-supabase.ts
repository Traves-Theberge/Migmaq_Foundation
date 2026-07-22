#!/usr/bin/env -S npx tsx
/**
 * One-time (re-runnable) data load: moves the site's existing local
 * content — public/assets/dictionary.json, lib/lessons/*, lib/books/*,
 * public/assets/audio-manifest.json — into the Supabase project the admin
 * CMS (supabase/migrations/0001..0006) now manages instead.
 *
 * Idempotent by design so it's safe to re-run after editing local source
 * data: dictionary words upsert on their unique `word`; lesson categories/
 * lessons and books upsert on their id/slug; child rows (usages, steps,
 * pages) are deleted and reinserted for their parent each run rather than
 * diffed, since there's no stable identity for them in the source data
 * beyond position. audio_recordings upsert on the unique `file` column.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY — this bypasses RLS entirely (the
 * content tables' staff-write policies expect an authenticated session,
 * which a one-off migration script doesn't have), so it must never be run
 * against a project you don't control, and the key must never be
 * committed.
 *
 * Usage: SUPABASE_SERVICE_ROLE_KEY=... npm run data:migrate-to-supabase
 *        SUPABASE_SERVICE_ROLE_KEY=... npm run data:migrate-to-supabase -- --only=dictionary,lessons
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServiceClient } from '../lib/supabase/service';
import { lessonCategories } from '../lib/lessons/index';
import { BOOKS } from '../lib/books/registry';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
    process.exit(1);
}

const supabase = createServiceClient();

const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const only = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',')) : null;
const shouldRun = (step: string) => !only || only.has(step);

/** Splits `items` into chunks of at most `size` — keeps individual requests well under Supabase's payload/row limits for the ~7,000-row dictionary. */
function chunk<T>(items: T[], size: number): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
    return out;
}

interface RawUsage {
    translation: string;
    english: string;
    french?: string;
}

interface RawDictionaryEntry {
    word: string;
    type?: string | null;
    definitions?: string[];
    translations?: string[];
    usages?: RawUsage[];
    fr_definitions?: string[] | null;
    fr_translations?: string[] | null;
    pronunciation_guide?: string | null;
    alternate_forms?: string[] | null;
    document_references?: string[] | null;
    entry_url?: string | null;
}

async function migrateDictionary() {
    const filePath = path.join(root, 'public', 'assets', 'dictionary.json');
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const words: RawDictionaryEntry[] = parsed.message.words;
    console.log(`Dictionary: upserting ${words.length} words…`);

    let wordCount = 0;
    for (const batch of chunk(words, 500)) {
        const rows = batch.map((w) => ({
            word: w.word,
            type: w.type ?? null,
            definitions: w.definitions ?? [],
            translations: w.translations ?? [],
            fr_definitions: w.fr_definitions ?? null,
            fr_translations: w.fr_translations ?? null,
            pronunciation_guide: w.pronunciation_guide ?? null,
            alternate_forms: w.alternate_forms ?? null,
            document_references: w.document_references ?? null,
            entry_url: w.entry_url ?? null,
        }));
        const { data, error } = await supabase.from('dictionary_words').upsert(rows, { onConflict: 'word' }).select('id, word');
        if (error) throw new Error(`dictionary_words upsert failed: ${error.message}`);
        wordCount += data?.length ?? 0;

        const idByWord = new Map((data ?? []).map((r) => [r.word, r.id]));
        const usageRows = batch.flatMap((w) => {
            const wordId = idByWord.get(w.word);
            if (!wordId || !Array.isArray(w.usages)) return [];
            return w.usages.map((u, i) => ({
                word_id: wordId,
                sort_order: i,
                migmaq: u.translation,
                english: u.english,
                french: u.french ?? null,
            }));
        });

        const wordIds = [...idByWord.values()];
        if (wordIds.length > 0) {
            const { error: delErr } = await supabase.from('dictionary_word_usages').delete().in('word_id', wordIds);
            if (delErr) throw new Error(`dictionary_word_usages delete failed: ${delErr.message}`);
        }
        if (usageRows.length > 0) {
            const { error: usageErr } = await supabase.from('dictionary_word_usages').insert(usageRows);
            if (usageErr) throw new Error(`dictionary_word_usages insert failed: ${usageErr.message}`);
        }
        console.log(`  …${wordCount}/${words.length}`);
    }
    console.log(`Dictionary done: ${wordCount} words.`);
}

async function migrateLessons() {
    console.log(`Lessons: upserting ${lessonCategories.length} categories…`);

    const categoryRows = lessonCategories.map((c, i) => ({
        id: c.id,
        title: c.title,
        description: c.description ?? null,
        icon: c.icon ?? null,
        color: c.color ?? null,
        sort_order: i,
    }));
    const { error: catErr } = await supabase.from('lesson_categories').upsert(categoryRows, { onConflict: 'id' });
    if (catErr) throw new Error(`lesson_categories upsert failed: ${catErr.message}`);

    let lessonCount = 0;
    let stepCount = 0;
    for (const category of lessonCategories) {
        const lessonRows = category.lessons.map((l, i) => ({
            id: l.id,
            category_id: category.id,
            title: l.title,
            description: l.description ?? null,
            difficulty: l.difficulty,
            estimated_minutes: l.estimatedMinutes ?? null,
            sort_order: i,
        }));
        if (lessonRows.length === 0) continue;
        const { error: lessonErr } = await supabase.from('lessons').upsert(lessonRows, { onConflict: 'id' });
        if (lessonErr) throw new Error(`lessons upsert failed (${category.id}): ${lessonErr.message}`);
        lessonCount += lessonRows.length;

        for (const lesson of category.lessons) {
            const { error: delErr } = await supabase.from('lesson_steps').delete().eq('lesson_id', lesson.id);
            if (delErr) throw new Error(`lesson_steps delete failed (${lesson.id}): ${delErr.message}`);

            const stepRows = lesson.steps.map((s, i) => ({
                lesson_id: lesson.id,
                sort_order: i,
                type: s.type,
                term: s.term ?? null,
                translation: s.translation ?? null,
                pronunciation: s.pronunciation ?? null,
                description: s.description ?? null,
            }));
            if (stepRows.length === 0) continue;
            const { error: stepErr } = await supabase.from('lesson_steps').insert(stepRows);
            if (stepErr) throw new Error(`lesson_steps insert failed (${lesson.id}): ${stepErr.message}`);
            stepCount += stepRows.length;
        }
    }
    console.log(`Lessons done: ${lessonCount} lessons, ${stepCount} steps across ${lessonCategories.length} categories.`);
}

async function migrateBooks() {
    console.log(`Books: upserting ${BOOKS.length} books…`);

    const bookRows = BOOKS.map((b, i) => ({
        slug: b.slug,
        title: b.title,
        subtitle: b.subtitle,
        teaser: b.teaser ?? null,
        cover_image_alt: b.coverImageAlt ?? null,
        cover_image_url: b.coverImageUrl ?? null,
        note: b.note ?? null,
        gloss_overrides: b.glossOverrides ?? {},
        sort_order: i,
    }));
    const { error: bookErr } = await supabase.from('books').upsert(bookRows, { onConflict: 'slug' });
    if (bookErr) throw new Error(`books upsert failed: ${bookErr.message}`);

    let pageCount = 0;
    for (const book of BOOKS) {
        const { error: delErr } = await supabase.from('book_pages').delete().eq('book_slug', book.slug);
        if (delErr) throw new Error(`book_pages delete failed (${book.slug}): ${delErr.message}`);

        const pageRows = book.pages.map((p, i) => ({
            book_slug: book.slug,
            sort_order: i,
            label: p.label,
            lines: p.lines,
            image_alt: p.imageAlt,
            image_url: p.imageUrl ?? null,
        }));
        if (pageRows.length === 0) continue;
        const { error: pageErr } = await supabase.from('book_pages').insert(pageRows);
        if (pageErr) throw new Error(`book_pages insert failed (${book.slug}): ${pageErr.message}`);
        pageCount += pageRows.length;
    }
    console.log(`Books done: ${BOOKS.length} books, ${pageCount} pages.`);
}

async function migrateAudio() {
    const filePath = path.join(root, 'public', 'assets', 'audio-manifest.json');
    if (!fs.existsSync(filePath)) {
        console.log('Audio: no manifest found, skipping.');
        return;
    }
    const manifest: Record<string, Array<{ file: string; speaker: string; kind: 'word' | 'example'; url: string | null }>> =
        JSON.parse(fs.readFileSync(filePath, 'utf8')).words;

    const rows = Object.entries(manifest).flatMap(([word, recordings]) =>
        recordings.map((r) => ({
            word,
            file: r.file,
            speaker: r.speaker,
            kind: r.kind,
            url: r.url ?? `/api/audio/${encodeURIComponent(r.file)}`,
        })),
    );
    console.log(`Audio: upserting ${rows.length} recordings…`);

    for (const batch of chunk(rows, 500)) {
        const { error } = await supabase.from('audio_recordings').upsert(batch, { onConflict: 'file' });
        if (error) throw new Error(`audio_recordings upsert failed: ${error.message}`);
    }
    console.log(`Audio done: ${rows.length} recordings.`);
}

async function main() {
    if (shouldRun('dictionary')) await migrateDictionary();
    if (shouldRun('lessons')) await migrateLessons();
    if (shouldRun('books')) await migrateBooks();
    if (shouldRun('audio')) await migrateAudio();
    console.log('Migration complete.');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
