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
    if (!name) return "bg-brand-500";
    const colors = [
      "bg-red-400",
      "bg-orange-400",
      "bg-amber-400",
      "bg-yellow-400",
      "bg-lime-400",
      "bg-green-400",
      "bg-emerald-400",
      "bg-teal-400",
      "bg-cyan-400",
      "bg-sky-400",
      "bg-blue-400",
      "bg-indigo-400",
      "bg-violet-400",
      "bg-purple-400",
      "bg-fuchsia-400",
      "bg-pink-400",
      "bg-rose-400",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (src) {
    return (
      <div
        className={cn(
          "rounded-full bg-cover bg-center bg-no-repeat",
          "ring-1 ring-border",
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
        "rounded-full flex items-center justify-center font-medium text-white",
        "ring-1 ring-border",
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
