import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 18 */
export default function AccountCancelPage() {
  return (
    <PlaceholderPage
      screenNumber={18}
      title="Cancel membership"
      description="Cancel flow and period-end clarity."
      route={routes.member.accountCancel}
    />
  );
}
