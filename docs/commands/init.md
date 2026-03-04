# ccjs init

Interactive project scaffolding wizard for CodeceptJS.

## Usage

```bash
ccjs init
```

## What It Does

The `init` command creates a complete CodeceptJS project structure with a single command. The interactive wizard guides you through:

1. **Selecting a helper** — Playwright (default), WebDriver, Puppeteer, Appium, or TestCafe
2. **Choosing browsers** — Chromium, Firefox, WebKit
3. **Setting the base URL** — Your application URL
4. **Enabling TypeScript** — Generates `.ts` config and type definitions
5. **Selecting plugins** — screenshotOnFail, retryFailedStep, allure, and more

## Flags

| Flag | Description |
| --- | --- |
| `--yes` | Accept all defaults (non-interactive mode) |
| `--helper <name>` | Pre-select the testing helper |
| `--test-dir <path>` | Set the test directory |

## Examples

```bash
# Interactive mode (recommended for first time)
ccjs init

# Non-interactive mode for CI
ccjs init --yes

# Pre-select helper and test directory
ccjs init --yes --helper Playwright --test-dir ./e2e
```

## Generated Files

| File | Purpose |
| --- | --- |
| `codecept.conf.ts` | Main configuration file |
| `tests/first.test.ts` | Starter test file |
| `steps.d.ts` | TypeScript autocompletion definitions |
| `output/` | Screenshot and report output directory |
| `tsconfig.json` | TypeScript config (if TS enabled) |

::: tip
After running `ccjs init`, use [`ccjs doctor`](/commands/doctor) to verify your environment is set up correctly.
:::
