import { PastDueBanner } from "@/components/account/past-due-banner";
import { DashboardScrollReveal } from "@/components/dashboard/dashboard-scroll-reveal";
import { ButtonLink } from "@/components/marketing/button-link";
import { Badge } from "@/components/ui/badge";
import {
  accountStatusBadgeVariant,
  resolveBillingPortalUrl,
} from "@/lib/account/types";
import type { AccountSubscriptionSummary } from "@/lib/account/types";
import { routes } from "@/lib/routes";

type Props = {
  summary: AccountSubscriptionSummary;
};

export function AccountBillingView({ summary }: Props) {
  const portalUrl = resolveBillingPortalUrl(summary);
  const statusVariant = accountStatusBadgeVariant(summary);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PastDueBanner summary={summary} />

      <DashboardScrollReveal>
        <header>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
            Billing management
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,2.75rem)] font-black leading-[0.95] tracking-[-0.03em]">
            Plan and payment details
          </h1>
          <p className="mt-3 text-[length:var(--text-body)] text-[var(--color-text-muted)]">
            Invoices, card updates, and plan changes are handled in the Lemon Squeezy customer
            portal.
          </p>
        </header>
      </DashboardScrollReveal>

      <DashboardScrollReveal delayMs={60}>
        <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold">Current plan</h2>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{summary.email}</p>
            </div>
            <Badge variant={statusVariant}>{summary.statusLabel}</Badge>
          </div>

          <dl className="mt-6 space-y-4 border-t border-[var(--color-border)] pt-6">
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-[var(--color-text-muted)]">Plan</dt>
              <dd className="font-semibold">{summary.planLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-[var(--color-text-muted)]">Price</dt>
              <dd className="font-semibold">{summary.priceLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-[var(--color-text-muted)]">Subscription status</dt>
              <dd className="font-semibold capitalize">{summary.statusLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-[var(--color-text-muted)]">Period end</dt>
              <dd className="font-semibold">{summary.periodEndLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-[var(--color-text-muted)]">Next renewal</dt>
              <dd className="font-semibold">{summary.renewalLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-[var(--color-text-muted)]">Access</dt>
              <dd className="font-semibold">
                {summary.hasAccess ? "Audio play + download" : "Limited — renew to restore access"}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3 max-[680px]:flex-col">
            {portalUrl ? (
              <ButtonLink
                href={portalUrl}
                className="landing-cta-glow max-[680px]:w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open billing portal
              </ButtonLink>
            ) : (
              <ButtonLink
                href={routes.member.accountBillingPortal}
                className="landing-cta-glow max-[680px]:w-full"
              >
                Open billing portal
              </ButtonLink>
            )}
            <ButtonLink href={routes.member.account} variant="secondary" className="max-[680px]:w-full">
              Back to membership
            </ButtonLink>
          </div>

          <p className="mt-4 text-xs text-[var(--color-text-dim)]">
            Invoice downloads and plan switches live in Lemon Squeezy — Basscally Hub links you
            there securely.
          </p>
        </section>
      </DashboardScrollReveal>
    </div>
  );
}
