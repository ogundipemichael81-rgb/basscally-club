import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 33 */
export default function AccountBillingPage() {
  return (
    <PlaceholderPage
      screenNumber={33}
      title="Billing management"
      description="Plan, card, invoices, and portal."
      route={routes.member.accountBilling}
    />
  );
}
