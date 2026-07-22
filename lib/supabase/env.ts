/** Fails fast with a clear message instead of a cryptic downstream error when an env var is missing. */
function required(name: string): string {
    const value = process.env[name];
    if (!value) throw new Error(`Missing required env var: ${name} (see .env.local.example)`);
    return value;
}

export function supabaseUrl(): string {
    return required('NEXT_PUBLIC_SUPABASE_URL');
}

export function supabaseAnonKey(): string {
    return required('NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

/** Server-only — bypasses RLS. Never import this file from a Client Component. */
export function supabaseServiceRoleKey(): string {
    return required('SUPABASE_SERVICE_ROLE_KEY');
}
