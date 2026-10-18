import { env } from '../utils/env.js';

export interface LoginTestCase {
    readonly scenario: string;
    readonly username: string;
    readonly password: string;
    readonly expectedOutcome: 'success' | 'failure';
    readonly expectedError?: string; 
}

export const loginTestCases: readonly LoginTestCase[] = [
    {
        scenario: 'valid credentials',
        username: env.standardUser,
        password: env.standardPassword,
        expectedOutcome: 'success',
    },
    {
        scenario: 'locked out user login',
        username: 'locked_out_user',
        password: env.standardPassword,
        expectedOutcome: 'failure',
        expectedError: 'Epic sadface: Sorry, this user has been locked out.'
    }
];