import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 16 */
export default function AdminEmailLogsPage() {
  return (
    <PlaceholderPage
      screenNumber={16}
      title="Email delivery logs"
      description="Queue and delivery statuses."
      route={routes.admin.emailLogs}
    />
  );
}
