import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { IconArrowRight, IconCheck, IconX } from "@/components/icons";
import { ButtonLink } from "@/components/marketing/button-link";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { SectionLabel } from "@/components/marketing/section-label";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const valueCardDelays = [
  "landing-rise-delay-1",
  "landing-rise-delay-2",
  "landing-rise-delay-3",
  "landing-rise-delay-4",
] as const;

const testimonialDelays = [
  "landing-rise-delay-1",
  "landing-rise-delay-2",
  "landing-rise-delay-3",
] as const;

function MarketingSection({
  id,
  children,
  riseClassName = "landing-rise",
}: {
  id: string;
  children: ReactNode;
  riseClassName?: string;
}) {
  return (
    <section
      id={id}
      className="border-t border-[var(--color-border)] py-12 lg:py-[var(--space-10)]"
    >
      <div className={cn("basscally-container", riseClassName)}>{children}</div>
    </section>
  );
}

const valueCards = [
  {
    title: "Bass-less Covers",
    desc: "The songs you see Chris cover on TikTok — without the bass. Drop in, play the part, sound huge.",
  },
  {
    title: "Grooves",
    desc: "Short, looped patterns to lock in your pocket. New ones every 3 days. Easy on day one, addictive by day ten.",
  },
  {
    title: "Fills",
    desc: "The transitions that separate beginners from players. Steal them. Reuse them. Make them yours.",
  },
  {
    title: "Weekly Challenges",
    desc: "A bass goal to hit every week. Record it, share it, level up. Recognition in the Club.",
  },
];

