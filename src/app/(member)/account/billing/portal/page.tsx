import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 22 */
export default function BillingPortalPage() {
  return (
    <PlaceholderPage
      screenNumber={22}
      title="Billing portal"
      description="Redirect to Lemon Squeezy customer portal."
      route={routes.member.accountBillingPortal}
    />
  );
}
