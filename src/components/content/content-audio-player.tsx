"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { PracticeTrack } from "@/lib/content/queries";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type PlayerState = "idle" | "loading" | "playing" | "paused" | "error";
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5] as const;

type Props = {
  contentId: string;
  title: string;
  practiceSequence?: PracticeTrack[];
  className?: string;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function trackPracticeEvent(name: string, props: Record<string, string | number> = {}) {
  const plausible = (window as Window & { plausible?: (event: string, options?: unknown) => void }).plausible;
  plausible?.(name, { props });
}

function applyPlaybackSpeed(audio: HTMLAudioElement, speed: number) {
  audio.playbackRate = speed;
  // Modern browsers expose preservesPitch; older Safari versions use the WebKit name.
  audio.preservesPitch = true;
  (audio as HTMLAudioElement & { webkitPreservesPitch?: boolean }).webkitPreservesPitch = true;
}

export function ContentAudioPlayer({ contentId, title, practiceSequence = [], className }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>("idle");
  const [error, setError] = useState<string | undefined>();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sourceLoaded, setSourceLoaded] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);

  const stopPlayback = useCallback(() => audioRef.current?.pause(), []);
  useEffect(() => () => stopPlayback(), [stopPlayback]);

  const attachAudio = useCallback((audio: HTMLAudioElement) => {
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.onended = () => {
      setState("idle");
      trackPracticeEvent("practice_completed", { contentId });
    };
    audio.onerror = () => {
      setError("Could not play this drop.");
      setState("error");
    };
  }, [contentId]);

  const ensureSource = async (): Promise<HTMLAudioElement> => {
    if (audioRef.current && sourceLoaded) return audioRef.current;
    const res = await fetch(routes.api.contentPreview(contentId));
    const json = (await res.json().catch(() => ({}))) as { error?: string; url?: string };
    if (!res.ok || !json.url) throw new Error(json.error || "Could not load audio.");
    stopPlayback();
    const audio = new Audio(json.url);
    applyPlaybackSpeed(audio, speed);
    attachAudio(audio);
    audioRef.current = audio;
    setSourceLoaded(true);
    return audio;
  };

  const handlePlayPause = async () => {
    setError(undefined);
    if (state === "playing") {
      stopPlayback();
      setState("paused");
      trackPracticeEvent("practice_paused", { contentId });
      return;
    }
    setState("loading");
    try {
      const audio = await ensureSource();
      await audio.play();
      setState("playing");
      trackPracticeEvent(state === "paused" ? "practice_resumed" : "practice_started", { contentId, speed });
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
    trackPracticeEvent("practice_seeked", { contentId, seconds: Math.round(value) });
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    handleSeek(Math.max(0, Math.min(audio.duration, audio.currentTime + seconds)));
  };

  const changeSpeed = (nextSpeed: (typeof SPEEDS)[number]) => {
    const audio = audioRef.current;
    if (audio) {
      applyPlaybackSpeed(audio, nextSpeed);
    }
    setSpeed(nextSpeed);
    trackPracticeEvent("practice_speed_changed", { contentId, speed: nextSpeed });
    trackPracticeEvent(`practice_speed_${String(nextSpeed).replace(".", "")}`, { contentId });
  };

  const currentIndex = practiceSequence.findIndex((track) => track.id === contentId);
  const previous = currentIndex > 0 ? practiceSequence[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 ? practiceSequence[currentIndex + 1] : undefined;
  const goToTrack = (track: PracticeTrack, event: "next_track_clicked" | "previous_track_clicked") => {
    trackPracticeEvent(event, { contentId, destinationId: track.id });
    window.location.assign(routes.member.content(track.id));
  };
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className={cn("content-audio-player basscally-depth-card rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6", className)} aria-label="Practice audio player">
      <div className="flex flex-wrap items-center gap-4">
        <Button type="button" variant="primary" size="sm" className="min-w-[7rem]" disabled={state === "loading"} onClick={handlePlayPause} aria-pressed={state === "playing"} aria-label={state === "playing" ? "Pause" : "Play"}>
          {state === "loading" ? "Loading…" : state === "playing" ? "Pause" : "Play"}
        </Button>
        <div className="min-w-0 flex-1"><p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">Now practising</p><p className="truncate font-[family-name:var(--font-display)] text-base font-bold">{title}</p></div>
      </div>

      <div className="mt-5"><label className="sr-only" htmlFor={`scrub-${contentId}`}>Seek audio position</label><input id={`scrub-${contentId}`} type="range" min={0} max={duration || 0} step={0.1} value={Math.min(currentTime, duration || 0)} disabled={!sourceLoaded || duration <= 0} onChange={(e) => handleSeek(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-surface-raised)] accent-[var(--color-brand)] disabled:opacity-40" style={{ background: `linear-gradient(to right, var(--color-brand) ${progress}%, var(--color-surface-raised) ${progress}%)` }} aria-label="Scrub bar" /><div className="mt-2 flex justify-between font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-dim)]"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div></div>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="Practice navigation"><Button type="button" variant="secondary" size="sm" disabled={!sourceLoaded} onClick={() => skip(-10)}>Back 10s</Button><Button type="button" variant="secondary" size="sm" disabled={!sourceLoaded} onClick={() => skip(10)}>Forward 10s</Button><Button type="button" variant="ghost" size="sm" disabled={!previous} onClick={() => previous && goToTrack(previous, "previous_track_clicked")}>Previous</Button><Button type="button" variant="ghost" size="sm" disabled={!next} onClick={() => next && goToTrack(next, "next_track_clicked")}>Next</Button></div>

      <fieldset className="mt-5"><legend className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">Speed — pitch preserved</legend><div className="mt-2 flex flex-wrap gap-2">{SPEEDS.map((option) => <Button key={option} type="button" variant={speed === option ? "primary" : "secondary"} size="sm" onClick={() => changeSpeed(option)} aria-pressed={speed === option}>{option}×</Button>)}</div></fieldset>
      {error ? <p className="mt-3 text-sm text-[var(--color-danger)]" role="alert">{error}</p> : null}
    </section>
  );
}
