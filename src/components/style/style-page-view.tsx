import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/icons";
import { ButtonLink } from "@/components/marketing/button-link";
import { SectionLabel } from "@/components/marketing/section-label";
import {
  STYLE_UNLOCK_SENTINEL_ID,
  StyleMobileCtaBar,
} from "@/components/style/style-mobile-cta-bar";
import { TrackPreviewPlayer } from "@/components/style/track-preview-player";
import { APP_NAME } from "@/lib/constants";
import { routes } from "@/lib/routes";
import type { StylePageData } from "@/lib/style/types";
import { cn } from "@/lib/utils";

type Props = {
  data: StylePageData;
  checkoutHref: string;
};

export function StylePageView({ data, checkoutHref }: Props) {
  return (
    <div className="relative pb-24 lg:pb-16">
      <section className="basscally-hero relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="basscally-container grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)] lg:py-16">
          <div className="landing-rise min-w-0">
            <SectionLabel>{data.artist.name}</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,7vw,3.5rem)] font-extrabold leading-[0.95] tracking-tight">
              {data.headline}
            </h1>
            {data.description ? (
              <p className="mt-4 max-w-xl text-lg text-[var(--color-text-muted)]">
                {data.description}
              </p>
            ) : null}
            <div
              id={STYLE_UNLOCK_SENTINEL_ID}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <ButtonLink
                href={checkoutHref}
                size="lg"
                className="landing-cta-glow group w-full sm:w-auto"
              >
                Unlock all tracks — $1.50/month
                <IconArrowRight className="transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </ButtonLink>
              <Link
                href={routes.home}
                className="text-center text-sm text-[var(--color-text-dim)] hover:text-[var(--color-brand)] sm:text-left"
              >
                ← Back to {APP_NAME}
              </Link>
            </div>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-dim)]">
              Three-click flow: Hub → this style page → checkout
            </p>
          </div>

          <div
            className={cn(
              "landing-rise landing-rise-delay-1 relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)]",
              !data.heroImageUrl && "flex items-center justify-center",
            )}
            aria-label={`${data.artist.name} hero`}
          >
            {data.heroImageUrl ? (
              <Image
                src={data.heroImageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            ) : (
              <div className="p-8 text-center">
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text-muted)]">
                  {data.artist.name}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-dim)]">{data.title}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] py-12 lg:py-16">
        <div className="basscally-container landing-rise">
          <SectionLabel>Practice previews</SectionLabel>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight lg:text-3xl">
            Hear what you will practice
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--color-text-muted)]">
            Play a <strong className="text-[var(--color-text)]">30-second gated preview</strong> on
            each track. Full audio unlocks with your Basscally Hub membership.
          </p>
          <ul className="mt-8 flex flex-col gap-4">
            {data.tracks.map((track) => (
              <li key={track.id}>
                <TrackPreviewPlayer track={track} unlockHref={checkoutHref} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="basscally-container landing-rise">
          <SectionLabel>What you will learn</SectionLabel>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight lg:text-3xl">
            Inside this style
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {data.learnPoints.map((point, index) => (
              <li
                key={`learn-${index}`}
                className="basscally-depth-card rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 text-sm text-[var(--color-text-muted)]"
              >
                <span className="mr-2 text-[var(--color-brand)]" aria-hidden>
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <ButtonLink href={checkoutHref} size="lg" className="landing-cta-glow mx-auto w-full max-w-md">
              Unlock all tracks — $1.50/month
            </ButtonLink>
          </div>
        </div>
      </section>

      <StyleMobileCtaBar checkoutHref={checkoutHref} />
    </div>
  );
}
