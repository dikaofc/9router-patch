"use client";

export default function Tooltip({ text, children, position = "top", color }) {
  const posClass = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }[position];

  const bgStyle = color ? { backgroundColor: color } : {};
  const bgClass = color ? "" : "bg-gray-900/95 dark:bg-gray-700/95 backdrop-blur-sm";

  return (
    <div className="relative inline-flex group/tt">
      {children}
      <div
        className={`pointer-events-none absolute ${posClass} z-50 w-max max-w-56 rounded-lg px-2.5 py-1.5 text-[11px] leading-snug ${bgClass} text-white opacity-0 group-hover/tt:opacity-100 transition-opacity duration-150 whitespace-normal shadow-lg`}
        style={bgStyle}
      >
        {text}
      </div>
    </div>
  );
}
