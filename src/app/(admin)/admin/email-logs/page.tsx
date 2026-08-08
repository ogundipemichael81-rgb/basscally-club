import { requireAdminPage } from "@/lib/admin/auth";
import { AdminEmailLogsList } from "@/components/admin/admin-email-logs-list";
import { listAdminEmailLogs } from "@/lib/admin/metrics/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email logs — Basscally Admin",
  description: "Delivery logs for Basscally Hub transactional email.",
};

export default async function AdminEmailLogsPage() {
  await requireAdminPage();
  const { rows, isLive } = await listAdminEmailLogs();

  return <AdminEmailLogsList rows={rows} isLive={isLive} />;
}
