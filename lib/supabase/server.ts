import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './database.types';
import { supabaseUrl, supabaseAnonKey } from './env';

/**
 * Server-side client for Server Components/Actions/Route Handlers — reads/
 * writes go through RLS as the signed-in user (their session cookie), never
 * the service role. This is the client every admin CRUD action should use.
 */
export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient<Database>(supabaseUrl(), supabaseAnonKey(), {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
                } catch {
                    // Called from a Server Component render, where cookies can't be
                    // written — safe to ignore since middleware.ts refreshes the
                    // session on every request that needs it.
                }
            },
        },
    });
}
