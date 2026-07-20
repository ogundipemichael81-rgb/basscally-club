import Link from "next/link";
import { DashboardScrollReveal } from "@/components/dashboard/dashboard-scroll-reveal";
import { Badge } from "@/components/ui/badge";
import {
  difficultyBadgeVariant,
  formatDropDate,
} from "@/lib/dashboard/format";
import type { DashboardContentItem } from "@/lib/dashboard/types";
import { routes } from "@/lib/routes";

type Props = {
  items: DashboardContentItem[];
};

function PlayIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7-11-7Z" />
    </svg>
  );
}

export function DashboardContentGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] p-8 text-center">
        <p className="font-[family-name:var(--font-display)] text-lg font-bold">No drops in this view</p>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Try another filter or download a drop from the library first.
        </p>
      </div>
    );
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Content grid">
      {items.map((item, index) => (
        <DashboardScrollReveal key={item.id} delayMs={index * 40}>
          <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors hover:border-[var(--color-border-strong)]">
            <Link
              href={routes.member.content(item.id)}
              className="content-card relative block aspect-[4/3] overflow-hidden bg-[var(--color-surface-raised)]"
            >
              {item.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.coverUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-[var(--motion-default)] group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full items-end bg-[radial-gradient(circle_at_30%_20%,rgba(255,69,0,0.12),transparent_60%),var(--color-surface-raised)] p-4">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
                    {item.typeLabel}
                  </span>
                </div>
              )}
              <span
                className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.35)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                aria-hidden
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-brand)] text-white">
                  <PlayIcon />
                </span>
              </span>
            </Link>

            <div className="flex flex-1 flex-col p-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">{item.typeLabel}</Badge>
                {item.difficulty ? (
                  <Badge variant={difficultyBadgeVariant(item.difficulty)}>{item.difficulty}</Badge>
                ) : null}
              </div>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold leading-tight">
                <Link href={routes.member.content(item.id)} className="hover:text-[var(--color-brand)]">
                  {item.title}
                </Link>
              </h3>
              {item.description ? (
                <p className="mt-2 line-clamp-2 text-sm text-[var(--color-text-muted)]">{item.description}</p>
              ) : null}
              <div className="mt-auto flex justify-between pt-4 text-xs text-[var(--color-text-dim)]">
                <span>Stream first</span>
                <span>{formatDropDate(item.publishedAt)}</span>
              </div>
            </div>
          </article>
        </DashboardScrollReveal>
      ))}
    </section>
  );
}
