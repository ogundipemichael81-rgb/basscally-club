import { ButtonLink } from "@/components/marketing/button-link";
import { UtilityErrorLayout } from "@/components/utility/utility-error-layout";
import { routes } from "@/lib/routes";

/** Screen 24 */
export default function NotFound() {
  return (
    <UtilityErrorLayout
      code="404"
      kicker="// Wrong route"
      title="This page missed the groove."
      description="The link may be old, mistyped, or no longer live. The safest next step is to head back to the dashboard or return to the latest drop."
      actions={
        <>
          <ButtonLink href={routes.member.dashboard}>Go to dashboard</ButtonLink>
          <ButtonLink href={routes.home} variant="secondary">
            Back to home
          </ButtonLink>
        </>
      }
      aside={
        <>
          <div className="relative mx-auto mb-6 flex h-[190px] w-[190px] items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-[var(--color-border-strong)]" />
            <span className="absolute inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,69,0,0.22),transparent_70%)]" />
            <span className="font-[family-name:var(--font-display)] text-6xl font-black text-[var(--color-brand)]">
              ?
            </span>
          </div>
          <h3 className="mb-2 font-semibold text-[var(--color-text)]">Suggested recovery</h3>
          <p className="mb-4 text-sm text-[var(--color-text-muted)]">
            Try the main nav, the dashboard search, or the latest email link.
          </p>
          <div className="h-1 rounded-full bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent opacity-60" />
          <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 text-sm text-[var(--color-text-muted)]">
            <p className="mb-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
              Common causes
            </p>
            Expired signed URL · deleted draft link · typo in route
          </div>
        </>
      }
    />
  );
}
