import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminEmailLogRow } from "@/lib/admin/metrics/queries";

function statusBadgeVariant(
  status: string,
): "active" | "warning" | "danger" | "default" {
  if (status === "sent" || status === "delivered") return "active";
  if (status === "pending" || status === "queued") return "warning";
  if (status === "failed" || status === "bounced") return "danger";
  return "default";
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

type Props = {
  rows: AdminEmailLogRow[];
  isLive: boolean;
};

export function AdminEmailLogsList({ rows, isLive }: Props) {
  return (
    <div>
      <div className="mb-8">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
          email delivery logs
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.04em]">
          Email logs
        </h1>
        {!isLive ? (
          <p className="mt-3 text-sm text-[var(--color-warning)]">
            Logs appear once Resend delivery is wired in BH-15.
          </p>
        ) : null}
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)]">
          No email delivery logs yet. Published drops and webhooks will populate this
          table.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Drop</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.emailType}</TableCell>
                <TableCell>{row.userEmail ?? "—"}</TableCell>
                <TableCell>{row.contentTitle ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant={statusBadgeVariant(row.status)}>{row.status}</Badge>
                </TableCell>
                <TableCell>{formatDate(row.sentAt ?? row.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {rows.some((row) => row.errorReason) ? (
        <p className="mt-4 text-xs text-[var(--color-text-dim)]">
          Failed rows include error reasons in the database for manual resend (BH-15).
        </p>
      ) : null}
    </div>
  );
}
