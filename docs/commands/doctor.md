# ccjs doctor

Comprehensive environment health check for your CodeceptJS project.

## Usage

```bash
ccjs doctor
```

## What It Checks

| Check | What It Validates |
| --- | --- |
| **Node.js version** | Requires Node.js ≥ 22 |
| **CodeceptJS** | Module is installed and accessible |
| **Config file** | `codecept.conf.{ts,js,mjs,cjs}` exists |
| **Test directory** | Configured test directory is present |
| **Output directory** | Screenshot/report output directory exists |
| **Platform** | Displays OS and architecture info |

## Example Output

```text
┌───┬──────────────────┬─────────────────────┐
│   │ Check            │ Status              │
├───┼──────────────────┼─────────────────────┤
│ ✓ │ Node.js version  │ v22.0.0             │
│ ✓ │ CodeceptJS       │ v3.6.8              │
│ ✓ │ Config file      │ codecept.conf.ts    │
│ ✓ │ Test directory   │ ./tests             │
│ ✓ │ Output directory │ ./output            │
│ ✓ │ Platform         │ darwin arm64        │
└───┴──────────────────┴─────────────────────┘
  ✔ All checks passed!
```

## When to Use

- **After `ccjs init`** — verify everything was scaffolded correctly
- **In CI pipelines** — as a pre-flight check before running tests
- **When debugging** — quickly identify missing dependencies or misconfigurations
- **After upgrading** — confirm compatibility after Node.js or CodeceptJS updates

::: tip
Run `ccjs doctor` as the first step whenever tests aren't working as expected.
:::
