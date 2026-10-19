# Swag Labs Playwright Automation Framework

A TypeScript-based Playwright automation framework for testing the Swag Labs application.

The framework demonstrates maintainable UI and API automation using Page Object Model (POM), data-driven testing, authentication state reuse, API clients, network interception, environment-based configuration, reporting, CI/CD, and Playwright agent/MCP tooling.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- dotenv
- Allure Report
- GitHub Actions
- Jenkins

## Project Structure

```text
swaglabs-playwright-automation/
│
├── api/
│   └── clients/                 # API client abstractions
│
├── config/
│   └── environment.ts           # Environment and credential configuration
│
├── fixtures/
│   └── auth-fixture.ts          # Reusable authenticated Playwright fixture
│
├── pages/                       # Page Object Model classes
│
├── specs/                       # Playwright agent test plans
│
├── test-data/                   # Test data and parameterized datasets
│
├── tests/
│   ├── api/                     # API tests
│   ├── network/                 # Network interception tests
│   ├── auth.setup.ts            # Authentication state setup
│   └── *.spec.ts                # UI and E2E tests
│
├── .github/
│   ├── agents/                  # Playwright agent definitions
│   └── workflows/               # GitHub Actions workflows
│
├── .vscode/
│   └── mcp.json                 # Playwright MCP configuration
│
├── .env.example                 # Environment variable template
├── Jenkinsfile                  # Jenkins pipeline
├── playwright.config.ts         # Playwright configuration
├── package.json
└── tsconfig.json
```

## Prerequisites

Install the following before running the framework:

- Node.js
- npm
- Microsoft Edge
- Git

## Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd swaglabs-playwright-automation
npm ci
```

Install the Playwright Chromium browser dependencies:

```bash
npx playwright install chromium
```

The local UI project uses the Microsoft Edge channel.

## Environment Configuration

Create a `.env` file in the project root using `.env.example` as the template:

```env
BASE_URL=https://www.saucedemo.com
STANDARD_USER=
STANDARD_PASSWORD=
```

Provide valid Swag Labs credentials locally.

The `.env` file is intentionally excluded from Git and must not be committed.

Supported logical environments are:

- `dev`
- `qa`
- `uat`

Environment selection is handled through `TEST_ENV`, while centralized configuration is maintained in:

```text
config/environment.ts
```

## Running Tests

Run the complete test suite:

```bash
npm test
```

Run the regression suite:

```bash
npm run test:regression
```

Run smoke tests:

```bash
npm run test:smoke
```

Run UI tests:

```bash
npm run test:ui
```

Run API tests:

```bash
npm run test:api
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run against a configured logical environment:

```bash
npm run test:dev
npm run test:qa
npm run test:uat
```

## TypeScript Validation

Run TypeScript validation without executing tests:

```bash
npm run typecheck
```

This performs static type checking using:

```bash
tsc --noEmit
```

## Authentication

Authentication state is created by:

```text
tests/auth.setup.ts
```

The authenticated browser state is stored under:

```text
playwright/.auth/
```

This directory is excluded from Git because authentication state may contain sensitive session information.

The `edge` Playwright project depends on the authentication setup project and reuses the generated storage state for authenticated UI tests.

## Page Object Model

Application-specific locators and reusable page interactions are maintained under:

```text
pages/
```

Tests should use page-object methods and exposed locators where appropriate rather than duplicating application-specific selectors throughout test files.

## Test Data

Reusable and parameterized test data is maintained under:

```text
test-data/
```

This keeps test logic separate from test datasets and supports data-driven execution.

Sensitive credentials are not stored in test-data files. They are loaded through the centralized environment configuration.

## API Testing

API abstractions are maintained under:

```text
api/clients/
```

API tests are located under:

```text
tests/api/
```

The API project has its own base URL configured through the Playwright configuration.

## Network Testing

Network interception examples are maintained under:

```text
tests/network/
```

The framework demonstrates Playwright capabilities including:

- request interception
- response mocking
- request continuation
- request abortion
- waiting for requests
- waiting for responses

## Reporting and Failure Artifacts

The framework uses:

- Playwright list reporter
- Playwright HTML report
- Allure results

Failure diagnostics include:

- screenshots on failure
- traces retained on failure
- videos retained on failure

Open the Playwright HTML report:

```bash
npm run report
```

Generate an Allure report:

```bash
npm run allure:generate
```

Open the generated Allure report:

```bash
npm run allure:open
```

## Test Execution Strategy

Local execution uses Playwright's default worker allocation.

CI execution uses:

- one worker
- two retries
- `forbidOnly` protection

This provides faster local execution while favoring deterministic CI behavior.

## CI/CD

### GitHub Actions

The GitHub Actions workflow is located at:

```text
.github/workflows/playwright.yml
```

The pipeline performs:

1. repository checkout
2. Node.js setup
3. dependency installation
4. Playwright browser installation
5. TypeScript validation
6. regression execution
7. report and failure-artifact upload

Credentials are supplied through GitHub repository secrets.

### Jenkins

The Jenkins pipeline is defined in:

```text
Jenkinsfile
```

The pipeline performs dependency installation, browser installation, TypeScript validation, and regression execution.

Credentials are managed using Jenkins credentials rather than being stored in source control.

## Playwright Agents and MCP

The framework includes Playwright agent support for:

- Planner
- Generator
- Healer

Agent definitions are stored under:

```text
.github/agents/
```

Test plans are maintained under:

```text
specs/
```

The Playwright MCP configuration is located at:

```text
.vscode/mcp.json
```

The agent workflow follows this principle:

```text
Planner
   ↓
Generator
   ↓
Human code review and framework refactoring
   ↓
Test execution
   ↓
Healer when appropriate
   ↓
Human review
   ↓
Regression validation
```

Agent-generated changes must be reviewed before being accepted into the framework.

## Git Workflow

Recommended development workflow:

```text
main
 ↓
pull latest changes
 ↓
create feature branch
 ↓
implement changes
 ↓
typecheck and targeted tests
 ↓
regression tests
 ↓
commit and push
 ↓
pull request
 ↓
CI and code review
 ↓
merge to main
```

Generated reports, test artifacts, authentication state, local environment files, and MCP runtime state should not be committed.

## Framework Principles

This project follows these automation principles:

- Keep tests independent and deterministic.
- Prefer stable, user-facing or dedicated test locators.
- Keep application behavior inside page objects.
- Separate test logic from test data.
- Keep secrets outside source control.
- Centralize environment configuration.
- Reuse authentication state where appropriate.
- Use API calls when they provide faster or more reliable setup than UI interaction.
- Validate generated or AI-assisted code before merging.
- Run type checking and appropriate test coverage before committing framework changes.
- Preserve diagnostic artifacts for failures.
- Treat CI failures as engineering signals rather than automatically hiding them with retries.