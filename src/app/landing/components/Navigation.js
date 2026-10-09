"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#161616]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
          onClick={() => router.push("/")}
          aria-label="Navigate to home"
        >
          <div className="size-6 rounded-md bg-brand-500 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[14px]">hub</span>
          </div>
          <h2 className="text-white text-sm font-semibold tracking-tight">9Router</h2>
        </button>

        <div className="hidden md:flex items-center gap-6">
          <a className="text-gray-400 hover:text-white text-xs font-medium transition-colors" href="#features">Features</a>
          <a className="text-gray-400 hover:text-white text-xs font-medium transition-colors" href="#how-it-works">How it Works</a>
          <a className="text-gray-400 hover:text-white text-xs font-medium transition-colors" href="https://github.com/decolua/9router#readme" target="_blank" rel="noopener noreferrer">Docs</a>
          <a className="text-gray-400 hover:text-white text-xs font-medium transition-colors flex items-center gap-0.5" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">
            GitHub <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="hidden sm:flex h-8 items-center justify-center rounded-md px-3.5 bg-brand-500 hover:bg-brand-600 transition-colors text-white text-xs font-medium"
          >
            Get Started
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#161616]/95 backdrop-blur-xl">
          <div className="flex flex-col gap-3 p-4">
            <a className="text-gray-400 hover:text-white text-xs font-medium transition-colors" href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a className="text-gray-400 hover:text-white text-xs font-medium transition-colors" href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
            <a className="text-gray-400 hover:text-white text-xs font-medium transition-colors" href="https://github.com/decolua/9router#readme" target="_blank" rel="noopener noreferrer">Docs</a>
            <a className="text-gray-400 hover:text-white text-xs font-medium transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">GitHub</a>
            <button
              onClick={() => router.push("/dashboard")}
              className="h-8 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-xs font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
