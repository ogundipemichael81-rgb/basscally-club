import { ButtonLink } from "@/components/marketing/button-link";
import { UtilityErrorLayout } from "@/components/utility/utility-error-layout";
import { routes } from "@/lib/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin unauthorized — Basscally Hub",
  description: "Your account does not have permission to access the Basscally Hub admin console.",
};

/** Screen 26 — admin unauthorized */
export default function AdminUnauthorizedPage() {
  return (
    <div className="auth-page-shell admin-unauthorized-page min-h-screen">
      <UtilityErrorLayout
        code="403"
        kicker="Access denied"
        title={
          <>
            This console is{" "}
            <span className="italic text-[var(--color-brand)]">not yours.</span>
          </>
        }
        description="You signed in successfully, but your email does not have admin permission for this area. Ask a super admin for access, or return to the member side."
        actions={
          <>
            <ButtonLink href={routes.member.dashboard}>Go to dashboard</ButtonLink>
            <ButtonLink href={routes.auth.login} variant="secondary">
              Sign in with another email
            </ButtonLink>
          </>
        }
        aside={
          <>
            <div className="relative mx-auto mb-6 flex h-[190px] w-[190px] items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-[rgba(255,69,0,0.25)]" />
              <span className="absolute inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,69,0,0.22),transparent_70%)]" />
              <span className="font-[family-name:var(--font-display)] text-6xl font-black text-[var(--color-brand)]">
                !
              </span>
            </div>
            <h3 className="mb-2 font-semibold text-[var(--color-text)]">Server check</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Admin routes are gated by middleware and a server-side email allowlist. Unauthorized
              access never reaches admin tools.
            </p>
            <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent opacity-60" />
          </>
        }
      />
    </div>
  );
}
