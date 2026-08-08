import { redirect } from "next/navigation";
import { AccountBillingView } from "@/components/account/account-billing-view";
import { getAccountSubscriptionSummary } from "@/lib/account/subscription-summary";
import { routes } from "@/lib/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your Basscally Hub plan, invoices, and payment method.",
};

export default async function AccountBillingPage() {
  const summary = await getAccountSubscriptionSummary();
  if (!summary) {
    redirect(routes.auth.login);
  }

  return <AccountBillingView summary={summary} />;
}
