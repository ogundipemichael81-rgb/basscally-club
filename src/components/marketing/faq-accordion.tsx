"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    q: "What exactly do I get in Basscally Hub?",
    a: "A new bass practice drop every week — either a bass-less cover, a groove, a fill, or a challenge — from Chris and world-class bassists. Plus the weekly bass-less version of whatever song we covered that week on TikTok. All audio files, downloadable.",
  },
  {
    q: "How often is new content released?",
    a: "Weekly, like clockwork. About four new drops per month.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. One click in your dashboard. You keep access until the end of your paid period.",
  },
  {
    q: "Do I need to be an advanced player?",
    a: "No. Every drop is tagged Beginner, Intermediate, or Advanced. Start where you are.",
  },
  {
    q: "I'm not in the UK or US. Does this work for me?",
    a: "Yes. We accept payments globally through Lemon Squeezy. Members are joining from Africa, Europe, Asia, Latin America, and beyond.",
  },
  {
    q: "Can I download the files or only stream?",
    a: "Download. They're yours to practice with anywhere, online or offline.",
  },
  {
    q: "Is this taught by Chris?",
    a: "Chris leads the Hub and produces core drops. Guest drops come from world-class bassists too — same energy you see on TikTok, with structured practice material.",
  },
  {
    q: "What if I don't like it?",
    a: "Basscally Hub is free to join. Create an account to access published practice drops.",
  },
];

export function FaqAccordion() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-8 flex flex-col gap-2">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <button
              id={buttonId}
              type="button"
              className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left text-[length:var(--text-body)] font-semibold text-[var(--color-text)]"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {item.q}
              <span
                aria-hidden
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-text-muted)] transition-transform duration-[var(--motion-fast)] motion-reduce:transition-none",
                  isOpen && "rotate-45",
                )}
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-[var(--motion-default)] motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="border-t border-[var(--color-border)] px-5 pb-5 pt-2 text-[length:var(--text-body-sm)] leading-relaxed text-[var(--color-text-muted)]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
