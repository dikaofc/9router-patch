"use client";

const FEATURES = [
  { icon: "link", title: "Unified Endpoint", desc: "Access all providers via a single standard API URL." },
  { icon: "bolt", title: "Easy Setup", desc: "Get up and running in minutes with npx command." },
  { icon: "shield_with_heart", title: "Model Fallback", desc: "Automatically switch providers on failure or high latency." },
  { icon: "monitoring", title: "Usage Tracking", desc: "Detailed analytics and cost monitoring across all models." },
  { icon: "key", title: "OAuth & API Keys", desc: "Securely manage credentials in one vault." },
  { icon: "cloud_sync", title: "Cloud Sync", desc: "Sync your configurations across devices instantly." },
  { icon: "terminal", title: "CLI Support", desc: "Works with Claude Code, Codex, Cline, Cursor, and more." },
  { icon: "dashboard", title: "Dashboard", desc: "Visual dashboard for real-time traffic analysis." },
];

export default function Features() {
  return (
    <section className="py-20 px-6" id="features">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-white">Powerful Features</h2>
          <p className="text-gray-500 max-w-lg text-sm">
            Everything you need to manage your AI infrastructure in one place, built for scale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="p-4 rounded-[12px] bg-[#1e1e1e] border border-white/5 hover:border-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-md bg-brand-500/10 flex items-center justify-center mb-3 text-brand-400 group-hover:scale-105 transition-transform duration-200">
                <span className="material-symbols-outlined text-[18px]">{feature.icon}</span>
              </div>
              <h3 className="text-sm font-medium mb-1.5 text-white">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
