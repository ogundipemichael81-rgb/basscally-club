import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

/** Screen 27 */
export default function AdminEmailResendPage() {
  return (
    <PlaceholderPage
      screenNumber={27}
      title="Resend email"
      description="Manual resend confirmation for failed recipients only."
      route={routes.admin.emailLogsResend}
    />
  );
}
