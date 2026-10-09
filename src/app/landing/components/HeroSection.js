"use client";

import { useRouter } from "next/navigation";
import { APP_CONFIG, GITHUB_CONFIG } from "@/shared/constants/config";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative pt-28 pb-16 px-6 min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(800px,100vw)] h-[min(400px,60vw)] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface/60 backdrop-blur-xl px-3 py-1 text-[11px] font-medium text-primary">
          <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
          v{APP_CONFIG.version}
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-text-main">
          One Endpoint for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/70 via-primary to-primary-hover">
            All AI Providers
          </span>
        </h1>

        <p className="text-base md:text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
          AI endpoint proxy with web dashboard. Works seamlessly with Claude Code, OpenAI Codex, Cline, RooCode, and other CLI tools.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <button
            onClick={() => router.push("/dashboard")}
            className="h-11 px-7 rounded-xl bg-primary hover:bg-primary-hover active:scale-[0.97] text-white text-sm font-medium transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
          >
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            Get Started
          </button>
          <a
            href={GITHUB_CONFIG.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-7 rounded-xl border border-border-subtle bg-surface/60 backdrop-blur-xl hover:bg-surface active:scale-[0.97] text-text-main text-sm font-medium transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
