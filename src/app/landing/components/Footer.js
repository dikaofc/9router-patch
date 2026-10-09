"use client";

import { GITHUB_CONFIG } from "@/shared/constants/config";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface/35 pt-12 pb-6 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-7 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
                <span className="material-symbols-outlined text-[12px]">hub</span>
              </div>
              <h3 className="text-text-main text-sm font-semibold tracking-tight">9Router</h3>
            </div>
            <p className="text-text-muted text-xs max-w-xs mb-4 leading-relaxed">
              The unified endpoint for AI generation. Connect, route, and manage your AI providers with ease.
            </p>
            <div className="flex gap-3">
              <a className="text-text-muted hover:text-text-main transition-colors" href={GITHUB_CONFIG.repositoryUrl} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-[18px]">code</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold text-text-main tracking-tight">Product</h4>
            <a className="text-text-muted hover:text-primary text-xs transition-colors" href="#features">Features</a>
            <a className="text-text-muted hover:text-primary text-xs transition-colors" href="/dashboard">Dashboard</a>
            <a className="text-text-muted hover:text-primary text-xs transition-colors" href={GITHUB_CONFIG.changelogUrl} target="_blank" rel="noopener noreferrer">Changelog</a>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold text-text-main tracking-tight">Resources</h4>
            <a className="text-text-muted hover:text-primary text-xs transition-colors" href={GITHUB_CONFIG.readmeUrl} target="_blank" rel="noopener noreferrer">Documentation</a>
            <a className="text-text-muted hover:text-primary text-xs transition-colors" href={GITHUB_CONFIG.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-text-muted hover:text-primary text-xs transition-colors" href={GITHUB_CONFIG.npmPackageUrl} target="_blank" rel="noopener noreferrer">NPM</a>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold text-text-main tracking-tight">Legal</h4>
            <a className="text-text-muted hover:text-primary text-xs transition-colors" href={GITHUB_CONFIG.licenseUrl} target="_blank" rel="noopener noreferrer">MIT License</a>
          </div>
        </div>

        <div className="border-t border-border-subtle pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-text-muted text-xs">© {new Date().getFullYear()} 9Router. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="text-text-muted hover:text-text-main text-xs transition-colors" href={GITHUB_CONFIG.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-text-muted hover:text-text-main text-xs transition-colors" href={GITHUB_CONFIG.npmPackageUrl} target="_blank" rel="noopener noreferrer">NPM</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
