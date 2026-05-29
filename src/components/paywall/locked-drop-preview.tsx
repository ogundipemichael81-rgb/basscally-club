import { Badge } from "@/components/ui/badge";
import { difficultyBadgeVariant } from "@/lib/dashboard/format";
import type { ContentDetail } from "@/lib/content/queries";

type Props = {
  content: ContentDetail | null;
};

export function LockedDropPreview({ content }: Props) {
  return (
    <article
      className="basscally-depth-card flex flex-col justify-between overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
      aria-label="Locked practice drop preview"
    >
      <div>
        <div
          className="relative h-[220px] overflow-hidden rounded-[var(--radius-lg)] border border-[rgba(255,255,255,0.08)] sm:h-[280px]"
          role="img"
          aria-label={
            content
              ? `Locked cover art preview for ${content.title}`
              : "Locked cover art preview"
          }
        >
          {content?.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={content.coverUrl}
              alt=""
              className="h-full w-full scale-105 object-cover blur-md saturate-50"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_25%_25%,rgba(255,69,0,0.65),transparent_22%),linear-gradient(135deg,#371207_0%,#171719_46%,#070708_100%)] blur-sm" />
          )}
          <div className="absolute inset-0 bg-[rgba(6,6,7,0.45)] backdrop-blur-[2px]" />
          <div className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(6,6,7,0.72)] text-[var(--color-brand)] shadow-[0_18px_42px_rgba(0,0,0,0.45)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
              aria-hidden
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        <div className="mt-5 select-none opacity-80 blur-[1.2px]">
          {content ? (
            <>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">{content.typeLabel}</Badge>
                {content.difficulty ? (
                  <Badge variant={difficultyBadgeVariant(content.difficulty)}>
                    {content.difficulty}
                  </Badge>
                ) : null}
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-black tracking-[-0.03em]">
                {content.title}
              </h2>
            </>
          ) : (
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black tracking-[-0.03em]">
              Members-only practice drop
            </h2>
          )}
          <div className="mt-3 h-3 w-[88%] rounded-full bg-[rgba(255,255,255,0.08)]" />
          <div className="mt-2 h-3 w-[66%] rounded-full bg-[rgba(255,255,255,0.08)]" />
        </div>
      </div>

      <p className="mt-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
        Blurred preview — full audio unlocks with membership
      </p>
    </article>
  );
}
