import { NextResponse } from 'next/server';

/**
 * Dependency-free, per-instance rate limiting for the public (unauthenticated)
 * API routes. Fixed-window counter keyed by client IP + route, held in memory.
 *
 * Known limitation: this only limits requests hitting the *same* server
 * process. On a multi-instance/serverless deployment (e.g. Vercel functions),
 * each instance has its own counter, so the effective limit is
 * `limit × instance count`, not a hard global cap. That's still a real
 * improvement over no limiting at all, and adding a shared store (e.g.
 * Upstash Redis) to close that gap is a deliberate follow-up, not an
 * oversight — it's a new paid dependency this repo doesn't otherwise need.
 */
const WINDOW_MS = 60_000;
const buckets = new Map<string, { count: number; resetAt: number }>();

// Bounds memory under sustained abuse from many distinct IPs — evict the
// oldest-inserted entry rather than let the map grow without limit.
const MAX_BUCKETS = 50_000;

function clientIp(request: Request): string {
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) return forwardedFor.split(',')[0].trim();
    return request.headers.get('x-real-ip') ?? 'unknown';
}

/**
 * Call at the top of a route handler with a per-route `limit` (requests per
 * client IP per 60s). Returns a ready-to-return 429 NextResponse if the
 * caller is over the limit, or `null` if the request should proceed.
 *
 *   const limited = rateLimit(request, 'dictionary', 120);
 *   if (limited) return limited;
 */
export function rateLimit(request: Request, routeKey: string, limit: number): NextResponse | null {
    const now = Date.now();
    const key = `${routeKey}:${clientIp(request)}`;

    const existing = buckets.get(key);
    if (!existing || existing.resetAt <= now) {
        if (buckets.size >= MAX_BUCKETS) {
            const oldestKey = buckets.keys().next().value;
            if (oldestKey) buckets.delete(oldestKey);
        }
        buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
        return null;
    }

    if (existing.count >= limit) {
        const retryAfterSeconds = Math.ceil((existing.resetAt - now) / 1000);
        return NextResponse.json(
            { error: 'Too many requests — please slow down and try again shortly.' },
            { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
        );
    }

    existing.count += 1;
    return null;
}
