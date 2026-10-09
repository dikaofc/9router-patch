"use client";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { UPDATER_CONFIG } from "@/shared/constants/config";

export default function GetStarted() {
  const { copied, copy } = useCopyToClipboard();
  const startCommand = `npx ${UPDATER_CONFIG.npmPackageName}`;
  const baseUrl = `http://localhost:${UPDATER_CONFIG.appPort}`;

  const handleCopy = (text) => {
    copy(text, "landing");
  };

  return (
    <section className="py-20 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-text-main tracking-tight">Get Started in 30 Seconds</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              Install 9Router, configure your providers via web dashboard, and start routing AI requests.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <div className="flex-none size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">1</div>
                <div>
                  <h4 className="text-sm font-semibold text-text-main tracking-tight">Install 9Router</h4>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">Run npx command to start the server instantly</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-none size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">2</div>
                <div>
                  <h4 className="text-sm font-semibold text-text-main tracking-tight">Open Dashboard</h4>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">Configure providers and API keys via web interface</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-none size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">3</div>
                <div>
                  <h4 className="text-sm font-semibold text-text-main tracking-tight">Route Requests</h4>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">Point your CLI tools to {baseUrl}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="landing-panel overflow-hidden rounded-3xl border border-border-subtle shadow-2xl">
              {/* macOS window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-surface-2/70 border-b border-border-subtle">
                <div className="size-3 rounded-full bg-red-500"></div>
                <div className="size-3 rounded-full bg-amber-400"></div>
                <div className="size-3 rounded-full bg-green-500"></div>
                <div className="ml-3 text-[11px] text-text-muted font-mono">terminal</div>
              </div>

              <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto">
                <div
                  className="flex items-center gap-1.5 mb-3 group cursor-pointer"
                  onClick={() => handleCopy(startCommand)}
                >
                  <span className="text-green-600 dark:text-green-400">$</span>
                  <span className="text-text-main">{startCommand}</span>
                  <span className="ml-auto text-text-muted text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                    {copied === "landing" ? "✓ Copied" : "Copy"}
                  </span>
                </div>

                <div className="text-text-muted mb-4">
                  <span className="text-primary">&gt;</span> Starting 9Router...<br/>
                  <span className="text-primary">&gt;</span> Server running on <span className="text-primary">{baseUrl}</span><br/>
                  <span className="text-primary">&gt;</span> Dashboard: <span className="text-primary">{baseUrl}/dashboard</span><br/>
                  <span className="text-green-600 dark:text-green-400">&gt;</span> Ready to route!
                </div>

                <div className="text-[10px] text-text-muted mb-1.5 border-t border-border-subtle pt-3">
                  Configure providers in dashboard or use environment variables
                </div>

                <div className="text-text-muted text-[10px]">
                  <span className="text-primary">Data Location:</span><br/>
                  <span className="text-text-muted">  macOS/Linux:</span> ~/.9router/db/data.sqlite<br/>
                  <span className="text-text-muted">  Windows:</span> %APPDATA%/9router/db/data.sqlite
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
