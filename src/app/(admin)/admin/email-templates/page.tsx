import { requireAdminPage } from "@/lib/admin/auth";
import { AdminEmailTemplatesView } from "@/components/admin/admin-email-templates-view";
import { getEmailTemplatePreviews } from "@/lib/admin/email/template-previews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email templates",
  description: "Preview welcome, new drop, payment failed, and cancellation emails.",
};

export default async function AdminEmailTemplatesPage() {
  await requireAdminPage();
  const previews = getEmailTemplatePreviews();
  return <AdminEmailTemplatesView previews={previews} />;
}
