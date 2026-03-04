# Parallel Execution (Workers)

The `ccjs run workers` command leverages CodeceptJS workers to run tests in parallel, drastically reducing CI pipeline times.

## Usage

```bash
# Auto-detect CPU count, use pool strategy (recommended)
ccjs run workers

# Specify worker count
ccjs run workers --count 4

# Different distribution strategies
ccjs run workers --by pool       # Dynamic load balancing (default)
ccjs run workers --by suite      # Group by test suite
ccjs run workers --by test       # Distribute individual tests

# Filter in parallel mode
ccjs run workers --grep "@smoke"
```
