import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly cartLink: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Products', { exact: true });
        this.cartLink = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    productAddToCartButton(productName: string): Locator {
        return this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
    }

    async addProductToCart(productName: string) {
        await this.productAddToCartButton(productName).getByRole('button', { name: 'Add to cart' }).click();
    }

    async openCart() {
        await this.cartLink.click();
    }

    async getProductNames(): Promise<string[]> {
        return await this.page
            .locator('[data-test="inventory-item-name"]')
            .allTextContents();
    }


}