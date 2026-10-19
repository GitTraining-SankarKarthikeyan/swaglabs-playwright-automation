import { test, expect } from '@playwright/test';

test.describe('Agent seed', () => {
    test('authenticated inventory page', async ({ page }) => {
        await page.goto('/inventory.html');

        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
    });
});