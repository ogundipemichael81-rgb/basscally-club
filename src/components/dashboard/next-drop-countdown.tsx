"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  targetIso: string;
  className?: string;
};

function formatCountdown(ms: number) {
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, live: true };
  }

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, live: false };
}

export function NextDropCountdown({ targetIso, className }: Props) {
  const [parts, setParts] = useState(() =>
    formatCountdown(Date.parse(targetIso) - Date.now()),
  );

  useEffect(() => {
    const tick = () => {
      setParts(formatCountdown(Date.parse(targetIso) - Date.now()));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  if (parts.live) {
    return (
      <p className={cn("font-[family-name:var(--font-mono)] text-sm text-[var(--color-success)]", className)}>
        Drop window is live — refresh for the latest publish.
      </p>
    );
  }

  return (
    <div
      className={cn("grid grid-cols-4 gap-2 text-center", className)}
      aria-live="polite"
      aria-label="Next drop countdown"
    >
      {[
        { label: "Days", value: parts.days },
        { label: "Hours", value: parts.hours },
        { label: "Min", value: parts.minutes },
        { label: "Sec", value: parts.seconds },
      ].map((unit) => (
        <div
          key={unit.label}
          className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-2 py-3"
        >
          <div className="font-[family-name:var(--font-display)] text-xl font-black tabular-nums">
            {String(unit.value).padStart(2, "0")}
          </div>
          <div className="mt-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
