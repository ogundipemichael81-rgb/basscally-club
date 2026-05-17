import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 07, 17 */
export default function AccountPage() {
  return (
    <PlaceholderPage
      screenNumber={7}
      title="Membership"
      description="Subscription status and account actions."
      route={routes.member.account}
    />
  );
}
