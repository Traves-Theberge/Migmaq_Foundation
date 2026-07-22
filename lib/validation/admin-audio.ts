import '../openapi/extend-zod';
import { z } from 'zod';

/**
 * Validates app/admin/audio/actions.ts's create/update form data. Not
 * OpenAPI-documented — Server Action form data, not a stable HTTP contract.
 */
export const AudioRecordingFormSchema = z.object({
    word: z.string().trim().min(1, 'A word is required.'),
    file: z.string().trim().min(1, 'A filename is required.'),
    speaker: z.string().trim().min(1, 'A speaker is required.'),
    kind: z.enum(['word', 'example']),
    url: z.string().trim().min(1, 'A URL is required.'),
});

export const AudioRecordingIdSchema = z.string().uuid('Missing recording id.');
