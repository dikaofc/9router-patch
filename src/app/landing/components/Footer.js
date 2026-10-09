"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#141414] pt-12 pb-6 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-5 rounded-md bg-brand-500 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[12px]">hub</span>
              </div>
              <h3 className="text-white text-sm font-semibold">9Router</h3>
            </div>
            <p className="text-gray-600 text-xs max-w-xs mb-4">
              The unified endpoint for AI generation. Connect, route, and manage your AI providers with ease.
            </p>
            <div className="flex gap-3">
              <a className="text-gray-500 hover:text-white transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-[18px]">code</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-medium text-white">Product</h4>
            <a className="text-gray-500 hover:text-brand-400 text-xs transition-colors" href="#features">Features</a>
            <a className="text-gray-500 hover:text-brand-400 text-xs transition-colors" href="/dashboard">Dashboard</a>
            <a className="text-gray-500 hover:text-brand-400 text-xs transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">Changelog</a>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-medium text-white">Resources</h4>
            <a className="text-gray-500 hover:text-brand-400 text-xs transition-colors" href="https://github.com/decolua/9router#readme" target="_blank" rel="noopener noreferrer">Documentation</a>
            <a className="text-gray-500 hover:text-brand-400 text-xs transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-gray-500 hover:text-brand-400 text-xs transition-colors" href="https://www.npmjs.com/package/9router" target="_blank" rel="noopener noreferrer">NPM</a>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-medium text-white">Legal</h4>
            <a className="text-gray-500 hover:text-brand-400 text-xs transition-colors" href="https://github.com/decolua/9router/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-700 text-xs">© 2025 9Router. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="text-gray-700 hover:text-white text-xs transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-gray-700 hover:text-white text-xs transition-colors" href="https://www.npmjs.com/package/9router" target="_blank" rel="noopener noreferrer">NPM</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
