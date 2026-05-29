import { AdminMetricsDashboard } from "@/components/admin/admin-metrics-dashboard";
import { getAdminMetricsSnapshot } from "@/lib/admin/metrics/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin metrics — Basscally Hub",
  description: "Active subscribers, MRR, failed payments, and content health.",
};

export default async function AdminMetricsPage() {
  const metrics = await getAdminMetricsSnapshot();

  return <AdminMetricsDashboard metrics={metrics} />;
}
