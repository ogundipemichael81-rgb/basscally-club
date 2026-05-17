"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "warning" | "danger" | "info";

export type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toasts: ToastItem[];
  push: (toast: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, string> = {
  success: "border-[var(--color-success)]/40 text-[var(--color-success)]",
  warning: "border-[var(--color-warning)]/40 text-[var(--color-warning)]",
  danger: "border-[var(--color-danger)]/40 text-[var(--color-danger)]",
  info: "border-[var(--color-info)]/40 text-[var(--color-info)]",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => dismiss(id), 5000);
  }, [dismiss]);

  const value = useMemo(
    () => ({ toasts, push, dismiss }),
    [toasts, push, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 p-4 sm:bottom-6 sm:right-6"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto rounded-[var(--radius-lg)] border bg-[var(--color-surface-raised)] p-4 shadow-[var(--shadow-md)]",
              variantStyles[toast.variant],
            )}
            role="status"
          >
            <p className="font-semibold text-[var(--color-text)]">{toast.title}</p>
            {toast.description ? (
              <p className="mt-1 text-[length:var(--text-body-sm)] text-[var(--color-text-muted)]">
                {toast.description}
              </p>
            ) : null}
            <button
              type="button"
              className="mt-2 text-[length:var(--text-caption)] text-[var(--color-text-dim)] underline"
              onClick={() => dismiss(toast.id)}
            >
              Dismiss
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
