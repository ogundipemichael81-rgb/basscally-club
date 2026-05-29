import { AdminEmailTemplatesView } from "@/components/admin/admin-email-templates-view";
import { getEmailTemplatePreviews } from "@/lib/admin/email/template-previews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email templates — Basscally Admin",
  description: "Preview welcome, new drop, payment failed, and cancellation emails.",
};

export default function AdminEmailTemplatesPage() {
  const previews = getEmailTemplatePreviews();
  return <AdminEmailTemplatesView previews={previews} />;
}
