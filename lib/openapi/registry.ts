import './extend-zod';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

/**
 * Single shared registry. Every file under lib/validation/*.ts imports this
 * and calls registry.register()/registerPath() as a module-load side
 * effect — the Zod schema used for runtime validation IS the schema used
 * to generate the OpenAPI document, so the two can't drift apart.
 * app/api/openapi.json/route.ts imports every lib/validation/*.ts file
 * (for that side effect) before generating the document.
 */
export const registry = new OpenAPIRegistry();

registry.registerComponent('securitySchemes', 'cookieAuth', {
    type: 'apiKey',
    in: 'cookie',
    name: 'sb-access-token',
    description:
        "Browser session cookie set by Supabase Auth after signing in at /admin/login. Sent automatically by same-origin requests from the admin UI — nothing to configure for browser use.",
});

registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description:
        'Supabase-issued JWT access token, for programmatic or external clients that are not the admin browser app itself. Obtain one via supabase.auth.signInWithPassword() (or any Supabase client SDK) using an account with the editor, admin, or super_admin role, then send it as `Authorization: Bearer <access_token>`. Every admin endpoint enforces the same Postgres row-level security regardless of which auth method was used to obtain the session.',
});
