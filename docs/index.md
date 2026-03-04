---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "codeceptjs-cli"
  text: "The Next-Gen Wrapper for CodeceptJS"
  tagline: "A production-grade CLI for maximum developer productivity, extensibility, and CI/CD ergonomics."
  image:
    src: https://codecept.io/img/logo.svg
    alt: CodeceptJS Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Commands
      link: /commands/init

features:
  - title: interactive setup
    details: '<code>ccjs init</code> scaffolding wizard for Playwright, WebDriver, Appium, and TestCafe.'
  - title: smart runner
    details: 'Colorized and streaming wrapper for <code>codeceptjs run</code> with automatic parallel worker detection.'
  - title: environment doctor
    details: '<code>ccjs doctor</code> performs comprehensive environment health checks for Node, browsers, and config files.'
  - title: built for speed
    details: 'Bundled natively for sub-50ms cold starts on Node.js 22 LTS with full TypeScript support.'
---

## Why `codeceptjs-cli`?

**cscodeceptjs-cli** (`ccjs`) provides a **better command-line experience** for CodeceptJS — similar to how `create-react-app` wraps Webpack to make React projects easier.

### The Problem It Solves

| Raw CodeceptJS | With `ccjs` |
|---|---|
| Manually create `codecept.conf.js` | `ccjs init` → interactive wizard |
| Hope your environment is correct | `ccjs doctor` → validates everything |
| `npx codeceptjs run --steps` | `ccjs run --steps` (shorter, colorized) |
| Figure out worker count yourself | `ccjs run workers` (auto-detects CPUs) |
| `npx codeceptjs generate:test` | `ccjs generate test` (with prompts) |
