// Benchmark: SQLite persistence layer vs the legacy JSON-file store.
//
// The legacy store was lowdb (`Low` + `JSONFile`): every write serialised the
// whole object to disk and every read parsed it back. lowdb is no longer a
// dependency, so the baseline here is the same two primitives reimplemented with
// node:fs — which is exactly what lowdb did, minus the package.
//
// Run: cd tests && npx vitest run unit/db-benchmark.test.js
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, beforeAll, afterAll, vi } from "vitest";

const N_ITEMS = 500;
const N_QUERIES = 200;

const originalDataDir = process.env.DATA_DIR;
let tempSqlite, tempBaseline;
let sqliteDb;
let baseline; // { read, write, data }

function fmt(ms) { return `${ms.toFixed(2)}ms`; }

async function bench(label, fn) {
  await fn(); // warmup
  const t0 = performance.now();
  await fn();
  const dt = performance.now() - t0;
  console.log(`  ${label.padEnd(40)} ${fmt(dt)}`);
  return dt;
}

function createJsonStore(dir) {
  const file = path.join(dir, "db.json");
  fs.writeFileSync(file, JSON.stringify({ providerConnections: [], usageHistory: [] }));
  const store = {
    data: { providerConnections: [], usageHistory: [] },
    async read() {
      store.data = JSON.parse(fs.readFileSync(file, "utf8"));
    },
    async write() {
      fs.writeFileSync(file, JSON.stringify(store.data));
    },
  };
  return store;
}

beforeAll(async () => {
  tempSqlite = fs.mkdtempSync(path.join(os.tmpdir(), "9router-bench-sqlite-"));
  process.env.DATA_DIR = tempSqlite;
  vi.resetModules();
  sqliteDb = await import("@/lib/db/index.js");
  await sqliteDb.initDb();

  tempBaseline = fs.mkdtempSync(path.join(os.tmpdir(), "9router-bench-json-"));
  baseline = createJsonStore(tempBaseline);
});

afterAll(() => {
  if (tempSqlite) fs.rmSync(tempSqlite, { recursive: true, force: true });
  if (tempBaseline) fs.rmSync(tempBaseline, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

describe("DB Benchmark — SQLite vs legacy JSON store", () => {
  it(`INSERT ${N_ITEMS} provider connections`, async () => {
    console.log(`\n[INSERT ${N_ITEMS}]`);

    const sqliteTime = await bench("SQLite createProviderConnection", async () => {
      for (let i = 0; i < N_ITEMS; i++) {
        await sqliteDb.createProviderConnection({
          provider: `bench-p${i % 5}`, authType: "apikey",
          name: `name-${i}`, apiKey: `k-${i}`,
        });
      }
    });

    const baselineTime = await bench("JSON read + push + write", async () => {
      await baseline.read();
      for (let i = 0; i < N_ITEMS; i++) {
        baseline.data.providerConnections.push({
          id: `id-${i}`, provider: `bench-p${i % 5}`, authType: "apikey",
          name: `name-${i}`, apiKey: `k-${i}`, priority: i + 1, isActive: true,
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        });
        await baseline.write();
      }
    });

    console.log(`  → SQLite is ${(baselineTime / sqliteTime).toFixed(2)}x faster`);
  }, 60000);

  it(`READ ${N_QUERIES} filtered queries`, async () => {
    console.log(`\n[READ ${N_QUERIES} filtered queries]`);

    const sqliteTime = await bench("SQLite getProviderConnections(filter)", async () => {
      for (let i = 0; i < N_QUERIES; i++) {
        await sqliteDb.getProviderConnections({ provider: `bench-p${i % 5}` });
      }
    });

    const baselineTime = await bench("JSON read + filter", async () => {
      for (let i = 0; i < N_QUERIES; i++) {
        await baseline.read();
        baseline.data.providerConnections.filter((c) => c.provider === `bench-p${i % 5}`);
      }
    });

    console.log(`  → SQLite is ${(baselineTime / sqliteTime).toFixed(2)}x faster`);
  }, 60000);

  it(`READ ${N_QUERIES} by id (point lookup)`, async () => {
    console.log(`\n[READ ${N_QUERIES} by id]`);

    const all = await sqliteDb.getProviderConnections();
    const ids = all.slice(0, N_QUERIES).map((c) => c.id);

    const sqliteTime = await bench("SQLite getProviderConnectionById", async () => {
      for (const id of ids) await sqliteDb.getProviderConnectionById(id);
    });

    const baselineIds = baseline.data.providerConnections.slice(0, N_QUERIES).map((c) => c.id);
    const baselineTime = await bench("JSON find by id", async () => {
      for (const id of baselineIds) {
        await baseline.read();
        baseline.data.providerConnections.find((c) => c.id === id);
      }
    });

    console.log(`  → SQLite is ${(baselineTime / sqliteTime).toFixed(2)}x faster`);
  }, 60000);

  it(`saveRequestUsage ${N_ITEMS} entries`, async () => {
    console.log(`\n[saveRequestUsage ${N_ITEMS}]`);

    const sqliteTime = await bench("SQLite saveRequestUsage", async () => {
      for (let i = 0; i < N_ITEMS; i++) {
        await sqliteDb.saveRequestUsage({
          provider: "openai", model: `m-${i % 10}`, connectionId: `c-${i % 5}`,
          tokens: { prompt_tokens: 100 + i, completion_tokens: 50 + i },
          endpoint: "/v1/chat/completions", status: "ok",
        });
      }
    });

    const baselineTime = await bench("JSON push history + write", async () => {
      await baseline.read();
      baseline.data.usageHistory = [];
      for (let i = 0; i < N_ITEMS; i++) {
        baseline.data.usageHistory.push({
          timestamp: new Date().toISOString(), provider: "openai", model: `m-${i % 10}`,
          connectionId: `c-${i % 5}`, tokens: { prompt_tokens: 100 + i, completion_tokens: 50 + i },
          endpoint: "/v1/chat/completions", status: "ok", cost: 0,
        });
        await baseline.write();
      }
    });

    console.log(`  → SQLite is ${(baselineTime / sqliteTime).toFixed(2)}x faster`);
  }, 120000);

  it("getUsageStats(24h) repeat 50x", async () => {
    console.log("\n[getUsageStats(24h) x 50]");

    const sqliteTime = await bench("SQLite getUsageStats(24h)", async () => {
      for (let i = 0; i < 50; i++) await sqliteDb.getUsageStats("24h");
    });

    const baselineTime = await bench("JSON read + aggregate", async () => {
      for (let i = 0; i < 50; i++) {
        await baseline.read();
        const cutoff = Date.now() - 86400000;
        const hist = baseline.data.usageHistory.filter((h) => new Date(h.timestamp).getTime() >= cutoff);
        const stats = { byProvider: {}, byModel: {} };
        for (const e of hist) {
          if (!stats.byProvider[e.provider]) stats.byProvider[e.provider] = { requests: 0 };
          stats.byProvider[e.provider].requests++;
        }
      }
    });

    console.log(`  → SQLite is ${(baselineTime / sqliteTime).toFixed(2)}x faster`);
  }, 60000);
});
