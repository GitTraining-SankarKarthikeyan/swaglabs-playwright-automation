import { test, expect } from '@playwright/test';
import { productSortingData } from '../test-data/product-data.js';
import { InventoryPage, type ProductSortOption } from '../pages/inventory-page.js';

test.describe('Inventory Product Sorting', () => {
    for (const sortingData of productSortingData) {
        test(`should sort products by ${sortingData.name}`, async ({ page }) => {
            const inventoryPage = new InventoryPage(page);

            await page.goto('/inventory.html');
            await expect(inventoryPage.pageTitle).toBeVisible();
            await inventoryPage.sortProductsBy(
                sortingData.option as ProductSortOption
            );

            if ('expectedNames' in sortingData) {
                const actualNames = await inventoryPage.getProductNames();
                expect(actualNames).toEqual(sortingData.expectedNames);
            }

            if ('expectedPrices' in sortingData) {
                const actualPrices = await inventoryPage.getProductPrices();
                expect(actualPrices).toEqual(sortingData.expectedPrices);
            }
        });
    }
});