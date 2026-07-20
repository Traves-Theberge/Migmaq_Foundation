#!/usr/bin/env -S npx tsx
/**
 * Validate lib/i18n/messages.ts for key parity between locales and for
 * empty/placeholder values — the same kind of drift check as
 * validate-lessons.ts, applied to translated UI strings instead of
 * lesson vocabulary.
 *
 * Hard errors (exit 1): a key present in one locale's namespace but
 * missing from another; an empty string value.
 *
 * Usage: npm run data:validate-i18n
 */
import { messages, type Locale, type Namespace } from '../lib/i18n/messages';

function main() {
    const errors: string[] = [];
    const locales = Object.keys(messages) as Locale[];
    const namespaces = Object.keys(messages.en) as Namespace[];

    for (const namespace of namespaces) {
        const keysByLocale = locales.map((locale) => ({
            locale,
            keys: new Set(Object.keys(messages[locale][namespace])),
        }));

        const allKeys = new Set(keysByLocale.flatMap(({ keys }) => Array.from(keys)));

        for (const key of allKeys) {
            const missingFrom = keysByLocale.filter(({ keys }) => !keys.has(key)).map(({ locale }) => locale);
            if (missingFrom.length > 0) {
                errors.push(`${namespace}.${key}: missing from ${missingFrom.join(', ')}`);
            }
        }

        for (const { locale, keys } of keysByLocale) {
            for (const key of keys) {
                const value = (messages[locale][namespace] as Record<string, string>)[key];
                if (value === undefined || value === null || value.trim() === '') {
                    errors.push(`${namespace}.${key} (${locale}): empty value`);
                }
            }
        }
    }

    const totalKeys = namespaces.reduce((n, ns) => n + Object.keys(messages.en[ns]).length, 0);
    console.log(`Checked ${totalKeys} keys across ${namespaces.length} namespaces and ${locales.length} locales (${locales.join(', ')}).\n`);

    if (errors.length > 0) {
        console.log(`${errors.length} error(s):`);
        errors.forEach((e) => console.log(`  ✖ ${e}`));
        process.exitCode = 1;
    } else {
        console.log('No errors.');
    }
}

main();
