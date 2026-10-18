import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page.js';
import { loginTestCases } from '../test-data/login-data.js';

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.describe('SauceDemo Login', () => {
    for (const testCase of loginTestCases) {
        test(`should handle ${testCase.scenario}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.navigate();
            await loginPage.login(testCase.username, testCase.password);
            if (testCase.expectedOutcome == 'success') {
                await expect(page).toHaveURL(/inventory\.html/);
                await expect(page.getByText('Products', { exact: true })).toBeVisible();
            }
            else {
                await expect(page.locator('[data-test="error"]')).
                    toHaveText(testCase.expectedError!);
            }
        });
    }
});