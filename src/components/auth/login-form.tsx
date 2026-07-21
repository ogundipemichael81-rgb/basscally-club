"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/marketing/brand-mark";
import { IconCheck } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  clearRememberedEmail,
  getRememberedEmailSnapshot,
  saveRememberedEmail,
  subscribeRememberedEmail,
} from "@/lib/auth/remember-email";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success";

type MagicLinkFailureReason =
  | "resend_cooldown"
  | "ip_burst_limit"
  | "provider_email_limit"
  | "provider_error";

function isValidEmail(value: string) {
  return value.includes("@") && value.includes(".");
}

export function LoginForm({ initialError }: { initialError?: string }) {
  const rememberedEmail = useSyncExternalStore(
    subscribeRememberedEmail,
    getRememberedEmailSnapshot,
    () => "",
  );
  const [emailOverride, setEmailOverride] = useState<string | undefined>();
  const [rememberOverride, setRememberOverride] = useState<boolean | undefined>();
  const email = emailOverride ?? rememberedEmail;
  const rememberEmail = rememberOverride ?? Boolean(rememberedEmail);
  const hasSavedEmail = Boolean(rememberedEmail);
  const [error, setError] = useState<string | undefined>(initialError);
  const [state, setState] = useState<FormState>("idle");
  const [sentEmail, setSentEmail] = useState("");
  const [retryAfterSeconds, setRetryAfterSeconds] = useState(0);
  const [providerLimited, setProviderLimited] = useState(false);

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
      reason?: MagicLinkFailureReason;
    };

    if (!res.ok) {
      if (res.status === 429 && json.retryAfterSeconds) {
        setRetryAfterSeconds(json.retryAfterSeconds);
      }
      if (json.reason === "provider_email_limit") {
        setProviderLimited(true);
      }
      throw new Error(json.error || "Could not send a sign-in link.");
    }
  };

  const persistRememberPreference = (trimmed: string) => {
    if (rememberEmail) {
      saveRememberedEmail(trimmed);
    } else {
      clearRememberedEmail();
    }
  };

  const handleForgetSavedEmail = () => {
    clearRememberedEmail();
    setEmailOverride("");
    setRememberOverride(false);
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
    setProviderLimited(false);
    setState("loading");

    try {
      await requestMagicLink(trimmed);
      persistRememberPreference(trimmed);
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
    setProviderLimited(false);
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
      <div className="relative z-[1] flex w-full max-w-[400px] flex-col items-center text-center auth-email-sent">
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
            disabled={retryAfterSeconds > 0}
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
            setEmailOverride(e.target.value);
            if (error) setError(undefined);
          }}
        />

        {retryAfterSeconds > 0 ? (
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]" aria-live="polite">
            We just sent a sign-in link. You can request another in {retryAfterSeconds}s.
          </p>
        ) : null}

        {providerLimited ? (
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]" role="status">
            Email delivery is temporarily at capacity. Please wait a little before trying again.
          </p>
        ) : null}

        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-base text-[var(--color-text-muted)]">
          <input
            type="checkbox"
            checked={rememberEmail}
            onChange={(event) => setRememberOverride(event.target.checked)}
            className="h-5 w-5 shrink-0 rounded border-[var(--color-border)] accent-[var(--color-brand)]"
          />
          <span className="py-2">Remember my email on this device</span>
        </label>

        <p className="text-xs leading-relaxed text-[var(--color-text-dim)]">
          Your login stays active on this device unless you sign out.
        </p>

        {hasSavedEmail ? (
          <button
            type="button"
            onClick={handleForgetSavedEmail}
            className="inline-flex min-h-11 items-center text-sm text-[var(--color-text-dim)] underline hover:text-[var(--color-text-muted)]"
          >
            Forget saved email
          </button>
        ) : null}

        <Button
          type="submit"
          className="relative w-full"
          disabled={state === "loading" || retryAfterSeconds > 0}
        >
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
