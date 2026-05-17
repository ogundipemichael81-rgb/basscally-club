import Link from "next/link";
import { BrandMark } from "@/components/marketing/brand-mark";
import { ButtonLink } from "@/components/marketing/button-link";
import { APP_NAME } from "@/lib/constants";
import { routes } from "@/lib/routes";

type MarketingNavProps = {
  /** Hide ghost sign-in on small screens (matches HTML) */
  hideGhostOnMobile?: boolean;
  ghostHref?: string;
  ghostLabel?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function MarketingNav({
  hideGhostOnMobile = true,
  ghostHref = routes.auth.login,
  ghostLabel = "Sign in",
  primaryHref = routes.pricing,
  primaryLabel = "Join — $1.50/mo",
}: MarketingNavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/60 bg-[rgba(10,10,11,0.72)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link
          href={routes.home}
          className="inline-flex min-h-11 items-center gap-2.5 font-[family-name:var(--font-display)] text-[17px] font-bold tracking-tight text-[var(--color-text)]"
          aria-label={`${APP_NAME} home`}
        >
          <BrandMark />
          {APP_NAME}
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          <ButtonLink
            href={ghostHref}
            variant="ghost"
            size="sm"
            className={hideGhostOnMobile ? "hidden sm:inline-flex" : undefined}
          >
            {ghostLabel}
          </ButtonLink>
          <ButtonLink href={primaryHref} size="sm">
            {primaryLabel}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
