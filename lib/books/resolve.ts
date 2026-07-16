import { getWordDetails } from '@/lib/dictionary';
import { getRecordings } from '@/lib/audio';
import type { BookDefinition, LineToken, ResolvedWord } from './types';

const SPEAKER_PREFERENCE = ['jnw', 'dmm', 'ewm'];

function collectWords(book: BookDefinition): Set<string> {
    const words = new Set<string>();
    const addTokens = (tokens: LineToken[]) => {
        for (const t of tokens) if ('word' in t) words.add(t.word);
    };
    addTokens(book.title);
    for (const page of book.pages) for (const line of page.lines) addTokens(line.mikmaq);
    return words;
}

/**
 * Resolves every Mi'kmaq word a book uses against the live dictionary and
 * audio manifest, server-side, once per page load — the reader component
 * itself never fetches. `glossOverrides` in the book data wins over the
 * dictionary for words that aren't citation forms (inflections, variants).
 */
export async function resolveBookWords(book: BookDefinition): Promise<Record<string, ResolvedWord>> {
    const words = collectWords(book);
    const resolved: Record<string, ResolvedWord> = {};

    await Promise.all(Array.from(words).map(async (word) => {
        const override = book.glossOverrides?.[word];
        const recs = (await getRecordings(word)).filter((r) => r.kind === 'word');
        const pick = SPEAKER_PREFERENCE.map((s) => recs.find((r) => r.speaker === s)).find(Boolean) ?? recs[0];

        if (override) {
            resolved[word] = {
                gloss: override.gloss,
                pron: override.pron,
                inDictionary: false,
                audioUrl: pick?.url,
            };
            return;
        }
        try {
            const entry = await getWordDetails(word);
            resolved[word] = {
                gloss: entry.definitions?.[0] ?? entry.translations?.[0] ?? word,
                pron: entry.pronunciation_guide,
                inDictionary: true,
                audioUrl: pick?.url,
            };
        } catch {
            resolved[word] = { gloss: word, inDictionary: false, audioUrl: pick?.url };
        }
    }));

    return resolved;
}
