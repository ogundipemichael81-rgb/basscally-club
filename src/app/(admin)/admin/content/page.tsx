import { requireAdminPage } from "@/lib/admin/auth";
import { Suspense } from "react";
import { AdminContentList } from "@/components/admin/admin-content-list";
import { listAdminContent, type AdminContentRow } from "@/lib/admin/content/queries";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Content list",
  description: "Manage all Basscally Hub practice drops.",
};

export default async function AdminContentListPage() {
  await requireAdminPage();
  let rows: AdminContentRow[] = [];
  let loadError: string | null = null;
  try {
    rows = await listAdminContent();
  } catch (error) {
    loadError = "Content could not be loaded.";
    console.error("[admin-content] list failed", error instanceof Error ? error.message : "unknown error");
  }

  return (
    <Suspense fallback={<div className="text-sm text-[var(--color-text-muted)]">Loading content list…</div>}>
      <AdminContentList rows={rows} loadError={loadError} />
    </Suspense>
  );
}
