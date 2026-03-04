# ccjs dry-run

Preview your test suite without launching a browser — validates syntax and displays the step tree.

## Usage

```bash
ccjs dry-run [options]
```

## What It Does

The `dry-run` command parses your test files and displays all features, scenarios, and steps **without executing them**. This is useful for:

- Validating test syntax before running
- Getting an overview of your test suite structure
- Verifying grep patterns match the right tests
- Quick feedback in CI before committing to a full run

## Flags

| Flag | Short | Description |
| --- | --- | --- |
| `--steps` | `-s` | Show all steps within each scenario |
| `--debug` | | Show debug output |
| `--bootstrap` | | Enable bootstrap script in dry-run mode |
| `--plugins <list>` | `-p` | Enable specific plugins (comma-separated) |
| `--config <path>` | `-c` | Specify a custom config file |

## Examples

```bash
# Preview all tests
ccjs dry-run

# Preview with expanded steps
ccjs dry-run --steps

# Preview with debug output
ccjs dry-run --debug

# Preview with specific plugins enabled
ccjs dry-run --plugins retryFailedStep,screenshotOnFail
```

::: tip
Use `ccjs dry-run --steps` in CI as a fast validation step before running the full test suite.
:::
