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
import { ResendMagicLinkButton } from "@/components/checkout/checkout-meter";
import { IconCheck } from "@/components/icons";
import { ButtonLink } from "@/components/marketing/button-link";
import { SocialFollowLinks } from "@/components/social/social-follow-links";
import { Badge } from "@/components/ui/badge";
import type { CheckoutSuccessContext } from "@/lib/checkout/success-context";
import { hasWhatsAppCommunityLink, whatsappCommunityUrl } from "@/lib/social-links";
import { routes } from "@/lib/routes";

type Props = {
  context: CheckoutSuccessContext;
};

export function CheckoutSuccessContent({ context }: Props) {
  const showWhatsApp = hasWhatsAppCommunityLink();
  const emailLine = context.email
    ? `We sent your magic link to ${context.email}.`
    : "We sent your magic link to the email you used at checkout.";

  return (
    <CheckoutFlowPage>
      <CheckoutHeroGrid>
        <div>
          <CheckoutEyebrow>Checkout success</CheckoutEyebrow>
          <CheckoutHeadline id="success-title">
            Your Hub pass is <span className="text-[var(--color-brand)]">live.</span>
          </CheckoutHeadline>
          <CheckoutLede>
            Payment received. {emailLine} Open it, land in the dashboard, and start with
            the latest drop. No password needed.
          </CheckoutLede>
          <CheckoutCtaRow>
            <ButtonLink href={routes.member.dashboard} className="landing-cta-glow max-[680px]:w-full">
              Go to dashboard
            </ButtonLink>
          </CheckoutCtaRow>
          {showWhatsApp ? (
            <div className="checkout-rise checkout-rise-delay-3 mt-6 max-w-[560px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--color-text)]">
                Join the WhatsApp community
              </h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Get monthly challenges, updates, and practice prompts.
              </p>
              <ButtonLink
                href={whatsappCommunityUrl}
                variant="secondary"
                className="mt-4 max-[680px]:w-full"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join Basscally WhatsApp community"
              >
                Join WhatsApp community
              </ButtonLink>
            </div>
          ) : null}
          <div className="checkout-rise checkout-rise-delay-3 mt-4">
            <ResendMagicLinkButton email={context.email} />
          </div>
          <CheckoutFinePrint>
            Magic link explanation: one tap signs you in. Access is tied to your checkout email.
            {context.dataSource === "subscription" ? " Membership details below are from your live subscription." : null}
          </CheckoutFinePrint>
        </div>

        <CheckoutPassCard aria-label="Membership pass">
          <div className="flex items-start justify-between gap-3">
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-dim)]">
              Basscally membership pass
            </span>
            <Badge variant={context.hasLiveSubscription ? "active" : "warning"} className="text-[10px]">
              {context.statusLabel}
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
            {context.isFounding ? "Founding member access" : context.planLabel}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {context.priceLabel} — webhook-populated membership from Lemon Squeezy.
          </p>
          <hr className="my-5 border-[var(--color-border)]" />
          <dl className="space-y-3">
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-[var(--color-text-muted)]">Plan</dt>
              <dd className="font-semibold text-[var(--color-text)]">{context.planLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-[var(--color-text-muted)]">Price</dt>
              <dd className="font-semibold text-[var(--color-text)]">{context.priceLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-[var(--color-text-muted)]">Status</dt>
              <dd className="font-semibold text-[var(--color-text)]">{context.statusLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-[var(--color-text-muted)]">Next renewal</dt>
              <dd className="font-semibold text-[var(--color-text)]">{context.renewalLabel}</dd>
            </div>
            {context.email ? (
              <div className="flex justify-between gap-4 text-sm">
                <dt className="text-[var(--color-text-muted)]">Email</dt>
                <dd className="truncate font-semibold text-[var(--color-text)]">{context.email}</dd>
              </div>
            ) : null}
          </dl>
        </CheckoutPassCard>
      </CheckoutHeroGrid>

      <CheckoutStepCards
        items={[
          {
            id: "success-step-payment",
            label: "Step 01",
            title: "Payment received",
            body: "Lemon Squeezy confirmed your membership and created your Hub access.",
          },
          {
            id: "success-step-magic-link",
            label: "Step 02",
            title: "Magic link sent",
            body: "Open the email on your phone or laptop. It signs you in without a password.",
          },
          {
            id: "success-step-practice",
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
            id: "success-next-latest-drop",
            title: "Latest drop",
            body: "Your dashboard opens with the newest groove, fill, challenge, or bass-less cover first.",
          },
          {
            id: "success-next-whatsapp",
            title: showWhatsApp ? "Join the community" : "Community invite",
            body: showWhatsApp
              ? "Use the WhatsApp community card above for monthly challenges, updates, and practice prompts."
              : "Community invite will be sent in your welcome email.",
          },
          {
            id: "success-next-download",
            title: "Download offline",
            body: "Files stay ready for practice. Download when you have access, play anywhere.",
          },
        ]}
      />

      <section
        aria-label="Follow Basscally on social media"
        className="checkout-rise mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
      >
        <h2 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--color-text)]">
          Follow along
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Clips, grooves, and practice energy between drops.
        </p>
        <SocialFollowLinks layout="buttons" className="mt-4" />
      </section>

      <CheckoutControlRoom
        aria-label="Need help"
        items={[
          {
            id: "success-help-processing",
            title: "Payment still processing?",
            body: "It can take a minute for your membership to activate. Access updates automatically after payment.",
          },
          {
            id: "success-help-email",
            title: "No email yet?",
            body: "Check spam and promotions. Use Resend magic link above with your checkout email.",
          },
          {
            id: "success-help-stuck",
            title: "Still stuck?",
            body: "Email basscally.enquiry@gmail.com with your checkout email and we will help you in.",
          },
        ]}
      />
    </CheckoutFlowPage>
  );
}
