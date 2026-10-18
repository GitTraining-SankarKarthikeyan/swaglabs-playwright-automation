import { test, expect } from '../fixtures/auth-fixture.js';
import { InventoryPage } from '../pages/inventory-page.js';
import { CheckoutOverviewPage } from '../pages/checkout-overview-page.js';
import { CheckoutInformationPage } from '../pages/checkout-information-page.js';
import { CheckoutCompletePage } from '../pages/checkout-complete-page.js';
import { CartPage } from '../pages/cart-page.js';
import { products } from '../test-data/product-data.js';
import { checkoutData } from '../test-data/checkout-data.js';
import * as allure from 'allure-js-commons';

test('should complete a purchase successfully @e2e @smoke', async ({authenticatedPage}) => {
    await allure.feature('Checkout');
    await allure.story('Successful Checkout');
    await allure.severity('critical');
    const inventoryPage = new InventoryPage(authenticatedPage);
    const cartPage = new CartPage(authenticatedPage);
    const checkoutOverviewPage = new CheckoutOverviewPage(authenticatedPage);
    const checkoutInformationPage = new CheckoutInformationPage(authenticatedPage);
    const checkoutCompletePage = new CheckoutCompletePage(authenticatedPage);
    const productName = products.backpack;

    // Add Product
    await inventoryPage.addProductToCart(productName);
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    await inventoryPage.openCart();

    // Cart
    await cartPage.proceedToCheckout();

    // Checkout Information
    await expect(checkoutInformationPage.pageTitle).toBeVisible();
    await checkoutInformationPage.fillCustomerInformation(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
    );
    await checkoutInformationPage.continueCheckout();

    // Checkout Overview
    await expect(checkoutOverviewPage.pageTitle).toBeVisible();
    await checkoutOverviewPage.finishCheckout();

    // Order Confirmation
    await expect(checkoutCompletePage.pageTitle).toBeVisible();
    await expect(checkoutCompletePage.confirmationMessage).toBeVisible();
});