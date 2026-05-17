import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 10 */
export default function AdminMetricsPage() {
  return (
    <PlaceholderPage
      screenNumber={10}
      title="Admin metrics"
      description="MRR, subscribers, failed payments, content health."
      route={routes.admin.root}
    />
  );
}
