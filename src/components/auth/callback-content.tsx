import { ButtonLink } from "@/components/marketing/button-link";
import { SectionLabel } from "@/components/marketing/section-label";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const steps = [
  { num: "01", title: "Link checked", desc: "Your secure sign-in link is valid.", active: true },
  { num: "02", title: "Session opening", desc: "Preparing your member session.", active: true },
  { num: "03", title: "Dashboard next", desc: "You will land on the latest drop when the session is ready.", active: false },
];

export function CallbackContent() {
  return (
    <main className="basscally-callback-page flex min-h-[calc(100vh-65px)] flex-col justify-center py-12 lg:py-16">
      <section className="basscally-container grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:gap-16">
        <div className="basscally-rise-in">
          <SectionLabel>Signing you in</SectionLabel>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,4.875rem)] font-extrabold leading-[0.94] tracking-tight">
            Signing you into the Club.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--color-text-muted)] lg:text-xl">
            Hold on. We are checking your magic link, creating your session, and opening your
            dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 max-[1023px]:flex-col">
            <ButtonLink href={routes.auth.login} variant="secondary" className="max-[1023px]:w-full">
              Use another email
            </ButtonLink>
            <ButtonLink href={routes.home} variant="ghost" className="max-[1023px]:w-full">
              Return home
            </ButtonLink>
          </div>
        </div>

        <div
          className="callback-stage-card basscally-rise-in basscally-rise-in-delay-2 relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-gradient-to-b from-[rgba(28,28,31,0.92)] to-[rgba(14,14,16,0.9)] p-8 lg:min-h-[520px]"
          aria-label="Signing in status"
        >
          <div className="callback-stage-deco" aria-hidden>
            <div className="callback-vinyl-wrap decorative-motion flex items-center justify-center">
              <div className="callback-vinyl relative h-[180px] w-[180px] rounded-full border border-[#303036] lg:h-[210px] lg:w-[210px]">
                <span className="absolute inset-5 rounded-full border border-white/10" />
                <span className="absolute inset-[64px] flex items-center justify-center rounded-full bg-[var(--color-brand)] font-[family-name:var(--font-display)] text-3xl font-black text-white shadow-[0_0_30px_rgba(255,69,0,0.28)] lg:inset-[76px] lg:text-[38px]">
                  B
                </span>
              </div>
              <span className="callback-accent-dot callback-accent-dot-one" />
              <span className="callback-accent-dot callback-accent-dot-two" />
            </div>
            <div className="decorative-motion relative h-10 w-full max-w-[200px] overflow-hidden">
              <div className="callback-bars flex h-10 items-end justify-center gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-[5px] rounded-full bg-gradient-to-t from-[rgba(255,69,0,0.25)] to-[var(--color-brand)]"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="callback-stage-status relative z-10 flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
            <span className="callback-status-dot h-2 w-2 rounded-full bg-[var(--color-success)] shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
            Magic link verified
          </p>
        </div>
      </section>

      <section className="basscally-container mt-12 basscally-rise-in basscally-rise-in-delay-3">
        <div className="basscally-depth-card grid gap-3 rounded-[var(--radius-lg)] p-5 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className={cn(
                "flex gap-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[rgba(6,6,7,0.52)] p-4",
                !step.active && "opacity-70",
              )}
            >
              <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-wider text-[var(--color-brand)]">
                {step.num}
              </span>
              <div>
                <strong className="block text-[15px] text-[var(--color-text)]">{step.title}</strong>
                <p className="mt-1 text-[13px] leading-snug text-[var(--color-text-muted)]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="basscally-container mt-8 basscally-rise-in basscally-rise-in-delay-3"
        aria-label="Need help signing in"
      >
        <div className="basscally-depth-card rounded-[var(--radius-lg)] p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text)]">
            Taking longer than expected?
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            If this page does not move on, request a new magic link from the sign-in page or email{" "}
            <a
              href="mailto:basscally.enquiry@gmail.com"
              className="text-[var(--color-brand)] underline decoration-[var(--color-brand)]/40 underline-offset-2 hover:text-[var(--color-text)]"
            >
              basscally.enquiry@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
