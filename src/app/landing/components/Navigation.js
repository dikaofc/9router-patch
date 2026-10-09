"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GITHUB_CONFIG } from "@/shared/constants/config";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border-subtle bg-surface/70 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          type="button"
          className="landing-nav-brand flex items-center gap-2 cursor-pointer rounded-xl bg-transparent border-none p-0"
          onClick={() => router.push("/")}
          aria-label="Navigate to home"
        >
          <div className="size-7 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-[14px]">hub</span>
          </div>
          <h2 className="text-text-main text-sm font-semibold tracking-tight">9Router</h2>
        </button>

        <div className="hidden md:flex items-center gap-6">
          <a className="text-text-muted hover:text-text-main text-xs font-medium transition-colors" href="#features">Features</a>
          <a className="text-text-muted hover:text-text-main text-xs font-medium transition-colors" href="#how-it-works">How it Works</a>
          <a className="text-text-muted hover:text-text-main text-xs font-medium transition-colors" href={GITHUB_CONFIG.readmeUrl} target="_blank" rel="noopener noreferrer">Docs</a>
          <a className="text-text-muted hover:text-text-main text-xs font-medium transition-colors flex items-center gap-0.5" href={GITHUB_CONFIG.repositoryUrl} target="_blank" rel="noopener noreferrer">
            GitHub <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="hidden sm:flex h-9 items-center justify-center rounded-xl px-4 bg-primary hover:bg-primary-hover active:scale-[0.97] transition-all text-white text-xs font-medium shadow-md shadow-primary/20"
          >
            Get Started
          </button>
          <button
            className="flex size-10 items-center justify-center rounded-full text-text-main hover:bg-surface-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-subtle bg-surface/85 backdrop-blur-2xl">
          <div className="flex flex-col gap-1 p-4">
            <a className="rounded-xl px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-text-main text-sm font-medium transition-colors" href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a className="rounded-xl px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-text-main text-sm font-medium transition-colors" href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
            <a className="rounded-xl px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-text-main text-sm font-medium transition-colors" href={GITHUB_CONFIG.readmeUrl} target="_blank" rel="noopener noreferrer">Docs</a>
            <a className="rounded-xl px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-text-main text-sm font-medium transition-colors" href={GITHUB_CONFIG.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-2 h-10 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
