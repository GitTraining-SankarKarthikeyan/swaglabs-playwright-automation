import { test, expect } from '@playwright/test';
import { apiPostData, type PostResponse } from '../../test-data/api-data.js';
import { PostsApi } from '../../api/clients/posts-api.js';

test.describe('API Tests', () => {

    test('should retrieve a post successfully @api @smoke', async ({ request }) => {
        const postsApi = new PostsApi(request);
        const response = await postsApi.getPost(1);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json() as PostResponse;
        expect(responseBody).toMatchObject({
            id: 1,
            userId: 1
        })
        expect(responseBody.title).toEqual(expect.any(String));
        expect(responseBody.body).toEqual(expect.any(String));
        expect(responseBody.title.length).toBeGreaterThan(0);
        expect(responseBody.body.length).toBeGreaterThan(0);
    });

    test('should create a post successfully @api', async ({ request }) => {
        const postsApi = new PostsApi(request);
        const requestPayload = apiPostData.createPost;
        const response = await postsApi.createPost(requestPayload);
        expect(response.status()).toBe(201);
        const responseBody = await response.json() as PostResponse;
        expect(responseBody.title).toBe(requestPayload.title);
        expect(responseBody.body).toBe(requestPayload.body);
        expect(responseBody.userId).toBe(requestPayload.userId);
        expect(responseBody.id).toBeTruthy();
    });

    test('should update a post successfully @api', async ({ request }) => {
        const postsApi = new PostsApi(request);
        const requestPayload = apiPostData.updatePost;
        const response = await postsApi.updatePost(requestPayload, 1);
        expect(response.status()).toBe(200);
        const responseBody = await response.json() as PostResponse;
        expect(responseBody.id).toBe(1);
        expect(responseBody.title).toBe(requestPayload.title);
        expect(responseBody.userId).toBe(requestPayload.userId);
        expect(responseBody.body).toBe(requestPayload.body);
    });

    test('should delete a post successfully @api', async ({ request }) => {
        const postsApi = new PostsApi(request);
        const response = await postsApi.deletePost(1);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
    });

    test('should return 404 for a non-existent post @api', async ({ request }) => {
        const postsApi = new PostsApi(request);
        const response = await postsApi.getPost(999999);
        expect(response.status()).toBe(404);
        expect(response.ok()).toBeFalsy();
    });

});
