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
  CheckoutStepCards,
} from "@/components/checkout/checkout-flow-page";
import { ButtonLink } from "@/components/marketing/button-link";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";

type Props = {
  foundingCheckoutHref: string;
  spotsRemaining: number | null;
};

export function CheckoutCancelledContent({
  foundingCheckoutHref,
  spotsRemaining,
}: Props) {
  const spotsNote =
    spotsRemaining !== null
      ? `${spotsRemaining} founding spots left at $1.50/month`
      : "Founding member price still $1.50/month";

  return (
    <CheckoutFlowPage>
      <CheckoutHeroGrid>
        <div>
          <CheckoutEyebrow>Checkout cancelled</CheckoutEyebrow>
          <CheckoutHeadline id="cancelled-title">
            No stress. Your spot is still <span className="text-[var(--color-brand)]">here.</span>
          </CheckoutHeadline>
          <CheckoutLede>
            You left checkout before payment finished. Basscally Hub is still open, and the founding
            member price is still waiting.
          </CheckoutLede>
          <CheckoutCtaRow>
            <ButtonLink href={foundingCheckoutHref} className="landing-cta-glow max-[680px]:w-full">
              Return to checkout — $1.50/mo
            </ButtonLink>
            <ButtonLink
              href={routes.defaultStyle}
              variant="secondary"
              className="max-[680px]:w-full"
            >
              See what you get
            </ButtonLink>
          </CheckoutCtaRow>
          <CheckoutFinePrint>
            {spotsNote} · Cancel anytime · No contracts
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
                Founding member
              </small>
              <strong className="font-[family-name:var(--font-display)] text-[34px] leading-none tracking-[-0.03em] text-[var(--color-brand)]">
                $1.50
              </strong>
              <span className="mt-1 block text-sm text-[var(--color-text-muted)]">/ month</span>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[rgba(6,6,7,0.42)] p-5">
              <small className="mb-2 block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
                Public monthly
              </small>
              <strong className="font-[family-name:var(--font-display)] text-[34px] leading-none tracking-[-0.03em]">
                $2.99
              </strong>
              <span className="mt-1 block text-sm text-[var(--color-text-muted)]">after founding</span>
            </div>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-black tracking-[-0.02em]">
            Practice material every week
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Bass-less covers, grooves, fills, and challenges. Built for players who want reps, not
            another bloated course.
          </p>
          <hr className="my-5 border-[var(--color-border)]" />
          <dl className="space-y-3">
            {[
              { id: "cancel-pass-checkout", label: "Checkout", value: "Not completed" },
              { id: "cancel-pass-access", label: "Access", value: "Not active yet" },
              { id: "cancel-pass-files", label: "Files", value: "Ready after payment" },
              { id: "cancel-pass-time", label: "Time", value: "Under 2 minutes" },
            ].map((row) => (
              <div key={row.id} className="flex justify-between gap-4 text-sm">
                <dt className="text-[var(--color-text-muted)]">{row.label}</dt>
                <dd className="font-semibold text-[var(--color-text)]">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="lost-note mt-5 border-l-2 border-[var(--color-brand)] pl-4 text-sm text-[var(--color-text-muted)]">
            No account was charged. Return to Lemon Squeezy checkout when you are ready.
          </p>
        </CheckoutPassCard>
      </CheckoutHeroGrid>

      <CheckoutStepCards
        items={[
          {
            id: "cancelled-step-retry",
            label: "Option 01",
            title: "Try again",
            body: "Return to Lemon Squeezy checkout and complete the founding member plan.",
          },
          {
            id: "cancelled-step-card",
            label: "Option 02",
            title: "Use another card",
            body: "If the first card failed, try another card or payment method at checkout.",
          },
          {
            id: "cancelled-step-help",
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
            id: "cancelled-value-covers",
            title: "Bass-less covers",
            body: "The songs you see Chris and world-class bassists cover, without the bass.",
          },
          {
            id: "cancelled-value-grooves",
            title: "Grooves",
            body: "Short patterns for pocket, timing, and consistency.",
          },
          {
            id: "cancelled-value-fills",
            title: "Fills",
            body: "Transitions you can steal, repeat, and make yours.",
          },
        ]}
      />

      <CheckoutControlRoom
        aria-label="Need help"
        items={[
          {
            id: "cancelled-help-payment",
            title: "Payment did not go through?",
            body: "Return to checkout and try again with the founding member plan.",
          },
          {
            id: "cancelled-help-declined",
            title: "Card declined?",
            body: "Try another payment method or contact your bank, then complete checkout again.",
          },
          {
            id: "cancelled-help-questions",
            title: "Questions before you join?",
            body: "Read the FAQ on the home page or email basscally.enquiry@gmail.com.",
          },
        ]}
      />
    </CheckoutFlowPage>
  );
}
