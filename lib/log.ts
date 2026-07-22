/**
 * Dependency-free structured server-side logging. `console.error`/`warn`
 * output is captured by Vercel's log drain (or any `next start` process
 * supervisor) automatically — no separate error-tracking service is wired
 * up. `scope` should be a grep-able "where" (route path or action name);
 * `context` should carry the request-specific values (a word, an id) that
 * turn "it failed" into "it failed for X". Swap the body for a Sentry/other
 * APM call later if one gets adopted — every call site stays the same.
 */
type LogContext = Record<string, unknown>;

function serializeError(error: unknown) {
    return error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error;
}

export function logError(scope: string, message: string, error?: unknown, context?: LogContext) {
    console.error(`[${scope}] ${message}`, { ...context, ...(error !== undefined ? { error: serializeError(error) } : {}) });
}

export function logWarn(scope: string, message: string, context?: LogContext) {
    console.warn(`[${scope}] ${message}`, context ?? {});
}
