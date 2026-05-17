"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/marketing/brand-mark";
import { ButtonLink } from "@/components/marketing/button-link";
import { APP_NAME } from "@/lib/constants";
import { routes } from "@/lib/routes";

type MarketingNavProps = {
  hideGhostOnMobile?: boolean;
  ghostHref?: string;
  ghostLabel?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

function navFromPath(pathname: string | null): Partial<MarketingNavProps> | null {
  if (pathname === routes.checkout.cancelled) {
    return {
      ghostHref: `${routes.home}#faq`,
      ghostLabel: "Questions",
      primaryHref: routes.auth.login,
      primaryLabel: "Sign in",
      hideGhostOnMobile: false,
    };
  }
  if (pathname?.startsWith("/checkout")) {
    return {
      ghostHref: "mailto:hello@basscally.club",
      ghostLabel: "Need help?",
      primaryHref: routes.auth.login,
      primaryLabel: "Sign in",
      hideGhostOnMobile: false,
    };
  }
  return null;
}

export function MarketingNav(props: MarketingNavProps) {
  const pathname = usePathname();
  const routeDefaults = navFromPath(pathname);

  const hideGhostOnMobile =
    props.hideGhostOnMobile ?? routeDefaults?.hideGhostOnMobile ?? true;
  const ghostHref = props.ghostHref ?? routeDefaults?.ghostHref ?? routes.auth.login;
  const ghostLabel = props.ghostLabel ?? routeDefaults?.ghostLabel ?? "Sign in";
  const primaryHref = props.primaryHref ?? routeDefaults?.primaryHref ?? routes.pricing;
  const primaryLabel =
    props.primaryLabel ?? routeDefaults?.primaryLabel ?? "Join — $1.50/mo";

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
          <ButtonLink href={primaryHref} size="sm" variant={primaryHref === routes.auth.login ? "secondary" : "primary"}>
            {primaryLabel}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
