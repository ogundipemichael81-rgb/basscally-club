import Link from "next/link";
import { ButtonLink } from "@/components/marketing/button-link";
import { resolveBillingPortalUrl } from "@/lib/account/types";
import type { AccountSubscriptionSummary } from "@/lib/account/types";
import { routes } from "@/lib/routes";

type Props = {
  summary: AccountSubscriptionSummary;
  className?: string;
};

export function PastDueBanner({ summary, className }: Props) {
  if (!summary.isPastDue) {
    return null;
  }

  const portalUrl = resolveBillingPortalUrl(summary);

  return (
    <div
      className={className}
      role="alert"
      aria-live="polite"
    >
      <div className="rounded-[var(--radius-lg)] border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.08)] p-5">
        <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-warning)]">
          Payment past due
        </p>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Your last payment did not go through. Update your card in the Lemon Squeezy billing
          portal to keep Hub access through your current period.
        </p>
        <div className="mt-4">
          {portalUrl ? (
            <ButtonLink
              href={portalUrl}
              className="landing-cta-glow max-[680px]:w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              Update payment
            </ButtonLink>
          ) : (
            <ButtonLink
              href={routes.member.accountBillingPortal}
              variant="secondary"
              className="max-[680px]:w-full"
            >
              Open billing portal
            </ButtonLink>
          )}
        </div>
        <p className="mt-3 text-xs text-[var(--color-text-dim)]">
          Need help?{" "}
          <Link href={routes.member.accountBilling} className="text-[var(--color-brand)] hover:underline">
            View billing details
          </Link>
        </p>
      </div>
    </div>
  );
}
