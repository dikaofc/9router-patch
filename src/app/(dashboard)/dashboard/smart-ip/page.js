"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const REGIONS = [
  { id: "iad1", name: "US East", flag: "🇺🇸" },
  { id: "sfo1", name: "US West", flag: "🇺🇸" },
  { id: "cdg1", name: "Europe", flag: "🇪🇺" },
  { id: "hnd1", name: "Asia", flag: "🇯🇵" },
  { id: "sin1", name: "Singapore", flag: "🇸🇬" },
  { id: "syd1", name: "Oceania", flag: "🇦🇺" },
  { id: "gru1", name: "S. America", flag: "🇧🇷" },
  { id: "bom1", name: "India", flag: "🇮🇳" },
];

export default function SmartIpPage() {
  const [relays, setRelays] = useState([]);
  const [vercelToken, setVercelToken] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [selectedRegions, setSelectedRegions] = useState(["iad1", "sfo1", "cdg1", "hnd1"]);
  const [deploying, setDeploying] = useState(false);
  const [deployLog, setDeployLog] = useState([]);
  const [currentIp, setCurrentIp] = useState("");
  const [rotationStrategy, setRotationStrategy] = useState("round-robin");
  const [activeRelayIndex, setActiveRelayIndex] = useState(0);

  const fetchRelays = useCallback(async () => {
    try {
      const res = await fetch("/api/smart-ip");
      const data = await res.json();
      if (data.relays) setRelays(data.relays);
    } catch {}
  }, []);

  useEffect(() => { fetchRelays(); }, [fetchRelays]);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setCurrentIp(d.ip))
      .catch(() => setCurrentIp("Unable to detect"));
  }, []);

  // Load persisted Smart IP config. The Vercel token is stored server-side and
  // redacted from the response, so only targetUrl + regions come back to prefill.
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        // /api/settings GET returns a FLAT settings object (no `settings` wrapper)
        const s = d || {};
        if (s.smartIpTargetUrl) setTargetUrl(s.smartIpTargetUrl);
        if (Array.isArray(s.smartIpRegions) && s.smartIpRegions.length) {
          setSelectedRegions(s.smartIpRegions);
        }
      })
      .catch(() => {});
  }, []);

  const saveConfig = useCallback(
    async (extra = {}) => {
      try {
        await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            smartIpTargetUrl: targetUrl,
            smartIpRegions: selectedRegions,
            ...extra,
          }),
        });
      } catch {}
    },
    [targetUrl, selectedRegions],
  );

  // Persist target URL + regions (debounced) so a refresh keeps them.
  // Skip the initial mount run so a failed/empty settings load can't clobber
  // already-persisted values.
  const skipFirstSave = useRef(true);
  useEffect(() => {
    if (skipFirstSave.current) {
      skipFirstSave.current = false;
      return;
    }
    const t = setTimeout(() => saveConfig(), 800);
    return () => clearTimeout(t);
  }, [saveConfig]);

  const toggleRegion = (id) => {
    setSelectedRegions((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleDeploy = async () => {
    if (!targetUrl || selectedRegions.length === 0) return;
    setDeploying(true);
    setDeployLog([{ text: `Deploying relays to ${selectedRegions.length} regions...`, type: "info" }]);

    try {
      const res = await fetch("/api/smart-ip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vercelToken, regions: selectedRegions, targetUrl }),
      });
      const rawText = await res.text();
      let data = {};
      try { data = JSON.parse(rawText); } catch { data = { error: rawText || `HTTP ${res.status}` }; }

      if (data.results) {
        const logs = data.results.map((r) => ({
          text: r.status === "deployed"
            ? `✅ ${r.regionName || r.region}: ${r.relayUrl}`
            : `❌ ${r.region}: ${r.error}`,
          type: r.status === "deployed" ? "success" : "error",
        }));
        setDeployLog((prev) => [...prev, ...logs]);
      }
      if (data.error && !data.results) {
        setDeployLog((prev) => [...prev, { text: `❌ Deploy failed: ${data.error}`, type: "error" }]);
      }
      // Persist config; the token is saved server-side (redacted from GET) so
      // future deploys fall back to it without re-entering.
      const extra = vercelToken && vercelToken.trim() ? { smartIpVercelToken: vercelToken } : {};
      await saveConfig(extra);
      fetchRelays();
    } catch (err) {
      setDeployLog((prev) => [...prev, { text: `❌ Deploy failed: ${err.message}`, type: "error" }]);
    } finally {
      setDeploying(false);
    }
  };

  const activeRelays = relays.filter((p) => p.isActive);
  const nextRelay = () => {
    if (activeRelays.length === 0) return null;
    const idx = (activeRelayIndex + 1) % activeRelays.length;
    setActiveRelayIndex(idx);
    return activeRelays[idx];
  };

  return (
    <div className="space-y-6">
      {/* Current IP */}
      <div className="glass-card rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">public</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Current Outbound IP</h3>
            <p className="text-xs text-text-muted">Detected from Vercel serverless function</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <code className="break-all font-mono text-lg font-bold text-primary">{currentIp}</code>
          <span className="text-xs text-text-muted bg-surface-2 px-2 py-0.5 rounded-full">
            {activeRelays.length} relay{activeRelays.length !== 1 ? "s" : ""} active
          </span>
        </div>
      </div>

      {/* Deploy Config */}
      <div className="glass-card rounded-2xl p-4 sm:p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">deploy</span>
          Deploy Relay to New IPs
        </h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="smart-ip-vercel-token" className="text-xs font-medium text-text-muted mb-1 block">Vercel API Token</label>
            <input
              id="smart-ip-vercel-token"
              type="password"
              placeholder="vercel_token_xxx"
              value={vercelToken}
              onChange={(e) => setVercelToken(e.target.value)}
              className="w-full rounded-xl border border-border-subtle bg-surface/70 px-3 py-2.5 font-mono text-sm text-text-main placeholder:text-text-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
            />
            <p className="text-[10px] text-text-muted mt-1">Disimpan di server setelah deploy pertama — tidak perlu diisi ulang saat refresh.</p>
          </div>

          <div>
            <label htmlFor="smart-ip-target-url" className="text-xs font-medium text-text-muted mb-1 block">Your 9Router Vercel URL</label>
            <input
              id="smart-ip-target-url"
              type="url"
              placeholder="https://your-project.vercel.app"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="w-full rounded-xl border border-border-subtle bg-surface/70 px-3 py-2.5 text-sm text-text-main placeholder:text-text-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div>
            <p className="text-xs font-medium text-text-muted mb-2" id="smart-ip-regions-label">Select Regions ({selectedRegions.length} selected)</p>
            <div role="group" aria-labelledby="smart-ip-regions-label" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {REGIONS.map((region) => (
                <button
                  type="button"
                  key={region.id}
                  onClick={() => toggleRegion(region.id)}
                  aria-pressed={selectedRegions.includes(region.id)}
                  aria-label={`${region.name}, ${selectedRegions.includes(region.id) ? "selected" : "not selected"}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    selectedRegions.includes(region.id)
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "border-border-subtle bg-surface/55 text-text-muted hover:bg-surface-2"
                  }`}
                >
                  <span>{region.flag}</span>
                  <span>{region.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleDeploy}
            disabled={deploying || !targetUrl || selectedRegions.length === 0}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deploying ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                Deploying to {selectedRegions.length} regions...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                Deploy Relays
              </>
            )}
          </button>
        </div>

        {deployLog.length > 0 && (
          <div role="log" aria-live="polite" className="mt-4 max-h-48 overflow-y-auto rounded-xl border border-border-subtle bg-surface-2/70 p-3">
            {deployLog.map((log, i) => (
              <p key={i} className={`text-xs font-mono mb-1 ${
                log.type === "success" ? "text-green-600 dark:text-green-400" : log.type === "error" ? "text-rose-600 dark:text-rose-400" : "text-text-muted"
              }`}>
                {log.text}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Active Relays */}
      <div className="glass-card rounded-2xl p-4 sm:p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-green-500">dns</span>
          Active Relays ({activeRelays.length})
        </h3>

        {activeRelays.length === 0 ? (
          <p className="text-xs text-text-muted py-4 text-center">
            No relays deployed yet. Deploy relays above to get different IPs for rate limit bypass.
          </p>
        ) : (
          <div className="space-y-2">
            {activeRelays.map((relay, i) => {
              const region = REGIONS.find((r) => relay.name?.includes(r.id));
              return (
                <div
                  key={relay.id}
                  className={`flex flex-col gap-3 rounded-xl border px-3 py-2.5 transition-all sm:flex-row sm:items-center sm:justify-between ${
                    i === activeRelayIndex
                      ? "bg-primary/10 border-primary/30"
                      : "bg-surface/55 border-border-subtle"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{region?.flag || "🌐"}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium">{relay.name}</p>
                      <p className="max-w-full truncate font-mono text-[10px] text-text-muted sm:max-w-[200px]">{relay.proxyUrl}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {i === activeRelayIndex && (
                      <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">ACTIVE</span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(relay.proxyUrl);
                      }}
                      className="text-text-muted hover:text-text-main transition-colors"
                      title="Copy relay URL"
                      aria-label={`Copy relay URL for ${relay.name}`}
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeRelays.length > 1 && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-xs font-medium text-text-muted mb-2">Rotation</h4>
            <div className="flex gap-2">
              <select
                value={rotationStrategy}
                onChange={(e) => setRotationStrategy(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-border-subtle bg-surface/70 px-3 py-2.5 text-xs text-text-main focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
              >
                <option value="round-robin">Round Robin</option>
                <option value="random">Random</option>
                <option value="least-used">Least Used</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  const next = nextRelay();
                  if (next) alert(`Switched to: ${next.name}\n${next.proxyUrl}`);
                }}
                className="min-h-10 rounded-xl border border-border-subtle bg-surface/70 px-4 py-2 text-xs font-medium text-text-main transition-colors hover:bg-surface-2"
              >
                Manual Switch →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="glass-card rounded-2xl p-4 sm:p-5">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-amber-500">info</span>
          How Smart IP Works
        </h3>
        <div className="space-y-2 text-xs text-text-muted">
          <p>• Each relay is deployed to a different Vercel region → <strong className="text-text-main">different outbound IP</strong></p>
          <p>• When rate limited (429), rotate to next relay → <strong className="text-text-main">bypass IP ban</strong></p>
          <p>• Assign relays as Proxy Pool to your provider connections</p>
          <p>• Strategy: Round Robin (sequential), Random, or Least Used</p>
          <p>• <strong className="text-amber-600 dark:text-amber-400">Vercel Hobby:</strong> Deploying multiple projects may hit free tier limits (100 concurrent)</p>
        </div>
      </div>
    </div>
  );
}
