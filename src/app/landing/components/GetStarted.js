"use client";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";

export default function GetStarted() {
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = (text) => {
    copy(text, "landing");
  };

  return (
    <section className="py-20 px-6 bg-[#1c1c1e]/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white tracking-tight">Get Started in 30 Seconds</h2>
            <p className="text-[#8e8e93] text-sm mb-6 leading-relaxed">
              Install 9Router, configure your providers via web dashboard, and start routing AI requests.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <div className="flex-none w-6 h-6 rounded-full bg-[#007aff]/15 text-[#5a9de0] flex items-center justify-center text-xs font-semibold">1</div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">Install 9Router</h4>
                  <p className="text-xs text-[#8e8e93] mt-0.5 leading-relaxed">Run npx command to start the server instantly</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-none w-6 h-6 rounded-full bg-[#007aff]/15 text-[#5a9de0] flex items-center justify-center text-xs font-semibold">2</div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">Open Dashboard</h4>
                  <p className="text-xs text-[#8e8e93] mt-0.5 leading-relaxed">Configure providers and API keys via web interface</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-none w-6 h-6 rounded-full bg-[#007aff]/15 text-[#5a9de0] flex items-center justify-center text-xs font-semibold">3</div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">Route Requests</h4>
                  <p className="text-xs text-[#8e8e93] mt-0.5 leading-relaxed">Point your CLI tools to http://localhost:20128</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="rounded-2xl overflow-hidden bg-[#1c1c1e] border border-white/10 shadow-2xl shadow-black/40">
              {/* macOS window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-[#2c2c2e] border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                <div className="ml-3 text-[11px] text-[#8e8e93] font-mono">terminal</div>
              </div>

              <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto">
                <div
                  className="flex items-center gap-1.5 mb-3 group cursor-pointer"
                  onClick={() => handleCopy("npx 9router")}
                >
                  <span className="text-[#28c840]">$</span>
                  <span className="text-white">npx 9router</span>
                  <span className="ml-auto text-[#8e8e93] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                    {copied === "landing" ? "✓ Copied" : "Copy"}
                  </span>
                </div>

                <div className="text-[#8e8e93] mb-4">
                  <span className="text-[#5a9de0]">&gt;</span> Starting 9Router...<br/>
                  <span className="text-[#5a9de0]">&gt;</span> Server running on <span className="text-[#409cff]">http://localhost:20128</span><br/>
                  <span className="text-[#5a9de0]">&gt;</span> Dashboard: <span className="text-[#409cff]">http://localhost:20128/dashboard</span><br/>
                  <span className="text-[#28c840]">&gt;</span> Ready to route!
                </div>

                <div className="text-[10px] text-[#8e8e93] mb-1.5 border-t border-white/5 pt-3">
                  Configure providers in dashboard or use environment variables
                </div>

                <div className="text-[#8e8e93] text-[10px]">
                  <span className="text-purple-400">Data Location:</span><br/>
                  <span className="text-[#8e8e93]">  macOS/Linux:</span> ~/.9router/db/data.sqlite<br/>
                  <span className="text-[#8e8e93]">  Windows:</span> %APPDATA%/9router/db/data.sqlite
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
