"use client";

import { useTheme } from "@/shared/hooks/useTheme";
import { cn } from "@/shared/utils/cn";

export default function ThemeToggle({ className, variant = "default" }) {
  const { isDark, toggleTheme } = useTheme();

  const variants = {
    default: cn(
      "flex items-center justify-center size-11 rounded-[var(--radius-brand-lg)]",
      "text-text-muted hover:text-text-main",
      "hover:bg-surface-2/80 transition-colors"
    ),
    card: cn(
      "flex items-center justify-center size-11 rounded-[var(--radius-brand-lg)]",
      "bg-surface hover:bg-surface-2",
      "border border-border-subtle",
      "text-text-muted hover:text-primary",
      "transition-colors duration-150"
    ),
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(variants[variant], className)}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span
        className={cn(
          "material-symbols-outlined text-[20px]",
          variant === "card" && "transition-transform duration-150"
        )}
      >
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
