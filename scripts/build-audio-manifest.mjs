#!/usr/bin/env node
/**
 * Build public/assets/audio-manifest.json from the Micmac audio archive.
 *
 * Filenames follow two patterns:
 *   <word>__<speaker>.mp3            — recording of the word itself
 *   <word>__example-<speaker>.mp3    — recording of the word's example sentence
 *
 * The manifest maps each word to its recordings. `url` is null until the
 * Vercel Blob upload script fills it in; until then the site falls back to
 * streaming from the local archive via /api/audio/<file>.
 *
 * Usage: node scripts/build-audio-manifest.mjs
 * Env:   MICMAC_AUDIO_DIR (default: ../Micmac/audio relative to repo root)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AUDIO_DIR = process.env.MICMAC_AUDIO_DIR
    ?? path.resolve(root, '..', 'Micmac', 'audio');
const OUT = path.join(root, 'public', 'assets', 'audio-manifest.json');

if (!fs.existsSync(AUDIO_DIR)) {
    console.error(`Audio directory not found: ${AUDIO_DIR}`);
    process.exit(1);
}

// Preserve any blob URLs from a previous run so this script is re-runnable
// after uploads without losing them.
let previous = {};
if (fs.existsSync(OUT)) {
    try {
        const old = JSON.parse(fs.readFileSync(OUT, 'utf8'));
        for (const recs of Object.values(old.words ?? {})) {
            for (const r of recs) if (r.url) previous[r.file] = r.url;
        }
    } catch { /* corrupt manifest: rebuild from scratch */ }
}

const words = {};
let count = 0, skipped = 0;
for (const file of fs.readdirSync(AUDIO_DIR).sort()) {
    if (!file.endsWith('.mp3')) { skipped++; continue; }
    const stem = file.slice(0, -4);
    const sep = stem.lastIndexOf('__');
    if (sep === -1) { skipped++; continue; }
    const word = stem.slice(0, sep);
    const tail = stem.slice(sep + 2);
    const isExample = tail.startsWith('example-');
    const speaker = isExample ? tail.slice('example-'.length) : tail;
    if (!word || !speaker) { skipped++; continue; }
    (words[word] ??= []).push({
        file,
        speaker,
        kind: isExample ? 'example' : 'word',
        url: previous[file] ?? null,
    });
    count++;
}

// Stable order: word recordings first, then examples, alphabetical by speaker.
for (const recs of Object.values(words)) {
    recs.sort((a, b) =>
        (a.kind === b.kind ? a.speaker.localeCompare(b.speaker) : a.kind === 'word' ? -1 : 1));
}

const manifest = {
    source: 'https://mikmaqonline.org (CC BY-NC 4.0)',
    words,
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(manifest));
const withUrl = Object.values(words).flat().filter(r => r.url).length;
console.log(`Wrote ${OUT}`);
console.log(`${count} recordings for ${Object.keys(words).length} words (${skipped} files skipped, ${withUrl} already uploaded)`);
