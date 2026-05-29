import Link from "next/link";
import { ButtonLink } from "@/components/marketing/button-link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LEGAL_SUPPORT_EMAIL } from "@/content/legal";
import { routes } from "@/lib/routes";

const cancellationPoints = [
  {
    id: "cancel-anytime",
    title: "Cancel anytime",
    body: "Stop future renewals whenever you choose through our secure billing partner.",
  },
  {
    id: "cancel-access-period",
    title: "Access until period end",
    body: "After you cancel, you keep full member access until the end of your current paid billing period.",
  },
  {
    id: "cancel-no-refunds",
    title: "No mid-period refunds",
    body: "We do not offer pro-rata refunds for unused time in a billing period, except where the law requires or we agree in good faith.",
  },
  {
    id: "cancel-lemon-squeezy",
    title: "Billing through Lemon Squeezy",
    body: "Payments, invoices, and subscription changes are handled by Lemon Squeezy via the customer billing portal.",
  },
];

export function AccountCancelContent() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <CardHeader className="mb-2">
          <p className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
            Membership
          </p>
          <CardTitle className="text-[length:var(--text-h2)] font-bold tracking-tight">
            How cancellation works
          </CardTitle>
          <CardDescription className="text-[length:var(--text-body)] leading-relaxed">
            You can cancel your Basscally Hub membership at any time. There are no
            long-term contracts.
          </CardDescription>
        </CardHeader>

        <ul className="space-y-4 border-t border-[var(--color-border)] pt-6">
          {cancellationPoints.map((point) => (
            <li key={point.id} className="flex gap-3">
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand)]"
                aria-hidden
              />
              <div>
                <p className="font-semibold text-[var(--color-text)]">{point.title}</p>
                <p className="mt-1 text-[length:var(--text-body-sm)] leading-relaxed text-[var(--color-text-muted)]">
                  {point.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 border-t border-[var(--color-border)] pt-6 text-[length:var(--text-body-sm)] text-[var(--color-text-muted)]">
          Read more in our{" "}
          <Link
            href={`${routes.legal.terms}#cancellation`}
            className="inline-flex min-h-11 items-center text-[var(--color-brand)] underline decoration-[var(--color-brand)]/40 underline-offset-2 hover:text-[var(--color-text)]"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={`${routes.legal.refundPolicy}#cancellations`}
            className="inline-flex min-h-11 items-center text-[var(--color-brand)] underline decoration-[var(--color-brand)]/40 underline-offset-2 hover:text-[var(--color-text)]"
          >
            Refund Policy
          </Link>
          .
        </p>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[length:var(--text-h4)]">Manage your plan</CardTitle>
          <CardDescription>
            Cancel through the Lemon Squeezy customer portal linked from your account.
          </CardDescription>
        </CardHeader>

        <div className="flex flex-col gap-3">
          <ButtonLink
            href={routes.member.accountBillingPortal}
            className="w-full sm:w-auto"
          >
            Open billing portal
          </ButtonLink>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <ButtonLink href={routes.member.account} variant="secondary" className="w-full sm:w-auto">
              Membership
            </ButtonLink>
            <ButtonLink href={routes.home} variant="ghost" className="w-full sm:w-auto">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </Card>

      <p className="px-1 text-center text-[length:var(--text-body-sm)] text-[var(--color-text-muted)] sm:text-left">
        Questions about cancelling? Email{" "}
        <a
          href={`mailto:${LEGAL_SUPPORT_EMAIL}`}
          className="inline-flex min-h-11 items-center text-[var(--color-brand)] underline decoration-[var(--color-brand)]/40 underline-offset-2 hover:text-[var(--color-text)]"
        >
          {LEGAL_SUPPORT_EMAIL}
        </a>
        .
      </p>
    </div>
  );
}
