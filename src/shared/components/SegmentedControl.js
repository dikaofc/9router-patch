"use client";

import { cn } from "@/shared/utils/cn";

export default function SegmentedControl({
  options = [],
  value,
  onChange,
  size = "md",
  className,
}) {
  const sizes = {
    sm: "h-7 text-xs px-2.5",
    md: "h-8 text-sm px-3",
    lg: "h-10 text-sm px-4",
  };

  return (
    <div
      className={cn(
        "inline-flex max-w-full items-center gap-0.5 overflow-x-auto p-1 rounded-full",
        "bg-surface/70 border border-border-subtle shadow-sm backdrop-blur-xl",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "shrink-0 rounded-full font-medium transition-all duration-300",
            sizes[size],
            value === option.value
              ? "bg-surface text-text-main shadow-md shadow-black/5 border border-border-subtle"
              : "text-text-muted hover:text-text-main"
          )}
        >
          {option.icon && (
            <span className="material-symbols-outlined text-[14px] mr-1">
              {option.icon}
            </span>
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
}
