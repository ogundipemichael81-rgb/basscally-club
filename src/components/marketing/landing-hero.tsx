import { IconArrowRight } from "@/components/icons";
import { ButtonLink } from "@/components/marketing/button-link";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const drops = [
  {
    num: "001 — TUE",
    title: "Funk slap pattern in E",
    tag: "Groove · Beginner · 2 min",
    next: true,
  },
  {
    num: "002 — FRI",
    title: "Bass-less: D'Angelo — Untitled",
    tag: "Cover · Intermediate · 4 min",
  },
  {
    num: "003 — MON",
    title: "Ghost-note fill, 16th-note pocket",
    tag: "Fill · Advanced · 1 min",
  },
];

export function LandingHero() {
  return (
    <section
      className="basscally-hero relative min-h-[calc(100vh-65px)] overflow-hidden px-6 py-16 lg:px-8 lg:py-[var(--space-10)]"
      aria-labelledby="hero-headline"
    >
      <div className="relative z-[1] mx-auto grid min-h-[calc(100vh-65px-var(--space-10)-var(--space-12))] max-w-[1320px] grid-cols-1 items-end gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col">
          <div className="mb-8 flex flex-wrap items-center gap-3 font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wide text-[var(--color-text-dim)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full" aria-hidden>
                <span className="hero-live-dot" />
              </span>
              Now accepting members
            </span>
            <span className="hidden h-px w-4 bg-[var(--color-border-strong)] sm:block" aria-hidden />
            <span>Issue 001 — May 2026</span>
          </div>

          <h1
            id="hero-headline"
            className="mb-6 font-[family-name:var(--font-display)] text-[clamp(2.5rem,11vw,9.25rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-[var(--color-text)]"
          >
            <span className="block">Practice</span>
            <span className="block pl-[0.18em]">with</span>
            <span className="block">
              <span className="italic text-[var(--color-brand)]">Basscally.</span>
            </span>
            <span className="block pl-[0.18em]">
              <span className="font-bold text-[var(--color-text-dim)] line-through decoration-[var(--color-brand)] decoration-4">
                $20
              </span>{" "}
              <span className="text-[var(--color-brand)]">$1.50</span>
              <span className="font-medium text-[var(--color-text-muted)]">/month.</span>
            </span>
          </h1>

          <p className="mb-8 max-w-[540px] text-[clamp(1.125rem,1.5vw,1.375rem)] leading-snug text-[var(--color-text-muted)]">
            New <strong className="font-medium text-[var(--color-text)]">bass-less covers, grooves, fills, and challenges</strong> —
            delivered to your inbox every 3 days. Practice on your time, from anywhere.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href={routes.pricing} size="lg" className="group w-full sm:w-auto">
              Join the Club — $1.50/month
              <IconArrowRight className="transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </ButtonLink>
            <span className="text-sm text-[var(--color-text-dim)]">
              Cancel anytime · No contracts
            </span>
          </div>
        </div>

        <aside aria-label="Upcoming drops" className="flex flex-col">
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
            {"// This week's drops"}
          </p>
          <ul className="flex flex-col gap-2">
            {drops.map((drop) => (
              <li
                key={drop.num}
                className={cn(
                  "basscally-depth-card flex gap-3 rounded-[var(--radius-md)] p-4",
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
          <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-text-muted)]">
            <span>Next drop in</span>
            <span className="font-[family-name:var(--font-mono)] font-semibold text-[var(--color-text)]">
              02d : 14h
            </span>
          </div>
        </aside>
      </div>

      <div className="relative z-[1] mx-auto mt-12 flex max-w-[1320px] flex-col gap-8 border-t border-[var(--color-border)] pt-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid min-w-0 grid-cols-3 gap-3 sm:gap-6">
          {[
            { label: "TikTok", value: "90,000+" },
            { label: "Instagram", value: "10,000+" },
            { label: "Avg. views", value: "20k–400k" },
          ].map((stat) => (
            <div key={stat.label} className="min-w-0">
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
