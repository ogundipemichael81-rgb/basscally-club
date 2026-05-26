import { CheckoutSuccessContent } from "@/components/checkout/checkout-success-content";
import type { Metadata } from "next";

/** Screen 11 */
export const metadata: Metadata = {
  title: "Checkout success — Basscally Hub",
  description:
    "Your Basscally Hub membership is live. Check your email for a magic link and start practicing.",
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessContent />;
}
