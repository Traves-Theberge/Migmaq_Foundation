import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:3000',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                // Optional override for environments whose cached chromium build
                // doesn't include Playwright's default headless-shell binary.
                launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
                    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
                    : undefined,
            },
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 60_000,
    },
});
