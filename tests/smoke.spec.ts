import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page.js'; 

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test('SauceDemo login page loads successfully @smoke', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();  
    await expect(loginPage.loginButton).toBeVisible();  
});