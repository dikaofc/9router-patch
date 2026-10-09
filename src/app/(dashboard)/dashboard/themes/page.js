"use client";

import { useState, useEffect, useCallback, memo, useMemo } from "react";
import { ThemeIcon } from "@/shared/components/ThemeIcons";

const THEMES = [
  { id: "minimalism", name: "Minimalism", desc: "Clean, thin lines, space", style: "minimal",
    l: { bg: "#faf9f7", s: "#ffffff", b: "#e8e6e2", t: "#1a1a1a", a: "#a8735d", sh: "none", sb: "#faf9f7" },
    d: { bg: "#161616", s: "#212121", b: "#2e2e2e", t: "#e8e8e8", a: "#c08d78", sh: "none", sb: "#161616" },
    r: "4px", bl: "none", f: "var(--font-system)" },
  { id: "swiss", name: "Swiss Minimal", desc: "Grid, strong typography", style: "minimal",
    l: { bg: "#ffffff", s: "#ffffff", b: "#d4d4d4", t: "#0a0a0a", a: "#a8735d", sh: "none", sb: "#ffffff" },
    d: { bg: "#0a0a0a", s: "#171717", b: "#404040", t: "#f5f5f5", a: "#c08d78", sh: "none", sb: "#0a0a0a" },
    r: "0", bl: "none", f: "var(--font-system)" },
  { id: "flat-ui", name: "Flat UI", desc: "No shadows, simple", style: "minimal",
    l: { bg: "#f3f1ee", s: "#ffffff", b: "#e0ddd8", t: "#1a1a1a", a: "#a8735d", sh: "none", sb: "#f3f1ee" },
    d: { bg: "#1a1a2e", s: "#16213e", b: "#0f3460", t: "#e8e8e8", a: "#c08d78", sh: "none", sb: "#1a1a2e" },
    r: "4px", bl: "none", f: "var(--font-system)" },
  { id: "classic", name: "Classic", desc: "Blue/gray corporate", style: "classic",
    l: { bg: "#f1f5f9", s: "#ffffff", b: "#e2e8f0", t: "#0f172a", a: "#a8735d", sh: "0 1px 3px rgba(0,0,0,0.08)", sb: "#f8fafc" },
    d: { bg: "#0f172a", s: "#1e293b", b: "#334155", t: "#f1f5f9", a: "#c08d78", sh: "0 1px 3px rgba(0,0,0,0.3)", sb: "#0f172a" },
    r: "8px", bl: "none", f: "var(--font-system)" },
  { id: "bento", name: "Bento Grid", desc: "Modular cards", style: "bento",
    l: { bg: "#f5f5f5", s: "#ffffff", b: "#e5e5e5", t: "#171717", a: "#a8735d", sh: "0 1px 3px rgba(0,0,0,0.06)", sb: "#f5f5f5" },
    d: { bg: "#0a0a0a", s: "#171717", b: "#262626", t: "#f5f5f5", a: "#c08d78", sh: "0 1px 3px rgba(0,0,0,0.3)", sb: "#0a0a0a" },
    r: "12px", bl: "none", f: "var(--font-system)" },
  { id: "dark-premium", name: "Dark Premium", desc: "Charcoal + gradients", style: "pro",
    l: { bg: "#f8f9fa", s: "#ffffff", b: "#dee2e6", t: "#212529", a: "#a8735d", sh: "0 1px 3px rgba(0,0,0,0.06)", sb: "#f8f9fa" },
    d: { bg: "#121212", s: "#1e1e1e", b: "#2d2d2d", t: "#e0e0e0", a: "#c08d78", sh: "0 2px 8px rgba(0,0,0,0.4)", sb: "#121212" },
    r: "8px", bl: "none", f: "var(--font-system)" },
  { id: "super-fast", name: "Super Fast", desc: "No shadows, pure speed", style: "fast",
    l: { bg: "#ffffff", s: "#ffffff", b: "#e5e7eb", t: "#000000", a: "#a8735d", sh: "none", sb: "#ffffff" },
    d: { bg: "#000000", s: "#111111", b: "#333333", t: "#ffffff", a: "#c08d78", sh: "none", sb: "#000000" },
    r: "0", bl: "none", f: "var(--font-system)", fast: true },
  { id: "monochrome", name: "Monochrome", desc: "One color, very clean", style: "minimal",
    l: { bg: "#ffffff", s: "#ffffff", b: "#999999", t: "#000000", a: "#000000", sh: "none", sb: "#ffffff" },
    d: { bg: "#111111", s: "#1a1a1a", b: "#555555", t: "#ffffff", a: "#ffffff", sh: "none", sb: "#111111" },
    r: "0", bl: "none", f: "var(--font-system)" },
  { id: "ios-glass", name: "iOS Glass", desc: "Blur, translucent, rounded", style: "glass",
    l: { bg: "#f2f2f7", s: "rgba(255,255,255,0.72)", b: "rgba(0,0,0,0.08)", t: "#1c1c1e", a: "#a8735d", sh: "0 2px 16px rgba(0,0,0,0.08)", sb: "rgba(255,255,255,0.8)" },
    d: { bg: "#000000", s: "rgba(28,28,30,0.72)", b: "rgba(255,255,255,0.1)", t: "#f2f2f7", a: "#c08d78", sh: "0 2px 16px rgba(0,0,0,0.4)", sb: "rgba(28,28,30,0.85)" },
    r: "16px", bl: "blur(20px) saturate(180%)", f: "var(--font-system)" },
  { id: "liquid-glass", name: "Liquid Glass", desc: "Frosted glass + liquid", style: "glass",
    l: { bg: "#e0e5ec", s: "rgba(255,255,255,0.45)", b: "rgba(0,0,0,0.12)", t: "#1a1a2e", a: "#a8735d", sh: "0 8px 32px rgba(0,0,0,0.12)", sb: "rgba(255,255,255,0.6)" },
    d: { bg: "#0f172a", s: "rgba(30,41,59,0.6)", b: "rgba(255,255,255,0.1)", t: "#e2e8f0", a: "#c08d78", sh: "0 8px 32px rgba(0,0,0,0.4)", sb: "rgba(15,23,42,0.7)" },
    r: "16px", bl: "blur(20px) saturate(180%)", f: "var(--font-system)" },
];

