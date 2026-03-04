# Environment Doctor

The `ccjs doctor` command validates your testing environment to catch configuration and installation errors early.

## Usage

```bash
ccjs doctor
```

It validates:
- Node.js version (Requires 22+)
- CodeceptJS module installation
- Config file presence
- Test directory presence
- Output directory presence

Example Output:
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
```
