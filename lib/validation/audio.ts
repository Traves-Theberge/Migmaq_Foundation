import '../openapi/extend-zod';
import { z } from 'zod';
import { registry } from '../openapi/registry';
import { ErrorResponseSchema, RecordingSchema } from './common';

export const LessonAudioQuerySchema = z
    .object({
        word: z.string().min(1, 'Missing word parameter').openapi({
            param: { name: 'word', in: 'query' },
            example: "a'gwesn",
        }),
    })
    .openapi('LessonAudioQuery');

export const LessonAudioResponseSchema = z
    .object({ recordings: z.array(RecordingSchema) })
    .openapi('LessonAudioResponse');

export const AudioFileParamSchema = z
    .object({
        file: z
            .string()
            .regex(/^[^/\\]+\.mp3$/, 'Must be a flat .mp3 filename')
            .refine((f) => !f.includes('..'), 'Path traversal is not allowed')
            .openapi({ param: { name: 'file', in: 'path' }, example: 'kesi.mp3' }),
    })
    .openapi('AudioFileParam');

registry.registerPath({
    method: 'get',
    path: '/api/lesson-audio',
    operationId: 'getRecordingsForWord',
    summary: 'Get audio recordings for a word',
    description:
        'Looks up every recording (all speakers, word-form and example-sentence) for a single Mi’gmaq word from the audio manifest, with playable URLs.',
    tags: ['Audio'],
    request: { query: LessonAudioQuerySchema },
    responses: {
        200: { description: 'Recordings for the word (empty array if none exist).', content: { 'application/json': { schema: LessonAudioResponseSchema } } },
        400: { description: '`word` query parameter was missing.', content: { 'application/json': { schema: ErrorResponseSchema } } },
        429: { description: 'Rate limit exceeded (120 requests/minute per client IP). Retry after the `Retry-After` header value, in seconds.', content: { 'application/json': { schema: ErrorResponseSchema } } },
    },
});

registry.registerPath({
    method: 'get',
    path: '/api/audio/{file}',
    operationId: 'streamAudioFile',
    summary: 'Stream a single recording file (local-development fallback)',
    description:
        'Streams an .mp3 straight from the on-disk Micmac audio archive. Only used before scripts/upload-audio-blob.mjs has run and the manifest has real Vercel Blob URLs — once it has, lesson-audio/word-details responses point directly at Blob storage instead. Rejects anything that is not a flat `<name>.mp3` filename to prevent path traversal.',
    tags: ['Audio'],
    request: { params: AudioFileParamSchema },
    responses: {
        200: { description: 'The raw audio/mpeg file bytes.', content: { 'audio/mpeg': { schema: { type: 'string', format: 'binary' } } } },
        400: { description: 'Filename failed the flat-.mp3 / no-path-traversal check.', content: { 'application/json': { schema: ErrorResponseSchema } } },
        404: { description: 'No such file in the audio archive.', content: { 'application/json': { schema: ErrorResponseSchema } } },
        429: { description: 'Rate limit exceeded (180 requests/minute per client IP). Retry after the `Retry-After` header value, in seconds.', content: { 'application/json': { schema: ErrorResponseSchema } } },
    },
});
