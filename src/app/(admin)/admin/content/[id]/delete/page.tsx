import { requireAdminPage } from "@/lib/admin/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminSoftDeleteDialog } from "@/components/admin/admin-soft-delete-dialog";
import { getAdminContentById } from "@/lib/admin/content/queries";
import { routes } from "@/lib/routes";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const content = await getAdminContentById(id);

  return {
    title: content
      ? `Archive ${content.title}`
      : "Archive drop",
  };
}

export default async function AdminContentDeletePage({ params }: Props) {
  await requireAdminPage();
  const { id } = await params;
  const content = await getAdminContentById(id);

  if (!content) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
        Soft delete confirmation
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.04em]">
        Archive this drop?
      </h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        <strong className="text-[var(--color-text)]">{content.title}</strong> will
        be hidden from members. Download links stop working until the drop is
        restored.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <AdminSoftDeleteDialog
          contentId={content.id}
          title={content.title}
          triggerLabel="Yes, archive drop"
          redirectTo={routes.admin.content}
        />
        <Link
          href={routes.admin.contentEdit(content.id)}
          className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand)] px-5 font-semibold text-white hover:bg-[var(--color-brand-hover)]"
        >
          Keep editing
        </Link>
      </div>
    </div>
  );
}
