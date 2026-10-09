"use client";

import { cn } from "@/shared/utils/cn";

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  hint,
  icon,
  disabled = false,
  required = false,
  className,
  inputClassName,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
      <label className="text-xs font-medium text-text-main sm:text-sm">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-muted">
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "w-full min-h-11 py-2.5 px-3.5 text-base text-text-main bg-surface/70 rounded-2xl",
            "border border-border/70 placeholder-text-muted/60 shadow-inner backdrop-blur-xl",
            "focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary/50",
            "transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
            "text-[16px] sm:text-sm",
            icon && "pl-9",
            error && "ring-1 ring-red-500/30 focus:ring-2 focus:ring-red-500/20 border-red-500/30",
            inputClassName
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span className="material-symbols-outlined text-[12px]">error</span>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-text-muted">{hint}</p>
      )}
    </div>
  );
}
