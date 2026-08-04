import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { CancelSubscriptionDialog } from "@/components/account/cancel-subscription-dialog";
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

export function AccountMembershipView({ summary }: Props) {
  const portalUrl = resolveBillingPortalUrl(summary);
  const statusVariant = accountStatusBadgeVariant(summary);

  return (
    <div className="account-membership-view mx-auto max-w-4xl space-y-8">
      <PastDueBanner summary={summary} />

      <DashboardScrollReveal>
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
              Account page
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black leading-[0.95] tracking-[-0.03em]">
              Membership, clean and under control.
            </h1>
            <p className="mt-3 max-w-2xl text-[length:var(--text-body)] text-[var(--color-text-muted)]">
              Your plan, billing, access window, and Hub status in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={statusVariant}>{summary.statusLabel}</Badge>
            {summary.isFoundingMember ? <Badge variant="brand">Founding member</Badge> : null}
            {summary.cancelAtPeriodEnd ? (
              <Badge variant="warning">Cancels at period end</Badge>
            ) : null}
          </div>
        </header>
      </DashboardScrollReveal>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <DashboardScrollReveal delayMs={60}>
          <section className="basscally-depth-card overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              {summary.isFoundingMember ? <Badge variant="brand">Founding member</Badge> : null}
              <Badge variant={statusVariant}>Subscription status: {summary.statusLabel}</Badge>
            </div>
            <p className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] font-black leading-[0.9] tracking-[-0.05em]">
              <span className="text-[var(--color-brand)]">{summary.priceLabel.split("/")[0]}</span>
              <span className="text-[var(--color-text-dim)]"> / month</span>
            </p>
            <p className="mt-4 max-w-xl text-sm text-[var(--color-text-muted)]">
              {summary.isFoundingMember
                ? "Founding price stays locked while your membership stays active."
                : "Manage renewals and payment details through Lemon Squeezy."}
            </p>
            <dl className="mt-8 grid gap-4 border-t border-[var(--color-border)] pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-[var(--color-text-dim)]">Email</dt>
                <dd className="mt-1 text-sm font-semibold">{summary.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text-dim)]">Plan</dt>
                <dd className="mt-1 text-sm font-semibold">{summary.planLabel}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text-dim)]">Period end</dt>
                <dd className="mt-1 text-sm font-semibold">{summary.periodEndLabel}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text-dim)]">Next renewal</dt>
                <dd className="mt-1 text-sm font-semibold">{summary.renewalLabel}</dd>
              </div>
            </dl>
          </section>
        </DashboardScrollReveal>

        <DashboardScrollReveal delayMs={100}>
          <aside className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
              Billing
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">Actions</h2>
            <div className="mt-5 space-y-3">
              {portalUrl ? (
                <ButtonLink
                  href={portalUrl}
                  className="landing-cta-glow w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Manage billing
                </ButtonLink>
              ) : (
                <ButtonLink href={routes.member.accountBillingPortal} className="landing-cta-glow w-full">
                  Manage billing
                </ButtonLink>
              )}
              <ButtonLink href={routes.member.accountBilling} variant="secondary" className="w-full">
                Billing management
              </ButtonLink>
              <CancelSubscriptionDialog
                portalUrl={portalUrl}
                periodEndLabel={summary.periodEndLabel}
              />
            </div>
            <div className="mt-6 border-t border-[var(--color-border)] pt-4">
              <ButtonLink href={routes.member.accountSecurity} variant="secondary" className="mb-3 w-full">
                Account security
              </ButtonLink>
              <SignOutButton />
            </div>
          </aside>
        </DashboardScrollReveal>
      </div>

      <DashboardScrollReveal delayMs={140}>
        <p className="text-sm text-[var(--color-text-dim)]">
          Questions? Read the{" "}
          <Link href={`${routes.legal.refundPolicy}#cancellations`} className="text-[var(--color-brand)] hover:underline">
            Refund Policy
          </Link>{" "}
          or open{" "}
          <Link href={routes.member.accountCancel} className="text-[var(--color-brand)] hover:underline">
            cancellation information
          </Link>
          .
        </p>
      </DashboardScrollReveal>
    </div>
  );
}
