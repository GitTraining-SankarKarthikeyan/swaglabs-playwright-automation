import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Checkout: Complete!', { exact: true });
        this.confirmationMessage = page.getByText('Thank you for your order!', {exact: true});
    }


}