---
layout: home

hero:
  name: "@josephnguyent/codeceptjs-cli"
  text: The Next-Gen CLI for CodeceptJS
  tagline: A production-grade command-line tool for maximum developer productivity, extensibility, and CI/CD ergonomics.
  image:
    src: /logo.svg
    alt: "@josephnguyent/codeceptjs-cli Logo"
  actions:
    - theme: brand
      text: Get Started →
      link: /guide/getting-started
    - theme: alt
      text: View Commands
      link: /commands/init
    - theme: alt
      text: GitHub
      link: https://github.com/thienng-it/codeceptjs-cli

features:
  - icon: 🧙
    title: Interactive Setup
    details: "Run <code>ccjs init</code> to scaffold a complete CodeceptJS project with an interactive wizard — Playwright, WebDriver, Appium, and more."
    link: /commands/init
    linkText: Learn more
  - icon: ⚡
    title: Smart Test Runner
    details: "Colorized, streaming test output with <code>ccjs run</code>. Automatic parallel worker detection. Pass-through to all CodeceptJS flags."
    link: /commands/run
    linkText: Learn more
  - icon: 🩺
    title: Environment Doctor
    details: "<code>ccjs doctor</code> validates Node.js, CodeceptJS, browsers, and config files in one command — catch problems before your tests do."
    link: /commands/doctor
    linkText: Learn more
  - icon: 🚀
    title: Built for Speed
    details: "Bundled natively with tsup for sub-50ms cold starts on Node.js 22 LTS. Full TypeScript support out of the box."
  - icon: 👷
    title: Parallel Workers
    details: "<code>ccjs run workers</code> auto-detects CPU cores and distributes tests across parallel workers for dramatically faster CI pipelines."
    link: /commands/workers
    linkText: Learn more
  - icon: 🔧
    title: Code Generators
    details: "Scaffold tests, page objects, and custom helpers with interactive prompts. No more copy-pasting boilerplate."
    link: /commands/generate
    linkText: Learn more
---

<div class="vp-doc" style="max-width: 688px; margin: 2rem auto; padding: 0 24px;">

## Why @josephnguyent/codeceptjs-cli?

**@josephnguyent/codeceptjs-cli** (`ccjs`) provides a **better command-line experience** for CodeceptJS — similar to how `create-react-app` wraps Webpack to make React projects easier.

### The Problem It Solves

| Without `ccjs` | With `ccjs` |
| --- | --- |
| Manually create `codecept.conf.js` | `ccjs init` → interactive wizard |
| Hope your environment is correct | `ccjs doctor` → validates everything |
| `npx codeceptjs run --steps` | `ccjs run --steps` (shorter, colorized) |
| Figure out worker count yourself | `ccjs run workers` (auto-detects CPUs) |
| `npx codeceptjs generate:test` | `ccjs generate test` (with prompts) |

### Quick Install

```bash
# Install globally
npm install -g @josephnguyent/codeceptjs-cli

# Or use npx
npx @josephnguyent/codeceptjs-cli init
```

### Quick Start

```bash
# 1. Initialize a project
ccjs init

# 2. Check your environment
ccjs doctor

# 3. Run your tests
ccjs run --steps
```

## Powered by CodeceptJS

This CLI is built on top of the amazing [CodeceptJS](https://codecept.io/) testing framework created and maintained by the [CodeceptJS team](https://github.com/codeceptjs/CodeceptJS). All credit for the core testing engine, helpers, and plugin ecosystem belongs to them.

`@josephnguyent/codeceptjs-cli` is a **community-driven open-source wrapper** — it is **not** officially affiliated with or endorsed by the CodeceptJS project. We simply love CodeceptJS and want to make the developer experience even better.

- 🌐 [CodeceptJS Official Site](https://codecept.io/)
- 📖 [CodeceptJS Documentation](https://codecept.io/basics/)
- ⭐ [Star CodeceptJS on GitHub](https://github.com/codeceptjs/CodeceptJS)

## Contributing

This project is **free and open source** — everyone is welcome to use, share, and contribute! Whether it's fixing a bug, improving docs, or adding a new feature, your contributions are appreciated.

- 📜 Licensed under [MIT](https://github.com/thienng-it/codeceptjs-cli/blob/main/LICENSE)
- 🐛 [Report an Issue](https://github.com/thienng-it/codeceptjs-cli/issues)
- 💡 [Open a Pull Request](https://github.com/thienng-it/codeceptjs-cli/pulls)
- 📖 [Contributing Guide](https://github.com/thienng-it/codeceptjs-cli/blob/main/CONTRIBUTING.md)

</div>
