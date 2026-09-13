"use client";

import { useEffect, useRef } from "react";
import { trackAnalyticsEvent, type WhatsAppCommunityPlacement } from "@/lib/analytics/client-events";
import { whatsappCommunityUrl } from "@/lib/social-links";
import { cn } from "@/lib/utils";

type Props = {
  placement: WhatsAppCommunityPlacement;
  variant: "welcome" | "card" | "practice";
  className?: string;
};

const COPY = {
  welcome: {
    eyebrow: "Basscally Community",
    title: "Your practice doesn’t stop here.",
    body: "Join other Basscally players on WhatsApp. Share progress, talk bass, and stay close to new drops.",
    cta: "Join the WhatsApp Community",
  },
  card: {
    eyebrow: "Basscally Community",
    title: "Practice with people, not alone.",
    body: "Join Basscally players on WhatsApp for practice conversations, progress sharing and new-drop discussions.",
    cta: "Open WhatsApp Community",
  },
  practice: {
    eyebrow: "Basscally Community",
    title: "Finished this one?",
    body: "Share your progress with the Basscally community.",
    cta: "Share with the Community",
  },
} as const;

export function WhatsAppCommunityCard({ placement, variant, className }: Props) {
  const ref = useRef<HTMLElement>(null);
  const viewed = useRef(false);
  const copy = COPY[variant];

  useEffect(() => {
    const node = ref.current;
    if (!node || viewed.current) return;
    const trackView = () => {
      if (viewed.current) return;
      viewed.current = true;
      trackAnalyticsEvent("whatsapp_invite_viewed", { placement });
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        trackView();
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [placement]);

  return (
    <section ref={ref} data-community-placement={placement} className={cn("rounded-[var(--radius-lg)] border border-[rgba(255,69,0,0.28)] bg-[linear-gradient(135deg,rgba(255,69,0,0.12),transparent_58%),var(--color-surface)] p-5", variant === "welcome" && "p-6 sm:p-7", className)} aria-label="Basscally WhatsApp community">
      <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--color-brand)]">{copy.eyebrow}</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-black tracking-[-0.02em] text-[var(--color-text)]">{copy.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">{copy.body}</p>
      <a href={whatsappCommunityUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAnalyticsEvent("whatsapp_join_clicked", { placement })} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,69,0,0.65)] max-[680px]:w-full" aria-label={`${copy.cta} (opens in a new tab)`}>{copy.cta}</a>
    </section>
  );
}
