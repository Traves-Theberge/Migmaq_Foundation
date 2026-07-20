#!/usr/bin/env node
/** Reports how many dictionary words have French machine-translation fields. Informational only — never fails. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dict = JSON.parse(fs.readFileSync(path.join(root, 'public', 'assets', 'dictionary.json'), 'utf8'));
const words = dict.message.words;

const withFrDefs = words.filter((w) => w.fr_definitions?.length).length;
const withFrTrans = words.filter((w) => w.fr_translations?.length).length;
const usagesTotal = words.reduce((n, w) => n + (w.usages?.length ?? 0), 0);
const usagesWithFr = words.reduce((n, w) => n + (w.usages?.filter((u) => u.french).length ?? 0), 0);

console.log(`${words.length} words total.`);
console.log(`fr_definitions: ${withFrDefs} (${(100 * withFrDefs / words.length).toFixed(1)}%)`);
console.log(`fr_translations: ${withFrTrans} (${(100 * withFrTrans / words.length).toFixed(1)}%)`);
console.log(`usage examples with French gloss: ${usagesWithFr}/${usagesTotal}`);
