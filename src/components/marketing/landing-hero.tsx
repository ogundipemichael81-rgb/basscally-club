import { IconArrowRight } from "@/components/icons";
import { ButtonLink } from "@/components/marketing/button-link";
import { HERO_CTA_SENTINEL_ID } from "@/components/marketing/mobile-cta-bar";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const dropRiseDelays = [
  "landing-rise-delay-2",
  "landing-rise-delay-3",
  "landing-rise-delay-4",
] as const;

const heroStats = [
  { id: "hero-stat-tiktok", label: "TikTok", value: "90,000+" },
  { id: "hero-stat-instagram", label: "Instagram", value: "10,000+" },
  { id: "hero-stat-views", label: "Avg. views", value: "20k–400k" },
] as const;

const drops = [
  {
    id: "drop-001",
    num: "001 — TUE",
    title: "Funk slap pattern in E",
    tag: "Groove · Beginner · 2 min",
    next: true,
  },
  {
    id: "drop-002",
    num: "002 — FRI",
    title: "Bass-less: D'Angelo — Untitled",
    tag: "Cover · Intermediate · 4 min",
  },
  {
    id: "drop-003",
    num: "003 — MON",
    title: "Ghost-note fill, 16th-note pocket",
    tag: "Fill · Advanced · 1 min",
  },
];

function LandingWaveBars() {
  return (
    <div
      className="landing-wave-motion-root decorative-motion relative isolate h-9 min-w-0 flex-1 overflow-hidden"
      aria-hidden
    >
      <div className="landing-wave flex h-9 items-end gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="w-[5px] rounded-full bg-gradient-to-t from-[var(--color-brand)] to-[rgba(255,69,0,0.22)]"
          />
        ))}
      </div>
    </div>
  );
}

function LandingDropsVisual() {
  return (
    <div className="landing-drops-stage basscally-depth-card mb-4 rounded-[var(--radius-md)] p-3">
      <div className="relative z-[1] flex items-end justify-between gap-3">
        <LandingWaveBars />
        <div
          className="landing-vinyl-pulse-wrap decorative-motion"
          aria-hidden
        >
          <div className="landing-vinyl-pulse" aria-hidden />
          <span className="landing-vinyl-pulse-ring" />
        </div>
      </div>
      <div className="landing-rail-shimmer mt-3 max-lg:hidden" aria-hidden />
    </div>
  );
}

export function LandingHero() {
  return (
    <section
      className="basscally-hero basscally-landing-hero relative min-h-0 overflow-hidden scroll-mt-20 px-6 pb-28 pt-[calc(var(--space-6)+4rem)] lg:min-h-[calc(100vh-65px)] lg:scroll-mt-0 lg:px-8 lg:py-[var(--space-10)] lg:pb-[var(--space-10)] lg:pt-[var(--space-10)]"
      aria-labelledby="hero-headline"
    >
      <div className="relative z-[1] mx-auto grid max-w-[1320px] grid-cols-1 items-end gap-12 lg:min-h-[calc(100vh-65px-var(--space-10)-var(--space-12))] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="landing-rise flex flex-col">
          <div className="mb-8 flex flex-wrap items-center gap-3 font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wide text-[var(--color-text-dim)]">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full"
                aria-hidden
              >
                <span className="hero-live-dot" />
              </span>
              Now accepting members
            </span>
            <span
              className="hidden h-px w-4 bg-[var(--color-border-strong)] sm:block"
              aria-hidden
            />
            <span>7 Days Free · Founding Price Locked</span>
          </div>

          <h1
            id="hero-headline"
            className="mb-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,11vw,9.25rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-[var(--color-text)] lg:mb-6"
          >
            <span className="block">Practice</span>
            <span className="block pl-[0.18em]">with</span>
            <span className="block">
              <span className="italic text-[var(--color-brand)]">Basscally.</span>
            </span>
            <span className="block pl-[0.18em] text-[var(--color-brand)]">7 Days Free.</span>
            <span className="block pl-[0.18em] text-[var(--color-text-dim)]">Founding Price Locked.</span>
          </h1>

          <div
            id={HERO_CTA_SENTINEL_ID}
            className="mb-6 flex flex-col gap-3 lg:mb-0 lg:hidden"
          >
            <ButtonLink
              href={routes.join}
              size="lg"
              className="landing-cta-glow group inline-flex w-full"
            >
              Start My Free Trial
              <IconArrowRight className="transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </ButtonLink>
            <span className="text-sm text-[var(--color-text-dim)]">
              No card required · Full access during Founding Week
            </span>
          </div>

          <p className="mb-6 max-w-[540px] text-[clamp(1.125rem,1.5vw,1.375rem)] leading-snug text-[var(--color-text-muted)] lg:mb-8">
            New{" "}
            <strong className="font-medium text-[var(--color-text)]">
              bass-less covers, grooves, fills, and challenges
            </strong>{" "}
            — from Chris and world-class bassists, delivered to your inbox weekly. Practice on your time, from anywhere.
          </p>

          <div className="hidden flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center lg:flex">
            <ButtonLink
              href={routes.join}
              size="lg"
              className="landing-cta-glow group w-full sm:w-auto"
            >
              Start My Free Trial
              <IconArrowRight className="transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </ButtonLink>
            <span className="text-sm text-[var(--color-text-dim)]">
              No card required · Full access during Founding Week
            </span>
          </div>
        </div>

        <aside
          aria-label="Upcoming drops"
          className="landing-rise landing-rise-delay-1 flex flex-col"
        >
          <p className="mb-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
            {"// This week's drops"}
          </p>
          <LandingDropsVisual />
          <ul className="flex flex-col gap-2">
            {drops.map((drop, index) => (
              <li
                key={drop.id}
                className={cn(
                  "landing-interactive-card landing-rise basscally-depth-card flex gap-3 rounded-[var(--radius-md)] p-4 motion-reduce:hover:translate-y-0",
                  dropRiseDelays[index],
                  drop.next && "border-[rgba(255,69,0,0.35)] bg-[var(--color-brand-muted)]",
                )}
              >
                <span className="shrink-0 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                  {drop.num}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-[var(--color-text)]">{drop.title}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">{drop.tag}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="landing-rise landing-rise-delay-5 mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-text-muted)]">
            <span>Next drop in</span>
            <span className="font-[family-name:var(--font-mono)] font-semibold text-[var(--color-text)]">
              02d : 14h
            </span>
          </div>
        </aside>
      </div>

      <div className="landing-rise landing-rise-delay-2 relative z-[1] mx-auto mt-12 flex max-w-[1320px] flex-col gap-8 border-t border-[var(--color-border)] pt-8 max-lg:mb-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid min-w-0 grid-cols-3 gap-3 sm:gap-6">
          {heroStats.map((stat) => (
            <div key={stat.id} className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-dim)] sm:text-xs">
                {stat.label}
              </p>
              <p className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-text)] sm:text-xl">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
          Trusted by bassists in
          <br />
          40+ countries — UK / US / NG / BR / JP
        </p>
      </div>
    </section>
  );
}
