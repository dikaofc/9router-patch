"use client";

import { useRouter } from "next/navigation";
import { APP_CONFIG } from "@/shared/constants/config";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative pt-28 pb-16 px-6 min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#007aff]/8 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-1 text-[11px] font-medium text-[#5a9de0]">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#007aff] animate-pulse"></span>
          v{APP_CONFIG.version}
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-white">
          One Endpoint for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5a9de0] via-[#007aff] to-[#409cff]">
            All AI Providers
          </span>
        </h1>

        <p className="text-base md:text-lg text-[#8e8e93] max-w-xl mx-auto leading-relaxed">
          AI endpoint proxy with web dashboard. Works seamlessly with Claude Code, OpenAI Codex, Cline, RooCode, and other CLI tools.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <button
            onClick={() => router.push("/dashboard")}
            className="h-11 px-7 rounded-xl bg-[#007aff] hover:bg-[#0a84ff] active:scale-[0.97] text-white text-sm font-medium transition-all flex items-center gap-2 shadow-lg shadow-[#007aff]/25"
          >
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            Get Started
          </button>
          <a
            href="https://github.com/decolua/9router"
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-7 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 active:scale-[0.97] text-white text-sm font-medium transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
