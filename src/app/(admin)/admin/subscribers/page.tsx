import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 15 */
export default function AdminSubscribersPage() {
  return (
    <PlaceholderPage
      screenNumber={15}
      title="Subscribers"
      description="Subscriber table, filters, and export."
      route={routes.admin.subscribers}
    />
  );
}
