#!/usr/bin/env -S npx tsx
/**
 * Validate every translation table in the app for key parity between
 * locales and for empty/placeholder values — the same kind of drift check
 * as validate-lessons.ts, applied to translated strings instead of lesson
 * vocabulary. Covers lib/i18n/messages.ts (namespaced UI chrome) and
 * lib/pos-glossary.ts (the part-of-speech tooltip glossary), since both
 * are hand-maintained locale->key->string tables that can drift.
 *
 * Hard errors (exit 1): a key present in one locale but missing from
 * another; an empty string value.
 *
 * Usage: npm run data:validate-i18n
 */
import { messages, type Locale, type Namespace } from '../lib/i18n/messages';
import { POS_GLOSSARY } from '../lib/pos-glossary';

/** Checks one locale->key->string table (e.g. one namespace, or the flat POS glossary). */
function checkTable(label: string, table: Record<string, Record<string, string>>, errors: string[]) {
    const locales = Object.keys(table);
    const keysByLocale = locales.map((locale) => ({
        locale,
        keys: new Set(Object.keys(table[locale])),
    }));

    const allKeys = new Set(keysByLocale.flatMap(({ keys }) => Array.from(keys)));

    for (const key of allKeys) {
        const missingFrom = keysByLocale.filter(({ keys }) => !keys.has(key)).map(({ locale }) => locale);
        if (missingFrom.length > 0) {
            errors.push(`${label}.${key}: missing from ${missingFrom.join(', ')}`);
        }
    }

    for (const { locale, keys } of keysByLocale) {
        for (const key of keys) {
            const value = table[locale][key];
            if (value === undefined || value === null || value.trim() === '') {
                errors.push(`${label}.${key} (${locale}): empty value`);
            }
        }
    }

    return allKeys.size;
}

function main() {
    const errors: string[] = [];
    let totalKeys = 0;
    let totalTables = 0;

    const locales = Object.keys(messages) as Locale[];
    const namespaces = Object.keys(messages.en) as Namespace[];
    for (const namespace of namespaces) {
        const table = Object.fromEntries(locales.map((l) => [l, messages[l][namespace]])) as Record<string, Record<string, string>>;
        totalKeys += checkTable(namespace, table, errors);
        totalTables += 1;
    }

    totalKeys += checkTable('posGlossary', POS_GLOSSARY as unknown as Record<string, Record<string, string>>, errors);
    totalTables += 1;

    console.log(`Checked ${totalKeys} keys across ${totalTables} tables and ${locales.length} locales (${locales.join(', ')}).\n`);

    if (errors.length > 0) {
        console.log(`${errors.length} error(s):`);
        errors.forEach((e) => console.log(`  ✖ ${e}`));
        process.exitCode = 1;
    } else {
        console.log('No errors.');
    }
}

main();
