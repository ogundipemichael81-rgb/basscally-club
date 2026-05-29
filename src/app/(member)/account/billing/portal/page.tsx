import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonLink } from "@/components/marketing/button-link";
import {
  getAccountSubscriptionSummary,
  resolveBillingPortalUrl,
} from "@/lib/account/subscription-summary";
import { LEGAL_SUPPORT_EMAIL } from "@/content/legal";
import { routes } from "@/lib/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing portal — Basscally Hub",
  description: "Open the Lemon Squeezy customer portal to manage billing.",
};

export default async function BillingPortalPage() {
  const summary = await getAccountSubscriptionSummary();
  if (!summary) {
    redirect(routes.auth.login);
  }

  const portalUrl = resolveBillingPortalUrl(summary);
  if (portalUrl) {
    redirect(portalUrl);
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 py-8">
      <div>
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
          LS customer portal
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-black tracking-tight">
          Billing portal loading
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          Your Lemon Squeezy customer portal link appears here after your first successful
          checkout webhook. If you just subscribed, refresh in a minute.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={routes.member.accountBilling} variant="secondary">
          Back to billing
        </ButtonLink>
        <ButtonLink href={routes.member.account} variant="ghost">
          Membership
        </ButtonLink>
      </div>
      <p className="text-sm text-[var(--color-text-dim)]">
        Need help? Email{" "}
        <Link href={`mailto:${LEGAL_SUPPORT_EMAIL}`} className="text-[var(--color-brand)] hover:underline">
          {LEGAL_SUPPORT_EMAIL}
        </Link>
        .
      </p>
    </div>
  );
}
