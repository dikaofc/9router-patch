import { afterEach, describe, expect, it, vi } from "vitest";
import { getSystemOneCore } from "../../open-sse/handlers/systemone/index.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("System One upstream requests", () => {
  it("uses connection credentials and account placeholders", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ result: "ok" })));
    vi.stubGlobal("fetch", fetchMock);

    const result = await getSystemOneCore({
      body: { model: "llama", state: {}, questions: {} },
      provider: "cloudflare-ai",
      systemoneConfig: {
        baseUrl: "https://api.example/accounts/{accountId}/ai/v1/systemone",
        authType: "apikey",
        authHeader: "bearer",
      },
      credentials: {
        apiKey: "account-api-key",
        providerSpecificData: { accountId: "account-123" },
      },
      log: {},
    });

    expect(result.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example/accounts/account-123/ai/v1/systemone",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer account-api-key",
        }),
        body: JSON.stringify({ model: "llama", state: {}, questions: {} }),
      }),
    );
  });

  it("keeps the OpenCode anonymous token intact for its free endpoint", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ result: "ok" })));
    vi.stubGlobal("fetch", fetchMock);

    const result = await getSystemOneCore({
      body: { model: "jev-1.13-free", state: {}, questions: {} },
      provider: "opencode",
      systemoneConfig: {
        baseUrl: "https://opencode.ai/zen/v1/systemone",
        authType: "apikey",
        authHeader: "bearer",
      },
      credentials: { accessToken: "public" },
      log: {},
    });

    expect(result.success).toBe(true);
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe("Bearer public");
  });

  it("preserves upstream status on errors for account fallback", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("quota exhausted", { status: 429 })));

    const result = await getSystemOneCore({
      body: { model: "rev-latest", state: {}, questions: {} },
      provider: "v1m",
      systemoneConfig: { baseUrl: "https://v1m.example/systemone" },
      credentials: { apiKey: "provider-key" },
      log: {},
    });

    expect(result).toMatchObject({
      success: false,
      status: 429,
      error: "Provider error: 429 quota exhausted",
    });
  });
});
