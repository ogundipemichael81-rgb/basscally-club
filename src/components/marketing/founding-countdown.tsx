"use client";
import { useEffect, useState } from "react";
import { FOUNDING_WEEK_END } from "@/lib/subscriptions/trial-state";

function parts(ms: number) { const total = Math.max(0, Math.floor(ms / 1000)); return { d: Math.floor(total / 86400), h: Math.floor((total % 86400) / 3600), m: Math.floor((total % 3600) / 60) }; }
export function FoundingCountdown() {
  const end = Date.parse(FOUNDING_WEEK_END);
  const [remaining, setRemaining] = useState(() => Math.max(0, end - Date.now()));
  useEffect(() => { const id = window.setInterval(() => setRemaining(Math.max(0, end - Date.now())), 60000); return () => window.clearInterval(id); }, [end]);
  if (!remaining) return <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--color-text-dim)]">Founding Week has closed</p>;
  const p = parts(remaining);
  return <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--color-text-dim)]">Founding Week ends in <span className="text-[var(--color-text)]">{p.d}d {p.h}h {p.m}m</span></p>;
}
