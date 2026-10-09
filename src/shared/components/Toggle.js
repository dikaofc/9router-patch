"use client";

import { cn } from "@/shared/utils/cn";

export default function Toggle({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
  className,
}) {
  const sizes = {
    sm: { track: "w-8 h-[18px]", thumb: "size-3.5", translate: "translate-x-[14px]" },
    md: { track: "w-10 h-6", thumb: "size-5", translate: "translate-x-[18px]" },
    lg: { track: "w-12 h-7", thumb: "size-6", translate: "translate-x-5" },
  };

  const handleClick = () => {
    if (!disabled && onChange) onChange(!checked);
  };

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-2.5",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || description}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-inner",
          "transition-colors duration-300",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
          checked ? "bg-primary" : "bg-surface-3",
          sizes[size].track,
          disabled && "cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.24)]",
            "transform transition duration-300",
            checked ? sizes[size].translate : "translate-x-0.5",
            sizes[size].thumb,
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm text-text-main">{label}</span>
          )}
          {description && (
            <span className="text-xs text-text-muted">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
