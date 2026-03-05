# @josephnguyent/codeceptjs-cli

> Next-generation, production-grade CLI wrapper for the [CodeceptJS](https://codecept.io/) testing framework.

[![CI](https://github.com/thienng-it/codeceptjs-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/thienng-it/codeceptjs-cli/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 **Interactive project scaffolding** — Beautiful TUI wizard powered by `@clack/prompts`
- ⚡ **Enhanced test execution** — Colorized output, config auto-discovery, adaptive parallelism
- 🩺 **Environment health check** — `ccjs doctor` validates Node, CodeceptJS, browsers & config
- 📦 **Code generators** — Scaffold tests, page objects, and helpers with interactive prompts
- 🎭 **Playwright-first** — Native browser installation management
- 🔌 **Plugin-extensible** — Built on Oclif v4 with first-class plugin support
- 🔒 **Security-ready** — CodeQL analysis included in CI pipeline

---

## Documentation

📚 **[Visit the official Documentation Site](https://thienng-it.github.io/codeceptjs-cli/)** for comprehensive guides, tutorials, and full API command references.

---

## Quick Start

```bash
# Install globally
npm install -g @josephnguyent/codeceptjs-cli

# Initialize a new project
ccjs init

# Run tests
ccjs run
```

## Available Commands

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `ccjs init`        | Interactive project setup          |
| `ccjs doctor`      | Validate environment health        |
| `ccjs run`         | Execute tests                      |
| `ccjs run workers` | Run tests in parallel              |
| `ccjs run rerun`   | Flaky test detection               |
| `ccjs dry-run`     | Preview tests without executing    |
| `ccjs generate`    | Scaffold tests, page objects, etc. |

_See the [Full Command Reference](https://thienng-it.github.io/codeceptjs-cli/commands/init) for detailed usage._

---

## Architecture

```
User types: ccjs run --steps
       │
       ▼
┌─────────────────────┐
│  Oclif v4 Parser    │  ← Parses commands, flags, args
│  (CLI Framework)    │
└────────┬────────────┘
         ▼
┌─────────────────────┐
│  Hooks (init)       │  ← Pre-flight: show version, validate env
└────────┬────────────┘
         ▼
┌─────────────────────┐
│  Command Handler    │  ← e.g., src/commands/run/index.ts
│  (run, init, doctor)│
└────────┬────────────┘
         ▼
┌─────────────────────┐
│  Shared Libs        │  ← Config discovery, logger, errors, templates
│  + Integrations     │  ← Playwright browser manager, CodeceptJS API
└────────┬────────────┘
         ▼
┌─────────────────────┐
│  CodeceptJS         │  ← Actually runs the tests via execa
└─────────────────────┘
```

---

## Acknowledgements

This project is built on top of the incredible [**CodeceptJS**](https://codecept.io/) testing framework. All credit for the core testing engine, helpers, and plugin ecosystem belongs to the [CodeceptJS team](https://github.com/codeceptjs/CodeceptJS).

`@josephnguyent/codeceptjs-cli` is a **community-driven open-source tool** — it is **not** officially affiliated with or endorsed by the CodeceptJS project. We simply love CodeceptJS and want to make the developer experience even better.

- 🌐 [CodeceptJS Official Site](https://codecept.io/)
- 📖 [CodeceptJS Documentation](https://codecept.io/basics/)
- ⭐ [Star CodeceptJS on GitHub](https://github.com/codeceptjs/CodeceptJS)

---

## Contributing

This project is **free and open source** under the [MIT License](LICENSE) — everyone is welcome to use, share, and contribute!

We'd love your help, whether it's:

- 🐛 Reporting bugs via [Issues](https://github.com/thienng-it/codeceptjs-cli/issues)
- 💡 Suggesting features or improvements
- 📖 Improving documentation
- 🔧 Submitting pull requests

See the [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

---

## License

MIT — see [LICENSE](LICENSE) for details.
