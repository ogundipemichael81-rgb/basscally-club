"use client";

import { useEffect, useState } from "react";

type Props = {
  scheduledFor: string;
  title: string;
};

function formatCountdown(ms: number): string {
  if (ms <= 0) return "Ready to publish";
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function AdminDropCountdown({ scheduledFor, title }: Props) {
  const [label, setLabel] = useState("—");

  useEffect(() => {
    const target = Date.parse(scheduledFor);

    const tick = () => {
      setLabel(formatCountdown(target - Date.now()));
    };

    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [scheduledFor]);

  return (
    <div className="basscally-depth-card rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6">
      <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
        Next scheduled drop
      </p>
      <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-black tracking-[-0.04em]">
        {label}
      </p>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{title}</p>
    </div>
  );
}
