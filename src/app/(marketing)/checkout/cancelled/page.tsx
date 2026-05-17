import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 12 */
export default function CheckoutCancelledPage() {
  return (
    <PlaceholderPage
      screenNumber={12}
      title="Checkout cancelled"
      description="Recover abandoned checkout."
      route={routes.checkout.cancelled}
    />
  );
}
