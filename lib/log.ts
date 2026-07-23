/**
 * Dependency-free structured server-side logging. `console.error`/`warn`
 * output is captured by Vercel's log drain (or any `next start` process
 * supervisor) automatically — no separate error-tracking service is wired
 * up. `scope` should be a grep-able "where" (route path or action name);
 * `context` should carry the request-specific values (a word, an id) that
 * turn "it failed" into "it failed for X".
 *
 * Deliberate choice, not a placeholder: a Sentry-vs-Vercel-native-vs-
 * nothing decision was raised and left unanswered, so this settled on the
 * option that adds no new paid dependency or third-party data flow
 * without that being an explicit ask. Every call site funnels through
 * logError()/logWarn() specifically so that decision can be revisited
 * later (swap the body for a Sentry/other APM call) without touching
 * every call site individually if one gets adopted.
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
