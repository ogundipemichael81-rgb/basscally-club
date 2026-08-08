"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/marketing/brand-mark";
import { ButtonLink } from "@/components/marketing/button-link";
import { LEGAL_SUPPORT_EMAIL } from "@/content/legal";
import { APP_NAME } from "@/lib/constants";
import { routes } from "@/lib/routes";

const SUPPORT_MAILTO = `mailto:${LEGAL_SUPPORT_EMAIL}`;

type MarketingNavProps = {
  hideGhostOnMobile?: boolean;
  hidePrimary?: boolean;
  /** Hides Join (or route primary) below lg so landing sticky bar owns mobile conversion */
  hidePrimaryOnMobile?: boolean;
  ghostHref?: string;
  ghostLabel?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

const LEGAL_PATHS: ReadonlySet<string> = new Set([
  routes.legal.terms,
  routes.legal.privacy,
  routes.legal.refundPolicy,
]);

function navFromPath(pathname: string | null): Partial<MarketingNavProps> | null {
  if (pathname && LEGAL_PATHS.has(pathname)) {
    return {
      ghostHref: routes.auth.login,
      ghostLabel: "Sign in",
      hidePrimary: true,
      hideGhostOnMobile: false,
    };
  }
  if (pathname === routes.home) {
    return {
      hidePrimaryOnMobile: true,
    };
  }
  if (pathname === routes.checkout.success) {
    return {
      ghostHref: SUPPORT_MAILTO,
      ghostLabel: "Need help?",
      primaryHref: routes.home,
      primaryLabel: "Home",
      hideGhostOnMobile: false,
    };
  }
  if (pathname === routes.checkout.cancelled) {
    return {
      ghostHref: SUPPORT_MAILTO,
      ghostLabel: "Need help?",
      primaryHref: routes.home,
      primaryLabel: "Home",
      hideGhostOnMobile: false,
    };
  }
  if (pathname?.startsWith("/checkout")) {
    return {
      ghostHref: SUPPORT_MAILTO,
      ghostLabel: "Need help?",
      primaryHref: routes.home,
      primaryLabel: "Home",
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
  const hidePrimary = props.hidePrimary ?? routeDefaults?.hidePrimary ?? false;
  const hidePrimaryOnMobile =
    props.hidePrimaryOnMobile ?? routeDefaults?.hidePrimaryOnMobile ?? false;
  const ghostHref = props.ghostHref ?? routeDefaults?.ghostHref ?? routes.auth.login;
  const ghostLabel = props.ghostLabel ?? routeDefaults?.ghostLabel ?? "Sign in";
  const primaryHref = props.primaryHref ?? routeDefaults?.primaryHref ?? routes.pricing;
  const primaryLabel =
    props.primaryLabel ?? routeDefaults?.primaryLabel ?? "Start My Free Trial";

  const showPrimary = !hidePrimary;
  const primaryClassName = hidePrimaryOnMobile ? "hidden lg:inline-flex" : undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/60 bg-[rgba(10,10,11,0.96)] md:bg-[rgba(10,10,11,0.9)] md:backdrop-blur-sm lg:backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] min-w-0 flex-wrap items-center justify-between gap-3 px-5 py-4 lg:gap-4 lg:px-8">
        <Link
          href={routes.home}
          className="inline-flex min-h-11 items-center gap-2.5 font-[family-name:var(--font-display)] text-[17px] font-bold tracking-tight text-[var(--color-text)]"
          aria-label={`${APP_NAME} home`}
        >
          <BrandMark />
          {APP_NAME}
        </Link>
        <nav className="flex min-w-0 flex-wrap items-center justify-end gap-1 sm:gap-2" aria-label="Primary">
          <ButtonLink
            href={ghostHref}
            variant="ghost"
            size="sm"
            className={hideGhostOnMobile ? "hidden sm:inline-flex" : undefined}
          >
            {ghostLabel}
          </ButtonLink>
          {showPrimary ? (
            <ButtonLink
              href={primaryHref}
              size="sm"
              variant={primaryHref === routes.auth.login ? "secondary" : "primary"}
              className={primaryClassName}
            >
              {primaryLabel}
            </ButtonLink>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
