import { requireAdminPage } from "@/lib/admin/auth";
import { notFound } from "next/navigation";
import { AdminContentForm } from "@/components/admin/admin-content-form";
import {
  getAdminContentById,
  listStyleOptions,
} from "@/lib/admin/content/queries";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const content = await getAdminContentById(id);

  return {
    title: content
      ? `Edit ${content.title} — Basscally Admin`
      : "Edit drop — Basscally Admin",
  };
}

export default async function AdminContentEditPage({ params }: Props) {
  await requireAdminPage();
  const { id } = await params;
  const [content, styles] = await Promise.all([
    getAdminContentById(id),
    listStyleOptions(),
  ]);

  if (!content) {
    notFound();
  }

  return <AdminContentForm mode="edit" styles={styles} initial={content} />;
}