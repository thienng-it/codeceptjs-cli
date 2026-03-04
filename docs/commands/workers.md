# ccjs run workers

Run tests in parallel across multiple worker processes for dramatically faster CI pipelines.

## Usage

```bash
ccjs run workers [options]
```

## How It Works

The `workers` command automatically detects the number of available CPU cores and distributes tests across parallel worker processes. This can reduce test suite execution time by 50–80% in CI.

## Flags

| Flag | Short | Description |
| --- | --- | --- |
| `--count <n>` | `-c` | Number of workers (default: auto-detect CPU count) |
| `--by <strategy>` | `-b` | Distribution strategy: `pool`, `suite`, or `test` |
| `--grep <pattern>` | `-g` | Filter tests by name or tag |
| `--override <json>` | `-o` | Override config values inline |

## Distribution Strategies

| Strategy | Description | Best For |
| --- | --- | --- |
| `pool` (default) | Dynamic load balancing across workers | Most projects |
| `suite` | Group tests by suite file | Shared browser state |
| `test` | Distribute individual test cases | Large, uniform test files |

## Examples

```bash
# Auto-detect CPU count, pool strategy (recommended)
ccjs run workers

# Specify 4 workers explicitly
ccjs run workers --count 4

# Use suite-based distribution
ccjs run workers --by suite

# Run only smoke tests in parallel
ccjs run workers --grep "@smoke"
```

::: warning
Workers run tests in separate processes. Ensure your tests are **independent** and don't share state (e.g., database records, files).
:::
