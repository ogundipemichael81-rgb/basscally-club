"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
};

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("Dialog components must be used within Dialog");
  }
  return ctx;
}

export function Dialog({
  children,
  defaultOpen = false,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const titleId = useId();

  return (
    <DialogContext.Provider value={{ open, setOpen, titleId }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { setOpen } = useDialog();

  return (
    <button type="button" className={className} onClick={() => setOpen(true)}>
      {children}
    </button>
  );
}

export function DialogContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open, setOpen, titleId } = useDialog();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [setOpen],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/70"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-lg)] motion-reduce:animate-none",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { titleId } = useDialog();
  return (
    <h2
      ref={ref}
      id={titleId}
      className={cn(
        "font-[family-name:var(--font-display)] text-[length:var(--text-h3)] font-semibold",
        className,
      )}
      {...props}
    />
  );
});

DialogTitle.displayName = "DialogTitle";

export function DialogClose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { setOpen } = useDialog();
  return (
    <button type="button" className={className} onClick={() => setOpen(false)}>
      {children}
    </button>
  );
}
