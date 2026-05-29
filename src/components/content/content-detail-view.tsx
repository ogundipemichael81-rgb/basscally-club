import Link from "next/link";
import { ContentAudioPlayer } from "@/components/content/content-audio-player";
import { ContentDownloadButton } from "@/components/content/content-download-button";
import { ContentShareButton } from "@/components/content/content-share-button";
import { DashboardScrollReveal } from "@/components/dashboard/dashboard-scroll-reveal";
import { Badge } from "@/components/ui/badge";
import {
  difficultyBadgeVariant,
  formatDropDate,
} from "@/lib/dashboard/format";
import type { ContentDetail } from "@/lib/content/queries";
import { routes } from "@/lib/routes";

type Props = {
  content: ContentDetail;
};

export function ContentDetailView({ content }: Props) {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <DashboardScrollReveal>
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
              Practice drop
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black leading-[0.95] tracking-[-0.03em]">
              {content.title}
            </h1>
            {content.description ? (
              <p className="mt-3 max-w-2xl text-[length:var(--text-body)] text-[var(--color-text-muted)]">
                {content.description}
              </p>
            ) : null}
          </div>
          <Link
            href={routes.member.dashboard}
            className="inline-flex min-h-11 items-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] px-5 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-raised)]"
          >
            Back to library
          </Link>
        </header>
      </DashboardScrollReveal>

      <DashboardScrollReveal delayMs={60}>
        <section className="basscally-depth-card grid gap-6 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div
            className="relative min-h-[180px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[radial-gradient(circle_at_30%_20%,rgba(255,69,0,0.18),transparent_55%),var(--color-surface-raised)]"
            aria-hidden
          >
            {content.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.coverUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full flex-col justify-end p-5">
                <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
                  {content.issueLabel ?? content.typeLabel}
                </p>
                <p className="font-[family-name:var(--font-display)] text-2xl font-black leading-none">
                  Pocket
                  <br />
                  first.
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="brand">{content.typeLabel}</Badge>
              {content.difficulty ? (
                <Badge variant={difficultyBadgeVariant(content.difficulty)}>
                  {content.difficulty}
                </Badge>
              ) : null}
              <Badge variant="default">{formatDropDate(content.publishedAt)}</Badge>
            </div>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
                <dt className="text-xs text-[var(--color-text-dim)]">Type</dt>
                <dd className="mt-1 text-sm font-semibold">{content.typeLabel}</dd>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
                <dt className="text-xs text-[var(--color-text-dim)]">Difficulty</dt>
                <dd className="mt-1 text-sm font-semibold capitalize">
                  {content.difficulty ?? "All levels"}
                </dd>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
                <dt className="text-xs text-[var(--color-text-dim)]">Published</dt>
                <dd className="mt-1 text-sm font-semibold">{formatDropDate(content.publishedAt)}</dd>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
                <dt className="text-xs text-[var(--color-text-dim)]">Downloads</dt>
                <dd className="mt-1 text-sm font-semibold">{content.downloadCount}</dd>
              </div>
              {content.issueLabel ? (
                <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 sm:col-span-2">
                  <dt className="text-xs text-[var(--color-text-dim)]">Issue</dt>
                  <dd className="mt-1 text-sm font-semibold">{content.issueLabel}</dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-6 flex flex-wrap gap-3 max-[680px]:flex-col">
              <ContentDownloadButton contentId={content.id} />
              <ContentShareButton contentId={content.id} title={content.title} />
            </div>
          </div>
        </section>
      </DashboardScrollReveal>

      <DashboardScrollReveal delayMs={120}>
        <ContentAudioPlayer contentId={content.id} title={content.title} />
      </DashboardScrollReveal>
    </div>
  );
}
