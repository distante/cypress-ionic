# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (starts local server + opens Cypress interactive runner)
npm run develop

# Build TypeScript to dist/
npm run build

# Type-check without emitting
npm run tsc:check

# Run tests headless
npm test

# Run tests in CI mode (no video)
npm run test-ci

# Start server + run CI tests
npm run full-test

# Lint and format checks
npx eslint .
npm run prettier:check

# Multi-version compatibility test (used in CI)
npm run ci
```

Tests require a running local server on port 3999. `npm run develop` / `npm run full-test` handle this automatically via `start-server-and-test`.

To run a single spec file, open Cypress interactively with `npm run test-open` and select the spec, or pass `--spec` to `cypress run`:

```bash
npx cypress run --spec "cypress/e2e/components/button.spec.ts"
```

## Architecture

This library exposes singleton helper instances that wrap Cypress commands to handle Ionic's Shadow DOM complexity. Consumers add `includeShadowDom: true` to their `cypress.config` and use the helpers instead of raw `cy.get()`.

### Versioning contract

- Ionic ≤ 7 → `cypress-ionic` 0.x.x
- Ionic ≥ 8 → `cypress-ionic` 1.x.x

### Source layout (`src/`)

- **`index.ts`** — re-exports all public singletons and types
- **`components/`** — one class per Ionic component, each exported as a singleton:
  - `IonButtonCypress` → `ionButtonCypress`
  - `IonInputCypress` → `ionInputCypress`
  - `IonRangeCypress` → `ionRangeCypress`
  - `IonSelectCypress` → `ionSelectCypress` (orchestrates three sub-strategies: alert, action-sheet, popover)
- **`interfaces/`** — shared TypeScript types; `SupportedSelectors<T>` is the union of `string | JQuery<T> | Cypress.Chainable<JQuery<T>>` accepted by every public method
- **`helpers/get-from-supported-selector.ts`** — normalizes any `SupportedSelectors` input to a `Cypress.Chainable` and asserts the `.hydrated` class (confirms Ionic has initialized the element)

Every public method on a component class must return `Cypress.Chainable<JQuery<ComponentElement>>` — enforced by the `CypressIonicComponentClass<T, C>` interface.

### Test setup

- `/html/index.html` + `/html/assets/scripts.mjs` — static page with real Ionic components served on port 3999 during tests
- `cypress/e2e/components/` — one spec per component
- `test-helpers/` — shared Cypress test utilities

### TypeScript path aliases (tsconfig.json)

```
@lib        → ./src/index.ts
@interfaces → ./src/interfaces/index.ts
@helpers    → ./src/helpers/index.ts
```

Aliases are resolved at build time by `typescript-transform-paths` (ts-patch plugin).

## Development Philosophy

- **Prefer backward-compatible changes.** When a fix can support both the current and a newer version of a dependency (e.g. via comma-separated CSS selectors, feature detection, or a simple fallback), do so rather than raising the `peerDependency` floor. Only drop support for a version when backward compatibility is genuinely impossible.

## Commit conventions

Commits must follow Conventional Commits (enforced by commitlint + Husky). Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`, `release`, `wip`.

Staged files are auto-formatted by `pretty-quick` on pre-commit.
