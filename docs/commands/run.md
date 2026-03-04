# ccjs run

Enhanced test runner — a colorized, streaming wrapper around `codeceptjs run`.

## Usage

```bash
ccjs run [options] [test-files...]
```

## Flags

| Flag | Short | Description |
| --- | --- | --- |
| `--steps` | `-s` | Show step-by-step execution output |
| `--debug` | | Run in debug mode (browser stays open on failure) |
| `--verbose` | `-v` | Maximum detail output |
| `--grep <pattern>` | `-g` | Filter tests by name or tag |
| `--invert` | | Invert grep — exclude matching tests |
| `--shuffle` | | Randomize test execution order |
| `--reporter <name>` | `-r` | Mocha reporter to use |
| `--override <json>` | `-o` | Override config values inline |
| `--config <path>` | `-c` | Specify a custom config file |

## Examples

```bash
# Run all tests
ccjs run

# Run with step-by-step output
ccjs run --steps

# Run in debug mode (browser stays open on failure)
ccjs run --debug

# Run a specific test file
ccjs run tests/login.test.ts

# Run tests matching a pattern
ccjs run --grep "login"

# Run tests by tag
ccjs run --grep "@smoke"

# Exclude slow tests
ccjs run --grep "@slow" --invert

# Shuffle test order (useful for finding order-dependent bugs)
ccjs run --shuffle

# Override config on the fly
ccjs run --override '{"helpers":{"Playwright":{"browser":"firefox"}}}'
```

::: tip
For parallel execution, see [`ccjs run workers`](/commands/workers).
For flaky test detection, see [`ccjs run rerun`](/commands/rerun).
:::
