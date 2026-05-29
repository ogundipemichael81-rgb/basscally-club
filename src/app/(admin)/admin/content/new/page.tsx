import { AdminContentForm } from "@/components/admin/admin-content-form";
import { listStyleOptions } from "@/lib/admin/content/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload drop — Basscally Admin",
  description: "Upload audio, metadata, and publish a new Basscally Hub practice drop.",
};

export default async function AdminContentNewPage() {
  const styles = await listStyleOptions();

  return <AdminContentForm mode="create" styles={styles} />;
}
