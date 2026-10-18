export interface PostPayload {
    readonly title: string;
    readonly body: string;
    readonly userId: number;
}

export interface PostResponse {
    readonly id: number;
    readonly title: string;
    readonly body: string;
    readonly userId: number;
}

export const apiPostData = {

    createPost: {
        title: 'Playwright Automation',
        body: 'Learning POST requests using Playwright',
        userId: 1
    },

    updatePost: {
        title: 'Updated Playwright API Automation',
        body: 'Updated using a PUT request',
        userId: 1
    }

} satisfies Record<string, PostPayload>;