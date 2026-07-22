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
    fr_reviewed: z.enum(['on', 'off']).transform((v) => v === 'on'),
});

export const DictionaryWordIdSchema = z.string().uuid('Missing word id.');
