import { test, expect } from '../fixtures/auth-fixture.js';
import { InventoryPage } from '../pages/inventory-page.js';
import { CartPage } from '../pages/cart-page.js';
import { products } from '../test-data/product-data.js';

test.describe('SauceDemo Cart', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
        const inventoryPage = new InventoryPage(authenticatedPage);
        await inventoryPage.addProductToCart(products.backpack);
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
        await inventoryPage.openCart();
    });

    test('should proceed to checkout', async ({ authenticatedPage }) => {
        const cartPage = new CartPage(authenticatedPage);
        await cartPage.proceedToCheckout();
        await expect(authenticatedPage).toHaveURL(/checkout-step-one\.html/);
    });
});