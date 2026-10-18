import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page.js';
import { loginTestCases } from '../test-data/login-data.js';

type AuthFixtures = {
    authenticatedPage: Page;
}

export const test = base.extend<AuthFixtures>({
    authenticatedPage: async ({ page }, use) => {
        await page.goto('/inventory.html');
        await expect(page).toHaveURL(/inventory\.html/);
        await use(page);
    }
});

export { expect };
