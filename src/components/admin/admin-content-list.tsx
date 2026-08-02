"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AdminSoftDeleteDialog } from "@/components/admin/admin-soft-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminContentRow } from "@/lib/admin/content/queries";
import { routes } from "@/lib/routes";

function statusBadgeVariant(
  status: string,
): "active" | "warning" | "danger" | "default" {
  if (status === "published") return "active";
  if (status === "scheduled") return "warning";
  if (status === "archived") return "danger";
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
  rows: AdminContentRow[];
};

export function AdminContentList({ rows }: Props) {
  const [query, setQuery] = useState("");
  const [resendState, setResendState] = useState<Record<string, string>>({});
  const searchParams = useSearchParams();
  const saved = searchParams.get("saved");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (row) =>
        row.title.toLowerCase().includes(q) ||
        row.typeLabel.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q) ||
        (row.styleLabel?.toLowerCase().includes(q) ?? false),
    );
  }, [query, rows]);

  const handleResend = async (id: string) => {
    setResendState((prev) => ({ ...prev, [id]: "loading" }));

    try {
      const res = await fetch(routes.api.adminContentResend(id), { method: "POST" });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };

      if (!res.ok) {
        throw new Error(json.error || "Resend failed.");
      }

      setResendState((prev) => ({
        ...prev,
        [id]: json.message || "Resend queued.",
      }));
    } catch (err) {
      setResendState((prev) => ({
        ...prev,
        [id]: err instanceof Error ? err.message : "Resend failed.",
      }));
    }
  };

  return (
    <div className="admin-content-list">
      {saved ? (
        <div className="mb-6 rounded-[var(--radius-md)] border border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.08)] p-4 text-sm text-[var(--color-success)]" role="status">
          {saved === "created" ? "Drop uploaded successfully." : "Drop updated successfully."}
        </div>
      ) : null}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
            Content management
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.04em]">
            All drops
          </h1>
        </div>
        <Link
          href={routes.admin.contentNew}
          className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand)] px-5 font-semibold text-white hover:bg-[var(--color-brand-hover)]"
        >
          New drop
        </Link>
      </div>

      <Input
        label="Search drops"
        placeholder="Filter by title, type, status, or style tag"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-[var(--color-text-muted)]">
          {rows.length === 0
            ? "No drops yet. Upload your first practice drop."
            : "No drops match your search."}
        </p>
      ) : (
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Style tag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.title}</TableCell>
                  <TableCell>{row.typeLabel}</TableCell>
                  <TableCell>{row.styleLabel ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(row.status)}>{row.status}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(row.publishedAt ?? row.scheduledFor)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Link
                        href={routes.admin.contentEdit(row.id)}
                        className="inline-flex min-h-9 items-center rounded-[var(--radius-md)] px-3 text-sm font-semibold text-[var(--color-brand)] hover:bg-[var(--color-brand-muted)]"
                      >
                        Edit
                      </Link>
                      {row.status === "published" ? (
                        <button
                          type="button"
                          onClick={() => handleResend(row.id)}
                          className="inline-flex min-h-9 items-center rounded-[var(--radius-md)] px-3 text-sm font-semibold text-[var(--color-text-muted)] hover:bg-[var(--color-surface-raised)]"
                        >
                          Resend
                        </button>
                      ) : null}
                      {row.status !== "archived" ? (
                        <AdminSoftDeleteDialog
                          contentId={row.id}
                          title={row.title}
                          triggerLabel="Archive"
                        />
                      ) : null}
                    </div>
                    {resendState[row.id] ? (
                      <p className="mt-2 text-xs text-[var(--color-text-dim)]">
                        {resendState[row.id]}
                      </p>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

    </div>
  );
}
