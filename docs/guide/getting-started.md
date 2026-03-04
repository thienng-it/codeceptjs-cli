# Getting Started

## Prerequisites

| Requirement | Version                 |
| ----------- | ----------------------- |
| Node.js     | ≥ 22                    |
| npm         | ≥ 10                    |
| codeceptjs  | ≥ 3.6 (peer dependency) |

Install CodeceptJS and a browser engine in your project:

```bash
npm install codeceptjs @codeceptjs/configure playwright --save-dev
```

## 1. Install & Initialize

```bash
# Install globally
npm install -g codeceptjs-cli

# Initialize a new project
ccjs init
```

The interactive wizard walks you through:

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

**Non-interactive mode** (for CI):

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

## 2. Verify Environment

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

## 3. Write Tests

```typescript
Feature('Feature Name')

Scenario('test description', ({ I }) => {
  I.amOnPage('/')
  I.see('Welcome')
  I.click('Sign In')
  I.fillField('Email', 'user@example.com')
  I.fillField('Password', 'secret123')
  I.click('Submit')
  I.seeInCurrentUrl('/dashboard')
})
```

See the [Commands](/commands/init) section for more tools!
