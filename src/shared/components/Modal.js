"use client";

import { useEffect } from "react";
import { cn } from "@/shared/utils/cn";
import Button from "./Button";
import Tooltip from "./Tooltip";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  showTrafficLights = true,
  className,
}) {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-4xl",
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-lg fade-in"
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Modal content */}
      <div
        className={cn(
          "glass-card relative flex max-h-[calc(100dvh-1rem)] w-full flex-col overflow-hidden rounded-[28px] border border-[var(--glass-border)]",
          "fade-in",
          sizes[size],
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Dialog"}
      >
        {/* Header */}
        {(title || showTrafficLights) && (
          <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 border-b border-border-subtle sm:px-5">
            <div className="flex min-w-0 items-center">
              {showTrafficLights && (
                <div className="hidden md:flex items-center gap-2 mr-4 ml-1">
                  <Tooltip text="Close" position="top" color="#ff5f57">
                    <button
                      onClick={onClose}
                      aria-label="Close"
                      title="Close"
                      className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all cursor-pointer flex items-center justify-center group/dot"
                    >
                      <span className="text-[8px] font-bold text-white opacity-0 group-hover/dot:opacity-100 transition-opacity leading-none">✕</span>
                    </button>
                  </Tooltip>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e] cursor-not-allowed" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840] cursor-not-allowed" />
                </div>
              )}
              {title && (
                <h2 className="truncate text-base font-semibold text-text-main">{title}</h2>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="md:hidden p-1.5 rounded-lg text-text-muted hover:bg-surface-2 hover:text-text-main transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="min-h-0 overflow-y-auto p-4 custom-scrollbar sm:p-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 px-4 py-3 border-t border-border-subtle sm:px-5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-sm text-text-muted">{message}</p>
    </Modal>
  );
}
