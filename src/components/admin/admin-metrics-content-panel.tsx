"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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

type Props = {
  rows: AdminContentRow[];
};

export function AdminMetricsContentPanel({ rows }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows.slice(0, 8);
    return rows
      .filter(
        (row) =>
          row.title.toLowerCase().includes(q) ||
          row.typeLabel.toLowerCase().includes(q) ||
          row.status.toLowerCase().includes(q),
      )
      .slice(0, 12);
  }, [query, rows]);

  return (
    <section className="basscally-depth-card rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
            Recent content
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Search drops and jump to edit.
          </p>
        </div>
        <Link
          href={routes.admin.content}
          className="text-sm font-semibold text-[var(--color-brand)] hover:underline"
        >
          Full content list
        </Link>
      </div>

      <Input
        label="Search content"
        placeholder="Filter by title, type, or status"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-[var(--color-text-muted)]">No drops match.</p>
      ) : (
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.title}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(row.status)}>{row.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={routes.admin.contentEdit(row.id)}
                      className="text-sm font-semibold text-[var(--color-brand)] hover:underline"
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
