import { test as base, expect, type Page } from '@playwright/test';

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
