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
    sm: { track: "w-7 h-4", thumb: "size-3", translate: "translate-x-3" },
    md: { track: "w-9 h-5", thumb: "size-4", translate: "translate-x-4" },
    lg: { track: "w-11 h-6", thumb: "size-5", translate: "translate-x-5" },
  };

  const handleClick = () => {
    if (!disabled && onChange) onChange(!checked);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer rounded-full",
          "transition-colors duration-150 ease-in-out",
          "focus:outline-none focus:ring-2 focus:ring-brand-500/15",
          checked ? "bg-brand-500" : "bg-surface-3",
          sizes[size].track,
          disabled && "cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block rounded-full bg-white shadow-sm",
            "transform transition duration-150 ease-in-out",
            checked ? sizes[size].translate : "translate-x-0.5",
            sizes[size].thumb,
            "mt-0.5"
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
