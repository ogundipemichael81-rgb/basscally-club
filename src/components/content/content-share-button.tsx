"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { clientEnv } from "@/lib/env";
import { routes } from "@/lib/routes";

type Props = {
  contentId: string;
  title: string;
  className?: string;
};

export function ContentShareButton({ contentId, title, className }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${clientEnv.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")}${routes.member.content(contentId)}`;

  const handleShare = async () => {
    setCopied(false);

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${title} — Basscally Hub`,
          text: "Practice this drop on Basscally Hub.",
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard.
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={className}>
      <Button
        type="button"
        variant="ghost"
        onClick={handleShare}
        className="max-[680px]:w-full"
        aria-label="Share this practice drop"
      >
        Share
      </Button>
      {copied ? (
        <p className="mt-2 text-sm text-[var(--color-success)]" role="status">
          Link copied to clipboard.
        </p>
      ) : null}
    </div>
  );
}
