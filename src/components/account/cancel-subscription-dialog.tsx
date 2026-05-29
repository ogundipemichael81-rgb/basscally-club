"use client";

import { ButtonLink } from "@/components/marketing/button-link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { routes } from "@/lib/routes";

type Props = {
  portalUrl: string | null;
  periodEndLabel: string;
};

export function CancelSubscriptionDialog({ portalUrl, periodEndLabel }: Props) {

  return (
    <Dialog>
      <DialogTrigger className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--color-text)] hover:underline">
        Cancel subscription
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Cancel your membership?</DialogTitle>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          You keep full access until the end of your current paid billing period. Cancellation
          is handled securely through Lemon Squeezy — no pro-rata refunds for unused time.
        </p>
        {periodEndLabel !== "—" ? (
          <p className="mt-2 text-sm text-[var(--color-text)]">
            Access continues until <strong>{periodEndLabel}</strong>.
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {portalUrl ? (
            <ButtonLink
              href={portalUrl}
              variant="secondary"
              className="w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yes, cancel
            </ButtonLink>
          ) : (
            <ButtonLink
              href={routes.member.accountBillingPortal}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Yes, cancel
            </ButtonLink>
          )}
          <DialogClose className="inline-flex min-h-11 w-full items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand)] px-6 font-semibold text-white hover:bg-[var(--color-brand-hover)] sm:w-auto">
            Keep my membership
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
