"use client";

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 px-6 min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-brand-400">
          <span className="flex h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse"></span>
          v1.0 is now live
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold leading-[1.15] tracking-tight text-white">
          One Endpoint for <br/>
          <span className="text-brand-400">All AI Providers</span>
        </h1>

        <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto">
          AI endpoint proxy with web dashboard. Works seamlessly with Claude Code, OpenAI Codex, Cline, RooCode, and other CLI tools.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <button className="h-10 px-6 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            Get Started
          </button>
          <a
            href="https://github.com/decolua/9router"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-6 rounded-md border border-white/10 bg-white/5 hover:bg-white/8 text-white text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
