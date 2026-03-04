# ccjs run rerun

Detect and manage flaky tests by running them multiple times.

## Usage

```bash
ccjs run rerun [options]
```

## How It Works

The `rerun` command executes your test suite multiple times to identify tests that pass inconsistently. This is essential for maintaining test reliability in CI pipelines.

## Flags

| Flag | Short | Description |
| --- | --- | --- |
| `--min-success <n>` | | Minimum successful runs required (default: 2) |
| `--max-reruns <n>` | | Maximum number of attempts (default: 4) |
| `--config <path>` | `-c` | Specify a custom config file |

## Configuration

Configure rerun behavior in `codecept.conf.ts`:

```typescript
rerun: {
  minSuccess: 3,   // require 3 successful runs
  maxReruns: 5,    // try up to 5 times
},
```

## Common Strategies

| Use Case | Configuration | When to Use |
| --- | --- | --- |
| Find flaky tests | `minSuccess: 1, maxReruns: 5` | Initial discovery |
| Confirm stability | `minSuccess: 3, maxReruns: 5` | Before merging PRs |
| Full stability audit | `minSuccess: 10, maxReruns: 10` | Before releases |

## Examples

```bash
# Run with default settings
ccjs run rerun

# Custom thresholds
ccjs run rerun --min-success 3 --max-reruns 5
```

::: tip
The `min-success` and `max-reruns` values can also be configured directly in `codecept.conf.ts` under the `rerun` key, which takes precedence over CLI defaults.
:::
