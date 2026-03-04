# Flaky Test Detection (Rerun)

The `ccjs run rerun` command helps identify and deal with flaky tests by running them multiple times.

## Usage

```bash
ccjs run rerun
```

First, configure the retry behavior in `codecept.conf.ts`:

```typescript
rerun: {
  minSuccess: 3,   // require 3 successful runs
  maxReruns: 5,    // try up to 5 times
},
```

## Common Strategies

| Use Case | Configuration |
|---|---|
| Find flaky tests | `minSuccess: 1, maxReruns: 5` |
| Confirm stability | `minSuccess: 3, maxReruns: 5` |
| Full stability audit | `minSuccess: 10, maxReruns: 10` |
