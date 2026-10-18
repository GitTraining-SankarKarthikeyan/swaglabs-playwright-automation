import { defineConfig, devices } from '@playwright/test';
import { environmentConfig } from './config/environment.js';
import { env } from './utils/env.js';

export default defineConfig({
    testDir: './tests',
    testMatch: [
        '**/*.spec.ts',
        '**/*.setup.ts',
    ],
    forbidOnly: Boolean(process.env.CI),
    workers: process.env.CI ? 1 : undefined,
    retries: process.env.CI ? 2 : 0,
    timeout: 30_000,
    expect: {
        timeout: 10_000
    },
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['allure-playwright', { resultsDir: 'allure-results' }],
    ],

    reportSlowTests: {
        max: 5,
        threshold: 30_000
    },
    use: {
        baseURL: environmentConfig.uiBaseUrl,
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
            use: {
                browserName: 'chromium',
                channel: 'msedge',
            }
        },

        {
            name: 'edge',
            testMatch: /.*\.spec\.ts/,
            testIgnore: /.*\/api\/.*\.spec\.ts/,
            use: {
                browserName: 'chromium',
                channel: 'msedge',
                storageState: 'playwright/.auth/user.json'
            },
            dependencies: ['setup']
        },

        {
            name: 'api',
            testMatch: /.*\/api\/.*\.spec\.ts/,
            use: {
                baseURL: environmentConfig.apiBaseUrl,
            }
        },

    ]
});