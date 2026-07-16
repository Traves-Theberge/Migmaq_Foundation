#!/usr/bin/env node
/**
 * Build public/assets/dictionary.json from the rich Micmac project export
 * (mikmaqonline.org scrape: 6,974 entries with pronunciation guides,
 * meanings, examples, alternate forms, and document references).
 *
 * Keeps the site's existing schema ({ message: { meta, words } } with
 * word/type/definitions/translations/usages) and adds the new fields.
 * A timestamped backup of the previous file is written alongside.
 *
 * Usage: node scripts/build-dictionary.mjs
 * Env:   MICMAC_DICTIONARY (default: ../Micmac/dictionary.json)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = process.env.MICMAC_DICTIONARY
    ?? path.resolve(root, '..', 'Micmac', 'dictionary.json');
const OUT = path.join(root, 'public', 'assets', 'dictionary.json');

const entries = JSON.parse(fs.readFileSync(SRC, 'utf8'));

const words = entries.map((e) => ({
    // Source data has a handful of entries with stray leading/trailing spaces,
    // which break /dictionary/[word] URL lookups.
    word: e.word.trim(),
    type: e.part_of_speech || undefined,
    definitions: e.meanings?.length ? e.meanings : (e.translation ? [e.translation] : []),
    translations: e.translation ? [e.translation] : [],
    usages: (e.examples ?? []).map((x) => ({
        translation: x.text,       // Mi'gmaq sentence (site convention)
        english: x.translation,    // English rendering
    })),
    pronunciation_guide: e.pronunciation_guide || undefined,
    alternate_forms: e.alternate_forms?.length ? e.alternate_forms : undefined,
    document_references: e.document_references?.length
        ? [...new Set(e.document_references.map((r) => r.source).filter(Boolean))]
        : undefined,
    entry_url: e.entry_url || undefined,
})).sort((a, b) => a.word.localeCompare(b.word));

if (fs.existsSync(OUT)) {
    const backup = OUT.replace(/\.json$/, `.backup.json`);
    if (!fs.existsSync(backup)) fs.copyFileSync(OUT, backup);
}

const out = {
    message: {
        meta: {
            name: "Mi'gmaq",
            source: 'https://mikmaqonline.org',
            license: 'CC BY-NC 4.0',
        },
        words,
    },
};
fs.writeFileSync(OUT, JSON.stringify(out));
console.log(`Wrote ${OUT}: ${words.length} entries`);
