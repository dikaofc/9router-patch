// Kimchi provider + OAuth service + model catalogue.
//
// Ported from node:test (vitest never collected those files) and de-cloned:
// earlier revisions tested hand-copied "pure-function clones" because node:test
// could not resolve the `@/`/`open-sse` aliases. vitest does resolve them, so
// these suites now import the shipped modules.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from "vitest";

import kimchiEntry from "../../open-sse/providers/registry/kimchi.js";
import {
  buildKimchiAuthUrl,
  generateState,
  getResolvedSession,
  KimchiService,
} from "../../src/lib/oauth/services/kimchi.js";
import {
  buildKimchiModelsUrl,
  clearKimchiCatalog,
  getCachedKimchiModelMetadata,
  normalizeKimchiModel,
  resolveKimchiModels,
} from "../../open-sse/services/kimchiModels.js";

describe("kimchi registry entry", () => {
  it("is a freeTier provider that also supports OAuth", () => {
    expect(kimchiEntry.id).toBe("kimchi");
    expect(kimchiEntry.category).toBe("freeTier");
    expect(kimchiEntry.hasOAuth).toBe(true);
    expect(kimchiEntry.authModes).toEqual(["oauth", "apikey"]);
  });

  it("points at the OpenAI-compatible gateway with an authenticated UA", () => {
    expect(kimchiEntry.transport.baseUrl).toBe(
      "https://llm.kimchi.dev/openai/v1/chat/completions"
    );
    // UA must be a non-empty string the gateway can identify; the value
    // itself is owned by the Kimchi CLI release and may change upstream.
    const ua = kimchiEntry.transport.headers["User-Agent"];
    expect(typeof ua === "string" && ua.length > 0).toBe(true);
  });

  it("uses Bearer auth", () => {
    expect(kimchiEntry.transport.auth).toEqual({
      combined: true,
      header: "Authorization",
      scheme: "bearer",
    });
  });

  it("exposes the upstream static models", () => {
    const ids = kimchiEntry.models.map((m) => m.id);
    expect(ids).toContain("kimi-k2.7");
    expect(ids).toContain("minimax-m3");
    expect(ids).toContain("nemotron-3-ultra-fp4");
    expect(ids.length).toBeGreaterThanOrEqual(5);
  });

  it("passes through models not in the static list", () => {
    expect(kimchiEntry.passthroughModels).toBe(true);
  });
});

describe("kimchi oauth — buildKimchiAuthUrl / state", () => {
  it("builds the cli-auth URL with encoded callback + state", () => {
    const url = new URL(buildKimchiAuthUrl("http://127.0.0.1:4321/callback", "abc123"));
    expect(url.origin).toBe("https://app.kimchi.dev");
    expect(url.pathname).toBe("/cli-auth");
    expect(url.searchParams.get("callback")).toBe("http://127.0.0.1:4321/callback");
    expect(url.searchParams.get("state")).toBe("abc123");
  });

  it("generateState returns a fresh 256-bit hex state each call", () => {
    const a = generateState();
    const b = generateState();
    expect(a).toMatch(/^[0-9a-f]{64}$/);
    expect(a).not.toBe(b);
  });

  it("getResolvedSession returns null for an unknown state", () => {
    expect(getResolvedSession("nope")).toBeNull();
  });
});

describe("kimchi oauth — _handleCallback", () => {
  // The callback handler validates the token against the upstream service;
  // stub that single method so the state/token decision logic is what's tested.
  function service() {
    const svc = new KimchiService();
    svc.validateToken = async () => ({ valid: true });
    return svc;
  }

  it("rejects a callback whose state does not match", async () => {
    await expect(
      service()._handleCallback({ token: "castai_v1_x", state: "wrong" }, "expected")
    ).rejects.toThrow(/restart/i);
  });

  it("rejects a callback with no token", async () => {
    await expect(
      service()._handleCallback({ state: "match" }, "match")
    ).rejects.toThrow(/No token/i);
  });

  it("surfaces an upstream error_description", async () => {
    await expect(
      service()._handleCallback({ error: "access_denied", error_description: "denied by user" }, "match")
    ).rejects.toThrow("denied by user");
  });

  it("rejects a token the upstream validator refuses", async () => {
    const svc = new KimchiService();
    svc.validateToken = async () => ({ valid: false, error: "Kimchi token invalid or expired" });
    await expect(
      svc._handleCallback({ token: "castai_v1_x", state: "match" }, "match")
    ).rejects.toThrow(/invalid or expired/i);
  });

  it("accepts a callback with matching state and returns the token", async () => {
    const res = await service()._handleCallback({ token: "castai_v1_x", state: "match" }, "match");
    expect(res.token).toBe("castai_v1_x");
  });
});

