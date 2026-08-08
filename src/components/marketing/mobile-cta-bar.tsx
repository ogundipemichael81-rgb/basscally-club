"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/marketing/button-link";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const SENTINEL_ID = "hero-cta-sentinel";

/**
 * Shown on mobile after the hero primary CTA scrolls out of view.
 * @see docs/mobile-responsive-quality-gate.md
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(SENTINEL_ID);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { root: null, threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[rgba(10,10,11,0.98)] p-4 transition-transform duration-[var(--motion-default)] motion-reduce:transition-none lg:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <ButtonLink href={routes.join} className="landing-cta-glow w-full">
        Start My Free Trial
      </ButtonLink>
    </div>
  );
}

export { SENTINEL_ID as HERO_CTA_SENTINEL_ID };
