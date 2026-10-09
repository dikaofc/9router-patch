"use client";

import { cn } from "@/shared/utils/cn";

const variants = {
  default: "bg-surface/70 text-text-muted border-border/70",
  primary: "bg-primary/10 text-primary border-primary/15",
  success: "bg-success/10 text-success border-success/15",
  warning: "bg-warning/10 text-warning border-warning/15",
  error: "bg-danger/10 text-danger border-danger/15",
  info: "bg-info/10 text-info border-info/15",
};

const sizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  icon,
  className,
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1 rounded-full border bg-clip-padding font-medium backdrop-blur-md",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "size-1.5 rounded-full",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning",
            variant === "error" && "bg-danger",
            variant === "info" && "bg-info",
            variant === "primary" && "bg-primary",
            variant === "default" && "bg-text-subtle"
          )}
        />
      )}
      {icon && <span className="material-symbols-outlined text-[12px]">{icon}</span>}
      {children}
    </span>
  );
}
