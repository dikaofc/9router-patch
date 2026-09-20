import { describe, expect, it } from "vitest";
import { getExecutor } from "../../open-sse/executors/index.js";
import {
  resolveOpencodeAuthToken,
} from "../../open-sse/executors/opencode.js";
import { PROVIDER_MODELS } from "../../open-sse/config/providerModels.js";
import { checkFallbackError } from "../../open-sse/services/accountFallback.js";

describe("OpenCode free-tier gate (403 FreeTierError / retired union-alpha)", () => {
  it("does not offer retired union-alpha in the registry", () => {
    const ids = (PROVIDER_MODELS.oc || []).map((m) => m.id);
    expect(ids).not.toContain("union-alpha");
    expect(ids).toContain("muse-spark-1.2-contributor-free");
    expect(ids).toContain("muse-spark-1.3-contributor-free");
  });

  it("prefers a user-saved token over the anonymous public pool", () => {
    expect(resolveOpencodeAuthToken({})).toBe("public");
    expect(resolveOpencodeAuthToken({ accessToken: "public" })).toBe("public");
    expect(resolveOpencodeAuthToken({ apiKey: " tok-123 " })).toBe("tok-123");
    expect(resolveOpencodeAuthToken({ accessToken: "tok-abc" })).toBe("tok-abc");
  });

  it("sends the user token as Authorization when present", () => {
    const executor = getExecutor("opencode");
    const anon = executor.buildHeaders({ rawHeaders: {} });
    expect(anon.Authorization).toBe("Bearer public");
    const byo = executor.buildHeaders({ rawHeaders: {}, apiKey: "tok-123" });
    expect(byo.Authorization).toBe("Bearer tok-123");
  });

  it("classifies the FreeTier gate as fallback-eligible (long cooldown, not silent)", () => {
    const r = checkFallbackError(
      403,
      '{"type":"error","error":{"type":"FreeTierError","message":"Error from provider (Console): OpenCode\'s free tier can only be used from within OpenCode"}}',
      0,
    );
    expect(r.shouldFallback).toBe(true);
    expect(r.cooldownMs).toBeGreaterThan(0);
  });
});
