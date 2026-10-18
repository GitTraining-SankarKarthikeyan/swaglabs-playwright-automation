import { Page, Locator } from '@playwright/test';

export class CheckoutInformationPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.zipCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.locator('#continue');
    }

    async fillCustomerInformation(firstName: string, lastName: string, zipCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);
    }

    async continueCheckout(){
        await this.continueButton.click();
    }

}