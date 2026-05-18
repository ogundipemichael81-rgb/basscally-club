import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/marketing/button-link";
import { SectionLabel } from "@/components/marketing/section-label";
import { MotionDiv } from "@/components/ui/motion";
import { PLANS, PRICING_DISPLAY_ORDER, type PlanDefinition } from "@/lib/plans";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const badgeVariantMap = {
  brand: "brand",
  success: "success",
  info: "info",
  warn: "warning",
} as const;

function PlanPriceCard({ plan }: { plan: PlanDefinition }) {
  return (
    <article
      className={cn(
        "basscally-panel-card relative overflow-hidden flex min-h-[420px] flex-col gap-[18px] rounded-[var(--radius-xl)] border p-6 transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[rgba(255,69,0,0.45)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.72),0_0_44px_rgba(255,69,0,0.1)] motion-reduce:hover:translate-y-0 max-[680px]:min-h-0",
        plan.highlighted &&
          "border-[rgba(255,69,0,0.62)] shadow-[0_22px_70px_rgba(0,0,0,0.72),0_0_52px_rgba(255,69,0,0.18)]",
      )}
    >
      <div className="relative z-[1] flex flex-1 flex-col gap-[18px]">
        <Badge variant={badgeVariantMap[plan.badgeTone]} className="w-fit text-[10px]">
          {plan.badge}
        </Badge>
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-[30px] font-black tracking-[-0.03em]">
            {plan.label}
          </h3>
          <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{plan.description}</p>
        </div>
        <div className="font-[family-name:var(--font-display)] text-[58px] font-black leading-[0.9] tracking-[-0.05em]">
          {plan.priceAmount}{" "}
          <small className="text-[15px] font-bold tracking-normal text-[var(--color-text-muted)]">
            {plan.pricePeriod}
          </small>
        </div>
        <ul className="flex flex-col gap-2.5 text-sm text-[var(--color-text-muted)]">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <b className="text-[var(--color-brand)]">✓</b>
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <ButtonLink
            href={routes.checkout.success}
            variant={plan.highlighted ? "primary" : "secondary"}
            className="w-full"
          >
            {plan.ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

function PricingOrbitPanel() {
  return (
    <aside className="basscally-panel-card relative overflow-hidden rounded-[var(--radius-xl)] border p-6">
      <div className="relative z-[1]">
        <div
          className="pricing-orbit-wrap decorative-motion mx-auto my-1"
          aria-hidden
        >
          <div className="pricing-orbit-ring absolute inset-0 rounded-full border border-[rgba(255,69,0,0.2)]" />
          <div className="pricing-orbit-ring-2 absolute inset-[26px] rounded-full border border-[rgba(255,255,255,0.08)] max-[680px]:inset-[22px]" />
          <div className="pricing-orbit-ring-3 absolute inset-[58px] rounded-full border border-[rgba(255,92,31,0.26)] max-[680px]:inset-[48px]" />
          <div className="pricing-orbit-rotator absolute inset-0">
            <span className="pricing-orbit-dot" />
          </div>
          <div className="pricing-orbit-core absolute inset-[70px] z-[1] flex items-center justify-center rounded-full bg-[var(--color-brand)] font-[family-name:var(--font-display)] text-[44px] font-black text-white shadow-[0_0_70px_rgba(255,69,0,0.52)] max-[680px]:inset-[56px] max-[680px]:text-[36px]">
            $
          </div>
        </div>
        <h3 className="relative z-[2] mt-2 font-[family-name:var(--font-display)] text-[23px] font-black tracking-[-0.03em]">
          Simple billing rule
        </h3>
        <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
          One active subscription per user. Access follows webhook status. Dashboard,
          play, and downloads unlock only for active or grace-period members.
        </p>
        <hr className="my-[18px] border-[var(--color-border)]" />
        <div className="decorative-motion relative isolate h-11 overflow-hidden" aria-hidden>
          <div className="pricing-wave flex h-11 items-end gap-[5px]">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className="w-[7px] rounded-full bg-gradient-to-t from-[var(--color-brand)] to-[rgba(255,69,0,0.22)]"
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export function PricingPlanSelector() {
  const displayPlans = PRICING_DISPLAY_ORDER.map((code) => PLANS[code]);

  return (
    <div className="basscally-pricing-page relative min-h-full overflow-x-hidden px-5 py-7 pb-16 lg:px-8 lg:py-7 lg:pb-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <MotionDiv
            delayMs={0}
            className="basscally-panel-card relative overflow-hidden rounded-[var(--radius-xl)] border p-9 max-[680px]:p-[26px]"
          >
            <div className="relative z-[1]">
              <SectionLabel>Basscally Club pricing</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(28px,4vw,36px)] font-black tracking-[-0.03em] text-[var(--color-text)]">
                Choose your Club plan
              </h1>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(42px,6.5vw,82px)] font-black leading-[0.9] tracking-[-0.055em]">
                Lock your groove.
                <br />
                <span className="text-[var(--color-brand)] italic">Pay less yearly.</span>
              </h2>
              <p className="mt-[22px] max-w-[680px] text-[17px] leading-[1.55] text-[var(--color-text-muted)]">
                Choose the plan that fits how you practice.{" "}
                <strong className="text-[var(--color-text)]">Founding members</strong> keep
                the early price. Annual members save the most and reduce payment friction.
              </p>
              <hr className="my-[18px] border-[var(--color-border)]" />
              <div className="grid gap-[18px] sm:grid-cols-3">
                {[
                  { label: "Founding price", value: "$1.50" },
                  { label: "Public monthly", value: "$2.99" },
                  { label: "Annual lock-in", value: "$18" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[rgba(6,6,7,0.55)] p-[18px]"
                  >
                    <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
                      {stat.label}
                    </div>
                    <div className="mt-2 font-[family-name:var(--font-display)] text-[30px] font-black tracking-[-0.04em]">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionDiv>
          <MotionDiv delayMs={80}>
            <PricingOrbitPanel />
          </MotionDiv>
        </div>

        <section id="plans" className="grid gap-[18px] lg:grid-cols-3">
          {displayPlans.map((plan, index) => (
            <MotionDiv key={plan.code} delayMs={index * 80}>
              <PlanPriceCard plan={plan} />
            </MotionDiv>
          ))}
        </section>

        <div className="mt-[18px] grid gap-[18px] lg:grid-cols-2">
          <MotionDiv delayMs={240} className="basscally-panel-card relative overflow-hidden rounded-[var(--radius-xl)] border p-6">
            <div className="basscally-panel-content">
              <Badge variant="warning" className="mb-4 text-[10px]">
                Later tier
              </Badge>
              <h3 className="font-[family-name:var(--font-display)] text-[23px] font-black tracking-[-0.03em]">
                Club Plus stays hidden for MVP
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                The $9/month tier should wait until feedback, live challenges, or premium
                coaching becomes real. Do not show it in public checkout yet.
              </p>
            </div>
          </MotionDiv>
          <MotionDiv delayMs={320} className="basscally-panel-card relative overflow-hidden rounded-[var(--radius-xl)] border p-6">
            <div className="basscally-panel-content">
              <Badge variant="brand" className="mb-4 text-[10px]">
                Checkout flow
              </Badge>
              <h3 className="font-[family-name:var(--font-display)] text-[23px] font-black tracking-[-0.03em]">
                After payment
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                Lemon Squeezy confirms payment, webhook updates Supabase, user receives
                welcome email, then magic link opens the dashboard.
              </p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
