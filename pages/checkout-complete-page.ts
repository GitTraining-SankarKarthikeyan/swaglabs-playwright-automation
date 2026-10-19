import { Page, Locator, Download } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly confirmationMessage: Locator;
    readonly generatePdfOrder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Checkout: Complete!', { exact: true });
        this.confirmationMessage = page.getByText('Thank you for your order!', { exact: true });
        this.generatePdfOrder = page.getByRole('button', { name: 'Generate PDF order' });
    }

    async downloadOrder(): Promise<Download> {
        const downloadPromise = this.page.waitForEvent('download');
        await this.generatePdfOrder.click();
        return downloadPromise;
    }

}