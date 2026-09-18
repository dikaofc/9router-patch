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

## Expected state (green)

As of v0.5.82 a plain checkout is **fully green**: 2659 tests, 2545 pass, 0 fail,
114 skipped. The previously-catalogued reds were fixed at the source — stale
contracts updated, the four `node:test`-style files ported to vitest, and the
`cloud/`-dependent suite turned into a self-skip.

Skipped tests fall into three buckets, all opt-in:

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

`__baseline__/known-fails.txt` is the allow-list of expected reds, written as
`tests/<path>::<full test name>` (one per line; blank lines and `#` comments are
ignored). It is **empty as of v0.5.82**, so today the gate trips on any failure —
including a suite that stops collecting (a missing module no longer hides behind
"no failed assertions"). Add entries only when a red is genuinely unfixable here,
and say why in the file; when a catalogued red is fixed, delete its line.

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
