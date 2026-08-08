import { redirect } from "next/navigation";
import { BillingPortalRedirect } from "@/components/account/billing-portal-redirect";
import {
  getAccountSubscriptionSummary,
  resolveBillingPortalUrl,
} from "@/lib/account/subscription-summary";
import { routes } from "@/lib/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing portal",
  description: "Open the Lemon Squeezy customer portal to manage billing.",
};

export default async function BillingPortalPage() {
  const summary = await getAccountSubscriptionSummary();
  if (!summary) {
    redirect(routes.auth.login);
  }

  const portalUrl = resolveBillingPortalUrl(summary);

  return <BillingPortalRedirect portalUrl={portalUrl} />;
}
