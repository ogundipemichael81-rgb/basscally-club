import { requireAdminPage } from "@/lib/admin/auth";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default async function AdminEmailResendPage() {
  await requireAdminPage();
  return (
    <PlaceholderPage
      title="Resend email"
      description="Manual resend confirmation for failed recipients only."
    />
  );
}
