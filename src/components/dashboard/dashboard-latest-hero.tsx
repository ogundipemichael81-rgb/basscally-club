import { ContentDownloadButton } from "@/components/content/content-download-button";
import { ButtonLink } from "@/components/marketing/button-link";
import { DashboardScrollReveal } from "@/components/dashboard/dashboard-scroll-reveal";
import { Badge } from "@/components/ui/badge";
import {
  difficultyBadgeVariant,
  formatDropDate,
} from "@/lib/dashboard/format";
import type { DashboardContentItem } from "@/lib/dashboard/types";
import { routes } from "@/lib/routes";

type Props = {
  item: DashboardContentItem;
};

export function DashboardLatestHero({ item }: Props) {
  return (
    <DashboardScrollReveal>
      <section
        className="basscally-depth-card grid gap-6 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:p-8"
        aria-label="Latest drop hero"
      >
        <div className="flex min-w-0 flex-col justify-between gap-6">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="brand">Latest drop</Badge>
              <Badge variant="default">{item.typeLabel}</Badge>
              {item.difficulty ? (
                <Badge variant={difficultyBadgeVariant(item.difficulty)}>{item.difficulty}</Badge>
              ) : null}
            </div>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-black leading-[0.95] tracking-[-0.03em]">
              {item.title}
            </h2>
            {item.description ? (
              <p className="mt-3 max-w-2xl text-[length:var(--text-body)] text-[var(--color-text-muted)]">
                {item.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3 max-[680px]:flex-col">
            <ButtonLink
              href={routes.member.content(item.id)}
              className="landing-cta-glow max-[680px]:w-full"
            >
              Play
            </ButtonLink>
            <ContentDownloadButton
              contentId={item.id}
              className="max-[680px]:w-full"
            />
          </div>
        </div>

        <div
          className="relative min-h-[180px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[radial-gradient(circle_at_30%_20%,rgba(255,69,0,0.18),transparent_55%),var(--color-surface-raised)]"
          aria-hidden
        >
          {item.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.coverUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col justify-end p-5">
              <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
                {formatDropDate(item.publishedAt)}
              </p>
              <p className="font-[family-name:var(--font-display)] text-2xl font-black leading-none">
                Pocket
                <br />
                first.
              </p>
            </div>
          )}
        </div>
      </section>
    </DashboardScrollReveal>
  );
}
