#!/usr/bin/env node
/**
 * Merge machine-translated French dictionary fields into
 * public/assets/dictionary.json.
 *
 * Reads a directory of batch result files, each a JSON array of
 * { idx, fr_definitions, fr_translations, fr_usages }, where `idx` is the
 * word's position in the dictionary's `words` array at the time the batch
 * was generated. Applies fr_definitions/fr_translations onto the matching
 * word and fr_usages[i] onto usages[i].french, skipping (with a warning)
 * any entry whose translated array length no longer matches the source
 * array — that indicates the dictionary changed shape since the batch was
 * produced, and a stale-length translation is worse than none.
 *
 * Usage: node scripts/merge-fr-translations.mjs <results-dir>
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DICT = path.join(root, 'public', 'assets', 'dictionary.json');
const resultsDir = process.argv[2];

if (!resultsDir) {
    console.error('Usage: node scripts/merge-fr-translations.mjs <results-dir>');
    process.exit(1);
}

const dict = JSON.parse(fs.readFileSync(DICT, 'utf8'));
const words = dict.message.words;

const resultFiles = fs.readdirSync(resultsDir).filter((f) => f.endsWith('.json'));
let applied = 0;
let skippedMissingWord = 0;
let skippedLengthMismatch = 0;

for (const file of resultFiles) {
    const batch = JSON.parse(fs.readFileSync(path.join(resultsDir, file), 'utf8'));
    for (const entry of batch) {
        const word = words[entry.idx];
        if (!word) { skippedMissingWord++; continue; }

        let ok = true;
        if (Array.isArray(entry.fr_definitions) && entry.fr_definitions.length === (word.definitions?.length ?? 0)) {
            word.fr_definitions = entry.fr_definitions;
        } else if (entry.fr_definitions) { ok = false; }

        if (Array.isArray(entry.fr_translations) && entry.fr_translations.length === (word.translations?.length ?? 0)) {
            word.fr_translations = entry.fr_translations;
        } else if (entry.fr_translations) { ok = false; }

        if (Array.isArray(entry.fr_usages) && word.usages && entry.fr_usages.length === word.usages.length) {
            word.usages = word.usages.map((u, i) => entry.fr_usages[i] ? { ...u, french: entry.fr_usages[i] } : u);
        } else if (entry.fr_usages?.length) { ok = false; }

        if (ok) applied++; else skippedLengthMismatch++;
    }
}

fs.writeFileSync(DICT, JSON.stringify(dict));
console.log(`Applied French fields to ${applied} words.`);
if (skippedMissingWord) console.log(`Skipped ${skippedMissingWord} entries with no matching word (idx out of range).`);
if (skippedLengthMismatch) console.log(`Skipped ${skippedLengthMismatch} entries with an array-length mismatch.`);
