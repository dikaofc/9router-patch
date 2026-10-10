import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getProviderCredentials: vi.fn(),
  markAccountUnavailable: vi.fn(),
  clearAccountError: vi.fn(),
  extractApiKey: vi.fn(() => null),
  isValidApiKey: vi.fn(),
  getSettings: vi.fn(),
  checkAndRefreshToken: vi.fn(),
  getSystemOneCore: vi.fn(),
}));

vi.mock("@/sse/services/auth.js", () => ({
  getProviderCredentials: mocks.getProviderCredentials,
  markAccountUnavailable: mocks.markAccountUnavailable,
  clearAccountError: mocks.clearAccountError,
  extractApiKey: mocks.extractApiKey,
  isValidApiKey: mocks.isValidApiKey,
}));

vi.mock("@/lib/localDb", () => ({
  getSettings: mocks.getSettings,
}));

vi.mock("@/sse/services/tokenRefresh.js", () => ({
  checkAndRefreshToken: mocks.checkAndRefreshToken,
  updateProviderCredentials: vi.fn(),
}));

vi.mock("open-sse/handlers/systemone/index.js", () => ({
  getSystemOneCore: mocks.getSystemOneCore,
}));

vi.mock("@/sse/utils/logger.js", () => ({
  request: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  maskKey: vi.fn(() => "masked"),
}));

import { handleSystemOne } from "@/sse/handlers/systemone.js";

function request(body) {
  return new Request("http://localhost/v1/systemone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("System One provider and account routing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getSettings.mockResolvedValue({ requireApiKey: false });
    mocks.checkAndRefreshToken.mockImplementation(async (_provider, credentials) => credentials);
    mocks.getProviderCredentials.mockResolvedValue({
      connectionId: "account-1",
      connectionName: "Account 1",
      apiKey: "provider-key",
    });
    mocks.getSystemOneCore.mockResolvedValue({
      success: true,
      response: new Response("ok"),
    });
  });

  it("routes an aliased provider/model pair through its registry configuration", async () => {
    const response = await handleSystemOne(request({
      model: "cf/@cf/meta/llama-3.2-1b-instruct",
      state: { ready: true },
      questions: { next: "continue?" },
    }));

    expect(response.status, await response.clone().text()).toBe(200);
    expect(mocks.getProviderCredentials).toHaveBeenCalledWith(
      "cloudflare-ai",
      expect.any(Set),
      "@cf/meta/llama-3.2-1b-instruct",
    );
    expect(mocks.getSystemOneCore).toHaveBeenCalledWith(expect.objectContaining({
      provider: "cloudflare-ai",
      body: expect.objectContaining({ model: "@cf/meta/llama-3.2-1b-instruct" }),
      systemoneConfig: expect.objectContaining({
        baseUrl: expect.stringContaining("{accountId}"),
      }),
      credentials: expect.objectContaining({ apiKey: "provider-key" }),
    }));
  });

  it("uses the OpenCode free provider's anonymous credential path", async () => {
    mocks.getProviderCredentials.mockResolvedValue({
      id: "noauth",
      accessToken: "public",
      connectionName: "Public",
    });

    const response = await handleSystemOne(request({
      provider: "opencode",
      model: "jev-1.13-free",
      state: {},
      questions: {},
    }));

    expect(response.status, await response.clone().text()).toBe(200);
    expect(mocks.getProviderCredentials).toHaveBeenCalledWith(
      "opencode",
      expect.any(Set),
      "jev-1.13-free",
    );
    expect(mocks.getSystemOneCore).toHaveBeenCalledWith(expect.objectContaining({
      provider: "opencode",
      credentials: expect.objectContaining({ accessToken: "public" }),
      systemoneConfig: expect.objectContaining({
        baseUrl: "https://opencode.ai/zen/v1/systemone",
      }),
    }));
  });

  it("routes other configured System One providers such as OpenRouter", async () => {
    const response = await handleSystemOne(request({
      provider: "openrouter",
      model: "meta-llama/llama-3.3-70b-instruct:free",
      state: {},
      questions: {},
    }));

    expect(response.status, await response.clone().text()).toBe(200);
    expect(mocks.getSystemOneCore).toHaveBeenCalledWith(expect.objectContaining({
      provider: "openrouter",
      systemoneConfig: expect.objectContaining({
        baseUrl: "https://openrouter.ai/api/v1/systemone",
      }),
    }));
  });

  it("fails over to another saved account after a retryable provider error", async () => {
    const first = {
      connectionId: "account-1",
      connectionName: "Account 1",
      apiKey: "key-1",
    };
    const second = {
      connectionId: "account-2",
      connectionName: "Account 2",
      apiKey: "key-2",
    };
    mocks.getProviderCredentials
      .mockResolvedValueOnce(first)
      .mockResolvedValueOnce(second);
    mocks.getSystemOneCore
      .mockResolvedValueOnce({
        success: false,
        status: 429,
        error: "quota exhausted",
        response: new Response("rate limited", { status: 429 }),
      })
      .mockResolvedValueOnce({
        success: true,
        response: new Response("ok"),
      });
    mocks.markAccountUnavailable.mockResolvedValue({ shouldFallback: true });

    const response = await handleSystemOne(request({
      provider: "systemone",
      model: "rev-latest",
      state: {},
      questions: {},
    }));

    expect(response.status, await response.clone().text()).toBe(200);
    expect(mocks.markAccountUnavailable).toHaveBeenCalledWith(
      "account-1",
      429,
      "quota exhausted",
      "v1m",
      "rev-latest",
    );
    const [, excludeIds] = mocks.getProviderCredentials.mock.calls[1];
    expect(excludeIds.has("account-1")).toBe(true);
    expect(mocks.getSystemOneCore).toHaveBeenLastCalledWith(expect.objectContaining({
      provider: "v1m",
      credentials: second,
    }));
  });
});
