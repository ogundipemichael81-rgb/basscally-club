import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screens 08, 32 — pricing / paywall */
export default function PricingPage() {
  return (
    <PlaceholderPage
      screenNumber={32}
      title="Pricing"
      description="Founding, monthly, and annual plan selector."
      route={routes.pricing}
    />
  );
}
