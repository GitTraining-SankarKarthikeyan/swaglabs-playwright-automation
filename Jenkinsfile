pipeline{
    agent any

    environment {
        CI = 'true'
        TEST_ENV = 'qa'
        BASE_URL = 'https://www.saucedemo.com'

        STANDARD_USER = credentials('saucedemo-standard-user')
        STANDARD_PASSWORD = credentials('saucedemo-standard-password')
    }

    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright') {
            steps {
                bat 'npx playwright install --with-deps chromium'
            }
        }

        stage('TypeScript Validation') {
            steps {
                bat 'npm run typecheck'
            }
        }

        stage('Playwright Regression') {
            steps {
                bat 'npm run test:regression'
            }
        }
    }


}