import '../openapi/extend-zod';
import { z } from 'zod';
import { registry } from '../openapi/registry';

export const HealthResponseSchema = z
    .object({
        status: z.literal('ok'),
        timestamp: z.string().datetime().openapi({ example: '2026-07-21T14:32:00.000Z' }),
    })
    .openapi('HealthResponse');

registry.registerPath({
    method: 'get',
    path: '/api/health',
    operationId: 'getHealthStatus',
    summary: 'Liveness check',
    description: 'Always returns 200 with the current server time. Used by uptime monitors; does not touch the database.',
    tags: ['System'],
    responses: {
        200: { description: 'Server is up.', content: { 'application/json': { schema: HealthResponseSchema } } },
    },
});
