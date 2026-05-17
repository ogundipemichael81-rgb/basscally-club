import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function UtilityErrorLayout({
  code,
  kicker,
  title,
  description,
  actions,
  aside,
}: {
  code: string;
  kicker: string;
  title: ReactNode;
  description: string;
  actions: ReactNode;
  aside: ReactNode;
}) {
  return (
    <div className="flex min-h-full items-center justify-center px-6 py-12">
      <div className="w-full max-w-[1120px]">
        <p className="mb-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
          Screen {code === "404" ? "24" : "25"} · Utility state
        </p>
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="utility-hero-card relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] p-8 lg:p-9">
            <div className="relative z-[1]">
              <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-brand)]">
                {kicker}
              </p>
              <p
                className="utility-error-num font-[family-name:var(--font-display)] font-black leading-[0.82] tracking-[-0.08em]"
                aria-hidden
              >
                {code}
              </p>
              <h1 className="my-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight lg:text-4xl">
                {title}
              </h1>
              <p className="max-w-xl text-[17px] leading-snug text-[var(--color-text-muted)]">
                {description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">{actions}</div>
              <div className="mt-6 border-t border-[var(--color-border)] pt-6">
                <Badge variant={code === "404" ? "beginner" : "advanced"}>
                  {code === "404" ? "Branded 404" : "Server error"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="utility-panel-card rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6">
            {aside}
          </div>
        </div>
      </div>
    </div>
  );
}
