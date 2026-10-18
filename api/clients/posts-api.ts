import {
    type APIRequestContext,
    type APIResponse,
} from '@playwright/test';

import { type PostPayload } from '../../test-data/api-data.js';

export class PostsApi {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getPost(postId: number) {
        return await this.request.get(`/posts/${postId}`);
    }

    async createPost(payload: PostPayload) {
        return await this.request.post('/posts',
            {
                data: payload
            });
    }

    async updatePost(payload: PostPayload, postId: number) {
        return await this.request.put(`/posts/${postId}`, {
            data: payload,
        });
    }

    async deletePost(postId: number) {
        return await this.request.delete(`/posts/${postId}`);
    }
        
}