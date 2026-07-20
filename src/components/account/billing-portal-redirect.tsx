"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/marketing/button-link";
import { LEGAL_SUPPORT_EMAIL } from "@/content/legal";
import { routes } from "@/lib/routes";

type Props = {
  portalUrl: string | null;
};

export function BillingPortalRedirect({ portalUrl }: Props) {
  useEffect(() => {
    if (!portalUrl) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.location.replace(portalUrl);
    }, 800);

    return () => window.clearTimeout(timer);
  }, [portalUrl]);

  if (portalUrl) {
    return (
      <div className="mx-auto max-w-lg space-y-6 py-8">
        <div className="basscally-depth-card rounded-[var(--radius-xl)] border border-[var(--color-border)] p-8 text-center">
          <div
            className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-brand)] motion-reduce:animate-none"
            aria-hidden
          />
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
            Billing portal redirect
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black tracking-tight">
            Opening Lemon Squeezy…
          </h1>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Redirecting you to the secure customer portal to manage billing, invoices, and payment
            details.
          </p>
          <p className="mt-4 text-xs text-[var(--color-text-dim)]">
            If nothing happens,{" "}
            <a
              href={portalUrl}
              className="text-[var(--color-brand)] underline decoration-[var(--color-brand)]/40 underline-offset-2"
            >
              open the billing portal manually
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 py-8">
      <div className="basscally-depth-card rounded-[var(--radius-xl)] border border-[var(--color-border)] p-8">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
          Billing portal redirect
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-black tracking-tight">
          Portal link pending
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          Your Lemon Squeezy customer portal link appears here after your first successful checkout
          webhook. If you just subscribed, refresh in a minute.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={routes.member.accountBilling} variant="secondary">
            Back to billing
          </ButtonLink>
          <ButtonLink href={routes.member.account} variant="ghost">
            Membership
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-[var(--color-text-dim)]">
          Need help? Email{" "}
          <Link href={`mailto:${LEGAL_SUPPORT_EMAIL}`} className="text-[var(--color-brand)] hover:underline">
            {LEGAL_SUPPORT_EMAIL}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
