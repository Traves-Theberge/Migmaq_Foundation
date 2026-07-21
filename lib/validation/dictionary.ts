import '../openapi/extend-zod';
import { z } from 'zod';
import { registry } from '../openapi/registry';
import { ErrorResponseSchema, RecordingSchema } from './common';

const WordUsageSchema = z
    .object({
        translation: z.string(),
        english: z.string(),
        french: z.string().nullable().optional(),
    })
    .openapi('DictionaryWordUsage');

export const DictionaryEntrySchema = z
    .object({
        word: z.string().openapi({ example: "a'gwesn" }),
        type: z.string().nullable().optional().openapi({ example: 'noun inanimate' }),
        definitions: z.array(z.string()).openapi({ example: ['hat'] }),
        translations: z.array(z.string()).openapi({ example: ['Hat'] }),
        usages: z.array(WordUsageSchema).optional(),
        pronunciation_guide: z.string().nullable().optional(),
        alternate_forms: z.array(z.string()).nullable().optional(),
        entry_url: z.string().nullable().optional(),
        fr_definitions: z.array(z.string()).nullable().optional(),
        fr_translations: z.array(z.string()).nullable().optional(),
    })
    .openapi('DictionaryEntry');

export const DictionaryListResponseSchema = z
    .array(DictionaryEntrySchema)
    .openapi('DictionaryListResponse');

export const WordDetailsQuerySchema = z
    .object({
        word: z.string().min(1, 'word is required').openapi({
            param: { name: 'word', in: 'query' },
            example: "a'gwesn",
        }),
    })
    .openapi('WordDetailsQuery');

const ResolvedAlternateFormSchema = z
    .object({
        raw: z.string(),
        migmaq: z.string(),
        gloss: z.string().optional(),
        note: z.string().optional(),
        href: z.string().optional(),
    })
    .openapi('ResolvedAlternateForm');

export const WordDetailsResponseSchema = DictionaryEntrySchema.extend({
    recordings: z.array(RecordingSchema),
    resolved_alternate_forms: z.array(ResolvedAlternateFormSchema),
}).openapi('WordDetailsResponse');

registry.registerPath({
    method: 'get',
    path: '/api/dictionary',
    operationId: 'listDictionaryEntries',
    summary: 'List the full Mi’gmaq dictionary',
    description:
        'Returns every headword in the dictionary with its definitions, translations, and example usages. Public, unauthenticated, and unpaginated — the dataset is small enough (~7,000 words) to return in one response. Backed by public/assets/dictionary.json, not a database table.',
    tags: ['Dictionary'],
    responses: {
        200: {
            description: 'The full dictionary word list.',
            content: { 'application/json': { schema: DictionaryListResponseSchema } },
        },
        500: {
            description: 'The dictionary file could not be read or parsed.',
            content: { 'application/json': { schema: ErrorResponseSchema } },
        },
    },
});

registry.registerPath({
    method: 'get',
    path: '/api/word-details',
    operationId: 'getWordDetails',
    summary: 'Get one dictionary word with audio and resolved alternate forms',
    description:
        'Looks up a single headword (case/whitespace-insensitive) and enriches it with its audio recordings and resolved alternate/inflected forms (each flagged with an href only when that form is itself a real dictionary entry).',
    tags: ['Dictionary'],
    request: { query: WordDetailsQuerySchema },
    responses: {
        200: {
            description: 'The word entry, its recordings, and its resolved alternate forms.',
            content: { 'application/json': { schema: WordDetailsResponseSchema } },
        },
        404: {
            description: 'No dictionary entry matches `word`.',
            content: { 'application/json': { schema: ErrorResponseSchema } },
        },
    },
});
