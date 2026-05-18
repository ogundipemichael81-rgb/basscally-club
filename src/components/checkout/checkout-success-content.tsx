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
import { IconCheck } from "@/components/icons";
import { ButtonLink } from "@/components/marketing/button-link";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";

const passRows = [
  { label: "Plan", value: "Club monthly" },
  { label: "Price", value: "$1.50/month" },
  { label: "Status", value: "Magic link sent" },
  { label: "Next renewal", value: "Shown in your account" },
];

export function CheckoutSuccessContent() {
  return (
    <CheckoutFlowPage>
      <CheckoutHeroGrid>
        <div>
          <CheckoutEyebrow>Checkout complete</CheckoutEyebrow>
          <CheckoutHeadline id="success-title">
            Your Club pass is <span className="text-[var(--color-brand)]">live.</span>
          </CheckoutHeadline>
          <CheckoutLede>
            Payment received. We sent your magic link to the email you used at checkout. Open
            it, land in the dashboard, and start with the latest drop.
          </CheckoutLede>
          <CheckoutCtaRow>
            <ButtonLink href={routes.auth.login} className="max-[680px]:w-full">
              Go to sign in
            </ButtonLink>
          </CheckoutCtaRow>
          <CheckoutFinePrint>
            No password needed · Access is tied to your email ·{" "}
            <a
              href={routes.auth.login}
              className="inline-flex min-h-11 items-center text-[var(--color-brand)] underline decoration-[var(--color-brand)]/40 underline-offset-2 hover:text-[var(--color-text)]"
            >
              Resend magic link
            </a>
          </CheckoutFinePrint>
        </div>

        <CheckoutPassCard aria-label="Membership pass">
          <div className="flex items-start justify-between gap-3">
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-dim)]">
              Basscally pass
            </span>
            <Badge variant="active" className="text-[10px]">
              Active
            </Badge>
          </div>
          <div className="checkout-vinyl-wrap decorative-motion my-6" aria-hidden>
            <div className="checkout-vinyl relative flex h-full w-full items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[radial-gradient(circle_at_30%_30%,#2a2a30,#0d0d0f_70%)] shadow-[inset_0_0_0_12px_rgba(0,0,0,0.35)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success)] text-[var(--color-bg)]">
                <IconCheck className="h-7 w-7" />
              </div>
            </div>
          </div>
          <h2 className="relative z-[2] font-[family-name:var(--font-display)] text-2xl font-black tracking-[-0.02em]">
            Founding member access
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Your $1.50/month membership is now attached to your checkout email.
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
        </CheckoutPassCard>
      </CheckoutHeroGrid>

      <CheckoutStepCards
        items={[
          {
            label: "Step 01",
            title: "Payment received",
            body: "Lemon Squeezy confirmed your membership and created your Club access.",
          },
          {
            label: "Step 02",
            title: "Magic link sent",
            body: "Open the email on your phone or laptop. It signs you in without a password.",
          },
          {
            label: "Step 03",
            title: "Practice starts",
            body: "Open the dashboard, play the latest drop, download the file, and lock in.",
          },
        ]}
      />

      <CheckoutControlRoom
        aria-label="What happens next"
        items={[
          {
            title: "Latest drop",
            body: "Your dashboard opens with the newest groove, fill, challenge, or bass-less cover first.",
          },
          {
            title: "Every 3 days",
            body: "New practice material lands on schedule. No searching. No noise.",
          },
          {
            title: "Download offline",
            body: "Files stay ready for practice. Download when you have access, play anywhere.",
          },
          {
            title: "Membership",
            body: "Cancel anytime from your account. You keep access until the end of your paid period.",
          },
        ]}
      />

      <CheckoutControlRoom
        aria-label="Need help"
        items={[
          {
            title: "Payment still processing?",
            body: "It can take a minute for your membership to activate. Access updates automatically after payment.",
          },
          {
            title: "No email yet?",
            body: "Check spam and promotions. Use Resend magic link above or sign in with the same email you used at checkout.",
          },
          {
            title: "Still stuck?",
            body: "Email basscally.enquiry@gmail.com with your checkout email and we will help you in.",
          },
        ]}
      />

    </CheckoutFlowPage>
  );
}
