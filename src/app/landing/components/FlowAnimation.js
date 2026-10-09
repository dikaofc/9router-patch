"use client";
import { useEffect, useState } from "react";
import ProviderIcon from "@/shared/components/ProviderIcon";

const CLI_TOOLS = [
  { id: "claude", name: "Claude Code", image: "/providers/claude.png" },
  { id: "codex", name: "OpenAI Codex", image: "/providers/codex.png" },
  { id: "cline", name: "Cline", image: "/providers/cline.png" },
  { id: "cursor", name: "Cursor", image: "/providers/cursor.png" },
];

const PROVIDERS = [
  { id: "openai", name: "OpenAI", color: "bg-emerald-500/80", textColor: "text-white" },
  { id: "anthropic", name: "Anthropic", color: "bg-orange-400/80", textColor: "text-white" },
  { id: "gemini", name: "Gemini", color: "bg-blue-500/80", textColor: "text-white" },
  { id: "github", name: "GitHub Copilot", color: "bg-gray-600/80", textColor: "text-white" },
];

export default function FlowAnimation() {
  const [activeFlow, setActiveFlow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % PROVIDERS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 w-full max-w-3xl relative h-[320px] hidden md:flex items-center justify-center">
      {/* 9Router Hub - Center */}
      <div className="relative z-20 w-24 h-24 rounded-full bg-[#1e1e1e] border border-brand-500/20 flex flex-col items-center justify-center gap-0.5 group cursor-pointer hover:scale-105 transition-transform duration-300">
        <span className="material-symbols-outlined text-2xl text-brand-400">
          hub
        </span>
        <span className="text-[10px] font-medium text-white tracking-wider uppercase">
          9Router
        </span>
      </div>

      {/* CLI Tools - Left side */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-5">
        {CLI_TOOLS.map((tool) => (
          <div
            key={tool.id}
            className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity group"
          >
            <div className="w-12 h-12 rounded-[10px] bg-[#1e1e1e] border border-white/5 flex items-center justify-center overflow-hidden p-1.5 hover:border-brand-500/20 transition-all hover:scale-105">
              <ProviderIcon
                src={tool.image}
                alt={tool.name}
                size={36}
                className="object-contain rounded-lg max-w-[36px] max-h-[36px]"
                fallbackText={tool.name.slice(0, 2).toUpperCase()}
              />
            </div>
          </div>
        ))}
      </div>

      {/* SVG Lines from CLI to 9Router */}
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 40 40 C 200 60, 200 160, 320 160" fill="none" strokeDasharray="4,4" strokeWidth="1.5" className="stroke-gray-700"></path>
        <path d="M 40 120 C 200 120, 200 160, 320 160" fill="none" strokeDasharray="4,4" strokeWidth="1.5" className="stroke-gray-700"></path>
        <path d="M 40 200 C 200 200, 200 160, 320 160" fill="none" strokeDasharray="4,4" strokeWidth="1.5" className="stroke-gray-700"></path>
        <path d="M 40 280 C 200 260, 200 160, 320 160" fill="none" strokeDasharray="4,4" strokeWidth="1.5" className="stroke-gray-700"></path>
      </svg>

      {/* SVG Lines from 9Router to Providers */}
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 400 160 C 500 160, 500 40, 680 40" fill="none" stroke={activeFlow === 0 ? "#c08d78" : "rgb(75, 85, 99)"} strokeWidth={activeFlow === 0 ? "2" : "1.5"} className={activeFlow === 0 ? "animate-pulse" : ""}></path>
        <path d="M 400 160 C 500 160, 500 120, 680 120" fill="none" stroke={activeFlow === 1 ? "#c08d78" : "rgb(75, 85, 99)"} strokeWidth={activeFlow === 1 ? "2" : "1.5"} className={activeFlow === 1 ? "animate-pulse" : ""}></path>
        <path d="M 400 160 C 500 160, 500 200, 680 200" fill="none" stroke={activeFlow === 2 ? "#c08d78" : "rgb(75, 85, 99)"} strokeWidth={activeFlow === 2 ? "2" : "1.5"} className={activeFlow === 2 ? "animate-pulse" : ""}></path>
        <path d="M 400 160 C 500 160, 500 280, 680 280" fill="none" stroke={activeFlow === 3 ? "#c08d78" : "rgb(75, 85, 99)"} strokeWidth={activeFlow === 3 ? "2" : "1.5"} className={activeFlow === 3 ? "animate-pulse" : ""}></path>
      </svg>

      {/* AI Providers - Right side */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-4">
        {PROVIDERS.map((provider, idx) => (
          <div
            key={provider.id}
            className={`px-3 py-1.5 rounded-md ${provider.color} ${provider.textColor} flex items-center justify-center font-medium text-[11px] hover:scale-105 transition-all cursor-help min-w-[120px] ${
              activeFlow === idx ? "ring-2 ring-brand-500/30 scale-105" : ""
            }`}
            title={provider.name}
          >
            {provider.name}
          </div>
        ))}
      </div>

      {/* Mobile fallback */}
      <div className="md:hidden mt-6 w-full p-3 rounded-md bg-[#1e1e1e] border border-white/5">
        <p className="text-xs text-center text-gray-500">
          Interactive diagram visible on desktop
        </p>
      </div>
    </div>
  );
}