const FILTERS = [
  { id: "all", label: "All" }, { id: "minimal", label: "Minimal" }, { id: "classic", label: "Classic" },
  { id: "glass", label: "Glass" }, { id: "bento", label: "Bento" }, { id: "fast", label: "Fast" },
];

const getM = (t, dark) => dark ? t.d : t.l;

const ThemeCard = memo(({ theme, active, dark, onPick }) => {
  const m = getM(theme, dark);
  const g = m.bg?.includes?.("gradient");
  return (
    <button onClick={() => onPick(theme)}
      className="w-full text-left p-2.5 transition-transform duration-100 hover:-translate-y-0.5"
      style={{
        background: m.s, border: `1px solid ${m.b}`, borderRadius: theme.r,
        boxShadow: theme.sh, backdropFilter: theme.bl, fontFamily: theme.f,
      }}>
      <div className="flex gap-1 mb-1.5 items-center">
        <span style={{ color: m.a }}><ThemeIcon style={theme.style} /></span>
        <div className="w-3 h-3 rounded-sm" style={{ background: g ? m.bg : m.bg, border: `1px solid ${m.b}` }} />
        <div className="w-3 h-3 rounded-sm" style={{ background: m.a, border: `1px solid ${m.b}` }} />
        {active && <span className="ml-auto text-[9px] font-medium uppercase px-1" style={{ color: m.a }}>{theme.style}</span>}
      </div>
      <h3 className="font-medium text-xs mb-0.5" style={{ color: m.t }}>{theme.name}</h3>
      <p className="text-[10px]" style={{ color: m.t, opacity: 0.5 }}>{theme.desc}</p>
    </button>
  );
});
ThemeCard.displayName = "ThemeCard";

const Preview = memo(({ theme, dark }) => {
  const m = getM(theme, dark);
  const g = m.bg?.includes?.("gradient");
  return (
    <div className="p-3" style={{
      background: m.s, border: `1px solid ${m.b}`, borderRadius: theme.r,
      boxShadow: theme.sh, backdropFilter: theme.bl, fontFamily: theme.f,
    }}>
      <h3 className="text-xs font-medium mb-1" style={{ color: m.t }}>{theme.name}</h3>
      <p className="text-[10px] mb-2" style={{ color: m.t, opacity: 0.5 }}>Previewing {dark ? "dark" : "light"} mode</p>
      <input type="text" placeholder="..." readOnly className="w-full mb-2 px-2 py-1 text-[11px] outline-none"
        style={{ background: g ? "rgba(255,255,255,0.15)" : m.bg, border: `1px solid ${m.b}`,
          borderRadius: theme.r === "0" ? "0" : "4px", color: m.t, fontFamily: theme.f }} />
      <div className="flex gap-1.5">
        <button className="px-2 py-1 text-[10px] font-medium" style={{
          background: m.a, color: m.t, border: `1px solid ${m.b}`,
          borderRadius: theme.r === "0" ? "0" : "4px", fontFamily: theme.f }}>Primary</button>
        <button className="px-2 py-1 text-[10px] font-medium" style={{
          background: "transparent", color: m.a, border: `1px solid ${m.a}`,
          borderRadius: theme.r === "0" ? "0" : "4px", fontFamily: theme.f }}>Outline</button>
      </div>
    </div>
  );
});
Preview.displayName = "Preview";

