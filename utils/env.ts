import 'dotenv/config';

function requireEnv(name: string): string {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(
            `Missing required environment variable: ${name}`
        );
    }
    return value;
}

export const env = {
    baseUrl: requireEnv('BASE_URL'),
    standardUser: requireEnv('STANDARD_USER'),
    standardPassword: requireEnv('STANDARD_PASSWORD'),
} as const;