import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';
import { createClient as createCookieClient } from './server';
import { supabaseUrl, supabaseAnonKey } from './env';
import type { Database } from './database.types';
import { logWarn } from '@/lib/log';

export interface ApiAuthResult {
    supabase: SupabaseClient<Database>;
    user: User | null;
}

/**
 * Dual-auth entry point for API routes documented with both `cookieAuth`
 * and `bearerAuth` in lib/openapi/registry.ts: browser requests from the
 * admin UI carry a Supabase session cookie, external/programmatic clients
 * send `Authorization: Bearer <access_token>` instead. Whichever is
 * present, the returned `supabase` client forwards it on every request so
 * Postgres RLS resolves `auth.uid()` the same way regardless of which auth
 * method was used — there is no separate, weaker code path for bearer
 * tokens.
 */
export async function createApiClient(request: Request): Promise<ApiAuthResult> {
    const authHeader = request.headers.get('authorization');
    const bearerToken = authHeader?.match(/^Bearer\s+(.+)$/i)?.[1];

    if (bearerToken) {
        const supabase = createSupabaseClient<Database>(supabaseUrl(), supabaseAnonKey(), {
            global: { headers: { Authorization: `Bearer ${bearerToken}` } },
            auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data: { user }, error } = await supabase.auth.getUser(bearerToken);
        if (error) logWarn('createApiClient', 'bearer token rejected by Supabase Auth', { reason: error.message });
        return { supabase, user };
    }

    const supabase = await createCookieClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) logWarn('createApiClient', 'session cookie rejected by Supabase Auth', { reason: error.message });
    return { supabase, user };
}
