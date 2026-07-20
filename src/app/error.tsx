"use client";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/marketing/button-link";
import { UtilityErrorLayout } from "@/components/utility/utility-error-layout";
import { routes } from "@/lib/routes";

/** Screen 15 — 500 page */
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
      kicker="Something went wrong"
      title={
        <>
          The amp clipped.
          <br />
          <span className="italic text-[var(--color-brand)]">Try again?</span>
        </>
      }
      description="Something broke on our side. Try again, or head back to the dashboard or home page."
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
          <h3 className="mb-2 font-semibold text-[var(--color-text)]">What you can do</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Tap Retry, open the dashboard, or email{" "}
            <a
              href="mailto:basscally.enquiry@gmail.com"
              className="text-[var(--color-brand)] underline decoration-[var(--color-brand)]/40 underline-offset-2"
            >
              basscally.enquiry@gmail.com
            </a>{" "}
            if the problem continues.
          </p>
        </>
      }
    />
  );
}
