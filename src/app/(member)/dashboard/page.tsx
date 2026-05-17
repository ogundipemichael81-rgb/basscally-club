import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screens 04, 05, 17 */
export default function DashboardPage() {
  return (
    <PlaceholderPage
      screenNumber={5}
      title="Dashboard"
      description="Empty, populated, and past-due banner states."
      route={routes.member.dashboard}
    />
  );
}
