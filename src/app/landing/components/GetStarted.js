"use client";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";

export default function GetStarted() {
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = (text) => {
    copy(text, "landing");
  };

  return (
    <section className="py-20 px-6 bg-[#141414]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">Get Started in 30 Seconds</h2>
            <p className="text-gray-500 text-sm mb-6">
              Install 9Router, configure your providers via web dashboard, and start routing AI requests.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="flex-none w-6 h-6 rounded-full bg-brand-500/15 text-brand-400 flex items-center justify-center text-xs font-medium">1</div>
                <div>
                  <h4 className="text-sm font-medium text-white">Install 9Router</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Run npx command to start the server instantly</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-none w-6 h-6 rounded-full bg-brand-500/15 text-brand-400 flex items-center justify-center text-xs font-medium">2</div>
                <div>
                  <h4 className="text-sm font-medium text-white">Open Dashboard</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Configure providers and API keys via web interface</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-none w-6 h-6 rounded-full bg-brand-500/15 text-brand-400 flex items-center justify-center text-xs font-medium">3</div>
                <div>
                  <h4 className="text-sm font-medium text-white">Route Requests</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Point your CLI tools to http://localhost:20128</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="rounded-[12px] overflow-hidden bg-[#1a1a1a] border border-white/5">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-[#222] border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e05548]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#e5a823]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#3daf7e]"></div>
                <div className="ml-2 text-[10px] text-gray-600 font-mono">terminal</div>
              </div>

              <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                <div
                  className="flex items-center gap-1.5 mb-3 group cursor-pointer"
                  onClick={() => handleCopy("npx 9router")}
                >
                  <span className="text-green-400">$</span>
                  <span className="text-white">npx 9router</span>
                  <span className="ml-auto text-gray-600 text-[10px] opacity-0 group-hover:opacity-100">
                    {copied === "landing" ? "✓ Copied" : "Copy"}
                  </span>
                </div>

                <div className="text-gray-500 mb-4">
                  <span className="text-brand-400">&gt;</span> Starting 9Router...<br/>
                  <span className="text-brand-400">&gt;</span> Server running on <span className="text-blue-400">http://localhost:20128</span><br/>
                  <span className="text-brand-400">&gt;</span> Dashboard: <span className="text-blue-400">http://localhost:20128/dashboard</span><br/>
                  <span className="text-green-400">&gt;</span> Ready to route!
                </div>

                <div className="text-[10px] text-gray-600 mb-1.5 border-t border-white/5 pt-3">
                  Configure providers in dashboard or use environment variables
                </div>

                <div className="text-gray-500 text-[10px]">
                  <span className="text-purple-400">Data Location:</span><br/>
                  <span className="text-gray-600">  macOS/Linux:</span> ~/.9router/db/data.sqlite<br/>
                  <span className="text-gray-600">  Windows:</span> %APPDATA%/9router/db/data.sqlite
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
