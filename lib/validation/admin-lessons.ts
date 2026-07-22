import '../openapi/extend-zod';
import { z } from 'zod';

/**
 * Validates app/admin/lessons/actions.ts's category/lesson/step forms. Not
 * OpenAPI-documented — Server Action form data, not a stable HTTP contract.
 * Every field is coerced to a plain string by the caller first (see
 * app/admin/login/actions.ts for why), so these schemas never see a raw
 * FormData null.
 */

const slug = z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Required.')
    .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers, and hyphens only.');

const optionalText = z.string().transform((v) => (v.trim().length > 0 ? v.trim() : null));

export const LessonCategoryFormSchema = z.object({
    id: slug,
    title: z.string().trim().min(1, 'A title is required.'),
    description: optionalText,
    icon: optionalText,
    color: optionalText,
    sort_order: z.coerce.number().int().default(0),
});

export const LessonFormSchema = z.object({
    id: slug,
    category_id: z.string().trim().min(1, 'Missing category.'),
    title: z.string().trim().min(1, 'A title is required.'),
    description: optionalText,
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    estimated_minutes: z
        .string()
        .transform((v) => (v.trim().length > 0 ? Number(v) : null))
        .refine((v) => v === null || (Number.isFinite(v) && v >= 0), 'Must be a positive number.'),
    sort_order: z.coerce.number().int().default(0),
});

/**
 * Mirrors the lesson_steps_shape check constraint (migration 0001): 'info'
 * steps carry only a description, 'vocabulary'/'phrase' steps require both
 * term and translation. Enforced here too so a bad form submission gets a
 * friendly Zod message instead of a raw Postgres constraint-violation error.
 */
export const LessonStepFormSchema = z
    .object({
        lesson_id: z.string().trim().min(1, 'Missing lesson.'),
        sort_order: z.coerce.number().int().default(0),
        type: z.enum(['vocabulary', 'phrase', 'info']),
        term: optionalText,
        translation: optionalText,
        pronunciation: optionalText,
        description: optionalText,
    })
    .superRefine((step, ctx) => {
        if (step.type === 'info') {
            if (!step.description) ctx.addIssue({ code: 'custom', path: ['description'], message: 'Info steps need a description.' });
            if (step.term) ctx.addIssue({ code: 'custom', path: ['term'], message: 'Info steps can\'t have a term.' });
            if (step.translation) ctx.addIssue({ code: 'custom', path: ['translation'], message: 'Info steps can\'t have a translation.' });
        } else {
            if (!step.term) ctx.addIssue({ code: 'custom', path: ['term'], message: 'Required for vocabulary/phrase steps.' });
            if (!step.translation) ctx.addIssue({ code: 'custom', path: ['translation'], message: 'Required for vocabulary/phrase steps.' });
        }
    });

export const LessonStepIdSchema = z.string().uuid('Missing step id.');
