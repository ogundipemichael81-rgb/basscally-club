"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadRateLimitState } from "@/components/utility/download-rate-limit-state";
import { trackAnalyticsEvent } from "@/lib/analytics/client-events";
import { DOWNLOAD_RATE_LIMIT_PER_HOUR } from "@/lib/constants";
import { routes } from "@/lib/routes";

type DownloadState = "idle" | "loading" | "rate-limited" | "error";

type Props = {
  contentId: string;
  className?: string;
};

export function ContentDownloadButton({ contentId, className }: Props) {
  const [state, setState] = useState<DownloadState>("idle");
  const [message, setMessage] = useState<string | undefined>();

  const handleDownload = async () => {
    setState("loading");
    setMessage(undefined);

    try {
      const res = await fetch(routes.api.contentDownload(contentId), { cache: "no-store" });
      const json = (await res.json().catch(() => ({}))) as { error?: string; url?: string };

      if (res.status === 401) {
        window.location.assign(`${routes.auth.login}?next=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      if (res.status === 429) {
        setState("rate-limited");
        setMessage(json.error);
        return;
      }

      if (!res.ok || !json.url) {
        throw new Error(json.error || "Download failed. Please try again.");
      }

      // The signed URL is marked as an attachment, so the browser saves the file
      // under the drop's name and the current page (and any playback) stays put.
      const link = document.createElement("a");
      link.href = json.url;
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
      trackAnalyticsEvent("download_started", { contentId });
      setState("idle");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Download failed. Please try again.");
    }
  };

  return (
    <div className={className}>
      <Button
        type="button"
        variant="secondary"
        disabled={state === "loading" || state === "rate-limited"}
        onClick={handleDownload}
        className="content-download-button max-[680px]:w-full"
      >
        {state === "loading" ? "Preparing…" : "Download audio"}
      </Button>

      {state === "rate-limited" ? (
        <DownloadRateLimitState
          className="mt-4"
          message={
            message ??
            `You hit the hourly download limit (${DOWNLOAD_RATE_LIMIT_PER_HOUR}/hour). Stream this drop or try again later.`
          }
        />
      ) : null}

      {state === "error" && message ? (
        <p className="mt-3 text-sm text-[var(--color-danger)]" role="alert">
          {message}
        </p>
      ) : null}
    </div>
  );
}
