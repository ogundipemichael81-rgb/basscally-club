import Link from "next/link";
import { SocialFollowLinks } from "@/components/social/social-follow-links";
import { APP_NAME } from "@/lib/constants";
import { LEGAL_SUPPORT_EMAIL } from "@/content/legal";
import { routes } from "@/lib/routes";

export function MarketingFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12">
      <div className="basscally-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text)]">
            {APP_NAME}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">A bass practice membership.</p>
          <SocialFollowLinks layout="icons" className="mt-4" />
          <p className="mt-2 text-sm text-[var(--color-text-dim)]">
            <a
              href={`mailto:${LEGAL_SUPPORT_EMAIL}`}
              className="inline-flex min-h-11 items-center hover:text-[var(--color-text)]"
            >
              Contact
            </a>
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]" aria-label="Legal">
          <Link
            href={routes.legal.terms}
            className="flex min-h-11 min-w-11 items-center px-1 hover:text-[var(--color-text)]"
          >
            Terms of Service
          </Link>
          <Link
            href={routes.legal.privacy}
            className="flex min-h-11 min-w-11 items-center px-1 hover:text-[var(--color-text)]"
          >
            Privacy Policy
          </Link>
          <Link
            href={routes.legal.refundPolicy}
            className="flex min-h-11 min-w-11 items-center px-1 hover:text-[var(--color-text)]"
          >
            Refund Policy
          </Link>
        </nav>
        <p className="text-xs text-[var(--color-text-dim)] lg:col-span-2">
          © {new Date().getFullYear()} Basscally. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
