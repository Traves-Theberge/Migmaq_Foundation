import '../openapi/extend-zod';
import { z } from 'zod';

/** Shared `{ error: string }` shape returned by every route on failure. */
export const ErrorResponseSchema = z
    .object({
        error: z.string().openapi({ example: 'Missing word parameter' }),
    })
    .openapi('ErrorResponse');

export const RecordingSchema = z
    .object({
        file: z.string().openapi({ example: 'kesi.mp3' }),
        speaker: z.string().openapi({ example: 'Speaker A' }),
        kind: z.enum(['word', 'example']),
        url: z.string().openapi({
            description: 'Playable URL — a Vercel Blob URL once uploaded, otherwise the local /api/audio/[file] fallback.',
            example: '/api/audio/kesi.mp3',
        }),
    })
    .openapi('Recording');