export function LandingSections() {
  return (
    <>
      <MarketingSection id="what-you-get">
        <SectionLabel>What&apos;s inside</SectionLabel>
        <h2 className="mb-8 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight text-[var(--color-text)]">
          What you get, every 3 days
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueCards.map((card, index) => (
            <Card
              key={card.title}
              className={cn(
                "landing-interactive-card landing-rise motion-reduce:hover:translate-y-0",
                valueCardDelays[index],
              )}
            >
              <h3 className="mb-2 font-semibold text-[var(--color-text)]">{card.title}</h3>
              <p className="text-[length:var(--text-body-sm)] text-[var(--color-text-muted)]">
                {card.desc}
              </p>
            </Card>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection id="how-it-works" riseClassName="landing-rise">
        <SectionLabel>How it works</SectionLabel>
        <h2 className="mb-8 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight">
          How it works
        </h2>
        <ol className="grid gap-4 lg:grid-cols-3">
          {[
            { step: "Step 01", strong: "Join the Club", rest: " for $1.50/month." },
            { step: "Step 02", strong: "Get an email every 3 days", rest: " when a new drop lands." },
            { step: "Step 03", strong: "Open the dashboard,", rest: " download the audio, and practice." },
          ].map((item) => (
            <li
              key={item.step}
              className="landing-interactive-card basscally-depth-card rounded-[var(--radius-lg)] p-6 motion-reduce:hover:translate-y-0"
            >
              <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--color-brand)]">
                {item.step}
              </span>
              <p className="mt-3 text-[var(--color-text-muted)]">
                <strong className="text-[var(--color-text)]">{item.strong}</strong>
                {item.rest}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[var(--color-text-muted)]">
          That&apos;s it. No app to install. No course to finish. Just practice material in your inbox, forever.
        </p>
      </MarketingSection>

      <MarketingSection id="who-its-for">
        <SectionLabel>Who it&apos;s for</SectionLabel>
        <h2 className="mb-8 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight">
          Who Basscally Club is for
        </h2>
        <div className="grid gap-10 lg:grid-cols-2">
          <ul className="space-y-4">
            {[
              "Self-taught bassists who want structure without a teacher",
              "Players who learned the basics on TikTok and are ready to go deeper",
              "Anyone who's tired of paying $20 for a single masterclass",
              "Bassists anywhere on Earth — Africa, UK, US, Asia, Latin America, Europe",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[var(--color-text-muted)]">
                <span className="mt-0.5 text-[var(--color-success)]" aria-hidden>
                  <IconCheck />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div>
            <h3 className="mb-4 text-xl font-semibold text-[var(--color-text)]">Who it&apos;s NOT for</h3>
            <ul className="space-y-4">
              {[
                "People who want a structured curriculum from beginner to pro",
                "Players looking for one-on-one lessons (we'll have that later)",
                "Anyone who doesn't actually want to practice",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[var(--color-text-muted)]">
                  <span className="mt-0.5 text-[var(--color-danger)]" aria-hidden>
                    <IconX />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection id="social-proof">
        <SectionLabel>From the community</SectionLabel>
        <h2 className="mb-8 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight">
          Real bassists. Real progress.
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            ["I've been looking for something exactly like this. Finally, practice material that's actually fun and keeps coming.", "Club member — TikTok"],
            ["Bro you need to make a course or something. I'd pay for more content like this every week.", "Club member — TikTok"],
            ["This is making me actually practice consistently for the first time in years. The grooves are addictive.", "Club member — Instagram"],
          ].map(([quote, author], index) => (
            <Card
              key={author}
              className={cn(
                "landing-interactive-card landing-rise motion-reduce:hover:translate-y-0",
                testimonialDelays[index],
              )}
            >
              <p className="mb-4 text-[var(--color-text-muted)]">&ldquo;{quote}&rdquo;</p>
              <p className="text-sm text-[var(--color-text-dim)]">{author}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {[
            ["90,000+", "TikTok followers"],
            ["10,000+", "Instagram followers"],
            ["20k–400k", "Avg. video views"],
          ].map(([value, label]) => (
            <div key={label} className="text-center lg:text-left">
              <p className="font-[family-name:var(--font-display)] text-2xl font-bold">{value}</p>
              <p className="text-sm text-[var(--color-text-dim)]">{label}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection id="why-price">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>The price</SectionLabel>
            <h2 className="mb-6 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight">
              Why $1.50?
            </h2>
            <p className="mb-5 text-[var(--color-text-muted)]">Because practice shouldn&apos;t cost a meal.</p>
            <p className="mb-5 text-[var(--color-text-muted)]">
              Most bass platforms cost $20, $30, $50 a month — gatekeeping serious players behind serious money. We built Basscally Club for every bassist with internet, anywhere on Earth.
            </p>
            <p className="text-[var(--color-text-muted)]">
              Cancel anytime. Keep everything you&apos;ve already downloaded.
            </p>
          </div>
          <div>
            <SectionLabel>Price comparison</SectionLabel>
            <ul className="mt-4 space-y-3">
              {[
                ["Typical bass masterclass", "$20–$50/mo"],
                ["One-on-one bass lesson", "$40–$80/hr"],
                ["Bass tab subscription", "$10–$15/mo"],
                ["Basscally Club", "$1.50/mo"],
              ].map(([label, price], i) => (
                <li
                  key={label}
                  className={`flex justify-between gap-4 rounded-[var(--radius-md)] border px-4 py-3 text-sm ${
                    i === 3
                      ? "border-[rgba(255,69,0,0.35)] bg-[var(--color-brand-muted)] text-[var(--color-text)]"
                      : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                  }`}
                >
                  <span>{label}</span>
                  <span className="font-semibold">{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection id="founding" riseClassName="landing-rise">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[rgba(255,69,0,0.25)] bg-[var(--color-brand-muted)] p-8 text-center lg:p-12">
          <div className="landing-rail-shimmer absolute inset-x-6 top-0 lg:inset-x-12" aria-hidden />
          <SectionLabel>Limited offer</SectionLabel>
          <h2 className="relative z-[1] mb-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight lg:text-4xl">
            Founding Member Offer
          </h2>
          <p className="relative z-[1] mx-auto mb-8 max-w-xl text-[var(--color-text-muted)]">
            The first 500 members lock in <strong className="text-[var(--color-text)]">$1.50/month for life</strong>. After that, the price goes up.
          </p>
          <ButtonLink
            href={routes.pricing}
            size="lg"
            className="landing-cta-glow group relative z-[1] mx-auto w-full max-w-md sm:w-auto"
          >
            Become a Founding Member — $1.50/month
            <IconArrowRight className="transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </ButtonLink>
          <p className="relative z-[1] mt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-dim)]">
            Founding member spots remaining: 500
          </p>
        </div>
      </MarketingSection>

      <MarketingSection id="faq">
        <SectionLabel>Questions</SectionLabel>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight">
          Frequently Asked Questions
        </h2>
        <FaqAccordion />
      </MarketingSection>

      <MarketingSection id="join" riseClassName="landing-rise">
        <div className="py-8 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
            Stop scrolling.
            <br />
            Start practicing.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-[var(--color-text-muted)]">
            For less than a coffee, get a new bass practice drop every 3 days.
          </p>
          <ButtonLink
            href={routes.pricing}
            size="lg"
            className="landing-cta-glow group mx-auto mt-8 w-full max-w-md sm:w-auto"
          >
            Join Basscally Club — $1.50/month
            <IconArrowRight className="transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </ButtonLink>
        </div>
      </MarketingSection>
    </>
  );
}
