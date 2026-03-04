# ccjs generate

Interactive code generators for tests, page objects, and custom helpers.

## Commands

| Command | Description |
| --- | --- |
| `ccjs generate test` | Scaffold a new test file |
| `ccjs generate pageobject` | Scaffold a new page object |
| `ccjs generate helper` | Scaffold a new custom helper |

## Generate a Test

```bash
# Interactive mode
ccjs generate test

# Skip prompts
ccjs generate test --name checkout --feature "Checkout Flow"
```

Creates a test file with the correct structure:

```typescript
Feature('Checkout Flow')

Scenario('checkout', ({ I }) => {
  // TODO: implement test
})
```

## Generate a Page Object

```bash
# Interactive mode
ccjs generate pageobject

# Skip prompts
ccjs generate pageobject --name LoginPage
```

Creates a page object with PascalCase naming:

```typescript
const { I } = inject()

export = {
  // Insert locators and methods here
}
```

## Generate a Custom Helper

```bash
# Interactive mode
ccjs generate helper

# Skip prompts
ccjs generate helper --name ApiHelper
```

Creates a helper class:

```typescript
const Helper = require('@codeceptjs/helper')

class ApiHelper extends Helper {
  // Add custom methods here
}

export = ApiHelper
```

::: tip
All generators use PascalCase validation for class names and interactive prompts via `@clack/prompts` for a smooth developer experience.
:::
