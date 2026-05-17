import {
  CheckoutControlRoom,
  CheckoutCtaRow,
  CheckoutEyebrow,
  CheckoutFinePrint,
  CheckoutFlowPage,
  CheckoutHeadline,
  CheckoutHeroGrid,
  CheckoutLede,
  CheckoutPassCard,
  CheckoutStateGrid,
  CheckoutStepCards,
} from "@/components/checkout/checkout-flow-page";
import { ButtonLink } from "@/components/marketing/button-link";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";

const passRows = [
  { label: "Checkout", value: "Not completed" },
  { label: "Access", value: "Not active yet" },
  { label: "Files", value: "Ready after payment" },
  { label: "Time", value: "Under 2 minutes" },
];

export function CheckoutCancelledContent() {
  return (
    <CheckoutFlowPage>
      <CheckoutHeroGrid>
        <div>
          <CheckoutEyebrow>Checkout paused</CheckoutEyebrow>
          <CheckoutHeadline id="cancelled-title">
            No stress. Your spot is still <span className="text-[var(--color-brand)]">here.</span>
          </CheckoutHeadline>
          <CheckoutLede>
            You left checkout before payment finished. The Club is still open, and the founding
            member price is still waiting.
          </CheckoutLede>
          <CheckoutCtaRow>
            <ButtonLink href={routes.pricing} className="max-[680px]:w-full">
              Return to checkout
            </ButtonLink>
            <ButtonLink
              href={`${routes.home}#faq`}
              variant="secondary"
              className="max-[680px]:w-full"
            >
              See what you get
            </ButtonLink>
          </CheckoutCtaRow>
          <CheckoutFinePrint>
            Cancel anytime · No contracts · Downloadable audio
          </CheckoutFinePrint>
        </div>

        <CheckoutPassCard aria-label="Founding member price">
          <div className="flex items-start justify-between gap-3">
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-dim)]">
              Founding offer
            </span>
            <Badge variant="brand" className="text-[10px]">
              Still open
            </Badge>
          </div>
          <div className="my-6 grid grid-cols-2 gap-4 max-[680px]:grid-cols-1">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[rgba(6,6,7,0.42)] p-5">
              <small className="mb-2 block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
                Today
              </small>
              <strong className="font-[family-name:var(--font-display)] text-[34px] leading-none tracking-[-0.03em]">
                $1.50
              </strong>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[rgba(6,6,7,0.42)] p-5">
              <small className="mb-2 block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
                Later
              </small>
              <strong className="font-[family-name:var(--font-display)] text-[34px] leading-none tracking-[-0.03em]">
                Goes up
              </strong>
            </div>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-black tracking-[-0.02em]">
            Practice material every 3 days
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Bass-less covers, grooves, fills, and challenges. Built for players who want reps, not
            another bloated course.
          </p>
          <hr className="my-5 border-[var(--color-border)]" />
          <dl className="space-y-3">
            {passRows.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 text-sm">
                <dt className="text-[var(--color-text-muted)]">{row.label}</dt>
                <dd className="font-semibold text-[var(--color-text)]">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="lost-note mt-5 border-l-2 border-[var(--color-brand)] pl-4 text-sm text-[var(--color-text-muted)]">
            No account was charged on this page. Return to checkout when you are ready.
          </p>
        </CheckoutPassCard>
      </CheckoutHeroGrid>

      <CheckoutStepCards
        items={[
          {
            label: "Option 01",
            title: "Try again",
            body: "Return to Lemon Squeezy checkout and complete the same plan.",
          },
          {
            label: "Option 02",
            title: "Use another card",
            body: "If the first card failed, try another card or payment method at checkout.",
          },
          {
            label: "Option 03",
            title: "Ask for help",
            body: "Message the team if checkout fails twice. We will help you get in.",
          },
        ]}
      />

      <CheckoutControlRoom
        aria-label="What you were about to get"
        items={[
          {
            title: "Bass-less covers",
            body: "The songs you see Chris cover, without the bass. Drop in and play the part.",
          },
          {
            title: "Grooves",
            body: "Short patterns for pocket, timing, and consistency.",
          },
          {
            title: "Fills",
            body: "Transitions you can steal, repeat, and make yours.",
          },
          {
            title: "Challenges",
            body: "A clear bass goal every week. Record it, share it, keep moving.",
          },
        ]}
      />

      <CheckoutStateGrid
        items={[
          {
            title: "Default state",
            body: "User cancelled checkout or closed the payment window.",
          },
          {
            title: "Payment failed state",
            body: "Same layout, but badge changes to payment failed and CTA says Try another card.",
          },
          {
            title: "Expired link state",
            body: "Same recovery screen, with a fresh checkout CTA generated by the app.",
          },
        ]}
      />

    </CheckoutFlowPage>
  );
}
