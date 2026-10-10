"use client";

import { useRouter } from "next/navigation";
import { APP_CONFIG, GITHUB_CONFIG } from "@/shared/constants/config";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative pt-28 pb-16 px-6 min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 rounded-[var(--radius-brand)] border border-border-subtle bg-surface px-3 py-1 text-[11px] font-medium text-primary">
          v{APP_CONFIG.version}
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-text-main">
          One Endpoint for{" "}
          <span className="text-primary">All AI Providers</span>
        </h1>

        <p className="text-base md:text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
          AI endpoint proxy with web dashboard. Works seamlessly with Claude Code, OpenAI Codex, Cline, RooCode, and other CLI tools.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="h-11 px-7 rounded-[var(--radius-brand-lg)] bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            Get Started
          </button>
          <a
            href={GITHUB_CONFIG.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-7 rounded-[var(--radius-brand-lg)] border border-border-subtle bg-surface hover:bg-surface-2 text-text-main text-sm font-medium transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
