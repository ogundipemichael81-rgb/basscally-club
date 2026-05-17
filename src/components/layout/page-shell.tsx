import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
  title,
  description,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}) {
  return (
    <div className={cn("basscally-container basscally-section-gap py-8", className)}>
      {(title || description) && (
        <header className="mb-8 max-w-2xl">
          {title ? (
            <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
              {title}
            </h1>
          ) : null}
          {description ? (
            <p className="mt-3 text-[length:var(--text-body-lg)] text-[var(--color-text-muted)]">
              {description}
            </p>
          ) : null}
        </header>
      )}
      {children}
    </div>
  );
}
