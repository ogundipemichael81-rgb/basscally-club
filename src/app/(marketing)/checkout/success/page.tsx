import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 11 */
export default function CheckoutSuccessPage() {
  return (
    <PlaceholderPage
      screenNumber={11}
      title="Checkout success"
      description="Post-payment — magic link and dashboard direction."
      route={routes.checkout.success}
    />
  );
}
