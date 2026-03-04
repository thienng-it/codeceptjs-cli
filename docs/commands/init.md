# Initialization Setup

The `ccjs init` command provides an interactive wizard to scaffold a new testing project.

## Usage

```bash
ccjs init
```

The wizard walks you through:

1. Selecting a helper (Playwright, WebDriver, Appium, etc.)
2. Selecting target browsers (Chromium, Firefox, WebKit)
3. Defining the application URL
4. Enabling TypeScript (recommended)
5. Selecting plugins (screenshotOnFail, retryFailedStep, etc.)

## Non-interactive Mode

For CI environments, you can skip the prompts:

```bash
ccjs init --yes --helper Playwright --test-dir ./e2e
```
