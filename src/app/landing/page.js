"use client";
import { useRouter } from "next/navigation";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import FlowAnimation from "./components/FlowAnimation";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import GetStarted from "./components/GetStarted";
import Footer from "./components/Footer";
import { GITHUB_CONFIG } from "@/shared/constants/config";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="liquid-landing relative overflow-x-hidden font-sans antialiased selection:bg-primary/20">
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(to right, var(--color-text-main) 1px, transparent 1px), linear-gradient(to bottom, var(--color-text-main) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}></div>

        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 size-[min(600px,90vw)] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/4 size-[min(500px,80vw)] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/2 size-[min(550px,85vw)] bg-primary/5 rounded-full blur-[120px]"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,color-mix(in_srgb,var(--color-bg)_55%,transparent)_100%)]"></div>
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
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-text-main tracking-tight">Ready to Simplify Your AI Infrastructure?</h2>
              <p className="text-base text-text-muted mb-8 max-w-xl mx-auto leading-relaxed">
                Join developers who are streamlining their AI integrations with 9Router. Open source and free to start.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full sm:w-auto h-11 px-8 rounded-xl bg-primary hover:bg-primary-hover active:scale-[0.98] text-white text-sm font-medium transition-all shadow-lg shadow-primary/20"
                >
                  Start Free
                </button>
                <button
                  onClick={() => window.open(GITHUB_CONFIG.readmeUrl, "_blank", "noopener,noreferrer")}
                  className="w-full sm:w-auto h-11 px-8 rounded-xl border border-border-subtle bg-surface/60 backdrop-blur-xl hover:bg-surface active:scale-[0.98] text-text-main text-sm font-medium transition-all"
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
