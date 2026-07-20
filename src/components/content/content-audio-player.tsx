"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type PlayerState = "idle" | "loading" | "playing" | "paused" | "error";

type Props = {
  contentId: string;
  title: string;
  className?: string;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function ContentAudioPlayer({ contentId, title, className }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>("idle");
  const [error, setError] = useState<string | undefined>();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sourceLoaded, setSourceLoaded] = useState(false);

  const stopPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
  }, []);

  useEffect(() => {
    return () => stopPlayback();
  }, [stopPlayback]);

  const attachAudio = useCallback((audio: HTMLAudioElement) => {
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.onended = () => setState("idle");
    audio.onerror = () => {
      setError("Could not play this drop.");
      setState("error");
    };
  }, []);

  const ensureSource = async (): Promise<HTMLAudioElement> => {
    if (audioRef.current && sourceLoaded) {
      return audioRef.current;
    }

    const res = await fetch(routes.api.contentPreview(contentId));
    const json = (await res.json().catch(() => ({}))) as {
      error?: string;
      url?: string;
    };

    if (!res.ok || !json.url) {
      throw new Error(json.error || "Could not load audio.");
    }

    stopPlayback();
    const audio = new Audio(json.url);
    audioRef.current = audio;
    attachAudio(audio);
    setSourceLoaded(true);
    return audio;
  };

  const handlePlayPause = async () => {
    setError(undefined);

    if (state === "playing") {
      stopPlayback();
      setState("paused");
      return;
    }

    setState("loading");

    try {
      const audio = await ensureSource();
      await audio.play();
      setState("playing");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not play audio.");
      setState("error");
    }
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      className={cn(
        "content-audio-player basscally-depth-card rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6",
        className,
      )}
      aria-label="Audio player"
    >
      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="min-w-[7rem]"
          disabled={state === "loading"}
          onClick={handlePlayPause}
          aria-pressed={state === "playing"}
          aria-label={state === "playing" ? "Pause" : "Play"}
        >
          {state === "loading" ? "Loading…" : state === "playing" ? "Pause" : "Play"}
        </Button>

        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
            Now playing
          </p>
          <p className="truncate font-[family-name:var(--font-display)] text-base font-bold">{title}</p>
        </div>
      </div>

      <div className="mt-5">
        <label className="sr-only" htmlFor={`scrub-${contentId}`}>
          Seek audio position
        </label>
        <input
          id={`scrub-${contentId}`}
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(currentTime, duration || 0)}
          disabled={!sourceLoaded || duration <= 0}
          onChange={(e) => handleSeek(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-surface-raised)] accent-[var(--color-brand)] disabled:opacity-40"
          style={{
            background: `linear-gradient(to right, var(--color-brand) ${progress}%, var(--color-surface-raised) ${progress}%)`,
          }}
          aria-valuemin={0}
          aria-valuemax={duration || 0}
          aria-valuenow={currentTime}
          aria-label="Scrub bar"
        />
        <div className="mt-2 flex justify-between font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-dim)]">
          <span aria-live="off">{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {error ? (
        <p className="mt-3 text-sm text-[var(--color-danger)]" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}
