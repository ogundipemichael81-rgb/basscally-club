import { CheckoutCancelledContent } from "@/components/checkout/checkout-cancelled-content";
import { getFoundingMemberStats } from "@/lib/founding/stats";
import { getFoundingCheckoutUrl } from "@/lib/lemonsqueezy/checkout-url";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout paused",
  description: "Return to checkout and join Basscally Hub for $1.50/month.",
};

export default async function CheckoutCancelledPage() {
  const stats = await getFoundingMemberStats();
  return (
    <CheckoutCancelledContent
      foundingCheckoutHref={await getFoundingCheckoutUrl()}
      spotsRemaining={stats.live ? stats.spotsRemaining : null}
    />
  );
}
