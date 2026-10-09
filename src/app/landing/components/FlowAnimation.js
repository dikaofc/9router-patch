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
  { id: "openai", name: "OpenAI" },
  { id: "anthropic", name: "Anthropic" },
  { id: "gemini", name: "Gemini" },
  { id: "github", name: "GitHub Copilot" },
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
    <div className="relative mt-10 flex min-h-44 w-full max-w-3xl flex-col items-center justify-center gap-5 md:h-[320px] md:min-h-0 md:flex-row">
      {/* 9Router Hub - Center */}
      <div className="landing-panel relative z-20 flex size-20 flex-col items-center justify-center gap-0.5 rounded-full border border-primary/30 backdrop-blur-xl shadow-xl shadow-primary/10 transition-transform duration-300 hover:scale-105 md:size-24">
        <span className="material-symbols-outlined text-2xl text-primary">
          hub
        </span>
        <span className="text-[10px] font-semibold text-text-main tracking-wider uppercase">
          9Router
        </span>
      </div>

      {/* CLI Tools - Left side */}
      <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 flex-col gap-5 md:flex">
        {CLI_TOOLS.map((tool) => (
          <div
            key={tool.id}
            className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity group"
          >
            <div             className="landing-panel flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-border-subtle p-1.5 backdrop-blur-xl transition-all hover:border-primary/30 hover:scale-105">
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
        className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full md:block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 40 40 C 200 60, 200 160, 320 160" fill="none" stroke="var(--color-border-subtle)" strokeDasharray="4,4" strokeWidth="1.5"></path>
        <path d="M 40 120 C 200 120, 200 160, 320 160" fill="none" stroke="var(--color-border-subtle)" strokeDasharray="4,4" strokeWidth="1.5"></path>
        <path d="M 40 200 C 200 200, 200 160, 320 160" fill="none" stroke="var(--color-border-subtle)" strokeDasharray="4,4" strokeWidth="1.5"></path>
        <path d="M 40 280 C 200 260, 200 160, 320 160" fill="none" stroke="var(--color-border-subtle)" strokeDasharray="4,4" strokeWidth="1.5"></path>
      </svg>

      {/* SVG Lines from 9Router to Providers */}
      <svg
        className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full md:block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 400 160 C 500 160, 500 40, 680 40" fill="none" stroke={activeFlow === 0 ? "var(--color-primary)" : "var(--color-border-subtle)"} strokeWidth={activeFlow === 0 ? "2" : "1.5"} className={activeFlow === 0 ? "animate-pulse" : ""}></path>
        <path d="M 400 160 C 500 160, 500 120, 680 120" fill="none" stroke={activeFlow === 1 ? "var(--color-primary)" : "var(--color-border-subtle)"} strokeWidth={activeFlow === 1 ? "2" : "1.5"} className={activeFlow === 1 ? "animate-pulse" : ""}></path>
        <path d="M 400 160 C 500 160, 500 200, 680 200" fill="none" stroke={activeFlow === 2 ? "var(--color-primary)" : "var(--color-border-subtle)"} strokeWidth={activeFlow === 2 ? "2" : "1.5"} className={activeFlow === 2 ? "animate-pulse" : ""}></path>
        <path d="M 400 160 C 500 160, 500 280, 680 280" fill="none" stroke={activeFlow === 3 ? "var(--color-primary)" : "var(--color-border-subtle)"} strokeWidth={activeFlow === 3 ? "2" : "1.5"} className={activeFlow === 3 ? "animate-pulse" : ""}></path>
      </svg>

      {/* AI Providers - Right side */}
      <div className="absolute right-0 top-0 bottom-0 hidden flex-col justify-between py-4 md:flex">
        {PROVIDERS.map((provider, idx) => (
          <div
            key={provider.id}
            className={`rounded-xl border border-border-subtle bg-surface/70 px-3 py-2 text-[11px] font-medium text-text-main shadow-sm backdrop-blur-xl transition-all hover:scale-105 cursor-help min-w-[120px] ${
              activeFlow === idx ? "ring-2 ring-primary/40 scale-105 shadow-lg shadow-primary/10" : ""
            }`}
            title={provider.name}
          >
            {provider.name}
          </div>
        ))}
      </div>

      {/* Mobile fallback */}
      <div className="landing-panel md:hidden w-full rounded-2xl border border-border-subtle p-4 backdrop-blur-xl">
        <p className="text-xs text-center text-text-muted">
          Interactive diagram visible on desktop
        </p>
      </div>
    </div>
  );
}
