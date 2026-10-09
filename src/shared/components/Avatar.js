"use client";

import { cn } from "@/shared/utils/cn";

export default function Avatar({
  src,
  alt = "Avatar",
  name,
  size = "md",
  className,
}) {
  const sizes = {
    xs: "size-6 text-[10px]",
    sm: "size-7 text-xs",
    md: "size-8 text-sm",
    lg: "size-10 text-base",
    xl: "size-12 text-lg",
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getColorFromName = (name) => {
    if (!name) return "bg-primary";
    const colors = [
      "bg-red-600",
      "bg-orange-600",
      "bg-amber-700",
      "bg-yellow-700",
      "bg-lime-700",
      "bg-green-700",
      "bg-emerald-700",
      "bg-teal-700",
      "bg-cyan-700",
      "bg-sky-700",
      "bg-blue-700",
      "bg-indigo-700",
      "bg-violet-700",
      "bg-purple-700",
      "bg-fuchsia-700",
      "bg-pink-700",
      "bg-rose-700",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (src) {
    return (
      <div
        className={cn(
          "rounded-full bg-cover bg-center bg-no-repeat",
          "ring-2 ring-white/60 dark:ring-white/10",
          sizes[size],
          className
        )}
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold text-white",
        "ring-2 ring-white/60 dark:ring-white/10 shadow-lg shadow-black/15",
        sizes[size],
        getColorFromName(name),
        className
      )}
      role="img"
      aria-label={alt}
    >
      {getInitials(name)}
    </div>
  );
}
