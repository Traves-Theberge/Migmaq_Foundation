import { requireSuperAdmin } from '@/lib/supabase/auth';
import SwaggerUIClient from '@/components/admin/SwaggerUIClient';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "API Docs — Admin — Mi'gmaq Foundation",
};

/**
 * Interactive OpenAPI/Swagger documentation for the site's API. Gated to
 * super_admin in application code (requireSuperAdmin redirects everyone
 * else to /admin) since API docs aren't a database resource RLS can gate.
 */
export default async function ApiDocsPage() {
    await requireSuperAdmin();

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-black uppercase tracking-tight">API Docs</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Interactive OpenAPI 3.1 reference, generated from the same Zod schemas every route validates against at runtime.
                </p>
            </div>
            <div className="border-[3px] border-foreground bg-card [color-scheme:light]">
                <SwaggerUIClient url="/api/openapi.json" />
            </div>
        </div>
    );
}
