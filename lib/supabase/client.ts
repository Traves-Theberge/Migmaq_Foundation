"use client";

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';
import { supabaseUrl, supabaseAnonKey } from './env';

/** Browser-side client for Client Components — reads/writes go through RLS as the signed-in user. */
export function createClient() {
    return createBrowserClient<Database>(supabaseUrl(), supabaseAnonKey());
}
