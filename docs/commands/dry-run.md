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
| `--steps` | | Show all steps within each scenario |
| `--grep <pattern>` | `-g` | Filter tests by name or tag |
| `--config <path>` | `-c` | Specify a custom config file |
| `--verbose` | | Maximum detail output |

## Examples

```bash
# Preview all tests
ccjs dry-run

# Preview with expanded steps
ccjs dry-run --steps

# Preview only smoke tests
ccjs dry-run --grep "@smoke"
```

::: tip
Use `ccjs dry-run --steps` in CI as a fast validation step before running the full test suite.
:::
