import { redirect } from "next/navigation";
import { AccountMembershipView } from "@/components/account/account-membership-view";
import { getAccountSubscriptionSummary } from "@/lib/account/subscription-summary";
import { routes } from "@/lib/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership",
  description: "Your Basscally Hub plan, renewal date, and account actions.",
};

export default async function AccountPage() {
  const summary = await getAccountSubscriptionSummary();
  if (!summary) {
    redirect(routes.auth.login);
  }

  return <AccountMembershipView summary={summary} />;
}
