import { requireAdminPage } from "@/lib/admin/auth";
import { AdminMetricsDashboard } from "@/components/admin/admin-metrics-dashboard";
import { getAdminMetricsSnapshot } from "@/lib/admin/metrics/queries";
import type { Metadata } from "next";
import type { AdminMetricsSnapshot } from "@/lib/admin/metrics/queries";

function fallbackMetrics(): AdminMetricsSnapshot {
  const sparkline = Array.from({ length: 12 }, () => 8);
  return {
    activeSubscribers: 0,
    mrr: 0,
    newThisMonth: 0,
    failedPayments: 0,
    sparklines: { active: sparkline, mrr: sparkline, newSubs: sparkline, failed: sparkline },
    nextScheduledDrop: null,
    contentRows: [],
    isLive: false,
    memberMetrics: {totalUsers:0,signedUpToday:0,activeTrials:0,trialExpiring:0,trialExpired:0,foundingUsers:0,foundingUnpaid:0,foundingPaid:0,paidMembers:0,convertedDuringTrial:0},

  };
}

export const metadata: Metadata = {
  title: "Admin metrics",
  description: "Active subscribers, MRR, failed payments, and content health.",
};

export default async function AdminMetricsPage() {
  await requireAdminPage();
  let metrics: AdminMetricsSnapshot;
  try {
    metrics = await Promise.race([
      getAdminMetricsSnapshot(),
      new Promise<AdminMetricsSnapshot>((resolve) =>
        setTimeout(() => resolve(fallbackMetrics()), 8000),
      ),
    ]);
  } catch {
    metrics = fallbackMetrics();
  }

  return <AdminMetricsDashboard metrics={metrics} />;
}
