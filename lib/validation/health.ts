import '../openapi/extend-zod';
import { z } from 'zod';
import { registry } from '../openapi/registry';

export const HealthResponseSchema = z
    .object({
        status: z.enum(['ok', 'degraded']).openapi({ description: '"degraded" means the app is up but a dependency check failed.' }),
        timestamp: z.string().datetime().openapi({ example: '2026-07-21T14:32:00.000Z' }),
        checks: z
            .object({
                database: z.enum(['ok', 'error']).openapi({ description: 'Result of a real Supabase/Postgres round trip, not just process liveness.' }),
            })
            .openapi({ description: 'Per-dependency results — always present, even when status is "ok".' }),
    })
    .openapi('HealthResponse');

registry.registerPath({
    method: 'get',
    path: '/api/health',
    operationId: 'getHealthStatus',
    summary: 'Liveness + dependency check',
    description:
        'Returns the current server time plus a real Supabase/Postgres connectivity check (a public-read query against dictionary_words, bounded by a short timeout so a hung database can\'t hang this endpoint) — not just process liveness. Returns HTTP 200 with status "ok" when healthy, HTTP 503 with status "degraded" when the database check fails, so uptime monitors can distinguish "the app process is up" from "the app actually works."',
    tags: ['System'],
    responses: {
        200: { description: 'Server is up and the database check passed.', content: { 'application/json': { schema: HealthResponseSchema } } },
        503: { description: 'Server is up but the database check failed.', content: { 'application/json': { schema: HealthResponseSchema } } },
    },
});
