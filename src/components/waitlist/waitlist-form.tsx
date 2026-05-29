"use client";

import { useState } from "react";
import Link from "next/link";
import { IconCheck } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success";

const EXPERIENCE_OPTIONS = [
  { value: "", label: "Select level (optional)" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [styleInterest, setStyleInterest] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!isValidEmail(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }

    setError(undefined);
    setState("loading");

    try {
      const res = await fetch(routes.api.waitlist, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          experienceLevel: experienceLevel || undefined,
          styleInterest: styleInterest || undefined,
          note: note || undefined,
        }),
      });

      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };

      if (!res.ok) {
        throw new Error(json.error || "Could not join the waitlist.");
      }

      setMessage(json.message || "You are on the waitlist.");
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not join the waitlist.");
      setState("idle");
    }
  };

  if (state === "success") {
    return (
      <div className="mx-auto max-w-md text-center">
        <div
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(52,211,153,0.25)] bg-[rgba(52,211,153,0.12)] text-[var(--color-success)]"
          aria-hidden
        >
          <IconCheck className="h-6 w-6" />
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
          You are on the list
        </h2>
        <p className="mt-3 text-[length:var(--text-body-sm)] text-[var(--color-text-muted)]">
          {message}
        </p>
        <Link
          href={routes.home}
          className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-[var(--color-brand)] hover:underline"
        >
          Back to Basscally Hub
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "mx-auto max-w-md space-y-4",
        state === "loading" && "pointer-events-none opacity-60",
      )}
      noValidate
    >
      <Input
        label="Email address"
        id="waitlist-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="your@email.com"
        required
        value={email}
        error={error}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError(undefined);
        }}
      />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="waitlist-experience"
          className="text-[length:var(--text-body-sm)] font-medium text-[var(--color-text)]"
        >
          Experience level
        </label>
        <select
          id="waitlist-experience"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          className="min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[length:var(--text-body)] text-[var(--color-text)]"
        >
          {EXPERIENCE_OPTIONS.map((opt) => (
            <option key={opt.value || "empty"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Style you want to learn (optional)"
        id="waitlist-style"
        name="styleInterest"
        placeholder="e.g. Makossa, funk, gospel"
        value={styleInterest}
        onChange={(e) => setStyleInterest(e.target.value)}
      />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="waitlist-note"
          className="text-[length:var(--text-body-sm)] font-medium text-[var(--color-text)]"
        >
          Note (optional)
        </label>
        <textarea
          id="waitlist-note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[length:var(--text-body)] text-[var(--color-text)] placeholder:text-[var(--color-text-dim)]"
          placeholder="Tell us what you want from Basscally Hub"
        />
      </div>

      <Button type="submit" className="relative w-full" disabled={state === "loading"}>
        <span className={cn(state === "loading" && "opacity-0")}>Join the waitlist</span>
        {state === "loading" ? (
          <span
            className="absolute inset-0 m-auto h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none"
            aria-hidden
          />
        ) : null}
      </Button>
    </form>
  );
}
