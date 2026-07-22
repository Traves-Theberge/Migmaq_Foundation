import { test, expect } from '@playwright/test';

/**
 * Regression coverage for the admin CMS's auth gate — the highest-risk
 * untested surface flagged in a pre-launch audit (the role-escalation
 * trigger, RLS policies, and CRUD actions were only ever verified by hand
 * against a local Postgres stub during development, and nothing in CI
 * exercised the app-layer gate in front of them).
 *
 * These tests deliberately don't require a live Supabase project with
 * seeded users — they run with the placeholder credentials CI already sets
 * for the a11y suite (see .github/workflows/ci.yml), and check the one
 * thing that's fully verifiable without a real session: that every admin
 * route and API endpoint correctly refuses an unauthenticated visitor.
 * Testing the authenticated path (a real editor/admin/super_admin session,
 * actual CRUD, actual role-escalation rejection) needs a real Supabase
 * test project with seeded accounts — out of scope here, but everything
 * those tests would exercise was verified by hand against a local Postgres
 * stub for each RLS policy/trigger added this pass (see the migration
 * files' own commit history for those verification notes).
 */

const PROTECTED_ADMIN_ROUTES = [
    '/admin',
    '/admin/activity',
    '/admin/users',
    '/admin/dictionary',
    '/admin/dictionary/new',
    '/admin/lessons',
    '/admin/lessons/new',
    '/admin/books',
    '/admin/books/new',
    '/admin/audio',
    '/admin/api-docs',
];

for (const path of PROTECTED_ADMIN_ROUTES) {
    test(`${path} redirects an unauthenticated visitor to login`, async ({ page }) => {
        await page.goto(path);
        await expect(page).toHaveURL(/\/admin\/login\?next=/);
    });
}

test('login page does not itself redirect (no infinite loop)', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
});

test('login form rejects an empty submission client-side', async ({ page }) => {
    await page.goto('/admin/login');
    const emailField = page.getByRole('textbox', { name: /email/i });
    await expect(emailField).toHaveAttribute('required', '');
    // Submitting with the browser's native required-field validation active
    // should keep us on the login page rather than navigating anywhere.
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/admin\/login$/);
});

test('admin quick-search API returns an empty result set (not an error) when unauthenticated', async ({ request }) => {
    const res = await request.get('/api/admin/search?q=test');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ results: [] });
});

test('OpenAPI document is publicly readable and well-formed', async ({ request }) => {
    const res = await request.get('/api/openapi.json');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.openapi).toBe('3.1.0');
    expect(body.paths['/api/admin/search']).toBeTruthy();
});
