import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from './database.types';
import { supabaseUrl, supabaseAnonKey } from './env';

const ADMIN_PREFIX = '/admin';
const LOGIN_PATH = '/admin/login';

/**
 * Refreshes the Supabase session cookie on every request and gates /admin/**
 * behind auth — the actual role check (admin/editor) happens in
 * app/admin/layout.tsx, which can query the profiles table; middleware only
 * confirms a session exists, since it can't safely make a DB round-trip
 * without adding latency to every request.
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

    return response;
}
