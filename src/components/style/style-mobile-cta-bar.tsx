"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/marketing/button-link";
import { cn } from "@/lib/utils";

export const STYLE_UNLOCK_SENTINEL_ID = "style-unlock-sentinel";

type Props = {
  checkoutHref: string;
};

/**
 * Sticky unlock CTA on mobile after the hero unlock button scrolls away.
 */
export function StyleMobileCtaBar({ checkoutHref }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(STYLE_UNLOCK_SENTINEL_ID);
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
        "fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[rgba(10,10,11,0.96)] p-4 backdrop-blur-sm transition-transform duration-[var(--motion-default)] motion-reduce:transition-none lg:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <ButtonLink href={checkoutHref} className="landing-cta-glow w-full">
        Create a free account
      </ButtonLink>
    </div>
  );
}
