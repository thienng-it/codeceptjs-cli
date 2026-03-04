# Running Tests

The `ccjs run` command is an enhanced wrapper around `codeceptjs run`.

## Usage

```bash
# Run all tests
ccjs run                          # or: make run-tests

# Run with step-by-step output
ccjs run --steps                  # or: make run-tests ARGS="--steps"

# Run in debug mode (browser stays open on failure)
ccjs run --debug                  # or: make run-tests ARGS="--debug"

# Run specific test file
ccjs run tests/login.test.ts

# Run tests matching a pattern
ccjs run --grep "login"
ccjs run --grep "@smoke"

# Exclude tests matching a pattern
ccjs run --grep "@slow" --invert

# Shuffle test order
ccjs run --shuffle

# Override config on the fly
ccjs run --override '{"helpers":{"Playwright":{"browser":"firefox"}}}'
```
