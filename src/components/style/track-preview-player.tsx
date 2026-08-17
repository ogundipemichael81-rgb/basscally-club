"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PREVIEW_MAX_SECONDS } from "@/lib/constants";
import { routes } from "@/lib/routes";
import type { StylePageTrack } from "@/lib/style/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

type PlayerState = "idle" | "loading" | "playing" | "paywall";

type Props = {
  track: StylePageTrack;
  unlockHref: string;
};

function difficultyVariant(
  difficulty: string | null,
): "beginner" | "intermediate" | "advanced" | "default" {
  if (difficulty === "beginner") return "beginner";
  if (difficulty === "intermediate") return "intermediate";
  if (difficulty === "advanced") return "advanced";
  return "default";
}

export function TrackPreviewPlayer({ track, unlockHref }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const gatedRef = useRef(true);
  const previewLimitRef = useRef(PREVIEW_MAX_SECONDS);
  const [state, setState] = useState<PlayerState>("idle");
  const [error, setError] = useState<string | undefined>();
  const [isGated, setIsGated] = useState(true);

  const stopPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    return () => stopPlayback();
  }, [stopPlayback]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !gatedRef.current) return;
    if (audio.currentTime >= previewLimitRef.current) {
      audio.pause();
      setState("paywall");
    }
  };

  const handlePlay = async () => {
    if (state === "playing") {
      stopPlayback();
      setState("idle");
      return;
    }

    setError(undefined);
    setState("loading");

    try {
      const res = await fetch(routes.api.contentPreview(track.id));
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        url?: string;
        gated?: boolean;
        previewSeconds?: number;
      };

      if (!res.ok || !json.url) {
        throw new Error(json.error || "Could not load preview.");
      }

      gatedRef.current = Boolean(json.gated);
      previewLimitRef.current = json.previewSeconds ?? PREVIEW_MAX_SECONDS;
      setIsGated(gatedRef.current);

      stopPlayback();
      const audio = new Audio(json.url);
      audioRef.current = audio;
      audio.onended = () => setState(gatedRef.current ? "paywall" : "idle");
      audio.ontimeupdate = handleTimeUpdate;

      await audio.play();
      setState("playing");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load preview.");
      setState("idle");
    }
  };

  return (
    <article className="basscally-depth-card rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4 lg:p-5">
      <div className="flex gap-4">
        <div
          className={cn(
            "flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)]",
            track.coverUrl && "overflow-hidden bg-cover bg-center",
          )}
          style={track.coverUrl ? { backgroundImage: `url(${track.coverUrl})` } : undefined}
          aria-hidden
        >
          {!track.coverUrl ? (
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-[var(--color-text-dim)]">
              {track.typeLabel.slice(0, 4)}
            </span>
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand" className="text-[10px]">
              {track.typeLabel}
            </Badge>
            {track.difficulty ? (
              <Badge variant={difficultyVariant(track.difficulty)} className="text-[10px]">
                {track.difficulty}
              </Badge>
            ) : null}
            {isGated ? (
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide text-[var(--color-text-dim)]">
                30s preview · gated
              </span>
            ) : (
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide text-[var(--color-success)]">
                Full access
              </span>
            )}
          </div>

          <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
            {track.title}
          </h3>
          {track.description ? (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{track.description}</p>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              disabled={state === "loading"}
              onClick={handlePlay}
              aria-pressed={state === "playing"}
            >
              {state === "loading"
                ? "Loading…"
                : state === "playing"
                  ? "Pause preview"
                  : "Play 30s preview"}
            </Button>
            {error ? (
              <p className="text-sm text-[var(--color-danger)]" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          {state === "paywall" ? (
            <div
              className="mt-4 rounded-[var(--radius-md)] border border-[rgba(255,69,0,0.35)] bg-[var(--color-brand-muted)] p-4"
              role="status"
            >
              <p className="text-sm font-medium text-[var(--color-text)]">
                Preview ended — create a free account for the full track.
              </p>
              <Link
                href={unlockHref}
                className="mt-2 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--color-brand)] hover:underline"
              >
                Create a free account
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
