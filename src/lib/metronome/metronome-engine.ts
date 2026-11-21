import { BeatScheduleState } from "@/lib/metronome/beat-schedule";

const HORIZON_SECONDS = 0.12;
const TICK_MS = 25;
const CLICK_HZ = 1046.5;

type AudioContextConstructor = typeof AudioContext;

/**
 * Clicks along with an HTMLAudioElement. The element is routed through the same
 * AudioContext as the clicks so both share one output clock and latency.
 * v1: uniform clicks, no bar accent.
 */
export class MetronomeEngine {
  private context: AudioContext | null = null;
  private routed: HTMLAudioElement | null = null;
  private audio: HTMLAudioElement | null = null;
  private timer: ReturnType<typeof setInterval> | undefined;
  private state = new BeatScheduleState();
  private active: OscillatorNode[] = [];
  private enabled = false;
  private readonly detach: (() => void)[] = [];

  constructor(private readonly beats: readonly number[]) {}

  /** Must be called from a user gesture (play or toggle) so the context may start. */
  async attach(audio: HTMLAudioElement) {
    if (this.audio !== audio) {
      this.unbind();
      this.audio = audio;
      const restart = () => this.restart();
      const halt = () => this.halt();
      const events: [string, () => void][] = [
        ["play", restart], ["playing", restart], ["seeked", restart], ["ratechange", restart],
        ["pause", halt], ["waiting", halt], ["seeking", halt], ["ended", halt],
      ];
      for (const [name, handler] of events) {
        audio.addEventListener(name, handler);
        this.detach.push(() => audio.removeEventListener(name, handler));
      }
    }
    if (!this.context) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext;
      if (!Ctor) throw new Error("This browser cannot play the metronome.");
      this.context = new Ctor();
    }
    if (this.routed !== audio) {
      this.context.createMediaElementSource(audio).connect(this.context.destination);
      this.routed = audio;
    }
    if (this.context.state !== "running") await this.context.resume();
    this.restart();
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    this.restart();
  }

  dispose() {
    this.halt();
    this.unbind();
    void this.context?.close();
    this.context = null;
    this.routed = null;
  }

  private unbind() {
    this.detach.splice(0).forEach((fn) => fn());
    this.audio = null;
  }

  private restart() {
    this.halt();
    const audio = this.audio;
    if (!this.enabled || !audio || audio.paused || !this.context) return;
    this.timer = setInterval(() => this.tick(), TICK_MS);
    this.tick();
  }

  private halt() {
    clearInterval(this.timer);
    this.timer = undefined;
    this.state.invalidate();
    this.active.splice(0).forEach((node) => {
      try { node.stop(); node.disconnect(); } catch { /* already stopped */ }
    });
  }

  private tick() {
    const audio = this.audio;
    const context = this.context;
    if (!audio || !context || audio.paused || !this.enabled) return;
    const generation = this.state.generation;
    for (const beat of this.state.take(this.beats, audio.currentTime, audio.playbackRate, HORIZON_SECONDS)) {
      if (beat.generation !== generation) continue;
      this.click(context, context.currentTime + beat.wallDelay);
    }
  }

  private click(context: AudioContext, at: number) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = CLICK_HZ;
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(0.35, at + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.035);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(at);
    oscillator.stop(at + 0.04);
    this.active.push(oscillator);
    oscillator.onended = () => {
      this.active = this.active.filter((node) => node !== oscillator);
    };
  }
}
