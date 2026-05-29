"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DOWNLOAD_RATE_LIMIT_PER_HOUR } from "@/lib/constants";
import { routes } from "@/lib/routes";

type DownloadState = "idle" | "loading" | "rate-limited" | "paywall" | "error";

type Props = {
  contentId: string;
  className?: string;
};

export function ContentDownloadButton({ contentId, className }: Props) {
  const router = useRouter();
  const [state, setState] = useState<DownloadState>("idle");
  const [message, setMessage] = useState<string | undefined>();

  const handleDownload = async () => {
    setState("loading");
    setMessage(undefined);

    try {
      const res = await fetch(routes.api.contentDownload(contentId));
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        url?: string;
      };

      if (res.status === 403) {
        setState("paywall");
        setMessage(json.error || "Active membership required to download this drop.");
        router.push(routes.paywall({ contentId, reason: "lapsed" }));
        return;
      }

      if (res.status === 429) {
        setState("rate-limited");
        setMessage(
          json.error ||
            `Download rate limit reached (${DOWNLOAD_RATE_LIMIT_PER_HOUR}/hour). Try again later.`,
        );
        return;
      }

      if (!res.ok || !json.url) {
        throw new Error(json.error || "Download failed.");
      }

      setState("idle");
      window.location.assign(json.url);
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Download failed.");
    }
  };

  return (
    <div className={className}>
      <Button
        type="button"
        variant="secondary"
        disabled={state === "loading" || state === "rate-limited"}
        onClick={handleDownload}
        className="max-[680px]:w-full"
      >
        {state === "loading" ? "Preparing…" : "Download audio"}
      </Button>

      {state === "rate-limited" ? (
        <div
          className="mt-4 rounded-[var(--radius-md)] border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.08)] p-4"
          role="alert"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-[var(--color-warning)]">Download blocked</p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {message ?? "You hit the hourly download limit. Stream this drop or try again later."}
          </p>
        </div>
      ) : null}

      {state === "error" && message ? (
        <p className="mt-3 text-sm text-[var(--color-danger)]" role="alert">
          {message}
        </p>
      ) : null}
    </div>
  );
}
