import '../openapi/extend-zod';
import { z } from 'zod';

/**
 * Validates app/admin/dictionary/actions.ts's create/update form data. Not
 * OpenAPI-documented — these back Server Actions (form POSTs), not a
 * stable HTTP contract; the public read contract lives in
 * lib/validation/dictionary.ts instead.
 *
 * Every field below is fed a plain string by the caller (form values are
 * coerced with `String(formData.get(...) ?? '')` first, same pattern as
 * app/admin/login/actions.ts) so a missing field never surfaces as a raw
 * "expected string, received null" Zod error.
 *
 * List-shaped fields (definitions, translations, fr_definitions,
 * fr_translations) are authored in the form as one-entry-per-line
 * textareas and split/trimmed here, matching how they're stored as
 * Postgres text[] columns.
 */
const linesToArray = (value: string) =>
    value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

const optionalText = z.string().transform((v) => (v.trim().length > 0 ? v.trim() : null));
const requiredLines = z.string().transform(linesToArray);
const optionalLines = z.string().transform((v) => {
    const arr = linesToArray(v);
    return arr.length > 0 ? arr : null;
});

export const DictionaryWordFormSchema = z.object({
    word: z.string().trim().min(1, 'A headword is required.'),
    type: optionalText,
    definitions: requiredLines,
    translations: requiredLines,
    pronunciation_guide: optionalText,
    entry_url: optionalText,
    fr_definitions: optionalLines,
    fr_translations: optionalLines,
    alternate_forms: optionalLines,
    document_references: optionalLines,
    fr_reviewed: z.enum(['on', 'off']).transform((v) => v === 'on'),
});

export const DictionaryWordIdSchema = z.string().uuid('Missing word id.');

/**
 * dictionary_word_usages rows for one word, authored in the form as a
 * small repeatable-row editor (see UsagesEditor.tsx) rather than a raw
 * textarea — unlike the text[] columns above, each usage is a structured
 * {migmaq, english, french?} triplet. The client serializes the current
 * rows to JSON in a hidden field; the whole set replaces the word's
 * existing usages on save (delete + reinsert) rather than being diffed,
 * since there are only ever a handful per word.
 */
export const DictionaryWordUsagesFormSchema = z
    .string()
    .transform((raw, ctx) => {
        let parsed: unknown;
        try {
            parsed = JSON.parse(raw || '[]');
        } catch {
            ctx.addIssue({ code: 'custom', message: 'Usages: not valid JSON.' });
            return z.NEVER;
        }
        const shape = z.array(
            z.object({
                migmaq: z.string().trim().min(1),
                english: z.string().trim().min(1),
                french: z.string().trim().optional(),
            }),
        );
        const result = shape.safeParse(parsed);
        if (!result.success) {
            ctx.addIssue({ code: 'custom', message: `Usages: ${result.error.issues[0]?.message ?? 'invalid shape'}` });
            return z.NEVER;
        }
        return result.data;
    });