describe("kimchi oauth — validateToken (status → decision)", () => {
  const originalFetch = globalThis.fetch;

  function stubStatus(status) {
    globalThis.fetch = vi.fn(async () => new Response("{}", { status }));
  }

  beforeEach(() => {
    globalThis.fetch = originalFetch;
  });

  afterAll(() => {
    globalThis.fetch = originalFetch;
  });

  it("200 → valid", async () => {
    stubStatus(200);
    await expect(new KimchiService().validateToken("t")).resolves.toEqual({ valid: true });
  });

  it("401 → invalid, expired message", async () => {
    stubStatus(401);
    const r = await new KimchiService().validateToken("t");
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/invalid or expired/i);
  });

  it("403 → invalid, scope message", async () => {
    stubStatus(403);
    const r = await new KimchiService().validateToken("t");
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/scope/i);
  });

  it("unknown status and network errors → fail-open valid", async () => {
    stubStatus(500);
    await expect(new KimchiService().validateToken("t")).resolves.toEqual({ valid: true });

    globalThis.fetch = vi.fn(async () => { throw new Error("ECONNRESET"); });
    await expect(new KimchiService().validateToken("t")).resolves.toEqual({ valid: true });
  });
});

describe("kimchiModels — catalogue parsing", () => {
  beforeEach(() => clearKimchiCatalog());

  it("maps Kimchi metadata entries to the 9router model shape", () => {
    const model = normalizeKimchiModel({
      slug: "glm-5.2-fp8",
      display_name: "GLM 5.2",
      provider: "anthropic",
      reasoning: true,
      input_modalities: ["text", "image"],
      limits: { context_window: 1048576, max_output_tokens: 1048576 },
    });

    expect(model.id).toBe("glm-5.2-fp8");
    expect(model.name).toBe("GLM 5.2");
    expect(model.contextLength).toBe(1048576);
    expect(model.maxOutputTokens).toBe(1048576);
    expect(model.reasoning).toBe(true);
    expect(model.kind).toBe("imageToText");
    expect(model.compat).toEqual({ supportsReasoningEffort: false, cacheControlFormat: "anthropic" });
  });

  it("falls back to the slug for name and omits unknown limits", () => {
    const model = normalizeKimchiModel({ slug: "kimi-k2.7", display_name: "", reasoning: false, limits: {} });
    expect(model.name).toBe("kimi-k2.7");
    expect(model.contextLength).toBeUndefined();
    expect(model.maxOutputTokens).toBeUndefined();
    expect(model.reasoning).toBe(false);
    expect(model.kind).toBe("llm");
  });

  it("returns null for unusable entries", () => {
    expect(normalizeKimchiModel(null)).toBeNull();
    expect(normalizeKimchiModel({})).toBeNull();
    expect(normalizeKimchiModel({ slug: "   " })).toBeNull();
  });

  it("builds the metadata URL from the configured endpoint", () => {
    expect(buildKimchiModelsUrl()).toBe("https://llm.kimchi.dev/v1/models/metadata?include_in_cli=true");
    expect(buildKimchiModelsUrl("https://kimchi.internal///")).toBe(
      "https://kimchi.internal/v1/models/metadata?include_in_cli=true"
    );
  });

  it("resolveKimchiModels returns null without a token", async () => {
    await expect(resolveKimchiModels({})).resolves.toBeNull();
  });

  it("resolveKimchiModels parses the catalogue and caches it per credential", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({
      models: [
        { slug: "kimi-k2.7", display_name: "Kimi K2.7", reasoning: true, limits: { context_window: 262144 } },
        { slug: "", display_name: "broken" },
      ],
    }), { status: 200, headers: { "content-type": "application/json" } }));

    vi.resetModules();
    vi.doMock("../../open-sse/utils/proxyFetch.js", () => ({ proxyAwareFetch: fetchMock }));
    try {
      const mod = await import("../../open-sse/services/kimchiModels.js");
      const credentials = { accessToken: "castai_v1_x", providerSpecificData: { userId: "u-1" } };

      const entry = await mod.resolveKimchiModels(credentials);
      expect(fetchMock).toHaveBeenCalledOnce();
      expect(entry.models.map((m) => m.id)).toEqual(["kimi-k2.7"]);

      // Second call is served from the in-process cache.
      await mod.resolveKimchiModels(credentials);
      expect(fetchMock).toHaveBeenCalledOnce();

      // Metadata is addressable by model id afterwards (used by /v1/models).
      expect(mod.getCachedKimchiModelMetadata("kimchi/kimi-k2.7")?.id).toBe("kimi-k2.7");
    } finally {
      vi.doUnmock("../../open-sse/utils/proxyFetch.js");
      vi.resetModules();
    }
  });

  it("getCachedKimchiModelMetadata returns null for an unknown id", () => {
    expect(getCachedKimchiModelMetadata("nope")).toBeNull();
    expect(getCachedKimchiModelMetadata("")).toBeNull();
  });
});

