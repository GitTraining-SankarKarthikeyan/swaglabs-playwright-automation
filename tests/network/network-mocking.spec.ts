import { test, expect } from '@playwright/test';

test.describe('Network Interception Tests', () => {

    test('should mock an API response using route.fulfill() @network', async ({ page }) => {

        const mockedPost = {
            userId: 99,
            id: 1,
            title: 'This response came from Playwright',
            body: 'The real API response was replaced by route.fulfill()',
        }

        await page.route('**/posts/1', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedPost),

            });

        });

        await page.goto('https://jsonplaceholder.typicode.com/posts/1');
        await expect(page.locator('body')).toContainText('This response came from Playwright');

    });

    test('should intercept and continue a real request @network', async ({ page }) => {
        let interceptedUrl = '';

        await page.route('**/posts/1', async (route) => {
            interceptedUrl = route.request().url();
            await route.continue();
        });

        await page.goto('https://jsonplaceholder.typicode.com/posts/1');
        expect(interceptedUrl).toContain('/posts/1');
        await expect(page.locator('body')).toContainText('sunt aut facere repellat');
    });

    test('should abort a network request @network', async ({ page }) => {
        let requestWasAborted = false;

        await page.route('**/posts/1', async (route) => {
            requestWasAborted = true;
            await route.abort();
        });

        await page.goto('https://jsonplaceholder.typicode.com/posts/1').catch(() => {
            // Navigation failure is expected because we aborted the request
        });

        expect(requestWasAborted).toBeTruthy();
    });

    test('should capture and validate a network response @network', async ({ page }) => {
        const responsePromise = page.waitForResponse(
            (response) =>
                response.url().includes('posts/1') &&
                response.status() === 200
        );

        await page.goto('https://jsonplaceholder.typicode.com/posts/1');

        const response = await responsePromise;

        expect(response.status()).toBe(200);
        expect(response.url()).toContain('/posts/1');

        const responseBody = await response.json();

        expect(responseBody.id).toBe(1);
        expect(responseBody.userId).toBe(1);
    });

    test('should capture and validate a network request @network', async ({ page }) => {
        const requestPromise = page.waitForRequest(
            (request) =>
                request.url().includes('/posts/1') &&
                request.method() === 'GET'
        );

        await page.goto('https://jsonplaceholder.typicode.com/posts/1');

        const capturedRequest = await requestPromise;
        console.log(capturedRequest.url());

        expect(capturedRequest.url()).toContain('/posts/1');
        expect(capturedRequest.method()).toBe('GET');

    });

});
