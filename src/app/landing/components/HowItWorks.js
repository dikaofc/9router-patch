"use client";

export default function HowItWorks() {
  return (
    <section className="py-20 border-y border-border-subtle bg-surface/30" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-text-main tracking-tight">How 9Router Works</h2>
          <p className="text-text-muted max-w-lg text-sm leading-relaxed">
            Data flows seamlessly from your application through our intelligent routing layer to the best provider for the job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-border-subtle via-primary/40 to-border-subtle -z-10"></div>

          <div className="flex flex-col gap-4 relative group">
            <div className="size-16 rounded-2xl landing-panel border border-border-subtle backdrop-blur-xl flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300 z-10 mx-auto md:mx-0">
              <span className="material-symbols-outlined text-2xl text-text-muted">terminal</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1.5 text-text-main tracking-tight">1. CLI &amp; SDKs</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Your requests start from your favorite tools or our unified SDK. Just change the base URL.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 relative group md:items-center md:text-center">
            <div className="size-16 rounded-2xl landing-panel border border-primary/30 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-primary/10 z-10 mx-auto">
              <span className="material-symbols-outlined text-2xl text-primary">hub</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1.5 text-primary tracking-tight">2. 9Router Hub</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Our engine analyzes the prompt, checks provider health, and routes for lowest latency or cost.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 relative group md:items-end md:text-right">
            <div className="size-16 rounded-2xl landing-panel border border-border-subtle backdrop-blur-xl flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300 z-10 mx-auto md:mx-0">
              <div className="grid grid-cols-2 gap-1.5">
                <div className="size-4 rounded bg-primary/10"></div>
                <div className="size-4 rounded bg-primary/10"></div>
                <div className="size-4 rounded bg-primary/10"></div>
                <div className="size-4 rounded bg-primary/10"></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1.5 text-text-main tracking-tight">3. AI Providers</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                The request is fulfilled by OpenAI, Anthropic, Gemini, or others instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
