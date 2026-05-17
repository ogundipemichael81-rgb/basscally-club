import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 31 */
export default function AdminEmailTemplatesPage() {
  return (
    <PlaceholderPage
      screenNumber={31}
      title="Email templates"
      description="Magic link, new drop, payment failed, welcome, cancellation previews."
      route={routes.admin.emailTemplates}
    />
  );
}
