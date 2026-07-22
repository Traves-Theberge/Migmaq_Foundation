import fs from 'fs/promises';
import path from 'path';

/** Thrown only for "no such headword" — lets callers (API routes) return a clean 404 instead of conflating it with a real failure (unreadable/corrupt dictionary.json), which should surface as a 500 instead. */
export class WordNotFoundError extends Error {
    constructor(word: string) {
        super(`No dictionary entry for "${word}"`);
        this.name = 'WordNotFoundError';
    }
}

let cache: any = null;
let indexCache: Map<string, any> | null = null;
let sortedWordsCache: string[] | null = null;
let lastModified: number = 0;

export async function getDictionary() {
    const filePath = path.join(process.cwd(), 'public', 'assets', 'dictionary.json');
    const stats = await fs.stat(filePath);
    if (!cache || stats.mtimeMs > lastModified) {
        const data = await fs.readFile(filePath, 'utf8');
        const parsed = JSON.parse(data);
        cache = parsed.message.words;
        indexCache = new Map(cache.map((w: any) => [w.word.trim().toLowerCase(), w]));
        sortedWordsCache = cache.map((w: any) => w.word).sort((a: string, b: string) => a.localeCompare(b));
        lastModified = stats.mtimeMs;
    }
    return cache;
}

async function getDictionaryIndex() {
    await getDictionary();
    return indexCache!;
}

/** Alphabetically adjacent headwords, for prev/next navigation on a word's detail page. */
export async function getAdjacentWords(word: string): Promise<{ prev?: string; next?: string }> {
    await getDictionary();
    const sorted = sortedWordsCache!;
    const target = word.trim().toLowerCase();
    const idx = sorted.findIndex((w) => w.trim().toLowerCase() === target);
    if (idx === -1) return {};
    return {
        prev: idx > 0 ? sorted[idx - 1] : undefined,
        next: idx < sorted.length - 1 ? sorted[idx + 1] : undefined,
    };
}

/** True if `word` has its own entry in the dictionary (case/whitespace-insensitive). */
export async function wordExists(word: string) {
    const index = await getDictionaryIndex();
    return index.has(word.trim().toLowerCase());
}

export interface ResolvedAlternateForm {
    /** Original raw string, e.g. "a'gwesnn -- a'kwesnn -- hats -- (plural)". */
    raw: string;
    migmaq: string;
    gloss?: string;
    note?: string;
    /** Set only when `migmaq` resolves to its own dictionary entry. */
    href?: string;
}

/**
 * Alternate/inflected forms are usually recorded only as a note on the base entry, not
 * as their own dictionary headword (e.g. plurals like "a'gwesnn" are not separate entries
 * for "a'gwesn"). Resolve each one so callers can tell which are safe to link.
 */
export async function resolveAlternateForms(forms: string[] | undefined): Promise<ResolvedAlternateForm[]> {
    if (!forms || forms.length === 0) return [];
    const index = await getDictionaryIndex();
    return forms.map((raw) => {
        const [migmaq, gloss, note] = raw.split(' -- ');
        const key = (migmaq ?? '').trim().toLowerCase();
        const exists = key.length > 0 && index.has(key);
        return {
            raw,
            migmaq: (migmaq ?? '').trim(),
            gloss: gloss?.trim(),
            note: note?.trim(),
            href: exists ? `/dictionary/${encodeURIComponent((migmaq ?? '').trim())}` : undefined,
        };
    });
}

export async function getWordDetails(word: string) {
    const index = await getDictionaryIndex();
    const target = word.trim().toLowerCase();
    const result = index.get(target);
    if (!result) throw new WordNotFoundError(word);
    return result;
}
