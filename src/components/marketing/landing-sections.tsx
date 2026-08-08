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
    id: "value-bassless-covers",
    title: "Bass-less Covers",
    desc: "The songs you see Chris and world-class bassists cover — without the bass. Drop in, play the part, sound huge.",
  },
  {
    id: "value-grooves",
    title: "Grooves",
    desc: "Short, looped patterns to lock in your pocket. Fresh grooves weekly. Easy on day one, addictive by day ten.",
  },
  {
    id: "value-fills",
    title: "Fills",
    desc: "The transitions that separate beginners from players. Steal them. Reuse them. Make them yours.",
  },
  {
    id: "value-weekly-challenges",
    title: "Weekly Challenges",
    desc: "A bass goal to hit every week. Record it, share it, level up. Recognition in the Hub.",
  },
] as const;

const howItWorksSteps = [
  { id: "how-join", step: "Step 01", strong: "Start My Free Trial", rest: " during Founding Week." },
  {
    id: "how-email",
    step: "Step 02",
    strong: "Get a weekly email",
    rest: " when a new drop lands.",
  },
  {
    id: "how-practice",
    step: "Step 03",
    strong: "Open the dashboard,",
    rest: " download the audio, and practice.",
  },
] as const;

const whoItsForItems = [
  { id: "who-structure", text: "Self-taught bassists who want structure without a teacher" },
  { id: "who-tiktok", text: "Players who learned the basics on TikTok and are ready to go deeper" },
  { id: "who-price", text: "Anyone who's tired of paying $20 for a single masterclass" },
  {
    id: "who-global",
    text: "Bassists anywhere on Earth — Africa, UK, US, Asia, Latin America, Europe",
  },
] as const;

const whoItsNotForItems = [
  { id: "not-curriculum", text: "People who want a structured curriculum from beginner to pro" },
  { id: "not-lessons", text: "Players looking for one-on-one lessons (we'll have that later)" },
  { id: "not-practice", text: "Anyone who doesn't actually want to practice" },
] as const;

const testimonials = [
  {
    id: "testimonial-tiktok-1",
    quote:
      "I've been looking for something exactly like this. Finally, practice material that's actually fun and keeps coming.",
    author: "Hub member — TikTok",
  },
  {
    id: "testimonial-tiktok-2",
    quote:
      "Bro you need to make a course or something. I'd pay for more content like this every week.",
    author: "Hub member — TikTok",
  },
  {
    id: "testimonial-instagram-1",
    quote:
      "This is making me actually practice consistently for the first time in years. The grooves are addictive.",
    author: "Hub member — Instagram",
  },
] as const;

const socialProofStats = [
  { id: "stat-tiktok-followers", value: "90,000+", label: "TikTok followers" },
  { id: "stat-instagram-followers", value: "10,000+", label: "Instagram followers" },
  { id: "stat-avg-views", value: "20k–400k", label: "Avg. video views" },
] as const;

const priceComparisonRows = [
  { id: "compare-masterclass", label: "Typical bass masterclass", price: "$20–$50/mo" },
  { id: "compare-lesson", label: "One-on-one bass lesson", price: "$40–$80/hr" },
  { id: "compare-tabs", label: "Bass tab subscription", price: "$10–$15/mo" },
  { id: "compare-hub", label: "Basscally Hub", price: "$1.50/mo" },
] as const;

export function LandingSections() {
  return (
    <>
      <MarketingSection id="what-you-get">
        <SectionLabel>What&apos;s inside</SectionLabel>
        <h2 className="mb-8 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight text-[var(--color-text)]">
          What you get, every week
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueCards.map((card, index) => (
            <Card
              key={card.id}
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
          {howItWorksSteps.map((item) => (
            <li
              key={item.id}
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
          Who Basscally Hub is for
        </h2>
        <div className="grid gap-10 lg:grid-cols-2">
          <ul className="space-y-4">
            {whoItsForItems.map((item) => (
              <li key={item.id} className="flex gap-3 text-[var(--color-text-muted)]">
                <span className="mt-0.5 text-[var(--color-success)]" aria-hidden>
                  <IconCheck />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
          <div>
            <h3 className="mb-4 text-xl font-semibold text-[var(--color-text)]">Who it&apos;s NOT for</h3>
            <ul className="space-y-4">
              {whoItsNotForItems.map((item) => (
                <li key={item.id} className="flex gap-3 text-[var(--color-text-muted)]">
                  <span className="mt-0.5 text-[var(--color-danger)]" aria-hidden>
                    <IconX />
                  </span>
                  {item.text}
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
          {testimonials.map((item, index) => (
            <Card
              key={item.id}
              className={cn(
                "landing-interactive-card landing-rise motion-reduce:hover:translate-y-0",
                testimonialDelays[index],
              )}
            >
              <p className="mb-4 text-[var(--color-text-muted)]">&ldquo;{item.quote}&rdquo;</p>
              <p className="text-sm text-[var(--color-text-dim)]">{item.author}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {socialProofStats.map((stat) => (
            <div key={stat.id} className="text-center lg:text-left">
              <p className="font-[family-name:var(--font-display)] text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-[var(--color-text-dim)]">{stat.label}</p>
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
              Most bass platforms cost $20, $30, $50 a month — gatekeeping serious players behind serious money. We built Basscally Hub for every bassist with internet, anywhere on Earth.
            </p>
            <p className="text-[var(--color-text-muted)]">
              Your trial starts immediately. Your Founding Member price stays locked.
            </p>
          </div>
          <div>
            <SectionLabel>Price comparison</SectionLabel>
            <ul className="mt-4 space-y-3">
              {priceComparisonRows.map((row, i) => (
                <li
                  key={row.id}
                  className={`flex justify-between gap-4 rounded-[var(--radius-md)] border px-4 py-3 text-sm ${
                    i === priceComparisonRows.length - 1
                      ? "border-[rgba(255,69,0,0.35)] bg-[var(--color-brand-muted)] text-[var(--color-text)]"
                      : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                  }`}
                >
                  <span>{row.label}</span>
                  <span className="font-semibold">{row.price}</span>
                </li>
              ))}
            </ul>
          </div>
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
            For less than a coffee, get a new bass practice drop every week.
          </p>
          <ButtonLink
            href={routes.join}
            size="lg"
            className="landing-cta-glow group mx-auto mt-8 w-full max-w-md sm:w-auto"
          >
            Start My Free Trial
            <IconArrowRight className="transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </ButtonLink>
        </div>
      </MarketingSection>
    </>
  );
}
