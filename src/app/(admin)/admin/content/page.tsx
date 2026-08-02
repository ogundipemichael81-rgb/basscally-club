import { Suspense } from "react";
import { AdminContentList } from "@/components/admin/admin-content-list";
import { listAdminContent } from "@/lib/admin/content/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content list — Basscally Admin",
  description: "Manage all Basscally Hub practice drops.",
};

export default async function AdminContentListPage() {
  const rows = await listAdminContent();

  return (
    <Suspense fallback={<div className="text-sm text-[var(--color-text-muted)]">Loading content list…</div>}>
      <AdminContentList rows={rows} />
    </Suspense>
  );
}
