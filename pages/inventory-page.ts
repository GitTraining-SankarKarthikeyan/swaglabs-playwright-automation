import { type Page, type Locator } from '@playwright/test';

export type ProductSortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly cartLink: Locator;
    readonly shoppingCartBadge: Locator;
    readonly sortDropdown: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Products', { exact: true });
        this.cartLink = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
        this.productPrices = page.locator('[data-test="inventory-item-price"]');
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

    async sortProductsBy(option: ProductSortOption) {
        await this.sortDropdown.selectOption(option);
    }

    async getProductNames() {
        return await this.productNames.allTextContents();
    }

    async getProductPrices(): Promise<string[]> {
        return await this.productPrices.allTextContents();
    }


}