"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/marketing/brand-mark";
import { IconCheck } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success";

function isValidEmail(value: string) {
  return value.includes("@") && value.includes(".");
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [state, setState] = useState<FormState>("idle");
  const [sentEmail, setSentEmail] = useState("");
  const [retryAfterSeconds, setRetryAfterSeconds] = useState(0);

  useEffect(() => {
    if (retryAfterSeconds <= 0) return;
    const timer = window.setInterval(() => {
      setRetryAfterSeconds((v) => (v > 0 ? v - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [retryAfterSeconds]);

  const requestMagicLink = async (emailValue: string) => {
    const res = await fetch(routes.api.auth.magicLink, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailValue }),
    });

    const json = (await res.json().catch(() => ({}))) as {
      error?: string;
      retryAfterSeconds?: number;
    };

    if (!res.ok) {
      if (res.status === 429 && json.retryAfterSeconds) {
        setRetryAfterSeconds(json.retryAfterSeconds);
      }
      throw new Error(json.error || "Could not send magic link.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!isValidEmail(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }

    if (retryAfterSeconds > 0) {
      setError(`Please wait ${retryAfterSeconds}s before requesting another link.`);
      return;
    }

    setError(undefined);
    setState("loading");

    try {
      await requestMagicLink(trimmed);
      setSentEmail(trimmed);
      setState("success");
      setRetryAfterSeconds(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send magic link.");
      setState("idle");
    }
  };

  const handleResend = async () => {
    if (!sentEmail || retryAfterSeconds > 0) return;
    setError(undefined);
    setState("loading");
    try {
      await requestMagicLink(sentEmail);
      setState("success");
      setRetryAfterSeconds(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend magic link.");
      setState("success");
    }
  };

  if (state === "success") {
    return (
      <div className="relative z-[1] flex w-full max-w-[400px] flex-col items-center text-center">
        <div
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(52,211,153,0.25)] bg-[rgba(52,211,153,0.12)] text-[var(--color-success)]"
          aria-hidden
        >
          <IconCheck className="h-6 w-6" />
        </div>
        <h1 className="mb-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
          Check your email
        </h1>
        <p className="mb-6 max-w-[340px] text-[length:var(--text-body-sm)] leading-relaxed text-[var(--color-text-muted)]">
          We sent a magic link to{" "}
          <span className="font-medium text-[var(--color-text)]">{sentEmail}</span>. Click it to
          sign in.
        </p>
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-dim)]">
          Didn&apos;t get it? Check spam, or{" "}
          <button
            type="button"
            className="inline-flex min-h-11 items-center underline hover:text-[var(--color-text-muted)] disabled:opacity-50"
            disabled={state === "loading" || retryAfterSeconds > 0}
            onClick={handleResend}
          >
            {retryAfterSeconds > 0 ? `resend in ${retryAfterSeconds}s` : "resend"}
          </button>
          .
        </p>
        {error ? (
          <p className="mt-3 text-[length:var(--text-caption)] text-[var(--color-danger)]">{error}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="relative z-[1] flex w-full max-w-[400px] flex-col items-center">
      <BrandMark size="lg" className="mb-6" />
      <h1 className="mb-3 text-center font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl">
        Sign in to Basscally Hub
      </h1>
      <p className="mb-8 text-center text-[length:var(--text-body-sm)] text-[var(--color-text-muted)]">
        Enter your email and we&apos;ll send you a magic link. No password needed.
      </p>

      <form
        onSubmit={handleSubmit}
        className={cn("w-full space-y-4", state === "loading" && "pointer-events-none opacity-60")}
        noValidate
      >
        <Input
          label="Email address"
          id="email"
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
        <Button type="submit" className="relative w-full" disabled={state === "loading"}>
          <span className={cn(state === "loading" && "opacity-0")}>Send magic link</span>
          {state === "loading" ? (
            <span
              className="absolute inset-0 m-auto h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none"
              aria-hidden
            />
          ) : null}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-text-dim)]">
        Don&apos;t have an account?{" "}
        <Link
          href={routes.pricing}
          className="inline-flex min-h-11 items-center font-medium text-[var(--color-brand)] hover:underline"
        >
          Join for $1.50/month
        </Link>
      </p>
    </div>
  );
}
