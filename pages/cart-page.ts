import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Your Cart', { exact: true });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout'});
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping'});
    }

    async proceedToCheckout(){
        await this.checkoutButton.click();
    }
}