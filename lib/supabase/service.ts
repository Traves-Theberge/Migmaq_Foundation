import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { supabaseUrl, supabaseServiceRoleKey } from './env';

/**
 * Service-role client — bypasses RLS entirely. Only for one-off scripts
 * (scripts/migrate-to-supabase.ts) run outside a request context, e.g. the
 * initial data migration. NEVER import this from app/** — any admin write
 * triggered by a user request must go through lib/supabase/server.ts so RLS
 * (and therefore the audit log's actor attribution) applies.
 */
export function createServiceClient() {
    return createSupabaseClient<Database>(supabaseUrl(), supabaseServiceRoleKey(), {
        auth: { persistSession: false },
    });
}
