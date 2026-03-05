# ─────────────────────────────────────────────────────────────
# @josephnguyent/codeceptjs-cli — Makefile
# ─────────────────────────────────────────────────────────────

.PHONY: help install build clean dev lint format typecheck test test-watch test-coverage ci doctor

# Default target
help: ## Show this help
	@echo ""
	@echo "  @josephnguyent/codeceptjs-cli — available commands"
	@echo "  ───────────────────────────────────"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo ""

# ─── Setup ──────────────────────────────────────────────────

install: ## Install all dependencies
	npm install

clean: ## Remove build artifacts
	rm -rf dist node_modules/.cache oclif.manifest.json

purge: clean ## Remove everything (dist + node_modules)
	rm -rf node_modules

# ─── Build ──────────────────────────────────────────────────

build: ## Compile TypeScript to dist/
	npm run build

dev: ## Run CLI in dev mode (pass ARGS, e.g. make dev ARGS="doctor")
	./bin/dev.js $(ARGS)

manifest: build ## Generate oclif manifest
	npx oclif manifest

# ─── Quality ────────────────────────────────────────────────

lint: ## Run ESLint
	npm run lint

format: ## Format code with Prettier
	npm run format

format-check: ## Check formatting without changes
	npm run format:check

typecheck: ## Run TypeScript type checker (no emit)
	npm run typecheck

# ─── Testing ────────────────────────────────────────────────

test: ## Run all tests
	npm test

test-watch: ## Run tests in watch mode
	npm run test:watch

test-coverage: ## Run tests with coverage report
	npm run test:coverage

# ─── CI / Release ───────────────────────────────────────────

ci: lint typecheck test build ## Run full CI pipeline locally (lint → typecheck → test → build)

prerelease: ci manifest ## Prepare for release (CI + manifest)
	@echo "\n✅ Ready for release"

# ─── CLI Shortcuts ──────────────────────────────────────────

doctor: build ## Run ccjs doctor
	node bin/run.js doctor

init: build ## Run ccjs init
	node bin/run.js init

run-tests: build ## Run ccjs run (pass ARGS for extra flags)
	node bin/run.js run $(ARGS)

dry-run: build ## Run ccjs dry-run
	node bin/run.js dry-run $(ARGS)

gen-test: build ## Run ccjs generate test
	node bin/run.js generate test $(ARGS)

gen-page: build ## Run ccjs generate pageobject
	node bin/run.js generate pageobject $(ARGS)

gen-helper: build ## Run ccjs generate helper
	node bin/run.js generate helper $(ARGS)
