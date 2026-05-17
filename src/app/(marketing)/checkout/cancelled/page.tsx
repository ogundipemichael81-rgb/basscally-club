import { CheckoutCancelledContent } from "@/components/checkout/checkout-cancelled-content";
import type { Metadata } from "next";

/** Screen 12 */
export const metadata: Metadata = {
  title: "Checkout paused — Basscally Club",
  description:
    "Return to checkout and join Basscally Club for $1.50/month.",
};

export default function CheckoutCancelledPage() {
  return <CheckoutCancelledContent />;
}
