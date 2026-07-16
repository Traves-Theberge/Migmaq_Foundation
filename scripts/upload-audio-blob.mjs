#!/usr/bin/env node
/**
 * Upload the Micmac audio archive to Vercel Blob and fill the manifest's
 * `url` fields with the returned blob URLs.
 *
 * Resumable: recordings that already have a `url` in the manifest are
 * skipped, and the manifest is saved every 500 uploads, so you can safely
 * re-run after an interruption.
 *
 * Setup:
 *   1. npm i -D @vercel/blob
 *   2. Create a Blob store in the Vercel dashboard (Storage → Blob) and
 *      connect it to this project, or run: vercel blob store add
 *   3. Get the token: vercel env pull  (or copy BLOB_READ_WRITE_TOKEN
 *      from the dashboard)
 *
 * Usage: BLOB_READ_WRITE_TOKEN=... node scripts/upload-audio-blob.mjs
 * Env:   MICMAC_AUDIO_DIR (default: ../Micmac/audio)
 *        CONCURRENCY (default: 12)
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { put } from '@vercel/blob';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AUDIO_DIR = process.env.MICMAC_AUDIO_DIR
    ?? path.resolve(root, '..', 'Micmac', 'audio');
const MANIFEST = path.join(root, 'public', 'assets', 'audio-manifest.json');
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 12);

if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('BLOB_READ_WRITE_TOKEN is not set. See the setup notes at the top of this script.');
    process.exit(1);
}
if (!fs.existsSync(MANIFEST)) {
    console.error('Manifest not found. Run scripts/build-audio-manifest.mjs first.');
    process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const pending = Object.values(manifest.words).flat().filter(r => !r.url);
console.log(`${pending.length} recordings to upload (concurrency ${CONCURRENCY})`);

// Blob pathnames must be URL-safe and unique. Apostrophes are stripped, so a
// short hash of the original filename guards against collisions.
function blobPath(file) {
    const hash = crypto.createHash('sha1').update(file).digest('hex').slice(0, 8);
    const safe = file.replace(/\.mp3$/, '').replace(/[^a-zA-Z0-9_-]+/g, '-');
    return `audio/${safe}-${hash}.mp3`;
}

let done = 0, failed = 0;
function save() {
    fs.writeFileSync(MANIFEST, JSON.stringify(manifest));
}

async function worker(queue) {
    for (;;) {
        const rec = queue.pop();
        if (!rec) return;
        const src = path.join(AUDIO_DIR, rec.file);
        try {
            const blob = await put(blobPath(rec.file), fs.createReadStream(src), {
                access: 'public',
                contentType: 'audio/mpeg',
                addRandomSuffix: false,
                cacheControlMaxAge: 31536000,
                allowOverwrite: true,
            });
            rec.url = blob.url;
        } catch (e) {
            failed++;
            console.error(`FAILED ${rec.file}: ${e.message}`);
        }
        done++;
        if (done % 500 === 0) {
            save();
            console.log(`${done}/${pending.length} uploaded (${failed} failed) — manifest checkpointed`);
        }
    }
}

const queue = [...pending];
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));
save();
console.log(`Done: ${done - failed} uploaded, ${failed} failed. Manifest updated.`);
if (failed) console.log('Re-run this script to retry the failures.');
