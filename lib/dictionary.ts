import fs from 'fs/promises';
import path from 'path';

let cache: any = null;
let indexCache: Map<string, any> | null = null;
let lastModified: number = 0;

export async function getDictionary() {
    const filePath = path.join(process.cwd(), 'public', 'assets', 'dictionary.json');
    const stats = await fs.stat(filePath);
    if (!cache || stats.mtimeMs > lastModified) {
        const data = await fs.readFile(filePath, 'utf8');
        const parsed = JSON.parse(data);
        cache = parsed.message.words;
        indexCache = new Map(cache.map((w: any) => [w.word.trim().toLowerCase(), w]));
        lastModified = stats.mtimeMs;
    }
    return cache;
}

async function getDictionaryIndex() {
    await getDictionary();
    return indexCache!;
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
    if (!result) throw new Error('Word not found');
    return result;
}
