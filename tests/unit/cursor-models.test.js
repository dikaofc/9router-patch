import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EventEmitter } from "node:events";

// agent.api5.cursor.sh is HTTP/2-only, so the fetcher talks to node:http2
// directly (Node fetch/undici cannot speak h2). Mock the h2 client.
const { connectMock, requestCalls } = vi.hoisted(() => ({
  connectMock: vi.fn(),
  requestCalls: [],
}));

vi.mock("http2", () => ({
  default: { connect: connectMock },
  connect: connectMock,
}));

import {
  clearCursorModelCache,
  parseCursorUsableModels,
  resolveCursorModels,
} from "../../open-sse/services/cursorModels.js";

function varint(value) {
  const bytes = [];
  while (value >= 0x80) {
    bytes.push((value & 0x7f) | 0x80);
    value >>>= 7;
  }
  bytes.push(value);
  return Uint8Array.from(bytes);
}

function field(fieldNumber, value) {
  return Uint8Array.from([(fieldNumber << 3) | 2, ...varint(value.length), ...value]);
}

function text(value) {
  return new TextEncoder().encode(value);
}

function concat(...parts) {
  const size = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(size);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function model(id, name) {
  return field(1, concat(field(1, text(id)), field(4, text(name))));
}

// Minimal stand-in for an http2 session: request() returns a stream we drive by
// hand so the response/end events fire after the caller attaches listeners.
function stubHttp2Session({ status = 200, body, failure } = {}) {
  const session = new EventEmitter();
  session.close = vi.fn();
  session.request = vi.fn((headers) => {
    requestCalls.push(headers);
    const req = new EventEmitter();
    req.end = () => {
      queueMicrotask(() => {
        if (failure) return req.emit("error", failure);
        req.emit("response", { ":status": status });
        if (body) req.emit("data", Buffer.from(body));
        req.emit("end");
      });
    };
    return req;
  });
  return session;
}

describe("Cursor live model catalog", () => {
  beforeEach(() => {
    clearCursorModelCache();
    connectMock.mockReset();
    requestCalls.length = 0;
  });

  afterEach(() => {
    clearCursorModelCache();
  });

  it("decodes the GetUsableModels protobuf response", () => {
    const payload = concat(
      model("default", "Auto"),
      model("gpt-5.3-codex", "GPT 5.3 Codex"),
      model("gpt-5.3-codex", "Duplicate"),
    );

    expect(parseCursorUsableModels(payload)).toEqual([
      { id: "default", name: "Auto" },
      { id: "gpt-5.3-codex", name: "GPT 5.3 Codex" },
    ]);
  });

  it("fetches the account-specific catalog over HTTP/2 and caches it", async () => {
    const payload = concat(model("claude-4.6-opus", "Claude 4.6 Opus"));
    connectMock.mockReturnValue(stubHttp2Session({ body: payload }));
    const credentials = {
      accessToken: "cursor-token",
      providerSpecificData: { machineId: "machine-id" },
    };

    await expect(resolveCursorModels(credentials)).resolves.toEqual({
      models: [{ id: "claude-4.6-opus", name: "Claude 4.6 Opus" }],
    });
    await expect(resolveCursorModels(credentials)).resolves.toEqual({
      models: [{ id: "claude-4.6-opus", name: "Claude 4.6 Opus" }],
    });

    // Second call is served from the 5-minute cache.
    expect(connectMock).toHaveBeenCalledTimes(1);
    expect(connectMock).toHaveBeenCalledWith("https://agent.api5.cursor.sh");
    expect(requestCalls[0]).toEqual(
      expect.objectContaining({
        ":method": "POST",
        ":path": "/agent.v1.AgentService/GetUsableModels",
        ":scheme": "https",
        "content-type": "application/proto",
        accept: "application/proto",
      }),
    );
  });

  it("fails open when the Cursor catalog request returns an error status", async () => {
    connectMock.mockReturnValue(stubHttp2Session({ status: 403, body: "no" }));

    await expect(resolveCursorModels({
      accessToken: "cursor-token",
      providerSpecificData: { machineId: "machine-id" },
    })).resolves.toBeNull();
  });

  it("fails open when the HTTP/2 session errors", async () => {
    connectMock.mockReturnValue(stubHttp2Session({ failure: new Error("ECONNREFUSED") }));

    await expect(resolveCursorModels({
      accessToken: "cursor-token",
      providerSpecificData: { machineId: "machine-id" },
    })).resolves.toBeNull();
  });
});
