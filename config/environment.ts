import 'dotenv/config';

export type TestEnvironment = 'dev' | 'qa' | 'uat';

interface EnvironmentConfig {
    readonly uiBaseUrl: string;
    readonly apiBaseUrl: string;
}

const environments: Record<TestEnvironment, EnvironmentConfig> = {
    dev: {
        uiBaseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        apiBaseUrl: 'https://jsonplaceholder.typicode.com',
    },

    qa: {
        uiBaseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        apiBaseUrl: 'https://jsonplaceholder.typicode.com',
    },

    uat: {
        uiBaseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        apiBaseUrl: 'https://jsonplaceholder.typicode.com',
    },
};

const selectedEnvironment = process.env.TEST_ENV ?? 'qa';

if (!['dev', 'qa', 'uat'].includes(selectedEnvironment)) {
    throw new Error(
        `Invalid TEST_ENV "${selectedEnvironment}". ` +
        'Supported environments are: dev, qa and uat.'
    );


}

export const testEnvironment = selectedEnvironment as TestEnvironment;

export const environmentConfig = environments[testEnvironment];

export const credentials = {
    standardUser: {
        username: requireEnvironmentVariable('STANDARD_USER'),
        password: requireEnvironmentVariable('STANDARD_PASSWORD'),
    },
};

function requireEnvironmentVariable(name: string): string {
    const value = process.env[name];

    if(!value) {
        throw new Error (
            `Required environment variable "${name}" is missing.`
        );
    }
    
    return value;
}