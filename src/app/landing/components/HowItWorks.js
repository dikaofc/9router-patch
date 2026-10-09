"use client";

export default function HowItWorks() {
  return (
    <section className="py-20 border-y border-white/5 bg-[#1c1c1e]/50" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-white tracking-tight">How 9Router Works</h2>
          <p className="text-[#8e8e93] max-w-lg text-sm leading-relaxed">
            Data flows seamlessly from your application through our intelligent routing layer to the best provider for the job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-[#2c2c2e] via-[#007aff]/40 to-[#2c2c2e] -z-10"></div>

          <div className="flex flex-col gap-4 relative group">
            <div className="w-16 h-16 rounded-2xl bg-[#1c1c1e] border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-[#007aff]/5 transition-all duration-300 z-10 mx-auto md:mx-0">
              <span className="material-symbols-outlined text-2xl text-[#8e8e93]">terminal</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1.5 text-white tracking-tight">1. CLI &amp; SDKs</h3>
              <p className="text-xs text-[#8e8e93] leading-relaxed">
                Your requests start from your favorite tools or our unified SDK. Just change the base URL.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 relative group md:items-center md:text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#1c1c1e] border border-[#007aff]/30 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-[#007aff]/10 z-10 mx-auto">
              <span className="material-symbols-outlined text-2xl text-[#5a9de0]">hub</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1.5 text-[#5a9de0] tracking-tight">2. 9Router Hub</h3>
              <p className="text-xs text-[#8e8e93] leading-relaxed">
                Our engine analyzes the prompt, checks provider health, and routes for lowest latency or cost.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 relative group md:items-end md:text-right">
            <div className="w-16 h-16 rounded-2xl bg-[#1c1c1e] border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-[#007aff]/5 transition-all duration-300 z-10 mx-auto md:mx-0">
              <div className="grid grid-cols-2 gap-1.5">
                <div className="w-4 h-4 rounded bg-white/10"></div>
                <div className="w-4 h-4 rounded bg-white/10"></div>
                <div className="w-4 h-4 rounded bg-white/10"></div>
                <div className="w-4 h-4 rounded bg-white/10"></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1.5 text-white tracking-tight">3. AI Providers</h3>
              <p className="text-xs text-[#8e8e93] leading-relaxed">
                The request is fulfilled by OpenAI, Anthropic, Gemini, or others instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
