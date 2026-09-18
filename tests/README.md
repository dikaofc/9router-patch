# 9Router Test Suite

Vitest (ESM) suite for the dashboard, the `open-sse` routing/translation engine,
the executors and the regression baselines. The suite is a **separate package**:
it is not wired into the root `npm test` and it imports straight from `src/` and
`open-sse/`.

## Setup

Root dependencies **first** (tests import modules that need `open`, `undici`, …),
then the suite's own dependencies:

```bash
npm install          # from the repo root
cd tests && npm install
```

## Running

```bash
cd tests
npx vitest run                                # whole suite
npx vitest run unit/capabilities.test.js      # one file
npx vitest run unit/ratelimit.test.js         # path is relative to tests/
```

`vitest.config.js` resolves the `open-sse` and `@/` aliases from the repo root,
so vitest can live in `tests/node_modules`. The `npm test` script in
`tests/package.json` hardcodes Unix `NODE_PATH` paths (a shared-install
workaround) — ignore it and use the `npx vitest` form above.

## Expected state (not all-green by design)

This fork carries a local patch layer on top of upstream, so a plain checkout has
a small, catalogued set of red tests — usually stale contracts that upstream
changed (Kiro wire shape, registry fields, redacted payloads) or
environment-dependent tests (macOS paths, live network).

| Kind | How to run |
|------|------------|
| Live provider calls (`translator/real/*.real.test.js`) | opt-in: `RUN_REAL=1` |
| Live network repro (`*/*.live.test.js`) | opt-in: `RUN_LIVE_TESTS=1` |
| Skipped protocol specs (`describe.skip` with a reason) | run once the missing codec lands |

## Regression gate

Judge changes against the catalogued baseline instead of the raw pass/fail count:

```bash
cd tests
npx vitest run --reporter=json --outputFile=/tmp/current.json
node __baseline__/verify-no-regression.mjs /tmp/current.json
```

`__baseline__/known-fails.txt` lists every test that is red in this fork as
`tests/<path>::<full test name>` (one per line). The gate fails only when a test
that used to pass now fails, so *adding* red tests is the only way to trip it.
When a red test is intentionally fixed, regenerate the file from a fresh run.

Other baselines compare deterministic snapshots rather than test results and
should be run after touching the provider registry or OAuth URL logic:

```bash
node __baseline__/verify-providers.mjs
node __baseline__/verify-alias.mjs
node __baseline__/verify-oauth-urls.mjs
```

## Layout

| Path | What it covers |
|------|----------------|
| `unit/` | Handler, executor, DB, auth and route-level units |
| `translator/` | Format translation pairs, golden request/response/header snapshots, real-provider smoke tests |
| `translator/__snapshots__/` | Golden snapshots; version/token values are normalised so a release bump never invalidates them |
| `__baseline__/` | Provider/alias/OAuth URL snapshots + `known-fails.txt` and the regression gate |
