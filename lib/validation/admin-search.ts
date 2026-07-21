import '../openapi/extend-zod';
import { z } from 'zod';
import { registry } from '../openapi/registry';

export const AdminSearchQuerySchema = z
    .object({
        q: z.string().trim().openapi({
            param: { name: 'q', in: 'query' },
            description: 'Search text. Queries shorter than 2 characters return an empty result set rather than an error.',
            example: 'a\'gwesn',
        }),
    })
    .openapi('AdminSearchQuery');

export const SearchResultSchema = z
    .object({
        kind: z.enum(['dictionary', 'lesson', 'book']),
        id: z.string(),
        title: z.string(),
        subtitle: z.string(),
    })
    .openapi('SearchResult');

export const AdminSearchResponseSchema = z
    .object({ results: z.array(SearchResultSchema) })
    .openapi('AdminSearchResponse');

registry.registerPath({
    method: 'get',
    path: '/api/admin/search',
    operationId: 'searchAdminContent',
    summary: 'Quick-search dictionary words, lessons, and books',
    description:
        'Powers the admin ⌘K command palette. Searches dictionary word text, lesson titles, and book subtitles (up to 5/4/3 results respectively) through the caller\'s own RLS-scoped Supabase session — an unauthenticated or unauthorized caller gets an empty result set, not an error, so the endpoint never reveals whether content exists to someone who can\'t read it.',
    tags: ['Admin · Search'],
    security: [{ cookieAuth: [] }, { bearerAuth: [] }],
    request: { query: AdminSearchQuerySchema },
    responses: {
        200: { description: 'Matching results across all three content types (possibly empty).', content: { 'application/json': { schema: AdminSearchResponseSchema } } },
    },
});
