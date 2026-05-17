"use client";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/marketing/button-link";
import { UtilityErrorLayout } from "@/components/utility/utility-error-layout";
import { routes } from "@/lib/routes";

/** Screen 25 */
export default function Error({
  reset,
  error: _error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <UtilityErrorLayout
      code="500"
      kicker="// System fault"
      title={
        <>
          The amp clipped.
          <br />
          <span className="italic text-[var(--color-brand)]">Try again?</span>
        </>
      }
      description="Something broke on our side. Save your place, retry the action, or return to a stable screen. This page is for production confidence, not panic."
      actions={
        <>
          <Button type="button" onClick={reset} className="min-h-11">
            Retry
          </Button>
          <ButtonLink href={routes.member.dashboard} variant="secondary">
            Dashboard
          </ButtonLink>
        </>
      }
      aside={
        <>
          <div
            className="relative mx-auto mb-6 flex h-[190px] w-[190px] items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-sunken)] text-5xl"
            aria-hidden
          >
            ⚡
          </div>
          <div className="mb-4 flex h-10 items-end justify-center gap-1" aria-hidden>
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-[var(--color-brand)] opacity-80"
                style={{ height: `${8 + (i % 3) * 8}px` }}
              />
            ))}
          </div>
          <h3 className="mb-2 font-semibold text-[var(--color-text)]">Recovery behavior</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Offer retry, safe fallback, and a support route. Do not trap the user on a dead screen.
          </p>
        </>
      }
    />
  );
}
