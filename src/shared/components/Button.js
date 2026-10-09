"use client";

import { cn } from "@/shared/utils/cn";

const variants = {
  primary: "bg-primary hover:bg-primary-hover text-white shadow-sm disabled:bg-surface-3 disabled:text-text-muted",
  secondary: "bg-surface/70 hover:bg-surface-2 text-text-main border border-border/70 backdrop-blur-xl disabled:opacity-50",
  outline: "border border-border/80 text-text-main hover:bg-surface-2/70 hover:border-primary/40",
  ghost: "text-text-muted hover:bg-surface-2/70 hover:text-text-main",
  danger: "bg-red-500 hover:bg-red-600 text-white shadow-sm disabled:bg-surface-3 disabled:text-text-muted",
  success: "bg-green-600 hover:bg-green-700 text-white shadow-sm disabled:bg-surface-3 disabled:text-text-muted",
};

const sizes = {
  sm: "min-h-8 px-3 text-xs rounded-xl",
  md: "min-h-10 px-4 text-sm rounded-xl",
  lg: "min-h-11 px-5 text-sm rounded-2xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 cursor-pointer",
        "active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
      ) : icon ? (
        <span className="material-symbols-outlined text-[16px]">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && (
        <span className="material-symbols-outlined text-[16px]">{iconRight}</span>
      )}
    </button>
  );
}
