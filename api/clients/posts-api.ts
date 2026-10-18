import {
    type APIRequestContext,
    type APIResponse,
} from '@playwright/test';

import { type PostPayload } from '../../test-data/api-data.js';

const API_TIMEOUT = 10_000;

export class PostsApi {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getPost(postId: number) {
        return await this.request.get(`/posts/${postId}`, {timeout: API_TIMEOUT});
    }

    async createPost(payload: PostPayload) {
        return await this.request.post('/posts',
            {
                data: payload,
                timeout: API_TIMEOUT,
            });
    }

    async updatePost(payload: PostPayload, postId: number) {
        return await this.request.put(`/posts/${postId}`, {
            data: payload,
            timeout: API_TIMEOUT,
        });
    }

    async deletePost(postId: number) {
        return await this.request.delete(`/posts/${postId}`, {timeout: API_TIMEOUT});
    }
        
}