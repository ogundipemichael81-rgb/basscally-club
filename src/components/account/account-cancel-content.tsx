import Link from "next/link";
import { ButtonLink } from "@/components/marketing/button-link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LEGAL_SUPPORT_EMAIL } from "@/content/legal";
import { routes } from "@/lib/routes";

const cancellationPoints = [
  {
    title: "Cancel anytime",
    body: "Stop future renewals whenever you choose through our secure billing partner.",
  },
  {
    title: "Access until period end",
    body: "After you cancel, you keep full member access until the end of your current paid billing period.",
  },
  {
    title: "No mid-period refunds",
    body: "We do not offer pro-rata refunds for unused time in a billing period, except where the law requires or we agree in good faith.",
  },
  {
    title: "Billing through Lemon Squeezy",
    body: "Payments, invoices, and subscription changes are handled by Lemon Squeezy. The customer billing portal will open here once billing is connected.",
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
            You can cancel your Basscally Club membership at any time. There are no
            long-term contracts.
          </CardDescription>
        </CardHeader>

        <ul className="space-y-4 border-t border-[var(--color-border)] pt-6">
          {cancellationPoints.map((point) => (
            <li key={point.title} className="flex gap-3">
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
            When billing is connected, you will cancel through the Lemon Squeezy customer
            portal. Until then, use the options below.
          </CardDescription>
        </CardHeader>

        <div className="flex flex-col gap-3">
          <div>
            <Button
              type="button"
              disabled
              className="w-full sm:w-auto"
              aria-describedby="billing-portal-helper"
            >
              Open billing portal
            </Button>
            <p
              id="billing-portal-helper"
              className="mt-2 text-[length:var(--text-body-sm)] text-[var(--color-text-dim)]"
            >
              Available once billing is connected.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <ButtonLink href={routes.pricing} variant="secondary" className="w-full sm:w-auto">
              View plans
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
