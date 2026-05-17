import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screens 09, 20 */
export default function AdminContentNewPage() {
  return (
    <PlaceholderPage
      screenNumber={9}
      title="Upload drop"
      description="Audio upload and publish form."
      route={routes.admin.contentNew}
    />
  );
}
