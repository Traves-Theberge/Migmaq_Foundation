import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from './database.types';
import { supabaseUrl, supabaseAnonKey } from './env';

const ADMIN_PREFIX = '/admin';
const LOGIN_PATH = '/admin/login';

/**
 * Content-Security-Policy. 'unsafe-inline' on both script-src and style-src
 * is a deliberate, tested choice, not an oversight:
 *
 * - style-src: React renders every JSX `style={{...}}` prop as a literal
 *   inline `style="..."` attribute during SSR (used throughout this app),
 *   and swagger-ui-react (/admin/api-docs) injects its own <style> tags at
 *   runtime.
 * - script-src: Next.js's App Router renders several inline <script> tags
 *   per page itself (hydration/RSC payload data) with no built-in way to
 *   nonce or hash them from application code. A nonce-based policy was
 *   tried and verified live (Playwright console capture across every
 *   public route) to break every one of those framework-inserted scripts,
 *   independent of 'strict-dynamic' — removing that didn't fix it either,
 *   since the framework's own scripts were never getting the nonce
 *   attribute in the first place. Hash-allowlisting doesn't work here
 *   either: their content isn't static (it embeds the page's own render
 *   payload). Locking down script-src on this framework, in this version,
 *   isn't achievable without a much larger and riskier change than the
 *   security gain justifies right now.
 *
 * Real value this still provides: no script/style/font/image/frame/
 * connection is allowed from a *third-party origin* that isn't explicitly
 * listed — the actual protection CSP is usually deployed for (blocking a
 * compromised or malicious external host from being loaded at all) is
 * fully in force. What it does NOT add on top of that is inline-script
 * injection protection, which the app didn't have before this either
 * (there was no CSP at all).
 */
// React's Fast Refresh/dev-mode error overlay uses eval() to reconstruct
// stack traces across module boundaries — verified via Playwright console
// capture against `next dev` — and says so explicitly in its own console
// warning ("React will never use eval() in production mode"). Confirmed
// separately that `next build && next start` needs no such allowance: a
// full pass over every public route plus /admin/login found zero CSP
// violations without it.
const CSP = [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https://*.supabase.co https://*.public.blob.vercel-storage.com`,
    `font-src 'self' data:`,
    `connect-src 'self' https://*.supabase.co`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
].join('; ');

/**
 * Refreshes the Supabase session cookie on every request, gates /admin/**
 * behind auth, and sets the Content-Security-Policy header — the actual
 * role check (admin/editor) happens in app/admin/layout.tsx, which can
 * query the profiles table; middleware only confirms a session exists,
 * since it can't safely make a DB round-trip without adding latency to
 * every request.
 */
export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient<Database>(supabaseUrl(), supabaseAnonKey(), {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                response = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
            },
        },
    });

    const { data: { user } } = await supabase.auth.getUser();

    const isAdminRoute = request.nextUrl.pathname.startsWith(ADMIN_PREFIX);
    const isLoginRoute = request.nextUrl.pathname === LOGIN_PATH;

    if (isAdminRoute && !isLoginRoute && !user) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = LOGIN_PATH;
        redirectUrl.searchParams.set('next', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    if (isLoginRoute && user) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = ADMIN_PREFIX;
        redirectUrl.search = '';
        return NextResponse.redirect(redirectUrl);
    }

    response.headers.set('Content-Security-Policy', CSP);
    return response;
}
