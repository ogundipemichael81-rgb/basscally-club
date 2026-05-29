"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

type Props = {
  contentId: string;
  title: string;
  triggerLabel?: string;
  redirectTo?: string;
};

export function AdminSoftDeleteDialog({
  contentId,
  title,
  triggerLabel = "Archive",
  redirectTo,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleArchive = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(routes.api.adminContentById(contentId), {
        method: "DELETE",
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        throw new Error(json.error || "Could not archive drop.");
      }

      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
        return;
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not archive drop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="inline-flex min-h-9 items-center rounded-[var(--radius-md)] px-3 text-sm font-semibold text-[var(--color-danger)] hover:bg-[rgba(248,113,113,0.08)]">
        {triggerLabel}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Archive this drop?</DialogTitle>
        <p className="mt-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
          soft delete
        </p>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          <strong className="text-[var(--color-text)]">{title}</strong> will be
          soft deleted. Status becomes archived, download links break for members,
          and admins can restore later from the content list.
        </p>
        {error ? (
          <p className="mt-3 text-sm text-[var(--color-danger)]" role="alert">
            {error}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            disabled={loading}
            onClick={handleArchive}
            className="border-[rgba(248,113,113,0.35)] text-[var(--color-danger)]"
          >
            {loading ? "Archiving…" : "Yes, archive drop"}
          </Button>
          <DialogClose className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand)] px-5 font-semibold text-white hover:bg-[var(--color-brand-hover)]">
            Keep drop
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
