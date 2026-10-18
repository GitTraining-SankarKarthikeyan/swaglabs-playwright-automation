import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page.js';
import { loginTestCases } from '../test-data/login-data.js';
import { credentials } from '../config/environment.js';

const authFile = 'playwright/.auth/user.json';

setup('authenticate standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
        credentials.standardUser.username,
        credentials.standardUser.password
    );
    await expect(page).toHaveURL(/inventory\.html/);
    await page.context().storageState({ path: authFile });
});