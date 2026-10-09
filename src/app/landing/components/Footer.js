"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#161616] pt-12 pb-6 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-6 rounded-lg bg-[#007aff] flex items-center justify-center text-white shadow-md shadow-[#007aff]/20">
                <span className="material-symbols-outlined text-[12px]">hub</span>
              </div>
              <h3 className="text-white text-sm font-semibold tracking-tight">9Router</h3>
            </div>
            <p className="text-[#8e8e93] text-xs max-w-xs mb-4 leading-relaxed">
              The unified endpoint for AI generation. Connect, route, and manage your AI providers with ease.
            </p>
            <div className="flex gap-3">
              <a className="text-[#8e8e93] hover:text-white transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-[18px]">code</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold text-white tracking-tight">Product</h4>
            <a className="text-[#8e8e93] hover:text-[#5a9de0] text-xs transition-colors" href="#features">Features</a>
            <a className="text-[#8e8e93] hover:text-[#5a9de0] text-xs transition-colors" href="/dashboard">Dashboard</a>
            <a className="text-[#8e8e93] hover:text-[#5a9de0] text-xs transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">Changelog</a>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold text-white tracking-tight">Resources</h4>
            <a className="text-[#8e8e93] hover:text-[#5a9de0] text-xs transition-colors" href="https://github.com/decolua/9router#readme" target="_blank" rel="noopener noreferrer">Documentation</a>
            <a className="text-[#8e8e93] hover:text-[#5a9de0] text-xs transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-[#8e8e93] hover:text-[#5a9de0] text-xs transition-colors" href="https://www.npmjs.com/package/9router" target="_blank" rel="noopener noreferrer">NPM</a>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold text-white tracking-tight">Legal</h4>
            <a className="text-[#8e8e93] hover:text-[#5a9de0] text-xs transition-colors" href="https://github.com/decolua/9router/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#8e8e93] text-xs">© 2025 9Router. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="text-[#8e8e93] hover:text-white text-xs transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-[#8e8e93] hover:text-white text-xs transition-colors" href="https://www.npmjs.com/package/9router" target="_blank" rel="noopener noreferrer">NPM</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
