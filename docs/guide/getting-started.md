# Getting Started

Get up and running with `codeceptjs-cli` in under 5 minutes.

## Prerequisites

| Requirement | Version                 | Why |
| ----------- | ----------------------- | --- |
| Node.js     | ≥ 22                    | Runtime — uses modern ESM features |
| npm         | ≥ 10                    | Package manager (ships with Node 22) |
| CodeceptJS  | ≥ 3.6 (peer dependency) | The test framework this CLI wraps |

::: tip
Run `ccjs doctor` at any time to verify all prerequisites are met.
:::

## Installation

```bash
# Install the CLI globally
npm install -g codeceptjs-cli

# Verify installation
ccjs --version
```

Or use it without installing via `npx`:

```bash
npx codeceptjs-cli --help
```

## Step 1 — Initialize a Project

```bash
ccjs init
```

The interactive wizard walks you through the full setup:

```text
┌  CodeceptJS CLI — Project Setup
│
◆  Which testing helper do you want to use?
│  ● Playwright (recommended)
│  ○ WebDriver / Puppeteer / Appium / TestCafe
│
◇  Which browsers should be configured?
│  ◻ Chromium  ◻ Firefox  ◻ WebKit
│
◇  What is your application base URL?
│  http://localhost:3000
│
◇  Enable TypeScript for tests?
│  Yes
│
◇  Install additional plugins?
│  ◻ screenshotOnFail  ◻ retryFailedStep  ◻ allure
│
└  ✔ Project scaffolded!
```

**Non-interactive mode** (great for CI):

```bash
ccjs init --yes --helper Playwright --test-dir ./e2e
```

**Generated files:**

| File                  | Purpose                                      |
| --------------------- | -------------------------------------------- |
| `codecept.conf.ts`    | Test framework configuration                 |
| `tests/first.test.ts` | Starter test                                 |
| `steps.d.ts`          | TypeScript autocompletion for the `I` object |
| `output/`             | Directory for screenshots and reports        |

## Step 2 — Verify Your Environment

```bash
ccjs doctor
```

```text
┌───┬──────────────────┬─────────────────────┐
│   │ Check            │ Status              │
├───┼──────────────────┼─────────────────────┤
│ ✓ │ Node.js version  │ v22.0.0             │
│ ✓ │ CodeceptJS       │ v3.6.8              │
│ ✓ │ Config file      │ codecept.conf.ts    │
│ ✓ │ Test directory   │ ./tests             │
│ ✓ │ Output directory │ ./output            │
│ ✓ │ Platform         │ darwin arm64        │
└───┴──────────────────┴─────────────────────┘
  ✔ All checks passed!
```

## Step 3 — Write Your First Test

```typescript
Feature('Login')

Scenario('user can sign in', ({ I }) => {
  I.amOnPage('/')
  I.see('Welcome')
  I.click('Sign In')
  I.fillField('Email', 'user@example.com')
  I.fillField('Password', 'secret123')
  I.click('Submit')
  I.seeInCurrentUrl('/dashboard')
})
```

## Step 4 — Run Tests

```bash
# Run all tests with step output
ccjs run --steps

# Run a specific test file
ccjs run tests/login.test.ts

# Run in parallel
ccjs run workers
```

## What's Next?

- [Configuration](/guide/configuration) — Page objects, custom helpers, and project structure
- [All Commands](/commands/init) — Explore every CLI command in detail
