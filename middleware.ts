import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    return updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Run on everything except static assets, images, and favicon — the
         * session needs refreshing on every navigable route, not just /admin,
         * so a signed-in editor's session doesn't expire while browsing the
         * public site in the same tab.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
