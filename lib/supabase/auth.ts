import { redirect } from 'next/navigation';
import { createClient } from './server';
import type { AppRole } from './database.types';

export interface SessionProfile {
    id: string;
    email: string;
    role: AppRole;
    avatar_url: string | null;
}

/**
 * Fetches the signed-in user's profile (id/email/role). Redirects to the
 * login page if there's no session, or to a plain "not authorized" state if
 * the account exists but was never granted editor/admin (e.g. a stray
 * Supabase Auth signup with no role assigned) — middleware only checks that
 * *a* session exists, this is where the actual role gate lives.
 */
export async function requireStaffProfile(): Promise<SessionProfile> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect('/admin/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('id, email, role, avatar_url')
        .eq('id', user.id)
        .single();

    if (!profile || (profile.role !== 'admin' && profile.role !== 'editor')) {
        redirect('/admin/login?error=not-authorized');
    }

    return profile;
}