// ── OAuth dedup — real connectionsRepo against a scratch SQLite file ──

describe("kimchi OAuth dedup (createProviderConnection)", () => {
  const originalDataDir = process.env.DATA_DIR;
  let tempDir;
  let db;

  beforeAll(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "9router-kimchi-"));
    process.env.DATA_DIR = tempDir;
    vi.resetModules();
    db = await import("@/lib/db/index.js");
    await db.initDb();
  });

  afterAll(() => {
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    if (originalDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = originalDataDir;
  });

  const oauth = (username) => ({
    provider: "kimchi",
    authType: "oauth",
    email: "x@y.com",
    accessToken: "castai_v1_x",
    providerSpecificData: { username },
  });

  it("re-login with the same username updates the existing row", async () => {
    const first = await db.createProviderConnection(oauth("google-oauth2|123"));
    const second = await db.createProviderConnection(oauth("google-oauth2|123"));

    expect(second.id).toBe(first.id);
    const rows = await db.getProviderConnections({ provider: "kimchi" });
    expect(rows.map((r) => r.id)).toEqual([first.id]);
  });

  it("same email from a different IdP is a distinct account", async () => {
    const before = (await db.getProviderConnections({ provider: "kimchi" })).length;
    await db.createProviderConnection(oauth("huggingface|456"));

    const rows = await db.getProviderConnections({ provider: "kimchi" });
    expect(rows.length).toBe(before + 1);
    const usernames = rows.map((r) => r.providerSpecificData?.username);
    expect(usernames).toContain("google-oauth2|123");
    expect(usernames).toContain("huggingface|456");
  });

  it("workspaces dedupe on workspace ID, not username", async () => {
    const ws1 = {
      provider: "kimchi", authType: "oauth", email: "a@b.com", accessToken: "t",
      providerSpecificData: { chatgptAccountId: "ws1" },
    };
    const firstWs = await db.createProviderConnection(ws1);
    const sameWs = await db.createProviderConnection(ws1);
    expect(sameWs.id).toBe(firstWs.id);

    const otherWs = await db.createProviderConnection({
      ...ws1, providerSpecificData: { chatgptAccountId: "ws2" },
    });
    expect(otherWs.id).not.toBe(firstWs.id);
  });

  it("api-key connections dedupe by name, oauth access tokens never dedupe", async () => {
    const key = { provider: "kimchi", authType: "apikey", name: "work", apiKey: "k-1" };
    const a = await db.createProviderConnection(key);
    const b = await db.createProviderConnection({ ...key, apiKey: "k-2" });
    expect(b.id).toBe(a.id);
    expect(b.apiKey).toBe("k-2");

    const t1 = await db.createProviderConnection({ provider: "kimchi", authType: "access_token", name: "tok" });
    const t2 = await db.createProviderConnection({ provider: "kimchi", authType: "access_token", name: "tok" });
    expect(t2.id).not.toBe(t1.id);
  });
});
