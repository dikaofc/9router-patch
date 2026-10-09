"use client";

import { cn } from "@/shared/utils/cn";

export default function Card({
  children,
  title,
  subtitle,
  icon,
  action,
  padding = "md",
  hover = false,
  elev = false,
  glass = false,
  className,
  ...props
}) {
  const paddings = {
    none: "",
    xs: "p-3",
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <div
      className={cn(
        glass || elev
          ? "glass-card glass-in"
          : "glass-card",
        hover && "hover:shadow-[var(--shadow-warm)] hover:border-brand-500/20 transition-all cursor-pointer",
        paddings[padding],
        className
      )}
      {...props}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            {icon && (
              <div className="p-1.5 rounded-md bg-bg text-text-muted">
                <span className="material-symbols-outlined text-[18px]">{icon}</span>
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-sm font-medium text-text-main">{title}</h3>
              )}
              {subtitle && (
                <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

Card.Section = function CardSection({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "p-3 rounded-md",
        "bg-bg border border-border-subtle",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Row = function CardRow({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "p-2.5 -mx-2.5 px-2.5 transition-colors",
        "border-b border-border-subtle last:border-b-0",
        "hover:bg-surface-2/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.ListItem = function CardListItem({
  children,
  actions,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "group flex items-center justify-between p-2.5 -mx-2.5 px-2.5",
        "border-b border-border-subtle last:border-b-0",
        "hover:bg-surface-2/40 transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {actions && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {actions}
        </div>
      )}
    </div>
  );
};
