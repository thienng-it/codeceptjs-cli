# Contributing to codeceptjs-cli

First off, **thank you** for considering contributing! This project is free and open source, and we welcome contributions from everyone.

## Code of Conduct

Please be respectful and constructive. We're all here because we love CodeceptJS and want to make the developer experience better.

## How to Contribute

### Reporting Bugs

- Check [existing issues](https://github.com/thienng-it/codeceptjs-cli/issues) first to avoid duplicates
- Use the bug report template if available
- Include your Node.js version, OS, and `ccjs doctor` output

### Suggesting Features

- Open an [issue](https://github.com/thienng-it/codeceptjs-cli/issues) with a clear description
- Explain the use case and why it would benefit the community

### Submitting Code

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Make your changes** following the coding conventions below
5. **Run the full CI pipeline locally**:
   ```bash
   make ci
   ```
6. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add my new feature"
   ```
7. **Push** and open a Pull Request

## Development Setup

### Prerequisites

- Node.js ≥ 22
- npm ≥ 10

### Quick Start

```bash
# Install dependencies
make install

# Run in development mode
make dev

# Run the full CI pipeline (lint → typecheck → test → build)
make ci
```

### Useful Commands

| Command | Purpose |
| --- | --- |
| `make lint` | ESLint + Prettier check |
| `make format` | Auto-format code |
| `make typecheck` | TypeScript type checking |
| `make test` | Run tests |
| `make build` | Build with tsup |
| `make ci` | Full pipeline |

## Coding Conventions

- **TypeScript strict mode** — handle all `T | undefined` from indexed access
- **ESM only** — use `.js` extensions in relative import paths
- **No `console.log`** — use `createLogger()` from `src/lib/logger.ts`
- **No bare `Error`** — use `CliError` with an `ErrorCode` from `src/lib/errors.ts`
- **Prompts** — use `@clack/prompts`, not inquirer
- **Config discovery** — use `findConfig()`, never hardcode config file names
- **Conventional Commits** — enforced by commitlint + husky

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new command
fix: resolve config discovery on Windows
docs: update getting started guide
test: add unit tests for logger
chore: update dependencies
refactor: simplify error handling
ci: fix workflow permissions
perf: optimize config file search
```

## Project Structure

```
src/
├── commands/     # Oclif command implementations
├── hooks/        # Oclif lifecycle hooks
├── integrations/ # CodeceptJS & Playwright integrations
├── lib/          # Shared utilities (config, errors, logger, etc.)
├── templates/    # Embedded template functions
└── types/        # Shared TypeScript type definitions
tests/
├── unit/         # Pure function tests with mocked I/O
├── integration/  # Command execution tests
└── e2e/          # Full CLI invocation tests
```

## Acknowledgements

This project exists because of the incredible [CodeceptJS](https://codecept.io/) framework. All credit for the core testing engine belongs to the [CodeceptJS team](https://github.com/codeceptjs/CodeceptJS). We are a community wrapper — not officially affiliated with CodeceptJS.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
