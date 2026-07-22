import '../openapi/extend-zod';
import { z } from 'zod';

/**
 * Validates app/admin/books/actions.ts's book/page forms. Not
 * OpenAPI-documented — Server Action form data, not a stable HTTP
 * contract.
 *
 * books.title/gloss_overrides and book_pages.lines are jsonb columns
 * holding the token-based rich-text shape from lib/books/types.ts
 * (LineToken = { word, display? } | { literal }). Building a full
 * token-by-token visual editor is out of scope for this pass, so those
 * three fields are authored as raw JSON in a textarea and validated
 * against the same shape the reader (<StoryBook>) expects — a malformed
 * submission gets a Zod error instead of silently corrupting the page.
 */

const optionalText = z.string().transform((v) => (v.trim().length > 0 ? v.trim() : null));

const LineTokenSchema = z.union([
    z.object({ word: z.string().min(1), display: z.string().optional() }),
    z.object({ literal: z.string().min(1) }),
]);

const BookLineSchema = z.object({
    mikmaq: z.array(LineTokenSchema),
    english: z.string(),
});

/**
 * Parses+validates a JSON textarea value against `shape`, falling back to
 * `empty` for a blank field. `fieldLabel` is prefixed onto every error
 * message — BookForm has two independent JSON textareas (title,
 * gloss_overrides) and PageEditor has a third (lines), so a bare "Not
 * valid JSON." gives the user no way to tell which one needs fixing.
 */
function jsonField<T>(fieldLabel: string, shape: z.ZodType<T>, empty: T) {
    return z.string().transform((raw, ctx) => {
        const trimmed = raw.trim();
        if (!trimmed) return empty;
        let parsed: unknown;
        try {
            parsed = JSON.parse(trimmed);
        } catch {
            ctx.addIssue({ code: 'custom', message: `${fieldLabel}: not valid JSON.` });
            return z.NEVER;
        }
        const result = shape.safeParse(parsed);
        if (!result.success) {
            ctx.addIssue({ code: 'custom', message: `${fieldLabel}: doesn't match the expected shape — ${result.error.issues[0]?.message}` });
            return z.NEVER;
        }
        return result.data;
    });
}

export const BookFormSchema = z.object({
    slug: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, 'Required.')
        .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers, and hyphens only.'),
    title: jsonField('Title', z.array(LineTokenSchema), []),
    subtitle: z.string().trim().min(1, 'A subtitle is required.'),
    teaser: optionalText,
    cover_image_alt: optionalText,
    cover_image_url: optionalText,
    note: optionalText,
    gloss_overrides: jsonField('Gloss overrides', z.record(z.string(), z.object({ gloss: z.string(), pron: z.string().optional(), source: z.string().optional() })), {}),
    sort_order: z.coerce.number().int().default(0),
});

export const BookPageFormSchema = z.object({
    book_slug: z.string().trim().min(1, 'Missing book.'),
    sort_order: z.coerce.number().int().default(0),
    label: z.string().trim().min(1, 'A label is required.'),
    lines: jsonField('Lines', z.array(BookLineSchema), []),
    image_alt: z.string().trim().min(1, 'Alt text is required.'),
    image_url: optionalText,
});

export const BookPageIdSchema = z.string().uuid('Missing page id.');
