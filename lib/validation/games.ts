import '../openapi/extend-zod';
import { z } from 'zod';
import { registry } from '../openapi/registry';
import { ErrorResponseSchema } from './common';

export const FlashcardPairSchema = z
    .object({
        id: z.string().openapi({ example: 'word_0' }),
        content: z.string().openapi({ example: "a'gwesn" }),
        type: z.enum(['word', 'translation']),
        matchId: z.string().openapi({
            description: 'Shared between the word card and its translation card that make up one matching pair.',
            example: 'pair_0',
        }),
    })
    .openapi('FlashcardPair');

export const FlashcardResponseSchema = z.array(FlashcardPairSchema).openapi('FlashcardResponse');

export const QuizQuestionSchema = z
    .object({
        word: z.string().openapi({ example: "a'gwesn" }),
        correctAnswer: z.string(),
        options: z.array(z.string()).length(4).openapi({
            description: 'Four translation options in randomized order, one of which is correctAnswer.',
        }),
    })
    .openapi('QuizQuestion');

export const QuizResponseSchema = z.array(QuizQuestionSchema).openapi('QuizResponse');

registry.registerPath({
    method: 'get',
    path: '/api/games/flashcard',
    operationId: 'getFlashcardPairs',
    summary: 'Get a shuffled set of word/translation flashcard pairs',
    description:
        'Picks 6 random dictionary words that have at least one translation and returns them split into word cards and translation cards (12 cards total), pre-shuffled, for a matching game. Random per request — not cached.',
    tags: ['Games'],
    responses: {
        200: { description: 'Shuffled flashcard pairs.', content: { 'application/json': { schema: FlashcardResponseSchema } } },
        429: { description: 'Rate limit exceeded (30 requests/minute per client IP). Retry after the `Retry-After` header value, in seconds.', content: { 'application/json': { schema: ErrorResponseSchema } } },
        500: { description: 'The dictionary is empty or unreadable.', content: { 'application/json': { schema: ErrorResponseSchema } } },
    },
});

registry.registerPath({
    method: 'get',
    path: '/api/games/quiz',
    operationId: 'getQuizQuestions',
    summary: 'Get a set of multiple-choice translation quiz questions',
    description:
        'Generates 5 random multiple-choice questions, each asking for the translation of a Mi’gmaq word with 3 randomly-chosen wrong-answer distractors. Random per request — not cached.',
    tags: ['Games'],
    responses: {
        200: { description: 'Quiz questions.', content: { 'application/json': { schema: QuizResponseSchema } } },
        429: { description: 'Rate limit exceeded (30 requests/minute per client IP). Retry after the `Retry-After` header value, in seconds.', content: { 'application/json': { schema: ErrorResponseSchema } } },
        500: { description: 'The dictionary is empty or unreadable.', content: { 'application/json': { schema: ErrorResponseSchema } } },
    },
});
