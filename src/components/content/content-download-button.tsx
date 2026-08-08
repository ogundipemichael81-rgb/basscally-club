"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  contentId: string;
  className?: string;
};

export function ContentDownloadButton({ contentId, className }: Props) {
  void contentId;
  const [message, setMessage] = useState(false);

  // Downloads are intentionally paused for launch. Keep this control local so it
  // cannot request a signed URL, redirect to billing, or expose storage details.
  const handleDownload = () => setMessage(true);

  return (
    <div className={className}>
      <Button
        type="button"
        variant="secondary"
        aria-disabled="true"
        title="Not available yet"
        onClick={handleDownload}
        className="content-download-button max-[680px]:w-full opacity-60"
      >
        Download audio
      </Button>

      {message ? (
        <p className="mt-3 text-sm text-[var(--color-text-muted)]" role="status">
          Downloads are not available yet. You can stream this track.
        </p>
      ) : null}
    </div>
  );
}
