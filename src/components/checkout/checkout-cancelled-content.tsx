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

const passRows = [
  { id: "cancel-pass-checkout", label: "Checkout", value: "Not completed" },
  { id: "cancel-pass-access", label: "Access", value: "Not active yet" },
  { id: "cancel-pass-files", label: "Files", value: "Ready after payment" },
  { id: "cancel-pass-time", label: "Time", value: "Under 2 minutes" },
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
            You left checkout before payment finished. Basscally Hub is still open, and the founding
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
            Practice material every week
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Bass-less covers, grooves, fills, and challenges. Built for players who want reps, not
            another bloated course.
          </p>
          <hr className="my-5 border-[var(--color-border)]" />
          <dl className="space-y-3">
            {passRows.map((row) => (
              <div key={row.id} className="flex justify-between gap-4 text-sm">
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
            id: "cancelled-step-retry",
            label: "Option 01",
            title: "Try again",
            body: "Return to Lemon Squeezy checkout and complete the same plan.",
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
            body: "The songs you see Chris cover, without the bass. Drop in and play the part.",
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
          {
            id: "cancelled-value-challenges",
            title: "Challenges",
            body: "A clear bass goal every week. Record it, share it, keep moving.",
          },
        ]}
      />

      <CheckoutControlRoom
        aria-label="Need help"
        items={[
          {
            id: "cancelled-help-payment",
            title: "Payment did not go through?",
            body: "Return to checkout and try again with the same plan or a different card.",
          },
          {
            id: "cancelled-help-declined",
            title: "Card declined?",
            body: "Try another payment method or contact your bank, then complete checkout again.",
          },
          {
            id: "cancelled-help-questions",
            title: "Questions before you join?",
            body: "Read the FAQ on the home page or email basscally.enquiry@gmail.com — we are happy to help.",
          },
        ]}
      />

    </CheckoutFlowPage>
  );
}
