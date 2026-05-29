import Link from "next/link";
import { AdminDropCountdown } from "@/components/admin/admin-drop-countdown";
import { AdminMetricSparkline } from "@/components/admin/admin-metric-sparkline";
import { AdminMetricsContentPanel } from "@/components/admin/admin-metrics-content-panel";
import { formatUsd } from "@/lib/admin/metrics/mrr";
import type { AdminMetricsSnapshot } from "@/lib/admin/metrics/queries";
import { routes } from "@/lib/routes";

type Props = {
  metrics: AdminMetricsSnapshot;
};

export function AdminMetricsDashboard({ metrics }: Props) {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
            metrics dashboard
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.04em] lg:text-5xl">
            Hub health at a glance
          </h1>
          {!metrics.isLive ? (
            <p className="mt-3 text-sm text-[var(--color-warning)]">
              Local demo — connect Supabase service role for live metrics.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={routes.api.adminSubscribersExport}
            className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] px-5 font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-raised)]"
          >
            Export CSV
          </a>
          <Link
            href={routes.admin.contentNew}
            className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand)] px-5 font-semibold text-white hover:bg-[var(--color-brand-hover)]"
          >
            New drop
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="active subscribers"
          value={String(metrics.activeSubscribers)}
          sparkline={metrics.sparklines.active}
        />
        <MetricCard
          label="MRR"
          value={formatUsd(metrics.mrr)}
          sparkline={metrics.sparklines.mrr}
        />
        <MetricCard
          label="New this month"
          value={String(metrics.newThisMonth)}
          sparkline={metrics.sparklines.newSubs}
        />
        <MetricCard
          label="Failed payments"
          value={String(metrics.failedPayments)}
          sparkline={metrics.sparklines.failed}
          variant="danger"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
        <AdminMetricsContentPanel rows={metrics.contentRows} />
        {metrics.nextScheduledDrop ? (
          <AdminDropCountdown
            scheduledFor={metrics.nextScheduledDrop.scheduledFor}
            title={metrics.nextScheduledDrop.title}
          />
        ) : (
          <div className="basscally-depth-card rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
              Next scheduled drop
            </p>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              No scheduled drops. Upload one from the content admin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sparkline,
  variant = "brand",
}: {
  label: string;
  value: string;
  sparkline: number[];
  variant?: "brand" | "danger";
}) {
  return (
    <article className="basscally-depth-card flex min-h-[188px] flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--color-border)] p-5">
      <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
        {label}
      </p>
      <p className="font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.04em]">
        {value}
      </p>
      <AdminMetricSparkline values={sparkline} variant={variant} />
    </article>
  );
}