export default function ThemesPage() {
  const [active, setActive] = useState("minimalism");
  const [dark, setDark] = useState(false);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("tid");
    const d = localStorage.getItem("td");
    if (t && THEMES.find((x) => x.id === t)) setActive(t);
    if (d === "1") { setDark(true); document.documentElement.classList.add("dark"); }
  }, []);

  const pick = useCallback((theme) => {
    setActive(theme.id);
    localStorage.setItem("tid", theme.id);
    setToast(true);
    setTimeout(() => setToast(false), 800);

    const m = getM(theme, dark);
    const r = document.documentElement;
    const g = m.bg?.includes?.("gradient");

    requestAnimationFrame(() => {
      const sets = [
        ["--color-bg", m.bg], ["--color-bg-alt", m.bg], ["--color-surface", m.s],
        ["--color-surface-2", m.s], ["--color-surface-3", m.s], ["--color-sidebar", m.sb],
        ["--color-border", m.b], ["--color-border-subtle", m.b],
        ["--color-text-main", m.t], ["--color-text", m.t],
        ["--color-primary", m.a], ["--color-primary-hover", m.a],
        ["--shadow-soft", theme.sh], ["--shadow-warm", theme.sh],
        ["--shadow-elevated", theme.sh], ["--shadow-elev", theme.sh],
        ["--radius-brand", theme.r], ["--radius-brand-lg", theme.r],
        ["--font-sans", theme.f],
      ];
      for (const [k, v] of sets) r.style.setProperty(k, v);
      document.body.style.background = g ? m.bg : "";
      document.body.style.backgroundAttachment = g ? "fixed" : "";
    });
  }, [dark]);

  const toggleDark = useCallback(() => {
    const nd = !dark;
    setDark(nd);
    localStorage.setItem("td", nd ? "1" : "0");
    document.documentElement.classList.toggle("dark", nd);
    const t = THEMES.find((x) => x.id === active);
    if (t) pick(t);
  }, [dark, active, pick]);

  const cur = useMemo(() => THEMES.find((t) => t.id === active), [active]);
  const curM = cur ? getM(cur, dark) : null;

  const filtered = useMemo(() => {
    if (filter === "all") return THEMES;
    return THEMES.filter((t) => t.style === filter);
  }, [filter]);

  return (
    <div className="p-3 md:p-5 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h1 className="text-base md:text-lg font-semibold text-text-main">Themes</h1>
          <p className="text-text-muted text-[10px]">{THEMES.length} themes, light + dark</p>
        </div>
        <button onClick={toggleDark} className="self-start px-2 py-1 text-[10px] font-medium flex items-center gap-1"
          style={{ background: dark ? "#fff" : "#000", color: dark ? "#000" : "#fff",
            border: `1px solid ${dark ? "#fff" : "#000"}`, borderRadius: cur?.r || "4px",
            transition: "background 100ms, color 100ms" }}>
          <ThemeIcon style={dark ? "fast" : "glow"} /> {dark ? "Light" : "Dark"}
        </button>
      </div>

      {toast && <div className="fixed top-3 right-3 z-50 px-2 py-1 bg-green-500 text-white font-medium text-[10px]" style={{ borderRadius: cur?.r || "4px" }}>Applied</div>}

      <div className="flex flex-wrap gap-1 mb-3">
        {FILTERS.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className="px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider"
            style={{
              background: filter === f.id ? curM?.t : "transparent",
              color: filter === f.id ? (curM?.bg?.includes?.("gradient") ? (dark ? "#fff" : "#000") : curM?.bg) : curM?.t,
              border: `1px solid ${curM?.b || "#000"}`, borderRadius: cur?.r || "4px",
              transition: "all 80ms",
            }}>{f.label}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-3">
        {filtered.map((t) => <ThemeCard key={t.id} theme={t} dark={dark} active={active === t.id} onPick={pick} />)}
      </div>

      {cur && (
        <div>
          <h2 className="text-xs font-medium mb-1.5 text-text-main">Preview — {cur.name}</h2>
          <Preview theme={cur} dark={dark} />
        </div>
      )}
    </div>
  );
}
