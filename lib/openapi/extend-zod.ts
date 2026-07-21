import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

/**
 * Adds `.openapi(...)` to every Zod schema. This has a global, one-time
 * side effect on the shared `zod` module — every file that defines an
 * OpenAPI-documented schema must import this file first (before calling
 * `.openapi()`), which is why lib/validation/*.ts all start with it.
 */
extendZodWithOpenApi(z);
