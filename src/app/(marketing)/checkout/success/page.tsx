import { CheckoutSuccessContent } from "@/components/checkout/checkout-success-content";
import { getCheckoutSuccessContext, parseCheckoutEmailFromSearchParams } from "@/lib/checkout/success-context";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout success — Basscally Hub",
  description:
    "Your Basscally Hub membership is live. Check your email for a magic link and start practicing.",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const context = await getCheckoutSuccessContext({
    emailFromQuery: parseCheckoutEmailFromSearchParams(await searchParams),
  });
  return <CheckoutSuccessContent context={context} />;
}
