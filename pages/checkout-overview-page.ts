import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Checkout: Overview', { exact: true });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

}