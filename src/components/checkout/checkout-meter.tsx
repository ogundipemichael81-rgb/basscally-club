"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const heights = [12, 18, 24, 20, 31, 35, 28, 38];

type CheckoutMeterProps = {
  /** Which bars use brand color (last N bars) */
  accentFrom?: number;
};

export function CheckoutMeter({ accentFrom = 6 }: CheckoutMeterProps) {
  return (
    <div className="mt-5 flex h-[42px] items-end gap-[5px] overflow-hidden" aria-hidden>
      {heights.map((height, index) => (
        <span
          key={index}
          className={`checkout-meter-bar ${index >= accentFrom - 1 ? "checkout-meter-bar--accent" : ""}`}
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}

export function ResendMagicLinkButton({
  email,
  className,
}: {
  email: string | null;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | undefined>();
  const [retryAfterSeconds, setRetryAfterSeconds] = useState(0);

  useEffect(() => {
    if (retryAfterSeconds <= 0) return;
    const timer = window.setInterval(() => {
      setRetryAfterSeconds((v) => (v > 0 ? v - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [retryAfterSeconds]);

  const handleResend = async () => {
    if (!email) {
      setMessage("Use the same email you entered at checkout.");
      setState("error");
      return;
    }
    if (retryAfterSeconds > 0) {
      setMessage(`Wait ${retryAfterSeconds}s before resending.`);
      setState("error");
      return;
    }
    setState("loading");
    setMessage(undefined);
    try {
      const res = await fetch(routes.api.auth.magicLink, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        retryAfterSeconds?: number;
      };
      if (!res.ok) {
        if (res.status === 429 && json.retryAfterSeconds) {
          setRetryAfterSeconds(json.retryAfterSeconds);
        }
        throw new Error(json.error || "Could not resend magic link.");
      }
      setState("sent");
      setMessage(`Magic link sent to ${email}`);
      setRetryAfterSeconds(60);
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Could not resend magic link.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        type="button"
        variant="secondary"
        disabled={state === "loading" || retryAfterSeconds > 0}
        onClick={handleResend}
      >
        {state === "loading"
          ? "Sending…"
          : state === "sent"
            ? "Magic link sent"
            : "Resend magic link"}
      </Button>
      {message ? (
        <p
          className={cn(
            "text-sm",
            state === "error" ? "text-[var(--color-danger)]" : "text-[var(--color-success)]",
          )}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
