import { PricingPlanSelector } from "@/components/marketing/pricing-plan-selector";
import { getFoundingMemberStats } from "@/lib/founding/stats";
import { getCheckoutUrlsByPlan } from "@/lib/lemonsqueezy/checkout-url";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

/** Screen 32 — three-tier plan selector */
export const metadata: Metadata = {
  title: "Choose your Hub plan",
  description:
    "Monthly $2.99, Founding Member $1.50, or Annual $18. Lock your groove and join Basscally Hub.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PricingPage({ searchParams }: Props) {
  const params = await searchParams;
  if (params.paywall === "1" || params.paywall === "true") {
    const contentId =
      typeof params.contentId === "string" ? params.contentId : undefined;
    redirect(routes.paywall({ contentId, reason: "lapsed" }));
  }

  const [foundingStats, checkoutByPlan] = await Promise.all([
    getFoundingMemberStats(),
    getCheckoutUrlsByPlan(),
  ]);

  return (
    <PricingPlanSelector foundingStats={foundingStats} checkoutByPlan={checkoutByPlan} />
  );
}
