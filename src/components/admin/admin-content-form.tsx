"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AdminEmailPreviewDialog } from "@/components/admin/admin-email-preview-dialog";
import { AdminSoftDeleteDialog } from "@/components/admin/admin-soft-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTENT_DIFFICULTIES,
  CONTENT_TYPE_LABELS,
  CONTENT_TYPES,
  PUBLISH_ACTIONS,
} from "@/lib/admin/content/constants";
import type { AdminContentDetail, StyleOption } from "@/lib/admin/content/queries";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type PublishAction = (typeof PUBLISH_ACTIONS)[number];

type Props = {
  mode: "create" | "edit";
  styles: StyleOption[];
  initial?: AdminContentDetail;
};

function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function initialPublishAction(content?: AdminContentDetail): PublishAction {
  if (!content) return "draft";
  if (content.status === "scheduled") return "scheduled";
  if (content.status === "published") return "publish_now";
  return "draft";
}

const PUBLISH_LABELS: Record<PublishAction, { title: string; hint: string }> = {
  draft: { title: "Draft", hint: "Save without sending" },
  scheduled: { title: "Scheduled", hint: "Publish later" },
  publish_now: { title: "Publish now", hint: "Queue member email" },
};

export function AdminContentForm({ mode, styles, initial }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [type, setType] = useState<(typeof CONTENT_TYPES)[number]>(
    (initial?.type as (typeof CONTENT_TYPES)[number]) ?? "groove",
  );
  const [difficulty, setDifficulty] = useState<string>(
    initial?.difficulty ?? "beginner",
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [styleId, setStyleId] = useState(initial?.styleId ?? "");
  const [scheduledFor, setScheduledFor] = useState(
    toDatetimeLocalValue(initial?.scheduledFor),
  );
  const [publishAction, setPublishAction] = useState<PublishAction>(
    initialPublishAction(initial),
  );
  const [emailSubject, setEmailSubject] = useState(initial?.emailSubject ?? "");
  const [emailBody, setEmailBody] = useState(initial?.emailBody ?? "");
  const [isFreePreview, setIsFreePreview] = useState(initial?.isFreePreview ?? false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const pageTitle = mode === "create" ? "Upload drop" : "Edit drop";
  const saveLabel =
    publishAction === "publish_now"
      ? "Save drop"
      : publishAction === "scheduled"
        ? "Schedule drop"
        : "Save draft";

  const checklist = useMemo(
    () => ({
      audio: Boolean(audioFile || initial?.audioStorageKey),
      metadata: Boolean(title.trim() && type && difficulty),
      email:
        publishAction === "draft" ||
        Boolean(emailSubject.trim() && emailBody.trim()),
    }),
    [
      audioFile,
      initial?.audioStorageKey,
      title,
      type,
      difficulty,
      publishAction,
      emailSubject,
      emailBody,
    ],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.set("title", title);
    formData.set("type", type);
    formData.set("difficulty", difficulty);
    formData.set("description", description);
    if (styleId) formData.set("styleId", styleId);
    formData.set("scheduledFor", scheduledFor);
    formData.set("publishAction", publishAction);
    formData.set("emailSubject", emailSubject);
    formData.set("emailBody", emailBody);
    formData.set("isFreePreview", String(isFreePreview));
    if (audioFile) formData.set("audio", audioFile);
    if (coverFile) formData.set("cover", coverFile);

    const endpoint =
      mode === "create"
        ? routes.api.adminContent
        : routes.api.adminContentById(initial!.id);
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const res = await fetch(endpoint, { method, body: formData });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        id?: string;
      };

      if (!res.ok) {
        throw new Error(json.error || "Could not save drop.");
      }

      setSuccess(mode === "create" ? "Drop uploaded successfully." : "Drop updated successfully.");
      router.push(`${routes.admin.content}?saved=${mode === "create" ? "created" : "updated"}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save drop.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
            Admin upload form
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.04em] lg:text-5xl">
            {pageTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
            Audio upload, metadata, artist/style tag, status toggle, and member
            email on one admin surface.
          </p>
        </div>
        <Link
          href={routes.admin.content}
          className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] px-5 font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-raised)]"
        >
          Content list
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"
        aria-label="Admin content upload form"
      >
        <div className="basscally-depth-card space-y-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6">
          <section aria-label="Audio upload">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
              Audio file
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold">
              Drop source
            </h2>
            <label
              className="mt-4 flex min-h-[188px] cursor-pointer flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] bg-[radial-gradient(circle_at_30%_0,rgba(255,69,0,0.09),transparent_36%),rgba(6,6,7,0.38)] p-6 text-center transition hover:border-[rgba(255,69,0,0.55)]"
              aria-label="Upload audio file"
            >
              <input
                type="file"
                accept="audio/mpeg,audio/wav,audio/mp3,audio/x-wav,.mp3,.wav"
                className="sr-only"
                onChange={(event) => setAudioFile(event.target.files?.[0] ?? null)}
              />
              <span className="font-[family-name:var(--font-display)] text-xl font-bold">
                Drop audio here
              </span>
              <span className="mt-2 text-sm text-[var(--color-text-muted)]">
                MP3 or WAV. Max 50MB. Private storage. Signed downloads only.
              </span>
              {audioFile ? (
                <span className="mt-3 text-sm text-[var(--color-success)]">
                  Selected: {audioFile.name}
                </span>
              ) : initial?.audioStorageKey ? (
                <span className="mt-3 text-sm text-[var(--color-text-dim)]">
                  Current: {initial.audioStorageKey.split("/").pop()}
                </span>
              ) : null}
            </label>
          </section>

          <section aria-label="Metadata">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
              Metadata
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold">
              What members see
            </h2>
            <div className="mt-4 space-y-4">
              <Input
                label="Title"
                value={title}
                maxLength={80}
                required
                onChange={(event) => setTitle(event.target.value)}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Select
                  label="Content type"
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value as (typeof CONTENT_TYPES)[number])
                  }
                >
                  {CONTENT_TYPES.map((value) => (
                    <option key={value} value={value}>
                      {CONTENT_TYPE_LABELS[value]}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Difficulty"
                  value={difficulty}
                  onChange={(event) => setDifficulty(event.target.value)}
                >
                  {CONTENT_DIFFICULTIES.map((value) => (
                    <option key={value} value={value}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </option>
                  ))}
                </Select>
              </div>
              <Textarea
                label="Description"
                value={description}
                maxLength={500}
                onChange={(event) => setDescription(event.target.value)}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                    Cover image (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-[var(--color-text-muted)] file:mr-4 file:rounded-[var(--radius-md)] file:border-0 file:bg-[var(--color-surface-raised)] file:px-4 file:py-2 file:font-semibold file:text-[var(--color-text)]"
                    onChange={(event) => setCoverFile(event.target.files?.[0] ?? null)}
                  />
                </div>
                <Input
                  label="Release date"
                  type="datetime-local"
                  value={scheduledFor}
                  onChange={(event) => setScheduledFor(event.target.value)}
                />
              </div>
              <Select
                label="Artist / style tag"
                value={styleId}
                onChange={(event) => setStyleId(event.target.value)}
              >
                <option value="">No style tag</option>
                {styles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.label}
                  </option>
                ))}
              </Select>
              <p className="text-xs text-[var(--color-text-dim)]">
                artist style tag — links this drop to style pages and the conversion
                funnel.
              </p>
              <label className="flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-3 text-sm">
                <input type="checkbox" checked={isFreePreview} onChange={(event) => setIsFreePreview(event.target.checked)} className="h-5 w-5 accent-[var(--color-brand)]" />
                Make this the free preview sample
              </label>
              <p className="text-xs text-[var(--color-text-dim)]">Only one published drop can be the unpaid preview. If another published preview exists, saving will safely fail until it is changed.</p>
            </div>
          </section>

          <section aria-label="Publish status">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
              Publish status
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold">
              Status toggle
            </h2>
            <div
              className="mt-4 grid gap-3 md:grid-cols-3"
              role="radiogroup"
              aria-label="Publish status"
            >
              {PUBLISH_ACTIONS.map((action) => (
                <button
                  key={action}
                  type="button"
                  role="radio"
                  aria-checked={publishAction === action}
                  onClick={() => setPublishAction(action)}
                  className={cn(
                    "rounded-[var(--radius-lg)] border px-4 py-4 text-left transition",
                    publishAction === action
                      ? "border-[rgba(255,69,0,0.55)] bg-[rgba(42,20,8,0.5)]"
                      : "border-[var(--color-border)] bg-[rgba(20,20,22,0.78)] hover:border-[var(--color-border-strong)]",
                  )}
                >
                  <strong className="block text-sm">{PUBLISH_LABELS[action].title}</strong>
                  <span className="mt-1 block text-xs text-[var(--color-text-dim)]">
                    {PUBLISH_LABELS[action].hint}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section aria-label="Email notification">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
              Email notification
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold">
              Tell members clearly
            </h2>
            <div className="mt-4 space-y-4">
              <Input
                label="Email subject"
                value={emailSubject}
                onChange={(event) => setEmailSubject(event.target.value)}
              />
              <Textarea
                label="Email body"
                value={emailBody}
                onChange={(event) => setEmailBody(event.target.value)}
              />
            </div>
          </section>

          {error ? (
            <div
              className="rounded-[var(--radius-md)] border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.08)] p-4 text-sm text-[var(--color-danger)]"
              role="alert"
            >
              {error}
            </div>
          ) : null}
          {success ? (
            <div className="rounded-[var(--radius-md)] border border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.08)] p-4 text-sm text-[var(--color-success)]" role="status">
              {success}
            </div>
          ) : null}

          <div className="grid gap-3 border-t border-[var(--color-border)] pt-6 md:grid-cols-3">
            <Link
              href={routes.admin.content}
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] px-5 font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-raised)]"
            >
              Cancel
            </Link>
            <AdminEmailPreviewDialog subject={emailSubject} body={emailBody} />
            <Button type="submit" disabled={submitting} className="min-h-11">
              {submitting ? "Saving…" : saveLabel}
            </Button>
          </div>
        </div>

        <aside className="basscally-depth-card h-fit rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6 xl:sticky xl:top-24">
          <div
            className="mb-5 h-[220px] rounded-[var(--radius-lg)] border border-[rgba(255,255,255,0.08)] bg-[radial-gradient(circle_at_20%_20%,rgba(255,69,0,0.55),transparent_24%),linear-gradient(135deg,#2b1209_0%,#17171a_48%,#080809_100%)]"
            role="img"
            aria-label="Drop preview cover"
            style={
              initial?.coverUrl
                ? {
                    backgroundImage: `url(${initial.coverUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          />
          <div className="flex flex-wrap gap-2">
            <Badge variant="brand">{CONTENT_TYPE_LABELS[type]}</Badge>
            <Badge variant="default">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold">
            {title.trim() || "New practice drop"}
          </h2>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            {description.trim() || "Description preview appears here."}
          </p>
          {styleId ? (
            <p className="mt-4 text-sm text-[var(--color-text-dim)]">
              Style tag:{" "}
              {styles.find((style) => style.id === styleId)?.label ?? "Selected"}
            </p>
          ) : null}

          <div className="mt-6 space-y-3 border-t border-[var(--color-border)] pt-6">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
              Publish checklist
            </p>
            <ChecklistItem done={checklist.audio} title="Audio attached" />
            <ChecklistItem done={checklist.metadata} title="Metadata complete" />
            <ChecklistItem done={checklist.email} title="Email ready" />
          </div>

          {mode === "edit" && initial && initial.status !== "archived" ? (
            <div className="mt-6 border-t border-[var(--color-border)] pt-6">
              <AdminSoftDeleteDialog
                contentId={initial.id}
                title={initial.title}
                triggerLabel="Soft delete drop"
                redirectTo={routes.admin.content}
              />
            </div>
          ) : null}
        </aside>
      </form>
    </div>
  );
}

function ChecklistItem({ done, title }: { done: boolean; title: string }) {
  return (
    <div className="grid grid-cols-[24px_1fr] gap-3">
      <span
        className={cn(
          "mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full text-xs",
          done
            ? "bg-[rgba(52,211,153,0.12)] text-[var(--color-success)]"
            : "bg-[rgba(255,255,255,0.04)] text-[var(--color-text-dim)]",
        )}
      >
        {done ? "✓" : "·"}
      </span>
      <strong className="text-sm text-[var(--color-text)]">{title}</strong>
    </div>
  );
}
