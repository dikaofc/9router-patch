import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as fsPromises from "fs/promises";

// Mock next/server
vi.mock("next/server", () => ({
  NextResponse: {
    json: vi.fn((body, init) => ({
      status: init?.status || 200,
      body,
      json: async () => body,
    })),
  },
}));

// Mock os so candidate paths are deterministic
vi.mock("os", () => ({
  default: { homedir: vi.fn(() => "/mock/home") },
  homedir: vi.fn(() => "/mock/home"),
}));

// Mock fs/promises — the route probes candidates with access()
vi.mock("fs/promises", () => ({
  access: vi.fn(),
  constants: { R_OK: 4 },
}));

// sqlite3 CLI fallback + the Linux `which cursor` probe both go through
// child_process.execFile (promisified by the route).
const { execFileMock } = vi.hoisted(() => ({ execFileMock: vi.fn() }));
vi.mock("child_process", () => ({ execFile: execFileMock }));

const DARWIN_DB = "/mock/home/Library/Application Support/Cursor/User/globalStorage/state.vscdb";
const LINUX_DB = "/mock/home/.config/Cursor/User/globalStorage/state.vscdb";
const LINUX_DESKTOP = "/mock/home/.local/share/applications/cursor.desktop";

const failExec = (message = "not found") =>
  execFileMock.mockImplementation((file, args, opts, cb) => cb(new Error(message)));

const succeedExec = (stdout) =>
  execFileMock.mockImplementation((file, args, opts, cb) => cb(null, { stdout }));

describe("GET /api/oauth/cursor/auto-import", () => {
  const originalPlatform = process.platform;

  beforeEach(async () => {
    vi.clearAllMocks();
    failExec();
    Object.defineProperty(process, "platform", { value: "darwin", writable: true });
  });

  afterEach(() => {
    Object.defineProperty(process, "platform", { value: originalPlatform, writable: true });
  });

  const loadRoute = () => import("../../src/app/api/oauth/cursor/auto-import/route.js");

  // ── Candidate probing ─────────────────────────────────────────────────

  it("probes the macOS candidates and lists them when none are readable", async () => {
    vi.mocked(fsPromises.access).mockRejectedValue(new Error("ENOENT"));

    const { GET } = await loadRoute();
    const response = await GET();

    expect(response.body.found).toBe(false);
    expect(response.body.error).toContain("Cursor database not found. Checked locations:");
    expect(response.body.error).toContain("Library/Application Support/Cursor/User/globalStorage/state.vscdb");
    // Both macOS candidates (stable + Insiders) were probed
    expect(fsPromises.access).toHaveBeenCalledTimes(2);
  });

  it("probes the .config candidates on Linux", async () => {
    Object.defineProperty(process, "platform", { value: "linux", writable: true });
    vi.mocked(fsPromises.access).mockRejectedValue(new Error("ENOENT"));

    const { GET } = await loadRoute();
    const response = await GET();

    expect(response.body.found).toBe(false);
    expect(response.body.error).toContain(".config/Cursor/User/globalStorage/state.vscdb");
    expect(fsPromises.access).toHaveBeenCalled();
  });

  it("treats an unsupported platform like Linux instead of failing with 400", async () => {
    Object.defineProperty(process, "platform", { value: "freebsd", writable: true });
    vi.mocked(fsPromises.access).mockRejectedValue(new Error("ENOENT"));

    const { GET } = await loadRoute();
    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.body.found).toBe(false);
    expect(response.body.error).toContain("Checked locations:");
  });

  // ── Token extraction (sqlite3 CLI fallback) ────────────────────────────
  // The bundled better-sqlite3 strategy runs first in production; it is loaded
  // through `require()` (provided by the Next/webpack bundle, absent under
  // vitest), so the harness exercises the CLI fallback that follows it.

  it("extracts tokens through the sqlite3 CLI fallback", async () => {
    vi.mocked(fsPromises.access).mockResolvedValue();
    execFileMock.mockImplementation((file, args, opts, cb) => {
      const sql = String(args?.[1] || "");
      if (sql.includes("cursorAuth/accessToken")) return cb(null, { stdout: '"cli-token"\n' });
      if (sql.includes("storage.serviceMachineId")) return cb(null, { stdout: '"cli-machine"\n' });
      return cb(null, { stdout: "" });
    });

    const { GET } = await loadRoute();
    const response = await GET();

    expect(response.body.found).toBe(true);
    expect(response.body.accessToken).toBe("cli-token");
    expect(response.body.machineId).toBe("cli-machine");
  });

  it("unwraps JSON-encoded token values", async () => {
    vi.mocked(fsPromises.access).mockResolvedValue();
    execFileMock.mockImplementation((file, args, opts, cb) =>
      cb(null, { stdout: String(args?.[1] || "").includes("accessToken") ? '"json-token"' : '"json-machine"' })
    );

    const { GET } = await loadRoute();
    const response = await GET();

    expect(response.body.found).toBe(true);
    expect(response.body.accessToken).toBe("json-token");
    expect(response.body.machineId).toBe("json-machine");
  });

  // ── Fallbacks ─────────────────────────────────────────────────────────

  it("asks for a manual paste when neither strategy yields both tokens", async () => {
    vi.mocked(fsPromises.access).mockResolvedValue();
    failExec("no such table");

    const { GET } = await loadRoute();
    const response = await GET();

    expect(response.body.found).toBe(false);
    expect(response.body.windowsManual).toBe(true);
    expect(response.body.dbPath).toBe(DARWIN_DB);
  });

  it("skips auto-import on Linux when Cursor itself is not installed", async () => {
    Object.defineProperty(process, "platform", { value: "linux", writable: true });
    vi.mocked(fsPromises.access).mockImplementation(async (target) => {
      // The DB exists, but no `cursor` binary and no .desktop entry.
      if (target === LINUX_DB) return;
      throw new Error("ENOENT");
    });
    failExec("which: no cursor in PATH");

    const { GET } = await loadRoute();
    const response = await GET();

    expect(response.body.found).toBe(false);
    expect(response.body.error).toContain("does not appear to be installed");
    // The desktop-entry fallback was probed before giving up
    expect(fsPromises.access).toHaveBeenCalledWith(LINUX_DESKTOP, expect.anything());
  });
});
