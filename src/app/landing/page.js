"use client";
import { useRouter } from "next/navigation";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import FlowAnimation from "./components/FlowAnimation";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import GetStarted from "./components/GetStarted";
import Footer from "./components/Footer";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="liquid-landing relative text-white font-sans overflow-x-hidden antialiased selection:bg-[#007aff]/20 selection:text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#161616]">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}></div>

        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#007aff]/8 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/2 w-[550px] h-[550px] bg-[#0a84ff]/5 rounded-full blur-[120px]"></div>

        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(22, 22, 22, 0.4) 100%)'
        }}></div>
      </div>

      <div className="relative z-10">
        <Navigation />

        <main>
          <div className="relative">
            <HeroSection />
            <div className="flex justify-center pb-16">
              <FlowAnimation />
            </div>
          </div>

          <GetStarted />
          <HowItWorks />
          <Features />

          {/* CTA Section */}
          <section className="py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#007aff]/5 to-transparent pointer-events-none"></div>
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white tracking-tight">Ready to Simplify Your AI Infrastructure?</h2>
              <p className="text-base text-[#8e8e93] mb-8 max-w-xl mx-auto leading-relaxed">
                Join developers who are streamlining their AI integrations with 9Router. Open source and free to start.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full sm:w-auto h-11 px-8 rounded-xl bg-[#007aff] hover:bg-[#0a84ff] active:scale-[0.98] text-white text-sm font-medium transition-all shadow-lg shadow-[#007aff]/20"
                >
                  Start Free
                </button>
                <button
                  onClick={() => window.open("https://github.com/decolua/9router#readme", "_blank")}
                  className="w-full sm:w-auto h-11 px-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 active:scale-[0.98] text-white text-sm font-medium transition-all"
                >
                  Read Documentation
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
