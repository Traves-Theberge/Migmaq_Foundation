import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Automated accessibility regression check. Runs axe-core against one
 * representative page per route family and fails on any "serious" or
 * "critical" impact violation — a zero-violation bar including
 * "minor"/"moderate" isn't realistic to hold immediately across a site
 * this size, so serious/critical is the meaningful regression gate.
 */
const ROUTES: Array<[name: string, path: string]> = [
    ['home', '/'],
    ['dictionary list', '/dictionary'],
    ['dictionary word', "/dictionary/a'gwesn"],
    ['education', '/education'],
    ['lessons list', '/education/lessons'],
    ['lesson detail', '/education/lessons/personal-pronouns'],
    ['games index', '/games'],
    ['flashcard game', '/games/flashcard'],
    ['quiz game', '/games/quiz'],
];

for (const [name, path] of ROUTES) {
    test(`${name} has no serious/critical a11y violations`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        // Several pages use staggered/entrance framer-motion animations that
        // are still mid-fade at networkidle; scanning too early makes axe
        // see a transient low-opacity state and misreport color-contrast.
        await page.waitForTimeout(1200);

        const results = await new AxeBuilder({ page }).analyze();
        const seriousOrCritical = results.violations.filter(
            (v) => v.impact === 'serious' || v.impact === 'critical'
        );

        if (seriousOrCritical.length > 0) {
            const details = seriousOrCritical
                .map((v) => {
                    const nodes = v.nodes.map((n) => `      ${n.target.join(' ')}`).join('\n');
                    return `- [${v.impact}] ${v.id}: ${v.description}\n${nodes}`;
                })
                .join('\n');
            throw new Error(`Accessibility violations on ${path}:\n${details}`);
        }

        expect(seriousOrCritical).toEqual([]);
    });
}
