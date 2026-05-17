import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 14, 29 */
export default function AdminContentListPage() {
  return (
    <PlaceholderPage
      screenNumber={14}
      title="Content list"
      description="Content table, filters, and actions."
      route={routes.admin.content}
    />
  );
}
