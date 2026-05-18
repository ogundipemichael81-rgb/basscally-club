"use client";

import { useEffect, type ReactNode } from "react";

const HERO_SELECTOR = ".basscally-landing-hero";
const DECO_SELECTOR = ".landing-wave-motion-root";

/**
 * Pauses hero decorative loops when off-screen to avoid scroll jank.
 * Wave motion follows hero visibility (same intersection root).
 */
export function LandingMotionGate({ children }: { children: ReactNode }) {
  useEffect(() => {
    const hero = document.querySelector(HERO_SELECTOR);
    const deco = document.querySelector(DECO_SELECTOR);
    if (!hero) return;

    const root = document.documentElement;

    const syncMotion = (visible: boolean) => {
      root.classList.toggle("landing-hero-motion-active", visible);
      deco?.classList.toggle("landing-deco-motion-active", visible);
    };

    const isVisible = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };

    syncMotion(isVisible(hero));

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry) syncMotion(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    heroObserver.observe(hero);

    return () => {
      heroObserver.disconnect();
      root.classList.remove("landing-hero-motion-active");
      deco?.classList.remove("landing-deco-motion-active");
    };
  }, []);

  return children;
}
