"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  subject: string;
  body: string;
};

export function AdminEmailPreviewDialog({ subject, body }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-transparent px-5 font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-raised)]">
        Preview email
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogTitle>Email preview</DialogTitle>
        <p className="mt-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
          email preview
        </p>
        <div className="mt-4 space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-dim)]">
              Subject
            </p>
            <p className="mt-1 text-sm text-[var(--color-text)]">
              {subject.trim() || "Add a subject to preview the notification."}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-dim)]">
              Body
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-[var(--color-text-muted)]">
              {body.trim() || "Add email body copy to preview what members receive."}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <DialogClose className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand)] px-5 font-semibold text-white hover:bg-[var(--color-brand-hover)]">
            Close preview
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
