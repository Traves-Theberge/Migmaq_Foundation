import { NextResponse } from 'next/server';
import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { registry } from '@/lib/openapi/registry';

// Import every schema-defining module for its registry.registerPath() side
// effect — none of their exports are used directly here.
import '@/lib/validation/dictionary';
import '@/lib/validation/games';
import '@/lib/validation/audio';
import '@/lib/validation/health';
import '@/lib/validation/admin-search';

let cachedDocument: ReturnType<OpenApiGeneratorV31['generateDocument']> | null = null;

function buildDocument() {
    const generator = new OpenApiGeneratorV31(registry.definitions);
    return generator.generateDocument({
        openapi: '3.1.0',
        info: {
            title: 'Mi’gmaq Foundation API',
            version: '1.0.0',
            description:
                'Public content endpoints (dictionary, games, audio) and the RLS-scoped admin quick-search endpoint that back mi’gmaqfoundation.org and its /admin CMS. Every operationId is a human- and AI-readable verb+noun pair (e.g. `getWordDetails`) suitable for direct use as a tool/function name by LLM agents. Public GET endpoints under /api/dictionary, /api/games/*, /api/audio/*, and /api/lesson-audio require no authentication. Endpoints under /api/admin/* additionally require a Supabase session with the editor, admin, or super_admin role — see the cookieAuth and bearerAuth security schemes.',
            contact: { name: 'Mi’gmaq Foundation' },
        },
        servers: [{ url: '/', description: 'Same-origin' }],
        tags: [
            { name: 'Dictionary', description: 'Public read access to the Mi’gmaq-English-French dictionary.' },
            { name: 'Games', description: 'Randomized content for the flashcard and quiz learning games.' },
            { name: 'Audio', description: 'Word and example-sentence audio recordings.' },
            { name: 'System', description: 'Operational endpoints (liveness, etc.) not part of the content API.' },
            { name: 'Admin · Search', description: 'Authenticated endpoints backing the /admin CMS. Require an editor/admin/super_admin Supabase session.' },
        ],
    });
}

/**
 * Serves the generated OpenAPI 3.1 document backing the Swagger UI page at
 * /admin/api-docs (super_admin only — see lib/supabase/auth.ts's
 * requireSuperAdmin). Generated once per server lifetime from the same Zod
 * schemas every route validates against at runtime, so the spec can't drift
 * from the actual validation behavior.
 */
export async function GET() {
    if (!cachedDocument) {
        cachedDocument = buildDocument();
    }
    return NextResponse.json(cachedDocument);
}
