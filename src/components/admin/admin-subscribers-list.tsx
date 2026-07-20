import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ListSubscribersResult } from "@/lib/admin/metrics/queries";
import { routes } from "@/lib/routes";

function statusBadgeVariant(
  status: string,
): "active" | "warning" | "danger" | "default" {
  if (status === "active" || status === "on_trial") return "active";
  if (status === "past_due") return "warning";
  if (status === "expired" || status === "cancelled") return "danger";
  return "default";
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

type Props = {
  data: ListSubscribersResult;
  query: string;
  status: string;
};

export function AdminSubscribersList({ data, query, status }: Props) {
  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (status && status !== "all") params.set("status", status);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `${routes.admin.subscribers}?${qs}` : routes.admin.subscribers;
  };

  return (
    <div className="admin-subscribers-list">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
            subscribers list
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.04em]">
            Subscribers
          </h1>
          {!data.isLive ? (
            <p className="mt-3 text-sm text-[var(--color-warning)]">
              Connect Supabase for live subscriber data.
            </p>
          ) : null}
        </div>
        <a
          href={routes.api.adminSubscribersExport}
          className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] px-5 font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-raised)]"
        >
          Export CSV
        </a>
      </div>

      <form className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto]" method="get">
        <Input
          label="Search by email"
          name="q"
          defaultValue={query}
          placeholder="member@example.com"
        />
        <Select label="Status filter" name="status" defaultValue={status}>
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="past_due">Past due</option>
          <option value="cancelled">Cancelled</option>
        </Select>
        <button
          type="submit"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand)] px-5 font-semibold text-white hover:bg-[var(--color-brand-hover)]"
        >
          Apply
        </button>
      </form>

      {data.rows.length === 0 ? (
        <p className="mt-8 text-sm text-[var(--color-text-muted)]">No subscribers found.</p>
      ) : (
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Period end</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <strong className="block text-[var(--color-text)]">{row.email}</strong>
                    {row.name ? (
                      <span className="text-xs text-[var(--color-text-dim)]">{row.name}</span>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    {row.planLabel}
                    {row.isFoundingMember ? (
                      <Badge variant="brand" className="ml-2">
                        Founder
                      </Badge>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(row.status)}>{row.status}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(row.currentPeriodEnd)}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {data.totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            Page {data.page} of {data.totalPages} · {data.total} subscribers
          </p>
          <div className="flex gap-2">
            {data.page > 1 ? (
              <Link
                href={buildHref(data.page - 1)}
                className="inline-flex min-h-10 items-center rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 text-sm font-semibold hover:bg-[var(--color-surface-raised)]"
              >
                Previous
              </Link>
            ) : null}
            {data.page < data.totalPages ? (
              <Link
                href={buildHref(data.page + 1)}
                className="inline-flex min-h-10 items-center rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 text-sm font-semibold hover:bg-[var(--color-surface-raised)]"
              >
                Next
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
