import { test, expect } from '../fixtures/auth-fixture.js';
import { LoginPage } from '../pages/login-page.js';
import { InventoryPage } from '../pages/inventory-page.js';
import { products } from '../test-data/product-data.js';
import { loginTestCases } from '../test-data/login-data.js';

test.describe('SauceDemo Inventory', () => {
    
    test('should display the Products page', async ({ authenticatedPage }) => {
        const inventoryPage = new InventoryPage(authenticatedPage);
        await expect(inventoryPage.pageTitle).toBeVisible();    
        await expect(authenticatedPage).toHaveURL(/inventory\.html/);
    });

    test('should add a product to the cart', async({authenticatedPage}) => {
        const inventoryPage = new InventoryPage(authenticatedPage);
        await inventoryPage.addProductToCart(products.backpack);
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    });

    test('should display all expected products', async ({authenticatedPage}) => {
        const inventoryPage = new InventoryPage(authenticatedPage);
        const actualProductNames = await inventoryPage.getProductNames();
        expect(actualProductNames).toEqual(Object.values(products));
    });

});