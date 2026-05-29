import Link from "next/link";
import { ButtonLink } from "@/components/marketing/button-link";
import { DashboardScrollReveal } from "@/components/dashboard/dashboard-scroll-reveal";
import { DashboardUpcomingRail } from "@/components/dashboard/dashboard-upcoming-rail";
import { routes } from "@/lib/routes";

const STARTER_CATEGORIES = [
  {
    id: "starter-bassless",
    title: "Bass-less Covers",
    text: "Songs from TikTok, without the bass. Drop in and play the part.",
    meta: "Weekly",
  },
  {
    id: "starter-grooves",
    title: "Grooves",
    text: "Short patterns for pocket, timing, and clean repetition.",
    meta: "Weekly",
  },
  {
    id: "starter-fills",
    title: "Fills",
    text: "Transitions you reuse in songs, rehearsals, and short videos.",
    meta: "Short drops",
  },
  {
    id: "starter-challenges",
    title: "Challenges",
    text: "A clear practice target for the week. Record it, share it, move.",
    meta: "Weekly goal",
  },
] as const;

type Props = {
  upcomingTargetIso: string | null;
  upcoming: Parameters<typeof DashboardUpcomingRail>[0]["upcoming"];
};

export function DashboardEmptyState({ upcomingTargetIso, upcoming }: Props) {
  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <DashboardScrollReveal>
          <section className="basscally-depth-card relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
              Dashboard empty state
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black leading-[0.95] tracking-[-0.03em]">
              Your practice room is <span className="text-[var(--color-brand)]">open.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[length:var(--text-body)] text-[var(--color-text-muted)]">
              No drops have landed yet. When Chris publishes the first one, it appears here with
              audio, difficulty, notes, and a download button.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="#starter-categories" className="landing-cta-glow">
                Preview starter categories
              </ButtonLink>
              <ButtonLink href={routes.member.account} variant="secondary">
                View membership
              </ButtonLink>
              <ButtonLink href={routes.home} variant="ghost">
                Back to home
              </ButtonLink>
            </div>
            <dl className="mt-8 grid gap-4 border-t border-[var(--color-border)] pt-6 sm:grid-cols-3">
              <div>
                <dt className="font-[family-name:var(--font-display)] text-2xl font-black">0</dt>
                <dd className="text-sm text-[var(--color-text-muted)]">Drops published</dd>
              </div>
              <div>
                <dt className="font-[family-name:var(--font-display)] text-2xl font-black">Weekly</dt>
                <dd className="text-sm text-[var(--color-text-muted)]">Release rhythm</dd>
              </div>
              <div>
                <dt className="font-[family-name:var(--font-display)] text-2xl font-black">$1.50</dt>
                <dd className="text-sm text-[var(--color-text-muted)]">Founding price</dd>
              </div>
            </dl>
          </section>
        </DashboardScrollReveal>

        <DashboardUpcomingRail upcoming={upcoming} nextDropIso={upcomingTargetIso} />
      </div>

      <div id="starter-categories">
        <DashboardScrollReveal delayMs={80}>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
                Starter categories
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-black tracking-[-0.03em]">
                What will appear here
              </h2>
            </div>
            <p className="text-sm text-[var(--color-text-dim)]">Content cards unlock on publish</p>
          </div>
        </DashboardScrollReveal>

        <section
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Starter category cards"
        >
          {STARTER_CATEGORIES.map((card, index) => (
            <DashboardScrollReveal key={card.id} delayMs={index * 60}>
              <article className="flex h-full flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-border-strong)]">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">{card.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{card.text}</p>
                </div>
                <p className="mt-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
                  {card.meta}
                </p>
              </article>
            </DashboardScrollReveal>
          ))}
        </section>
      </div>

      <DashboardScrollReveal delayMs={120}>
        <p className="text-sm text-[var(--color-text-dim)]">
          Need help while you wait?{" "}
          <Link href={routes.home} className="text-[var(--color-brand)] hover:underline">
            Explore the Hub
          </Link>{" "}
          or check your welcome email for community links.
        </p>
      </DashboardScrollReveal>
    </div>
  );
}
