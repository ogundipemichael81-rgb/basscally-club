# Basscally Club — All Screen HTML Codes 01 to 33

This file contains the full standalone HTML reference for each generated screen. Use it as a visual design reference, not as final production architecture.

## Screen 01: Landing Hero

Route: `/`
Reference file: `basscally-hero-v2.html`
Purpose: Marketing hero, pricing anchor, this week drops rail

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Basscally Club</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --color-brand: #FF4500;
    --color-brand-hover: #FF5C1F;
    --color-brand-muted: #2A1408;

    --color-bg: #0A0A0B;
    --color-surface: #141416;
    --color-surface-raised: #1C1C1F;
    --color-surface-sunken: #060607;

    --color-border: #26262A;
    --color-border-strong: #3A3A40;

    --color-text: #F5F5F7;
    --color-text-muted: #A1A1A8;
    --color-text-dim: #6B6B72;

    --color-success: #34D399;

    --font-display: "Cabinet Grotesk", "Inter", system-ui, sans-serif;
    --font-body: "Geist", "Inter", -apple-system, sans-serif;
    --font-mono: "Geist Mono", "JetBrains Mono", monospace;

    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;
    --space-8: 48px;
    --space-10: 64px;
    --space-12: 96px;
    --space-16: 128px;

    --radius-md: 10px;
    --radius-lg: 14px;
    --radius-full: 9999px;

    --shadow-brand-glow: 0 0 32px rgba(255, 69, 0, 0.28);

    --motion-fast: 150ms;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* ============ NAV ============ */
  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(10, 10, 11, 0.72);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    border-bottom: 1px solid rgba(38, 38, 42, 0.6);
  }

  .nav__inner {
    max-width: 1320px;
    margin: 0 auto;
    padding: 18px var(--space-8);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .nav__brand {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 17px;
    letter-spacing: -0.015em;
    color: var(--color-text);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav__brand-mark {
    width: 26px;
    height: 26px;
    border-radius: 7px;
    background: var(--color-brand);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 14px;
    color: #FFF;
    line-height: 1;
  }

  .nav__actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* ============ BUTTONS ============ */
  .btn {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
    padding: 11px 18px;
    border-radius: var(--radius-lg);
    border: 1px solid transparent;
    cursor: pointer;
    transition: all var(--motion-fast) var(--ease-out);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    white-space: nowrap;
  }

  .btn--primary {
    background: var(--color-brand);
    color: #FFFFFF;
  }
  .btn--primary:hover {
    background: var(--color-brand-hover);
    box-shadow: var(--shadow-brand-glow);
  }
  .btn--primary:active { transform: scale(0.98); }

  .btn--ghost {
    background: transparent;
    color: var(--color-text-muted);
  }
  .btn--ghost:hover {
    background: var(--color-surface);
    color: var(--color-text);
  }

  .btn--lg {
    font-size: 16px;
    padding: 18px 28px;
    border-radius: 14px;
  }

  .btn--lg .btn__arrow {
    transition: transform var(--motion-fast) var(--ease-out);
  }
  .btn--lg:hover .btn__arrow { transform: translateX(3px); }

  /* ============ HERO ============ */
  .hero {
    position: relative;
    min-height: calc(100vh - 65px);
    padding: var(--space-10) var(--space-8) var(--space-12);
    overflow: hidden;
  }

  /* Atmospheric base — single warm wash at top-left, fades out */
  .hero::before {
    content: "";
    position: absolute;
    top: -200px;
    left: -200px;
    width: 800px;
    height: 800px;
    background: radial-gradient(
      circle,
      rgba(255, 69, 0, 0.10) 0%,
      rgba(255, 69, 0, 0.04) 30%,
      transparent 60%
    );
    pointer-events: none;
    z-index: 0;
  }

  /* Faint grid backdrop — Linear-style depth, near-invisible */
  .hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
    background-size: 64px 64px;
    background-position: center center;
    pointer-events: none;
    z-index: 0;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  }

  .hero__grid {
    position: relative;
    z-index: 1;
    max-width: 1320px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: var(--space-12);
    align-items: end;
    min-height: calc(100vh - 65px - var(--space-10) - var(--space-12));
  }

  /* ----- Left: headline column ----- */
  .hero__left {
    display: flex;
    flex-direction: column;
  }

  .hero__meta-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-dim);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: var(--space-8);
  }

  .hero__meta-row span { display: inline-flex; align-items: center; gap: 6px; }
  .hero__meta-row .sep {
    width: 16px;
    height: 1px;
    background: var(--color-border-strong);
  }

  .hero__live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-success);
    box-shadow: 0 0 8px rgba(52, 211, 153, 0.7);
    position: relative;
  }

  .hero__live-dot::after {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1px solid rgba(52, 211, 153, 0.4);
    animation: pulse 2.4s var(--ease-out) infinite;
  }

  @keyframes pulse {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }

  .hero__headline {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(64px, 11vw, 148px);
    line-height: 0.92;
    letter-spacing: -0.045em;
    color: var(--color-text);
    margin-bottom: var(--space-6);
  }

  .hero__headline .line { display: block; }
  .hero__headline .line--indent { padding-left: 0.18em; }

  .hero__headline .accent {
    color: var(--color-brand);
    font-style: italic;
    font-weight: 800;
    position: relative;
  }

  /* Strikethrough '$20' to '$1.50' move — editorial moment */
  .hero__price-strike {
    color: var(--color-text-dim);
    text-decoration: line-through;
    text-decoration-thickness: 4px;
    text-decoration-color: var(--color-brand);
    font-weight: 700;
  }

  .hero__lede {
    font-family: var(--font-body);
    font-size: clamp(18px, 1.5vw, 22px);
    font-weight: 400;
    line-height: 1.45;
    color: var(--color-text-muted);
    max-width: 540px;
    margin-bottom: var(--space-8);
  }

  .hero__lede strong {
    color: var(--color-text);
    font-weight: 500;
  }

  .hero__cta-cluster {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .hero__cta-row {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  .hero__fine {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-text-dim);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* ----- Right: vertical rhythm rail ----- */
  .hero__right {
    position: relative;
    padding-left: var(--space-6);
    border-left: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    padding-bottom: var(--space-2);
  }

  .hero__right-label {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    color: var(--color-text-dim);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: var(--space-2);
  }

  .drop-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .drop {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: var(--space-4);
    align-items: baseline;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--color-border);
    position: relative;
  }

  .drop:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .drop__num {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    color: var(--color-text-dim);
    letter-spacing: 0.04em;
  }

  .drop__body { display: flex; flex-direction: column; gap: 4px; }

  .drop__title {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text);
    line-height: 1.3;
  }

  .drop__tag {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-muted);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .drop--next .drop__num { color: var(--color-brand); }
  .drop--next .drop__title { color: var(--color-text); }

  .drop--next::before {
    content: "";
    position: absolute;
    left: -25px;
    top: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-brand);
    box-shadow: 0 0 12px rgba(255, 69, 0, 0.6);
  }

  .hero__right-footer {
    margin-top: auto;
    padding-top: var(--space-5);
    border-top: 1px solid var(--color-border);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hero__right-footer .count {
    color: var(--color-text);
    font-weight: 500;
  }

  /* ============ BOTTOM SOCIAL STRIP ============ */
  .social-strip {
    position: relative;
    z-index: 1;
    max-width: 1320px;
    margin: 0 auto;
    margin-top: var(--space-10);
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-6);
  }

  .social-strip__stats {
    display: flex;
    gap: var(--space-8);
  }

  .stat__label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .stat__value {
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 700;
    color: var(--color-text);
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .social-strip__note {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-text-muted);
    letter-spacing: 0.03em;
    text-transform: uppercase;
    text-align: right;
  }

  /* ============ MOBILE ============ */
  @media (max-width: 1023px) {
    .nav__inner { padding: 14px var(--space-5); }
    .hero { padding: var(--space-8) var(--space-5) var(--space-10); }
    .hero__grid {
      grid-template-columns: 1fr;
      gap: var(--space-10);
      min-height: 0;
    }
    .hero__right {
      border-left: none;
      border-top: 1px solid var(--color-border);
      padding-left: 0;
      padding-top: var(--space-6);
    }
    .social-strip { flex-direction: column; align-items: flex-start; gap: var(--space-5); }
  }

  @media (max-width: 767px) {
    .nav__brand { font-size: 15px; }
    .nav__actions .btn--ghost { display: none; }
    .nav__inner .btn { font-size: 13px; padding: 9px 14px; }

    .hero { padding: var(--space-6) 20px var(--space-10); }
    .hero__meta-row { font-size: 11px; margin-bottom: var(--space-6); gap: 10px; }
    .hero__meta-row .sep { width: 12px; }

    .hero__headline {
      font-size: clamp(48px, 13vw, 72px);
      letter-spacing: -0.035em;
      line-height: 0.94;
    }
    .hero__headline .line--indent { padding-left: 0; }

    .hero__lede { font-size: 17px; margin-bottom: var(--space-6); }

    .hero__cta-row .btn--lg { width: 100%; max-width: 420px; }

    .social-strip__stats { gap: var(--space-5); flex-wrap: wrap; }
    .stat__value { font-size: 22px; }
  }

  /* Entrance — staggered fade-rise */
  @media (prefers-reduced-motion: no-preference) {
    .hero__meta-row,
    .hero__headline .line,
    .hero__lede,
    .hero__cta-cluster,
    .hero__right > *,
    .social-strip > * {
      opacity: 0;
      transform: translateY(14px);
      animation: rise 700ms var(--ease-out) forwards;
    }
    .hero__meta-row              { animation-delay: 100ms; }
    .hero__headline .line:nth-child(1) { animation-delay: 200ms; }
    .hero__headline .line:nth-child(2) { animation-delay: 300ms; }
    .hero__headline .line:nth-child(3) { animation-delay: 400ms; }
    .hero__headline .line:nth-child(4) { animation-delay: 500ms; }
    .hero__lede                  { animation-delay: 600ms; }
    .hero__cta-cluster           { animation-delay: 700ms; }
    .hero__right > *:nth-child(1) { animation-delay: 500ms; }
    .hero__right > *:nth-child(2) { animation-delay: 600ms; }
    .hero__right > *:nth-child(3) { animation-delay: 700ms; }
    .social-strip > *:nth-child(1) { animation-delay: 800ms; }
    .social-strip > *:nth-child(2) { animation-delay: 900ms; }

    @keyframes rise {
      to { opacity: 1; transform: translateY(0); }
    }
  }

  .btn:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 3px;
  }

  ::selection {
    background: var(--color-brand);
    color: #FFF;
  }
</style>
</head>
<body>

<nav class="nav" aria-label="Primary">
  <div class="nav__inner">
    <a href="/" class="nav__brand" aria-label="Basscally Club home">
      <span class="nav__brand-mark" aria-hidden="true">B</span>
      Basscally Club
    </a>
    <div class="nav__actions">
      <a href="/auth/login" class="btn btn--ghost">Sign in</a>
      <a href="#checkout" class="btn btn--primary">Join &mdash; $1.50/mo</a>
    </div>
  </div>
</nav>

<section class="hero" aria-labelledby="hero-headline">
  <div class="hero__grid">

    <div class="hero__left">

      <div class="hero__meta-row">
        <span>
          <span class="hero__live-dot" aria-hidden="true"></span>
          Now accepting members
        </span>
        <span class="sep" aria-hidden="true"></span>
        <span>Issue 001 &mdash; May 2026</span>
      </div>

      <h1 class="hero__headline" id="hero-headline">
        <span class="line">Practice</span>
        <span class="line line--indent">with</span>
        <span class="line"><span class="accent">Basscally.</span></span>
        <span class="line line--indent">
          <span class="hero__price-strike">$20</span>
          <span style="color: var(--color-brand);">$1.50</span>
          <span style="color: var(--color-text-muted); font-weight: 500;">/month.</span>
        </span>
      </h1>

      <p class="hero__lede">
        New <strong>bass-less covers, grooves, fills, and challenges</strong> &mdash;
        delivered to your inbox every 3 days. Practice on your time, from anywhere.
      </p>

      <div class="hero__cta-cluster">
        <div class="hero__cta-row">
          <a href="#checkout" class="btn btn--primary btn--lg">
            Join the Club &mdash; $1.50/month
            <span class="btn__arrow" aria-hidden="true">&rarr;</span>
          </a>
          <span class="hero__fine">Cancel anytime &middot; No contracts</span>
        </div>
      </div>

    </div>

    <aside class="hero__right" aria-label="Upcoming drops">
      <div class="hero__right-label">// This week&apos;s drops</div>

      <div class="drop-list">
        <div class="drop drop--next">
          <span class="drop__num">001 &mdash; TUE</span>
          <div class="drop__body">
            <span class="drop__title">Funk slap pattern in E</span>
            <span class="drop__tag">Groove &middot; Beginner &middot; 2 min</span>
          </div>
        </div>
        <div class="drop">
          <span class="drop__num">002 &mdash; FRI</span>
          <div class="drop__body">
            <span class="drop__title">Bass-less: D&apos;Angelo &mdash; Untitled</span>
            <span class="drop__tag">Cover &middot; Intermediate &middot; 4 min</span>
          </div>
        </div>
        <div class="drop">
          <span class="drop__num">003 &mdash; MON</span>
          <div class="drop__body">
            <span class="drop__title">Ghost-note fill, 16th-note pocket</span>
            <span class="drop__tag">Fill &middot; Advanced &middot; 1 min</span>
          </div>
        </div>
      </div>

      <div class="hero__right-footer">
        <span>Next drop in</span>
        <span class="count">02d : 14h</span>
      </div>
    </aside>

  </div>

  <div class="social-strip">
    <div class="social-strip__stats">
      <div>
        <div class="stat__label">TikTok</div>
        <div class="stat__value">90,000+</div>
      </div>
      <div>
        <div class="stat__label">Instagram</div>
        <div class="stat__value">10,000+</div>
      </div>
      <div>
        <div class="stat__label">Avg. views</div>
        <div class="stat__value">20k&ndash;400k</div>
      </div>
    </div>
    <div class="social-strip__note">
      Trusted by bassists in<br />40+ countries &mdash; UK / US / NG / BR / JP
    </div>
  </div>

</section>

</body>
</html>

```

## Screen 02: Full Landing Page

Route: `/`
Reference file: `basscally-full-landing-v2.html`
Purpose: Full marketing page using landing copy

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Basscally Club — Bass Practice Membership</title>
<meta name="description" content="For $1.50/month, get a new bass practice drop every 3 days — bass-less covers, grooves, fills, and challenges — delivered to your inbox.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  /* ============================================================
     DESIGN SYSTEM TOKENS
  ============================================================ */
  :root {
    --color-brand:          #FF4500;
    --color-brand-hover:    #FF5C1F;
    --color-brand-muted:    #2A1408;
    --color-bg:             #0A0A0B;
    --color-surface:        #141416;
    --color-surface-raised: #1C1C1F;
    --color-surface-sunken: #060607;
    --color-border:         #26262A;
    --color-border-strong:  #3A3A40;
    --color-text:           #F5F5F7;
    --color-text-muted:     #A1A1A8;
    --color-text-dim:       #6B6B72;
    --color-success:        #34D399;
    --color-warning:        #FBBF24;
    --color-danger:         #F87171;
    --color-info:           #60A5FA;

    --font-display: "Cabinet Grotesk", "Inter", system-ui, sans-serif;
    --font-body:    "Geist", "Inter", -apple-system, sans-serif;
    --font-mono:    "Geist Mono", "JetBrains Mono", monospace;

    --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
    --space-4: 16px; --space-5: 24px; --space-6: 32px;
    --space-8: 48px; --space-10: 64px; --space-12: 96px;
    --space-16: 128px;

    --radius-sm: 6px;  --radius-md: 10px;
    --radius-lg: 14px; --radius-xl: 20px;
    --radius-full: 9999px;

    --shadow-sm:  0 1px 2px rgba(0,0,0,0.4);
    --shadow-md:  0 4px 12px rgba(0,0,0,0.5);
    --shadow-lg:  0 12px 32px rgba(0,0,0,0.6);
    --shadow-brand-glow: 0 0 32px rgba(255,69,0,0.28);

    --motion-fast: 150ms;
    --motion-default: 250ms;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  body { background: var(--color-bg); }

  ::selection { background: var(--color-brand); color: #FFF; }

  /* ============================================================
     UTILITIES
  ============================================================ */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding-left: var(--space-5);
    padding-right: var(--space-5);
  }

  .section {
    padding-top: var(--space-12);
    padding-bottom: var(--space-12);
  }

  .section-border { border-top: 1px solid var(--color-border); }

  .section__mono-label {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);
    margin-bottom: var(--space-5);
  }

  .section__heading {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(32px, 5vw, 48px);
    line-height: 1.05;
    letter-spacing: -0.025em;
    color: var(--color-text);
    margin-bottom: var(--space-6);
  }

  .section__heading--sm {
    font-size: clamp(20px, 3vw, 28px);
    color: var(--color-text-muted);
    margin-top: var(--space-8);
    margin-bottom: var(--space-5);
  }

  .section__body {
    font-size: clamp(16px, 1.2vw, 19px);
    color: var(--color-text-muted);
    max-width: 640px;
    line-height: 1.6;
  }

  .section__body strong { color: var(--color-text); font-weight: 500; }

  /* ============================================================
     NAV (locked from hero v2)
  ============================================================ */
  .nav {
    position: sticky;
    top: 0; z-index: 50;
    background: rgba(10,10,11,0.72);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    border-bottom: 1px solid rgba(38,38,42,0.6);
  }
  .nav__inner {
    max-width: 1320px;
    margin: 0 auto;
    padding: 18px var(--space-8);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav__brand {
    font-family: var(--font-display);
    font-weight: 700; font-size: 17px;
    letter-spacing: -0.015em;
    color: var(--color-text);
    text-decoration: none;
    display: flex; align-items: center; gap: 10px;
  }
  .nav__brand-mark {
    width: 26px; height: 26px; border-radius: 7px;
    background: var(--color-brand);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-weight: 800; font-size: 14px; color: #FFF;
  }
  .nav__actions { display: flex; align-items: center; gap: 4px; }

  /* ============================================================
     BUTTONS
  ============================================================ */
  .btn {
    font-family: var(--font-body);
    font-weight: 600; font-size: 14px; line-height: 1;
    padding: 11px 18px;
    border-radius: var(--radius-lg);
    border: 1px solid transparent;
    cursor: pointer;
    transition: all var(--motion-fast) var(--ease-out);
    text-decoration: none;
    display: inline-flex; align-items: center; justify-content: center;
    gap: 8px; white-space: nowrap;
  }
  .btn--primary { background: var(--color-brand); color: #FFF; }
  .btn--primary:hover { background: var(--color-brand-hover); box-shadow: var(--shadow-brand-glow); }
  .btn--primary:active { transform: scale(0.98); }
  .btn--secondary {
    background: transparent;
    border-color: var(--color-border-strong);
    color: var(--color-text);
  }
  .btn--secondary:hover { background: var(--color-surface-raised); border-color: var(--color-text-muted); }
  .btn--ghost { background: transparent; color: var(--color-text-muted); }
  .btn--ghost:hover { background: var(--color-surface); color: var(--color-text); }
  .btn--lg { font-size: 16px; padding: 18px 28px; }
  .btn__arrow {
    display: inline-block;
    transition: transform var(--motion-fast) var(--ease-out);
  }
  .btn--lg:hover .btn__arrow { transform: translateX(4px); }
  .btn:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 3px; }

  /* ============================================================
     HERO (locked v2)
  ============================================================ */
  .hero {
    position: relative;
    min-height: calc(100vh - 65px);
    padding: var(--space-10) var(--space-8) var(--space-12);
    overflow: hidden;
  }
  .hero::before {
    content: "";
    position: absolute; top: -200px; left: -200px;
    width: 800px; height: 800px;
    background: radial-gradient(circle, rgba(255,69,0,0.10) 0%, rgba(255,69,0,0.04) 30%, transparent 60%);
    pointer-events: none; z-index: 0;
  }
  .hero::after {
    content: "";
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 64px 64px;
    pointer-events: none; z-index: 0;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  }
  .hero__grid {
    position: relative; z-index: 1;
    max-width: 1320px; margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0,1fr) 360px;
    gap: var(--space-12);
    align-items: end;
    min-height: calc(100vh - 65px - var(--space-10) - var(--space-12));
  }
  .hero__left { display: flex; flex-direction: column; }
  .hero__meta-row {
    display: flex; align-items: center; gap: var(--space-3);
    font-family: var(--font-mono);
    font-size: 12px; font-weight: 500;
    color: var(--color-text-dim);
    letter-spacing: 0.04em; text-transform: uppercase;
    margin-bottom: var(--space-8);
  }
  .hero__meta-row span { display: inline-flex; align-items: center; gap: 6px; }
  .hero__meta-row .sep { width: 16px; height: 1px; background: var(--color-border-strong); }
  .hero__live-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--color-success);
    box-shadow: 0 0 8px rgba(52,211,153,0.7);
    position: relative;
  }
  .hero__live-dot::after {
    content: ""; position: absolute; inset: -3px;
    border-radius: 50%; border: 1px solid rgba(52,211,153,0.4);
  }
  @media (prefers-reduced-motion: no-preference) {
    .hero__live-dot::after { animation: pulse 2.4s var(--ease-out) infinite; }
  }
  @keyframes pulse { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }

  .hero__headline {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(64px, 11vw, 148px);
    line-height: 0.92; letter-spacing: -0.045em;
    color: var(--color-text);
    margin-bottom: var(--space-6);
  }
  .hero__headline .line { display: block; }
  .hero__headline .line--indent { padding-left: 0.18em; }
  .hero__headline .accent { color: var(--color-brand); font-style: italic; font-weight: 800; }
  .hero__price-strike {
    color: var(--color-text-dim);
    text-decoration: line-through;
    text-decoration-thickness: 4px;
    text-decoration-color: var(--color-brand);
    font-weight: 700;
  }
  .hero__lede {
    font-size: clamp(18px,1.5vw,22px); font-weight: 400;
    line-height: 1.45; color: var(--color-text-muted);
    max-width: 540px; margin-bottom: var(--space-8);
  }
  .hero__lede strong { color: var(--color-text); font-weight: 500; }
  .hero__cta-cluster { display: flex; flex-direction: column; gap: var(--space-3); }
  .hero__cta-row { display: flex; align-items: center; gap: var(--space-4); flex-wrap: wrap; }
  .hero__fine {
    font-family: var(--font-mono); font-size: 12px;
    color: var(--color-text-dim); letter-spacing: 0.04em; text-transform: uppercase;
  }

  /* Hero — right column (drops rail) */
  .hero__right {
    position: relative;
    padding-left: var(--space-6);
    border-left: 1px solid var(--color-border);
    display: flex; flex-direction: column; gap: var(--space-6);
    padding-bottom: var(--space-2);
  }
  .hero__right-label {
    font-family: var(--font-mono); font-size: 11px; font-weight: 500;
    color: var(--color-text-dim); letter-spacing: 0.08em; text-transform: uppercase;
    margin-bottom: var(--space-2);
  }
  .drop-list { display: flex; flex-direction: column; gap: 14px; }
  .drop {
    display: grid; grid-template-columns: 56px 1fr;
    gap: var(--space-4); align-items: baseline;
    padding-bottom: 14px; border-bottom: 1px solid var(--color-border);
    position: relative;
  }
  .drop:last-child { border-bottom: none; padding-bottom: 0; }
  .drop__num {
    font-family: var(--font-mono); font-size: 11px; font-weight: 500;
    color: var(--color-text-dim); letter-spacing: 0.04em;
  }
  .drop__body { display: flex; flex-direction: column; gap: 4px; }
  .drop__title { font-size: 15px; font-weight: 500; color: var(--color-text); line-height: 1.3; }
  .drop__tag {
    font-family: var(--font-mono); font-size: 11px;
    color: var(--color-text-muted); letter-spacing: 0.04em; text-transform: uppercase;
  }
  .drop--next .drop__num { color: var(--color-brand); }
  .drop--next::before {
    content: ""; position: absolute;
    left: -25px; top: 8px;
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--color-brand);
    box-shadow: 0 0 12px rgba(255,69,0,0.6);
  }
  .hero__right-footer {
    margin-top: auto; padding-top: var(--space-5);
    border-top: 1px solid var(--color-border);
    font-family: var(--font-mono); font-size: 11px;
    color: var(--color-text-dim); letter-spacing: 0.04em; text-transform: uppercase;
    display: flex; justify-content: space-between; align-items: center;
  }
  .hero__right-footer .count { color: var(--color-text); font-weight: 500; }

  /* Social strip */
  .social-strip {
    position: relative; z-index: 1;
    max-width: 1320px; margin: 0 auto;
    margin-top: var(--space-10); padding-top: var(--space-6);
    border-top: 1px solid var(--color-border);
    display: flex; align-items: center; justify-content: space-between; gap: var(--space-6);
  }
  .social-strip__stats { display: flex; gap: var(--space-8); }
  .stat__label {
    font-family: var(--font-mono); font-size: 11px;
    color: var(--color-text-dim); letter-spacing: 0.06em; text-transform: uppercase;
    margin-bottom: 4px;
  }
  .stat__value {
    font-family: var(--font-display); font-size: 26px; font-weight: 700;
    color: var(--color-text); letter-spacing: -0.02em; line-height: 1;
  }
  .social-strip__note {
    font-family: var(--font-mono); font-size: 12px;
    color: var(--color-text-muted); letter-spacing: 0.03em; text-transform: uppercase;
    text-align: right;
  }

  /* Entrance animation */
  @media (prefers-reduced-motion: no-preference) {
    .hero__meta-row, .hero__headline .line, .hero__lede, .hero__cta-cluster,
    .hero__right > *, .social-strip > * {
      opacity: 0; transform: translateY(14px);
      animation: rise 700ms var(--ease-out) forwards;
    }
    .hero__meta-row { animation-delay: 100ms; }
    .hero__headline .line:nth-child(1) { animation-delay: 200ms; }
    .hero__headline .line:nth-child(2) { animation-delay: 300ms; }
    .hero__headline .line:nth-child(3) { animation-delay: 400ms; }
    .hero__headline .line:nth-child(4) { animation-delay: 500ms; }
    .hero__lede { animation-delay: 600ms; }
    .hero__cta-cluster { animation-delay: 700ms; }
    .hero__right > *:nth-child(1) { animation-delay: 500ms; }
    .hero__right > *:nth-child(2) { animation-delay: 600ms; }
    .hero__right > *:nth-child(3) { animation-delay: 700ms; }
    .social-strip > *:nth-child(1) { animation-delay: 800ms; }
    .social-strip > *:nth-child(2) { animation-delay: 900ms; }
    @keyframes rise { to { opacity: 1; transform: translateY(0); } }
  }

  /* ============================================================
     SECTION 2 — WHAT YOU GET (4 value cards)
  ============================================================ */
  .value-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-6);
  }

  .value-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-6) var(--space-5) var(--space-5);
    display: flex; flex-direction: column; gap: var(--space-4);
    transition: border-color var(--motion-default) var(--ease-out),
                transform var(--motion-default) var(--ease-out),
                box-shadow var(--motion-default) var(--ease-out);
  }

  .value-card:hover {
    border-color: var(--color-border-strong);
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }

  .value-card__icon {
    width: 44px; height: 44px;
    border-radius: var(--radius-md);
    background: var(--color-brand-muted);
    color: var(--color-brand);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .value-card__title {
    font-family: var(--font-display);
    font-size: 18px; font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-text);
  }

  .value-card__desc {
    font-size: 14px; line-height: 1.55;
    color: var(--color-text-muted);
  }

  /* ============================================================
     SECTION 3 — HOW IT WORKS
  ============================================================ */
  .steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-6);
    counter-reset: step;
  }

  .step {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-6) var(--space-5) var(--space-5);
    display: flex; flex-direction: column; gap: var(--space-3);
    counter-increment: step;
    position: relative;
  }

  .step__num {
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--color-brand);
    margin-bottom: var(--space-1);
  }

  .step__text {
    font-size: 15px; line-height: 1.55;
    color: var(--color-text-muted);
  }
  .step__text strong { color: var(--color-text); font-weight: 500; }

  .steps__footer {
    grid-column: 1 / -1;
    font-size: 15px;
    color: var(--color-text-dim);
    margin-top: var(--space-4);
    padding-top: var(--space-5);
    border-top: 1px solid var(--color-border);
    max-width: 580px;
  }

  /* ============================================================
     SECTION 4 — WHO IT'S FOR
  ============================================================ */
  .who-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10);
    margin-top: var(--space-6);
  }

  .who-list { list-style: none; display: flex; flex-direction: column; gap: var(--space-4); }

  .who-list li {
    font-size: 15px; line-height: 1.55;
    color: var(--color-text-muted);
    display: flex; gap: var(--space-3); align-items: flex-start;
  }

  .who-list .check {
    color: var(--color-success);
    flex-shrink: 0;
    width: 22px;
    display: flex;
    align-items: center;
    padding-top: 2px;
  }

  .who-list .cross {
    color: var(--color-text-dim);
    flex-shrink: 0;
    width: 22px;
    display: flex;
    align-items: center;
    padding-top: 2px;
  }

  /* ============================================================
     SECTION 5 — SOCIAL PROOF
  ============================================================ */
  .testimonials {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-6);
  }

  .testimonial {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    display: flex; flex-direction: column; gap: var(--space-4);
  }

  .testimonial__quote {
    font-size: 15px; line-height: 1.55;
    color: var(--color-text-muted);
    font-style: italic;
    flex: 1;
  }

  .testimonial__author {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-text-dim);
    letter-spacing: 0.03em;
  }

  .proof-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-8);
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-border);
  }

  .proof-stat {
    text-align: center;
    padding: var(--space-5);
  }

  .proof-stat__value {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    color: var(--color-text);
    letter-spacing: -0.02em;
    line-height: 1;
    margin-bottom: var(--space-2);
  }

  .proof-stat__label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* ============================================================
     SECTION 6 — WHY $1.50
  ============================================================ */
  .why-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10);
    align-items: start;
  }

  .why-section__right {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    display: flex; flex-direction: column; gap: var(--space-4);
  }

  .price-compare {
    display: flex; flex-direction: column; gap: var(--space-3);
  }

  .price-compare__row {
    display: flex; align-items: center; justify-content: space-between;
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--color-border);
    font-size: 14px; color: var(--color-text-muted);
  }

  .price-compare__row:last-child { border-bottom: none; }

  .price-compare__row .price {
    font-family: var(--font-mono);
    font-weight: 500;
    color: var(--color-text-dim);
  }

  .price-compare__row--us .price {
    color: var(--color-brand);
    font-weight: 600;
    font-size: 16px;
  }

  .price-compare__row--us {
    color: var(--color-text);
    font-weight: 500;
  }

  /* ============================================================
     SECTION 7 — FOUNDING MEMBER
  ============================================================ */
  .founding {
    position: relative;
    overflow: hidden;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: var(--space-10) var(--space-8);
    text-align: center;
  }

  .founding::before {
    content: "";
    position: absolute;
    top: -100px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 400px;
    background: radial-gradient(circle, rgba(255,69,0,0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .founding > * { position: relative; z-index: 1; }

  .founding__heading {
    font-family: var(--font-display);
    font-size: clamp(28px, 5vw, 44px);
    font-weight: 700;
    letter-spacing: -0.025em;
    color: var(--color-text);
    margin-bottom: var(--space-5);
  }

  .founding__body {
    font-size: clamp(16px, 1.2vw, 19px);
    color: var(--color-text-muted);
    max-width: 520px;
    margin: 0 auto var(--space-6);
    line-height: 1.55;
  }

  .founding__fine {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-text-dim);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-top: var(--space-4);
  }

  /* ============================================================
     SECTION 8 — FAQ
  ============================================================ */
  .faq-list {
    max-width: 720px;
    margin-top: var(--space-6);
    display: flex; flex-direction: column;
  }

  .faq-item {
    border-bottom: 1px solid var(--color-border);
  }

  .faq-item:first-child { border-top: 1px solid var(--color-border); }

  .faq-q {
    width: 100%;
    background: none; border: none; cursor: pointer;
    padding: var(--space-5) 0;
    font-family: var(--font-body);
    font-size: 16px; font-weight: 500;
    color: var(--color-text);
    text-align: left;
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--space-4);
    transition: color var(--motion-fast) var(--ease-out);
  }

  .faq-q:hover { color: var(--color-brand); }

  .faq-q__icon {
    flex-shrink: 0;
    width: 20px; height: 20px;
    position: relative;
    transition: transform var(--motion-default) var(--ease-out);
  }

  .faq-q__icon::before, .faq-q__icon::after {
    content: "";
    position: absolute;
    background: var(--color-text-muted);
    border-radius: 1px;
  }

  .faq-q__icon::before {
    top: 50%; left: 3px; right: 3px;
    height: 2px; transform: translateY(-50%);
  }

  .faq-q__icon::after {
    left: 50%; top: 3px; bottom: 3px;
    width: 2px; transform: translateX(-50%);
    transition: transform var(--motion-default) var(--ease-out),
                opacity var(--motion-default) var(--ease-out);
  }

  .faq-item.open .faq-q__icon::after {
    transform: translateX(-50%) scaleY(0);
    opacity: 0;
  }

  .faq-a {
    max-height: 0;
    overflow: hidden;
    transition: max-height 400ms var(--ease-out),
                padding 400ms var(--ease-out);
  }

  .faq-item.open .faq-a {
    max-height: 300px;
  }

  .faq-a__inner {
    padding-bottom: var(--space-5);
    font-size: 15px;
    line-height: 1.65;
    color: var(--color-text-muted);
    max-width: 620px;
  }

  /* ============================================================
     SECTION 9 — FINAL CTA
  ============================================================ */
  .final-cta {
    text-align: center;
    padding: var(--space-16) var(--space-5);
  }

  .final-cta__heading {
    font-family: var(--font-display);
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1;
    color: var(--color-text);
    margin-bottom: var(--space-5);
  }

  .final-cta__sub {
    font-size: clamp(16px, 1.3vw, 20px);
    color: var(--color-text-muted);
    margin-bottom: var(--space-8);
    max-width: 480px;
    margin-left: auto; margin-right: auto;
  }

  /* ============================================================
     FOOTER
  ============================================================ */
  .footer {
    border-top: 1px solid var(--color-border);
    padding: var(--space-10) 0 var(--space-8);
  }

  .footer__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-5);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-8);
    align-items: start;
  }

  .footer__brand {
    font-family: var(--font-display);
    font-weight: 700; font-size: 16px;
    color: var(--color-text);
    margin-bottom: var(--space-2);
  }

  .footer__tagline {
    font-size: 14px;
    color: var(--color-text-dim);
    margin-bottom: var(--space-5);
  }

  .footer__socials {
    display: flex; gap: var(--space-3);
    margin-bottom: var(--space-5);
  }

  .footer__social-link {
    width: 36px; height: 36px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    display: flex; align-items: center; justify-content: center;
    color: var(--color-text-muted);
    text-decoration: none; font-size: 14px;
    transition: all var(--motion-fast) var(--ease-out);
  }

  .footer__social-link:hover {
    border-color: var(--color-text-muted);
    color: var(--color-text);
    background: var(--color-surface);
  }

  .footer__contact {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-text-dim);
    letter-spacing: 0.03em;
  }

  .footer__contact a { color: var(--color-text-muted); text-decoration: none; }
  .footer__contact a:hover { color: var(--color-text); }

  .footer__links {
    display: flex; flex-direction: column;
    gap: var(--space-3);
    text-align: right;
  }

  .footer__link {
    font-size: 13px;
    color: var(--color-text-dim);
    text-decoration: none;
    transition: color var(--motion-fast) var(--ease-out);
  }
  .footer__link:hover { color: var(--color-text-muted); }

  .footer__copy {
    grid-column: 1 / -1;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-border);
  }

  /* ============================================================
     MOBILE STICKY CTA BAR
  ============================================================ */
  .mobile-cta-bar {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0;
    z-index: 40;
    background: rgba(10,10,11,0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid var(--color-border);
    padding: var(--space-3) var(--space-4);
    transform: translateY(100%);
    transition: transform 300ms var(--ease-out);
  }
  .mobile-cta-bar.visible { transform: translateY(0); }
  .mobile-cta-bar .btn { width: 100%; justify-content: center; }

  /* ============================================================
     RESPONSIVE
  ============================================================ */
  @media (max-width: 1023px) {
    .nav__inner { padding: 14px var(--space-5); }

    .hero { padding: var(--space-8) var(--space-5) var(--space-10); }
    .hero__grid { grid-template-columns: 1fr; gap: var(--space-10); min-height: 0; }
    .hero__right { border-left: none; border-top: 1px solid var(--color-border); padding-left: 0; padding-top: var(--space-6); }
    .social-strip { flex-direction: column; align-items: flex-start; gap: var(--space-5); }

    .value-cards { grid-template-columns: repeat(2, 1fr); }
    .steps { grid-template-columns: 1fr; }
    .who-grid { grid-template-columns: 1fr; gap: var(--space-8); }
    .testimonials { grid-template-columns: 1fr; }
    .why-section { grid-template-columns: 1fr; gap: var(--space-6); }
    .proof-stats { grid-template-columns: repeat(3, 1fr); }

    .founding { padding: var(--space-8) var(--space-6); }
    .footer__inner { grid-template-columns: 1fr; }
    .footer__links { text-align: left; flex-direction: row; flex-wrap: wrap; gap: var(--space-4); }
  }

  @media (max-width: 767px) {
    .nav__brand { font-size: 15px; }
    .nav__actions .btn--ghost { display: none; }
    .nav__inner .btn { font-size: 13px; padding: 9px 14px; }

    .hero { padding: var(--space-6) 20px var(--space-10); }
    .hero__meta-row { font-size: 11px; margin-bottom: var(--space-6); gap: 10px; }
    .hero__meta-row .sep { width: 12px; }
    .hero__headline { font-size: clamp(48px, 13vw, 72px); letter-spacing: -0.035em; line-height: 0.94; }
    .hero__headline .line--indent { padding-left: 0; }
    .hero__lede { font-size: 17px; margin-bottom: var(--space-6); }
    .hero__cta-row .btn--lg { width: 100%; max-width: 420px; }

    .section { padding-top: var(--space-8); padding-bottom: var(--space-8); }

    .value-cards { grid-template-columns: 1fr; }
    .social-strip__stats { gap: var(--space-5); flex-wrap: wrap; }
    .stat__value { font-size: 22px; }

    .proof-stats { grid-template-columns: 1fr; gap: 0; }
    .proof-stat { padding: var(--space-4); border-bottom: 1px solid var(--color-border); }
    .proof-stat:last-child { border-bottom: none; }

    .founding { padding: var(--space-8) var(--space-5); border-radius: var(--radius-lg); }

    .final-cta { padding: var(--space-12) var(--space-4); }
    .final-cta .btn--lg { width: 100%; max-width: 400px; }

    .mobile-cta-bar { display: block; }
    body { padding-bottom: 64px; } /* space for sticky bar */
  }
</style>
</head>
<body>

<!-- =========================================================
     NAV
========================================================= -->
<nav class="nav" aria-label="Primary">
  <div class="nav__inner">
    <a href="/" class="nav__brand" aria-label="Basscally Club home">
      <span class="nav__brand-mark" aria-hidden="true">B</span>
      Basscally Club
    </a>
    <div class="nav__actions">
      <a href="/auth/login" class="btn btn--ghost">Sign in</a>
      <a href="#checkout" class="btn btn--primary">Join &mdash; $1.50/mo</a>
    </div>
  </div>
</nav>

<!-- =========================================================
     HERO (locked v2)
========================================================= -->
<section class="hero" aria-labelledby="hero-headline">
  <div class="hero__grid">
    <div class="hero__left">
      <div class="hero__meta-row">
        <span><span class="hero__live-dot" aria-hidden="true"></span> Now accepting members</span>
        <span class="sep" aria-hidden="true"></span>
        <span>Issue 001 &mdash; May 2026</span>
      </div>
      <h1 class="hero__headline" id="hero-headline">
        <span class="line">Practice</span>
        <span class="line line--indent">with</span>
        <span class="line"><span class="accent">Basscally.</span></span>
        <span class="line line--indent">
          <span class="hero__price-strike">$20</span>
          <span style="color:var(--color-brand);">$1.50</span><span style="color:var(--color-text-muted);font-weight:500;">/month.</span>
        </span>
      </h1>
      <p class="hero__lede">
        New <strong>bass-less covers, grooves, fills, and challenges</strong> &mdash;
        delivered to your inbox every 3 days. Practice on your time, from anywhere.
      </p>
      <div class="hero__cta-cluster">
        <div class="hero__cta-row">
          <a href="#checkout" class="btn btn--primary btn--lg">
            Join the Club &mdash; $1.50/month
            <span class="btn__arrow" aria-hidden="true">&rarr;</span>
          </a>
          <span class="hero__fine">Cancel anytime &middot; No contracts</span>
        </div>
      </div>
    </div>

    <aside class="hero__right" aria-label="Upcoming drops">
      <div class="hero__right-label">// This week&rsquo;s drops</div>
      <div class="drop-list">
        <div class="drop drop--next">
          <span class="drop__num">001 &mdash; TUE</span>
          <div class="drop__body">
            <span class="drop__title">Funk slap pattern in E</span>
            <span class="drop__tag">Groove &middot; Beginner &middot; 2 min</span>
          </div>
        </div>
        <div class="drop">
          <span class="drop__num">002 &mdash; FRI</span>
          <div class="drop__body">
            <span class="drop__title">Bass-less: D&rsquo;Angelo &mdash; Untitled</span>
            <span class="drop__tag">Cover &middot; Intermediate &middot; 4 min</span>
          </div>
        </div>
        <div class="drop">
          <span class="drop__num">003 &mdash; MON</span>
          <div class="drop__body">
            <span class="drop__title">Ghost-note fill, 16th-note pocket</span>
            <span class="drop__tag">Fill &middot; Advanced &middot; 1 min</span>
          </div>
        </div>
      </div>
      <div class="hero__right-footer">
        <span>Next drop in</span>
        <span class="count">02d : 14h</span>
      </div>
    </aside>
  </div>

  <div class="social-strip">
    <div class="social-strip__stats">
      <div><div class="stat__label">TikTok</div><div class="stat__value">90,000+</div></div>
      <div><div class="stat__label">Instagram</div><div class="stat__value">10,000+</div></div>
      <div><div class="stat__label">Avg. views</div><div class="stat__value">20k&ndash;400k</div></div>
    </div>
    <div class="social-strip__note">Trusted by bassists in<br>40+ countries &mdash; UK / US / NG / BR / JP</div>
  </div>
</section>

<!-- =========================================================
     SECTION 2 — WHAT YOU GET
========================================================= -->
<section class="section section-border" id="what-you-get">
  <div class="container">
    <span class="section__mono-label">// What&rsquo;s inside</span>
    <h2 class="section__heading">What you get, every 3 days</h2>

    <div class="value-cards">
      <div class="value-card">
        <div class="value-card__icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 18V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>
            <circle cx="9" cy="10" r="2"/><path d="m17 8-5 6-2-2-4 5"/>
          </svg>
        </div>
        <h3 class="value-card__title">Bass-less Covers</h3>
        <p class="value-card__desc">The songs you see Chris cover on TikTok &mdash; without the bass. Drop in, play the part, sound huge.</p>
      </div>
      <div class="value-card">
        <div class="value-card__icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
            <path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>
          </svg>
        </div>
        <h3 class="value-card__title">Grooves</h3>
        <p class="value-card__desc">Short, looped patterns to lock in your pocket. New ones every 3 days. Easy on day one, addictive by day ten.</p>
      </div>
      <div class="value-card">
        <div class="value-card__icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>
          </svg>
        </div>
        <h3 class="value-card__title">Fills</h3>
        <p class="value-card__desc">The transitions that separate beginners from players. Steal them. Reuse them. Make them yours.</p>
      </div>
      <div class="value-card">
        <div class="value-card__icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          </svg>
        </div>
        <h3 class="value-card__title">Weekly Challenges</h3>
        <p class="value-card__desc">A bass goal to hit every week. Record it, share it, level up. Recognition in the Club.</p>
      </div>
    </div>
  </div>
</section>

<!-- =========================================================
     SECTION 3 — HOW IT WORKS
========================================================= -->
<section class="section section-border" id="how-it-works">
  <div class="container">
    <span class="section__mono-label">// How it works</span>
    <h2 class="section__heading">How it works</h2>

    <div class="steps">
      <div class="step">
        <span class="step__num">Step 01</span>
        <p class="step__text"><strong>Join the Club</strong> for $1.50/month.</p>
      </div>
      <div class="step">
        <span class="step__num">Step 02</span>
        <p class="step__text"><strong>Get an email every 3 days</strong> when a new drop lands.</p>
      </div>
      <div class="step">
        <span class="step__num">Step 03</span>
        <p class="step__text"><strong>Open the dashboard,</strong> download the audio, and practice.</p>
      </div>
      <div class="steps__footer">
        That&rsquo;s it. No app to install. No course to finish. Just practice material in your inbox, forever.
      </div>
    </div>
  </div>
</section>

<!-- =========================================================
     SECTION 4 — WHO IT'S FOR
========================================================= -->
<section class="section section-border" id="who-its-for">
  <div class="container">
    <span class="section__mono-label">// Who it&rsquo;s for</span>
    <h2 class="section__heading">Who Basscally Club is for</h2>

    <div class="who-grid">
      <div>
        <ul class="who-list">
          <li><span class="check" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> Self-taught bassists who want structure without a teacher</li>
          <li><span class="check" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> Players who learned the basics on TikTok and are ready to go deeper</li>
          <li><span class="check" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> Anyone who&rsquo;s tired of paying $20 for a single masterclass</li>
          <li><span class="check" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> Bassists anywhere on Earth &mdash; Africa, UK, US, Asia, Latin America, Europe</li>
        </ul>
      </div>
      <div>
        <h3 class="section__heading--sm">Who it&rsquo;s NOT for</h3>
        <ul class="who-list">
          <li><span class="cross" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span> People who want a structured curriculum from beginner to pro</li>
          <li><span class="cross" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span> Players looking for one-on-one lessons (we&rsquo;ll have that later)</li>
          <li><span class="cross" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span> Anyone who doesn&rsquo;t actually want to practice</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- =========================================================
     SECTION 5 — SOCIAL PROOF
========================================================= -->
<section class="section section-border" id="social-proof">
  <div class="container">
    <span class="section__mono-label">// From the community</span>
    <h2 class="section__heading">Real bassists. Real progress.</h2>

    <div class="testimonials">
      <div class="testimonial">
        <p class="testimonial__quote">&ldquo;I&rsquo;ve been looking for something exactly like this. Finally, practice material that&rsquo;s actually fun and keeps coming.&rdquo;</p>
        <span class="testimonial__author">@placeholder_user1 &mdash; TikTok</span>
      </div>
      <div class="testimonial">
        <p class="testimonial__quote">&ldquo;Bro you need to make a course or something. I&rsquo;d pay for more content like this every week.&rdquo;</p>
        <span class="testimonial__author">@placeholder_user2 &mdash; TikTok</span>
      </div>
      <div class="testimonial">
        <p class="testimonial__quote">&ldquo;This is making me actually practice consistently for the first time in years. The grooves are addictive.&rdquo;</p>
        <span class="testimonial__author">@placeholder_user3 &mdash; Instagram</span>
      </div>
    </div>

    <div class="proof-stats">
      <div class="proof-stat">
        <div class="proof-stat__value">90,000+</div>
        <div class="proof-stat__label">TikTok followers</div>
      </div>
      <div class="proof-stat">
        <div class="proof-stat__value">10,000+</div>
        <div class="proof-stat__label">Instagram followers</div>
      </div>
      <div class="proof-stat">
        <div class="proof-stat__value">20k&ndash;400k</div>
        <div class="proof-stat__label">Avg. video views</div>
      </div>
    </div>
  </div>
</section>

<!-- =========================================================
     SECTION 6 — WHY $1.50
========================================================= -->
<section class="section section-border" id="why-price">
  <div class="container">
    <div class="why-section">
      <div>
        <span class="section__mono-label">// The price</span>
        <h2 class="section__heading">Why $1.50?</h2>
        <p class="section__body" style="margin-bottom: var(--space-5);">
          Because practice shouldn&rsquo;t cost a meal.
        </p>
        <p class="section__body" style="margin-bottom: var(--space-5);">
          Most bass platforms cost $20, $30, $50 a month &mdash; gatekeeping serious players behind serious money. We built Basscally Club for every bassist with internet, anywhere on Earth.
        </p>
        <p class="section__body">
          Cancel anytime. Keep everything you&rsquo;ve already downloaded.
        </p>
      </div>
      <div class="why-section__right">
        <span class="section__mono-label" style="margin-bottom: var(--space-2);">// Price comparison</span>
        <div class="price-compare">
          <div class="price-compare__row">
            <span>Typical bass masterclass</span>
            <span class="price">$20&ndash;$50/mo</span>
          </div>
          <div class="price-compare__row">
            <span>One-on-one bass lesson</span>
            <span class="price">$40&ndash;$80/hr</span>
          </div>
          <div class="price-compare__row">
            <span>Bass tab subscription</span>
            <span class="price">$10&ndash;$15/mo</span>
          </div>
          <div class="price-compare__row price-compare__row--us">
            <span>Basscally Club</span>
            <span class="price">$1.50/mo</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =========================================================
     SECTION 7 — FOUNDING MEMBER OFFER
========================================================= -->
<section class="section section-border" id="founding">
  <div class="container">
    <div class="founding">
      <span class="section__mono-label">// Limited offer</span>
      <h2 class="founding__heading">Founding Member Offer</h2>
      <p class="founding__body">
        The first 500 members lock in <strong style="color:var(--color-text);">$1.50/month for life</strong>. After that, the price goes up.
      </p>
      <a href="#checkout" class="btn btn--primary btn--lg">
        Become a Founding Member &mdash; $1.50/month
        <span class="btn__arrow" aria-hidden="true">&rarr;</span>
      </a>
      <div class="founding__fine">Founding member spots remaining: 500</div>
    </div>
  </div>
</section>

<!-- =========================================================
     SECTION 8 — FAQ
========================================================= -->
<section class="section section-border" id="faq">
  <div class="container">
    <span class="section__mono-label">// Questions</span>
    <h2 class="section__heading">Frequently Asked Questions</h2>

    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          What exactly do I get in the Club?
          <span class="faq-q__icon" aria-hidden="true"></span>
        </button>
        <div class="faq-a" role="region">
          <div class="faq-a__inner">A new bass practice drop every 3 days &mdash; either a bass-less cover, a groove, a fill, or a challenge. Plus the weekly bass-less version of whatever song we covered that week on TikTok. All audio files, downloadable.</div>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          How often is new content released?
          <span class="faq-q__icon" aria-hidden="true"></span>
        </button>
        <div class="faq-a" role="region">
          <div class="faq-a__inner">Every 3 days, like clockwork. About 10 new drops per month.</div>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          Can I cancel anytime?
          <span class="faq-q__icon" aria-hidden="true"></span>
        </button>
        <div class="faq-a" role="region">
          <div class="faq-a__inner">Yes. One click in your dashboard. You keep access until the end of your paid period.</div>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          Do I need to be an advanced player?
          <span class="faq-q__icon" aria-hidden="true"></span>
        </button>
        <div class="faq-a" role="region">
          <div class="faq-a__inner">No. Every drop is tagged Beginner, Intermediate, or Advanced. Start where you are.</div>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          I&rsquo;m not in the UK or US. Does this work for me?
          <span class="faq-q__icon" aria-hidden="true"></span>
        </button>
        <div class="faq-a" role="region">
          <div class="faq-a__inner">Yes. We accept payments globally through Lemon Squeezy. Members are joining from Africa, Europe, Asia, Latin America, and beyond.</div>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          Can I download the files or only stream?
          <span class="faq-q__icon" aria-hidden="true"></span>
        </button>
        <div class="faq-a" role="region">
          <div class="faq-a__inner">Download. They&rsquo;re yours to practice with anywhere, online or offline.</div>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          Is this taught by Chris?
          <span class="faq-q__icon" aria-hidden="true"></span>
        </button>
        <div class="faq-a" role="region">
          <div class="faq-a__inner">Yes. Chris produces every drop. Same player you see on TikTok, just now with structured practice material.</div>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          What if I don&rsquo;t like it?
          <span class="faq-q__icon" aria-hidden="true"></span>
        </button>
        <div class="faq-a" role="region">
          <div class="faq-a__inner">Cancel anytime. We don&rsquo;t lock you in. We earn your $1.50 every month.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =========================================================
     SECTION 9 — FINAL CTA
========================================================= -->
<section class="section section-border final-cta" id="join">
  <div class="container">
    <h2 class="final-cta__heading">Stop scrolling.<br>Start practicing.</h2>
    <p class="final-cta__sub">For less than a coffee, get a new bass practice drop every 3 days.</p>
    <a href="#checkout" class="btn btn--primary btn--lg">
      Join Basscally Club &mdash; $1.50/month
      <span class="btn__arrow" aria-hidden="true">&rarr;</span>
    </a>
  </div>
</section>

<!-- =========================================================
     FOOTER
========================================================= -->
<footer class="footer">
  <div class="footer__inner">
    <div>
      <div class="footer__brand">Basscally Club</div>
      <div class="footer__tagline">A bass practice membership.</div>
      <div class="footer__socials">
        <a href="#" class="footer__social-link" aria-label="TikTok">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.27 8.27 0 0 0 4.76 1.5v-3.5a4.82 4.82 0 0 1-1-.01Z"/></svg>
        </a>
        <a href="#" class="footer__social-link" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="#" class="footer__social-link" aria-label="YouTube">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3 3 0 0 0-2.12-2.12C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.57A3 3 0 0 0 .5 6.19 31.25 31.25 0 0 0 0 12a31.25 31.25 0 0 0 .5 5.81 3 3 0 0 0 2.12 2.12c1.84.57 9.38.57 9.38.57s7.54 0 9.38-.57a3 3 0 0 0 2.12-2.12A31.25 31.25 0 0 0 24 12a31.25 31.25 0 0 0-.5-5.81ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z"/></svg>
        </a>
      </div>
      <div class="footer__contact">
        <a href="mailto:hello@basscally.club">hello@basscally.club</a>&ensp;&middot;&ensp;Contact
      </div>
    </div>
    <div class="footer__links">
      <a href="#" class="footer__link">Terms of Service</a>
      <a href="#" class="footer__link">Privacy Policy</a>
      <a href="#" class="footer__link">Refund Policy</a>
    </div>
    <div class="footer__copy">&copy; 2026 Basscally. All rights reserved.</div>
  </div>
</footer>

<!-- =========================================================
     MOBILE STICKY CTA BAR
========================================================= -->
<div class="mobile-cta-bar" aria-hidden="true">
  <a href="#checkout" class="btn btn--primary">Join &mdash; $1.50/mo</a>
</div>

<!-- =========================================================
     SCRIPTS
========================================================= -->
<script>
  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Mobile sticky CTA — only show after hero CTA scrolls out of view
  (function() {
    const heroCta = document.querySelector('.hero__cta-cluster');
    const bar = document.querySelector('.mobile-cta-bar');
    if (!heroCta || !bar) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bar.classList.remove('visible');
        } else {
          bar.classList.add('visible');
        }
      });
    }, { threshold: 0 });

    observer.observe(heroCta);
  })();
</script>

</body>
</html>

```

## Screen 03: Auth Login

Route: `/auth/login`
Reference file: `basscally-auth-login.html`
Purpose: Magic link login, loading, validation, success

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Sign in — Basscally Club</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --color-brand:          #FF4500;
    --color-brand-hover:    #FF5C1F;
    --color-brand-muted:    #2A1408;
    --color-bg:             #0A0A0B;
    --color-surface:        #141416;
    --color-surface-raised: #1C1C1F;
    --color-border:         #26262A;
    --color-border-strong:  #3A3A40;
    --color-text:           #F5F5F7;
    --color-text-muted:     #A1A1A8;
    --color-text-dim:       #6B6B72;
    --color-success:        #34D399;
    --color-danger:         #F87171;

    --font-display: "Cabinet Grotesk", "Inter", system-ui, sans-serif;
    --font-body:    "Geist", "Inter", -apple-system, sans-serif;
    --font-mono:    "Geist Mono", "JetBrains Mono", monospace;

    --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
    --space-4: 16px; --space-5: 24px; --space-6: 32px;
    --space-8: 48px; --space-10: 64px;

    --radius-md: 10px; --radius-lg: 14px; --radius-full: 9999px;

    --shadow-brand-glow: 0 0 32px rgba(255,69,0,0.28);
    --motion-fast: 150ms;
    --motion-default: 250ms;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  ::selection { background: var(--color-brand); color: #FFF; }

  /* ============================================================
     LAYOUT — centered vertically, full viewport
  ============================================================ */
  .auth-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-5);
    position: relative;
  }

  /* Subtle warm glow — same language as the hero */
  .auth-page::before {
    content: "";
    position: absolute;
    top: -120px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 500px;
    background: radial-gradient(circle, rgba(255,69,0,0.06) 0%, transparent 55%);
    pointer-events: none;
  }

  /* ============================================================
     BACK LINK
  ============================================================ */
  .auth-back {
    position: absolute;
    top: var(--space-5);
    left: var(--space-5);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--motion-fast) var(--ease-out);
  }
  .auth-back:hover { color: var(--color-text); }
  .auth-back svg { transition: transform var(--motion-fast) var(--ease-out); }
  .auth-back:hover svg { transform: translateX(-2px); }

  /* ============================================================
     AUTH CARD
  ============================================================ */
  .auth-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Brand mark */
  .auth-card__mark {
    width: 44px; height: 44px;
    border-radius: 11px;
    background: var(--color-brand);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-weight: 800; font-size: 22px;
    color: #FFF; line-height: 1;
    margin-bottom: var(--space-6);
  }

  .auth-card__heading {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 28px;
    letter-spacing: -0.02em;
    line-height: 1.1;
    text-align: center;
    margin-bottom: var(--space-2);
  }

  .auth-card__sub {
    font-size: 15px;
    color: var(--color-text-muted);
    text-align: center;
    margin-bottom: var(--space-8);
    max-width: 320px;
  }

  /* ============================================================
     FORM
  ============================================================ */
  .auth-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .field__label {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-muted);
    letter-spacing: 0.01em;
  }

  .field__input {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--color-text);
    outline: none;
    transition: border-color var(--motion-fast) var(--ease-out),
                box-shadow var(--motion-fast) var(--ease-out);
    -webkit-appearance: none;
  }

  .field__input::placeholder {
    color: var(--color-text-dim);
  }

  .field__input:focus {
    border-color: var(--color-brand);
    box-shadow: 0 0 0 3px rgba(255,69,0,0.15);
  }

  /* Error state */
  .field__input.error {
    border-color: var(--color-danger);
    box-shadow: 0 0 0 3px rgba(248,113,113,0.15);
  }

  .field__error {
    font-size: 13px;
    color: var(--color-danger);
    display: none;
  }

  .field__input.error ~ .field__error { display: block; }

  /* ============================================================
     BUTTONS (auth context)
  ============================================================ */
  .btn {
    font-family: var(--font-body);
    font-weight: 600; font-size: 15px; line-height: 1;
    padding: 14px var(--space-5);
    border-radius: var(--radius-lg);
    border: 1px solid transparent;
    cursor: pointer;
    transition: all var(--motion-fast) var(--ease-out);
    text-decoration: none;
    display: inline-flex; align-items: center; justify-content: center;
    gap: 8px; white-space: nowrap;
    width: 100%;
  }

  .btn--primary { background: var(--color-brand); color: #FFF; }
  .btn--primary:hover { background: var(--color-brand-hover); box-shadow: var(--shadow-brand-glow); }
  .btn--primary:active { transform: scale(0.98); }

  .btn--primary:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
  }

  .btn:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 3px; }

  /* Loading spinner inside button */
  .btn__spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #FFF;
    border-radius: 50%;
    display: none;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ============================================================
     STATES — default, loading, success, error
  ============================================================ */

  /* --- Loading state --- */
  .auth-form.loading .btn__label { opacity: 0; }
  .auth-form.loading .btn__spinner {
    display: block;
    animation: spin 600ms linear infinite;
  }
  .auth-form.loading .btn--primary { pointer-events: none; }
  .auth-form.loading .field__input { pointer-events: none; opacity: 0.6; }

  /* --- Success state (email sent) --- */
  .auth-success {
    display: none;
    width: 100%;
    max-width: 400px;
    text-align: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .auth-success.active { display: flex; }
  .auth-card.hidden { display: none; }

  .auth-success__icon {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: rgba(52,211,153,0.12);
    border: 1px solid rgba(52,211,153,0.25);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: var(--space-6);
    color: var(--color-success);
  }

  .auth-success__heading {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 24px;
    letter-spacing: -0.02em;
    margin-bottom: var(--space-3);
  }

  .auth-success__body {
    font-size: 15px;
    color: var(--color-text-muted);
    line-height: 1.55;
    margin-bottom: var(--space-6);
    max-width: 340px;
  }

  .auth-success__email {
    color: var(--color-text);
    font-weight: 500;
  }

  .auth-success__fine {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-text-dim);
    letter-spacing: 0.03em;
  }

  .auth-success__fine a {
    color: var(--color-text-muted);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* ============================================================
     FOOTER NOTE
  ============================================================ */
  .auth-footer {
    position: absolute;
    bottom: var(--space-5);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-align: center;
  }

  .auth-footer a {
    color: var(--color-text-muted);
    text-decoration: none;
  }
  .auth-footer a:hover { color: var(--color-text); }

  /* ============================================================
     RESPONSIVE
  ============================================================ */
  @media (max-width: 767px) {
    .auth-page { padding: var(--space-4); justify-content: flex-start; padding-top: 100px; }
    .auth-back { top: var(--space-4); left: var(--space-4); }
    .auth-card__heading { font-size: 24px; }
    .auth-card__sub { font-size: 14px; }
    .auth-footer { position: relative; bottom: auto; margin-top: var(--space-10); }
  }

  @media (max-width: 400px) {
    .auth-card__mark { width: 40px; height: 40px; font-size: 20px; border-radius: 10px; }
    .auth-card__heading { font-size: 22px; }
  }
</style>
</head>
<body>

<div class="auth-page">

  <!-- Back to home -->
  <a href="/" class="auth-back">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
    Back
  </a>

  <!-- === DEFAULT STATE: email form === -->
  <div class="auth-card" id="auth-card">

    <div class="auth-card__mark" aria-hidden="true">B</div>

    <h1 class="auth-card__heading">Sign in to Basscally Club</h1>
    <p class="auth-card__sub">Enter your email and we&rsquo;ll send you a magic link. No password needed.</p>

    <div class="auth-form" id="auth-form">
      <div class="field">
        <label class="field__label" for="email">Email address</label>
        <input
          class="field__input"
          id="email"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
          required
          autofocus
        />
        <span class="field__error">Enter a valid email address.</span>
      </div>

      <button class="btn btn--primary" type="button" id="submit-btn">
        <span class="btn__label">Send magic link</span>
        <span class="btn__spinner" aria-hidden="true"></span>
      </button>
    </div>

    <p style="margin-top: var(--space-5); font-size: 14px; color: var(--color-text-dim); text-align: center;">
      Don&rsquo;t have an account?
      <a href="#checkout" style="color: var(--color-brand); text-decoration: none; font-weight: 500;">Join for $1.50/month</a>
    </p>

  </div>

  <!-- === SUCCESS STATE: check your email === -->
  <div class="auth-success" id="auth-success">

    <div class="auth-success__icon" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    </div>

    <h1 class="auth-success__heading">Check your email</h1>
    <p class="auth-success__body">
      We sent a magic link to <span class="auth-success__email" id="sent-email">you@example.com</span>. Click it to sign in.
    </p>

    <p class="auth-success__fine">
      Didn&rsquo;t get it? Check spam, or <a href="#" id="resend-link">resend</a>.
    </p>

  </div>

  <!-- Footer -->
  <div class="auth-footer">
    <a href="/">Basscally Club</a> &ensp;&middot;&ensp; <a href="#">Privacy</a> &ensp;&middot;&ensp; <a href="#">Terms</a>
  </div>

</div>

<!-- =========================================================
     INTERACTION DEMO (simulates form states)
========================================================= -->
<script>
  const form = document.getElementById('auth-form');
  const card = document.getElementById('auth-card');
  const success = document.getElementById('auth-success');
  const emailInput = document.getElementById('email');
  const submitBtn = document.getElementById('submit-btn');
  const sentEmail = document.getElementById('sent-email');

  submitBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();

    // Validate
    if (!email || !email.includes('@') || !email.includes('.')) {
      emailInput.classList.add('error');
      return;
    }
    emailInput.classList.remove('error');

    // Loading state
    form.classList.add('loading');

    // Simulate API call
    setTimeout(() => {
      form.classList.remove('loading');
      // Transition to success
      sentEmail.textContent = email;
      card.classList.add('hidden');
      success.classList.add('active');
    }, 1500);
  });

  // Clear error on input
  emailInput.addEventListener('input', () => {
    emailInput.classList.remove('error');
  });

  // Enter key submits
  emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitBtn.click();
  });
</script>

</body>
</html>

```

## Screen 04: Dashboard Empty

Route: `/dashboard`
Reference file: `basscally-screen-4-dashboard-empty-art-motion.html`
Purpose: New member before content or first login

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Screen 4 — Member Dashboard Empty</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --color-brand:          #FF4500;
    --color-brand-hover:    #FF5C1F;
    --color-brand-muted:    #2A1408;

    --color-bg:             #0A0A0B;
    --color-surface:        #141416;
    --color-surface-raised: #1C1C1F;
    --color-surface-sunken: #060607;

    --color-border:         #26262A;
    --color-border-strong:  #3A3A40;

    --color-text:           #F5F5F7;
    --color-text-muted:     #A1A1A8;
    --color-text-dim:       #6B6B72;

    --color-success:        #34D399;
    --color-warning:        #FBBF24;
    --color-danger:         #F87171;
    --color-info:           #60A5FA;

    --font-display: "Cabinet Grotesk", "Inter", system-ui, sans-serif;
    --font-body:    "Geist", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono:    "Geist Mono", "JetBrains Mono", monospace;

    --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
    --space-4: 16px; --space-5: 24px; --space-6: 32px;
    --space-8: 48px; --space-10: 64px; --space-12: 96px;
    --space-16: 128px;

    --radius-sm:   6px;
    --radius-md:   10px;
    --radius-lg:   14px;
    --radius-xl:   20px;
    --radius-full: 9999px;

    --shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.5);
    --shadow-lg: 0 12px 32px rgba(0,0,0,0.6);
    --shadow-brand-glow: 0 0 32px rgba(255,69,0,0.28);

    --motion-fast: 150ms;
    --motion-default: 250ms;
    --motion-slow: 400ms;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    background:
      radial-gradient(circle at 16% -12%, rgba(255,69,0,0.10), transparent 34%),
      radial-gradient(circle at 86% 8%, rgba(255,69,0,0.035), transparent 30%),
      var(--color-bg);
    color: var(--color-text);
    overflow-x: hidden;
  }

  ::selection { background: var(--color-brand); color: #fff; }

  a { color: inherit; }

  button, input, textarea, select { font: inherit; }

  .shell {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 268px minmax(0, 1fr);
  }

  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    padding: var(--space-5);
    border-right: 1px solid rgba(38,38,42,0.82);
    background: rgba(10,10,11,0.74);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .brand__mark {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--color-brand);
    color: #fff;
    display: grid;
    place-items: center;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 15px;
    line-height: 1;
  }

  .brand__text {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: var(--color-text);
  }

  .nav-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .nav-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);
    margin-bottom: var(--space-2);
  }

  .nav-item {
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-3);
    border-radius: var(--radius-lg);
    color: var(--color-text-muted);
    text-decoration: none;
    border: 1px solid transparent;
    transition: all var(--motion-fast) var(--ease-out);
  }

  .nav-item svg {
    width: 19px;
    height: 19px;
    color: var(--color-text-dim);
    transition: color var(--motion-fast) var(--ease-out);
  }

  .nav-item:hover {
    color: var(--color-text);
    background: var(--color-surface);
  }

  .nav-item.active {
    color: var(--color-text);
    background: var(--color-surface);
    border-color: var(--color-border);
  }

  .nav-item.active svg {
    color: var(--color-brand);
  }

  .sidebar-card {
    margin-top: auto;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
  }

  .sidebar-card__eyebrow {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--color-success);
    margin-bottom: var(--space-2);
  }

  .sidebar-card__title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 18px;
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: var(--color-text);
    margin-bottom: var(--space-2);
  }

  .sidebar-card__text {
    font-size: 13px;
    color: var(--color-text-muted);
    line-height: 1.5;
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 30;
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-8);
    border-bottom: 1px solid rgba(38,38,42,0.78);
    background: rgba(10,10,11,0.72);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
  }

  .topbar__left {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .mobile-menu {
    display: none;
    width: 42px;
    height: 42px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    background: var(--color-surface);
    align-items: center;
    justify-content: center;
  }

  .topbar__label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);
  }

  .topbar__actions {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-full);
    background: linear-gradient(135deg, var(--color-surface-raised), var(--color-brand-muted));
    border: 1px solid var(--color-border-strong);
    display: grid;
    place-items: center;
    color: var(--color-text);
    font-weight: 700;
    font-size: 13px;
  }

  .page {
    max-width: 1240px;
    margin: 0 auto;
    padding: var(--space-8);
  }

  .page--wide {
    max-width: 1360px;
  }

  .page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-6);
    margin-bottom: var(--space-8);
  }

  .page-kicker {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);
    margin-bottom: var(--space-3);
  }

  .page-title {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 800;
    line-height: 0.98;
    letter-spacing: -0.04em;
    color: var(--color-text);
    max-width: 720px;
  }

  .page-subtitle {
    max-width: 560px;
    margin-top: var(--space-4);
    color: var(--color-text-muted);
    font-size: 17px;
    line-height: 1.55;
  }

  .btn {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
    min-height: 44px;
    padding: 12px 18px;
    border-radius: var(--radius-lg);
    border: 1px solid transparent;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    white-space: nowrap;
    transition: all var(--motion-fast) var(--ease-out);
  }

  .btn--primary {
    background: var(--color-brand);
    color: #fff;
  }

  .btn--primary:hover {
    background: var(--color-brand-hover);
    box-shadow: var(--shadow-brand-glow);
  }

  .btn--secondary {
    background: transparent;
    border-color: var(--color-border-strong);
    color: var(--color-text);
  }

  .btn--secondary:hover {
    background: var(--color-surface-raised);
    border-color: var(--color-text-muted);
  }

  .btn--ghost {
    background: transparent;
    color: var(--color-text-muted);
  }

  .btn--ghost:hover {
    background: var(--color-surface);
    color: var(--color-text);
  }

  .btn:focus-visible, .nav-item:focus-visible, .tab:focus-visible, .card-link:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 3px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-full);
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1.35;
  }

  .badge--founding {
    background: var(--color-brand-muted);
    color: var(--color-brand);
  }

  .badge--active {
    background: rgba(52,211,153,0.15);
    color: var(--color-success);
  }

  .badge--beginner {
    background: rgba(96,165,250,0.15);
    color: var(--color-info);
  }

  .badge--intermediate {
    background: rgba(251,191,36,0.15);
    color: var(--color-warning);
  }

  .badge--advanced {
    background: rgba(248,113,113,0.15);
    color: var(--color-danger);
  }

  .badge--type {
    background: rgba(245,245,247,0.06);
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
  }

  .panel {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
  }

  .muted { color: var(--color-text-muted); }
  .dim { color: var(--color-text-dim); }
  .orange { color: var(--color-brand); }

  .icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .audio-bar {
    position: sticky;
    bottom: 0;
    z-index: 40;
    height: 72px;
    background: rgba(6,6,7,0.88);
    border-top: 1px solid var(--color-border);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-3) var(--space-8);
  }

  .audio-bar__thumb {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background:
      linear-gradient(135deg, rgba(255,69,0,0.28), rgba(245,245,247,0.05)),
      var(--color-surface-raised);
    flex-shrink: 0;
  }

  .audio-bar__meta {
    min-width: 180px;
  }

  .audio-bar__title {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.25;
  }

  .audio-bar__sub {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .play {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-full);
    border: 0;
    background: var(--color-brand);
    color: #fff;
    display: grid;
    place-items: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all var(--motion-fast) var(--ease-out);
  }

  .play:hover {
    background: var(--color-brand-hover);
    box-shadow: var(--shadow-brand-glow);
  }

  .scrub {
    flex: 1;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 140px;
  }

  .scrub__time {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    width: 38px;
  }

  .scrub__track {
    position: relative;
    height: 4px;
    flex: 1;
    border-radius: var(--radius-full);
    background: var(--color-border-strong);
    overflow: hidden;
  }

  .scrub__fill {
    position: absolute;
    inset: 0 auto 0 0;
    width: 38%;
    border-radius: var(--radius-full);
    background: var(--color-brand);
  }

  .mobile-bottom-nav {
    display: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .page-header, .panel, .content-card, .stat-card, .empty-hero, .detail-hero {
      opacity: 0;
      transform: translateY(14px);
      animation: rise 650ms var(--ease-out) forwards;
    }

    .panel:nth-of-type(2), .content-card:nth-of-type(2), .stat-card:nth-of-type(2) { animation-delay: 80ms; }
    .panel:nth-of-type(3), .content-card:nth-of-type(3), .stat-card:nth-of-type(3) { animation-delay: 140ms; }

    @keyframes rise {
      to { opacity: 1; transform: translateY(0); }
    }
  }

  @media (max-width: 1080px) {
    .shell {
      grid-template-columns: 1fr;
    }

    .sidebar {
      display: none;
    }

    .mobile-menu {
      display: inline-flex;
    }

    .topbar {
      padding: 0 var(--space-5);
    }

    .page {
      padding: var(--space-6) var(--space-5) calc(var(--space-10) + 84px);
    }

    .audio-bar {
      padding: var(--space-3) var(--space-5);
    }
  }

  @media (max-width: 767px) {
    .topbar {
      min-height: 64px;
    }

    .topbar__actions .btn--secondary,
    .topbar__label {
      display: none;
    }

    .page {
      padding: var(--space-5) var(--space-4) calc(var(--space-12) + 84px);
    }

    .page-header {
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: var(--space-6);
    }

    .page-title {
      font-size: clamp(34px, 10vw, 44px);
      letter-spacing: -0.035em;
    }

    .page-subtitle {
      font-size: 16px;
    }

    .audio-bar {
      height: 76px;
      padding: var(--space-3) var(--space-4);
    }

    .audio-bar__meta {
      min-width: 0;
      flex: 1;
    }

    .scrub {
      display: none;
    }

    .audio-bar .btn {
      display: none;
    }

    .mobile-bottom-nav {
      position: fixed;
      left: var(--space-4);
      right: var(--space-4);
      bottom: var(--space-4);
      z-index: 50;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: rgba(20,20,22,0.92);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }

    .mobile-bottom-nav a {
      min-height: 58px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      color: var(--color-text-dim);
      text-decoration: none;
      font-size: 10px;
      font-family: var(--font-mono);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .mobile-bottom-nav a.active {
      color: var(--color-text);
      background: rgba(255,69,0,0.08);
    }

    .mobile-bottom-nav svg {
      width: 18px;
      height: 18px;
      color: currentColor;
    }
  }
</style>

<style>
  .dashboard-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) 360px;
    gap: var(--space-5);
    align-items: start;
  }

  .empty-hero {
    position: relative;
    overflow: hidden;
    min-height: 460px;
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .empty-hero::before {
    content: "";
    position: absolute;
    top: -180px;
    right: -120px;
    width: 520px;
    height: 520px;
    background: radial-gradient(circle, rgba(255,69,0,0.12), transparent 60%);
    pointer-events: none;
  }

  .empty-hero__content {
    position: relative;
    z-index: 1;
    max-width: 640px;
  }

  .empty-hero__badge-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-6);
  }

  .empty-hero__title {
    font-family: var(--font-display);
    font-size: clamp(42px, 6vw, 72px);
    line-height: 0.95;
    letter-spacing: -0.045em;
    font-weight: 800;
    max-width: 650px;
    margin-bottom: var(--space-5);
  }

  .empty-hero__title span {
    color: var(--color-brand);
    font-style: italic;
  }

  .empty-hero__text {
    font-size: 18px;
    color: var(--color-text-muted);
    max-width: 560px;
    line-height: 1.55;
    margin-bottom: var(--space-6);
  }

  .empty-hero__actions {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-wrap: wrap;
  }

  .empty-hero__bottom {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-8);
  }

  .mini-stat {
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-border);
  }

  .mini-stat__value {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1;
    margin-bottom: var(--space-1);
  }

  .mini-stat__label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-text-dim);
  }

  .right-rail {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .rail-panel {
    padding: var(--space-5);
  }

  .rail-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);
    margin-bottom: var(--space-4);
  }

  .drop-card {
    border-top: 1px solid var(--color-border);
    padding-top: var(--space-4);
  }

  .drop-card__time {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--color-brand);
    margin-bottom: var(--space-2);
  }

  .drop-card__title {
    font-family: var(--font-display);
    font-size: 24px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 700;
    margin-bottom: var(--space-3);
  }

  .drop-card__desc {
    font-size: 14px;
    color: var(--color-text-muted);
    line-height: 1.55;
    margin-bottom: var(--space-4);
  }

  .progress-ring {
    width: 100%;
    aspect-ratio: 1;
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border);
    background:
      conic-gradient(from 0deg, var(--color-brand) 0 28%, var(--color-border) 28% 100%);
    padding: 10px;
    margin-bottom: var(--space-4);
  }

  .progress-ring__inner {
    height: 100%;
    border-radius: 16px;
    background: var(--color-surface);
    display: grid;
    place-items: center;
    text-align: center;
    padding: var(--space-5);
  }

  .progress-ring__value {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .progress-ring__label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: var(--space-2);
  }

  .starter-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-5);
  }

  .starter-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    min-height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all var(--motion-default) var(--ease-out);
  }

  .starter-card:hover {
    transform: translateY(-2px);
    border-color: var(--color-border-strong);
    box-shadow: var(--shadow-md);
  }

  .starter-card__icon {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    background: var(--color-brand-muted);
    color: var(--color-brand);
    display: grid;
    place-items: center;
    margin-bottom: var(--space-4);
  }

  .starter-card__title {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.015em;
    margin-bottom: var(--space-2);
  }

  .starter-card__text {
    color: var(--color-text-muted);
    font-size: 14px;
    line-height: 1.5;
  }

  .starter-card__meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: var(--space-5);
  }

  .section-title-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-5);
    margin: var(--space-8) 0 var(--space-5);
  }

  .section-title {
    font-family: var(--font-display);
    font-size: 28px;
    line-height: 1.05;
    letter-spacing: -0.025em;
    font-weight: 700;
  }

  .section-note {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-text-dim);
  }

  .loading-skeletons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
  }

  .skeleton-card {
    height: 260px;
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .skeleton-line {
    height: 12px;
    border-radius: var(--radius-full);
    background: linear-gradient(90deg, var(--color-surface-raised), var(--color-border), var(--color-surface-raised));
    background-size: 220% 100%;
  }

  @media (prefers-reduced-motion: no-preference) {
    .skeleton-line {
      animation: shimmer 1.8s ease-in-out infinite;
    }

    @keyframes shimmer {
      from { background-position: 0% 50%; }
      to { background-position: -220% 50%; }
    }
  }

  .skeleton-cover {
    height: 118px;
    border-radius: var(--radius-md);
    background: var(--color-surface-raised);
    border: 1px solid var(--color-border);
  }

  @media (max-width: 1180px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }

    .right-rail {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .starter-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 767px) {
    .empty-hero {
      min-height: auto;
      padding: var(--space-6) var(--space-5);
    }

    .empty-hero__bottom,
    .right-rail,
    .starter-grid,
    .loading-skeletons {
      grid-template-columns: 1fr;
    }

    .empty-hero__actions .btn {
      width: 100%;
    }

    .section-title-row {
      align-items: flex-start;
      flex-direction: column;
      gap: var(--space-2);
    }
  }
</style>

<style id="basscally-art-motion-v3">
  /* ============================================================
     ART + MOTION PASS
     Standalone HTML version of the Framer Motion direction.
     Keep the structure. Push depth, contrast, and motion.
  ============================================================ */
  :root {
    --color-brand:          #FF4A05;
    --color-brand-hover:    #FF6A2A;
    --color-brand-muted:    #371407;
    --color-bg:             #030304;
    --color-surface:        #101012;
    --color-surface-raised: #19191D;
    --color-surface-sunken: #030304;
    --color-border:         #2B2B31;
    --color-border-strong:  #464048;
    --color-text:           #FAFAFC;
    --color-text-muted:     #B6B2B6;
    --color-text-dim:       #777179;
    --shadow-md: 0 18px 44px rgba(0,0,0,0.42);
    --shadow-lg: 0 28px 90px rgba(0,0,0,0.62);
    --shadow-brand-glow: 0 0 34px rgba(255,74,5,0.34), 0 16px 52px rgba(255,74,5,0.16);
    --motion-spring: cubic-bezier(0.22, 1, 0.36, 1);
  }

  body {
    position: relative;
    isolation: isolate;
    background:
      radial-gradient(circle at 8% 4%, rgba(255,74,5,0.20), transparent 30%),
      radial-gradient(circle at 82% -8%, rgba(255,122,48,0.12), transparent 34%),
      radial-gradient(circle at 58% 44%, rgba(255,74,5,0.045), transparent 38%),
      linear-gradient(180deg, #030304 0%, #080708 48%, #030304 100%);
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 22% 18%, rgba(255,74,5,0.16), transparent 18%),
      radial-gradient(circle at 74% 10%, rgba(245,245,247,0.035), transparent 20%),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.026) 0 1px, transparent 1px 72px),
      repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 72px);
    mask-image: radial-gradient(ellipse at 50% 14%, black 0%, transparent 72%);
    -webkit-mask-image: radial-gradient(ellipse at 50% 14%, black 0%, transparent 72%);
    opacity: 0.9;
  }

  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E");
    opacity: 0.052;
    mix-blend-mode: screen;
  }

  .shell,
  .mobile-bottom-nav,
  .audio-bar {
    position: relative;
    z-index: 1;
  }

  .sidebar,
  .topbar {
    background: rgba(3,3,4,0.80);
    border-color: rgba(255,255,255,0.075);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.018), 0 24px 72px rgba(0,0,0,0.30);
  }

  .brand__mark,
  .avatar {
    box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 10px 30px rgba(255,74,5,0.22);
  }

  .page-title,
  .empty-hero__title,
  .latest-drop__title,
  .detail-title,
  .cover-type__big,
  .detail-cover__big {
    text-shadow: 0 1px 0 rgba(255,255,255,0.04), 0 24px 80px rgba(255,74,5,0.10);
  }

  .page-kicker,
  .topbar__label,
  .nav-label,
  .rail-label,
  .section-note {
    color: #8F8588;
  }

  .panel,
  .content-card,
  .starter-card,
  .skeleton-card,
  .rail-card,
  .stat-card,
  .drop-card,
  .practice-step,
  .download-card,
  .error-panel {
    background:
      linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012)),
      linear-gradient(135deg, rgba(255,74,5,0.030), transparent 38%),
      var(--color-surface);
    border-color: rgba(255,255,255,0.085);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.045),
      0 22px 70px rgba(0,0,0,0.30);
  }

  .panel:hover,
  .content-card:hover,
  .starter-card:hover,
  .rail-card:hover,
  .practice-step:hover {
    border-color: rgba(255,255,255,0.16);
  }

  .empty-hero,
  .latest-drop,
  .detail-hero,
  .player-panel {
    background:
      radial-gradient(circle at 78% 14%, rgba(255,74,5,0.24), transparent 28%),
      radial-gradient(circle at 28% 0%, rgba(255,255,255,0.055), transparent 26%),
      linear-gradient(135deg, rgba(255,74,5,0.055), transparent 32%),
      #0D0D10;
    border-color: rgba(255,255,255,0.11);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.06),
      0 34px 110px rgba(0,0,0,0.52);
  }

  .empty-hero::after,
  .latest-drop::after,
  .detail-hero::after,
  .player-panel::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.045) 38%, transparent 54%),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 44px);
    opacity: 0.42;
    mix-blend-mode: screen;
    transform: translateX(-18%);
  }

  .empty-hero > *,
  .latest-drop > *,
  .detail-hero > *,
  .player-panel > * {
    position: relative;
    z-index: 1;
  }

  .empty-hero__title span,
  .orange,
  .badge--founding,
  .cover-type__small,
  .detail-cover__small {
    color: #FF6428;
  }

  .badge {
    border: 1px solid rgba(255,255,255,0.075);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
  }

  .badge--founding,
  .badge--type {
    background: rgba(255,74,5,0.10);
  }

  .btn--primary,
  .play,
  .content-card__play {
    background:
      linear-gradient(180deg, #FF6A2A 0%, #FF4A05 48%, #C83300 100%);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 16px 46px rgba(255,74,5,0.24);
  }

  .btn--primary:hover,
  .play:hover,
  .content-card__play:hover {
    box-shadow: var(--shadow-brand-glow);
  }

  .btn--secondary,
  .btn--ghost,
  .nav-item,
  .tab {
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .nav-item.active,
  .tab.active {
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 34px rgba(0,0,0,0.28);
  }

  .latest-drop__cover,
  .content-card__cover,
  .detail-cover,
  .audio-bar__thumb {
    background:
      radial-gradient(circle at 26% 18%, rgba(255,255,255,0.16), transparent 13%),
      conic-gradient(from 210deg at 60% 50%, #FF4A05 0deg, #7B1B00 58deg, #151518 128deg, #FF7A30 194deg, #101012 258deg, #FF4A05 360deg),
      linear-gradient(135deg, #1E1E24, #050506);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 18px 62px rgba(255,74,5,0.14);
  }

  .latest-drop__cover::before,
  .content-card__cover::before,
  .detail-cover::before,
  .audio-bar__thumb::before {
    content: "";
    position: absolute;
    inset: 12%;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: inset 0 0 0 18px rgba(0,0,0,0.18), inset 0 0 0 19px rgba(255,255,255,0.05);
    opacity: 0.6;
  }

  .content-card__cover::after,
  .detail-cover::after {
    background-image:
      radial-gradient(circle, rgba(255,255,255,0.06) 0 1px, transparent 1px),
      linear-gradient(120deg, rgba(255,255,255,0.08), transparent 36%, rgba(255,74,5,0.09));
    background-size: 18px 18px, 100% 100%;
    mask-image: none;
    opacity: 0.55;
  }

  .cover-type,
  .detail-cover__type {
    background: rgba(3,3,4,0.64);
    border-color: rgba(255,255,255,0.16);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 54px rgba(0,0,0,0.38);
  }

  .content-card:nth-child(2) .content-card__cover,
  .related-item:nth-child(2) .related-thumb {
    filter: hue-rotate(-18deg) saturate(1.12);
  }

  .content-card:nth-child(3) .content-card__cover,
  .related-item:nth-child(3) .related-thumb {
    filter: hue-rotate(18deg) saturate(1.08);
  }

  .content-card:nth-child(4) .content-card__cover,
  .content-card:nth-child(6) .content-card__cover {
    filter: contrast(1.08) saturate(0.96);
  }

  .scrub__track,
  .player-wave {
    background:
      linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.008)),
      #070708;
    border: 1px solid rgba(255,255,255,0.07);
  }

  .scrub__fill,
  .wave-bar.played {
    background: linear-gradient(90deg, #FF8A4C, #FF4A05 55%, #C83300);
    box-shadow: 0 0 22px rgba(255,74,5,0.42);
  }

  .audio-bar {
    background: rgba(3,3,4,0.88);
    border-top-color: rgba(255,255,255,0.10);
    box-shadow: 0 -26px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.045);
  }

  .mobile-bottom-nav {
    background: rgba(5,5,6,0.92);
    border-color: rgba(255,255,255,0.10);
    box-shadow: 0 20px 80px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .progress-ring {
    background:
      conic-gradient(from -70deg, #FF8A4C 0 12%, #FF4A05 12% 31%, rgba(255,255,255,0.09) 31% 100%);
    box-shadow: 0 0 44px rgba(255,74,5,0.18);
  }

  .progress-ring__inner {
    background: radial-gradient(circle at 50% 0%, rgba(255,74,5,0.08), transparent 42%), #0A0A0B;
  }

  .skeleton-cover,
  .skeleton-line {
    background: linear-gradient(90deg, rgba(255,255,255,0.045), rgba(255,74,5,0.11), rgba(255,255,255,0.045));
    background-size: 220% 100%;
  }

  @media (prefers-reduced-motion: no-preference) {
    body::before {
      animation: ambientDrift 16s var(--motion-spring) infinite alternate;
    }

    .empty-hero::after,
    .latest-drop::after,
    .detail-hero::after,
    .player-panel::after {
      animation: artSweep 7s linear infinite;
    }

    .brand__mark,
    .play,
    .content-card__play,
    .btn--primary {
      transition: transform 220ms var(--motion-spring), box-shadow 220ms var(--motion-spring), filter 220ms var(--motion-spring);
    }

    .btn:hover,
    .play:hover,
    .content-card:hover {
      transform: translateY(-3px) scale(1.01);
    }

    .nav-item:hover,
    .tab:hover,
    .starter-card:hover,
    .practice-step:hover,
    .rail-card:hover {
      transform: translateY(-2px);
    }

    .play:active,
    .btn:active {
      transform: scale(0.965);
    }

    .latest-drop__cover,
    .content-card__cover,
    .detail-cover,
    .audio-bar__thumb {
      animation: vinylBreath 10s ease-in-out infinite alternate;
    }

    .scrub__fill {
      animation: progressBreath 2.6s ease-in-out infinite;
    }

    .wave-bar.played {
      animation: wavePulse 1.4s ease-in-out infinite alternate;
      transform-origin: bottom;
    }

    .wave-bar.played:nth-child(2n) { animation-delay: 120ms; }
    .wave-bar.played:nth-child(3n) { animation-delay: 240ms; }
    .wave-bar.played:nth-child(5n) { animation-delay: 360ms; }

    .motion-ready {
      opacity: 0;
      transform: translateY(20px) scale(0.985);
      filter: blur(6px);
      transition:
        opacity 720ms var(--motion-spring),
        transform 720ms var(--motion-spring),
        filter 720ms var(--motion-spring);
      transition-delay: calc(var(--motion-index, 0) * 42ms);
    }

    .motion-ready.is-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }

    .skeleton-cover,
    .skeleton-line {
      animation: shimmer 2.2s linear infinite;
    }

    @keyframes ambientDrift {
      from { transform: translate3d(-1%, -1%, 0) scale(1); opacity: 0.78; }
      to   { transform: translate3d(1.5%, 1%, 0) scale(1.03); opacity: 1; }
    }

    @keyframes artSweep {
      from { transform: translateX(-38%); }
      to   { transform: translateX(38%); }
    }

    @keyframes vinylBreath {
      from { filter: saturate(1.02) contrast(1.02); }
      to   { filter: saturate(1.18) contrast(1.08) brightness(1.04); }
    }

    @keyframes progressBreath {
      0%, 100% { filter: brightness(1); box-shadow: 0 0 18px rgba(255,74,5,0.32); }
      50%      { filter: brightness(1.18); box-shadow: 0 0 32px rgba(255,74,5,0.50); }
    }

    @keyframes wavePulse {
      from { filter: brightness(0.92); transform: scaleY(0.92); }
      to   { filter: brightness(1.22); transform: scaleY(1.04); }
    }

    @keyframes shimmer {
      from { background-position: 200% 0; }
      to   { background-position: -200% 0; }
    }
  }

  @media (max-width: 767px) {
    body::before {
      background:
        radial-gradient(circle at 20% 4%, rgba(255,74,5,0.18), transparent 32%),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 56px);
    }

    .page-title,
    .empty-hero__title,
    .latest-drop__title,
    .detail-title {
      text-shadow: 0 18px 56px rgba(255,74,5,0.13);
    }
  }
</style>

</head>
<body>


<div class="shell">
  <aside class="sidebar" aria-label="Member navigation">
    <a href="/dashboard" class="brand" aria-label="Basscally Club dashboard">
      <span class="brand__mark">B</span>
      <span class="brand__text">Basscally Club</span>
    </a>

    <nav class="nav-group">
      <div class="nav-label">// Practice</div>
      <a href="/dashboard" class="nav-item active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 13h8V3H3v10Z"/><path d="M13 21h8V11h-8v10Z"/><path d="M13 3v6h8V3h-8Z"/><path d="M3 21h8v-6H3v6Z"/></svg>
        Dashboard
      </a>
      <a href="#library" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5V6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5"/><path d="M8 8h8"/><path d="M8 12h6"/></svg>
        Library
      </a>
      <a href="#downloads" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
        Downloads
      </a>
      <a href="#challenge" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        Challenges
      </a>
    </nav>

    <nav class="nav-group">
      <div class="nav-label">// Account</div>
      <a href="/account" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>
        Membership
      </a>
      <a href="/auth/login" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>
        Sign out
      </a>
    </nav>

    <div class="sidebar-card">
      <div class="sidebar-card__eyebrow">Active membership</div>
      <h2 class="sidebar-card__title">$1.50 locked</h2>
      <p class="sidebar-card__text">Founding member pricing stays active while your membership is active.</p>
    </div>
  </aside>

  <main>
    <header class="topbar">
      <div class="topbar__left">
        <button class="mobile-menu" aria-label="Open menu">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
        </button>
        <span class="topbar__label">// Member area</span>
      </div>
      <div class="topbar__actions">
        <a href="/account" class="btn btn--secondary">Membership</a>
        <div class="avatar" aria-label="Michael">MO</div>
      </div>
    </header>

    <section class="page">
      <div class="page-header">
        <div>
          <div class="page-kicker">// Dashboard empty state</div>
          <h1 class="page-title">First drop lands soon.</h1>
          <p class="page-subtitle">Your membership is active. The Club starts with a clean practice room, then fills up every 3 days.</p>
        </div>
        <div class="badge badge--founding">Founding member</div>
      </div>

      <div class="dashboard-grid">
        <section class="panel empty-hero">
          <div class="empty-hero__content">
            <div class="empty-hero__badge-row">
              <span class="badge badge--active">Active</span>
              <span class="badge badge--type">Issue 001</span>
              <span class="badge badge--type">Every 3 days</span>
            </div>
            <h2 class="empty-hero__title">Your practice room is <span>open.</span></h2>
            <p class="empty-hero__text">No drops have landed yet. When Chris publishes the first one, it appears here with audio, difficulty, notes, and a download button.</p>
            <div class="empty-hero__actions">
              <a href="#starter" class="btn btn--primary">Preview the Club flow</a>
              <a href="/account" class="btn btn--secondary">View membership</a>
            </div>
          </div>

          <div class="empty-hero__bottom">
            <div class="mini-stat">
              <div class="mini-stat__value">0</div>
              <div class="mini-stat__label">Drops published</div>
            </div>
            <div class="mini-stat">
              <div class="mini-stat__value">3d</div>
              <div class="mini-stat__label">Release rhythm</div>
            </div>
            <div class="mini-stat">
              <div class="mini-stat__value">$1.50</div>
              <div class="mini-stat__label">Monthly price</div>
            </div>
          </div>
        </section>

        <aside class="right-rail">
          <section class="panel rail-panel">
            <div class="rail-label">// Next drop</div>
            <div class="drop-card">
              <div class="drop-card__time">Tuesday, 9:00 AM</div>
              <h3 class="drop-card__title">Funk slap pattern in E</h3>
              <p class="drop-card__desc">A tight one-bar groove for locking your right hand into the pocket.</p>
              <div style="display:flex; gap: var(--space-2); flex-wrap: wrap;">
                <span class="badge badge--type">Groove</span>
                <span class="badge badge--beginner">Beginner</span>
              </div>
            </div>
          </section>

          <section class="panel rail-panel">
            <div class="rail-label">// Buffer status</div>
            <div class="progress-ring" aria-label="30 day content buffer progress">
              <div class="progress-ring__inner">
                <div>
                  <div class="progress-ring__value">8</div>
                  <div class="progress-ring__label">Queued drops</div>
                </div>
              </div>
            </div>
            <p class="drop-card__desc">Enough material is queued for the first practice cycle. More drops are being produced.</p>
          </section>
        </aside>
      </div>

      <div class="section-title-row" id="starter">
        <div>
          <div class="page-kicker">// Starter categories</div>
          <h2 class="section-title">What will appear here</h2>
        </div>
        <div class="section-note">Content cards unlock on publish</div>
      </div>

      <section class="starter-grid" aria-label="Starter categories">
        <article class="starter-card">
          <div>
            <div class="starter-card__icon">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            </div>
            <h3 class="starter-card__title">Bass-less Covers</h3>
            <p class="starter-card__text">Songs from TikTok, without the bass. Drop in and play the part.</p>
          </div>
          <div class="starter-card__meta">Weekly</div>
        </article>

        <article class="starter-card">
          <div>
            <div class="starter-card__icon">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
            </div>
            <h3 class="starter-card__title">Grooves</h3>
            <p class="starter-card__text">Short patterns for pocket, timing, and clean repetition.</p>
          </div>
          <div class="starter-card__meta">Every 3 days</div>
        </article>

        <article class="starter-card">
          <div>
            <div class="starter-card__icon">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>
            </div>
            <h3 class="starter-card__title">Fills</h3>
            <p class="starter-card__text">Transitions you reuse in songs, rehearsals, and short videos.</p>
          </div>
          <div class="starter-card__meta">Short drops</div>
        </article>

        <article class="starter-card">
          <div>
            <div class="starter-card__icon">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <h3 class="starter-card__title">Challenges</h3>
            <p class="starter-card__text">A clear practice target for the week. Record it, share it, move.</p>
          </div>
          <div class="starter-card__meta">Weekly goal</div>
        </article>
      </section>

      <div class="section-title-row">
        <div>
          <div class="page-kicker">// Loading state</div>
          <h2 class="section-title">When the dashboard is fetching drops</h2>
        </div>
      </div>

      <section class="loading-skeletons" aria-label="Loading content preview">
        <article class="skeleton-card">
          <div class="skeleton-cover"></div>
          <div class="skeleton-line" style="width: 42%;"></div>
          <div class="skeleton-line" style="width: 86%;"></div>
          <div class="skeleton-line" style="width: 62%;"></div>
        </article>
        <article class="skeleton-card">
          <div class="skeleton-cover"></div>
          <div class="skeleton-line" style="width: 38%;"></div>
          <div class="skeleton-line" style="width: 92%;"></div>
          <div class="skeleton-line" style="width: 54%;"></div>
        </article>
        <article class="skeleton-card">
          <div class="skeleton-cover"></div>
          <div class="skeleton-line" style="width: 48%;"></div>
          <div class="skeleton-line" style="width: 80%;"></div>
          <div class="skeleton-line" style="width: 68%;"></div>
        </article>
      </section>
    </section>

  </main>
</div>

<nav class="mobile-bottom-nav" aria-label="Mobile navigation">
  <a href="/dashboard" class="active">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 13h8V3H3v10Z"/><path d="M13 21h8V11h-8v10Z"/><path d="M13 3v6h8V3h-8Z"/><path d="M3 21h8v-6H3v6Z"/></svg>
    Home
  </a>
  <a href="#library">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5V6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5"/><path d="M8 8h8"/><path d="M8 12h6"/></svg>
    Library
  </a>
  <a href="#downloads">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
    Files
  </a>
  <a href="/account">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>
    You
  </a>
</nav>
<script id="basscally-art-motion-js">
  (function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const motionTargets = document.querySelectorAll([
      '.page-header',
      '.empty-hero',
      '.latest-drop',
      '.detail-hero',
      '.player-panel',
      '.panel:not(.empty-hero):not(.latest-drop):not(.detail-hero):not(.player-panel)',
      '.content-card',
      '.starter-card',
      '.stat-card',
      '.practice-step',
      '.rail-card',
      '.drop-card',
      '.download-card',
      '.error-panel'
    ].join(','));

    motionTargets.forEach((el, index) => {
      el.classList.add('motion-ready');
      el.style.setProperty('--motion-index', String(Math.min(index, 12)));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    motionTargets.forEach((el) => observer.observe(el));

    document.querySelectorAll('.play, .content-card__play').forEach((button) => {
      button.addEventListener('click', () => {
        document.body.classList.toggle('is-playing');
        button.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(0.92)' },
          { transform: 'scale(1)' }
        ], { duration: 260, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      });
    });
  })();
</script>

</body>
</html>

```

## Screen 05: Dashboard Populated

Route: `/dashboard`
Reference file: `basscally-screen-5-dashboard-populated-art-motion.html`
Purpose: Normal library and latest drop

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Screen 5 — Member Dashboard Populated</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --color-brand:          #FF4500;
    --color-brand-hover:    #FF5C1F;
    --color-brand-muted:    #2A1408;

    --color-bg:             #0A0A0B;
    --color-surface:        #141416;
    --color-surface-raised: #1C1C1F;
    --color-surface-sunken: #060607;

    --color-border:         #26262A;
    --color-border-strong:  #3A3A40;

    --color-text:           #F5F5F7;
    --color-text-muted:     #A1A1A8;
    --color-text-dim:       #6B6B72;

    --color-success:        #34D399;
    --color-warning:        #FBBF24;
    --color-danger:         #F87171;
    --color-info:           #60A5FA;

    --font-display: "Cabinet Grotesk", "Inter", system-ui, sans-serif;
    --font-body:    "Geist", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono:    "Geist Mono", "JetBrains Mono", monospace;

    --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
    --space-4: 16px; --space-5: 24px; --space-6: 32px;
    --space-8: 48px; --space-10: 64px; --space-12: 96px;
    --space-16: 128px;

    --radius-sm:   6px;
    --radius-md:   10px;
    --radius-lg:   14px;
    --radius-xl:   20px;
    --radius-full: 9999px;

    --shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.5);
    --shadow-lg: 0 12px 32px rgba(0,0,0,0.6);
    --shadow-brand-glow: 0 0 32px rgba(255,69,0,0.28);

    --motion-fast: 150ms;
    --motion-default: 250ms;
    --motion-slow: 400ms;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    background:
      radial-gradient(circle at 16% -12%, rgba(255,69,0,0.10), transparent 34%),
      radial-gradient(circle at 86% 8%, rgba(255,69,0,0.035), transparent 30%),
      var(--color-bg);
    color: var(--color-text);
    overflow-x: hidden;
  }

  ::selection { background: var(--color-brand); color: #fff; }

  a { color: inherit; }

  button, input, textarea, select { font: inherit; }

  .shell {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 268px minmax(0, 1fr);
  }

  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    padding: var(--space-5);
    border-right: 1px solid rgba(38,38,42,0.82);
    background: rgba(10,10,11,0.74);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .brand__mark {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--color-brand);
    color: #fff;
    display: grid;
    place-items: center;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 15px;
    line-height: 1;
  }

  .brand__text {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: var(--color-text);
  }

  .nav-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .nav-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);
    margin-bottom: var(--space-2);
  }

  .nav-item {
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-3);
    border-radius: var(--radius-lg);
    color: var(--color-text-muted);
    text-decoration: none;
    border: 1px solid transparent;
    transition: all var(--motion-fast) var(--ease-out);
  }

  .nav-item svg {
    width: 19px;
    height: 19px;
    color: var(--color-text-dim);
    transition: color var(--motion-fast) var(--ease-out);
  }

  .nav-item:hover {
    color: var(--color-text);
    background: var(--color-surface);
  }

  .nav-item.active {
    color: var(--color-text);
    background: var(--color-surface);
    border-color: var(--color-border);
  }

  .nav-item.active svg {
    color: var(--color-brand);
  }

  .sidebar-card {
    margin-top: auto;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
  }

  .sidebar-card__eyebrow {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--color-success);
    margin-bottom: var(--space-2);
  }

  .sidebar-card__title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 18px;
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: var(--color-text);
    margin-bottom: var(--space-2);
  }

  .sidebar-card__text {
    font-size: 13px;
    color: var(--color-text-muted);
    line-height: 1.5;
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 30;
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-8);
    border-bottom: 1px solid rgba(38,38,42,0.78);
    background: rgba(10,10,11,0.72);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
  }

  .topbar__left {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .mobile-menu {
    display: none;
    width: 42px;
    height: 42px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    background: var(--color-surface);
    align-items: center;
    justify-content: center;
  }

  .topbar__label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);
  }

  .topbar__actions {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-full);
    background: linear-gradient(135deg, var(--color-surface-raised), var(--color-brand-muted));
    border: 1px solid var(--color-border-strong);
    display: grid;
    place-items: center;
    color: var(--color-text);
    font-weight: 700;
    font-size: 13px;
  }

  .page {
    max-width: 1240px;
    margin: 0 auto;
    padding: var(--space-8);
  }

  .page--wide {
    max-width: 1360px;
  }

  .page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-6);
    margin-bottom: var(--space-8);
  }

  .page-kicker {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);
    margin-bottom: var(--space-3);
  }

  .page-title {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 800;
    line-height: 0.98;
    letter-spacing: -0.04em;
    color: var(--color-text);
    max-width: 720px;
  }

  .page-subtitle {
    max-width: 560px;
    margin-top: var(--space-4);
    color: var(--color-text-muted);
    font-size: 17px;
    line-height: 1.55;
  }

  .btn {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
    min-height: 44px;
    padding: 12px 18px;
    border-radius: var(--radius-lg);
    border: 1px solid transparent;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    white-space: nowrap;
    transition: all var(--motion-fast) var(--ease-out);
  }

  .btn--primary {
    background: var(--color-brand);
    color: #fff;
  }

  .btn--primary:hover {
    background: var(--color-brand-hover);
    box-shadow: var(--shadow-brand-glow);
  }

  .btn--secondary {
    background: transparent;
    border-color: var(--color-border-strong);
    color: var(--color-text);
  }

  .btn--secondary:hover {
    background: var(--color-surface-raised);
    border-color: var(--color-text-muted);
  }

  .btn--ghost {
    background: transparent;
    color: var(--color-text-muted);
  }

  .btn--ghost:hover {
    background: var(--color-surface);
    color: var(--color-text);
  }

  .btn:focus-visible, .nav-item:focus-visible, .tab:focus-visible, .card-link:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 3px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-full);
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1.35;
  }

  .badge--founding {
    background: var(--color-brand-muted);
    color: var(--color-brand);
  }

  .badge--active {
    background: rgba(52,211,153,0.15);
    color: var(--color-success);
  }

  .badge--beginner {
    background: rgba(96,165,250,0.15);
    color: var(--color-info);
  }

  .badge--intermediate {
    background: rgba(251,191,36,0.15);
    color: var(--color-warning);
  }

  .badge--advanced {
    background: rgba(248,113,113,0.15);
    color: var(--color-danger);
  }

  .badge--type {
    background: rgba(245,245,247,0.06);
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
  }

  .panel {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
  }

  .muted { color: var(--color-text-muted); }
  .dim { color: var(--color-text-dim); }
  .orange { color: var(--color-brand); }

  .icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .audio-bar {
    position: sticky;
    bottom: 0;
    z-index: 40;
    height: 72px;
    background: rgba(6,6,7,0.88);
    border-top: 1px solid var(--color-border);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-3) var(--space-8);
  }

  .audio-bar__thumb {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background:
      linear-gradient(135deg, rgba(255,69,0,0.28), rgba(245,245,247,0.05)),
      var(--color-surface-raised);
    flex-shrink: 0;
  }

  .audio-bar__meta {
    min-width: 180px;
  }

  .audio-bar__title {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.25;
  }

  .audio-bar__sub {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .play {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-full);
    border: 0;
    background: var(--color-brand);
    color: #fff;
    display: grid;
    place-items: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all var(--motion-fast) var(--ease-out);
  }

  .play:hover {
    background: var(--color-brand-hover);
    box-shadow: var(--shadow-brand-glow);
  }

  .scrub {
    flex: 1;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 140px;
  }

  .scrub__time {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    width: 38px;
  }

  .scrub__track {
    position: relative;
    height: 4px;
    flex: 1;
    border-radius: var(--radius-full);
    background: var(--color-border-strong);
    overflow: hidden;
  }

  .scrub__fill {
    position: absolute;
    inset: 0 auto 0 0;
    width: 38%;
    border-radius: var(--radius-full);
    background: var(--color-brand);
  }

  .mobile-bottom-nav {
    display: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .page-header, .panel, .content-card, .stat-card, .empty-hero, .detail-hero {
      opacity: 0;
      transform: translateY(14px);
      animation: rise 650ms var(--ease-out) forwards;
    }

    .panel:nth-of-type(2), .content-card:nth-of-type(2), .stat-card:nth-of-type(2) { animation-delay: 80ms; }
    .panel:nth-of-type(3), .content-card:nth-of-type(3), .stat-card:nth-of-type(3) { animation-delay: 140ms; }

    @keyframes rise {
      to { opacity: 1; transform: translateY(0); }
    }
  }

  @media (max-width: 1080px) {
    .shell {
      grid-template-columns: 1fr;
    }

    .sidebar {
      display: none;
    }

    .mobile-menu {
      display: inline-flex;
    }

    .topbar {
      padding: 0 var(--space-5);
    }

    .page {
      padding: var(--space-6) var(--space-5) calc(var(--space-10) + 84px);
    }

    .audio-bar {
      padding: var(--space-3) var(--space-5);
    }
  }

  @media (max-width: 767px) {
    .topbar {
      min-height: 64px;
    }

    .topbar__actions .btn--secondary,
    .topbar__label {
      display: none;
    }

    .page {
      padding: var(--space-5) var(--space-4) calc(var(--space-12) + 84px);
    }

    .page-header {
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: var(--space-6);
    }

    .page-title {
      font-size: clamp(34px, 10vw, 44px);
      letter-spacing: -0.035em;
    }

    .page-subtitle {
      font-size: 16px;
    }

    .audio-bar {
      height: 76px;
      padding: var(--space-3) var(--space-4);
    }

    .audio-bar__meta {
      min-width: 0;
      flex: 1;
    }

    .scrub {
      display: none;
    }

    .audio-bar .btn {
      display: none;
    }

    .mobile-bottom-nav {
      position: fixed;
      left: var(--space-4);
      right: var(--space-4);
      bottom: var(--space-4);
      z-index: 50;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: rgba(20,20,22,0.92);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }

    .mobile-bottom-nav a {
      min-height: 58px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      color: var(--color-text-dim);
      text-decoration: none;
      font-size: 10px;
      font-family: var(--font-mono);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .mobile-bottom-nav a.active {
      color: var(--color-text);
      background: rgba(255,69,0,0.08);
    }

    .mobile-bottom-nav svg {
      width: 18px;
      height: 18px;
      color: currentColor;
    }
  }
</style>

<style>
  .dashboard-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: var(--space-5);
    align-items: start;
  }

  .latest-drop {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 280px;
    min-height: 390px;
  }

  .latest-drop::before {
    content: "";
    position: absolute;
    top: -140px;
    right: -180px;
    width: 620px;
    height: 620px;
    background: radial-gradient(circle, rgba(255,69,0,0.14), transparent 60%);
    pointer-events: none;
  }

  .latest-drop__main {
    position: relative;
    z-index: 1;
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .latest-drop__meta-row {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
    margin-bottom: var(--space-5);
  }

  .latest-drop__title {
    font-family: var(--font-display);
    font-size: clamp(38px, 5vw, 64px);
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: 0.96;
    max-width: 640px;
    margin-bottom: var(--space-4);
  }

  .latest-drop__desc {
    color: var(--color-text-muted);
    font-size: 17px;
    line-height: 1.55;
    max-width: 560px;
  }

  .latest-drop__actions {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-wrap: wrap;
    margin-top: var(--space-8);
  }

  .latest-drop__cover {
    position: relative;
    min-height: 100%;
    border-left: 1px solid var(--color-border);
    background:
      linear-gradient(180deg, transparent, rgba(10,10,11,0.72)),
      radial-gradient(circle at 20% 20%, rgba(255,69,0,0.30), transparent 38%),
      linear-gradient(135deg, #1C1C1F, #0A0A0B);
    display: flex;
    align-items: flex-end;
    padding: var(--space-5);
  }

  .cover-type {
    width: 100%;
    border: 1px solid rgba(245,245,247,0.10);
    background: rgba(6,6,7,0.52);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    backdrop-filter: blur(18px);
  }

  .cover-type__small {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-brand);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: var(--space-3);
  }

  .cover-type__big {
    font-family: var(--font-display);
    font-size: 42px;
    line-height: 0.92;
    letter-spacing: -0.04em;
    font-weight: 800;
  }

  .quick-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
    margin: var(--space-5) 0 var(--space-8);
  }

  .stat-card {
    padding: var(--space-5);
  }

  .stat-card__value {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    margin-bottom: var(--space-2);
  }

  .stat-card__label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .tabs {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
    margin-bottom: var(--space-5);
  }

  .tab {
    min-height: 40px;
    padding: 10px 14px;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
    cursor: pointer;
    transition: all var(--motion-fast) var(--ease-out);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .tab:hover {
    color: var(--color-text);
    background: var(--color-surface);
  }

  .tab.active {
    color: #fff;
    background: var(--color-brand);
    border-color: var(--color-brand);
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-4);
  }

  .content-card {
    position: relative;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    min-height: 330px;
    display: flex;
    flex-direction: column;
    transition: all var(--motion-default) var(--ease-out);
  }

  .content-card:hover {
    transform: translateY(-2px);
    border-color: var(--color-border-strong);
    box-shadow: var(--shadow-md);
  }

  .content-card__cover {
    position: relative;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background:
      linear-gradient(180deg, transparent, rgba(10,10,11,0.72)),
      radial-gradient(circle at 22% 30%, rgba(255,69,0,0.32), transparent 44%),
      var(--color-surface-raised);
    margin-bottom: var(--space-4);
    overflow: hidden;
  }

  .content-card__cover::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(circle, black 15%, transparent 75%);
  }

  .content-card__play {
    position: absolute;
    right: var(--space-3);
    bottom: var(--space-3);
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    background: var(--color-brand);
    color: #fff;
    display: grid;
    place-items: center;
    border: 0;
    opacity: 0;
    transform: translateY(8px);
    transition: all var(--motion-default) var(--ease-out);
  }

  .content-card:hover .content-card__play {
    opacity: 1;
    transform: translateY(0);
  }

  .content-card__badges {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
    margin-bottom: var(--space-3);
  }

  .content-card__title {
    font-family: var(--font-display);
    font-size: 22px;
    line-height: 1.05;
    letter-spacing: -0.02em;
    font-weight: 700;
    margin-bottom: var(--space-2);
  }

  .content-card__desc {
    color: var(--color-text-muted);
    font-size: 14px;
    line-height: 1.5;
    flex: 1;
    margin-bottom: var(--space-4);
  }

  .content-card__footer {
    border-top: 1px solid var(--color-border);
    padding-top: var(--space-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .rail {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .rail-card {
    padding: var(--space-5);
  }

  .rail-title {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: var(--space-4);
  }

  .practice-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .practice-item {
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: var(--space-3);
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--color-border);
  }

  .practice-item:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  .practice-item__num {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    background: var(--color-brand-muted);
    color: var(--color-brand);
    display: grid;
    place-items: center;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
  }

  .practice-item__title {
    font-size: 14px;
    color: var(--color-text);
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 3px;
  }

  .practice-item__meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .mini-timeline {
    border-left: 1px solid var(--color-border);
    margin-left: var(--space-2);
    padding-left: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .timeline-item {
    position: relative;
  }

  .timeline-item::before {
    content: "";
    position: absolute;
    left: calc(-1 * var(--space-5) - 4px);
    top: 5px;
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--color-border-strong);
  }

  .timeline-item.active::before {
    background: var(--color-brand);
    box-shadow: 0 0 12px rgba(255,69,0,0.5);
  }

  .timeline-item__date {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 2px;
  }

  .timeline-item__title {
    font-size: 14px;
    color: var(--color-text-muted);
    line-height: 1.35;
  }

  @media (max-width: 1220px) {
    .dashboard-layout {
      grid-template-columns: 1fr;
    }

    .rail {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .content-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 767px) {
    .latest-drop {
      grid-template-columns: 1fr;
    }

    .latest-drop__main {
      padding: var(--space-6) var(--space-5);
    }

    .latest-drop__cover {
      min-height: 220px;
      border-left: 0;
      border-top: 1px solid var(--color-border);
    }

    .quick-stats,
    .content-grid,
    .rail {
      grid-template-columns: 1fr;
    }

    .latest-drop__actions .btn {
      width: 100%;
    }

    .content-card__play {
      opacity: 1;
      transform: none;
    }
  }
</style>

<style id="basscally-art-motion-v3">
  /* ============================================================
     ART + MOTION PASS
     Standalone HTML version of the Framer Motion direction.
     Keep the structure. Push depth, contrast, and motion.
  ============================================================ */
  :root {
    --color-brand:          #FF4A05;
    --color-brand-hover:    #FF6A2A;
    --color-brand-muted:    #371407;
    --color-bg:             #030304;
    --color-surface:        #101012;
    --color-surface-raised: #19191D;
    --color-surface-sunken: #030304;
    --color-border:         #2B2B31;
    --color-border-strong:  #464048;
    --color-text:           #FAFAFC;
    --color-text-muted:     #B6B2B6;
    --color-text-dim:       #777179;
    --shadow-md: 0 18px 44px rgba(0,0,0,0.42);
    --shadow-lg: 0 28px 90px rgba(0,0,0,0.62);
    --shadow-brand-glow: 0 0 34px rgba(255,74,5,0.34), 0 16px 52px rgba(255,74,5,0.16);
    --motion-spring: cubic-bezier(0.22, 1, 0.36, 1);
  }

  body {
    position: relative;
    isolation: isolate;
    background:
      radial-gradient(circle at 8% 4%, rgba(255,74,5,0.20), transparent 30%),
      radial-gradient(circle at 82% -8%, rgba(255,122,48,0.12), transparent 34%),
      radial-gradient(circle at 58% 44%, rgba(255,74,5,0.045), transparent 38%),
      linear-gradient(180deg, #030304 0%, #080708 48%, #030304 100%);
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 22% 18%, rgba(255,74,5,0.16), transparent 18%),
      radial-gradient(circle at 74% 10%, rgba(245,245,247,0.035), transparent 20%),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.026) 0 1px, transparent 1px 72px),
      repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 72px);
    mask-image: radial-gradient(ellipse at 50% 14%, black 0%, transparent 72%);
    -webkit-mask-image: radial-gradient(ellipse at 50% 14%, black 0%, transparent 72%);
    opacity: 0.9;
  }

  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E");
    opacity: 0.052;
    mix-blend-mode: screen;
  }

  .shell,
  .mobile-bottom-nav,
  .audio-bar {
    position: relative;
    z-index: 1;
  }

  .sidebar,
  .topbar {
    background: rgba(3,3,4,0.80);
    border-color: rgba(255,255,255,0.075);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.018), 0 24px 72px rgba(0,0,0,0.30);
  }

  .brand__mark,
  .avatar {
    box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 10px 30px rgba(255,74,5,0.22);
  }

  .page-title,
  .empty-hero__title,
  .latest-drop__title,
  .detail-title,
  .cover-type__big,
  .detail-cover__big {
    text-shadow: 0 1px 0 rgba(255,255,255,0.04), 0 24px 80px rgba(255,74,5,0.10);
  }

  .page-kicker,
  .topbar__label,
  .nav-label,
  .rail-label,
  .section-note {
    color: #8F8588;
  }

  .panel,
  .content-card,
  .starter-card,
  .skeleton-card,
  .rail-card,
  .stat-card,
  .drop-card,
  .practice-step,
  .download-card,
  .error-panel {
    background:
      linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012)),
      linear-gradient(135deg, rgba(255,74,5,0.030), transparent 38%),
      var(--color-surface);
    border-color: rgba(255,255,255,0.085);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.045),
      0 22px 70px rgba(0,0,0,0.30);
  }

  .panel:hover,
  .content-card:hover,
  .starter-card:hover,
  .rail-card:hover,
  .practice-step:hover {
    border-color: rgba(255,255,255,0.16);
  }

  .empty-hero,
  .latest-drop,
  .detail-hero,
  .player-panel {
    background:
      radial-gradient(circle at 78% 14%, rgba(255,74,5,0.24), transparent 28%),
      radial-gradient(circle at 28% 0%, rgba(255,255,255,0.055), transparent 26%),
      linear-gradient(135deg, rgba(255,74,5,0.055), transparent 32%),
      #0D0D10;
    border-color: rgba(255,255,255,0.11);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.06),
      0 34px 110px rgba(0,0,0,0.52);
  }

  .empty-hero::after,
  .latest-drop::after,
  .detail-hero::after,
  .player-panel::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.045) 38%, transparent 54%),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 44px);
    opacity: 0.42;
    mix-blend-mode: screen;
    transform: translateX(-18%);
  }

  .empty-hero > *,
  .latest-drop > *,
  .detail-hero > *,
  .player-panel > * {
    position: relative;
    z-index: 1;
  }

  .empty-hero__title span,
  .orange,
  .badge--founding,
  .cover-type__small,
  .detail-cover__small {
    color: #FF6428;
  }

  .badge {
    border: 1px solid rgba(255,255,255,0.075);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
  }

  .badge--founding,
  .badge--type {
    background: rgba(255,74,5,0.10);
  }

  .btn--primary,
  .play,
  .content-card__play {
    background:
      linear-gradient(180deg, #FF6A2A 0%, #FF4A05 48%, #C83300 100%);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 16px 46px rgba(255,74,5,0.24);
  }

  .btn--primary:hover,
  .play:hover,
  .content-card__play:hover {
    box-shadow: var(--shadow-brand-glow);
  }

  .btn--secondary,
  .btn--ghost,
  .nav-item,
  .tab {
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .nav-item.active,
  .tab.active {
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 34px rgba(0,0,0,0.28);
  }

  .latest-drop__cover,
  .content-card__cover,
  .detail-cover,
  .audio-bar__thumb {
    background:
      radial-gradient(circle at 26% 18%, rgba(255,255,255,0.16), transparent 13%),
      conic-gradient(from 210deg at 60% 50%, #FF4A05 0deg, #7B1B00 58deg, #151518 128deg, #FF7A30 194deg, #101012 258deg, #FF4A05 360deg),
      linear-gradient(135deg, #1E1E24, #050506);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 18px 62px rgba(255,74,5,0.14);
  }

  .latest-drop__cover::before,
  .content-card__cover::before,
  .detail-cover::before,
  .audio-bar__thumb::before {
    content: "";
    position: absolute;
    inset: 12%;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: inset 0 0 0 18px rgba(0,0,0,0.18), inset 0 0 0 19px rgba(255,255,255,0.05);
    opacity: 0.6;
  }

  .content-card__cover::after,
  .detail-cover::after {
    background-image:
      radial-gradient(circle, rgba(255,255,255,0.06) 0 1px, transparent 1px),
      linear-gradient(120deg, rgba(255,255,255,0.08), transparent 36%, rgba(255,74,5,0.09));
    background-size: 18px 18px, 100% 100%;
    mask-image: none;
    opacity: 0.55;
  }

  .cover-type,
  .detail-cover__type {
    background: rgba(3,3,4,0.64);
    border-color: rgba(255,255,255,0.16);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 54px rgba(0,0,0,0.38);
  }

  .content-card:nth-child(2) .content-card__cover,
  .related-item:nth-child(2) .related-thumb {
    filter: hue-rotate(-18deg) saturate(1.12);
  }

  .content-card:nth-child(3) .content-card__cover,
  .related-item:nth-child(3) .related-thumb {
    filter: hue-rotate(18deg) saturate(1.08);
  }

  .content-card:nth-child(4) .content-card__cover,
  .content-card:nth-child(6) .content-card__cover {
    filter: contrast(1.08) saturate(0.96);
  }

  .scrub__track,
  .player-wave {
    background:
      linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.008)),
      #070708;
    border: 1px solid rgba(255,255,255,0.07);
  }

  .scrub__fill,
  .wave-bar.played {
    background: linear-gradient(90deg, #FF8A4C, #FF4A05 55%, #C83300);
    box-shadow: 0 0 22px rgba(255,74,5,0.42);
  }

  .audio-bar {
    background: rgba(3,3,4,0.88);
    border-top-color: rgba(255,255,255,0.10);
    box-shadow: 0 -26px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.045);
  }

  .mobile-bottom-nav {
    background: rgba(5,5,6,0.92);
    border-color: rgba(255,255,255,0.10);
    box-shadow: 0 20px 80px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .progress-ring {
    background:
      conic-gradient(from -70deg, #FF8A4C 0 12%, #FF4A05 12% 31%, rgba(255,255,255,0.09) 31% 100%);
    box-shadow: 0 0 44px rgba(255,74,5,0.18);
  }

  .progress-ring__inner {
    background: radial-gradient(circle at 50% 0%, rgba(255,74,5,0.08), transparent 42%), #0A0A0B;
  }

  .skeleton-cover,
  .skeleton-line {
    background: linear-gradient(90deg, rgba(255,255,255,0.045), rgba(255,74,5,0.11), rgba(255,255,255,0.045));
    background-size: 220% 100%;
  }

  @media (prefers-reduced-motion: no-preference) {
    body::before {
      animation: ambientDrift 16s var(--motion-spring) infinite alternate;
    }

    .empty-hero::after,
    .latest-drop::after,
    .detail-hero::after,
    .player-panel::after {
      animation: artSweep 7s linear infinite;
    }

    .brand__mark,
    .play,
    .content-card__play,
    .btn--primary {
      transition: transform 220ms var(--motion-spring), box-shadow 220ms var(--motion-spring), filter 220ms var(--motion-spring);
    }

    .btn:hover,
    .play:hover,
    .content-card:hover {
      transform: translateY(-3px) scale(1.01);
    }

    .nav-item:hover,
    .tab:hover,
    .starter-card:hover,
    .practice-step:hover,
    .rail-card:hover {
      transform: translateY(-2px);
    }

    .play:active,
    .btn:active {
      transform: scale(0.965);
    }

    .latest-drop__cover,
    .content-card__cover,
    .detail-cover,
    .audio-bar__thumb {
      animation: vinylBreath 10s ease-in-out infinite alternate;
    }

    .scrub__fill {
      animation: progressBreath 2.6s ease-in-out infinite;
    }

    .wave-bar.played {
      animation: wavePulse 1.4s ease-in-out infinite alternate;
      transform-origin: bottom;
    }

    .wave-bar.played:nth-child(2n) { animation-delay: 120ms; }
    .wave-bar.played:nth-child(3n) { animation-delay: 240ms; }
    .wave-bar.played:nth-child(5n) { animation-delay: 360ms; }

    .motion-ready {
      opacity: 0;
      transform: translateY(20px) scale(0.985);
      filter: blur(6px);
      transition:
        opacity 720ms var(--motion-spring),
        transform 720ms var(--motion-spring),
        filter 720ms var(--motion-spring);
      transition-delay: calc(var(--motion-index, 0) * 42ms);
    }

    .motion-ready.is-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }

    .skeleton-cover,
    .skeleton-line {
      animation: shimmer 2.2s linear infinite;
    }

    @keyframes ambientDrift {
      from { transform: translate3d(-1%, -1%, 0) scale(1); opacity: 0.78; }
      to   { transform: translate3d(1.5%, 1%, 0) scale(1.03); opacity: 1; }
    }

    @keyframes artSweep {
      from { transform: translateX(-38%); }
      to   { transform: translateX(38%); }
    }

    @keyframes vinylBreath {
      from { filter: saturate(1.02) contrast(1.02); }
      to   { filter: saturate(1.18) contrast(1.08) brightness(1.04); }
    }

    @keyframes progressBreath {
      0%, 100% { filter: brightness(1); box-shadow: 0 0 18px rgba(255,74,5,0.32); }
      50%      { filter: brightness(1.18); box-shadow: 0 0 32px rgba(255,74,5,0.50); }
    }

    @keyframes wavePulse {
      from { filter: brightness(0.92); transform: scaleY(0.92); }
      to   { filter: brightness(1.22); transform: scaleY(1.04); }
    }

    @keyframes shimmer {
      from { background-position: 200% 0; }
      to   { background-position: -200% 0; }
    }
  }

  @media (max-width: 767px) {
    body::before {
      background:
        radial-gradient(circle at 20% 4%, rgba(255,74,5,0.18), transparent 32%),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 56px);
    }

    .page-title,
    .empty-hero__title,
    .latest-drop__title,
    .detail-title {
      text-shadow: 0 18px 56px rgba(255,74,5,0.13);
    }
  }
</style>

</head>
<body>


<div class="shell">
  <aside class="sidebar" aria-label="Member navigation">
    <a href="/dashboard" class="brand" aria-label="Basscally Club dashboard">
      <span class="brand__mark">B</span>
      <span class="brand__text">Basscally Club</span>
    </a>

    <nav class="nav-group">
      <div class="nav-label">// Practice</div>
      <a href="/dashboard" class="nav-item active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 13h8V3H3v10Z"/><path d="M13 21h8V11h-8v10Z"/><path d="M13 3v6h8V3h-8Z"/><path d="M3 21h8v-6H3v6Z"/></svg>
        Dashboard
      </a>
      <a href="#library" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5V6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5"/><path d="M8 8h8"/><path d="M8 12h6"/></svg>
        Library
      </a>
      <a href="#downloads" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
        Downloads
      </a>
      <a href="#challenge" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        Challenges
      </a>
    </nav>

    <nav class="nav-group">
      <div class="nav-label">// Account</div>
      <a href="/account" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>
        Membership
      </a>
      <a href="/auth/login" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>
        Sign out
      </a>
    </nav>

    <div class="sidebar-card">
      <div class="sidebar-card__eyebrow">Active membership</div>
      <h2 class="sidebar-card__title">$1.50 locked</h2>
      <p class="sidebar-card__text">Founding member pricing stays active while your membership is active.</p>
    </div>
  </aside>

  <main>
    <header class="topbar">
      <div class="topbar__left">
        <button class="mobile-menu" aria-label="Open menu">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
        </button>
        <span class="topbar__label">// Member area</span>
      </div>
      <div class="topbar__actions">
        <a href="/account" class="btn btn--secondary">Membership</a>
        <div class="avatar" aria-label="Michael">MO</div>
      </div>
    </header>

    <section class="page page--wide">
      <div class="page-header">
        <div>
          <div class="page-kicker">// Member dashboard</div>
          <h1 class="page-title">Latest drop just landed.</h1>
          <p class="page-subtitle">Play the newest practice drop first, then move through the library by type, difficulty, and habit.</p>
        </div>
        <div style="display:flex; gap: var(--space-2); flex-wrap: wrap;">
          <span class="badge badge--active">Active</span>
          <span class="badge badge--founding">Founding member</span>
        </div>
      </div>

      <div class="dashboard-layout">
        <div>
          <section class="panel latest-drop">
            <div class="latest-drop__main">
              <div>
                <div class="latest-drop__meta-row">
                  <span class="badge badge--type">Latest drop</span>
                  <span class="badge badge--type">Groove</span>
                  <span class="badge badge--beginner">Beginner</span>
                  <span class="badge badge--type">2 min</span>
                </div>
                <h2 class="latest-drop__title">Funk slap pattern in E</h2>
                <p class="latest-drop__desc">A tight one-bar groove for right-hand consistency, pocket, and clean ghost notes. Start slow, loop it, then push the tempo.</p>
              </div>

              <div class="latest-drop__actions">
                <a href="/c/funk-slap-pattern-e" class="btn btn--primary">Open practice drop</a>
                <button class="btn btn--secondary">Download audio</button>
                <button class="btn btn--ghost">Add to this week</button>
              </div>
            </div>

            <div class="latest-drop__cover" aria-label="Cover art for Funk slap pattern in E">
              <div class="cover-type">
                <div class="cover-type__small">Issue 001</div>
                <div class="cover-type__big">Pocket<br>first.</div>
              </div>
            </div>
          </section>

          <section class="quick-stats" aria-label="Practice stats">
            <article class="panel stat-card">
              <div class="stat-card__value">12</div>
              <div class="stat-card__label">Drops available</div>
            </article>
            <article class="panel stat-card">
              <div class="stat-card__value">4</div>
              <div class="stat-card__label">Downloaded</div>
            </article>
            <article class="panel stat-card">
              <div class="stat-card__value">3d</div>
              <div class="stat-card__label">Next drop</div>
            </article>
            <article class="panel stat-card">
              <div class="stat-card__value">$1.50</div>
              <div class="stat-card__label">Locked price</div>
            </article>
          </section>

          <div id="library" style="display:flex; align-items:flex-end; justify-content:space-between; gap:var(--space-5); margin-bottom:var(--space-5);">
            <div>
              <div class="page-kicker">// Library</div>
              <h2 style="font-family:var(--font-display); font-size:32px; line-height:1; letter-spacing:-0.03em;">Practice library</h2>
            </div>
          </div>

          <div class="tabs" role="tablist" aria-label="Filter content type">
            <button class="tab active">All</button>
            <button class="tab">Bass-less</button>
            <button class="tab">Grooves</button>
            <button class="tab">Fills</button>
            <button class="tab">Challenges</button>
          </div>

          <section class="content-grid">
            <article class="content-card">
              <div class="content-card__cover">
                <button class="content-card__play" aria-label="Play Funk slap pattern in E">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7-11-7Z"/></svg>
                </button>
              </div>
              <div class="content-card__badges">
                <span class="badge badge--type">Groove</span>
                <span class="badge badge--beginner">Beginner</span>
              </div>
              <h3 class="content-card__title">Funk slap pattern in E</h3>
              <p class="content-card__desc">Right-hand timing, ghost-note feel, and a loop you should keep under your fingers.</p>
              <div class="content-card__footer">
                <span>2 min</span>
                <span>Dropped today</span>
              </div>
            </article>

            <article class="content-card">
              <div class="content-card__cover">
                <button class="content-card__play" aria-label="Play D'Angelo bass-less cover">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7-11-7Z"/></svg>
                </button>
              </div>
              <div class="content-card__badges">
                <span class="badge badge--type">Bass-less</span>
                <span class="badge badge--intermediate">Intermediate</span>
              </div>
              <h3 class="content-card__title">D'Angelo pocket cover</h3>
              <p class="content-card__desc">A bass-less track for sitting inside the groove without fighting the drums.</p>
              <div class="content-card__footer">
                <span>4 min</span>
                <span>3 days ago</span>
              </div>
            </article>

            <article class="content-card">
              <div class="content-card__cover">
                <button class="content-card__play" aria-label="Play Ghost-note fill">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7-11-7Z"/></svg>
                </button>
              </div>
              <div class="content-card__badges">
                <span class="badge badge--type">Fill</span>
                <span class="badge badge--advanced">Advanced</span>
              </div>
              <h3 class="content-card__title">Ghost-note fill, 16th-note pocket</h3>
              <p class="content-card__desc">A short transition for ending one phrase and landing the next bar clean.</p>
              <div class="content-card__footer">
                <span>1 min</span>
                <span>6 days ago</span>
              </div>
            </article>

            <article class="content-card">
              <div class="content-card__cover">
                <button class="content-card__play" aria-label="Play Sunday groove challenge">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7-11-7Z"/></svg>
                </button>
              </div>
              <div class="content-card__badges">
                <span class="badge badge--type">Challenge</span>
                <span class="badge badge--beginner">Beginner</span>
              </div>
              <h3 class="content-card__title">One-take pocket challenge</h3>
              <p class="content-card__desc">Record one clean loop without rushing the kick. No edits. No excuses.</p>
              <div class="content-card__footer">
                <span>3 reps</span>
                <span>9 days ago</span>
              </div>
            </article>

            <article class="content-card">
              <div class="content-card__cover">
                <button class="content-card__play" aria-label="Play Gospel movement">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7-11-7Z"/></svg>
                </button>
              </div>
              <div class="content-card__badges">
                <span class="badge badge--type">Groove</span>
                <span class="badge badge--intermediate">Intermediate</span>
              </div>
              <h3 class="content-card__title">Gospel passing movement</h3>
              <p class="content-card__desc">A clean walk between chords for players who want movement without clutter.</p>
              <div class="content-card__footer">
                <span>2 min</span>
                <span>12 days ago</span>
              </div>
            </article>

            <article class="content-card">
              <div class="content-card__cover">
                <button class="content-card__play" aria-label="Play Minor fill">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7-11-7Z"/></svg>
                </button>
              </div>
              <div class="content-card__badges">
                <span class="badge badge--type">Fill</span>
                <span class="badge badge--beginner">Beginner</span>
              </div>
              <h3 class="content-card__title">Minor pentatonic landing</h3>
              <p class="content-card__desc">A simple phrase for ending a fill with control instead of random notes.</p>
              <div class="content-card__footer">
                <span>45 sec</span>
                <span>15 days ago</span>
              </div>
            </article>
          </section>
        </div>

        <aside class="rail">
          <section class="panel rail-card">
            <div class="page-kicker">// This week</div>
            <h2 class="rail-title">Practice plan</h2>
            <div class="practice-list">
              <div class="practice-item">
                <div class="practice-item__num">01</div>
                <div>
                  <div class="practice-item__title">Play the groove at 70 BPM</div>
                  <div class="practice-item__meta">Clean notes first</div>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-item__num">02</div>
                <div>
                  <div class="practice-item__title">Record one clean loop</div>
                  <div class="practice-item__meta">No edit pass</div>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-item__num">03</div>
                <div>
                  <div class="practice-item__title">Push to 90 BPM</div>
                  <div class="practice-item__meta">Same pocket</div>
                </div>
              </div>
            </div>
          </section>

          <section class="panel rail-card">
            <div class="page-kicker">// Release rhythm</div>
            <h2 class="rail-title">Upcoming drops</h2>
            <div class="mini-timeline">
              <div class="timeline-item active">
                <div class="timeline-item__date">Today</div>
                <div class="timeline-item__title">Funk slap pattern in E</div>
              </div>
              <div class="timeline-item">
                <div class="timeline-item__date">Friday</div>
                <div class="timeline-item__title">Bass-less weekly cover</div>
              </div>
              <div class="timeline-item">
                <div class="timeline-item__date">Monday</div>
                <div class="timeline-item__title">Short fill for transition practice</div>
              </div>
            </div>
          </section>

          <section class="panel rail-card">
            <div class="page-kicker">// Membership</div>
            <h2 class="rail-title">You are locked in</h2>
            <p class="muted" style="font-size:14px; line-height:1.55; margin-bottom:var(--space-4);">You joined during the founding member window. Your $1.50/month price stays active while your membership stays active.</p>
            <a href="/account" class="btn btn--secondary" style="width:100%;">Manage membership</a>
          </section>
        </aside>
      </div>
    </section>

    <div class="audio-bar" aria-label="Audio player">
      <div class="audio-bar__thumb"></div>
      <button class="play" aria-label="Play current track">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7-11-7Z"/></svg>
      </button>
      <div class="audio-bar__meta">
        <div class="audio-bar__title">Funk slap pattern in E</div>
        <div class="audio-bar__sub">Groove · Beginner</div>
      </div>
      <div class="scrub">
        <span class="scrub__time">0:44</span>
        <div class="scrub__track"><div class="scrub__fill"></div></div>
        <span class="scrub__time">2:00</span>
      </div>
      <a href="/c/funk-slap-pattern-e" class="btn btn--secondary">Open</a>
    </div>

  </main>
</div>

<nav class="mobile-bottom-nav" aria-label="Mobile navigation">
  <a href="/dashboard" class="active">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 13h8V3H3v10Z"/><path d="M13 21h8V11h-8v10Z"/><path d="M13 3v6h8V3h-8Z"/><path d="M3 21h8v-6H3v6Z"/></svg>
    Home
  </a>
  <a href="#library">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5V6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5"/><path d="M8 8h8"/><path d="M8 12h6"/></svg>
    Library
  </a>
  <a href="#downloads">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
    Files
  </a>
  <a href="/account">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>
    You
  </a>
</nav>
<script id="basscally-art-motion-js">
  (function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const motionTargets = document.querySelectorAll([
      '.page-header',
      '.empty-hero',
      '.latest-drop',
      '.detail-hero',
      '.player-panel',
      '.panel:not(.empty-hero):not(.latest-drop):not(.detail-hero):not(.player-panel)',
      '.content-card',
      '.starter-card',
      '.stat-card',
      '.practice-step',
      '.rail-card',
      '.drop-card',
      '.download-card',
      '.error-panel'
    ].join(','));

    motionTargets.forEach((el, index) => {
      el.classList.add('motion-ready');
      el.style.setProperty('--motion-index', String(Math.min(index, 12)));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    motionTargets.forEach((el) => observer.observe(el));

    document.querySelectorAll('.play, .content-card__play').forEach((button) => {
      button.addEventListener('click', () => {
        document.body.classList.toggle('is-playing');
        button.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(0.92)' },
          { transform: 'scale(1)' }
        ], { duration: 260, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      });
    });
  })();
</script>

</body>
</html>

```

## Screen 06: Content Detail

Route: `/c/[id]`
Reference file: `basscally-screen-6-content-detail-art-motion.html`
Purpose: Audio player, play, download

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Screen 6 — Content Detail Drop</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --color-brand:          #FF4500;
    --color-brand-hover:    #FF5C1F;
    --color-brand-muted:    #2A1408;

    --color-bg:             #0A0A0B;
    --color-surface:        #141416;
    --color-surface-raised: #1C1C1F;
    --color-surface-sunken: #060607;

    --color-border:         #26262A;
    --color-border-strong:  #3A3A40;

    --color-text:           #F5F5F7;
    --color-text-muted:     #A1A1A8;
    --color-text-dim:       #6B6B72;

    --color-success:        #34D399;
    --color-warning:        #FBBF24;
    --color-danger:         #F87171;
    --color-info:           #60A5FA;

    --font-display: "Cabinet Grotesk", "Inter", system-ui, sans-serif;
    --font-body:    "Geist", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono:    "Geist Mono", "JetBrains Mono", monospace;

    --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
    --space-4: 16px; --space-5: 24px; --space-6: 32px;
    --space-8: 48px; --space-10: 64px; --space-12: 96px;
    --space-16: 128px;

    --radius-sm:   6px;
    --radius-md:   10px;
    --radius-lg:   14px;
    --radius-xl:   20px;
    --radius-full: 9999px;

    --shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.5);
    --shadow-lg: 0 12px 32px rgba(0,0,0,0.6);
    --shadow-brand-glow: 0 0 32px rgba(255,69,0,0.28);

    --motion-fast: 150ms;
    --motion-default: 250ms;
    --motion-slow: 400ms;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    background:
      radial-gradient(circle at 16% -12%, rgba(255,69,0,0.10), transparent 34%),
      radial-gradient(circle at 86% 8%, rgba(255,69,0,0.035), transparent 30%),
      var(--color-bg);
    color: var(--color-text);
    overflow-x: hidden;
  }

  ::selection { background: var(--color-brand); color: #fff; }

  a { color: inherit; }

  button, input, textarea, select { font: inherit; }

  .shell {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 268px minmax(0, 1fr);
  }

  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    padding: var(--space-5);
    border-right: 1px solid rgba(38,38,42,0.82);
    background: rgba(10,10,11,0.74);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .brand__mark {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--color-brand);
    color: #fff;
    display: grid;
    place-items: center;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 15px;
    line-height: 1;
  }

  .brand__text {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: var(--color-text);
  }

  .nav-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .nav-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);
    margin-bottom: var(--space-2);
  }

  .nav-item {
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-3);
    border-radius: var(--radius-lg);
    color: var(--color-text-muted);
    text-decoration: none;
    border: 1px solid transparent;
    transition: all var(--motion-fast) var(--ease-out);
  }

  .nav-item svg {
    width: 19px;
    height: 19px;
    color: var(--color-text-dim);
    transition: color var(--motion-fast) var(--ease-out);
  }

  .nav-item:hover {
    color: var(--color-text);
    background: var(--color-surface);
  }

  .nav-item.active {
    color: var(--color-text);
    background: var(--color-surface);
    border-color: var(--color-border);
  }

  .nav-item.active svg {
    color: var(--color-brand);
  }

  .sidebar-card {
    margin-top: auto;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
  }

  .sidebar-card__eyebrow {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--color-success);
    margin-bottom: var(--space-2);
  }

  .sidebar-card__title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 18px;
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: var(--color-text);
    margin-bottom: var(--space-2);
  }

  .sidebar-card__text {
    font-size: 13px;
    color: var(--color-text-muted);
    line-height: 1.5;
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 30;
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-8);
    border-bottom: 1px solid rgba(38,38,42,0.78);
    background: rgba(10,10,11,0.72);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
  }

  .topbar__left {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .mobile-menu {
    display: none;
    width: 42px;
    height: 42px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    background: var(--color-surface);
    align-items: center;
    justify-content: center;
  }

  .topbar__label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);
  }

  .topbar__actions {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-full);
    background: linear-gradient(135deg, var(--color-surface-raised), var(--color-brand-muted));
    border: 1px solid var(--color-border-strong);
    display: grid;
    place-items: center;
    color: var(--color-text);
    font-weight: 700;
    font-size: 13px;
  }

  .page {
    max-width: 1240px;
    margin: 0 auto;
    padding: var(--space-8);
  }

  .page--wide {
    max-width: 1360px;
  }

  .page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-6);
    margin-bottom: var(--space-8);
  }

  .page-kicker {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);
    margin-bottom: var(--space-3);
  }

  .page-title {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 800;
    line-height: 0.98;
    letter-spacing: -0.04em;
    color: var(--color-text);
    max-width: 720px;
  }

  .page-subtitle {
    max-width: 560px;
    margin-top: var(--space-4);
    color: var(--color-text-muted);
    font-size: 17px;
    line-height: 1.55;
  }

  .btn {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
    min-height: 44px;
    padding: 12px 18px;
    border-radius: var(--radius-lg);
    border: 1px solid transparent;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    white-space: nowrap;
    transition: all var(--motion-fast) var(--ease-out);
  }

  .btn--primary {
    background: var(--color-brand);
    color: #fff;
  }

  .btn--primary:hover {
    background: var(--color-brand-hover);
    box-shadow: var(--shadow-brand-glow);
  }

  .btn--secondary {
    background: transparent;
    border-color: var(--color-border-strong);
    color: var(--color-text);
  }

  .btn--secondary:hover {
    background: var(--color-surface-raised);
    border-color: var(--color-text-muted);
  }

  .btn--ghost {
    background: transparent;
    color: var(--color-text-muted);
  }

  .btn--ghost:hover {
    background: var(--color-surface);
    color: var(--color-text);
  }

  .btn:focus-visible, .nav-item:focus-visible, .tab:focus-visible, .card-link:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 3px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-full);
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1.35;
  }

  .badge--founding {
    background: var(--color-brand-muted);
    color: var(--color-brand);
  }

  .badge--active {
    background: rgba(52,211,153,0.15);
    color: var(--color-success);
  }

  .badge--beginner {
    background: rgba(96,165,250,0.15);
    color: var(--color-info);
  }

  .badge--intermediate {
    background: rgba(251,191,36,0.15);
    color: var(--color-warning);
  }

  .badge--advanced {
    background: rgba(248,113,113,0.15);
    color: var(--color-danger);
  }

  .badge--type {
    background: rgba(245,245,247,0.06);
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
  }

  .panel {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
  }

  .muted { color: var(--color-text-muted); }
  .dim { color: var(--color-text-dim); }
  .orange { color: var(--color-brand); }

  .icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .audio-bar {
    position: sticky;
    bottom: 0;
    z-index: 40;
    height: 72px;
    background: rgba(6,6,7,0.88);
    border-top: 1px solid var(--color-border);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-3) var(--space-8);
  }

  .audio-bar__thumb {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background:
      linear-gradient(135deg, rgba(255,69,0,0.28), rgba(245,245,247,0.05)),
      var(--color-surface-raised);
    flex-shrink: 0;
  }

  .audio-bar__meta {
    min-width: 180px;
  }

  .audio-bar__title {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.25;
  }

  .audio-bar__sub {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .play {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-full);
    border: 0;
    background: var(--color-brand);
    color: #fff;
    display: grid;
    place-items: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all var(--motion-fast) var(--ease-out);
  }

  .play:hover {
    background: var(--color-brand-hover);
    box-shadow: var(--shadow-brand-glow);
  }

  .scrub {
    flex: 1;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 140px;
  }

  .scrub__time {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    width: 38px;
  }

  .scrub__track {
    position: relative;
    height: 4px;
    flex: 1;
    border-radius: var(--radius-full);
    background: var(--color-border-strong);
    overflow: hidden;
  }

  .scrub__fill {
    position: absolute;
    inset: 0 auto 0 0;
    width: 38%;
    border-radius: var(--radius-full);
    background: var(--color-brand);
  }

  .mobile-bottom-nav {
    display: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .page-header, .panel, .content-card, .stat-card, .empty-hero, .detail-hero {
      opacity: 0;
      transform: translateY(14px);
      animation: rise 650ms var(--ease-out) forwards;
    }

    .panel:nth-of-type(2), .content-card:nth-of-type(2), .stat-card:nth-of-type(2) { animation-delay: 80ms; }
    .panel:nth-of-type(3), .content-card:nth-of-type(3), .stat-card:nth-of-type(3) { animation-delay: 140ms; }

    @keyframes rise {
      to { opacity: 1; transform: translateY(0); }
    }
  }

  @media (max-width: 1080px) {
    .shell {
      grid-template-columns: 1fr;
    }

    .sidebar {
      display: none;
    }

    .mobile-menu {
      display: inline-flex;
    }

    .topbar {
      padding: 0 var(--space-5);
    }

    .page {
      padding: var(--space-6) var(--space-5) calc(var(--space-10) + 84px);
    }

    .audio-bar {
      padding: var(--space-3) var(--space-5);
    }
  }

  @media (max-width: 767px) {
    .topbar {
      min-height: 64px;
    }

    .topbar__actions .btn--secondary,
    .topbar__label {
      display: none;
    }

    .page {
      padding: var(--space-5) var(--space-4) calc(var(--space-12) + 84px);
    }

    .page-header {
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: var(--space-6);
    }

    .page-title {
      font-size: clamp(34px, 10vw, 44px);
      letter-spacing: -0.035em;
    }

    .page-subtitle {
      font-size: 16px;
    }

    .audio-bar {
      height: 76px;
      padding: var(--space-3) var(--space-4);
    }

    .audio-bar__meta {
      min-width: 0;
      flex: 1;
    }

    .scrub {
      display: none;
    }

    .audio-bar .btn {
      display: none;
    }

    .mobile-bottom-nav {
      position: fixed;
      left: var(--space-4);
      right: var(--space-4);
      bottom: var(--space-4);
      z-index: 50;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: rgba(20,20,22,0.92);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }

    .mobile-bottom-nav a {
      min-height: 58px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      color: var(--color-text-dim);
      text-decoration: none;
      font-size: 10px;
      font-family: var(--font-mono);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .mobile-bottom-nav a.active {
      color: var(--color-text);
      background: rgba(255,69,0,0.08);
    }

    .mobile-bottom-nav svg {
      width: 18px;
      height: 18px;
      color: currentColor;
    }
  }
</style>

<style>
  .detail-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: var(--space-5);
    align-items: start;
  }

  .detail-hero {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 330px minmax(0, 1fr);
    min-height: 420px;
  }

  .detail-cover {
    position: relative;
    background:
      linear-gradient(180deg, transparent, rgba(10,10,11,0.80)),
      radial-gradient(circle at 30% 25%, rgba(255,69,0,0.34), transparent 42%),
      linear-gradient(135deg, #1C1C1F, #060607);
    border-right: 1px solid var(--color-border);
    min-height: 100%;
    display: flex;
    align-items: flex-end;
    padding: var(--space-5);
  }

  .detail-cover::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: radial-gradient(circle, black 20%, transparent 76%);
  }

  .detail-cover__type {
    position: relative;
    z-index: 1;
    width: 100%;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(245,245,247,0.10);
    background: rgba(6,6,7,0.56);
    padding: var(--space-5);
    backdrop-filter: blur(18px);
  }

  .detail-cover__small {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-brand);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: var(--space-3);
  }

  .detail-cover__big {
    font-family: var(--font-display);
    font-size: 48px;
    line-height: 0.9;
    letter-spacing: -0.05em;
    font-weight: 800;
  }

  .detail-hero__content {
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .detail-badges {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
    margin-bottom: var(--space-5);
  }

  .detail-title {
    font-family: var(--font-display);
    font-size: clamp(42px, 6vw, 76px);
    font-weight: 800;
    line-height: 0.94;
    letter-spacing: -0.05em;
    margin-bottom: var(--space-4);
    max-width: 720px;
  }

  .detail-desc {
    color: var(--color-text-muted);
    font-size: 18px;
    line-height: 1.55;
    max-width: 620px;
  }

  .detail-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-8);
  }

  .player-panel {
    margin-top: var(--space-5);
    padding: var(--space-6);
  }

  .player-main {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: var(--space-5);
    align-items: center;
  }

  .player-meta__label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: var(--space-1);
  }

  .player-meta__title {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.05;
  }

  .player-wave {
    margin-top: var(--space-5);
    height: 72px;
    display: flex;
    align-items: end;
    gap: 4px;
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    background: var(--color-surface-sunken);
    overflow: hidden;
  }

  .wave-bar {
    flex: 1;
    min-width: 3px;
    border-radius: var(--radius-full);
    background: var(--color-border-strong);
  }

  .wave-bar.played {
    background: var(--color-brand);
  }

  .player-times {
    display: flex;
    justify-content: space-between;
    margin-top: var(--space-3);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .practice-section {
    margin-top: var(--space-8);
  }

  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--space-5);
    margin-bottom: var(--space-5);
  }

  .section-head h2 {
    font-family: var(--font-display);
    font-size: 32px;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .practice-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
  }

  .practice-step {
    padding: var(--space-5);
  }

  .practice-step__num {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-md);
    background: var(--color-brand-muted);
    color: var(--color-brand);
    display: grid;
    place-items: center;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
    margin-bottom: var(--space-5);
  }

  .practice-step__title {
    font-family: var(--font-display);
    font-size: 21px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 700;
    margin-bottom: var(--space-2);
  }

  .practice-step__text {
    color: var(--color-text-muted);
    font-size: 14px;
    line-height: 1.55;
  }

  .rail {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .rail-card {
    padding: var(--space-5);
  }

  .rail-title {
    font-family: var(--font-display);
    font-size: 21px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 700;
    margin-bottom: var(--space-4);
  }

  .meta-list {
    display: flex;
    flex-direction: column;
  }

  .meta-row {
    display: flex;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--color-border);
    font-size: 14px;
  }

  .meta-row:first-child {
    padding-top: 0;
  }

  .meta-row:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  .meta-row span:first-child {
    color: var(--color-text-dim);
  }

  .meta-row span:last-child {
    color: var(--color-text);
    text-align: right;
  }

  .download-card {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    background: var(--color-surface-sunken);
    margin-top: var(--space-4);
  }

  .download-card__name {
    font-size: 14px;
    color: var(--color-text);
    font-weight: 600;
    margin-bottom: 2px;
  }

  .download-card__meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .related-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .related-item {
    display: grid;
    grid-template-columns: 54px 1fr;
    gap: var(--space-3);
    align-items: center;
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--color-border);
  }

  .related-item:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  .related-thumb {
    width: 54px;
    height: 54px;
    border-radius: var(--radius-md);
    background:
      radial-gradient(circle at 20% 20%, rgba(255,69,0,0.30), transparent 50%),
      var(--color-surface-raised);
    border: 1px solid var(--color-border);
  }

  .related-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.25;
  }

  .related-meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 3px;
  }

  .error-panel {
    margin-top: var(--space-5);
    padding: var(--space-5);
    border-color: rgba(248,113,113,0.24);
    background: rgba(248,113,113,0.04);
  }

  .error-panel__title {
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: var(--space-1);
  }

  .error-panel__text {
    color: var(--color-text-muted);
    font-size: 14px;
  }

  @media (max-width: 1220px) {
    .detail-layout {
      grid-template-columns: 1fr;
    }

    .rail {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 900px) {
    .detail-hero {
      grid-template-columns: 1fr;
    }

    .detail-cover {
      min-height: 300px;
      border-right: 0;
      border-bottom: 1px solid var(--color-border);
    }

    .detail-hero__content {
      padding: var(--space-6) var(--space-5);
    }

    .practice-steps,
    .rail {
      grid-template-columns: 1fr;
    }

    .player-main {
      grid-template-columns: auto 1fr;
    }

    .player-main .btn {
      grid-column: 1 / -1;
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    .detail-actions .btn {
      width: 100%;
    }

    .player-panel {
      padding: var(--space-5);
    }

    .player-wave {
      height: 56px;
      padding: var(--space-3);
    }

    .section-head {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>

<style id="basscally-art-motion-v3">
  /* ============================================================
     ART + MOTION PASS
     Standalone HTML version of the Framer Motion direction.
     Keep the structure. Push depth, contrast, and motion.
  ============================================================ */
  :root {
    --color-brand:          #FF4A05;
    --color-brand-hover:    #FF6A2A;
    --color-brand-muted:    #371407;
    --color-bg:             #030304;
    --color-surface:        #101012;
    --color-surface-raised: #19191D;
    --color-surface-sunken: #030304;
    --color-border:         #2B2B31;
    --color-border-strong:  #464048;
    --color-text:           #FAFAFC;
    --color-text-muted:     #B6B2B6;
    --color-text-dim:       #777179;
    --shadow-md: 0 18px 44px rgba(0,0,0,0.42);
    --shadow-lg: 0 28px 90px rgba(0,0,0,0.62);
    --shadow-brand-glow: 0 0 34px rgba(255,74,5,0.34), 0 16px 52px rgba(255,74,5,0.16);
    --motion-spring: cubic-bezier(0.22, 1, 0.36, 1);
  }

  body {
    position: relative;
    isolation: isolate;
    background:
      radial-gradient(circle at 8% 4%, rgba(255,74,5,0.20), transparent 30%),
      radial-gradient(circle at 82% -8%, rgba(255,122,48,0.12), transparent 34%),
      radial-gradient(circle at 58% 44%, rgba(255,74,5,0.045), transparent 38%),
      linear-gradient(180deg, #030304 0%, #080708 48%, #030304 100%);
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 22% 18%, rgba(255,74,5,0.16), transparent 18%),
      radial-gradient(circle at 74% 10%, rgba(245,245,247,0.035), transparent 20%),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.026) 0 1px, transparent 1px 72px),
      repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 72px);
    mask-image: radial-gradient(ellipse at 50% 14%, black 0%, transparent 72%);
    -webkit-mask-image: radial-gradient(ellipse at 50% 14%, black 0%, transparent 72%);
    opacity: 0.9;
  }

  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E");
    opacity: 0.052;
    mix-blend-mode: screen;
  }

  .shell,
  .mobile-bottom-nav,
  .audio-bar {
    position: relative;
    z-index: 1;
  }

  .sidebar,
  .topbar {
    background: rgba(3,3,4,0.80);
    border-color: rgba(255,255,255,0.075);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.018), 0 24px 72px rgba(0,0,0,0.30);
  }

  .brand__mark,
  .avatar {
    box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 10px 30px rgba(255,74,5,0.22);
  }

  .page-title,
  .empty-hero__title,
  .latest-drop__title,
  .detail-title,
  .cover-type__big,
  .detail-cover__big {
    text-shadow: 0 1px 0 rgba(255,255,255,0.04), 0 24px 80px rgba(255,74,5,0.10);
  }

  .page-kicker,
  .topbar__label,
  .nav-label,
  .rail-label,
  .section-note {
    color: #8F8588;
  }

  .panel,
  .content-card,
  .starter-card,
  .skeleton-card,
  .rail-card,
  .stat-card,
  .drop-card,
  .practice-step,
  .download-card,
  .error-panel {
    background:
      linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012)),
      linear-gradient(135deg, rgba(255,74,5,0.030), transparent 38%),
      var(--color-surface);
    border-color: rgba(255,255,255,0.085);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.045),
      0 22px 70px rgba(0,0,0,0.30);
  }

  .panel:hover,
  .content-card:hover,
  .starter-card:hover,
  .rail-card:hover,
  .practice-step:hover {
    border-color: rgba(255,255,255,0.16);
  }

  .empty-hero,
  .latest-drop,
  .detail-hero,
  .player-panel {
    background:
      radial-gradient(circle at 78% 14%, rgba(255,74,5,0.24), transparent 28%),
      radial-gradient(circle at 28% 0%, rgba(255,255,255,0.055), transparent 26%),
      linear-gradient(135deg, rgba(255,74,5,0.055), transparent 32%),
      #0D0D10;
    border-color: rgba(255,255,255,0.11);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.06),
      0 34px 110px rgba(0,0,0,0.52);
  }

  .empty-hero::after,
  .latest-drop::after,
  .detail-hero::after,
  .player-panel::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.045) 38%, transparent 54%),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 44px);
    opacity: 0.42;
    mix-blend-mode: screen;
    transform: translateX(-18%);
  }

  .empty-hero > *,
  .latest-drop > *,
  .detail-hero > *,
  .player-panel > * {
    position: relative;
    z-index: 1;
  }

  .empty-hero__title span,
  .orange,
  .badge--founding,
  .cover-type__small,
  .detail-cover__small {
    color: #FF6428;
  }

  .badge {
    border: 1px solid rgba(255,255,255,0.075);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
  }

  .badge--founding,
  .badge--type {
    background: rgba(255,74,5,0.10);
  }

  .btn--primary,
  .play,
  .content-card__play {
    background:
      linear-gradient(180deg, #FF6A2A 0%, #FF4A05 48%, #C83300 100%);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 16px 46px rgba(255,74,5,0.24);
  }

  .btn--primary:hover,
  .play:hover,
  .content-card__play:hover {
    box-shadow: var(--shadow-brand-glow);
  }

  .btn--secondary,
  .btn--ghost,
  .nav-item,
  .tab {
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .nav-item.active,
  .tab.active {
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 34px rgba(0,0,0,0.28);
  }

  .latest-drop__cover,
  .content-card__cover,
  .detail-cover,
  .audio-bar__thumb {
    background:
      radial-gradient(circle at 26% 18%, rgba(255,255,255,0.16), transparent 13%),
      conic-gradient(from 210deg at 60% 50%, #FF4A05 0deg, #7B1B00 58deg, #151518 128deg, #FF7A30 194deg, #101012 258deg, #FF4A05 360deg),
      linear-gradient(135deg, #1E1E24, #050506);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 18px 62px rgba(255,74,5,0.14);
  }

  .latest-drop__cover::before,
  .content-card__cover::before,
  .detail-cover::before,
  .audio-bar__thumb::before {
    content: "";
    position: absolute;
    inset: 12%;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: inset 0 0 0 18px rgba(0,0,0,0.18), inset 0 0 0 19px rgba(255,255,255,0.05);
    opacity: 0.6;
  }

  .content-card__cover::after,
  .detail-cover::after {
    background-image:
      radial-gradient(circle, rgba(255,255,255,0.06) 0 1px, transparent 1px),
      linear-gradient(120deg, rgba(255,255,255,0.08), transparent 36%, rgba(255,74,5,0.09));
    background-size: 18px 18px, 100% 100%;
    mask-image: none;
    opacity: 0.55;
  }

  .cover-type,
  .detail-cover__type {
    background: rgba(3,3,4,0.64);
    border-color: rgba(255,255,255,0.16);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 54px rgba(0,0,0,0.38);
  }

  .content-card:nth-child(2) .content-card__cover,
  .related-item:nth-child(2) .related-thumb {
    filter: hue-rotate(-18deg) saturate(1.12);
  }

  .content-card:nth-child(3) .content-card__cover,
  .related-item:nth-child(3) .related-thumb {
    filter: hue-rotate(18deg) saturate(1.08);
  }

  .content-card:nth-child(4) .content-card__cover,
  .content-card:nth-child(6) .content-card__cover {
    filter: contrast(1.08) saturate(0.96);
  }

  .scrub__track,
  .player-wave {
    background:
      linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.008)),
      #070708;
    border: 1px solid rgba(255,255,255,0.07);
  }

  .scrub__fill,
  .wave-bar.played {
    background: linear-gradient(90deg, #FF8A4C, #FF4A05 55%, #C83300);
    box-shadow: 0 0 22px rgba(255,74,5,0.42);
  }

  .audio-bar {
    background: rgba(3,3,4,0.88);
    border-top-color: rgba(255,255,255,0.10);
    box-shadow: 0 -26px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.045);
  }

  .mobile-bottom-nav {
    background: rgba(5,5,6,0.92);
    border-color: rgba(255,255,255,0.10);
    box-shadow: 0 20px 80px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .progress-ring {
    background:
      conic-gradient(from -70deg, #FF8A4C 0 12%, #FF4A05 12% 31%, rgba(255,255,255,0.09) 31% 100%);
    box-shadow: 0 0 44px rgba(255,74,5,0.18);
  }

  .progress-ring__inner {
    background: radial-gradient(circle at 50% 0%, rgba(255,74,5,0.08), transparent 42%), #0A0A0B;
  }

  .skeleton-cover,
  .skeleton-line {
    background: linear-gradient(90deg, rgba(255,255,255,0.045), rgba(255,74,5,0.11), rgba(255,255,255,0.045));
    background-size: 220% 100%;
  }

  @media (prefers-reduced-motion: no-preference) {
    body::before {
      animation: ambientDrift 16s var(--motion-spring) infinite alternate;
    }

    .empty-hero::after,
    .latest-drop::after,
    .detail-hero::after,
    .player-panel::after {
      animation: artSweep 7s linear infinite;
    }

    .brand__mark,
    .play,
    .content-card__play,
    .btn--primary {
      transition: transform 220ms var(--motion-spring), box-shadow 220ms var(--motion-spring), filter 220ms var(--motion-spring);
    }

    .btn:hover,
    .play:hover,
    .content-card:hover {
      transform: translateY(-3px) scale(1.01);
    }

    .nav-item:hover,
    .tab:hover,
    .starter-card:hover,
    .practice-step:hover,
    .rail-card:hover {
      transform: translateY(-2px);
    }

    .play:active,
    .btn:active {
      transform: scale(0.965);
    }

    .latest-drop__cover,
    .content-card__cover,
    .detail-cover,
    .audio-bar__thumb {
      animation: vinylBreath 10s ease-in-out infinite alternate;
    }

    .scrub__fill {
      animation: progressBreath 2.6s ease-in-out infinite;
    }

    .wave-bar.played {
      animation: wavePulse 1.4s ease-in-out infinite alternate;
      transform-origin: bottom;
    }

    .wave-bar.played:nth-child(2n) { animation-delay: 120ms; }
    .wave-bar.played:nth-child(3n) { animation-delay: 240ms; }
    .wave-bar.played:nth-child(5n) { animation-delay: 360ms; }

    .motion-ready {
      opacity: 0;
      transform: translateY(20px) scale(0.985);
      filter: blur(6px);
      transition:
        opacity 720ms var(--motion-spring),
        transform 720ms var(--motion-spring),
        filter 720ms var(--motion-spring);
      transition-delay: calc(var(--motion-index, 0) * 42ms);
    }

    .motion-ready.is-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }

    .skeleton-cover,
    .skeleton-line {
      animation: shimmer 2.2s linear infinite;
    }

    @keyframes ambientDrift {
      from { transform: translate3d(-1%, -1%, 0) scale(1); opacity: 0.78; }
      to   { transform: translate3d(1.5%, 1%, 0) scale(1.03); opacity: 1; }
    }

    @keyframes artSweep {
      from { transform: translateX(-38%); }
      to   { transform: translateX(38%); }
    }

    @keyframes vinylBreath {
      from { filter: saturate(1.02) contrast(1.02); }
      to   { filter: saturate(1.18) contrast(1.08) brightness(1.04); }
    }

    @keyframes progressBreath {
      0%, 100% { filter: brightness(1); box-shadow: 0 0 18px rgba(255,74,5,0.32); }
      50%      { filter: brightness(1.18); box-shadow: 0 0 32px rgba(255,74,5,0.50); }
    }

    @keyframes wavePulse {
      from { filter: brightness(0.92); transform: scaleY(0.92); }
      to   { filter: brightness(1.22); transform: scaleY(1.04); }
    }

    @keyframes shimmer {
      from { background-position: 200% 0; }
      to   { background-position: -200% 0; }
    }
  }

  @media (max-width: 767px) {
    body::before {
      background:
        radial-gradient(circle at 20% 4%, rgba(255,74,5,0.18), transparent 32%),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 56px);
    }

    .page-title,
    .empty-hero__title,
    .latest-drop__title,
    .detail-title {
      text-shadow: 0 18px 56px rgba(255,74,5,0.13);
    }
  }
</style>

</head>
<body>


<div class="shell">
  <aside class="sidebar" aria-label="Member navigation">
    <a href="/dashboard" class="brand" aria-label="Basscally Club dashboard">
      <span class="brand__mark">B</span>
      <span class="brand__text">Basscally Club</span>
    </a>

    <nav class="nav-group">
      <div class="nav-label">// Practice</div>
      <a href="/dashboard" class="nav-item active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 13h8V3H3v10Z"/><path d="M13 21h8V11h-8v10Z"/><path d="M13 3v6h8V3h-8Z"/><path d="M3 21h8v-6H3v6Z"/></svg>
        Dashboard
      </a>
      <a href="#library" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5V6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5"/><path d="M8 8h8"/><path d="M8 12h6"/></svg>
        Library
      </a>
      <a href="#downloads" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
        Downloads
      </a>
      <a href="#challenge" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        Challenges
      </a>
    </nav>

    <nav class="nav-group">
      <div class="nav-label">// Account</div>
      <a href="/account" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>
        Membership
      </a>
      <a href="/auth/login" class="nav-item">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>
        Sign out
      </a>
    </nav>

    <div class="sidebar-card">
      <div class="sidebar-card__eyebrow">Active membership</div>
      <h2 class="sidebar-card__title">$1.50 locked</h2>
      <p class="sidebar-card__text">Founding member pricing stays active while your membership is active.</p>
    </div>
  </aside>

  <main>
    <header class="topbar">
      <div class="topbar__left">
        <button class="mobile-menu" aria-label="Open menu">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
        </button>
        <span class="topbar__label">// Member area</span>
      </div>
      <div class="topbar__actions">
        <a href="/account" class="btn btn--secondary">Membership</a>
        <div class="avatar" aria-label="Michael">MO</div>
      </div>
    </header>

    <section class="page page--wide">
      <div class="page-header">
        <div>
          <div class="page-kicker">// Practice drop</div>
          <h1 class="page-title">Funk slap pattern in E</h1>
          <p class="page-subtitle">A focused groove drop for pocket, timing, and clean right-hand control.</p>
        </div>
        <a href="/dashboard" class="btn btn--secondary">Back to library</a>
      </div>

      <div class="detail-layout">
        <div>
          <section class="panel detail-hero">
            <div class="detail-cover" aria-label="Cover art for Funk slap pattern in E">
              <div class="detail-cover__type">
                <div class="detail-cover__small">Issue 001 · Groove</div>
                <div class="detail-cover__big">Pocket<br>first.</div>
              </div>
            </div>

            <div class="detail-hero__content">
              <div>
                <div class="detail-badges">
                  <span class="badge badge--type">Groove</span>
                  <span class="badge badge--beginner">Beginner</span>
                  <span class="badge badge--type">2 min</span>
                  <span class="badge badge--type">Dropped today</span>
                </div>
                <h2 class="detail-title">Funk slap pattern in E</h2>
                <p class="detail-desc">Keep the notes short. Let the kick lead. Your goal is not speed first. Your goal is one clean loop that feels heavy without rushing.</p>
              </div>

              <div class="detail-actions">
                <button class="btn btn--primary">Play drop</button>
                <button class="btn btn--secondary">Download audio</button>
                <button class="btn btn--ghost">Mark as practiced</button>
              </div>
            </div>
          </section>

          <section class="panel player-panel" aria-label="Inline audio player">
            <div class="player-main">
              <button class="play" aria-label="Play track">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7-11-7Z"/></svg>
              </button>
              <div class="player-meta">
                <div class="player-meta__label">Now playing</div>
                <div class="player-meta__title">Funk slap pattern in E</div>
              </div>
              <button class="btn btn--secondary">Download MP3</button>
            </div>

            <div class="player-wave" aria-hidden="true">
              <span class="wave-bar played" style="height:22px"></span>
        <span class="wave-bar played" style="height:34px"></span>
        <span class="wave-bar played" style="height:18px"></span>
        <span class="wave-bar played" style="height:48px"></span>
        <span class="wave-bar played" style="height:42px"></span>
        <span class="wave-bar played" style="height:55px"></span>
        <span class="wave-bar played" style="height:28px"></span>
        <span class="wave-bar played" style="height:68px"></span>
        <span class="wave-bar played" style="height:44px"></span>
        <span class="wave-bar played" style="height:30px"></span>
        <span class="wave-bar played" style="height:62px"></span>
        <span class="wave-bar played" style="height:52px"></span>
        <span class="wave-bar" style="height:24px"></span>
        <span class="wave-bar" style="height:58px"></span>
        <span class="wave-bar" style="height:36px"></span>
        <span class="wave-bar" style="height:64px"></span>
        <span class="wave-bar" style="height:70px"></span>
        <span class="wave-bar" style="height:38px"></span>
        <span class="wave-bar" style="height:26px"></span>
        <span class="wave-bar" style="height:50px"></span>
        <span class="wave-bar" style="height:66px"></span>
        <span class="wave-bar" style="height:32px"></span>
        <span class="wave-bar" style="height:44px"></span>
        <span class="wave-bar" style="height:60px"></span>
        <span class="wave-bar" style="height:48px"></span>
        <span class="wave-bar" style="height:20px"></span>
        <span class="wave-bar" style="height:52px"></span>
        <span class="wave-bar" style="height:72px"></span>
        <span class="wave-bar" style="height:34px"></span>
        <span class="wave-bar" style="height:28px"></span>
        <span class="wave-bar" style="height:62px"></span>
        <span class="wave-bar" style="height:46px"></span>
            </div>
            <div class="player-times">
              <span>0:44</span>
              <span>2:00</span>
            </div>
          </section>

          <section class="practice-section">
            <div class="section-head">
              <div>
                <div class="page-kicker">// How to practice this drop</div>
                <h2>Three-pass method</h2>
              </div>
              <span class="badge badge--type">Repeat for 15 minutes</span>
            </div>

            <div class="practice-steps">
              <article class="panel practice-step">
                <div class="practice-step__num">01</div>
                <h3 class="practice-step__title">Learn the pocket</h3>
                <p class="practice-step__text">Loop the first bar at low volume. Keep the attack even. Do not chase speed yet.</p>
              </article>

              <article class="panel practice-step">
                <div class="practice-step__num">02</div>
                <h3 class="practice-step__title">Record one take</h3>
                <p class="practice-step__text">Record 30 seconds without stopping. Listen for rushed notes around the kick.</p>
              </article>

              <article class="panel practice-step">
                <div class="practice-step__num">03</div>
                <h3 class="practice-step__title">Push the tempo</h3>
                <p class="practice-step__text">Raise the tempo only when the groove still feels calm and controlled.</p>
              </article>
            </div>
          </section>

          <section class="panel error-panel" aria-label="Error state preview">
            <div class="error-panel__title">Download failed.</div>
            <p class="error-panel__text">The signed link expired. Try again and the Club will issue a fresh download link.</p>
          </section>
        </div>

        <aside class="rail">
          <section class="panel rail-card">
            <div class="page-kicker">// Drop details</div>
            <h2 class="rail-title">Metadata</h2>
            <div class="meta-list">
              <div class="meta-row"><span>Type</span><span>Groove</span></div>
              <div class="meta-row"><span>Difficulty</span><span>Beginner</span></div>
              <div class="meta-row"><span>Length</span><span>2:00</span></div>
              <div class="meta-row"><span>Key</span><span>E minor</span></div>
              <div class="meta-row"><span>Tempo</span><span>80 BPM</span></div>
              <div class="meta-row"><span>Published</span><span>Today</span></div>
            </div>
          </section>

          <section class="panel rail-card">
            <div class="page-kicker">// Files</div>
            <h2 class="rail-title">Downloads</h2>
            <div class="download-card">
              <div class="download-card__name">funk-slap-pattern-e.mp3</div>
              <div class="download-card__meta">MP3 · 4.8 MB</div>
            </div>
            <div class="download-card">
              <div class="download-card__name">practice-notes.pdf</div>
              <div class="download-card__meta">PDF · 260 KB</div>
            </div>
            <a href="#download" class="btn btn--primary" style="width:100%; margin-top:var(--space-4);">Download all</a>
          </section>

          <section class="panel rail-card">
            <div class="page-kicker">// Up next</div>
            <h2 class="rail-title">Related drops</h2>
            <div class="related-list">
              <div class="related-item">
                <div class="related-thumb"></div>
                <div>
                  <div class="related-title">Gospel passing movement</div>
                  <div class="related-meta">Groove · Intermediate</div>
                </div>
              </div>
              <div class="related-item">
                <div class="related-thumb"></div>
                <div>
                  <div class="related-title">Minor pentatonic landing</div>
                  <div class="related-meta">Fill · Beginner</div>
                </div>
              </div>
              <div class="related-item">
                <div class="related-thumb"></div>
                <div>
                  <div class="related-title">One-take pocket challenge</div>
                  <div class="related-meta">Challenge · Weekly</div>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </section>

    <div class="audio-bar" aria-label="Sticky audio player">
      <div class="audio-bar__thumb"></div>
      <button class="play" aria-label="Pause current track">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5h3v14H8zM13 5h3v14h-3z"/></svg>
      </button>
      <div class="audio-bar__meta">
        <div class="audio-bar__title">Funk slap pattern in E</div>
        <div class="audio-bar__sub">0:44 playing</div>
      </div>
      <div class="scrub">
        <span class="scrub__time">0:44</span>
        <div class="scrub__track"><div class="scrub__fill"></div></div>
        <span class="scrub__time">2:00</span>
      </div>
      <button class="btn btn--secondary">Download</button>
    </div>

  </main>
</div>

<nav class="mobile-bottom-nav" aria-label="Mobile navigation">
  <a href="/dashboard" class="active">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 13h8V3H3v10Z"/><path d="M13 21h8V11h-8v10Z"/><path d="M13 3v6h8V3h-8Z"/><path d="M3 21h8v-6H3v6Z"/></svg>
    Home
  </a>
  <a href="#library">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5V6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5"/><path d="M8 8h8"/><path d="M8 12h6"/></svg>
    Library
  </a>
  <a href="#downloads">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
    Files
  </a>
  <a href="/account">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>
    You
  </a>
</nav>
<script id="basscally-art-motion-js">
  (function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const motionTargets = document.querySelectorAll([
      '.page-header',
      '.empty-hero',
      '.latest-drop',
      '.detail-hero',
      '.player-panel',
      '.panel:not(.empty-hero):not(.latest-drop):not(.detail-hero):not(.player-panel)',
      '.content-card',
      '.starter-card',
      '.stat-card',
      '.practice-step',
      '.rail-card',
      '.drop-card',
      '.download-card',
      '.error-panel'
    ].join(','));

    motionTargets.forEach((el, index) => {
      el.classList.add('motion-ready');
      el.style.setProperty('--motion-index', String(Math.min(index, 12)));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    motionTargets.forEach((el) => observer.observe(el));

    document.querySelectorAll('.play, .content-card__play').forEach((button) => {
      button.addEventListener('click', () => {
        document.body.classList.toggle('is-playing');
        button.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(0.92)' },
          { transform: 'scale(1)' }
        ], { duration: 260, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      });
    });
  })();
</script>

</body>
</html>

```

## Screen 07: Account Membership

Route: `/account`
Reference file: `basscally-screen-7-account-membership.html`
Purpose: Subscription status and account actions

```html
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Basscally Screen 7 Account Membership</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
    --color-bg:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
    --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
    --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
    --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,BlinkMacSystemFont,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
    --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-5:24px; --space-6:32px; --space-8:48px; --space-10:64px; --space-12:96px;
    --radius-sm:6px; --radius-md:10px; --radius-lg:14px; --radius-xl:20px; --radius-full:9999px;
    --shadow-sm:0 1px 2px rgba(0,0,0,.4); --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 56px rgba(0,0,0,.62); --shadow-brand-glow:0 0 32px rgba(255,69,0,.30);
    --motion-fast:150ms; --motion-default:250ms; --motion-slow:420ms; --ease-out:cubic-bezier(.16,1,.3,1);
  }
  *{box-sizing:border-box;margin:0;padding:0} html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;scroll-behavior:smooth} body{min-height:100vh;overflow-x:hidden;background:radial-gradient(circle at 12% -10%, rgba(255,69,0,.17), transparent 32%),radial-gradient(circle at 88% 2%, rgba(255,92,31,.06), transparent 32%),linear-gradient(135deg,#09090A 0%,#0A0A0B 55%,#070707 100%);color:var(--color-text)}
  ::selection{background:var(--color-brand);color:#fff} a{color:inherit} button,input,textarea,select{font:inherit} svg{display:block}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
  .shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
  .sidebar{position:sticky;top:0;height:100vh;padding:var(--space-5);border-right:1px solid rgba(38,38,42,.82);background:rgba(10,10,11,.76);backdrop-filter:blur(24px) saturate(140%);-webkit-backdrop-filter:blur(24px) saturate(140%);display:flex;flex-direction:column;gap:var(--space-8)}
  .brand{display:flex;align-items:center;gap:10px;text-decoration:none}.brand__mark{width:28px;height:28px;border-radius:8px;background:var(--color-brand);color:#fff;display:grid;place-items:center;font-family:var(--font-display);font-weight:800;font-size:15px;line-height:1}.brand__text{font-family:var(--font-display);font-size:17px;font-weight:700;letter-spacing:-.015em;color:var(--color-text)}
  .nav-group{display:flex;flex-direction:column;gap:var(--space-2)}.nav-label{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);margin-bottom:var(--space-2)}
  .nav-item{min-height:44px;display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);border-radius:var(--radius-lg);color:var(--color-text-muted);text-decoration:none;border:1px solid transparent;transition:all var(--motion-fast) var(--ease-out)}.nav-item svg{width:19px;height:19px;color:var(--color-text-dim);transition:color var(--motion-fast) var(--ease-out)}.nav-item:hover{color:var(--color-text);background:var(--color-surface)}.nav-item.active{color:var(--color-text);background:var(--color-surface);border-color:var(--color-border)}.nav-item.active svg{color:var(--color-brand)}
  .sidebar-card{margin-top:auto;background:linear-gradient(180deg,rgba(28,28,31,.95),rgba(20,20,22,.88));border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-5);box-shadow:var(--shadow-sm)}.sidebar-card__eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-success);margin-bottom:var(--space-2)}.sidebar-card__title{font-family:var(--font-display);font-weight:700;font-size:18px;line-height:1.1;letter-spacing:-.015em;color:var(--color-text);margin-bottom:var(--space-2)}.sidebar-card__text{font-size:13px;color:var(--color-text-muted);line-height:1.5}
  .topbar{position:sticky;top:0;z-index:30;min-height:72px;padding:0 var(--space-8);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(38,38,42,.76);background:rgba(10,10,11,.62);backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%)}.topbar__label{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.topbar__right{display:flex;align-items:center;gap:var(--space-3)}
  .mobile-top{display:none;position:sticky;top:0;z-index:40;min-height:64px;padding:0 var(--space-4);align-items:center;justify-content:space-between;border-bottom:1px solid rgba(38,38,42,.76);background:rgba(10,10,11,.82);backdrop-filter:blur(22px)}.icon-btn{min-width:44px;min-height:44px;border:1px solid var(--color-border);background:var(--color-surface);border-radius:var(--radius-lg);display:grid;place-items:center;color:var(--color-text-muted);cursor:pointer;transition:all var(--motion-fast) var(--ease-out)}.icon-btn:hover{color:var(--color-text);border-color:var(--color-border-strong);transform:translateY(-1px)}
  .main{min-width:0}.content{padding:var(--space-8);max-width:1260px;margin:0 auto}.page-head{display:flex;justify-content:space-between;gap:var(--space-8);align-items:flex-end;margin-bottom:var(--space-8)}.eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-brand);margin-bottom:var(--space-3)}.headline{font-family:var(--font-display);font-weight:800;font-size:clamp(42px,6.2vw,82px);line-height:.94;letter-spacing:-.045em;color:var(--color-text);max-width:760px}.headline .muted{color:var(--color-text-dim);font-weight:700}.lead{font-size:18px;color:var(--color-text-muted);max-width:620px;line-height:1.55;margin-top:var(--space-4)}
  .btn{font-family:var(--font-body);font-weight:600;font-size:14px;line-height:1;min-height:44px;padding:12px 18px;border-radius:var(--radius-lg);border:1px solid transparent;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;transition:all var(--motion-fast) var(--ease-out)}.btn--primary{background:var(--color-brand);color:#fff}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-1px)}.btn--primary:active{transform:scale(.98)}.btn--secondary{background:transparent;border-color:var(--color-border-strong);color:var(--color-text)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.icon-btn:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:2px solid rgba(255,69,0,.70);outline-offset:3px}
  .badge{display:inline-flex;align-items:center;gap:6px;min-height:26px;padding:4px 10px;border-radius:var(--radius-full);font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;border:1px solid transparent}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border-color:rgba(255,69,0,.18)}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border-color:rgba(52,211,153,.20)}.badge--warning{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.20)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.22)}.badge--neutral{background:rgba(255,255,255,.04);color:var(--color-text-muted);border-color:var(--color-border)}
  .card{background:linear-gradient(180deg,rgba(24,24,27,.96),rgba(16,16,18,.94));border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);position:relative;overflow:hidden}.card::before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,255,255,.04),transparent 42%);pointer-events:none;opacity:.55}.card > *{position:relative}.card--lift{transition:border-color var(--motion-default) var(--ease-out),transform var(--motion-default) var(--ease-out),box-shadow var(--motion-default) var(--ease-out)}.card--lift:hover{border-color:var(--color-border-strong);transform:translateY(-3px);box-shadow:var(--shadow-lg)}
  .grid-2{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(340px,.65fr);gap:var(--space-5)}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4)}.section-title{font-family:var(--font-display);font-size:24px;font-weight:700;letter-spacing:-.02em;color:var(--color-text);line-height:1.15}.section-copy{font-size:14px;color:var(--color-text-muted);line-height:1.55}.mono{font-family:var(--font-mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-dim)}.divider{height:1px;background:var(--color-border);width:100%}
  .field{display:flex;flex-direction:column;gap:var(--space-2)}.field label{font-size:13px;font-weight:500;color:var(--color-text-muted)}.input,.select,.textarea{width:100%;background:rgba(20,20,22,.96);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:12px 14px;color:var(--color-text);font-size:15px;outline:none;transition:border-color var(--motion-fast) var(--ease-out),box-shadow var(--motion-fast) var(--ease-out),background var(--motion-fast) var(--ease-out)}.textarea{min-height:140px;resize:vertical;line-height:1.55}.input::placeholder,.textarea::placeholder{color:var(--color-text-dim)}.input:focus,.select:focus,.textarea:focus{border-color:var(--color-brand);box-shadow:0 0 0 3px rgba(255,69,0,.15);background:var(--color-surface-raised)}.hint{font-size:12px;color:var(--color-text-dim);line-height:1.45}.error-line{font-size:12px;color:var(--color-danger);display:flex;align-items:center;gap:6px}
  .art-card{background:radial-gradient(circle at 18% 10%,rgba(255,69,0,.28),transparent 36%),linear-gradient(135deg,#241008 0%,#151517 38%,#080809 100%);border:1px solid rgba(255,69,0,.18);border-radius:var(--radius-xl);overflow:hidden;position:relative;box-shadow:0 26px 70px rgba(0,0,0,.55)}.art-card::after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:32px 32px;mask-image:radial-gradient(circle at center,black 16%,transparent 76%);opacity:.45;pointer-events:none}.orb{position:absolute;border-radius:50%;filter:blur(0);background:rgba(255,69,0,.16);border:1px solid rgba(255,69,0,.22)}.orb--one{width:180px;height:180px;right:-66px;top:-70px}.orb--two{width:96px;height:96px;left:42px;bottom:34px;background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.08)}
  .wave{display:flex;align-items:end;gap:4px;height:42px}.wave span{width:5px;border-radius:var(--radius-full);background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.20));height:12px;opacity:.85}.wave span:nth-child(2n){height:28px}.wave span:nth-child(3n){height:18px}.wave span:nth-child(5n){height:36px}
  .skeleton{position:relative;overflow:hidden;background:#18181b;border-radius:var(--radius-md);min-height:16px}.skeleton::after{content:"";position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)}
  @media (prefers-reduced-motion:no-preference){.enter{opacity:0;transform:translateY(14px);animation:rise 650ms var(--ease-out) forwards}.enter.delay-1{animation-delay:80ms}.enter.delay-2{animation-delay:160ms}.enter.delay-3{animation-delay:240ms}.enter.delay-4{animation-delay:320ms}.orb--one{animation:float 7s var(--ease-out) infinite alternate}.orb--two{animation:float 9s var(--ease-out) infinite alternate-reverse}.wave span{animation:bar 1200ms ease-in-out infinite alternate}.wave span:nth-child(2n){animation-delay:160ms}.wave span:nth-child(3n){animation-delay:300ms}.skeleton::after{animation:shimmer 1.4s infinite}.pulse{animation:pulse 2.5s var(--ease-out) infinite}@keyframes rise{to{opacity:1;transform:translateY(0)}}@keyframes float{to{transform:translate3d(14px,12px,0) scale(1.04)}}@keyframes bar{to{height:38px;opacity:1}}@keyframes shimmer{to{transform:translateX(100%)}}@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(255,69,0,.28)}100%{box-shadow:0 0 0 14px rgba(255,69,0,0)}}}
  @media (max-width:1100px){.shell{grid-template-columns:1fr}.sidebar{display:none}.mobile-top{display:flex}.topbar{display:none}.content{padding:var(--space-6) var(--space-5)}.grid-2,.grid-3{grid-template-columns:1fr}.page-head{align-items:flex-start;flex-direction:column}.headline{font-size:clamp(38px,11vw,64px)}}
  @media (max-width:640px){body{background:radial-gradient(circle at 18% -8%,rgba(255,69,0,.17),transparent 36%),var(--color-bg)}.content{padding:var(--space-5) var(--space-4) var(--space-8)}.headline{letter-spacing:-.035em}.lead{font-size:16px}.btn{width:100%}.topbar__right{width:100%}.mobile-actions{display:grid;grid-template-columns:1fr;gap:var(--space-3)}.card{border-radius:var(--radius-lg)}}


  .membership-hero{padding:var(--space-8);min-height:360px;display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:var(--space-8);align-items:end}.membership-hero__price{font-family:var(--font-display);font-size:clamp(72px,10vw,132px);font-weight:900;letter-spacing:-.06em;line-height:.86;color:var(--color-text)}.membership-hero__price span{color:var(--color-brand)}.membership-hero__meta{display:flex;gap:var(--space-3);flex-wrap:wrap;margin-top:var(--space-5)}.meter{height:8px;border-radius:999px;background:rgba(255,255,255,.06);overflow:hidden;border:1px solid rgba(255,255,255,.06)}.meter span{display:block;height:100%;width:72%;background:linear-gradient(90deg,var(--color-brand),var(--color-brand-hover));border-radius:inherit}.detail-list{display:grid;gap:var(--space-3)}.detail-row{display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);padding:var(--space-4) 0;border-bottom:1px solid var(--color-border)}.detail-row:last-child{border-bottom:0}.detail-row strong{font-size:14px;color:var(--color-text)}.detail-row span{font-size:14px;color:var(--color-text-muted);text-align:right}.plan-card{padding:var(--space-6)}.action-stack{display:grid;gap:var(--space-3);margin-top:var(--space-5)}.timeline{padding:var(--space-6)}.timeline-list{display:grid;gap:var(--space-5);margin-top:var(--space-5)}.timeline-item{display:grid;grid-template-columns:28px 1fr;gap:var(--space-3);position:relative}.timeline-dot{width:12px;height:12px;border-radius:999px;background:var(--color-brand);margin-top:5px}.timeline-item:not(:last-child)::after{content:"";position:absolute;left:5px;top:22px;bottom:-20px;width:1px;background:var(--color-border)}.timeline-title{font-size:14px;font-weight:600;color:var(--color-text)}.timeline-copy{font-size:13px;color:var(--color-text-muted);margin-top:2px}.mini-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4);margin-top:var(--space-5)}.mini-card{padding:var(--space-5)}.mini-card__value{font-family:var(--font-display);font-size:28px;font-weight:800;line-height:1;color:var(--color-text);letter-spacing:-.03em}.mini-card__label{font-family:var(--font-mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-dim);margin-top:var(--space-2)}.state-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);margin-top:var(--space-5)}.state-chip{padding:var(--space-4);border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.72)}.state-chip strong{display:block;font-size:13px;color:var(--color-text)}.state-chip span{display:block;font-size:12px;color:var(--color-text-dim);margin-top:2px}
  @media(max-width:900px){.membership-hero{grid-template-columns:1fr;padding:var(--space-6)}.mini-grid,.state-strip{grid-template-columns:1fr}}
</style></head><body>

<div class="mobile-top">
  <a class="brand" href="#"><span class="brand__mark">B</span><span class="brand__text">Basscally Club</span></a>
  <button class="icon-btn" aria-label="Open menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
</div>

<div class="shell">

<aside class="sidebar" aria-label="Member navigation">
  <a class="brand" href="#"><span class="brand__mark">B</span><span class="brand__text">Basscally Club</span></a>
  <nav class="nav-group">
    <div class="nav-label">Member</div>
    <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg> Dashboard</a>
    <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/></svg> Library</a>
    <a class="nav-item active" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/></svg> Membership</a>
  </nav>
  <nav class="nav-group">
    <div class="nav-label">Practice</div>
    <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> Latest drops</a>
    <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.9 3.6a1.65 1.65 0 0 0 1-1.51V2a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.16.45.58.75 1.06.75H21a2 2 0 0 1 0 4h-.09c-.48 0-.9.3-1.06.75Z"/></svg> Settings</a>
  </nav>
  <div class="sidebar-card">
    <div class="sidebar-card__eyebrow">Active member</div>
    <h2 class="sidebar-card__title">Your next drop lands soon.</h2>
    <p class="sidebar-card__text">Keep your membership active. The Club keeps the practice material moving.</p>
  </div>
</aside>

<main class="main">
  <div class="topbar"><div class="topbar__label">Account / Membership</div><div class="topbar__right"><span class="badge badge--success">Active</span><a class="btn btn--secondary" href="#">Sign out</a></div></div>
  <div class="content">
    <header class="page-head enter">
      <div><div class="eyebrow">// Screen 07</div><h1 class="headline">Membership, clean and under control.</h1><p class="lead">Your plan, billing, access window, and Club status in one place. No hidden routes. No support ticket needed.</p></div>
      <div class="mobile-actions"><a class="btn btn--primary" href="#billing">Manage billing</a></div>
    </header>

    <section class="grid-2">
      <article class="art-card membership-hero enter delay-1" aria-labelledby="membership-status">
        <div class="orb orb--one"></div><div class="orb orb--two"></div>
        <div>
          <span class="badge badge--brand pulse">Founding member</span>
          <h2 class="membership-hero__price" id="membership-status"><span>$1.50</span><br>/ month</h2>
          <p class="section-copy" style="max-width:560px">Locked for life while your membership stays active. Your downloads stay available while your subscription is in good standing.</p>
          <div class="membership-hero__meta"><span class="badge badge--success">Active access</span><span class="badge badge--neutral">Renewal: Jun 15, 2026</span><span class="badge badge--neutral">Member #018</span></div>
        </div>
        <div>
          <div class="mono">Monthly practice rhythm</div>
          <div class="wave" aria-hidden="true" style="margin:var(--space-5) 0"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
          <div class="meter" aria-label="Month progress"><span></span></div>
          <p class="hint" style="margin-top:var(--space-3)">7 of 10 monthly drops delivered.</p>
        </div>
      </article>

      <aside class="card plan-card enter delay-2" id="billing">
        <div style="display:flex;justify-content:space-between;gap:var(--space-4);align-items:flex-start;margin-bottom:var(--space-5)"><div><div class="mono">Billing</div><h2 class="section-title">Membership</h2></div><span class="badge badge--success">Paid</span></div>
        <div class="detail-list">
          <div class="detail-row"><strong>Plan</strong><span>Basscally Club</span></div>
          <div class="detail-row"><strong>Price</strong><span>$1.50 monthly</span></div>
          <div class="detail-row"><strong>Payment</strong><span>Visa ending 2048</span></div>
          <div class="detail-row"><strong>Next renewal</strong><span>June 15, 2026</span></div>
          <div class="detail-row"><strong>Access</strong><span>Audio play + download</span></div>
        </div>
        <div class="action-stack"><a class="btn btn--primary" href="#">Manage billing</a><a class="btn btn--secondary" href="#">Update card</a><a class="btn btn--ghost" href="#">Cancel at period end</a></div>
      </aside>
    </section>

    <section class="mini-grid enter delay-3" aria-label="Membership summary">
      <div class="card mini-card card--lift"><div class="mini-card__value">34</div><div class="mini-card__label">Downloads</div><p class="section-copy" style="margin-top:var(--space-3)">Every file issued while your access is active.</p></div>
      <div class="card mini-card card--lift"><div class="mini-card__value">10</div><div class="mini-card__label">Drops this month</div><p class="section-copy" style="margin-top:var(--space-3)">Bass-less covers, grooves, fills, and challenges.</p></div>
      <div class="card mini-card card--lift"><div class="mini-card__value">3d</div><div class="mini-card__label">Next rhythm</div><p class="section-copy" style="margin-top:var(--space-3)">A new drop lands every three days.</p></div>
    </section>

    <section class="grid-2" style="margin-top:var(--space-5)">
      <article class="card timeline enter delay-4">
        <div class="mono">Access timeline</div><h2 class="section-title" style="margin-top:var(--space-2)">What happens next</h2>
        <div class="timeline-list">
          <div class="timeline-item"><span class="timeline-dot"></span><div><div class="timeline-title">Today</div><div class="timeline-copy">Your membership is active. You can stream and download every published drop.</div></div></div>
          <div class="timeline-item"><span class="timeline-dot" style="background:var(--color-warning)"></span><div><div class="timeline-title">June 15, 2026</div><div class="timeline-copy">Your plan renews through Lemon Squeezy. Failed payments enter grace mode until the period ends.</div></div></div>
          <div class="timeline-item"><span class="timeline-dot" style="background:var(--color-text-dim)"></span><div><div class="timeline-title">If you cancel</div><div class="timeline-copy">Access stays active until your paid period ends. After that, Screen 8 handles re-subscribe.</div></div></div>
        </div>
      </article>
      <article class="card timeline enter delay-4">
        <div class="mono">Designed states</div><h2 class="section-title" style="margin-top:var(--space-2)">Membership states</h2>
        <div class="state-strip">
          <div class="state-chip"><strong>Active</strong><span>Full access</span></div>
          <div class="state-chip"><strong>Past due</strong><span>Grace banner</span></div>
          <div class="state-chip"><strong>Cancelled</strong><span>Access until period end</span></div>
        </div>
        <p class="section-copy" style="margin-top:var(--space-5)">The production page should swap the badge, banner, and primary action based on subscription status.</p>
      </article>
    </section>
  </div>
</main>
</div>
</body></html>
```

## Screen 08: Paywall Re-subscribe

Route: `/pricing or /paywall`
Reference file: `basscally-screen-8-paywall-resubscribe.html`
Purpose: Expired, no-sub, anonymous recovery

```html
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Basscally Screen 8 Paywall Resubscribe</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
    --color-bg:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
    --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
    --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
    --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,BlinkMacSystemFont,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
    --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-5:24px; --space-6:32px; --space-8:48px; --space-10:64px; --space-12:96px;
    --radius-sm:6px; --radius-md:10px; --radius-lg:14px; --radius-xl:20px; --radius-full:9999px;
    --shadow-sm:0 1px 2px rgba(0,0,0,.4); --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 56px rgba(0,0,0,.62); --shadow-brand-glow:0 0 32px rgba(255,69,0,.30);
    --motion-fast:150ms; --motion-default:250ms; --motion-slow:420ms; --ease-out:cubic-bezier(.16,1,.3,1);
  }
  *{box-sizing:border-box;margin:0;padding:0} html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;scroll-behavior:smooth} body{min-height:100vh;overflow-x:hidden;background:radial-gradient(circle at 12% -10%, rgba(255,69,0,.17), transparent 32%),radial-gradient(circle at 88% 2%, rgba(255,92,31,.06), transparent 32%),linear-gradient(135deg,#09090A 0%,#0A0A0B 55%,#070707 100%);color:var(--color-text)}
  ::selection{background:var(--color-brand);color:#fff} a{color:inherit} button,input,textarea,select{font:inherit} svg{display:block}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
  .shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
  .sidebar{position:sticky;top:0;height:100vh;padding:var(--space-5);border-right:1px solid rgba(38,38,42,.82);background:rgba(10,10,11,.76);backdrop-filter:blur(24px) saturate(140%);-webkit-backdrop-filter:blur(24px) saturate(140%);display:flex;flex-direction:column;gap:var(--space-8)}
  .brand{display:flex;align-items:center;gap:10px;text-decoration:none}.brand__mark{width:28px;height:28px;border-radius:8px;background:var(--color-brand);color:#fff;display:grid;place-items:center;font-family:var(--font-display);font-weight:800;font-size:15px;line-height:1}.brand__text{font-family:var(--font-display);font-size:17px;font-weight:700;letter-spacing:-.015em;color:var(--color-text)}
  .nav-group{display:flex;flex-direction:column;gap:var(--space-2)}.nav-label{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);margin-bottom:var(--space-2)}
  .nav-item{min-height:44px;display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);border-radius:var(--radius-lg);color:var(--color-text-muted);text-decoration:none;border:1px solid transparent;transition:all var(--motion-fast) var(--ease-out)}.nav-item svg{width:19px;height:19px;color:var(--color-text-dim);transition:color var(--motion-fast) var(--ease-out)}.nav-item:hover{color:var(--color-text);background:var(--color-surface)}.nav-item.active{color:var(--color-text);background:var(--color-surface);border-color:var(--color-border)}.nav-item.active svg{color:var(--color-brand)}
  .sidebar-card{margin-top:auto;background:linear-gradient(180deg,rgba(28,28,31,.95),rgba(20,20,22,.88));border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-5);box-shadow:var(--shadow-sm)}.sidebar-card__eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-success);margin-bottom:var(--space-2)}.sidebar-card__title{font-family:var(--font-display);font-weight:700;font-size:18px;line-height:1.1;letter-spacing:-.015em;color:var(--color-text);margin-bottom:var(--space-2)}.sidebar-card__text{font-size:13px;color:var(--color-text-muted);line-height:1.5}
  .topbar{position:sticky;top:0;z-index:30;min-height:72px;padding:0 var(--space-8);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(38,38,42,.76);background:rgba(10,10,11,.62);backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%)}.topbar__label{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.topbar__right{display:flex;align-items:center;gap:var(--space-3)}
  .mobile-top{display:none;position:sticky;top:0;z-index:40;min-height:64px;padding:0 var(--space-4);align-items:center;justify-content:space-between;border-bottom:1px solid rgba(38,38,42,.76);background:rgba(10,10,11,.82);backdrop-filter:blur(22px)}.icon-btn{min-width:44px;min-height:44px;border:1px solid var(--color-border);background:var(--color-surface);border-radius:var(--radius-lg);display:grid;place-items:center;color:var(--color-text-muted);cursor:pointer;transition:all var(--motion-fast) var(--ease-out)}.icon-btn:hover{color:var(--color-text);border-color:var(--color-border-strong);transform:translateY(-1px)}
  .main{min-width:0}.content{padding:var(--space-8);max-width:1260px;margin:0 auto}.page-head{display:flex;justify-content:space-between;gap:var(--space-8);align-items:flex-end;margin-bottom:var(--space-8)}.eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-brand);margin-bottom:var(--space-3)}.headline{font-family:var(--font-display);font-weight:800;font-size:clamp(42px,6.2vw,82px);line-height:.94;letter-spacing:-.045em;color:var(--color-text);max-width:760px}.headline .muted{color:var(--color-text-dim);font-weight:700}.lead{font-size:18px;color:var(--color-text-muted);max-width:620px;line-height:1.55;margin-top:var(--space-4)}
  .btn{font-family:var(--font-body);font-weight:600;font-size:14px;line-height:1;min-height:44px;padding:12px 18px;border-radius:var(--radius-lg);border:1px solid transparent;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;transition:all var(--motion-fast) var(--ease-out)}.btn--primary{background:var(--color-brand);color:#fff}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-1px)}.btn--primary:active{transform:scale(.98)}.btn--secondary{background:transparent;border-color:var(--color-border-strong);color:var(--color-text)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.icon-btn:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:2px solid rgba(255,69,0,.70);outline-offset:3px}
  .badge{display:inline-flex;align-items:center;gap:6px;min-height:26px;padding:4px 10px;border-radius:var(--radius-full);font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;border:1px solid transparent}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border-color:rgba(255,69,0,.18)}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border-color:rgba(52,211,153,.20)}.badge--warning{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.20)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.22)}.badge--neutral{background:rgba(255,255,255,.04);color:var(--color-text-muted);border-color:var(--color-border)}
  .card{background:linear-gradient(180deg,rgba(24,24,27,.96),rgba(16,16,18,.94));border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);position:relative;overflow:hidden}.card::before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,255,255,.04),transparent 42%);pointer-events:none;opacity:.55}.card > *{position:relative}.card--lift{transition:border-color var(--motion-default) var(--ease-out),transform var(--motion-default) var(--ease-out),box-shadow var(--motion-default) var(--ease-out)}.card--lift:hover{border-color:var(--color-border-strong);transform:translateY(-3px);box-shadow:var(--shadow-lg)}
  .grid-2{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(340px,.65fr);gap:var(--space-5)}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4)}.section-title{font-family:var(--font-display);font-size:24px;font-weight:700;letter-spacing:-.02em;color:var(--color-text);line-height:1.15}.section-copy{font-size:14px;color:var(--color-text-muted);line-height:1.55}.mono{font-family:var(--font-mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-dim)}.divider{height:1px;background:var(--color-border);width:100%}
  .field{display:flex;flex-direction:column;gap:var(--space-2)}.field label{font-size:13px;font-weight:500;color:var(--color-text-muted)}.input,.select,.textarea{width:100%;background:rgba(20,20,22,.96);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:12px 14px;color:var(--color-text);font-size:15px;outline:none;transition:border-color var(--motion-fast) var(--ease-out),box-shadow var(--motion-fast) var(--ease-out),background var(--motion-fast) var(--ease-out)}.textarea{min-height:140px;resize:vertical;line-height:1.55}.input::placeholder,.textarea::placeholder{color:var(--color-text-dim)}.input:focus,.select:focus,.textarea:focus{border-color:var(--color-brand);box-shadow:0 0 0 3px rgba(255,69,0,.15);background:var(--color-surface-raised)}.hint{font-size:12px;color:var(--color-text-dim);line-height:1.45}.error-line{font-size:12px;color:var(--color-danger);display:flex;align-items:center;gap:6px}
  .art-card{background:radial-gradient(circle at 18% 10%,rgba(255,69,0,.28),transparent 36%),linear-gradient(135deg,#241008 0%,#151517 38%,#080809 100%);border:1px solid rgba(255,69,0,.18);border-radius:var(--radius-xl);overflow:hidden;position:relative;box-shadow:0 26px 70px rgba(0,0,0,.55)}.art-card::after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:32px 32px;mask-image:radial-gradient(circle at center,black 16%,transparent 76%);opacity:.45;pointer-events:none}.orb{position:absolute;border-radius:50%;filter:blur(0);background:rgba(255,69,0,.16);border:1px solid rgba(255,69,0,.22)}.orb--one{width:180px;height:180px;right:-66px;top:-70px}.orb--two{width:96px;height:96px;left:42px;bottom:34px;background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.08)}
  .wave{display:flex;align-items:end;gap:4px;height:42px}.wave span{width:5px;border-radius:var(--radius-full);background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.20));height:12px;opacity:.85}.wave span:nth-child(2n){height:28px}.wave span:nth-child(3n){height:18px}.wave span:nth-child(5n){height:36px}
  .skeleton{position:relative;overflow:hidden;background:#18181b;border-radius:var(--radius-md);min-height:16px}.skeleton::after{content:"";position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)}
  @media (prefers-reduced-motion:no-preference){.enter{opacity:0;transform:translateY(14px);animation:rise 650ms var(--ease-out) forwards}.enter.delay-1{animation-delay:80ms}.enter.delay-2{animation-delay:160ms}.enter.delay-3{animation-delay:240ms}.enter.delay-4{animation-delay:320ms}.orb--one{animation:float 7s var(--ease-out) infinite alternate}.orb--two{animation:float 9s var(--ease-out) infinite alternate-reverse}.wave span{animation:bar 1200ms ease-in-out infinite alternate}.wave span:nth-child(2n){animation-delay:160ms}.wave span:nth-child(3n){animation-delay:300ms}.skeleton::after{animation:shimmer 1.4s infinite}.pulse{animation:pulse 2.5s var(--ease-out) infinite}@keyframes rise{to{opacity:1;transform:translateY(0)}}@keyframes float{to{transform:translate3d(14px,12px,0) scale(1.04)}}@keyframes bar{to{height:38px;opacity:1}}@keyframes shimmer{to{transform:translateX(100%)}}@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(255,69,0,.28)}100%{box-shadow:0 0 0 14px rgba(255,69,0,0)}}}
  @media (max-width:1100px){.shell{grid-template-columns:1fr}.sidebar{display:none}.mobile-top{display:flex}.topbar{display:none}.content{padding:var(--space-6) var(--space-5)}.grid-2,.grid-3{grid-template-columns:1fr}.page-head{align-items:flex-start;flex-direction:column}.headline{font-size:clamp(38px,11vw,64px)}}
  @media (max-width:640px){body{background:radial-gradient(circle at 18% -8%,rgba(255,69,0,.17),transparent 36%),var(--color-bg)}.content{padding:var(--space-5) var(--space-4) var(--space-8)}.headline{letter-spacing:-.035em}.lead{font-size:16px}.btn{width:100%}.topbar__right{width:100%}.mobile-actions{display:grid;grid-template-columns:1fr;gap:var(--space-3)}.card{border-radius:var(--radius-lg)}}


  body{background:radial-gradient(circle at 50% -18%,rgba(255,69,0,.22),transparent 34%),radial-gradient(circle at 12% 70%,rgba(255,69,0,.08),transparent 30%),#0A0A0B}.paywall-shell{min-height:100vh;display:flex;flex-direction:column}.paywall-nav{min-height:72px;padding:0 var(--space-8);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(38,38,42,.72);background:rgba(10,10,11,.62);backdrop-filter:blur(22px)}.paywall-main{flex:1;display:grid;place-items:center;padding:var(--space-8);position:relative;overflow:hidden}.paywall-main::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(circle at center,black 18%,transparent 78%);pointer-events:none}.paywall-grid{position:relative;z-index:1;width:100%;max-width:1180px;display:grid;grid-template-columns:minmax(0,1fr) 420px;gap:var(--space-8);align-items:center}.paywall-copy{max-width:680px}.paywall-title{font-family:var(--font-display);font-size:clamp(58px,9vw,124px);font-weight:900;line-height:.88;letter-spacing:-.06em;color:var(--color-text);margin:var(--space-5) 0}.paywall-title span{color:var(--color-brand);font-style:italic}.paywall-actions{display:flex;gap:var(--space-3);flex-wrap:wrap;margin-top:var(--space-8)}.locked-drop{min-height:560px;padding:var(--space-6);display:flex;flex-direction:column;justify-content:space-between;isolation:isolate}.locked-cover{height:280px;border-radius:var(--radius-lg);background:radial-gradient(circle at 25% 25%,rgba(255,69,0,.65),transparent 22%),radial-gradient(circle at 75% 70%,rgba(255,255,255,.16),transparent 20%),linear-gradient(135deg,#371207 0%,#171719 46%,#070708 100%);border:1px solid rgba(255,255,255,.08);position:relative;overflow:hidden;filter:saturate(1.12)}.locked-cover::before{content:"";position:absolute;inset:0;background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 1px,transparent 1px 14px);opacity:.35}.lock-circle{position:absolute;inset:0;margin:auto;width:96px;height:96px;border-radius:50%;background:rgba(6,6,7,.72);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(14px);display:grid;place-items:center;color:var(--color-brand);box-shadow:0 18px 42px rgba(0,0,0,.45)}.locked-meta{margin-top:var(--space-5);filter:blur(1.2px);opacity:.82}.locked-meta h2{font-family:var(--font-display);font-size:32px;font-weight:800;letter-spacing:-.03em;line-height:1;color:var(--color-text);margin:var(--space-3) 0}.blur-line{height:12px;border-radius:999px;background:rgba(255,255,255,.08);margin-top:var(--space-3)}.recovery-list{display:grid;gap:var(--space-3);margin-top:var(--space-6);max-width:560px}.recovery-row{display:grid;grid-template-columns:32px 1fr;gap:var(--space-3);align-items:start}.recovery-num{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.08em;text-transform:uppercase;padding-top:2px}.recovery-row strong{display:block;font-size:14px;color:var(--color-text)}.recovery-row span{display:block;font-size:13px;color:var(--color-text-muted);margin-top:2px}.bottom-note{position:relative;z-index:1;max-width:1180px;width:100%;margin:0 auto;padding:0 var(--space-8) var(--space-8);font-family:var(--font-mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-dim);display:flex;justify-content:space-between;gap:var(--space-5);flex-wrap:wrap}.state-preview{display:flex;gap:var(--space-2);flex-wrap:wrap}
  @media(max-width:960px){.paywall-nav{padding:0 var(--space-4)}.paywall-main{padding:var(--space-6) var(--space-4)}.paywall-grid{grid-template-columns:1fr}.locked-drop{min-height:auto}.paywall-title{font-size:clamp(52px,17vw,92px)}.bottom-note{padding:0 var(--space-4) var(--space-6)}}@media(max-width:640px){.paywall-actions{display:grid}.paywall-nav .btn--secondary{display:none}.locked-cover{height:220px}}
</style></head><body>
<div class="paywall-shell">
  <nav class="paywall-nav" aria-label="Paywall navigation"><a class="brand" href="#"><span class="brand__mark">B</span><span class="brand__text">Basscally Club</span></a><div class="topbar__right"><a class="btn btn--secondary" href="#">Sign in</a><a class="btn btn--primary" href="#checkout">Join — $1.50/month</a></div></nav>
  <main class="paywall-main">
    <section class="paywall-grid">
      <div class="paywall-copy enter">
        <div class="eyebrow">// Screen 08</div>
        <span class="badge badge--danger">Access paused</span>
        <h1 class="paywall-title">This drop is for <span>Club</span> members.</h1>
        <p class="lead">Join for $1.50/month to play and download the latest bass-less covers, grooves, fills, and challenges.</p>
        <div class="paywall-actions"><a class="btn btn--primary" href="#checkout">Join Basscally Club — $1.50/month</a><a class="btn btn--secondary" href="#login">I already paid. Sign in</a></div>
        <div class="recovery-list enter delay-2" aria-label="Recovery steps">
          <div class="recovery-row"><span class="recovery-num">01</span><div><strong>Subscribe</strong><span>Checkout opens through Lemon Squeezy.</span></div></div>
          <div class="recovery-row"><span class="recovery-num">02</span><div><strong>Open magic link</strong><span>Your account signs in without a password.</span></div></div>
          <div class="recovery-row"><span class="recovery-num">03</span><div><strong>Return to this drop</strong><span>The audio player and download button become available.</span></div></div>
        </div>
      </div>
      <article class="card locked-drop enter delay-1" aria-label="Locked practice drop preview">
        <div>
          <div class="locked-cover" role="img" aria-label="Locked cover art preview for Funk Slap Pattern in E"><div class="lock-circle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div></div>
          <div class="locked-meta"><span class="badge badge--neutral">Groove</span> <span class="badge badge--neutral">Beginner</span><h2>Funk Slap Pattern in E</h2><div class="blur-line" style="width:88%"></div><div class="blur-line" style="width:66%"></div></div>
        </div>
        <div style="margin-top:var(--space-6)"><div class="wave" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><p class="hint" style="margin-top:var(--space-3)">Preview hidden until access is active.</p></div>
      </article>
    </section>
  </main>
  <div class="bottom-note"><span>Access rule: non-member, expired, or anonymous users see this recovery screen.</span><div class="state-preview"><span class="badge badge--neutral">Anonymous</span><span class="badge badge--danger">Expired</span><span class="badge badge--warning">Past due grace routes elsewhere</span></div></div>
</div>
</body></html>
```

## Screen 09: Admin Upload Form

Route: `/admin/content/new`
Reference file: `basscally-screen-9-admin-upload-form.html`
Purpose: Audio upload and publish form

```html
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Basscally Screen 9 Admin Upload Form</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
    --color-bg:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
    --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
    --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
    --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,BlinkMacSystemFont,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
    --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-5:24px; --space-6:32px; --space-8:48px; --space-10:64px; --space-12:96px;
    --radius-sm:6px; --radius-md:10px; --radius-lg:14px; --radius-xl:20px; --radius-full:9999px;
    --shadow-sm:0 1px 2px rgba(0,0,0,.4); --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 56px rgba(0,0,0,.62); --shadow-brand-glow:0 0 32px rgba(255,69,0,.30);
    --motion-fast:150ms; --motion-default:250ms; --motion-slow:420ms; --ease-out:cubic-bezier(.16,1,.3,1);
  }
  *{box-sizing:border-box;margin:0;padding:0} html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;scroll-behavior:smooth} body{min-height:100vh;overflow-x:hidden;background:radial-gradient(circle at 12% -10%, rgba(255,69,0,.17), transparent 32%),radial-gradient(circle at 88% 2%, rgba(255,92,31,.06), transparent 32%),linear-gradient(135deg,#09090A 0%,#0A0A0B 55%,#070707 100%);color:var(--color-text)}
  ::selection{background:var(--color-brand);color:#fff} a{color:inherit} button,input,textarea,select{font:inherit} svg{display:block}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
  .shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
  .sidebar{position:sticky;top:0;height:100vh;padding:var(--space-5);border-right:1px solid rgba(38,38,42,.82);background:rgba(10,10,11,.76);backdrop-filter:blur(24px) saturate(140%);-webkit-backdrop-filter:blur(24px) saturate(140%);display:flex;flex-direction:column;gap:var(--space-8)}
  .brand{display:flex;align-items:center;gap:10px;text-decoration:none}.brand__mark{width:28px;height:28px;border-radius:8px;background:var(--color-brand);color:#fff;display:grid;place-items:center;font-family:var(--font-display);font-weight:800;font-size:15px;line-height:1}.brand__text{font-family:var(--font-display);font-size:17px;font-weight:700;letter-spacing:-.015em;color:var(--color-text)}
  .nav-group{display:flex;flex-direction:column;gap:var(--space-2)}.nav-label{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);margin-bottom:var(--space-2)}
  .nav-item{min-height:44px;display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);border-radius:var(--radius-lg);color:var(--color-text-muted);text-decoration:none;border:1px solid transparent;transition:all var(--motion-fast) var(--ease-out)}.nav-item svg{width:19px;height:19px;color:var(--color-text-dim);transition:color var(--motion-fast) var(--ease-out)}.nav-item:hover{color:var(--color-text);background:var(--color-surface)}.nav-item.active{color:var(--color-text);background:var(--color-surface);border-color:var(--color-border)}.nav-item.active svg{color:var(--color-brand)}
  .sidebar-card{margin-top:auto;background:linear-gradient(180deg,rgba(28,28,31,.95),rgba(20,20,22,.88));border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-5);box-shadow:var(--shadow-sm)}.sidebar-card__eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-success);margin-bottom:var(--space-2)}.sidebar-card__title{font-family:var(--font-display);font-weight:700;font-size:18px;line-height:1.1;letter-spacing:-.015em;color:var(--color-text);margin-bottom:var(--space-2)}.sidebar-card__text{font-size:13px;color:var(--color-text-muted);line-height:1.5}
  .topbar{position:sticky;top:0;z-index:30;min-height:72px;padding:0 var(--space-8);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(38,38,42,.76);background:rgba(10,10,11,.62);backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%)}.topbar__label{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.topbar__right{display:flex;align-items:center;gap:var(--space-3)}
  .mobile-top{display:none;position:sticky;top:0;z-index:40;min-height:64px;padding:0 var(--space-4);align-items:center;justify-content:space-between;border-bottom:1px solid rgba(38,38,42,.76);background:rgba(10,10,11,.82);backdrop-filter:blur(22px)}.icon-btn{min-width:44px;min-height:44px;border:1px solid var(--color-border);background:var(--color-surface);border-radius:var(--radius-lg);display:grid;place-items:center;color:var(--color-text-muted);cursor:pointer;transition:all var(--motion-fast) var(--ease-out)}.icon-btn:hover{color:var(--color-text);border-color:var(--color-border-strong);transform:translateY(-1px)}
  .main{min-width:0}.content{padding:var(--space-8);max-width:1260px;margin:0 auto}.page-head{display:flex;justify-content:space-between;gap:var(--space-8);align-items:flex-end;margin-bottom:var(--space-8)}.eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-brand);margin-bottom:var(--space-3)}.headline{font-family:var(--font-display);font-weight:800;font-size:clamp(42px,6.2vw,82px);line-height:.94;letter-spacing:-.045em;color:var(--color-text);max-width:760px}.headline .muted{color:var(--color-text-dim);font-weight:700}.lead{font-size:18px;color:var(--color-text-muted);max-width:620px;line-height:1.55;margin-top:var(--space-4)}
  .btn{font-family:var(--font-body);font-weight:600;font-size:14px;line-height:1;min-height:44px;padding:12px 18px;border-radius:var(--radius-lg);border:1px solid transparent;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;transition:all var(--motion-fast) var(--ease-out)}.btn--primary{background:var(--color-brand);color:#fff}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-1px)}.btn--primary:active{transform:scale(.98)}.btn--secondary{background:transparent;border-color:var(--color-border-strong);color:var(--color-text)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.icon-btn:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:2px solid rgba(255,69,0,.70);outline-offset:3px}
  .badge{display:inline-flex;align-items:center;gap:6px;min-height:26px;padding:4px 10px;border-radius:var(--radius-full);font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;border:1px solid transparent}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border-color:rgba(255,69,0,.18)}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border-color:rgba(52,211,153,.20)}.badge--warning{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.20)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.22)}.badge--neutral{background:rgba(255,255,255,.04);color:var(--color-text-muted);border-color:var(--color-border)}
  .card{background:linear-gradient(180deg,rgba(24,24,27,.96),rgba(16,16,18,.94));border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);position:relative;overflow:hidden}.card::before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,255,255,.04),transparent 42%);pointer-events:none;opacity:.55}.card > *{position:relative}.card--lift{transition:border-color var(--motion-default) var(--ease-out),transform var(--motion-default) var(--ease-out),box-shadow var(--motion-default) var(--ease-out)}.card--lift:hover{border-color:var(--color-border-strong);transform:translateY(-3px);box-shadow:var(--shadow-lg)}
  .grid-2{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(340px,.65fr);gap:var(--space-5)}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4)}.section-title{font-family:var(--font-display);font-size:24px;font-weight:700;letter-spacing:-.02em;color:var(--color-text);line-height:1.15}.section-copy{font-size:14px;color:var(--color-text-muted);line-height:1.55}.mono{font-family:var(--font-mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-dim)}.divider{height:1px;background:var(--color-border);width:100%}
  .field{display:flex;flex-direction:column;gap:var(--space-2)}.field label{font-size:13px;font-weight:500;color:var(--color-text-muted)}.input,.select,.textarea{width:100%;background:rgba(20,20,22,.96);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:12px 14px;color:var(--color-text);font-size:15px;outline:none;transition:border-color var(--motion-fast) var(--ease-out),box-shadow var(--motion-fast) var(--ease-out),background var(--motion-fast) var(--ease-out)}.textarea{min-height:140px;resize:vertical;line-height:1.55}.input::placeholder,.textarea::placeholder{color:var(--color-text-dim)}.input:focus,.select:focus,.textarea:focus{border-color:var(--color-brand);box-shadow:0 0 0 3px rgba(255,69,0,.15);background:var(--color-surface-raised)}.hint{font-size:12px;color:var(--color-text-dim);line-height:1.45}.error-line{font-size:12px;color:var(--color-danger);display:flex;align-items:center;gap:6px}
  .art-card{background:radial-gradient(circle at 18% 10%,rgba(255,69,0,.28),transparent 36%),linear-gradient(135deg,#241008 0%,#151517 38%,#080809 100%);border:1px solid rgba(255,69,0,.18);border-radius:var(--radius-xl);overflow:hidden;position:relative;box-shadow:0 26px 70px rgba(0,0,0,.55)}.art-card::after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:32px 32px;mask-image:radial-gradient(circle at center,black 16%,transparent 76%);opacity:.45;pointer-events:none}.orb{position:absolute;border-radius:50%;filter:blur(0);background:rgba(255,69,0,.16);border:1px solid rgba(255,69,0,.22)}.orb--one{width:180px;height:180px;right:-66px;top:-70px}.orb--two{width:96px;height:96px;left:42px;bottom:34px;background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.08)}
  .wave{display:flex;align-items:end;gap:4px;height:42px}.wave span{width:5px;border-radius:var(--radius-full);background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.20));height:12px;opacity:.85}.wave span:nth-child(2n){height:28px}.wave span:nth-child(3n){height:18px}.wave span:nth-child(5n){height:36px}
  .skeleton{position:relative;overflow:hidden;background:#18181b;border-radius:var(--radius-md);min-height:16px}.skeleton::after{content:"";position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)}
  @media (prefers-reduced-motion:no-preference){.enter{opacity:0;transform:translateY(14px);animation:rise 650ms var(--ease-out) forwards}.enter.delay-1{animation-delay:80ms}.enter.delay-2{animation-delay:160ms}.enter.delay-3{animation-delay:240ms}.enter.delay-4{animation-delay:320ms}.orb--one{animation:float 7s var(--ease-out) infinite alternate}.orb--two{animation:float 9s var(--ease-out) infinite alternate-reverse}.wave span{animation:bar 1200ms ease-in-out infinite alternate}.wave span:nth-child(2n){animation-delay:160ms}.wave span:nth-child(3n){animation-delay:300ms}.skeleton::after{animation:shimmer 1.4s infinite}.pulse{animation:pulse 2.5s var(--ease-out) infinite}@keyframes rise{to{opacity:1;transform:translateY(0)}}@keyframes float{to{transform:translate3d(14px,12px,0) scale(1.04)}}@keyframes bar{to{height:38px;opacity:1}}@keyframes shimmer{to{transform:translateX(100%)}}@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(255,69,0,.28)}100%{box-shadow:0 0 0 14px rgba(255,69,0,0)}}}
  @media (max-width:1100px){.shell{grid-template-columns:1fr}.sidebar{display:none}.mobile-top{display:flex}.topbar{display:none}.content{padding:var(--space-6) var(--space-5)}.grid-2,.grid-3{grid-template-columns:1fr}.page-head{align-items:flex-start;flex-direction:column}.headline{font-size:clamp(38px,11vw,64px)}}
  @media (max-width:640px){body{background:radial-gradient(circle at 18% -8%,rgba(255,69,0,.17),transparent 36%),var(--color-bg)}.content{padding:var(--space-5) var(--space-4) var(--space-8)}.headline{letter-spacing:-.035em}.lead{font-size:16px}.btn{width:100%}.topbar__right{width:100%}.mobile-actions{display:grid;grid-template-columns:1fr;gap:var(--space-3)}.card{border-radius:var(--radius-lg)}}


  .admin-head{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:var(--space-5);align-items:end;margin-bottom:var(--space-8)}.admin-kpis{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-3)}.kpi{padding:var(--space-4);border-radius:var(--radius-lg);background:rgba(20,20,22,.80);border:1px solid var(--color-border)}.kpi strong{display:block;font-family:var(--font-display);font-size:28px;line-height:1;color:var(--color-text);letter-spacing:-.03em}.kpi span{display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-dim);margin-top:var(--space-2)}.upload-layout{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(340px,.8fr);gap:var(--space-5);align-items:start}.form-card{padding:var(--space-6)}.form-section{display:grid;gap:var(--space-4);padding:var(--space-6) 0;border-bottom:1px solid var(--color-border)}.form-section:first-child{padding-top:0}.form-section:last-child{border-bottom:0;padding-bottom:0}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)}.dropzone{min-height:188px;border:1px dashed var(--color-border-strong);background:radial-gradient(circle at 30% 0,rgba(255,69,0,.09),transparent 36%),rgba(6,6,7,.38);border-radius:var(--radius-lg);display:grid;place-items:center;text-align:center;padding:var(--space-6);transition:all var(--motion-default) var(--ease-out);position:relative;overflow:hidden}.dropzone:hover{border-color:rgba(255,69,0,.55);background:radial-gradient(circle at 30% 0,rgba(255,69,0,.14),transparent 36%),rgba(20,20,22,.74);transform:translateY(-2px)}.dropzone-icon{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;margin:0 auto var(--space-4);background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.18)}.radio-row{display:flex;gap:var(--space-3);flex-wrap:wrap}.radio-card{flex:1;min-width:140px;min-height:88px;padding:var(--space-4);border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.78);cursor:pointer;transition:all var(--motion-fast) var(--ease-out)}.radio-card:hover,.radio-card.active{border-color:rgba(255,69,0,.55);background:rgba(42,20,8,.50)}.radio-card strong{display:block;font-size:14px;color:var(--color-text)}.radio-card span{display:block;font-size:12px;color:var(--color-text-dim);margin-top:2px}.preview-card{position:sticky;top:96px}.preview-top{padding:var(--space-6);border-bottom:1px solid var(--color-border)}.preview-cover{height:220px;border-radius:var(--radius-lg);background:radial-gradient(circle at 20% 20%,rgba(255,69,0,.55),transparent 24%),linear-gradient(135deg,#2b1209 0%,#17171a 48%,#080809 100%);border:1px solid rgba(255,255,255,.08);position:relative;overflow:hidden;margin-bottom:var(--space-5)}.preview-cover::after{content:"New drop";position:absolute;left:var(--space-5);bottom:var(--space-5);font-family:var(--font-display);font-size:34px;font-weight:900;line-height:.9;letter-spacing:-.04em;color:var(--color-text);max-width:170px}.preview-body{padding:var(--space-6);display:grid;gap:var(--space-5)}.checklist{display:grid;gap:var(--space-3)}.check-item{display:grid;grid-template-columns:24px 1fr;gap:var(--space-3);align-items:start}.check-dot{width:18px;height:18px;border-radius:50%;display:grid;place-items:center;background:rgba(52,211,153,.12);color:var(--color-success);margin-top:2px}.check-item strong{display:block;font-size:13px;color:var(--color-text)}.check-item span{display:block;font-size:12px;color:var(--color-text-dim)}.admin-actions{display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-3);padding-top:var(--space-6);border-top:1px solid var(--color-border)}.state-box{margin-top:var(--space-5);padding:var(--space-4);border-radius:var(--radius-lg);background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.20)}
  @media(max-width:1080px){.admin-head,.upload-layout{grid-template-columns:1fr}.preview-card{position:relative;top:auto}.admin-actions{grid-template-columns:1fr}.form-grid{grid-template-columns:1fr}}
</style></head><body>

<div class="mobile-top">
  <a class="brand" href="#"><span class="brand__mark">B</span><span class="brand__text">Basscally Admin</span></a>
  <button class="icon-btn" aria-label="Open menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
</div>

<div class="shell">

<aside class="sidebar" aria-label="Admin navigation">
  <a class="brand" href="#"><span class="brand__mark">B</span><span class="brand__text">Basscally Admin</span></a>
  <nav class="nav-group">
    <div class="nav-label">Admin</div>
    <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg> Metrics</a>
    <a class="nav-item active" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg> Upload drop</a>
    <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/></svg> Content</a>
    <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/></svg> Subscribers</a>
  </nav>
  <div class="sidebar-card">
    <div class="sidebar-card__eyebrow">Publish rule</div>
    <h2 class="sidebar-card__title">One clean drop.</h2>
    <p class="sidebar-card__text">Upload audio, write the email, preview, then publish or schedule.</p>
  </div>
</aside>

<main class="main">
  <div class="topbar"><div class="topbar__label">Admin / Upload form</div><div class="topbar__right"><span class="badge badge--warning">Draft</span><a class="btn btn--secondary" href="#">Content list</a></div></div>
  <div class="content">
    <header class="admin-head enter">
      <div><div class="eyebrow">// Screen 09</div><h1 class="headline">Upload one drop. Publish with confidence.</h1><p class="lead">Audio, metadata, release timing, and notification email stay on one calm admin surface.</p></div>
      <div class="admin-kpis"><div class="kpi"><strong>14</strong><span>Days buffer</span></div><div class="kpi"><strong>500</strong><span>Founding cap</span></div><div class="kpi"><strong>10</strong><span>Drops / month</span></div><div class="kpi"><strong>5m</strong><span>Email target</span></div></div>
    </header>

    <section class="upload-layout">
      <form class="card form-card enter delay-1" aria-label="New content upload form">
        <div class="form-section">
          <div><div class="mono">Audio file</div><h2 class="section-title" style="margin-top:var(--space-2)">Drop source</h2></div>
          <div class="dropzone" tabindex="0" role="button" aria-label="Upload audio file">
            <div><div class="dropzone-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg></div><h3 class="section-title" style="font-size:20px">Drop audio here</h3><p class="section-copy">MP3 or WAV. Max 50MB. Private storage. Signed downloads only.</p></div>
          </div>
          <div class="skeleton" style="width:68%;height:10px"></div>
        </div>
        <div class="form-section">
          <div><div class="mono">Metadata</div><h2 class="section-title" style="margin-top:var(--space-2)">What members see</h2></div>
          <div class="field"><label for="title">Title</label><input class="input" id="title" value="Funk Slap Pattern in E" maxlength="80"></div>
          <div class="form-grid"><div class="field"><label for="type">Content type</label><select class="select" id="type"><option>Groove</option><option>Bass-less track</option><option>Fill</option><option>Challenge</option></select></div><div class="field"><label for="difficulty">Difficulty</label><select class="select" id="difficulty"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div></div>
          <div class="field"><label for="description">Description</label><textarea class="textarea" id="description">Tight one-bar groove for practicing right-hand control, timing, and pocket.</textarea><div class="hint">Keep it under 500 characters.</div></div>
          <div class="form-grid"><div class="field"><label for="cover">Cover image</label><input class="input" id="cover" placeholder="Optional image URL or upload"></div><div class="field"><label for="release">Release date</label><input class="input" id="release" type="datetime-local" value="2026-05-18T10:00"></div></div>
        </div>
        <div class="form-section">
          <div><div class="mono">Publish status</div><h2 class="section-title" style="margin-top:var(--space-2)">Choose the action</h2></div>
          <div class="radio-row" role="radiogroup" aria-label="Publish status">
            <div class="radio-card"><strong>Draft</strong><span>Save without sending</span></div>
            <div class="radio-card"><strong>Scheduled</strong><span>Publish later</span></div>
            <div class="radio-card active"><strong>Publish now</strong><span>Queue member email</span></div>
          </div>
        </div>
        <div class="form-section">
          <div><div class="mono">Email notification</div><h2 class="section-title" style="margin-top:var(--space-2)">Tell members clearly</h2></div>
          <div class="field"><label for="subject">Email subject</label><input class="input" id="subject" value="[New Groove] Funk Slap Pattern in E"></div>
          <div class="field"><label for="emailBody">Email body</label><textarea class="textarea" id="emailBody">New practice drop just landed in the Club. Open the dashboard, play the groove, download the audio, and lock into the pocket.</textarea></div>
          <div class="state-box"><div class="error-line"><span>!</span><span>Error state example: email subject is required before publishing.</span></div></div>
        </div>
        <div class="admin-actions"><button class="btn btn--secondary" type="button">Save draft</button><button class="btn btn--secondary" type="button">Preview email</button><button class="btn btn--primary" type="button">Publish now</button></div>
      </form>

      <aside class="card preview-card enter delay-2" aria-label="Drop preview and publish checklist">
        <div class="preview-top"><div class="preview-cover" role="img" aria-label="Generated typographic cover art for Funk Slap Pattern in E"></div><div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-3)"><span class="badge badge--brand">Groove</span><span class="badge badge--success">Beginner</span><span class="badge badge--neutral">2 min</span></div><h2 class="section-title">Funk Slap Pattern in E</h2><p class="section-copy" style="margin-top:var(--space-3)">Tight one-bar groove for practicing right-hand control, timing, and pocket.</p></div>
        <div class="preview-body">
          <div><div class="mono">Email preview</div><p class="section-copy" style="margin-top:var(--space-3)">Subject: [New Groove] Funk Slap Pattern in E</p></div>
          <div class="divider"></div>
          <div><div class="mono">Publish checklist</div><div class="checklist" style="margin-top:var(--space-4)">
            <div class="check-item"><span class="check-dot">✓</span><div><strong>Audio attached</strong><span>Private storage key ready.</span></div></div>
            <div class="check-item"><span class="check-dot">✓</span><div><strong>Metadata complete</strong><span>Title, type, difficulty, and description set.</span></div></div>
            <div class="check-item"><span class="check-dot">✓</span><div><strong>Email ready</strong><span>Queue will target active subscribers.</span></div></div>
          </div></div>
          <div class="wave" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
        </div>
      </aside>
    </section>
  </div>
</main>
</div>
<script>
  document.querySelectorAll('.radio-card').forEach(card => card.addEventListener('click', () => {
    document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  }));
</script>
</body></html>
```

## Screen 10: Admin Metrics

Route: `/admin`
Reference file: `basscally-screen-10-admin-metrics-dashboard.html`
Purpose: MRR, subscribers, failed payments, content health

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Basscally Screen 10 Admin Metrics Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --color-brand:#FF4500;
    --color-brand-hover:#FF5C1F;
    --color-brand-muted:#2A1408;
    --color-bg:#0A0A0B;
    --color-surface:#141416;
    --color-surface-raised:#1C1C1F;
    --color-surface-sunken:#060607;
    --color-border:#26262A;
    --color-border-strong:#3A3A40;
    --color-text:#F5F5F7;
    --color-text-muted:#A1A1A8;
    --color-text-dim:#6B6B72;
    --color-success:#34D399;
    --color-warning:#FBBF24;
    --color-danger:#F87171;
    --color-info:#60A5FA;
    --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif;
    --font-body:"Geist","Inter",-apple-system,BlinkMacSystemFont,sans-serif;
    --font-mono:"Geist Mono","JetBrains Mono",monospace;
    --space-1:4px;
    --space-2:8px;
    --space-3:12px;
    --space-4:16px;
    --space-5:24px;
    --space-6:32px;
    --space-8:48px;
    --space-10:64px;
    --space-12:96px;
    --radius-sm:6px;
    --radius-md:10px;
    --radius-lg:14px;
    --radius-xl:20px;
    --radius-full:9999px;
    --shadow-sm:0 1px 2px rgba(0,0,0,.4);
    --shadow-md:0 4px 12px rgba(0,0,0,.5);
    --shadow-lg:0 18px 56px rgba(0,0,0,.62);
    --shadow-brand-glow:0 0 32px rgba(255,69,0,.30);
    --motion-fast:150ms;
    --motion-default:250ms;
    --motion-slow:420ms;
    --ease-out:cubic-bezier(.16,1,.3,1);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
  body{min-height:100vh;overflow-x:hidden;color:var(--color-text);background:radial-gradient(circle at 12% -10%,rgba(255,69,0,.18),transparent 30%),radial-gradient(circle at 78% 0%,rgba(255,92,31,.07),transparent 34%),linear-gradient(135deg,#09090A 0%,#0A0A0B 55%,#060607 100%)}
  body::before{content:"";position:fixed;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at 50% 8%,black 20%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse at 50% 8%,black 20%,transparent 70%)}
  ::selection{background:var(--color-brand);color:#fff}
  a{color:inherit} button,input{font:inherit} svg{display:block}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}

  .shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
  .sidebar{position:sticky;top:0;height:100vh;padding:var(--space-5);border-right:1px solid rgba(38,38,42,.82);background:rgba(10,10,11,.76);backdrop-filter:blur(24px) saturate(140%);-webkit-backdrop-filter:blur(24px) saturate(140%);display:flex;flex-direction:column;gap:var(--space-8)}
  .brand{display:flex;align-items:center;gap:10px;text-decoration:none}.brand__mark{width:28px;height:28px;border-radius:8px;background:var(--color-brand);color:#fff;display:grid;place-items:center;font-family:var(--font-display);font-weight:800;font-size:15px;line-height:1}.brand__text{font-family:var(--font-display);font-size:17px;font-weight:700;letter-spacing:-.015em;color:var(--color-text)}
  .nav-group{display:flex;flex-direction:column;gap:var(--space-2)}.nav-label{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);margin-bottom:var(--space-2)}
  .nav-item{min-height:44px;display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);border-radius:var(--radius-lg);color:var(--color-text-muted);text-decoration:none;border:1px solid transparent;transition:all var(--motion-fast) var(--ease-out)}.nav-item svg{width:19px;height:19px;color:var(--color-text-dim);transition:color var(--motion-fast) var(--ease-out)}.nav-item:hover{color:var(--color-text);background:var(--color-surface)}.nav-item.active{color:var(--color-text);background:var(--color-surface);border-color:var(--color-border)}.nav-item.active svg{color:var(--color-brand)}
  .sidebar-card{margin-top:auto;background:linear-gradient(180deg,rgba(28,28,31,.95),rgba(20,20,22,.88));border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-5);box-shadow:var(--shadow-sm)}.sidebar-card__eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-success);margin-bottom:var(--space-2)}.sidebar-card__title{font-family:var(--font-display);font-weight:700;font-size:18px;line-height:1.1;letter-spacing:-.015em;color:var(--color-text);margin-bottom:var(--space-2)}.sidebar-card__text{font-size:13px;color:var(--color-text-muted);line-height:1.5}
  .mobile-top{display:none;position:sticky;top:0;z-index:40;min-height:64px;padding:0 var(--space-4);align-items:center;justify-content:space-between;border-bottom:1px solid rgba(38,38,42,.76);background:rgba(10,10,11,.82);backdrop-filter:blur(22px)}.icon-btn{min-width:44px;min-height:44px;border:1px solid var(--color-border);background:var(--color-surface);border-radius:var(--radius-lg);display:grid;place-items:center;color:var(--color-text-muted);cursor:pointer;transition:all var(--motion-fast) var(--ease-out)}.icon-btn:hover{color:var(--color-text);border-color:var(--color-border-strong);transform:translateY(-1px)}
  .main{min-width:0}.topbar{position:sticky;top:0;z-index:30;min-height:72px;padding:0 var(--space-8);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(38,38,42,.76);background:rgba(10,10,11,.62);backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%)}.topbar__label{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.topbar__right{display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap}.content{padding:var(--space-8);max-width:1280px;margin:0 auto}
  .btn{font-family:var(--font-body);font-weight:600;font-size:14px;line-height:1;min-height:44px;padding:12px 18px;border-radius:var(--radius-lg);border:1px solid transparent;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;transition:all var(--motion-fast) var(--ease-out)}.btn--primary{background:var(--color-brand);color:#fff}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-1px)}.btn--primary:active{transform:scale(.98)}.btn--secondary{background:transparent;border-color:var(--color-border-strong);color:var(--color-text)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.icon-btn:focus-visible,input:focus-visible{outline:2px solid rgba(255,69,0,.70);outline-offset:3px}
  .badge{display:inline-flex;align-items:center;gap:6px;min-height:26px;padding:4px 10px;border-radius:var(--radius-full);font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;border:1px solid transparent}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border-color:rgba(255,69,0,.18)}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border-color:rgba(52,211,153,.20)}.badge--warning{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.20)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.22)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border-color:rgba(96,165,250,.20)}.badge--neutral{background:rgba(255,255,255,.04);color:var(--color-text-muted);border-color:var(--color-border)}
  .card{background:linear-gradient(180deg,rgba(24,24,27,.96),rgba(16,16,18,.94));border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);position:relative;overflow:hidden}.card::before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,255,255,.045),transparent 44%);pointer-events:none;opacity:.62}.card>*{position:relative}.card--lift{transition:border-color var(--motion-default) var(--ease-out),transform var(--motion-default) var(--ease-out),box-shadow var(--motion-default) var(--ease-out)}.card--lift:hover{border-color:var(--color-border-strong);transform:translateY(-3px);box-shadow:var(--shadow-lg)}
  .eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-brand);margin-bottom:var(--space-3)}.headline{font-family:var(--font-display);font-weight:800;font-size:clamp(42px,6.2vw,82px);line-height:.94;letter-spacing:-.045em;color:var(--color-text);max-width:740px}.lead{font-size:18px;color:var(--color-text-muted);max-width:620px;line-height:1.55;margin-top:var(--space-4)}.mono{font-family:var(--font-mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-dim)}.section-title{font-family:var(--font-display);font-size:24px;font-weight:700;letter-spacing:-.02em;color:var(--color-text);line-height:1.15}.section-copy{font-size:14px;color:var(--color-text-muted);line-height:1.55}.divider{height:1px;background:var(--color-border);width:100%}

  .page-head{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:var(--space-6);align-items:end;margin-bottom:var(--space-8)}
  .signal-card{padding:var(--space-5);min-height:180px;display:flex;flex-direction:column;justify-content:space-between;background:radial-gradient(circle at 82% 6%,rgba(255,69,0,.16),transparent 42%),linear-gradient(180deg,rgba(24,24,27,.98),rgba(14,14,16,.94))}.signal-card__top{display:flex;justify-content:space-between;gap:var(--space-4);align-items:flex-start}.signal-card__value{font-family:var(--font-display);font-size:44px;font-weight:800;letter-spacing:-.035em;line-height:1;color:var(--color-text);margin-top:var(--space-5)}.signal-card__value span{color:var(--color-brand)}.signal-card__text{font-size:13px;color:var(--color-text-muted);line-height:1.5;margin-top:var(--space-3)}
  .meter{height:8px;border-radius:var(--radius-full);overflow:hidden;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.05);display:flex}.meter span{display:block;height:100%;background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.25)}
  .metrics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-4);margin-bottom:var(--space-5)}.metric-card{padding:var(--space-5);min-height:188px;display:flex;flex-direction:column;justify-content:space-between}.metric-card__top{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-3)}.metric-card__label{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.metric-card__value{font-family:var(--font-display);font-weight:800;font-size:clamp(32px,4.2vw,54px);letter-spacing:-.04em;line-height:1;color:var(--color-text);margin:var(--space-4) 0 var(--space-2)}.metric-card__delta{font-family:var(--font-mono);font-size:11px;color:var(--color-success);letter-spacing:.03em}.metric-card__delta.danger{color:var(--color-danger)}.spark{height:42px;display:grid;grid-template-columns:repeat(12,1fr);gap:4px;align-items:end;margin-top:var(--space-5)}.spark span{display:block;height:var(--h);border-radius:3px 3px 0 0;background:rgba(255,255,255,.08);transition:height var(--motion-slow) var(--ease-out),background var(--motion-fast) var(--ease-out)}.spark span.hot{background:var(--color-brand);box-shadow:0 0 16px rgba(255,69,0,.18)}.spark span.bad{background:var(--color-danger)}.metric-card:hover .spark span{filter:brightness(1.12)}
  .dashboard-grid{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(340px,.55fr);gap:var(--space-5)}.panel{padding:var(--space-6)}.panel-head{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-4);margin-bottom:var(--space-5)}.panel-actions{display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap}.input-wrap{position:relative;min-width:260px}.input-wrap svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);width:18px;height:18px;color:var(--color-text-dim)}.search{min-height:44px;width:100%;padding:12px 14px 12px 40px;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.92);color:var(--color-text);outline:none}.search::placeholder{color:var(--color-text-dim)}.search:focus{border-color:var(--color-brand);box-shadow:0 0 0 3px rgba(255,69,0,.15)}
  .table-wrap{overflow-x:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.28)}table{width:100%;border-collapse:collapse;min-width:820px}th{font-family:var(--font-mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-dim);font-weight:500;text-align:left;padding:var(--space-4)}td{font-size:14px;color:var(--color-text-muted);padding:var(--space-4);border-top:1px solid var(--color-border);vertical-align:middle}td strong{color:var(--color-text);font-weight:600}.row-actions{display:flex;gap:var(--space-2)}.mini-btn{min-height:36px;border:1px solid var(--color-border);background:rgba(255,255,255,.02);color:var(--color-text-muted);border-radius:var(--radius-md);padding:8px 10px;cursor:pointer;transition:all var(--motion-fast) var(--ease-out)}.mini-btn:hover{color:var(--color-text);background:var(--color-surface-raised);border-color:var(--color-border-strong)}
  .next-drop{display:grid;grid-template-columns:1fr auto;gap:var(--space-5);align-items:center;padding:var(--space-5);margin-bottom:var(--space-5);background:radial-gradient(circle at 100% 0%,rgba(255,69,0,.10),transparent 45%),linear-gradient(180deg,rgba(24,24,27,.98),rgba(14,14,16,.96))}.countdown{font-family:var(--font-mono);font-size:clamp(22px,3.2vw,34px);letter-spacing:.09em;color:var(--color-text);white-space:nowrap}.side-stack{display:grid;gap:var(--space-5)}.list{display:grid;gap:var(--space-3);margin-top:var(--space-4)}.list-item{display:grid;grid-template-columns:44px 1fr auto;gap:var(--space-3);align-items:center;padding:var(--space-3);border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(255,255,255,.02)}.list-icon{width:44px;height:44px;border-radius:var(--radius-md);display:grid;place-items:center;color:var(--color-text-muted);background:var(--color-surface)}.list-body strong{display:block;color:var(--color-text);font-size:14px;line-height:1.25}.list-body span{display:block;color:var(--color-text-dim);font-family:var(--font-mono);font-size:11px;letter-spacing:.04em;text-transform:uppercase;margin-top:4px}.alert{border-color:rgba(248,113,113,.22);background:rgba(248,113,113,.06)}.alert .list-icon{background:rgba(248,113,113,.12);color:var(--color-danger)}
  .content-mix{padding:var(--space-5)}.mix-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-3);margin-top:var(--space-4)}.mix-item{padding:var(--space-4);border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(255,255,255,.025)}.mix-item strong{font-family:var(--font-display);font-size:28px;line-height:1;color:var(--color-text);letter-spacing:-.02em}.mix-item span{display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-dim);margin-top:var(--space-2)}
  .state-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4);margin-top:var(--space-5)}.state-card{padding:var(--space-5);min-height:150px}.skeleton{display:block;height:12px;border-radius:var(--radius-full);background:linear-gradient(90deg,rgba(255,255,255,.04),rgba(255,255,255,.11),rgba(255,255,255,.04));background-size:220% 100%;animation:shimmer 1.4s linear infinite}.empty-icon{width:46px;height:46px;border-radius:var(--radius-md);display:grid;place-items:center;background:var(--color-brand-muted);color:var(--color-brand);margin-bottom:var(--space-4)}.error-line{display:flex;align-items:center;gap:var(--space-3);color:var(--color-danger);font-size:13px}.error-dot{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:rgba(248,113,113,.13);color:var(--color-danger);font-family:var(--font-mono)}
  .enter{opacity:0;transform:translateY(18px);animation:rise .72s var(--ease-out) forwards}.delay-1{animation-delay:.08s}.delay-2{animation-delay:.16s}.delay-3{animation-delay:.24s}.delay-4{animation-delay:.32s}@keyframes rise{to{opacity:1;transform:translateY(0)}}@keyframes shimmer{to{background-position:-220% 0}}
  @media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.enter{opacity:1;transform:none}}
  @media(max-width:1180px){.metrics-grid{grid-template-columns:repeat(2,1fr)}.dashboard-grid,.page-head{grid-template-columns:1fr}.signal-card{max-width:none}.mix-grid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:900px){.shell{display:block}.sidebar{display:none}.mobile-top{display:flex}.topbar{top:64px;padding:0 var(--space-4);align-items:flex-start;flex-direction:column;justify-content:center;gap:var(--space-2);min-height:88px}.content{padding:var(--space-5)}.metrics-grid,.state-row{grid-template-columns:1fr}.dashboard-grid{grid-template-columns:1fr}.panel-head{flex-direction:column}.input-wrap{width:100%;min-width:0}.next-drop{grid-template-columns:1fr}.countdown{font-size:24px}.headline{font-size:clamp(44px,12vw,58px)}.lead{font-size:16px}.topbar__right .btn--secondary{display:none}}
  @media(max-width:540px){.content{padding:var(--space-4)}.page-head{gap:var(--space-5);margin-bottom:var(--space-5)}.metric-card{min-height:170px}.metric-card__value{font-size:42px}.panel{padding:var(--space-5)}.mix-grid{grid-template-columns:1fr}.list-item{grid-template-columns:40px 1fr}.list-item .badge{grid-column:2}.topbar__right{width:100%;justify-content:space-between}.btn--primary{width:100%}}
</style>
</head>
<body>
<div class="mobile-top">
  <a class="brand" href="#"><span class="brand__mark">B</span><span class="brand__text">Basscally Admin</span></a>
  <button class="icon-btn" aria-label="Open menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
</div>

<div class="shell">
  <aside class="sidebar" aria-label="Admin navigation">
    <a class="brand" href="#"><span class="brand__mark">B</span><span class="brand__text">Basscally Admin</span></a>
    <nav class="nav-group">
      <div class="nav-label">Admin</div>
      <a class="nav-item active" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg> Metrics</a>
      <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg> Upload drop</a>
      <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/></svg> Content</a>
      <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/></svg> Subscribers</a>
    </nav>
    <div class="sidebar-card">
      <div class="sidebar-card__eyebrow">Admin pulse</div>
      <h2 class="sidebar-card__title">Keep the Club healthy.</h2>
      <p class="sidebar-card__text">Watch subscribers, payments, drops, and email delivery before issues reach members.</p>
    </div>
  </aside>

  <main class="main">
    <div class="topbar">
      <div class="topbar__label">Admin / Metrics dashboard</div>
      <div class="topbar__right"><span class="badge badge--success">Live</span><a class="btn btn--secondary" href="#">Export CSV</a><a class="btn btn--primary" href="#">New drop</a></div>
    </div>

    <div class="content">
      <header class="page-head enter">
        <div>
          <div class="eyebrow">// Screen 10</div>
          <h1 class="headline">Club metrics, without the noise.</h1>
          <p class="lead">A calm admin pulse for subscribers, MRR, drops, payments, and email delivery. One screen before you publish or fix anything.</p>
        </div>
        <aside class="card signal-card card--lift" aria-label="Launch health signal">
          <div class="signal-card__top"><span class="mono">Launch health</span><span class="badge badge--success">Stable</span></div>
          <div>
            <div class="signal-card__value">82<span>%</span></div>
            <div class="meter" aria-hidden="true"><span style="width:82%"></span></div>
            <p class="signal-card__text">MRR is moving, failed payments are low, and the next scheduled drop is ready.</p>
          </div>
        </aside>
      </header>

      <section class="metrics-grid enter delay-1" aria-label="Key metrics">
        <article class="card metric-card card--lift">
          <div class="metric-card__top"><span class="metric-card__label">Active subscribers</span><span class="badge badge--success">+23%</span></div>
          <div><div class="metric-card__value">147</div><div class="metric-card__delta">+23% from last month</div></div>
          <div class="spark" aria-hidden="true"><span style="--h:30%"></span><span style="--h:36%"></span><span style="--h:34%"></span><span style="--h:42%"></span><span style="--h:40%"></span><span style="--h:48%"></span><span style="--h:44%"></span><span style="--h:55%"></span><span style="--h:60%"></span><span class="hot" style="--h:72%"></span><span class="hot" style="--h:86%"></span><span class="hot" style="--h:92%"></span></div>
        </article>
        <article class="card metric-card card--lift">
          <div class="metric-card__top"><span class="metric-card__label">MRR</span><span class="badge badge--success">$1.50</span></div>
          <div><div class="metric-card__value">$220.50</div><div class="metric-card__delta">+$34.50 this month</div></div>
          <div class="spark" aria-hidden="true"><span style="--h:26%"></span><span style="--h:31%"></span><span style="--h:33%"></span><span style="--h:40%"></span><span style="--h:44%"></span><span style="--h:47%"></span><span style="--h:50%"></span><span style="--h:56%"></span><span style="--h:60%"></span><span class="hot" style="--h:70%"></span><span class="hot" style="--h:83%"></span><span class="hot" style="--h:90%"></span></div>
        </article>
        <article class="card metric-card card--lift">
          <div class="metric-card__top"><span class="metric-card__label">New this month</span><span class="badge badge--info">31</span></div>
          <div><div class="metric-card__value">31</div><div class="metric-card__delta">+18% vs last month</div></div>
          <div class="spark" aria-hidden="true"><span style="--h:42%"></span><span style="--h:30%"></span><span style="--h:54%"></span><span style="--h:38%"></span><span style="--h:62%"></span><span style="--h:46%"></span><span style="--h:65%"></span><span style="--h:52%"></span><span style="--h:58%"></span><span class="hot" style="--h:66%"></span><span class="hot" style="--h:80%"></span><span class="hot" style="--h:92%"></span></div>
        </article>
        <article class="card metric-card card--lift">
          <div class="metric-card__top"><span class="metric-card__label">Failed payments</span><span class="badge badge--danger">Fix</span></div>
          <div><div class="metric-card__value">3</div><div class="metric-card__delta danger">Needs attention</div></div>
          <div class="spark" aria-hidden="true"><span style="--h:20%"></span><span style="--h:16%"></span><span style="--h:18%"></span><span style="--h:14%"></span><span style="--h:15%"></span><span style="--h:13%"></span><span style="--h:12%"></span><span style="--h:14%"></span><span style="--h:16%"></span><span style="--h:18%"></span><span class="bad" style="--h:23%"></span><span class="bad" style="--h:31%"></span></div>
        </article>
      </section>

      <section class="card next-drop card--lift enter delay-2" aria-label="Next scheduled drop">
        <div>
          <div class="mono">// Next scheduled drop</div>
          <h2 class="section-title" style="margin-top:var(--space-3)">Ghost-note fill, 16th-note pocket</h2>
          <p class="section-copy" style="margin-top:var(--space-2)"><span class="badge badge--info">Scheduled</span> &nbsp; Fill · Advanced · Tuesday 9:00 AM</p>
        </div>
        <div><div class="countdown" aria-label="Two days fourteen hours twenty two minutes">02d : 14h : 22m</div><div class="mono" style="margin-top:var(--space-2)">Until auto-publish</div></div>
      </section>

      <div class="dashboard-grid">
        <section class="card panel enter delay-3" aria-labelledby="recent-content-title">
          <div class="panel-head">
            <div><h2 class="section-title" id="recent-content-title">Recent content</h2><p class="section-copy" style="margin-top:var(--space-2)">Latest drops, status, publish date, and email delivery.</p></div>
            <div class="panel-actions">
              <div class="input-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input class="search" type="search" placeholder="Search drops..." aria-label="Search drops"></div>
              <a class="btn btn--primary" href="#">New drop</a>
            </div>
          </div>
          <div class="table-wrap" role="region" aria-label="Recent content table" tabindex="0">
            <table>
              <thead><tr><th>Title</th><th>Type</th><th>Difficulty</th><th>Status</th><th>Publish date</th><th>Email sent</th><th>Actions</th></tr></thead>
              <tbody>
                <tr><td><strong>Funk slap pattern in E</strong></td><td>Groove</td><td><span class="badge badge--neutral">Beginner</span></td><td><span class="badge badge--success">Published</span></td><td>May 13, 2026</td><td>142 / 147</td><td><div class="row-actions"><button class="mini-btn">Edit</button><button class="mini-btn">Resend</button></div></td></tr>
                <tr><td><strong>Bass-less: D’Angelo — Untitled</strong></td><td>Cover</td><td><span class="badge badge--warning">Intermediate</span></td><td><span class="badge badge--success">Published</span></td><td>May 10, 2026</td><td>139 / 144</td><td><div class="row-actions"><button class="mini-btn">Edit</button><button class="mini-btn">Resend</button></div></td></tr>
                <tr><td><strong>Ghost-note fill, 16th-note pocket</strong></td><td>Fill</td><td><span class="badge badge--danger">Advanced</span></td><td><span class="badge badge--info">Scheduled</span></td><td>May 20, 2026</td><td>—</td><td><div class="row-actions"><button class="mini-btn">Edit</button><button class="mini-btn">Publish</button></div></td></tr>
                <tr><td><strong>Play the root, then improvise</strong></td><td>Challenge</td><td><span class="badge badge--warning">Intermediate</span></td><td><span class="badge badge--neutral">Draft</span></td><td>—</td><td>—</td><td><div class="row-actions"><button class="mini-btn">Edit</button><button class="mini-btn">Delete</button></div></td></tr>
                <tr><td><strong>Minor pentatonic run in A</strong></td><td>Groove</td><td><span class="badge badge--neutral">Beginner</span></td><td><span class="badge badge--success">Published</span></td><td>May 7, 2026</td><td>136 / 140</td><td><div class="row-actions"><button class="mini-btn">Edit</button><button class="mini-btn">Resend</button></div></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <aside class="side-stack">
          <section class="card panel enter delay-4" aria-labelledby="failed-payments-title">
            <div class="panel-head" style="margin-bottom:var(--space-3)"><div><h2 class="section-title" id="failed-payments-title">Needs attention</h2><p class="section-copy" style="margin-top:var(--space-2)">Fix payment and email issues before they become churn.</p></div></div>
            <div class="list">
              <div class="list-item alert"><span class="list-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span><div class="list-body"><strong>3 failed payments</strong><span>Past due users</span></div><span class="badge badge--danger">Fix</span></div>
              <div class="list-item"><span class="list-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/></svg></span><div class="list-body"><strong>4 email retries</strong><span>Queue pending</span></div><span class="badge badge--warning">Retry</span></div>
              <div class="list-item"><span class="list-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg></span><div class="list-body"><strong>14 days buffer</strong><span>Content runway</span></div><span class="badge badge--success">Good</span></div>
            </div>
          </section>

          <section class="card content-mix enter delay-4" aria-labelledby="content-mix-title">
            <div><h2 class="section-title" id="content-mix-title">Content mix</h2><p class="section-copy" style="margin-top:var(--space-2)">Published and scheduled drops by type.</p></div>
            <div class="mix-grid">
              <div class="mix-item"><strong>12</strong><span>Grooves</span></div>
              <div class="mix-item"><strong>8</strong><span>Fills</span></div>
              <div class="mix-item"><strong>7</strong><span>Covers</span></div>
              <div class="mix-item"><strong>7</strong><span>Challenges</span></div>
            </div>
          </section>
        </aside>
      </div>

      <section class="state-row" aria-label="Designed states">
        <article class="card state-card enter delay-4">
          <div class="mono">Loading state</div>
          <div style="display:grid;gap:var(--space-3);margin-top:var(--space-5)"><span class="skeleton" style="width:55%"></span><span class="skeleton" style="width:88%"></span><span class="skeleton" style="width:72%"></span></div>
        </article>
        <article class="card state-card enter delay-4">
          <div class="empty-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg></div>
          <h3 class="section-title" style="font-size:20px">No metrics yet</h3>
          <p class="section-copy" style="margin-top:var(--space-2)">Metrics appear after the first paid member and first published drop.</p>
        </article>
        <article class="card state-card enter delay-4">
          <div class="mono">Error state</div>
          <div class="error-line" style="margin-top:var(--space-5)"><span class="error-dot">!</span><span>Something broke. Try again?</span></div>
          <button class="btn btn--secondary" style="margin-top:var(--space-5)">Reload metrics</button>
        </article>
      </section>
    </div>
  </main>
</div>
</body>
</html>

```

## Screen 11: Checkout Success

Route: `/checkout/success`
Reference file: `basscally-screen-11-checkout-success.html`
Purpose: Post-payment, magic link and dashboard direction

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>Checkout success - Basscally Club</title>
<meta name="description" content="Your Basscally Club membership is live. Check your email for a magic link and start practicing.">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --color-brand: #FF4500;
    --color-brand-hover: #FF5C1F;
    --color-brand-muted: #2A1408;
    --color-bg: #0A0A0B;
    --color-surface: #141416;
    --color-surface-raised: #1C1C1F;
    --color-surface-sunken: #060607;
    --color-border: #26262A;
    --color-border-strong: #3A3A40;
    --color-text: #F5F5F7;
    --color-text-muted: #A1A1A8;
    --color-text-dim: #6B6B72;
    --color-success: #34D399;
    --color-warning: #FBBF24;
    --color-danger: #F87171;
    --color-info: #60A5FA;
    --font-display: "Cabinet Grotesk", "Inter", system-ui, sans-serif;
    --font-body: "Geist", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: "Geist Mono", "JetBrains Mono", monospace;
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;
    --space-8: 48px;
    --space-10: 64px;
    --space-12: 96px;
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 14px;
    --radius-xl: 20px;
    --radius-full: 9999px;
    --shadow-md: 0 4px 12px rgba(0,0,0,0.5);
    --shadow-lg: 0 12px 32px rgba(0,0,0,0.6);
    --shadow-brand-glow: 0 0 30px rgba(255,69,0,0.25);
    --motion-fast: 150ms;
    --motion-default: 250ms;
    --motion-slow: 420ms;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    min-height: 100%;
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body {
    position: relative;
    background:
      radial-gradient(circle at 20% 0%, rgba(255,69,0,0.10), transparent 30%),
      radial-gradient(circle at 85% 15%, rgba(255,92,31,0.07), transparent 28%),
      linear-gradient(180deg, #0A0A0B 0%, #060607 100%);
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse at 45% 20%, black 0%, transparent 72%);
    -webkit-mask-image: radial-gradient(ellipse at 45% 20%, black 0%, transparent 72%);
  }

  a { color: inherit; }
  ::selection { background: var(--color-brand); color: white; }

  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(10,10,11,0.74);
    border-bottom: 1px solid rgba(38,38,42,0.7);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
  }

  .nav__inner {
    max-width: 1180px;
    margin: 0 auto;
    padding: 16px var(--space-5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--color-text);
    text-decoration: none;
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .brand__mark {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: grid;
    place-items: center;
    background: var(--color-brand);
    color: white;
    line-height: 1;
    box-shadow: 0 0 18px rgba(255,69,0,0.18);
  }

  .nav__actions { display: flex; align-items: center; gap: var(--space-2); }

  .btn {
    min-height: 44px;
    padding: 0 var(--space-5);
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    white-space: nowrap;
    cursor: pointer;
    transition: transform var(--motion-fast) var(--ease-out), border-color var(--motion-fast) var(--ease-out), background var(--motion-fast) var(--ease-out), box-shadow var(--motion-fast) var(--ease-out), color var(--motion-fast) var(--ease-out);
  }

  .btn--primary { background: var(--color-brand); color: white; }
  .btn--primary:hover { background: var(--color-brand-hover); box-shadow: var(--shadow-brand-glow); transform: translateY(-1px); }
  .btn--secondary { background: rgba(20,20,22,0.66); color: var(--color-text); border-color: var(--color-border-strong); }
  .btn--secondary:hover { background: var(--color-surface-raised); border-color: var(--color-text-muted); }
  .btn--ghost { background: transparent; color: var(--color-text-muted); }
  .btn--ghost:hover { background: var(--color-surface); color: var(--color-text); }
  .btn:focus-visible { outline: 2px solid rgba(255,69,0,0.4); outline-offset: 3px; }

  .page {
    position: relative;
    z-index: 1;
    max-width: 1180px;
    min-height: calc(100vh - 76px);
    margin: 0 auto;
    padding: var(--space-10) var(--space-5) var(--space-8);
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 430px;
    gap: var(--space-10);
    align-items: center;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1;
    font-weight: 600;
    color: var(--color-brand);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: var(--space-5);
  }

  .eyebrow::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-brand);
    box-shadow: 0 0 12px rgba(255,69,0,0.65);
  }

  .headline {
    font-family: var(--font-display);
    font-size: clamp(48px, 8vw, 104px);
    line-height: 0.9;
    letter-spacing: -0.052em;
    font-weight: 900;
    color: var(--color-text);
    max-width: 730px;
    margin-bottom: var(--space-6);
  }

  .headline span { color: var(--color-brand); font-style: italic; }

  .lede {
    color: var(--color-text-muted);
    font-size: clamp(17px, 1.5vw, 21px);
    line-height: 1.55;
    max-width: 600px;
    margin-bottom: var(--space-8);
  }

  .lede strong { color: var(--color-text); font-weight: 600; }

  .cta-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-wrap: wrap;
  }

  .fine {
    margin-top: var(--space-4);
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-text-dim);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .card {
    background: linear-gradient(180deg, rgba(28,28,31,0.96), rgba(14,14,16,0.96));
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
  }

  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 18% 8%, rgba(255,69,0,0.10), transparent 34%);
    pointer-events: none;
  }

  .card > * { position: relative; z-index: 1; }

  .pass-card { padding: var(--space-6); }

  .pass-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .pass-kicker {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    padding: var(--space-1) var(--space-3);
    min-height: 26px;
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: 1px solid transparent;
  }

  .badge--success { background: rgba(52,211,153,0.13); color: var(--color-success); border-color: rgba(52,211,153,0.22); }
  .badge--warning { background: rgba(251,191,36,0.12); color: var(--color-warning); border-color: rgba(251,191,36,0.22); }
  .badge--brand { background: var(--color-brand-muted); color: var(--color-brand); border-color: rgba(255,69,0,0.25); }

  .vinyl {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin: 0 auto var(--space-6);
    background:
      radial-gradient(circle at center, var(--color-brand) 0 11%, #080809 12% 22%, #19191C 23% 25%, #080809 26% 42%, #1F1F23 43% 45%, #070708 46% 70%, #222228 71% 73%, #070708 74% 100%);
    border: 1px solid rgba(255,255,255,0.08);
    position: relative;
    display: grid;
    place-items: center;
    box-shadow: inset 0 0 30px rgba(255,255,255,0.04), 0 18px 42px rgba(0,0,0,0.4);
  }

  .vinyl__icon {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: rgba(255,255,255,0.94);
    color: #0A0A0B;
    display: grid;
    place-items: center;
    box-shadow: 0 0 28px rgba(255,69,0,0.24);
  }

  .pass-title {
    font-family: var(--font-display);
    font-size: 30px;
    line-height: 1.06;
    letter-spacing: -0.03em;
    font-weight: 800;
    margin-bottom: var(--space-2);
  }

  .pass-copy { color: var(--color-text-muted); font-size: 15px; line-height: 1.55; margin-bottom: var(--space-5); }

  .divider { height: 1px; background: var(--color-border); margin: var(--space-5) 0; }

  .rows { display: grid; gap: var(--space-3); }
  .row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); color: var(--color-text-muted); font-size: 14px; }
  .row strong { color: var(--color-text); font-weight: 600; text-align: right; }

  .steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-8);
  }

  .step-card {
    background: rgba(20,20,22,0.78);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    min-height: 146px;
    transition: transform var(--motion-default) var(--ease-out), border-color var(--motion-default) var(--ease-out), box-shadow var(--motion-default) var(--ease-out);
  }

  .step-card:hover { transform: translateY(-3px); border-color: var(--color-border-strong); box-shadow: var(--shadow-md); }

  .step-num {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-brand);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: var(--space-4);
    display: block;
  }

  .step-card h3 {
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: var(--space-2);
  }

  .step-card p { color: var(--color-text-muted); font-size: 14px; line-height: 1.55; }

  .mini-state-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-8);
  }

  .state-card {
    border: 1px dashed var(--color-border-strong);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    color: var(--color-text-muted);
    background: rgba(6,6,7,0.46);
  }

  .state-card strong {
    display: block;
    color: var(--color-text);
    margin-bottom: var(--space-1);
    font-size: 14px;
  }

  .state-card span { display: block; font-size: 13px; line-height: 1.45; }

  .control-room {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-8);
  }

  .mini-card {
    background: rgba(20,20,22,0.8);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    min-height: 150px;
    position: relative;
    overflow: hidden;
    transition: transform var(--motion-default) var(--ease-out), border-color var(--motion-default) var(--ease-out);
  }

  .mini-card:hover { transform: translateY(-3px); border-color: var(--color-border-strong); }
  .mini-card h3 { font-family: var(--font-display); font-size: 20px; letter-spacing: -0.02em; margin-bottom: var(--space-2); }
  .mini-card p { color: var(--color-text-muted); font-size: 14px; line-height: 1.55; }

  .meter {
    display: flex;
    align-items: end;
    gap: 5px;
    height: 42px;
    margin-top: var(--space-5);
  }

  .meter span {
    display: block;
    flex: 1;
    min-width: 6px;
    border-radius: 999px 999px 2px 2px;
    background: #2B2B31;
  }
  .meter span:nth-child(6), .meter span:nth-child(7), .meter span:nth-child(8) { background: var(--color-brand); }

  .price-stack {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
    margin: var(--space-6) 0;
  }

  .price-box {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    background: rgba(6,6,7,0.42);
  }
  .price-box small {
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: var(--space-2);
  }
  .price-box strong { font-family: var(--font-display); font-size: 34px; line-height: 1; letter-spacing: -0.03em; }

  .lost-note {
    margin-top: var(--space-5);
    border-left: 2px solid var(--color-brand);
    padding-left: var(--space-4);
    color: var(--color-text-muted);
    font-size: 14px;
  }

  .footer-note {
    margin-top: var(--space-10);
    padding-top: var(--space-5);
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    gap: var(--space-5);
    color: var(--color-text-dim);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  @media (prefers-reduced-motion: no-preference) {
    .eyebrow, .headline, .lede, .cta-row, .fine, .card, .step-card, .mini-card, .state-card, .footer-note {
      opacity: 0;
      transform: translateY(16px);
      animation: rise var(--motion-slow) var(--ease-out) forwards;
    }
    .headline { animation-delay: 90ms; }
    .lede { animation-delay: 140ms; }
    .cta-row, .fine { animation-delay: 190ms; }
    .card { animation-delay: 160ms; }
    .step-card:nth-child(1), .mini-card:nth-child(1), .state-card:nth-child(1) { animation-delay: 240ms; }
    .step-card:nth-child(2), .mini-card:nth-child(2), .state-card:nth-child(2) { animation-delay: 290ms; }
    .step-card:nth-child(3), .mini-card:nth-child(3), .state-card:nth-child(3) { animation-delay: 340ms; }
    .mini-card:nth-child(4) { animation-delay: 390ms; }
    .footer-note { animation-delay: 420ms; }
    .vinyl { animation: spin-soft 18s linear infinite; }
    @keyframes rise { to { opacity: 1; transform: translateY(0); } }
    @keyframes spin-soft { to { transform: rotate(360deg); } }
  }

  @media (max-width: 980px) {
    .hero-grid { grid-template-columns: 1fr; gap: var(--space-8); }
    .steps, .mini-state-grid { grid-template-columns: 1fr; }
    .control-room { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 680px) {
    .nav__inner { padding: 14px var(--space-4); }
    .nav__actions .btn--ghost { display: none; }
    .page { padding: var(--space-8) var(--space-4) var(--space-6); }
    .headline { font-size: clamp(44px, 15vw, 68px); }
    .cta-row .btn { width: 100%; }
    .pass-card { padding: var(--space-5); }
    .vinyl { width: 132px; height: 132px; }
    .price-stack { grid-template-columns: 1fr; }
    .control-room { grid-template-columns: 1fr; }
    .footer-note { flex-direction: column; }
  }
</style>

</head>
<body>
  <nav class="nav" aria-label="Primary">
    <div class="nav__inner">
      <a href="/" class="brand" aria-label="Basscally Club home">
        <span class="brand__mark">B</span>
        Basscally Club
      </a>
      <div class="nav__actions">
        <a class="btn btn--ghost" href="mailto:hello@basscally.club">Need help?</a>
        <a class="btn btn--secondary" href="/auth/login">Sign in</a>
      </div>
    </div>
  </nav>

  <main class="page">
    <section class="hero-grid" aria-labelledby="success-title">
      <div>
        <div class="eyebrow">Checkout complete</div>
        <h1 class="headline" id="success-title">Your Club pass is <span>live.</span></h1>
        <p class="lede">
          Payment received. We sent your magic link to <strong>you@example.com</strong>. Open it, land in the dashboard, and start with the latest drop.
        </p>
        <div class="cta-row">
          <a href="/dashboard" class="btn btn--primary">Go to dashboard</a>
          <a href="/auth/login" class="btn btn--secondary">Resend magic link</a>
        </div>
        <p class="fine">No password needed · Access is tied to your email</p>
      </div>

      <aside class="card pass-card" aria-label="Membership pass">
        <div class="pass-top">
          <span class="pass-kicker">Basscally pass</span>
          <span class="badge badge--success">Active</span>
        </div>
        <div class="vinyl" aria-hidden="true">
          <div class="vinyl__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
        </div>
        <h2 class="pass-title">Founding member access</h2>
        <p class="pass-copy">Your $1.50/month membership is now attached to your checkout email.</p>
        <div class="divider"></div>
        <div class="rows">
          <div class="row"><span>Plan</span><strong>Club monthly</strong></div>
          <div class="row"><span>Price</span><strong>$1.50/month</strong></div>
          <div class="row"><span>Status</span><strong>Magic link sent</strong></div>
          <div class="row"><span>Next renewal</span><strong>June 15, 2026</strong></div>
        </div>
      </aside>
    </section>

    <section class="steps" aria-label="Next steps">
      <article class="step-card">
        <span class="step-num">Step 01</span>
        <h3>Payment received</h3>
        <p>Lemon Squeezy confirmed your membership and created your Club access.</p>
      </article>
      <article class="step-card">
        <span class="step-num">Step 02</span>
        <h3>Magic link sent</h3>
        <p>Open the email on your phone or laptop. It signs you in without a password.</p>
      </article>
      <article class="step-card">
        <span class="step-num">Step 03</span>
        <h3>Practice starts</h3>
        <p>Open the dashboard, play the latest drop, download the file, and lock in.</p>
      </article>
    </section>

    <section class="control-room" aria-label="What happens next">
      <article class="mini-card">
        <h3>Latest drop</h3>
        <p>Your dashboard opens with the newest groove, fill, challenge, or bass-less cover first.</p>
        <div class="meter" aria-hidden="true"><span style="height:12px"></span><span style="height:18px"></span><span style="height:24px"></span><span style="height:20px"></span><span style="height:31px"></span><span style="height:35px"></span><span style="height:28px"></span><span style="height:38px"></span></div>
      </article>
      <article class="mini-card">
        <h3>Every 3 days</h3>
        <p>New practice material lands on schedule. No searching. No noise.</p>
        <div class="meter" aria-hidden="true"><span style="height:18px"></span><span style="height:16px"></span><span style="height:30px"></span><span style="height:22px"></span><span style="height:28px"></span><span style="height:40px"></span><span style="height:35px"></span><span style="height:38px"></span></div>
      </article>
      <article class="mini-card">
        <h3>Download offline</h3>
        <p>Files stay ready for practice. Download when you have access, play anywhere.</p>
        <div class="meter" aria-hidden="true"><span style="height:10px"></span><span style="height:14px"></span><span style="height:19px"></span><span style="height:27px"></span><span style="height:33px"></span><span style="height:38px"></span><span style="height:31px"></span><span style="height:40px"></span></div>
      </article>
      <article class="mini-card">
        <h3>Membership</h3>
        <p>Cancel anytime from your account. You keep access until the end of your paid period.</p>
        <div class="meter" aria-hidden="true"><span style="height:14px"></span><span style="height:17px"></span><span style="height:16px"></span><span style="height:21px"></span><span style="height:26px"></span><span style="height:30px"></span><span style="height:36px"></span><span style="height:40px"></span></div>
      </article>
    </section>

    <section class="mini-state-grid" aria-label="Designed states">
      <div class="state-card"><strong>Processing state</strong><span>Used while the webhook confirms payment and access is being created.</span></div>
      <div class="state-card"><strong>Email delay state</strong><span>Used when payment is live but the magic link has not arrived yet.</span></div>
      <div class="state-card"><strong>Error state</strong><span>Used if payment succeeded but access sync fails. Support CTA stays visible.</span></div>
    </section>

    <div class="footer-note">
      <span>Route: /checkout/success</span>
      <span>Primary action: Go to dashboard</span>
    </div>
  </main>
</body>
</html>

```

## Screen 12: Checkout Cancelled

Route: `/checkout/cancelled`
Reference file: `basscally-screen-12-checkout-cancelled.html`
Purpose: Recover abandoned checkout

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>Checkout paused - Basscally Club</title>
<meta name="description" content="Return to checkout and join Basscally Club for $1.50/month.">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --color-brand: #FF4500;
    --color-brand-hover: #FF5C1F;
    --color-brand-muted: #2A1408;
    --color-bg: #0A0A0B;
    --color-surface: #141416;
    --color-surface-raised: #1C1C1F;
    --color-surface-sunken: #060607;
    --color-border: #26262A;
    --color-border-strong: #3A3A40;
    --color-text: #F5F5F7;
    --color-text-muted: #A1A1A8;
    --color-text-dim: #6B6B72;
    --color-success: #34D399;
    --color-warning: #FBBF24;
    --color-danger: #F87171;
    --color-info: #60A5FA;
    --font-display: "Cabinet Grotesk", "Inter", system-ui, sans-serif;
    --font-body: "Geist", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: "Geist Mono", "JetBrains Mono", monospace;
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;
    --space-8: 48px;
    --space-10: 64px;
    --space-12: 96px;
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 14px;
    --radius-xl: 20px;
    --radius-full: 9999px;
    --shadow-md: 0 4px 12px rgba(0,0,0,0.5);
    --shadow-lg: 0 12px 32px rgba(0,0,0,0.6);
    --shadow-brand-glow: 0 0 30px rgba(255,69,0,0.25);
    --motion-fast: 150ms;
    --motion-default: 250ms;
    --motion-slow: 420ms;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    min-height: 100%;
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body {
    position: relative;
    background:
      radial-gradient(circle at 20% 0%, rgba(255,69,0,0.10), transparent 30%),
      radial-gradient(circle at 85% 15%, rgba(255,92,31,0.07), transparent 28%),
      linear-gradient(180deg, #0A0A0B 0%, #060607 100%);
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse at 45% 20%, black 0%, transparent 72%);
    -webkit-mask-image: radial-gradient(ellipse at 45% 20%, black 0%, transparent 72%);
  }

  a { color: inherit; }
  ::selection { background: var(--color-brand); color: white; }

  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(10,10,11,0.74);
    border-bottom: 1px solid rgba(38,38,42,0.7);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
  }

  .nav__inner {
    max-width: 1180px;
    margin: 0 auto;
    padding: 16px var(--space-5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--color-text);
    text-decoration: none;
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .brand__mark {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: grid;
    place-items: center;
    background: var(--color-brand);
    color: white;
    line-height: 1;
    box-shadow: 0 0 18px rgba(255,69,0,0.18);
  }

  .nav__actions { display: flex; align-items: center; gap: var(--space-2); }

  .btn {
    min-height: 44px;
    padding: 0 var(--space-5);
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    white-space: nowrap;
    cursor: pointer;
    transition: transform var(--motion-fast) var(--ease-out), border-color var(--motion-fast) var(--ease-out), background var(--motion-fast) var(--ease-out), box-shadow var(--motion-fast) var(--ease-out), color var(--motion-fast) var(--ease-out);
  }

  .btn--primary { background: var(--color-brand); color: white; }
  .btn--primary:hover { background: var(--color-brand-hover); box-shadow: var(--shadow-brand-glow); transform: translateY(-1px); }
  .btn--secondary { background: rgba(20,20,22,0.66); color: var(--color-text); border-color: var(--color-border-strong); }
  .btn--secondary:hover { background: var(--color-surface-raised); border-color: var(--color-text-muted); }
  .btn--ghost { background: transparent; color: var(--color-text-muted); }
  .btn--ghost:hover { background: var(--color-surface); color: var(--color-text); }
  .btn:focus-visible { outline: 2px solid rgba(255,69,0,0.4); outline-offset: 3px; }

  .page {
    position: relative;
    z-index: 1;
    max-width: 1180px;
    min-height: calc(100vh - 76px);
    margin: 0 auto;
    padding: var(--space-10) var(--space-5) var(--space-8);
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 430px;
    gap: var(--space-10);
    align-items: center;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1;
    font-weight: 600;
    color: var(--color-brand);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: var(--space-5);
  }

  .eyebrow::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-brand);
    box-shadow: 0 0 12px rgba(255,69,0,0.65);
  }

  .headline {
    font-family: var(--font-display);
    font-size: clamp(48px, 8vw, 104px);
    line-height: 0.9;
    letter-spacing: -0.052em;
    font-weight: 900;
    color: var(--color-text);
    max-width: 730px;
    margin-bottom: var(--space-6);
  }

  .headline span { color: var(--color-brand); font-style: italic; }

  .lede {
    color: var(--color-text-muted);
    font-size: clamp(17px, 1.5vw, 21px);
    line-height: 1.55;
    max-width: 600px;
    margin-bottom: var(--space-8);
  }

  .lede strong { color: var(--color-text); font-weight: 600; }

  .cta-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-wrap: wrap;
  }

  .fine {
    margin-top: var(--space-4);
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-text-dim);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .card {
    background: linear-gradient(180deg, rgba(28,28,31,0.96), rgba(14,14,16,0.96));
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
  }

  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 18% 8%, rgba(255,69,0,0.10), transparent 34%);
    pointer-events: none;
  }

  .card > * { position: relative; z-index: 1; }

  .pass-card { padding: var(--space-6); }

  .pass-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .pass-kicker {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-dim);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    padding: var(--space-1) var(--space-3);
    min-height: 26px;
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: 1px solid transparent;
  }

  .badge--success { background: rgba(52,211,153,0.13); color: var(--color-success); border-color: rgba(52,211,153,0.22); }
  .badge--warning { background: rgba(251,191,36,0.12); color: var(--color-warning); border-color: rgba(251,191,36,0.22); }
  .badge--brand { background: var(--color-brand-muted); color: var(--color-brand); border-color: rgba(255,69,0,0.25); }

  .vinyl {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin: 0 auto var(--space-6);
    background:
      radial-gradient(circle at center, var(--color-brand) 0 11%, #080809 12% 22%, #19191C 23% 25%, #080809 26% 42%, #1F1F23 43% 45%, #070708 46% 70%, #222228 71% 73%, #070708 74% 100%);
    border: 1px solid rgba(255,255,255,0.08);
    position: relative;
    display: grid;
    place-items: center;
    box-shadow: inset 0 0 30px rgba(255,255,255,0.04), 0 18px 42px rgba(0,0,0,0.4);
  }

  .vinyl__icon {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: rgba(255,255,255,0.94);
    color: #0A0A0B;
    display: grid;
    place-items: center;
    box-shadow: 0 0 28px rgba(255,69,0,0.24);
  }

  .pass-title {
    font-family: var(--font-display);
    font-size: 30px;
    line-height: 1.06;
    letter-spacing: -0.03em;
    font-weight: 800;
    margin-bottom: var(--space-2);
  }

  .pass-copy { color: var(--color-text-muted); font-size: 15px; line-height: 1.55; margin-bottom: var(--space-5); }

  .divider { height: 1px; background: var(--color-border); margin: var(--space-5) 0; }

  .rows { display: grid; gap: var(--space-3); }
  .row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); color: var(--color-text-muted); font-size: 14px; }
  .row strong { color: var(--color-text); font-weight: 600; text-align: right; }

  .steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-8);
  }

  .step-card {
    background: rgba(20,20,22,0.78);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    min-height: 146px;
    transition: transform var(--motion-default) var(--ease-out), border-color var(--motion-default) var(--ease-out), box-shadow var(--motion-default) var(--ease-out);
  }

  .step-card:hover { transform: translateY(-3px); border-color: var(--color-border-strong); box-shadow: var(--shadow-md); }

  .step-num {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-brand);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: var(--space-4);
    display: block;
  }

  .step-card h3 {
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: var(--space-2);
  }

  .step-card p { color: var(--color-text-muted); font-size: 14px; line-height: 1.55; }

  .mini-state-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-8);
  }

  .state-card {
    border: 1px dashed var(--color-border-strong);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    color: var(--color-text-muted);
    background: rgba(6,6,7,0.46);
  }

  .state-card strong {
    display: block;
    color: var(--color-text);
    margin-bottom: var(--space-1);
    font-size: 14px;
  }

  .state-card span { display: block; font-size: 13px; line-height: 1.45; }

  .control-room {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-8);
  }

  .mini-card {
    background: rgba(20,20,22,0.8);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    min-height: 150px;
    position: relative;
    overflow: hidden;
    transition: transform var(--motion-default) var(--ease-out), border-color var(--motion-default) var(--ease-out);
  }

  .mini-card:hover { transform: translateY(-3px); border-color: var(--color-border-strong); }
  .mini-card h3 { font-family: var(--font-display); font-size: 20px; letter-spacing: -0.02em; margin-bottom: var(--space-2); }
  .mini-card p { color: var(--color-text-muted); font-size: 14px; line-height: 1.55; }

  .meter {
    display: flex;
    align-items: end;
    gap: 5px;
    height: 42px;
    margin-top: var(--space-5);
  }

  .meter span {
    display: block;
    flex: 1;
    min-width: 6px;
    border-radius: 999px 999px 2px 2px;
    background: #2B2B31;
  }
  .meter span:nth-child(6), .meter span:nth-child(7), .meter span:nth-child(8) { background: var(--color-brand); }

  .price-stack {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
    margin: var(--space-6) 0;
  }

  .price-box {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    background: rgba(6,6,7,0.42);
  }
  .price-box small {
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: var(--space-2);
  }
  .price-box strong { font-family: var(--font-display); font-size: 34px; line-height: 1; letter-spacing: -0.03em; }

  .lost-note {
    margin-top: var(--space-5);
    border-left: 2px solid var(--color-brand);
    padding-left: var(--space-4);
    color: var(--color-text-muted);
    font-size: 14px;
  }

  .footer-note {
    margin-top: var(--space-10);
    padding-top: var(--space-5);
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    gap: var(--space-5);
    color: var(--color-text-dim);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  @media (prefers-reduced-motion: no-preference) {
    .eyebrow, .headline, .lede, .cta-row, .fine, .card, .step-card, .mini-card, .state-card, .footer-note {
      opacity: 0;
      transform: translateY(16px);
      animation: rise var(--motion-slow) var(--ease-out) forwards;
    }
    .headline { animation-delay: 90ms; }
    .lede { animation-delay: 140ms; }
    .cta-row, .fine { animation-delay: 190ms; }
    .card { animation-delay: 160ms; }
    .step-card:nth-child(1), .mini-card:nth-child(1), .state-card:nth-child(1) { animation-delay: 240ms; }
    .step-card:nth-child(2), .mini-card:nth-child(2), .state-card:nth-child(2) { animation-delay: 290ms; }
    .step-card:nth-child(3), .mini-card:nth-child(3), .state-card:nth-child(3) { animation-delay: 340ms; }
    .mini-card:nth-child(4) { animation-delay: 390ms; }
    .footer-note { animation-delay: 420ms; }
    .vinyl { animation: spin-soft 18s linear infinite; }
    @keyframes rise { to { opacity: 1; transform: translateY(0); } }
    @keyframes spin-soft { to { transform: rotate(360deg); } }
  }

  @media (max-width: 980px) {
    .hero-grid { grid-template-columns: 1fr; gap: var(--space-8); }
    .steps, .mini-state-grid { grid-template-columns: 1fr; }
    .control-room { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 680px) {
    .nav__inner { padding: 14px var(--space-4); }
    .nav__actions .btn--ghost { display: none; }
    .page { padding: var(--space-8) var(--space-4) var(--space-6); }
    .headline { font-size: clamp(44px, 15vw, 68px); }
    .cta-row .btn { width: 100%; }
    .pass-card { padding: var(--space-5); }
    .vinyl { width: 132px; height: 132px; }
    .price-stack { grid-template-columns: 1fr; }
    .control-room { grid-template-columns: 1fr; }
    .footer-note { flex-direction: column; }
  }
</style>

</head>
<body>
  <nav class="nav" aria-label="Primary">
    <div class="nav__inner">
      <a href="/" class="brand" aria-label="Basscally Club home">
        <span class="brand__mark">B</span>
        Basscally Club
      </a>
      <div class="nav__actions">
        <a class="btn btn--ghost" href="/#faq">Questions</a>
        <a class="btn btn--secondary" href="/auth/login">Sign in</a>
      </div>
    </div>
  </nav>

  <main class="page">
    <section class="hero-grid" aria-labelledby="cancelled-title">
      <div>
        <div class="eyebrow">Checkout paused</div>
        <h1 class="headline" id="cancelled-title">No stress. Your spot is still <span>here.</span></h1>
        <p class="lede">
          You left checkout before payment finished. The Club is still open, and the founding member price is still waiting.
        </p>
        <div class="cta-row">
          <a href="#checkout" class="btn btn--primary">Return to checkout</a>
          <a href="/#what-you-get" class="btn btn--secondary">See what you get</a>
        </div>
        <p class="fine">Cancel anytime · No contracts · Downloadable audio</p>
      </div>

      <aside class="card pass-card" aria-label="Founding member price">
        <div class="pass-top">
          <span class="pass-kicker">Founding offer</span>
          <span class="badge badge--brand">Still open</span>
        </div>
        <div class="price-stack">
          <div class="price-box">
            <small>Today</small>
            <strong>$1.50</strong>
          </div>
          <div class="price-box">
            <small>Later</small>
            <strong>Goes up</strong>
          </div>
        </div>
        <h2 class="pass-title">Practice material every 3 days</h2>
        <p class="pass-copy">Bass-less covers, grooves, fills, and challenges. Built for players who want reps, not another bloated course.</p>
        <div class="divider"></div>
        <div class="rows">
          <div class="row"><span>Checkout</span><strong>Not completed</strong></div>
          <div class="row"><span>Access</span><strong>Not active yet</strong></div>
          <div class="row"><span>Files</span><strong>Ready after payment</strong></div>
          <div class="row"><span>Time</span><strong>Under 2 minutes</strong></div>
        </div>
        <p class="lost-note">No account was charged on this page. Return to checkout when you are ready.</p>
      </aside>
    </section>

    <section class="steps" aria-label="Recovery options">
      <article class="step-card">
        <span class="step-num">Option 01</span>
        <h3>Try again</h3>
        <p>Return to Lemon Squeezy checkout and complete the same plan.</p>
      </article>
      <article class="step-card">
        <span class="step-num">Option 02</span>
        <h3>Use another card</h3>
        <p>If the first card failed, try another card or payment method at checkout.</p>
      </article>
      <article class="step-card">
        <span class="step-num">Option 03</span>
        <h3>Ask for help</h3>
        <p>Message the team if checkout fails twice. We will help you get in.</p>
      </article>
    </section>

    <section class="control-room" aria-label="What you were about to get">
      <article class="mini-card">
        <h3>Bass-less covers</h3>
        <p>The songs you see Chris cover, without the bass. Drop in and play the part.</p>
        <div class="meter" aria-hidden="true"><span style="height:12px"></span><span style="height:20px"></span><span style="height:28px"></span><span style="height:16px"></span><span style="height:34px"></span><span style="height:39px"></span><span style="height:31px"></span><span style="height:36px"></span></div>
      </article>
      <article class="mini-card">
        <h3>Grooves</h3>
        <p>Short patterns for pocket, timing, and consistency.</p>
        <div class="meter" aria-hidden="true"><span style="height:18px"></span><span style="height:22px"></span><span style="height:14px"></span><span style="height:28px"></span><span style="height:31px"></span><span style="height:34px"></span><span style="height:40px"></span><span style="height:37px"></span></div>
      </article>
      <article class="mini-card">
        <h3>Fills</h3>
        <p>Transitions you can steal, repeat, and make yours.</p>
        <div class="meter" aria-hidden="true"><span style="height:14px"></span><span style="height:18px"></span><span style="height:23px"></span><span style="height:30px"></span><span style="height:26px"></span><span style="height:35px"></span><span style="height:39px"></span><span style="height:33px"></span></div>
      </article>
      <article class="mini-card">
        <h3>Challenges</h3>
        <p>A clear bass goal every week. Record it, share it, keep moving.</p>
        <div class="meter" aria-hidden="true"><span style="height:16px"></span><span style="height:15px"></span><span style="height:22px"></span><span style="height:27px"></span><span style="height:30px"></span><span style="height:35px"></span><span style="height:36px"></span><span style="height:41px"></span></div>
      </article>
    </section>

    <section class="mini-state-grid" aria-label="Designed states">
      <div class="state-card"><strong>Default state</strong><span>User cancelled checkout or closed the payment window.</span></div>
      <div class="state-card"><strong>Payment failed state</strong><span>Same layout, but badge changes to payment failed and CTA says Try another card.</span></div>
      <div class="state-card"><strong>Expired link state</strong><span>Same recovery screen, with a fresh checkout CTA generated by the app.</span></div>
    </section>

    <div class="footer-note">
      <span>Route: /checkout/cancelled</span>
      <span>Primary action: Return to checkout</span>
    </div>
  </main>
</body>
</html>

```

## Screen 13: Auth Callback

Route: `/auth/callback`
Reference file: `basscally-screen-13-auth-callback-motion.html`
Purpose: Signing-in transition

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --color-brand:#FF4500;--color-brand-hover:#FF5C1F;--color-brand-muted:#2A1408;
  --color-bg:#0A0A0B;--color-surface:#141416;--color-surface-raised:#1C1C1F;--color-surface-sunken:#060607;
  --color-border:#26262A;--color-border-strong:#3A3A40;--color-text:#F5F5F7;--color-text-muted:#A1A1A8;--color-text-dim:#6B6B72;
  --color-success:#34D399;--color-warning:#FBBF24;--color-danger:#F87171;--color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif;--font-body:"Geist","Inter",-apple-system,sans-serif;--font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-sm:0 1px 2px rgba(0,0,0,.4);--shadow-md:0 4px 12px rgba(0,0,0,.5);--shadow-lg:0 18px 48px rgba(0,0,0,.72);--shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1);--ease-in-out:cubic-bezier(.65,0,.35,1);--motion-fast:150ms;--motion-default:250ms;--motion-slow:640ms;
}
*{box-sizing:border-box;margin:0;padding:0}html,body{min-height:100%;background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}body::before{content:"";position:fixed;inset:-20%;background:radial-gradient(circle at 16% 0%,rgba(255,69,0,.13),transparent 31%),radial-gradient(circle at 86% 16%,rgba(255,92,31,.08),transparent 26%),linear-gradient(180deg,#0A0A0B 0%,#060607 100%);z-index:-3}body::after{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at center,black 28%,transparent 78%);z-index:-2;pointer-events:none}.grain{position:fixed;inset:0;z-index:-1;opacity:.2;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E")}.container{max-width:1220px;margin:0 auto;padding:0 var(--space-5)}
a{color:inherit}.btn{font-family:var(--font-body);font-weight:600;font-size:14px;line-height:1;padding:12px 18px;border-radius:var(--radius-lg);border:1px solid transparent;cursor:pointer;transition:transform var(--motion-fast) var(--ease-out),background var(--motion-fast) var(--ease-out),border-color var(--motion-fast) var(--ease-out),box-shadow var(--motion-fast) var(--ease-out),color var(--motion-fast) var(--ease-out);text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;min-height:44px}.btn--primary{background:var(--color-brand);color:#fff}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-1px)}.btn--secondary{background:rgba(20,20,22,.7);border-color:var(--color-border-strong);color:var(--color-text)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.input:focus-visible,.chip:focus-visible,button:focus-visible{outline:2px solid rgba(255,69,0,.55);outline-offset:3px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:1px solid transparent}.badge--active{background:rgba(52,211,153,.12);color:var(--color-success);border-color:rgba(52,211,153,.22)}.badge--scheduled{background:rgba(96,165,250,.12);color:var(--color-info);border-color:rgba(96,165,250,.22)}.badge--draft{background:rgba(161,161,168,.10);color:var(--color-text-muted);border-color:rgba(161,161,168,.16)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.22)}.badge--warning{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.22)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border-color:rgba(255,69,0,.25)}.card{background:linear-gradient(180deg,rgba(28,28,31,.86),rgba(14,14,16,.9));border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:0 1px 0 rgba(255,255,255,.035) inset}.mono{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.h1{font-family:var(--font-display);font-size:clamp(40px,7vw,78px);font-weight:800;letter-spacing:-.045em;line-height:.94}.h2{font-family:var(--font-display);font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:-.035em;line-height:1}.muted{color:var(--color-text-muted)}.dim{color:var(--color-text-dim)}
.nav{position:sticky;top:0;z-index:50;background:rgba(10,10,11,.72);backdrop-filter:blur(24px) saturate(140%);border-bottom:1px solid rgba(38,38,42,.68)}.nav__inner{max-width:1320px;margin:0 auto;padding:18px var(--space-8);display:flex;align-items:center;justify-content:space-between;gap:16px}.brand{font-family:var(--font-display);font-weight:800;font-size:17px;text-decoration:none;display:flex;align-items:center;gap:10px}.brand__mark{width:28px;height:28px;border-radius:8px;background:var(--color-brand);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;box-shadow:0 0 28px rgba(255,69,0,.25)}.nav__actions{display:flex;gap:8px;align-items:center}
.admin-layout{display:grid;grid-template-columns:250px 1fr;min-height:100vh}.sidebar{position:sticky;top:0;height:100vh;border-right:1px solid var(--color-border);background:rgba(6,6,7,.74);backdrop-filter:blur(24px);padding:22px}.sidebar .brand{margin-bottom:34px}.side-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-text-dim);margin:22px 0 10px}.side-link{min-height:44px;padding:12px 14px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:space-between;text-decoration:none;color:var(--color-text-muted);font-size:14px;border:1px solid transparent;transition:all var(--motion-fast) var(--ease-out)}.side-link:hover{background:var(--color-surface);color:var(--color-text)}.side-link.active{background:var(--color-brand-muted);border-color:rgba(255,69,0,.22);color:var(--color-text)}.main{min-width:0}.topbar{height:72px;border-bottom:1px solid var(--color-border);display:flex;align-items:center;justify-content:space-between;padding:0 var(--space-6);background:rgba(10,10,11,.54);backdrop-filter:blur(20px);position:sticky;top:0;z-index:30}.page{padding:var(--space-8) var(--space-6) var(--space-12)}.page-head{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--space-5);margin-bottom:var(--space-8)}.page-head p{max-width:620px;margin-top:var(--space-3);color:var(--color-text-muted)}.grid{display:grid;gap:var(--space-4)}.grid-2{grid-template-columns:2fr 1fr}.grid-3{grid-template-columns:repeat(3,1fr)}.grid-4{grid-template-columns:repeat(4,1fr)}.table-wrap{overflow:auto;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.74)}table{width:100%;border-collapse:collapse;min-width:900px}th{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase;text-align:left;font-weight:600;padding:18px 18px;border-bottom:1px solid var(--color-border)}td{font-size:14px;color:var(--color-text-muted);padding:18px;border-bottom:1px solid rgba(38,38,42,.7);vertical-align:middle}tr:last-child td{border-bottom:none}td strong{color:var(--color-text);font-weight:600}.input{min-height:44px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:rgba(20,20,22,.88);color:var(--color-text);padding:12px 14px;font-family:var(--font-body);font-size:14px}.toolbar{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:16px}.chip-row{display:flex;gap:8px;flex-wrap:wrap}.chip{min-height:38px;border-radius:var(--radius-full);border:1px solid var(--color-border);background:rgba(20,20,22,.74);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;padding:9px 12px;cursor:pointer;transition:all var(--motion-fast) var(--ease-out)}.chip:hover,.chip.active{border-color:rgba(255,69,0,.35);background:var(--color-brand-muted);color:var(--color-text)}
.motion-in{opacity:0;transform:translateY(20px);animation:rise 780ms var(--ease-out) forwards}.delay-1{animation-delay:80ms}.delay-2{animation-delay:160ms}.delay-3{animation-delay:240ms}.delay-4{animation-delay:320ms}.delay-5{animation-delay:400ms}.delay-6{animation-delay:480ms}@keyframes rise{to{opacity:1;transform:translateY(0)}}@keyframes breathe{0%,100%{transform:scale(1);opacity:.75}50%{transform:scale(1.08);opacity:1}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes scan{0%{transform:translateX(-100%)}100%{transform:translateX(260%)}}@keyframes grow{from{width:0}to{width:var(--w)}}@keyframes wave{0%,100%{height:8px}50%{height:34px}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes sweep{to{stroke-dashoffset:0}}@keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(255,69,0,.18)}50%{box-shadow:0 0 0 10px rgba(255,69,0,0)}}.scanline{position:relative;overflow:hidden}.scanline::after{content:"";position:absolute;top:0;bottom:0;width:120px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);animation:scan 3.8s var(--ease-in-out) infinite;pointer-events:none}.bars{display:flex;align-items:end;gap:4px;height:38px}.bars span{width:5px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.25));height:8px;animation:wave 1.1s var(--ease-in-out) infinite}.bars span:nth-child(2){animation-delay:.1s}.bars span:nth-child(3){animation-delay:.2s}.bars span:nth-child(4){animation-delay:.3s}.bars span:nth-child(5){animation-delay:.4s}.bars span:nth-child(6){animation-delay:.5s}.spark{height:8px;border-radius:999px;background:#24242A;overflow:hidden}.spark span{display:block;height:100%;width:var(--w);border-radius:inherit;background:linear-gradient(90deg,rgba(255,69,0,.32),var(--color-brand));animation:grow 900ms var(--ease-out) forwards}.row-motion{opacity:0;transform:translateY(14px);animation:rise 620ms var(--ease-out) forwards}.state-strip{margin-top:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.state-card{padding:16px;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.6);min-height:92px}.state-card h4{font-size:14px;margin-bottom:6px}.state-card p{font-size:13px;color:var(--color-text-muted);line-height:1.45}.mobile-tabs{display:none}
@media(max-width:1023px){.admin-layout{grid-template-columns:1fr}.sidebar{display:none}.topbar{height:auto;min-height:68px;padding:14px 20px}.page{padding:32px 20px 72px}.page-head{align-items:flex-start;flex-direction:column}.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}.toolbar{align-items:stretch;flex-direction:column}.mobile-tabs{display:flex;overflow:auto;gap:8px;margin:16px 0}.nav__inner{padding:14px 20px}.nav__actions .btn--ghost{display:none}.state-strip{grid-template-columns:1fr}.h1{font-size:clamp(44px,13vw,72px)}}
@media(max-width:767px){.container{padding:0 20px}.btn{width:100%}.page-head .btn{width:100%}.grid{gap:14px}.card{border-radius:14px}.table-wrap{margin-left:-4px;margin-right:-4px}.topbar .mono:last-child{display:none}.h2{font-size:32px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:1ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:1ms!important}}
</style>
<title>Signing you in — Basscally Club</title>
</head>
<body>
<nav class="nav" aria-label="Primary">
  <div class="nav__inner">
    <a href="/" class="brand"><span class="brand__mark">B</span>Basscally Club</a>
    <div class="nav__actions"><a href="/auth/login" class="btn btn--ghost">Back to sign in</a><a href="/" class="btn btn--secondary">Home</a></div>
  </div>
</nav>
<main class="callback-page">
  <section class="callback-hero container">
    <div class="callback-left motion-in">
      <span class="mono">// Auth callback</span>
      <h1 class="h1">Signing you into the Club.</h1>
      <p class="muted callback-copy">Hold on. We are checking your magic link, creating your session, and opening your dashboard.</p>
      <div class="callback-actions">
        <a class="btn btn--secondary" href="/auth/login">Use another email</a>
        <a class="btn btn--ghost" href="/">Return home</a>
      </div>
    </div>
    <div class="callback-stage card scanline motion-in delay-2" aria-label="Signing in status">
      <div class="vinyl-wrap" aria-hidden="true">
        <div class="vinyl">
          <div class="vinyl__ring"></div>
          <div class="vinyl__label"><span>B</span></div>
        </div>
        <div class="orbit-dot one"></div>
        <div class="orbit-dot two"></div>
      </div>
      <div class="bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
      <div class="status-line">
        <span class="status-dot"></span>
        <span>Magic link verified</span>
      </div>
    </div>
  </section>
  <section class="container motion-in delay-3">
    <div class="steps-card card">
      <div class="step active"><span>01</span><div><strong>Link checked</strong><p>Your secure sign-in link is valid.</p></div></div>
      <div class="step active"><span>02</span><div><strong>Session opening</strong><p>Supabase is preparing your member session.</p></div></div>
      <div class="step pending"><span>03</span><div><strong>Dashboard next</strong><p>You will land on the latest drop when the session is ready.</p></div></div>
    </div>
    <div class="state-strip">
      <div class="state-card"><h4>Loading state</h4><p>Use this default view while the callback route exchanges the magic link.</p></div>
      <div class="state-card"><h4>Success state</h4><p>Swap title to “You are in” and redirect to dashboard after 900ms.</p></div>
      <div class="state-card"><h4>Error state</h4><p>Show “This link expired” with Send new magic link as the primary CTA.</p></div>
    </div>
  </section>
</main>
<style>
.callback-page{min-height:calc(100vh - 65px);display:flex;flex-direction:column;justify-content:center;padding:64px 0}.callback-hero{display:grid;grid-template-columns:minmax(0,1.1fr)420px;gap:64px;align-items:center}.callback-copy{font-size:20px;max-width:560px;margin:24px 0 32px}.callback-actions{display:flex;gap:12px;flex-wrap:wrap}.callback-stage{min-height:520px;padding:32px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:26px;position:relative;overflow:hidden}.callback-stage::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 28%,rgba(255,69,0,.18),transparent 42%),linear-gradient(180deg,rgba(255,255,255,.035),transparent);pointer-events:none}.vinyl-wrap{position:relative;width:240px;height:240px;display:flex;align-items:center;justify-content:center;animation:float 5s var(--ease-in-out) infinite}.vinyl{width:210px;height:210px;border-radius:50%;background:radial-gradient(circle,#161618 0 17%,#0b0b0c 18% 27%,#1d1d21 28% 29%,#070708 30% 42%,#1d1d21 43% 44%,#080809 45% 100%);border:1px solid #303036;box-shadow:0 30px 70px rgba(0,0,0,.72),0 0 60px rgba(255,69,0,.08);animation:spin 7.5s linear infinite;position:relative}.vinyl__ring{position:absolute;inset:20px;border-radius:50%;border:1px solid rgba(255,255,255,.06)}.vinyl__label{position:absolute;inset:76px;border-radius:50%;background:var(--color-brand);display:flex;align-items:center;justify-content:center;color:white;font-family:var(--font-display);font-size:38px;font-weight:900;box-shadow:0 0 30px rgba(255,69,0,.28)}.orbit-dot{position:absolute;width:12px;height:12px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.75);animation:breathe 1.4s var(--ease-in-out) infinite}.orbit-dot.one{top:14px;right:68px}.orbit-dot.two{bottom:30px;left:58px;animation-delay:.45s}.status-line{position:relative;z-index:1;font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-muted);display:flex;align-items:center;gap:10px}.status-dot{width:8px;height:8px;border-radius:50%;background:var(--color-success);box-shadow:0 0 12px rgba(52,211,153,.7);animation:pulseGlow 1.5s infinite}.steps-card{padding:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.step{padding:18px;border-radius:var(--radius-md);background:rgba(6,6,7,.52);border:1px solid var(--color-border);display:flex;gap:14px;align-items:flex-start}.step>span{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.08em}.step strong{display:block;color:var(--color-text);font-size:15px;margin-bottom:4px}.step p{font-size:13px;color:var(--color-text-muted);line-height:1.45}.step.pending{opacity:.72}.step.pending>span{color:var(--color-text-dim)}@media(max-width:1023px){.callback-page{justify-content:flex-start;padding:48px 0 72px}.callback-hero{grid-template-columns:1fr;gap:32px}.callback-stage{min-height:360px}.steps-card{grid-template-columns:1fr}.callback-actions .btn{width:100%}.vinyl-wrap{width:210px;height:210px}.vinyl{width:180px;height:180px}.vinyl__label{inset:64px}}
</style>

<div class="grain" aria-hidden="true"></div>
</body>
</html>

```

## Screen 14: Admin Content List

Route: `/admin/content`
Reference file: `basscally-screen-14-admin-content-list-motion.html`
Purpose: Content table, filters, actions

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --color-brand:#FF4500;--color-brand-hover:#FF5C1F;--color-brand-muted:#2A1408;
  --color-bg:#0A0A0B;--color-surface:#141416;--color-surface-raised:#1C1C1F;--color-surface-sunken:#060607;
  --color-border:#26262A;--color-border-strong:#3A3A40;--color-text:#F5F5F7;--color-text-muted:#A1A1A8;--color-text-dim:#6B6B72;
  --color-success:#34D399;--color-warning:#FBBF24;--color-danger:#F87171;--color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif;--font-body:"Geist","Inter",-apple-system,sans-serif;--font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-sm:0 1px 2px rgba(0,0,0,.4);--shadow-md:0 4px 12px rgba(0,0,0,.5);--shadow-lg:0 18px 48px rgba(0,0,0,.72);--shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1);--ease-in-out:cubic-bezier(.65,0,.35,1);--motion-fast:150ms;--motion-default:250ms;--motion-slow:640ms;
}
*{box-sizing:border-box;margin:0;padding:0}html,body{min-height:100%;background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}body::before{content:"";position:fixed;inset:-20%;background:radial-gradient(circle at 16% 0%,rgba(255,69,0,.13),transparent 31%),radial-gradient(circle at 86% 16%,rgba(255,92,31,.08),transparent 26%),linear-gradient(180deg,#0A0A0B 0%,#060607 100%);z-index:-3}body::after{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at center,black 28%,transparent 78%);z-index:-2;pointer-events:none}.grain{position:fixed;inset:0;z-index:-1;opacity:.2;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E")}.container{max-width:1220px;margin:0 auto;padding:0 var(--space-5)}
a{color:inherit}.btn{font-family:var(--font-body);font-weight:600;font-size:14px;line-height:1;padding:12px 18px;border-radius:var(--radius-lg);border:1px solid transparent;cursor:pointer;transition:transform var(--motion-fast) var(--ease-out),background var(--motion-fast) var(--ease-out),border-color var(--motion-fast) var(--ease-out),box-shadow var(--motion-fast) var(--ease-out),color var(--motion-fast) var(--ease-out);text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;min-height:44px}.btn--primary{background:var(--color-brand);color:#fff}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-1px)}.btn--secondary{background:rgba(20,20,22,.7);border-color:var(--color-border-strong);color:var(--color-text)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.input:focus-visible,.chip:focus-visible,button:focus-visible{outline:2px solid rgba(255,69,0,.55);outline-offset:3px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:1px solid transparent}.badge--active{background:rgba(52,211,153,.12);color:var(--color-success);border-color:rgba(52,211,153,.22)}.badge--scheduled{background:rgba(96,165,250,.12);color:var(--color-info);border-color:rgba(96,165,250,.22)}.badge--draft{background:rgba(161,161,168,.10);color:var(--color-text-muted);border-color:rgba(161,161,168,.16)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.22)}.badge--warning{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.22)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border-color:rgba(255,69,0,.25)}.card{background:linear-gradient(180deg,rgba(28,28,31,.86),rgba(14,14,16,.9));border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:0 1px 0 rgba(255,255,255,.035) inset}.mono{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.h1{font-family:var(--font-display);font-size:clamp(40px,7vw,78px);font-weight:800;letter-spacing:-.045em;line-height:.94}.h2{font-family:var(--font-display);font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:-.035em;line-height:1}.muted{color:var(--color-text-muted)}.dim{color:var(--color-text-dim)}
.nav{position:sticky;top:0;z-index:50;background:rgba(10,10,11,.72);backdrop-filter:blur(24px) saturate(140%);border-bottom:1px solid rgba(38,38,42,.68)}.nav__inner{max-width:1320px;margin:0 auto;padding:18px var(--space-8);display:flex;align-items:center;justify-content:space-between;gap:16px}.brand{font-family:var(--font-display);font-weight:800;font-size:17px;text-decoration:none;display:flex;align-items:center;gap:10px}.brand__mark{width:28px;height:28px;border-radius:8px;background:var(--color-brand);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;box-shadow:0 0 28px rgba(255,69,0,.25)}.nav__actions{display:flex;gap:8px;align-items:center}
.admin-layout{display:grid;grid-template-columns:250px 1fr;min-height:100vh}.sidebar{position:sticky;top:0;height:100vh;border-right:1px solid var(--color-border);background:rgba(6,6,7,.74);backdrop-filter:blur(24px);padding:22px}.sidebar .brand{margin-bottom:34px}.side-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-text-dim);margin:22px 0 10px}.side-link{min-height:44px;padding:12px 14px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:space-between;text-decoration:none;color:var(--color-text-muted);font-size:14px;border:1px solid transparent;transition:all var(--motion-fast) var(--ease-out)}.side-link:hover{background:var(--color-surface);color:var(--color-text)}.side-link.active{background:var(--color-brand-muted);border-color:rgba(255,69,0,.22);color:var(--color-text)}.main{min-width:0}.topbar{height:72px;border-bottom:1px solid var(--color-border);display:flex;align-items:center;justify-content:space-between;padding:0 var(--space-6);background:rgba(10,10,11,.54);backdrop-filter:blur(20px);position:sticky;top:0;z-index:30}.page{padding:var(--space-8) var(--space-6) var(--space-12)}.page-head{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--space-5);margin-bottom:var(--space-8)}.page-head p{max-width:620px;margin-top:var(--space-3);color:var(--color-text-muted)}.grid{display:grid;gap:var(--space-4)}.grid-2{grid-template-columns:2fr 1fr}.grid-3{grid-template-columns:repeat(3,1fr)}.grid-4{grid-template-columns:repeat(4,1fr)}.table-wrap{overflow:auto;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.74)}table{width:100%;border-collapse:collapse;min-width:900px}th{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase;text-align:left;font-weight:600;padding:18px 18px;border-bottom:1px solid var(--color-border)}td{font-size:14px;color:var(--color-text-muted);padding:18px;border-bottom:1px solid rgba(38,38,42,.7);vertical-align:middle}tr:last-child td{border-bottom:none}td strong{color:var(--color-text);font-weight:600}.input{min-height:44px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:rgba(20,20,22,.88);color:var(--color-text);padding:12px 14px;font-family:var(--font-body);font-size:14px}.toolbar{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:16px}.chip-row{display:flex;gap:8px;flex-wrap:wrap}.chip{min-height:38px;border-radius:var(--radius-full);border:1px solid var(--color-border);background:rgba(20,20,22,.74);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;padding:9px 12px;cursor:pointer;transition:all var(--motion-fast) var(--ease-out)}.chip:hover,.chip.active{border-color:rgba(255,69,0,.35);background:var(--color-brand-muted);color:var(--color-text)}
.motion-in{opacity:0;transform:translateY(20px);animation:rise 780ms var(--ease-out) forwards}.delay-1{animation-delay:80ms}.delay-2{animation-delay:160ms}.delay-3{animation-delay:240ms}.delay-4{animation-delay:320ms}.delay-5{animation-delay:400ms}.delay-6{animation-delay:480ms}@keyframes rise{to{opacity:1;transform:translateY(0)}}@keyframes breathe{0%,100%{transform:scale(1);opacity:.75}50%{transform:scale(1.08);opacity:1}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes scan{0%{transform:translateX(-100%)}100%{transform:translateX(260%)}}@keyframes grow{from{width:0}to{width:var(--w)}}@keyframes wave{0%,100%{height:8px}50%{height:34px}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes sweep{to{stroke-dashoffset:0}}@keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(255,69,0,.18)}50%{box-shadow:0 0 0 10px rgba(255,69,0,0)}}.scanline{position:relative;overflow:hidden}.scanline::after{content:"";position:absolute;top:0;bottom:0;width:120px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);animation:scan 3.8s var(--ease-in-out) infinite;pointer-events:none}.bars{display:flex;align-items:end;gap:4px;height:38px}.bars span{width:5px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.25));height:8px;animation:wave 1.1s var(--ease-in-out) infinite}.bars span:nth-child(2){animation-delay:.1s}.bars span:nth-child(3){animation-delay:.2s}.bars span:nth-child(4){animation-delay:.3s}.bars span:nth-child(5){animation-delay:.4s}.bars span:nth-child(6){animation-delay:.5s}.spark{height:8px;border-radius:999px;background:#24242A;overflow:hidden}.spark span{display:block;height:100%;width:var(--w);border-radius:inherit;background:linear-gradient(90deg,rgba(255,69,0,.32),var(--color-brand));animation:grow 900ms var(--ease-out) forwards}.row-motion{opacity:0;transform:translateY(14px);animation:rise 620ms var(--ease-out) forwards}.state-strip{margin-top:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.state-card{padding:16px;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.6);min-height:92px}.state-card h4{font-size:14px;margin-bottom:6px}.state-card p{font-size:13px;color:var(--color-text-muted);line-height:1.45}.mobile-tabs{display:none}
@media(max-width:1023px){.admin-layout{grid-template-columns:1fr}.sidebar{display:none}.topbar{height:auto;min-height:68px;padding:14px 20px}.page{padding:32px 20px 72px}.page-head{align-items:flex-start;flex-direction:column}.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}.toolbar{align-items:stretch;flex-direction:column}.mobile-tabs{display:flex;overflow:auto;gap:8px;margin:16px 0}.nav__inner{padding:14px 20px}.nav__actions .btn--ghost{display:none}.state-strip{grid-template-columns:1fr}.h1{font-size:clamp(44px,13vw,72px)}}
@media(max-width:767px){.container{padding:0 20px}.btn{width:100%}.page-head .btn{width:100%}.grid{gap:14px}.card{border-radius:14px}.table-wrap{margin-left:-4px;margin-right:-4px}.topbar .mono:last-child{display:none}.h2{font-size:32px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:1ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:1ms!important}}
</style>
<title>Content drops — Basscally Admin</title></head><body>
<div class="admin-layout">
<aside class="sidebar">
  <a href="/admin" class="brand"><span class="brand__mark">B</span>Basscally Admin</a>
  <div class="side-label">Operate</div>
  <a class="side-link " href="/admin">Metrics<span>⌁</span></a>
  <a class="side-link active" href="/admin/content">Content<span>⌁</span></a>
  <a class="side-link " href="/admin/subscribers">Subscribers<span>⌁</span></a>
  <a class="side-link" href="/admin/email-logs">Email logs<span>⌁</span></a>
  <div class="side-label">System</div>
  <a class="side-link" href="/admin/settings">Settings<span>⌁</span></a>
</aside>
  <main class="main">
<header class="topbar"><div><span class="mono">Screen</span> <span class="badge badge--brand">14 · Content</span></div><div class="mono">Last updated: just now</div></header>
    <div class="mobile-tabs"><a class="chip" href="/admin">Metrics</a><a class="chip active" href="/admin/content">Content</a><a class="chip" href="/admin/subscribers">Subscribers</a></div>
    <section class="page">
      <div class="page-head motion-in">
        <div><span class="mono">// Admin content</span><h1 class="h1">Content drops.</h1><p>Publish, schedule, edit, and resend drop emails from one clean operating surface.</p></div>
        <a class="btn btn--primary" href="/admin/content/new">New drop</a>
      </div>
      <div class="grid grid-4 motion-in delay-1">
        <div class="metric card"><span class="mono">Published</span><strong>28</strong><div class="spark"><span style="--w:82%"></span></div></div>
        <div class="metric card"><span class="mono">Scheduled</span><strong>4</strong><div class="spark"><span style="--w:48%"></span></div></div>
        <div class="metric card"><span class="mono">Drafts</span><strong>2</strong><div class="spark"><span style="--w:26%"></span></div></div>
        <div class="metric card"><span class="mono">Email retries</span><strong>3</strong><div class="spark danger"><span style="--w:18%"></span></div></div>
      </div>
      <div class="content-layout motion-in delay-2">
        <section>
          <div class="toolbar">
            <div class="chip-row"><button class="chip active">All</button><button class="chip">Published</button><button class="chip">Scheduled</button><button class="chip">Draft</button><button class="chip">Needs email</button></div>
            <label><span class="mono" style="position:absolute;left:-9999px">Search drops</span><input class="input" placeholder="Search drops..." /></label>
          </div>
          <div class="table-wrap scanline">
            <table>
              <thead><tr><th>Title</th><th>Type</th><th>Difficulty</th><th>Status</th><th>Publish date</th><th>Email</th><th>Actions</th></tr></thead>
              <tbody>
                <tr class="row-motion" style="animation-delay:120ms"><td><strong>Funk slap pattern in E</strong><br><span class="dim">2 min loop, right-hand pocket</span></td><td>Groove</td><td><span class="badge badge--active">Beginner</span></td><td><span class="badge badge--active">Published</span></td><td>May 13, 2026</td><td>142 / 147</td><td><button class="btn btn--ghost">Edit</button><button class="btn btn--ghost">Resend</button></td></tr>
                <tr class="row-motion" style="animation-delay:190ms"><td><strong>Bass-less: D’Angelo, Untitled</strong><br><span class="dim">Full cover without bass</span></td><td>Cover</td><td><span class="badge badge--warning">Intermediate</span></td><td><span class="badge badge--active">Published</span></td><td>May 10, 2026</td><td>139 / 144</td><td><button class="btn btn--ghost">Edit</button><button class="btn btn--ghost">Resend</button></td></tr>
                <tr class="row-motion" style="animation-delay:260ms"><td><strong>Ghost-note fill, 16th-note pocket</strong><br><span class="dim">Advanced fill, tight transition</span></td><td>Fill</td><td><span class="badge badge--danger">Advanced</span></td><td><span class="badge badge--scheduled">Scheduled</span></td><td>May 20, 2026</td><td>Queued</td><td><button class="btn btn--ghost">Edit</button><button class="btn btn--ghost">Publish</button></td></tr>
                <tr class="row-motion" style="animation-delay:330ms"><td><strong>Play the root, then improvise</strong><br><span class="dim">Practice challenge for timing</span></td><td>Challenge</td><td><span class="badge badge--warning">Intermediate</span></td><td><span class="badge badge--draft">Draft</span></td><td>Not set</td><td>Not sent</td><td><button class="btn btn--ghost">Edit</button><button class="btn btn--ghost">Delete</button></td></tr>
                <tr class="row-motion" style="animation-delay:400ms"><td><strong>Minor pentatonic run in A</strong><br><span class="dim">One-bar phrase for clean endings</span></td><td>Groove</td><td><span class="badge badge--active">Beginner</span></td><td><span class="badge badge--active">Published</span></td><td>May 7, 2026</td><td>136 / 140</td><td><button class="btn btn--ghost">Edit</button><button class="btn btn--ghost">Resend</button></td></tr>
              </tbody>
            </table>
          </div>
          <div class="state-strip"><div class="state-card"><h4>Loading</h4><p>Rows enter with staggered skeleton shimmer while content loads.</p></div><div class="state-card"><h4>Empty search</h4><p>Show “No drops match this filter” and Reset filters.</p></div><div class="state-card"><h4>Error</h4><p>Show “Something broke. Try again?” with Retry.</p></div></div>
        </section>
        <aside class="queue card scanline">
          <span class="mono">// Publishing queue</span>
          <h2 class="h2">Next drop in<br><span>02d : 14h</span></h2>
          <div class="queue-ring" aria-hidden="true"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48"></circle><circle class="progress" cx="60" cy="60" r="48"></circle></svg><strong>71%</strong></div>
          <div class="queue-list"><div><span class="q-dot hot"></span><strong>Ghost-note fill</strong><p>Auto-publish Tuesday, 9:00 AM</p></div><div><span class="q-dot"></span><strong>Email queued</strong><p>147 active members selected</p></div><div><span class="q-dot"></span><strong>Storage ready</strong><p>Private audio key detected</p></div></div>
        </aside>
      </div>
    </section>
  </main>
</div>
<style>.metric{padding:22px}.metric strong{display:block;font-family:var(--font-display);font-size:34px;line-height:1;margin:12px 0;color:var(--color-text)}.metric .danger span{background:linear-gradient(90deg,rgba(248,113,113,.3),var(--color-danger))}.content-layout{display:grid;grid-template-columns:minmax(0,1fr)340px;gap:16px;margin-top:16px}.queue{padding:24px;position:relative;overflow:hidden}.queue .h2{font-size:34px;margin:18px 0 8px}.queue .h2 span{color:var(--color-brand)}.queue-ring{width:178px;height:178px;margin:28px auto;position:relative;display:grid;place-items:center}.queue-ring svg{position:absolute;inset:0;transform:rotate(-90deg)}.queue-ring circle{fill:none;stroke:#25252b;stroke-width:10}.queue-ring .progress{stroke:var(--color-brand);stroke-linecap:round;stroke-dasharray:302;stroke-dashoffset:302;animation:sweep 1.8s var(--ease-out) forwards}.queue-ring strong{font-family:var(--font-display);font-size:32px}.queue-list{display:flex;flex-direction:column;gap:16px}.queue-list>div{padding:14px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:rgba(6,6,7,.42);position:relative}.queue-list strong{display:block;font-size:14px}.queue-list p{font-size:13px;color:var(--color-text-muted);margin-top:2px}.q-dot{position:absolute;right:14px;top:18px;width:8px;height:8px;border-radius:50%;background:var(--color-text-dim)}.q-dot.hot{background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.8);animation:breathe 1.2s infinite}@media(max-width:1180px){.content-layout{grid-template-columns:1fr}.queue-ring{margin:22px 0}}
</style>
</body></html>
```

## Screen 15: Admin Subscribers

Route: `/admin/subscribers`
Reference file: `basscally-screen-15-admin-subscribers-list-motion.html`
Purpose: Subscriber table, filters, export

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --color-brand:#FF4500;--color-brand-hover:#FF5C1F;--color-brand-muted:#2A1408;
  --color-bg:#0A0A0B;--color-surface:#141416;--color-surface-raised:#1C1C1F;--color-surface-sunken:#060607;
  --color-border:#26262A;--color-border-strong:#3A3A40;--color-text:#F5F5F7;--color-text-muted:#A1A1A8;--color-text-dim:#6B6B72;
  --color-success:#34D399;--color-warning:#FBBF24;--color-danger:#F87171;--color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif;--font-body:"Geist","Inter",-apple-system,sans-serif;--font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-sm:0 1px 2px rgba(0,0,0,.4);--shadow-md:0 4px 12px rgba(0,0,0,.5);--shadow-lg:0 18px 48px rgba(0,0,0,.72);--shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1);--ease-in-out:cubic-bezier(.65,0,.35,1);--motion-fast:150ms;--motion-default:250ms;--motion-slow:640ms;
}
*{box-sizing:border-box;margin:0;padding:0}html,body{min-height:100%;background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}body::before{content:"";position:fixed;inset:-20%;background:radial-gradient(circle at 16% 0%,rgba(255,69,0,.13),transparent 31%),radial-gradient(circle at 86% 16%,rgba(255,92,31,.08),transparent 26%),linear-gradient(180deg,#0A0A0B 0%,#060607 100%);z-index:-3}body::after{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at center,black 28%,transparent 78%);z-index:-2;pointer-events:none}.grain{position:fixed;inset:0;z-index:-1;opacity:.2;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E")}.container{max-width:1220px;margin:0 auto;padding:0 var(--space-5)}
a{color:inherit}.btn{font-family:var(--font-body);font-weight:600;font-size:14px;line-height:1;padding:12px 18px;border-radius:var(--radius-lg);border:1px solid transparent;cursor:pointer;transition:transform var(--motion-fast) var(--ease-out),background var(--motion-fast) var(--ease-out),border-color var(--motion-fast) var(--ease-out),box-shadow var(--motion-fast) var(--ease-out),color var(--motion-fast) var(--ease-out);text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;min-height:44px}.btn--primary{background:var(--color-brand);color:#fff}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-1px)}.btn--secondary{background:rgba(20,20,22,.7);border-color:var(--color-border-strong);color:var(--color-text)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.input:focus-visible,.chip:focus-visible,button:focus-visible{outline:2px solid rgba(255,69,0,.55);outline-offset:3px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:1px solid transparent}.badge--active{background:rgba(52,211,153,.12);color:var(--color-success);border-color:rgba(52,211,153,.22)}.badge--scheduled{background:rgba(96,165,250,.12);color:var(--color-info);border-color:rgba(96,165,250,.22)}.badge--draft{background:rgba(161,161,168,.10);color:var(--color-text-muted);border-color:rgba(161,161,168,.16)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.22)}.badge--warning{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.22)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border-color:rgba(255,69,0,.25)}.card{background:linear-gradient(180deg,rgba(28,28,31,.86),rgba(14,14,16,.9));border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:0 1px 0 rgba(255,255,255,.035) inset}.mono{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.h1{font-family:var(--font-display);font-size:clamp(40px,7vw,78px);font-weight:800;letter-spacing:-.045em;line-height:.94}.h2{font-family:var(--font-display);font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:-.035em;line-height:1}.muted{color:var(--color-text-muted)}.dim{color:var(--color-text-dim)}
.nav{position:sticky;top:0;z-index:50;background:rgba(10,10,11,.72);backdrop-filter:blur(24px) saturate(140%);border-bottom:1px solid rgba(38,38,42,.68)}.nav__inner{max-width:1320px;margin:0 auto;padding:18px var(--space-8);display:flex;align-items:center;justify-content:space-between;gap:16px}.brand{font-family:var(--font-display);font-weight:800;font-size:17px;text-decoration:none;display:flex;align-items:center;gap:10px}.brand__mark{width:28px;height:28px;border-radius:8px;background:var(--color-brand);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;box-shadow:0 0 28px rgba(255,69,0,.25)}.nav__actions{display:flex;gap:8px;align-items:center}
.admin-layout{display:grid;grid-template-columns:250px 1fr;min-height:100vh}.sidebar{position:sticky;top:0;height:100vh;border-right:1px solid var(--color-border);background:rgba(6,6,7,.74);backdrop-filter:blur(24px);padding:22px}.sidebar .brand{margin-bottom:34px}.side-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-text-dim);margin:22px 0 10px}.side-link{min-height:44px;padding:12px 14px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:space-between;text-decoration:none;color:var(--color-text-muted);font-size:14px;border:1px solid transparent;transition:all var(--motion-fast) var(--ease-out)}.side-link:hover{background:var(--color-surface);color:var(--color-text)}.side-link.active{background:var(--color-brand-muted);border-color:rgba(255,69,0,.22);color:var(--color-text)}.main{min-width:0}.topbar{height:72px;border-bottom:1px solid var(--color-border);display:flex;align-items:center;justify-content:space-between;padding:0 var(--space-6);background:rgba(10,10,11,.54);backdrop-filter:blur(20px);position:sticky;top:0;z-index:30}.page{padding:var(--space-8) var(--space-6) var(--space-12)}.page-head{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--space-5);margin-bottom:var(--space-8)}.page-head p{max-width:620px;margin-top:var(--space-3);color:var(--color-text-muted)}.grid{display:grid;gap:var(--space-4)}.grid-2{grid-template-columns:2fr 1fr}.grid-3{grid-template-columns:repeat(3,1fr)}.grid-4{grid-template-columns:repeat(4,1fr)}.table-wrap{overflow:auto;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.74)}table{width:100%;border-collapse:collapse;min-width:900px}th{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase;text-align:left;font-weight:600;padding:18px 18px;border-bottom:1px solid var(--color-border)}td{font-size:14px;color:var(--color-text-muted);padding:18px;border-bottom:1px solid rgba(38,38,42,.7);vertical-align:middle}tr:last-child td{border-bottom:none}td strong{color:var(--color-text);font-weight:600}.input{min-height:44px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:rgba(20,20,22,.88);color:var(--color-text);padding:12px 14px;font-family:var(--font-body);font-size:14px}.toolbar{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:16px}.chip-row{display:flex;gap:8px;flex-wrap:wrap}.chip{min-height:38px;border-radius:var(--radius-full);border:1px solid var(--color-border);background:rgba(20,20,22,.74);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;padding:9px 12px;cursor:pointer;transition:all var(--motion-fast) var(--ease-out)}.chip:hover,.chip.active{border-color:rgba(255,69,0,.35);background:var(--color-brand-muted);color:var(--color-text)}
.motion-in{opacity:0;transform:translateY(20px);animation:rise 780ms var(--ease-out) forwards}.delay-1{animation-delay:80ms}.delay-2{animation-delay:160ms}.delay-3{animation-delay:240ms}.delay-4{animation-delay:320ms}.delay-5{animation-delay:400ms}.delay-6{animation-delay:480ms}@keyframes rise{to{opacity:1;transform:translateY(0)}}@keyframes breathe{0%,100%{transform:scale(1);opacity:.75}50%{transform:scale(1.08);opacity:1}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes scan{0%{transform:translateX(-100%)}100%{transform:translateX(260%)}}@keyframes grow{from{width:0}to{width:var(--w)}}@keyframes wave{0%,100%{height:8px}50%{height:34px}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes sweep{to{stroke-dashoffset:0}}@keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(255,69,0,.18)}50%{box-shadow:0 0 0 10px rgba(255,69,0,0)}}.scanline{position:relative;overflow:hidden}.scanline::after{content:"";position:absolute;top:0;bottom:0;width:120px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);animation:scan 3.8s var(--ease-in-out) infinite;pointer-events:none}.bars{display:flex;align-items:end;gap:4px;height:38px}.bars span{width:5px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.25));height:8px;animation:wave 1.1s var(--ease-in-out) infinite}.bars span:nth-child(2){animation-delay:.1s}.bars span:nth-child(3){animation-delay:.2s}.bars span:nth-child(4){animation-delay:.3s}.bars span:nth-child(5){animation-delay:.4s}.bars span:nth-child(6){animation-delay:.5s}.spark{height:8px;border-radius:999px;background:#24242A;overflow:hidden}.spark span{display:block;height:100%;width:var(--w);border-radius:inherit;background:linear-gradient(90deg,rgba(255,69,0,.32),var(--color-brand));animation:grow 900ms var(--ease-out) forwards}.row-motion{opacity:0;transform:translateY(14px);animation:rise 620ms var(--ease-out) forwards}.state-strip{margin-top:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.state-card{padding:16px;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.6);min-height:92px}.state-card h4{font-size:14px;margin-bottom:6px}.state-card p{font-size:13px;color:var(--color-text-muted);line-height:1.45}.mobile-tabs{display:none}
@media(max-width:1023px){.admin-layout{grid-template-columns:1fr}.sidebar{display:none}.topbar{height:auto;min-height:68px;padding:14px 20px}.page{padding:32px 20px 72px}.page-head{align-items:flex-start;flex-direction:column}.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}.toolbar{align-items:stretch;flex-direction:column}.mobile-tabs{display:flex;overflow:auto;gap:8px;margin:16px 0}.nav__inner{padding:14px 20px}.nav__actions .btn--ghost{display:none}.state-strip{grid-template-columns:1fr}.h1{font-size:clamp(44px,13vw,72px)}}
@media(max-width:767px){.container{padding:0 20px}.btn{width:100%}.page-head .btn{width:100%}.grid{gap:14px}.card{border-radius:14px}.table-wrap{margin-left:-4px;margin-right:-4px}.topbar .mono:last-child{display:none}.h2{font-size:32px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:1ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:1ms!important}}
</style>
<title>Subscribers — Basscally Admin</title></head><body>
<div class="admin-layout">
<aside class="sidebar">
  <a href="/admin" class="brand"><span class="brand__mark">B</span>Basscally Admin</a>
  <div class="side-label">Operate</div>
  <a class="side-link " href="/admin">Metrics<span>⌁</span></a>
  <a class="side-link " href="/admin/content">Content<span>⌁</span></a>
  <a class="side-link active" href="/admin/subscribers">Subscribers<span>⌁</span></a>
  <a class="side-link" href="/admin/email-logs">Email logs<span>⌁</span></a>
  <div class="side-label">System</div>
  <a class="side-link" href="/admin/settings">Settings<span>⌁</span></a>
</aside>
  <main class="main">
<header class="topbar"><div><span class="mono">Screen</span> <span class="badge badge--brand">15 · Subscribers</span></div><div class="mono">Last updated: just now</div></header>
    <div class="mobile-tabs"><a class="chip" href="/admin">Metrics</a><a class="chip" href="/admin/content">Content</a><a class="chip active" href="/admin/subscribers">Subscribers</a></div>
    <section class="page">
      <div class="page-head motion-in">
        <div><span class="mono">// Member base</span><h1 class="h1">Subscribers.</h1><p>Track active members, founding members, payment status, countries, and recent email activity.</p></div>
        <a class="btn btn--secondary" href="#">Export CSV</a>
      </div>
      <div class="grid grid-4 motion-in delay-1">
        <div class="metric card"><span class="mono">Active</span><strong>147</strong><div class="spark"><span style="--w:78%"></span></div></div>
        <div class="metric card"><span class="mono">Founding</span><strong>147 / 500</strong><div class="spark"><span style="--w:29%"></span></div></div>
        <div class="metric card"><span class="mono">Past due</span><strong>3</strong><div class="spark danger"><span style="--w:16%"></span></div></div>
        <div class="metric card"><span class="mono">Countries</span><strong>18</strong><div class="spark"><span style="--w:54%"></span></div></div>
      </div>
      <div class="sub-layout motion-in delay-2">
        <section>
          <div class="toolbar">
            <div class="chip-row"><button class="chip active">All</button><button class="chip">Active</button><button class="chip">Founding</button><button class="chip">Past due</button><button class="chip">Expired</button></div>
            <label><span class="mono" style="position:absolute;left:-9999px">Search subscribers</span><input class="input" placeholder="Search email or country..." /></label>
          </div>
          <div class="table-wrap scanline">
            <table>
              <thead><tr><th>Email</th><th>Country</th><th>Status</th><th>Plan</th><th>Joined</th><th>Last email</th><th>Actions</th></tr></thead>
              <tbody>
                <tr class="row-motion" style="animation-delay:120ms"><td><strong>michael@example.com</strong><br><span class="dim">Founding member</span></td><td>Nigeria</td><td><span class="badge badge--active">Active</span></td><td>$1.50/mo</td><td>May 13</td><td>Opened</td><td><button class="btn btn--ghost">View</button><button class="btn btn--ghost">Email</button></td></tr>
                <tr class="row-motion" style="animation-delay:190ms"><td><strong>chrisfan42@gmail.com</strong><br><span class="dim">Downloaded 8 drops</span></td><td>United Kingdom</td><td><span class="badge badge--active">Active</span></td><td>$1.50/mo</td><td>May 12</td><td>Clicked</td><td><button class="btn btn--ghost">View</button><button class="btn btn--ghost">Email</button></td></tr>
                <tr class="row-motion" style="animation-delay:260ms"><td><strong>groovekeeper@icloud.com</strong><br><span class="dim">Card update needed</span></td><td>Brazil</td><td><span class="badge badge--warning">Past due</span></td><td>$1.50/mo</td><td>May 11</td><td>Sent</td><td><button class="btn btn--ghost">View</button><button class="btn btn--ghost">Retry</button></td></tr>
                <tr class="row-motion" style="animation-delay:330ms"><td><strong>basslines.jp@mail.com</strong><br><span class="dim">Founding member</span></td><td>Japan</td><td><span class="badge badge--active">Active</span></td><td>$1.50/mo</td><td>May 10</td><td>Opened</td><td><button class="btn btn--ghost">View</button><button class="btn btn--ghost">Email</button></td></tr>
                <tr class="row-motion" style="animation-delay:400ms"><td><strong>lowendstudent@yahoo.com</strong><br><span class="dim">No downloads yet</span></td><td>South Africa</td><td><span class="badge badge--active">Active</span></td><td>$1.50/mo</td><td>May 9</td><td>Queued</td><td><button class="btn btn--ghost">View</button><button class="btn btn--ghost">Email</button></td></tr>
              </tbody>
            </table>
          </div>
          <div class="state-strip"><div class="state-card"><h4>Loading</h4><p>Skeleton rows appear while subscriber data loads.</p></div><div class="state-card"><h4>Empty</h4><p>“No subscribers yet” with link to launch checklist.</p></div><div class="state-card"><h4>Error</h4><p>“Something broke. Try again?” with Retry.</p></div></div>
        </section>
        <aside class="intel card scanline">
          <span class="mono">// Subscriber signal</span>
          <h2 class="h2">Where the pocket is forming.</h2>
          <div class="map-card" aria-hidden="true"><div class="ring r1"></div><div class="ring r2"></div><span class="pin p1"></span><span class="pin p2"></span><span class="pin p3"></span><span class="pin p4"></span><strong>18</strong><em>countries</em></div>
          <div class="country-bars">
            <div><span>Nigeria</span><div><i style="--w:74%"></i></div><b>32</b></div>
            <div><span>UK</span><div><i style="--w:61%"></i></div><b>26</b></div>
            <div><span>Brazil</span><div><i style="--w:38%"></i></div><b>16</b></div>
            <div><span>Japan</span><div><i style="--w:28%"></i></div><b>12</b></div>
          </div>
          <div class="attention"><span class="badge badge--warning">3 past due</span><p>Members keep access until period end. Send card update email before expiry.</p></div>
        </aside>
      </div>
    </section>
  </main>
</div>
<style>.metric{padding:22px}.metric strong{display:block;font-family:var(--font-display);font-size:32px;line-height:1;margin:12px 0;color:var(--color-text)}.metric .danger span{background:linear-gradient(90deg,rgba(251,191,36,.25),var(--color-warning))}.sub-layout{display:grid;grid-template-columns:minmax(0,1fr)360px;gap:16px;margin-top:16px}.intel{padding:24px;overflow:hidden;position:relative}.intel .h2{font-size:32px;margin:18px 0 24px}.map-card{height:220px;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:radial-gradient(circle at 50% 46%,rgba(255,69,0,.13),transparent 38%),rgba(6,6,7,.52);position:relative;display:grid;place-items:center;overflow:hidden;margin-bottom:20px}.map-card .ring{position:absolute;border:1px solid rgba(255,69,0,.18);border-radius:50%;animation:breathe 2.6s infinite}.map-card .r1{width:120px;height:120px}.map-card .r2{width:188px;height:188px;animation-delay:.4s}.map-card strong{font-family:var(--font-display);font-size:58px;line-height:1;position:relative}.map-card em{position:absolute;bottom:54px;font-family:var(--font-mono);font-style:normal;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.pin{position:absolute;width:10px;height:10px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.8);animation:pulseGlow 1.7s infinite}.p1{top:46px;left:62px}.p2{top:82px;right:72px;animation-delay:.2s}.p3{bottom:58px;left:96px;animation-delay:.4s}.p4{bottom:82px;right:112px;animation-delay:.6s}.country-bars{display:flex;flex-direction:column;gap:13px}.country-bars>div{display:grid;grid-template-columns:74px 1fr 28px;align-items:center;gap:12px;font-size:13px;color:var(--color-text-muted)}.country-bars div div{height:8px;background:#24242a;border-radius:999px;overflow:hidden}.country-bars i{display:block;height:100%;width:var(--w);background:linear-gradient(90deg,rgba(255,69,0,.3),var(--color-brand));border-radius:999px;animation:grow 1.2s var(--ease-out) forwards}.country-bars b{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);font-weight:500}.attention{margin-top:24px;padding:16px;border-radius:var(--radius-md);border:1px solid rgba(251,191,36,.18);background:rgba(251,191,36,.06)}.attention p{font-size:13px;color:var(--color-text-muted);margin-top:10px;line-height:1.45}@media(max-width:1180px){.sub-layout{grid-template-columns:1fr}}
</style>
</body></html>
```

## Screen 16: Email Delivery Logs

Route: `/admin/email-logs`
Reference file: `basscally-screen-16-email-delivery-logs-motion.html`
Purpose: Queue and delivery statuses

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --color-brand:#FF4500;--color-brand-hover:#FF5C1F;--color-brand-muted:#2A1408;
  --color-bg:#0A0A0B;--color-surface:#141416;--color-surface-raised:#1C1C1F;--color-surface-sunken:#060607;
  --color-border:#26262A;--color-border-strong:#3A3A40;--color-text:#F5F5F7;--color-text-muted:#A1A1A8;--color-text-dim:#6B6B72;
  --color-success:#34D399;--color-warning:#FBBF24;--color-danger:#F87171;--color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif;--font-body:"Geist","Inter",-apple-system,sans-serif;--font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-sm:0 1px 2px rgba(0,0,0,.4);--shadow-md:0 4px 12px rgba(0,0,0,.5);--shadow-lg:0 18px 48px rgba(0,0,0,.72);--shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1);--ease-in-out:cubic-bezier(.65,0,.35,1);--motion-fast:150ms;--motion-default:250ms;--motion-slow:640ms;
}
*{box-sizing:border-box;margin:0;padding:0}html,body{min-height:100%;background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}body::before{content:"";position:fixed;inset:-20%;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.15),transparent 32%),radial-gradient(circle at 86% 8%,rgba(255,92,31,.09),transparent 26%),linear-gradient(180deg,#0A0A0B 0%,#060607 100%);z-index:-3}body::after{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at center,black 28%,transparent 78%);z-index:-2;pointer-events:none}.grain{position:fixed;inset:0;z-index:-1;opacity:.18;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E")}
a{color:inherit}.btn{font-family:var(--font-body);font-weight:600;font-size:14px;line-height:1;padding:12px 18px;border-radius:var(--radius-lg);border:1px solid transparent;cursor:pointer;transition:transform var(--motion-fast) var(--ease-out),background var(--motion-fast) var(--ease-out),border-color var(--motion-fast) var(--ease-out),box-shadow var(--motion-fast) var(--ease-out),color var(--motion-fast) var(--ease-out);text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;min-height:44px}.btn--primary{background:var(--color-brand);color:#fff}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-1px)}.btn--secondary{background:rgba(20,20,22,.74);border-color:var(--color-border-strong);color:var(--color-text)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.input:focus-visible,.chip:focus-visible,button:focus-visible,a:focus-visible{outline:2px solid rgba(255,69,0,.55);outline-offset:3px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:1px solid transparent}.badge--active{background:rgba(52,211,153,.12);color:var(--color-success);border-color:rgba(52,211,153,.22)}.badge--scheduled{background:rgba(96,165,250,.12);color:var(--color-info);border-color:rgba(96,165,250,.22)}.badge--draft{background:rgba(161,161,168,.10);color:var(--color-text-muted);border-color:rgba(161,161,168,.16)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.22)}.badge--warning{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.22)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border-color:rgba(255,69,0,.25)}.card{background:linear-gradient(180deg,rgba(28,28,31,.86),rgba(14,14,16,.92));border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:0 1px 0 rgba(255,255,255,.035) inset}.mono{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.h1{font-family:var(--font-display);font-size:clamp(40px,7vw,78px);font-weight:800;letter-spacing:-.045em;line-height:.94}.h2{font-family:var(--font-display);font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:-.035em;line-height:1}.muted{color:var(--color-text-muted)}.dim{color:var(--color-text-dim)}
.admin-layout{display:grid;grid-template-columns:250px 1fr;min-height:100vh}.sidebar{position:sticky;top:0;height:100vh;border-right:1px solid var(--color-border);background:rgba(6,6,7,.76);backdrop-filter:blur(24px);padding:22px}.brand{font-family:var(--font-display);font-weight:800;font-size:17px;text-decoration:none;display:flex;align-items:center;gap:10px}.brand__mark{width:28px;height:28px;border-radius:8px;background:var(--color-brand);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;box-shadow:0 0 28px rgba(255,69,0,.25)}.sidebar .brand{margin-bottom:34px}.side-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-text-dim);margin:22px 0 10px}.side-link{min-height:44px;padding:12px 14px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:space-between;text-decoration:none;color:var(--color-text-muted);font-size:14px;border:1px solid transparent;transition:all var(--motion-fast) var(--ease-out)}.side-link:hover{background:var(--color-surface);color:var(--color-text)}.side-link.active{background:var(--color-brand-muted);border-color:rgba(255,69,0,.22);color:var(--color-text)}.main{min-width:0}.topbar{height:72px;border-bottom:1px solid var(--color-border);display:flex;align-items:center;justify-content:space-between;padding:0 var(--space-6);background:rgba(10,10,11,.54);backdrop-filter:blur(20px);position:sticky;top:0;z-index:30}.page{padding:var(--space-8) var(--space-6) var(--space-12)}.page-head{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--space-5);margin-bottom:var(--space-8)}.page-head p{max-width:620px;margin-top:var(--space-3);color:var(--color-text-muted)}.grid{display:grid;gap:var(--space-4)}.grid-2{grid-template-columns:2fr 1fr}.grid-3{grid-template-columns:repeat(3,1fr)}.grid-4{grid-template-columns:repeat(4,1fr)}.table-wrap{overflow:auto;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.74)}table{width:100%;border-collapse:collapse;min-width:900px}th{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase;text-align:left;font-weight:600;padding:18px 18px;border-bottom:1px solid var(--color-border)}td{font-size:14px;color:var(--color-text-muted);padding:18px;border-bottom:1px solid rgba(38,38,42,.7);vertical-align:middle}tr:last-child td{border-bottom:none}td strong{color:var(--color-text);font-weight:600}.input{min-height:44px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:rgba(20,20,22,.88);color:var(--color-text);padding:12px 14px;font-family:var(--font-body);font-size:14px}.toolbar{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:16px}.chip-row{display:flex;gap:8px;flex-wrap:wrap}.chip{min-height:38px;border-radius:var(--radius-full);border:1px solid var(--color-border);background:rgba(20,20,22,.74);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;padding:9px 12px;cursor:pointer;transition:all var(--motion-fast) var(--ease-out);text-decoration:none}.chip:hover,.chip.active{border-color:rgba(255,69,0,.35);background:var(--color-brand-muted);color:var(--color-text)}
.member-shell{min-height:100vh}.member-nav{position:sticky;top:0;z-index:50;background:rgba(10,10,11,.72);backdrop-filter:blur(24px) saturate(140%);border-bottom:1px solid rgba(38,38,42,.68)}.member-nav__inner{max-width:1220px;margin:0 auto;padding:18px var(--space-5);display:flex;align-items:center;justify-content:space-between;gap:16px}.member-nav__links{display:flex;align-items:center;gap:6px}.container{max-width:1220px;margin:0 auto;padding:0 var(--space-5)}.member-page{padding:var(--space-8) 0 var(--space-12)}
.motion-in{opacity:0;transform:translateY(22px);animation:rise 780ms var(--ease-out) forwards}.delay-1{animation-delay:80ms}.delay-2{animation-delay:160ms}.delay-3{animation-delay:240ms}.delay-4{animation-delay:320ms}.delay-5{animation-delay:400ms}.row-motion{opacity:0;transform:translateX(-12px);animation:slideRow 620ms var(--ease-out) forwards}@keyframes rise{to{opacity:1;transform:translateY(0)}}@keyframes slideRow{to{opacity:1;transform:translateX(0)}}@keyframes breathe{0%,100%{transform:scale(1);opacity:.72}50%{transform:scale(1.08);opacity:1}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes scan{0%{transform:translateX(-120%)}100%{transform:translateX(260%)}}@keyframes sweep{to{stroke-dashoffset:70}}@keyframes dash{to{stroke-dashoffset:-260}}@keyframes glowPulse{0%,100%{box-shadow:0 0 0 rgba(255,69,0,0)}50%{box-shadow:0 0 32px rgba(255,69,0,.36)}}@keyframes nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(7px)}}@keyframes fillBar{from{width:0}to{width:var(--w)}}@keyframes toastIn{0%{opacity:0;transform:translateY(-16px) scale(.96)}100%{opacity:1;transform:translateY(0) scale(1)}}.scanline{position:relative;overflow:hidden}.scanline::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,69,0,.12),transparent);width:42%;transform:translateX(-100%);animation:scan 3.4s var(--ease-in-out) infinite;pointer-events:none}.spark{display:flex;align-items:end;gap:5px;height:40px;margin-top:18px}.spark span{display:block;width:10%;height:var(--h);border-radius:2px;background:linear-gradient(180deg,rgba(255,69,0,.95),rgba(255,69,0,.52));opacity:.85}.state-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}.state-card{border:1px solid var(--color-border);background:rgba(20,20,22,.62);border-radius:var(--radius-lg);padding:18px}.state-card h4{font-size:14px;color:var(--color-text);margin-bottom:4px}.state-card p{font-size:13px;color:var(--color-text-dim);line-height:1.45}.toast-stack{position:fixed;right:24px;top:88px;z-index:80;display:flex;flex-direction:column;gap:12px}.toast{width:min(360px,calc(100vw - 32px));border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);background:rgba(14,14,16,.92);backdrop-filter:blur(20px);box-shadow:var(--shadow-lg);padding:14px 16px;display:grid;grid-template-columns:28px 1fr;gap:12px;animation:toastIn 520ms var(--ease-out) forwards}.toast__icon{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.toast strong{display:block;font-size:14px;color:var(--color-text);line-height:1.2}.toast p{font-size:13px;color:var(--color-text-muted);line-height:1.4;margin-top:4px}.toast--warning .toast__icon{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.24)}.toast--danger .toast__icon{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.24)}
@media(max-width:1120px){.admin-layout{grid-template-columns:1fr}.sidebar{display:none}.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}.page{padding:var(--space-6) var(--space-5) var(--space-10)}.topbar{top:0}.page-head{align-items:flex-start;flex-direction:column}.toolbar{align-items:stretch;flex-direction:column}.state-strip{grid-template-columns:1fr}.member-nav__links{display:none}}
@media(max-width:680px){.member-page{padding-top:var(--space-6)}.h1{font-size:clamp(42px,12vw,64px)}.toast-stack{left:16px;right:16px;top:76px}.toast{width:100%}.member-nav__inner{padding:14px var(--space-4)}.brand{font-size:15px}.brand__mark{width:26px;height:26px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.motion-in,.row-motion{opacity:1;transform:none}.scanline::after{display:none}}
</style>
</head>
<body><div class="grain"></div>
<div class="admin-layout">
<aside class="sidebar">
  <a class="brand" href="/admin"><span class="brand__mark">B</span>Basscally Admin</a>
  <div class="side-label">Operate</div>
  <a class="side-link " href="/admin">Metrics <span>10</span></a>
  <a class="side-link " href="/admin/content">Content <span>34</span></a>
  <a class="side-link active" href="/admin/email-logs">Email logs <span>5</span></a>
  <a class="side-link " href="/admin/subscribers">Subscribers <span>147</span></a>
  <div class="side-label">System</div>
  <a class="side-link" href="/admin/settings">Settings <span>→</span></a>
</aside>
  <main class="main">
<header class="topbar">
  <div class="mono">Screen: 16 · Email logs</div>
  <div style="display:flex;align-items:center;gap:10px"><span class="mono">Last updated · just now</span><a class="btn btn--secondary" href="#">Export CSV</a></div>
</header>
    <section class="page">
      <div class="page-head motion-in">
        <div><span class="mono">// Delivery room</span><h1 class="h1">Email delivery logs.</h1><p>See every magic link, new drop alert, payment warning, and retry. This is where failed sends stop hiding.</p></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn--secondary" href="#">Retry failed</a><a class="btn btn--primary" href="/admin/content/new">New drop</a></div>
      </div>

      <div class="grid grid-4 motion-in delay-1">
        <div class="metric card"><span class="mono">Sent today</span><strong>142</strong><div class="spark"><span style="--h:22px"></span><span style="--h:16px"></span><span style="--h:28px"></span><span style="--h:32px"></span><span style="--h:38px"></span></div></div>
        <div class="metric card"><span class="mono">Queued</span><strong>5</strong><div class="spark blue"><span style="--h:14px"></span><span style="--h:20px"></span><span style="--h:18px"></span><span style="--h:30px"></span><span style="--h:26px"></span></div></div>
        <div class="metric card"><span class="mono">Failed</span><strong>3</strong><div class="spark danger"><span style="--h:8px"></span><span style="--h:12px"></span><span style="--h:6px"></span><span style="--h:18px"></span><span style="--h:30px"></span></div></div>
        <div class="metric card"><span class="mono">Open signal</span><strong>64%</strong><div class="spark green"><span style="--h:18px"></span><span style="--h:22px"></span><span style="--h:30px"></span><span style="--h:34px"></span><span style="--h:36px"></span></div></div>
      </div>

      <div class="email-layout motion-in delay-2">
        <section>
          <div class="toolbar">
            <div class="chip-row"><button class="chip active">All</button><button class="chip">New drop</button><button class="chip">Magic link</button><button class="chip">Payment failed</button><button class="chip">Failed only</button></div>
            <label><span class="mono" style="position:absolute;left:-9999px">Search email logs</span><input class="input" placeholder="Search email, content, status..." /></label>
          </div>
          <div class="table-wrap scanline">
            <table>
              <thead><tr><th>Email</th><th>Type</th><th>Content</th><th>Status</th><th>Attempts</th><th>Sent at</th><th>Action</th></tr></thead>
              <tbody>
                <tr class="row-motion" style="animation-delay:120ms"><td><strong>michael@example.com</strong><br><span class="dim">msg_8G7f...</span></td><td>New drop</td><td>Funk slap pattern in E</td><td><span class="badge badge--active">Sent</span></td><td>1</td><td>10:04 AM</td><td><button class="btn btn--ghost">View</button></td></tr>
                <tr class="row-motion" style="animation-delay:190ms"><td><strong>groovekeeper@icloud.com</strong><br><span class="dim">pending</span></td><td>Payment failed</td><td>Card update</td><td><span class="badge badge--warning">Queued</span></td><td>0</td><td>—</td><td><button class="btn btn--ghost">Send now</button></td></tr>
                <tr class="row-motion" style="animation-delay:260ms"><td><strong>wrongmail@mail.com</strong><br><span class="dim">550 mailbox unavailable</span></td><td>New drop</td><td>Ghost-note fill</td><td><span class="badge badge--danger">Failed</span></td><td>3</td><td>9:58 AM</td><td><button class="btn btn--ghost">Retry</button></td></tr>
                <tr class="row-motion" style="animation-delay:330ms"><td><strong>chrisfan42@gmail.com</strong><br><span class="dim">msg_7Ks9...</span></td><td>Magic link</td><td>Login</td><td><span class="badge badge--active">Sent</span></td><td>1</td><td>9:43 AM</td><td><button class="btn btn--ghost">View</button></td></tr>
                <tr class="row-motion" style="animation-delay:400ms"><td><strong>basslines.jp@mail.com</strong><br><span class="dim">msg_Yt42...</span></td><td>Welcome</td><td>Onboarding</td><td><span class="badge badge--active">Sent</span></td><td>1</td><td>9:12 AM</td><td><button class="btn btn--ghost">View</button></td></tr>
              </tbody>
            </table>
          </div>
          <div class="state-strip">
            <div class="state-card"><h4>Loading</h4><p>Skeleton rows while email logs load from the queue.</p></div>
            <div class="state-card"><h4>Empty</h4><p>No sends yet. Publish a drop to create the first queue.</p></div>
            <div class="state-card"><h4>Error</h4><p>Something broke. Try again?</p></div>
          </div>
        </section>
        <aside class="pulse-card card scanline">
          <span class="mono">// Queue health</span>
          <h2 class="h2">147 members selected.</h2>
          <p class="muted">The latest drop email has reached 142 members. Five are still queued, three need retry attention.</p>
          <div class="delivery-orb" aria-hidden="true">
            <svg viewBox="0 0 180 180"><circle cx="90" cy="90" r="72"></circle><circle class="orb-progress" cx="90" cy="90" r="72"></circle></svg>
            <strong>96%</strong><span>delivery</span>
          </div>
          <div class="rail-list">
            <div><span class="rail-dot active"></span><strong>142 sent</strong><p>New drop notification delivered.</p></div>
            <div><span class="rail-dot warn"></span><strong>5 queued</strong><p>Cron will process in the next minute.</p></div>
            <div><span class="rail-dot danger"></span><strong>3 failed</strong><p>Retry after checking mailbox errors.</p></div>
          </div>
        </aside>
      </div>
    </section>
  </main>
</div>
<div class="toast-stack" aria-live="polite"><div class="toast"><div class="toast__icon">✓</div><div><strong>Retry queued</strong><p>3 failed emails were added back to the send queue.</p></div></div></div>
<style>.metric{padding:22px}.metric strong{display:block;font-family:var(--font-display);font-size:36px;line-height:1;margin:12px 0;color:var(--color-text)}.spark .blue{background:var(--color-info)}.spark.blue span{background:linear-gradient(180deg,rgba(96,165,250,.95),rgba(96,165,250,.42))}.spark.green span{background:linear-gradient(180deg,rgba(52,211,153,.95),rgba(52,211,153,.42))}.spark.danger span{background:linear-gradient(180deg,rgba(248,113,113,.96),rgba(248,113,113,.42))}.email-layout{display:grid;grid-template-columns:minmax(0,1fr)360px;gap:16px;margin-top:16px}.pulse-card{padding:24px;position:relative;overflow:hidden}.pulse-card .h2{font-size:34px;margin:18px 0 10px}.delivery-orb{width:190px;height:190px;margin:28px auto 24px;display:grid;place-items:center;position:relative}.delivery-orb svg{position:absolute;inset:0;transform:rotate(-90deg)}.delivery-orb circle{fill:none;stroke:#25252b;stroke-width:10}.delivery-orb .orb-progress{stroke:var(--color-brand);stroke-linecap:round;stroke-dasharray:452;stroke-dashoffset:452;animation:sweep 1.8s var(--ease-out) forwards}.delivery-orb strong{font-family:var(--font-display);font-size:42px;line-height:1}.delivery-orb span{position:absolute;bottom:54px;font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.rail-list{display:flex;flex-direction:column;gap:12px}.rail-list>div{padding:14px 14px 14px 38px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:rgba(6,6,7,.42);position:relative}.rail-list strong{font-size:14px;color:var(--color-text)}.rail-list p{font-size:13px;color:var(--color-text-muted);margin-top:2px}.rail-dot{position:absolute;left:15px;top:20px;width:9px;height:9px;border-radius:50%;background:var(--color-text-dim)}.rail-dot.active{background:var(--color-success);box-shadow:0 0 18px rgba(52,211,153,.7)}.rail-dot.warn{background:var(--color-warning);box-shadow:0 0 18px rgba(251,191,36,.7);animation:breathe 1.8s infinite}.rail-dot.danger{background:var(--color-danger);box-shadow:0 0 18px rgba(248,113,113,.7);animation:breathe 1.2s infinite}@media(max-width:1120px){.email-layout{grid-template-columns:1fr}}
</style>
</body></html>
```

## Screen 17: Past-Due Banner State

Route: `/dashboard and /account state`
Reference file: `basscally-screen-17-past-due-banner-motion.html`
Purpose: Grace period billing state

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --color-brand:#FF4500;--color-brand-hover:#FF5C1F;--color-brand-muted:#2A1408;
  --color-bg:#0A0A0B;--color-surface:#141416;--color-surface-raised:#1C1C1F;--color-surface-sunken:#060607;
  --color-border:#26262A;--color-border-strong:#3A3A40;--color-text:#F5F5F7;--color-text-muted:#A1A1A8;--color-text-dim:#6B6B72;
  --color-success:#34D399;--color-warning:#FBBF24;--color-danger:#F87171;--color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif;--font-body:"Geist","Inter",-apple-system,sans-serif;--font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-sm:0 1px 2px rgba(0,0,0,.4);--shadow-md:0 4px 12px rgba(0,0,0,.5);--shadow-lg:0 18px 48px rgba(0,0,0,.72);--shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1);--ease-in-out:cubic-bezier(.65,0,.35,1);--motion-fast:150ms;--motion-default:250ms;--motion-slow:640ms;
}
*{box-sizing:border-box;margin:0;padding:0}html,body{min-height:100%;background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}body::before{content:"";position:fixed;inset:-20%;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.15),transparent 32%),radial-gradient(circle at 86% 8%,rgba(255,92,31,.09),transparent 26%),linear-gradient(180deg,#0A0A0B 0%,#060607 100%);z-index:-3}body::after{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at center,black 28%,transparent 78%);z-index:-2;pointer-events:none}.grain{position:fixed;inset:0;z-index:-1;opacity:.18;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E")}
a{color:inherit}.btn{font-family:var(--font-body);font-weight:600;font-size:14px;line-height:1;padding:12px 18px;border-radius:var(--radius-lg);border:1px solid transparent;cursor:pointer;transition:transform var(--motion-fast) var(--ease-out),background var(--motion-fast) var(--ease-out),border-color var(--motion-fast) var(--ease-out),box-shadow var(--motion-fast) var(--ease-out),color var(--motion-fast) var(--ease-out);text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;min-height:44px}.btn--primary{background:var(--color-brand);color:#fff}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-1px)}.btn--secondary{background:rgba(20,20,22,.74);border-color:var(--color-border-strong);color:var(--color-text)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.input:focus-visible,.chip:focus-visible,button:focus-visible,a:focus-visible{outline:2px solid rgba(255,69,0,.55);outline-offset:3px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:1px solid transparent}.badge--active{background:rgba(52,211,153,.12);color:var(--color-success);border-color:rgba(52,211,153,.22)}.badge--scheduled{background:rgba(96,165,250,.12);color:var(--color-info);border-color:rgba(96,165,250,.22)}.badge--draft{background:rgba(161,161,168,.10);color:var(--color-text-muted);border-color:rgba(161,161,168,.16)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.22)}.badge--warning{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.22)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border-color:rgba(255,69,0,.25)}.card{background:linear-gradient(180deg,rgba(28,28,31,.86),rgba(14,14,16,.92));border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:0 1px 0 rgba(255,255,255,.035) inset}.mono{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.h1{font-family:var(--font-display);font-size:clamp(40px,7vw,78px);font-weight:800;letter-spacing:-.045em;line-height:.94}.h2{font-family:var(--font-display);font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:-.035em;line-height:1}.muted{color:var(--color-text-muted)}.dim{color:var(--color-text-dim)}
.admin-layout{display:grid;grid-template-columns:250px 1fr;min-height:100vh}.sidebar{position:sticky;top:0;height:100vh;border-right:1px solid var(--color-border);background:rgba(6,6,7,.76);backdrop-filter:blur(24px);padding:22px}.brand{font-family:var(--font-display);font-weight:800;font-size:17px;text-decoration:none;display:flex;align-items:center;gap:10px}.brand__mark{width:28px;height:28px;border-radius:8px;background:var(--color-brand);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;box-shadow:0 0 28px rgba(255,69,0,.25)}.sidebar .brand{margin-bottom:34px}.side-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-text-dim);margin:22px 0 10px}.side-link{min-height:44px;padding:12px 14px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:space-between;text-decoration:none;color:var(--color-text-muted);font-size:14px;border:1px solid transparent;transition:all var(--motion-fast) var(--ease-out)}.side-link:hover{background:var(--color-surface);color:var(--color-text)}.side-link.active{background:var(--color-brand-muted);border-color:rgba(255,69,0,.22);color:var(--color-text)}.main{min-width:0}.topbar{height:72px;border-bottom:1px solid var(--color-border);display:flex;align-items:center;justify-content:space-between;padding:0 var(--space-6);background:rgba(10,10,11,.54);backdrop-filter:blur(20px);position:sticky;top:0;z-index:30}.page{padding:var(--space-8) var(--space-6) var(--space-12)}.page-head{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--space-5);margin-bottom:var(--space-8)}.page-head p{max-width:620px;margin-top:var(--space-3);color:var(--color-text-muted)}.grid{display:grid;gap:var(--space-4)}.grid-2{grid-template-columns:2fr 1fr}.grid-3{grid-template-columns:repeat(3,1fr)}.grid-4{grid-template-columns:repeat(4,1fr)}.table-wrap{overflow:auto;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.74)}table{width:100%;border-collapse:collapse;min-width:900px}th{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase;text-align:left;font-weight:600;padding:18px 18px;border-bottom:1px solid var(--color-border)}td{font-size:14px;color:var(--color-text-muted);padding:18px;border-bottom:1px solid rgba(38,38,42,.7);vertical-align:middle}tr:last-child td{border-bottom:none}td strong{color:var(--color-text);font-weight:600}.input{min-height:44px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:rgba(20,20,22,.88);color:var(--color-text);padding:12px 14px;font-family:var(--font-body);font-size:14px}.toolbar{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:16px}.chip-row{display:flex;gap:8px;flex-wrap:wrap}.chip{min-height:38px;border-radius:var(--radius-full);border:1px solid var(--color-border);background:rgba(20,20,22,.74);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;padding:9px 12px;cursor:pointer;transition:all var(--motion-fast) var(--ease-out);text-decoration:none}.chip:hover,.chip.active{border-color:rgba(255,69,0,.35);background:var(--color-brand-muted);color:var(--color-text)}
.member-shell{min-height:100vh}.member-nav{position:sticky;top:0;z-index:50;background:rgba(10,10,11,.72);backdrop-filter:blur(24px) saturate(140%);border-bottom:1px solid rgba(38,38,42,.68)}.member-nav__inner{max-width:1220px;margin:0 auto;padding:18px var(--space-5);display:flex;align-items:center;justify-content:space-between;gap:16px}.member-nav__links{display:flex;align-items:center;gap:6px}.container{max-width:1220px;margin:0 auto;padding:0 var(--space-5)}.member-page{padding:var(--space-8) 0 var(--space-12)}
.motion-in{opacity:0;transform:translateY(22px);animation:rise 780ms var(--ease-out) forwards}.delay-1{animation-delay:80ms}.delay-2{animation-delay:160ms}.delay-3{animation-delay:240ms}.delay-4{animation-delay:320ms}.delay-5{animation-delay:400ms}.row-motion{opacity:0;transform:translateX(-12px);animation:slideRow 620ms var(--ease-out) forwards}@keyframes rise{to{opacity:1;transform:translateY(0)}}@keyframes slideRow{to{opacity:1;transform:translateX(0)}}@keyframes breathe{0%,100%{transform:scale(1);opacity:.72}50%{transform:scale(1.08);opacity:1}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes scan{0%{transform:translateX(-120%)}100%{transform:translateX(260%)}}@keyframes sweep{to{stroke-dashoffset:70}}@keyframes dash{to{stroke-dashoffset:-260}}@keyframes glowPulse{0%,100%{box-shadow:0 0 0 rgba(255,69,0,0)}50%{box-shadow:0 0 32px rgba(255,69,0,.36)}}@keyframes nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(7px)}}@keyframes fillBar{from{width:0}to{width:var(--w)}}@keyframes toastIn{0%{opacity:0;transform:translateY(-16px) scale(.96)}100%{opacity:1;transform:translateY(0) scale(1)}}.scanline{position:relative;overflow:hidden}.scanline::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,69,0,.12),transparent);width:42%;transform:translateX(-100%);animation:scan 3.4s var(--ease-in-out) infinite;pointer-events:none}.spark{display:flex;align-items:end;gap:5px;height:40px;margin-top:18px}.spark span{display:block;width:10%;height:var(--h);border-radius:2px;background:linear-gradient(180deg,rgba(255,69,0,.95),rgba(255,69,0,.52));opacity:.85}.state-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}.state-card{border:1px solid var(--color-border);background:rgba(20,20,22,.62);border-radius:var(--radius-lg);padding:18px}.state-card h4{font-size:14px;color:var(--color-text);margin-bottom:4px}.state-card p{font-size:13px;color:var(--color-text-dim);line-height:1.45}.toast-stack{position:fixed;right:24px;top:88px;z-index:80;display:flex;flex-direction:column;gap:12px}.toast{width:min(360px,calc(100vw - 32px));border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);background:rgba(14,14,16,.92);backdrop-filter:blur(20px);box-shadow:var(--shadow-lg);padding:14px 16px;display:grid;grid-template-columns:28px 1fr;gap:12px;animation:toastIn 520ms var(--ease-out) forwards}.toast__icon{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.toast strong{display:block;font-size:14px;color:var(--color-text);line-height:1.2}.toast p{font-size:13px;color:var(--color-text-muted);line-height:1.4;margin-top:4px}.toast--warning .toast__icon{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.24)}.toast--danger .toast__icon{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.24)}
@media(max-width:1120px){.admin-layout{grid-template-columns:1fr}.sidebar{display:none}.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}.page{padding:var(--space-6) var(--space-5) var(--space-10)}.topbar{top:0}.page-head{align-items:flex-start;flex-direction:column}.toolbar{align-items:stretch;flex-direction:column}.state-strip{grid-template-columns:1fr}.member-nav__links{display:none}}
@media(max-width:680px){.member-page{padding-top:var(--space-6)}.h1{font-size:clamp(42px,12vw,64px)}.toast-stack{left:16px;right:16px;top:76px}.toast{width:100%}.member-nav__inner{padding:14px var(--space-4)}.brand{font-size:15px}.brand__mark{width:26px;height:26px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.motion-in,.row-motion{opacity:1;transform:none}.scanline::after{display:none}}
</style>
</head>
<body><div class="grain"></div>
<div class="member-shell">
<nav class="member-nav" aria-label="Member navigation">
  <div class="member-nav__inner">
    <a href="/dashboard" class="brand"><span class="brand__mark">B</span>Basscally Club</a>
    <div class="member-nav__links">
      <a class="btn btn--ghost" href="/dashboard">Drops</a>
      <a class="btn btn--ghost" href="/account">Membership</a>
      <a class="btn btn--secondary" href="#">Sign out</a>
    </div>
  </div>
</nav>
  <main class="member-page">
    <div class="container">
      <section class="page-head motion-in" style="padding-top:0">
        <div><span class="mono">// Billing state</span><h1 class="h1">Past-due banner.</h1><p>This is not a new page. It is the warning layer that appears on Dashboard and Membership when a payment fails.</p></div>
        <a class="btn btn--primary" href="#billing">Update card</a>
      </section>

      <section class="pastdue-hero card motion-in delay-1 scanline" id="billing">
        <div>
          <span class="badge badge--warning">Payment needs attention</span>
          <h2>Your Club access is still active.</h2>
          <p>We could not renew your card. You keep play and download access until <strong>June 13, 2026</strong>. Update your card before then to stay in the pocket.</p>
          <div class="pastdue-actions"><a class="btn btn--primary" href="#">Update card</a><a class="btn btn--secondary" href="/account">View membership</a></div>
        </div>
        <div class="countdown-panel" aria-label="Grace period countdown">
          <span class="mono">Grace window</span>
          <div class="time"><strong>14</strong><span>days left</span></div>
          <div class="stripe"><i></i></div>
          <p>Access ends only after the paid period expires.</p>
        </div>
      </section>

      <div class="variant-layout motion-in delay-2">
        <section class="card demo-panel">
          <span class="mono">// Dashboard placement</span>
          <div class="mini-banner mini-banner--warning">
            <span class="pulse-dot"></span>
            <div><strong>Card update needed</strong><p>You keep access until June 13. Update your card to avoid losing downloads.</p></div>
            <a class="btn btn--primary" href="#">Update card</a>
          </div>
          <div class="latest-card">
            <span class="badge badge--brand">Latest drop</span>
            <h3>Funk slap pattern in E</h3>
            <p>Beginner groove · 2 min · Dropped today</p>
            <div class="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <div class="latest-actions"><button class="btn btn--secondary">Play</button><button class="btn btn--secondary">Download</button></div>
          </div>
        </section>

        <section class="card demo-panel">
          <span class="mono">// Membership placement</span>
          <div class="membership-card">
            <div><span class="badge badge--warning">Past due</span><h3>Membership</h3><p>Your payment failed on May 16. Access remains active until the end of your paid period.</p></div>
            <div class="billing-line"><span>Current period ends</span><strong>Jun 13, 2026</strong></div>
            <div class="billing-line"><span>Plan</span><strong>Founding · $1.50/mo</strong></div>
            <div class="billing-line"><span>Access</span><strong class="ok">Active grace</strong></div>
            <a class="btn btn--primary" href="#">Update payment method</a>
          </div>
        </section>
      </div>

      <section class="motion-in delay-3 state-strip">
        <div class="state-card"><h4>Loading</h4><p>Banner space skeleton appears before subscription status resolves.</p></div>
        <div class="state-card"><h4>No issue</h4><p>No banner appears for active members.</p></div>
        <div class="state-card"><h4>Expired</h4><p>Redirects to the re-subscribe screen once period end passes.</p></div>
      </section>
    </div>
  </main>
</div>
<div class="toast-stack" aria-live="polite"><div class="toast toast--warning"><div class="toast__icon">!</div><div><strong>Payment still pending</strong><p>Your downloads remain active until June 13.</p></div></div></div>
<style>.pastdue-hero{padding:32px;display:grid;grid-template-columns:minmax(0,1fr)320px;gap:24px;align-items:center;margin-bottom:16px;overflow:hidden;position:relative}.pastdue-hero h2{font-family:var(--font-display);font-size:clamp(34px,6vw,70px);line-height:.95;letter-spacing:-.045em;margin:18px 0 14px}.pastdue-hero p{color:var(--color-text-muted);max-width:660px}.pastdue-hero strong{color:var(--color-text)}.pastdue-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}.countdown-panel{border:1px solid rgba(251,191,36,.22);border-radius:var(--radius-lg);background:linear-gradient(180deg,rgba(251,191,36,.08),rgba(20,20,22,.74));padding:24px;position:relative;overflow:hidden}.time{margin:24px 0 20px}.time strong{font-family:var(--font-display);font-size:88px;line-height:.82;letter-spacing:-.05em}.time span{display:block;font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);margin-top:10px}.stripe{height:10px;border-radius:999px;background:#24242a;overflow:hidden}.stripe i{display:block;height:100%;width:62%;border-radius:999px;background:linear-gradient(90deg,rgba(251,191,36,.3),var(--color-warning));animation:fillBar 1.1s var(--ease-out) forwards}.countdown-panel p{font-size:13px;line-height:1.45;color:var(--color-text-dim);margin-top:14px}.variant-layout{display:grid;grid-template-columns:1fr 1fr;gap:16px}.demo-panel{padding:24px}.mini-banner{margin:18px 0 18px;padding:16px;border-radius:var(--radius-lg);border:1px solid rgba(251,191,36,.2);background:rgba(251,191,36,.07);display:grid;grid-template-columns:12px 1fr auto;align-items:center;gap:14px}.mini-banner strong{display:block;color:var(--color-text);line-height:1.25}.mini-banner p{font-size:13px;color:var(--color-text-muted);line-height:1.45;margin-top:2px}.pulse-dot{width:10px;height:10px;border-radius:50%;background:var(--color-warning);box-shadow:0 0 18px rgba(251,191,36,.7);animation:breathe 1.4s infinite}.latest-card{padding:24px;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:radial-gradient(circle at 20% 10%,rgba(255,69,0,.13),transparent 36%),rgba(6,6,7,.48)}.latest-card h3{font-family:var(--font-display);font-size:34px;line-height:1;letter-spacing:-.03em;margin:18px 0 8px}.latest-card p{color:var(--color-text-muted)}.wave{height:54px;display:flex;align-items:center;gap:6px;margin:22px 0}.wave i{width:7px;border-radius:99px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.35));height:22px;animation:breathe 1.4s ease-in-out infinite}.wave i:nth-child(2){height:40px;animation-delay:.1s}.wave i:nth-child(3){height:28px;animation-delay:.2s}.wave i:nth-child(4){height:48px;animation-delay:.3s}.wave i:nth-child(5){height:34px;animation-delay:.4s}.wave i:nth-child(6){height:26px;animation-delay:.5s}.wave i:nth-child(7){height:44px;animation-delay:.6s}.latest-actions{display:flex;gap:10px}.membership-card{display:flex;flex-direction:column;gap:16px;margin-top:18px}.membership-card h3{font-family:var(--font-display);font-size:42px;letter-spacing:-.035em;margin:12px 0 4px}.membership-card p{color:var(--color-text-muted)}.billing-line{display:flex;justify-content:space-between;gap:16px;padding:14px 0;border-top:1px solid var(--color-border);font-size:14px;color:var(--color-text-muted)}.billing-line strong{color:var(--color-text);font-weight:600;text-align:right}.billing-line .ok{color:var(--color-success)}@media(max-width:900px){.pastdue-hero,.variant-layout{grid-template-columns:1fr}.mini-banner{grid-template-columns:12px 1fr}.mini-banner .btn{grid-column:1/-1}.time strong{font-size:72px}}
</style>
</body></html>
```

## Screen 18: Cancel Confirmation

Route: `/account/cancel`
Reference file: `basscally-screen-18-cancel-confirmation-motion.html`
Purpose: Cancel flow and period-end clarity

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --color-brand:#FF4500;--color-brand-hover:#FF5C1F;--color-brand-muted:#2A1408;
  --color-bg:#0A0A0B;--color-surface:#141416;--color-surface-raised:#1C1C1F;--color-surface-sunken:#060607;
  --color-border:#26262A;--color-border-strong:#3A3A40;--color-text:#F5F5F7;--color-text-muted:#A1A1A8;--color-text-dim:#6B6B72;
  --color-success:#34D399;--color-warning:#FBBF24;--color-danger:#F87171;--color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif;--font-body:"Geist","Inter",-apple-system,sans-serif;--font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-sm:0 1px 2px rgba(0,0,0,.4);--shadow-md:0 4px 12px rgba(0,0,0,.5);--shadow-lg:0 18px 48px rgba(0,0,0,.72);--shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1);--ease-in-out:cubic-bezier(.65,0,.35,1);--motion-fast:150ms;--motion-default:250ms;--motion-slow:640ms;
}
*{box-sizing:border-box;margin:0;padding:0}html,body{min-height:100%;background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}body::before{content:"";position:fixed;inset:-20%;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.15),transparent 32%),radial-gradient(circle at 86% 8%,rgba(255,92,31,.09),transparent 26%),linear-gradient(180deg,#0A0A0B 0%,#060607 100%);z-index:-3}body::after{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at center,black 28%,transparent 78%);z-index:-2;pointer-events:none}.grain{position:fixed;inset:0;z-index:-1;opacity:.18;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E")}
a{color:inherit}.btn{font-family:var(--font-body);font-weight:600;font-size:14px;line-height:1;padding:12px 18px;border-radius:var(--radius-lg);border:1px solid transparent;cursor:pointer;transition:transform var(--motion-fast) var(--ease-out),background var(--motion-fast) var(--ease-out),border-color var(--motion-fast) var(--ease-out),box-shadow var(--motion-fast) var(--ease-out),color var(--motion-fast) var(--ease-out);text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;min-height:44px}.btn--primary{background:var(--color-brand);color:#fff}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-1px)}.btn--secondary{background:rgba(20,20,22,.74);border-color:var(--color-border-strong);color:var(--color-text)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.input:focus-visible,.chip:focus-visible,button:focus-visible,a:focus-visible{outline:2px solid rgba(255,69,0,.55);outline-offset:3px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:1px solid transparent}.badge--active{background:rgba(52,211,153,.12);color:var(--color-success);border-color:rgba(52,211,153,.22)}.badge--scheduled{background:rgba(96,165,250,.12);color:var(--color-info);border-color:rgba(96,165,250,.22)}.badge--draft{background:rgba(161,161,168,.10);color:var(--color-text-muted);border-color:rgba(161,161,168,.16)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.22)}.badge--warning{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.22)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border-color:rgba(255,69,0,.25)}.card{background:linear-gradient(180deg,rgba(28,28,31,.86),rgba(14,14,16,.92));border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:0 1px 0 rgba(255,255,255,.035) inset}.mono{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim)}.h1{font-family:var(--font-display);font-size:clamp(40px,7vw,78px);font-weight:800;letter-spacing:-.045em;line-height:.94}.h2{font-family:var(--font-display);font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:-.035em;line-height:1}.muted{color:var(--color-text-muted)}.dim{color:var(--color-text-dim)}
.admin-layout{display:grid;grid-template-columns:250px 1fr;min-height:100vh}.sidebar{position:sticky;top:0;height:100vh;border-right:1px solid var(--color-border);background:rgba(6,6,7,.76);backdrop-filter:blur(24px);padding:22px}.brand{font-family:var(--font-display);font-weight:800;font-size:17px;text-decoration:none;display:flex;align-items:center;gap:10px}.brand__mark{width:28px;height:28px;border-radius:8px;background:var(--color-brand);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;box-shadow:0 0 28px rgba(255,69,0,.25)}.sidebar .brand{margin-bottom:34px}.side-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-text-dim);margin:22px 0 10px}.side-link{min-height:44px;padding:12px 14px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:space-between;text-decoration:none;color:var(--color-text-muted);font-size:14px;border:1px solid transparent;transition:all var(--motion-fast) var(--ease-out)}.side-link:hover{background:var(--color-surface);color:var(--color-text)}.side-link.active{background:var(--color-brand-muted);border-color:rgba(255,69,0,.22);color:var(--color-text)}.main{min-width:0}.topbar{height:72px;border-bottom:1px solid var(--color-border);display:flex;align-items:center;justify-content:space-between;padding:0 var(--space-6);background:rgba(10,10,11,.54);backdrop-filter:blur(20px);position:sticky;top:0;z-index:30}.page{padding:var(--space-8) var(--space-6) var(--space-12)}.page-head{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--space-5);margin-bottom:var(--space-8)}.page-head p{max-width:620px;margin-top:var(--space-3);color:var(--color-text-muted)}.grid{display:grid;gap:var(--space-4)}.grid-2{grid-template-columns:2fr 1fr}.grid-3{grid-template-columns:repeat(3,1fr)}.grid-4{grid-template-columns:repeat(4,1fr)}.table-wrap{overflow:auto;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:rgba(20,20,22,.74)}table{width:100%;border-collapse:collapse;min-width:900px}th{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase;text-align:left;font-weight:600;padding:18px 18px;border-bottom:1px solid var(--color-border)}td{font-size:14px;color:var(--color-text-muted);padding:18px;border-bottom:1px solid rgba(38,38,42,.7);vertical-align:middle}tr:last-child td{border-bottom:none}td strong{color:var(--color-text);font-weight:600}.input{min-height:44px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:rgba(20,20,22,.88);color:var(--color-text);padding:12px 14px;font-family:var(--font-body);font-size:14px}.toolbar{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:16px}.chip-row{display:flex;gap:8px;flex-wrap:wrap}.chip{min-height:38px;border-radius:var(--radius-full);border:1px solid var(--color-border);background:rgba(20,20,22,.74);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;padding:9px 12px;cursor:pointer;transition:all var(--motion-fast) var(--ease-out);text-decoration:none}.chip:hover,.chip.active{border-color:rgba(255,69,0,.35);background:var(--color-brand-muted);color:var(--color-text)}
.member-shell{min-height:100vh}.member-nav{position:sticky;top:0;z-index:50;background:rgba(10,10,11,.72);backdrop-filter:blur(24px) saturate(140%);border-bottom:1px solid rgba(38,38,42,.68)}.member-nav__inner{max-width:1220px;margin:0 auto;padding:18px var(--space-5);display:flex;align-items:center;justify-content:space-between;gap:16px}.member-nav__links{display:flex;align-items:center;gap:6px}.container{max-width:1220px;margin:0 auto;padding:0 var(--space-5)}.member-page{padding:var(--space-8) 0 var(--space-12)}
.motion-in{opacity:0;transform:translateY(22px);animation:rise 780ms var(--ease-out) forwards}.delay-1{animation-delay:80ms}.delay-2{animation-delay:160ms}.delay-3{animation-delay:240ms}.delay-4{animation-delay:320ms}.delay-5{animation-delay:400ms}.row-motion{opacity:0;transform:translateX(-12px);animation:slideRow 620ms var(--ease-out) forwards}@keyframes rise{to{opacity:1;transform:translateY(0)}}@keyframes slideRow{to{opacity:1;transform:translateX(0)}}@keyframes breathe{0%,100%{transform:scale(1);opacity:.72}50%{transform:scale(1.08);opacity:1}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes scan{0%{transform:translateX(-120%)}100%{transform:translateX(260%)}}@keyframes sweep{to{stroke-dashoffset:70}}@keyframes dash{to{stroke-dashoffset:-260}}@keyframes glowPulse{0%,100%{box-shadow:0 0 0 rgba(255,69,0,0)}50%{box-shadow:0 0 32px rgba(255,69,0,.36)}}@keyframes nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(7px)}}@keyframes fillBar{from{width:0}to{width:var(--w)}}@keyframes toastIn{0%{opacity:0;transform:translateY(-16px) scale(.96)}100%{opacity:1;transform:translateY(0) scale(1)}}.scanline{position:relative;overflow:hidden}.scanline::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,69,0,.12),transparent);width:42%;transform:translateX(-100%);animation:scan 3.4s var(--ease-in-out) infinite;pointer-events:none}.spark{display:flex;align-items:end;gap:5px;height:40px;margin-top:18px}.spark span{display:block;width:10%;height:var(--h);border-radius:2px;background:linear-gradient(180deg,rgba(255,69,0,.95),rgba(255,69,0,.52));opacity:.85}.state-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}.state-card{border:1px solid var(--color-border);background:rgba(20,20,22,.62);border-radius:var(--radius-lg);padding:18px}.state-card h4{font-size:14px;color:var(--color-text);margin-bottom:4px}.state-card p{font-size:13px;color:var(--color-text-dim);line-height:1.45}.toast-stack{position:fixed;right:24px;top:88px;z-index:80;display:flex;flex-direction:column;gap:12px}.toast{width:min(360px,calc(100vw - 32px));border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);background:rgba(14,14,16,.92);backdrop-filter:blur(20px);box-shadow:var(--shadow-lg);padding:14px 16px;display:grid;grid-template-columns:28px 1fr;gap:12px;animation:toastIn 520ms var(--ease-out) forwards}.toast__icon{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.toast strong{display:block;font-size:14px;color:var(--color-text);line-height:1.2}.toast p{font-size:13px;color:var(--color-text-muted);line-height:1.4;margin-top:4px}.toast--warning .toast__icon{background:rgba(251,191,36,.12);color:var(--color-warning);border-color:rgba(251,191,36,.24)}.toast--danger .toast__icon{background:rgba(248,113,113,.12);color:var(--color-danger);border-color:rgba(248,113,113,.24)}
@media(max-width:1120px){.admin-layout{grid-template-columns:1fr}.sidebar{display:none}.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}.page{padding:var(--space-6) var(--space-5) var(--space-10)}.topbar{top:0}.page-head{align-items:flex-start;flex-direction:column}.toolbar{align-items:stretch;flex-direction:column}.state-strip{grid-template-columns:1fr}.member-nav__links{display:none}}
@media(max-width:680px){.member-page{padding-top:var(--space-6)}.h1{font-size:clamp(42px,12vw,64px)}.toast-stack{left:16px;right:16px;top:76px}.toast{width:100%}.member-nav__inner{padding:14px var(--space-4)}.brand{font-size:15px}.brand__mark{width:26px;height:26px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.motion-in,.row-motion{opacity:1;transform:none}.scanline::after{display:none}}
</style>
</head>
<body><div class="grain"></div>
<div class="member-shell">
<nav class="member-nav" aria-label="Member navigation">
  <div class="member-nav__inner">
    <a href="/dashboard" class="brand"><span class="brand__mark">B</span>Basscally Club</a>
    <div class="member-nav__links">
      <a class="btn btn--ghost" href="/dashboard">Drops</a>
      <a class="btn btn--ghost" href="/account">Membership</a>
      <a class="btn btn--secondary" href="#">Sign out</a>
    </div>
  </div>
</nav>
  <main class="member-page">
    <div class="container">
      <section class="page-head motion-in" style="padding-top:0">
        <div><span class="mono">// Account decision</span><h1 class="h1">Cancel confirmation.</h1><p>A clean confirmation flow before the Lemon Squeezy portal, plus the post-cancelled state after the webhook returns.</p></div>
        <a class="btn btn--secondary" href="/account">Back to membership</a>
      </section>

      <div class="cancel-layout motion-in delay-1">
        <section class="card account-panel">
          <span class="mono">// Current plan</span>
          <h2>Founding Member</h2>
          <p class="muted">$1.50/month · locked for life while your membership stays active.</p>
          <div class="plan-grid">
            <div><span>Access</span><strong>Active</strong></div>
            <div><span>Next renewal</span><strong>Jun 13, 2026</strong></div>
            <div><span>Downloads</span><strong>34 drops</strong></div>
          </div>
          <button class="btn btn--secondary danger-link" id="open-cancel">Cancel membership</button>
        </section>

        <section class="card post-cancel-panel scanline">
          <span class="mono">// After webhook state</span>
          <span class="badge badge--warning">Cancels at period end</span>
          <h2>You still have access.</h2>
          <p>Your membership is set to end on <strong>June 13, 2026</strong>. Until then, play and download every drop you already paid for.</p>
          <div class="timeline">
            <div class="timeline-item active"><span></span><strong>Today</strong><p>Cancellation confirmed.</p></div>
            <div class="timeline-item"><span></span><strong>June 13</strong><p>Access ends unless membership resumes.</p></div>
            <div class="timeline-item"><span></span><strong>After June 13</strong><p>Dashboard becomes re-subscribe screen.</p></div>
          </div>
          <a class="btn btn--primary" href="#">Resume membership</a>
        </section>
      </div>
    </div>
  </main>
</div>

<div class="modal-backdrop active" role="presentation">
  <section class="cancel-modal card motion-in" role="dialog" aria-modal="true" aria-labelledby="cancel-title">
    <button class="modal-close" aria-label="Close cancel confirmation">×</button>
    <span class="mono">// Confirm cancellation</span>
    <h2 id="cancel-title">Leave the Club?</h2>
    <p>You will keep access until <strong>June 13, 2026</strong>. After that, your dashboard changes to re-subscribe mode and downloads stop.</p>
    <div class="modal-split">
      <div><span class="badge badge--active">You keep</span><p>Play and download access until the paid period ends.</p></div>
      <div><span class="badge badge--warning">You lose later</span><p>New drops, downloads, and founding price protection after expiry.</p></div>
    </div>
    <label class="confirm-check"><input type="checkbox" checked /> <span>I understand access ends after my paid period.</span></label>
    <div class="modal-actions"><button class="btn btn--secondary">Keep membership</button><button class="btn btn--primary">Continue to cancel</button></div>
  </section>
</div>

<div class="toast-stack" aria-live="polite"><div class="toast toast--warning"><div class="toast__icon">!</div><div><strong>Cancellation scheduled</strong><p>Access remains active until June 13, 2026.</p></div></div></div>
<style>.cancel-layout{display:grid;grid-template-columns:1fr 1.2fr;gap:16px}.account-panel,.post-cancel-panel{padding:28px;position:relative;overflow:hidden}.account-panel h2,.post-cancel-panel h2{font-family:var(--font-display);font-size:clamp(34px,5vw,58px);line-height:.96;letter-spacing:-.04em;margin:18px 0 10px}.plan-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:26px 0}.plan-grid div{border:1px solid var(--color-border);border-radius:var(--radius-md);background:rgba(6,6,7,.46);padding:16px}.plan-grid span{display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);margin-bottom:8px}.plan-grid strong{font-size:16px;color:var(--color-text)}.danger-link{border-color:rgba(248,113,113,.25);color:var(--color-danger)}.danger-link:hover{background:rgba(248,113,113,.08);border-color:rgba(248,113,113,.36);color:var(--color-text)}.post-cancel-panel p{color:var(--color-text-muted);max-width:620px}.post-cancel-panel p strong{color:var(--color-text)}.timeline{display:flex;flex-direction:column;gap:0;margin:26px 0;border-left:1px solid var(--color-border);padding-left:20px}.timeline-item{position:relative;padding:0 0 22px}.timeline-item:last-child{padding-bottom:0}.timeline-item span{position:absolute;left:-26px;top:6px;width:11px;height:11px;border-radius:50%;background:var(--color-text-dim);border:2px solid var(--color-bg)}.timeline-item.active span{background:var(--color-warning);box-shadow:0 0 18px rgba(251,191,36,.7);animation:breathe 1.4s infinite}.timeline-item strong{display:block;color:var(--color-text);font-size:14px}.timeline-item p{font-size:13px;line-height:1.45;color:var(--color-text-dim);margin-top:2px}.modal-backdrop{position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.66);backdrop-filter:blur(10px);display:grid;place-items:center;padding:20px}.cancel-modal{width:min(620px,100%);padding:28px;position:relative;box-shadow:var(--shadow-lg)}.cancel-modal::before{content:"";position:absolute;inset:-1px;border-radius:inherit;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.25),transparent 34%);pointer-events:none}.cancel-modal>*{position:relative}.modal-close{position:absolute;right:16px;top:16px;width:44px;height:44px;border-radius:var(--radius-md);border:1px solid var(--color-border);background:rgba(20,20,22,.82);color:var(--color-text-muted);font-size:24px;cursor:pointer;z-index:2}.cancel-modal h2{font-family:var(--font-display);font-size:clamp(40px,7vw,72px);line-height:.9;letter-spacing:-.05em;margin:22px 0 14px}.cancel-modal p{color:var(--color-text-muted)}.cancel-modal p strong{color:var(--color-text)}.modal-split{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:24px 0}.modal-split div{border:1px solid var(--color-border);border-radius:var(--radius-md);background:rgba(6,6,7,.42);padding:16px}.modal-split p{font-size:13px;line-height:1.45;margin-top:10px}.confirm-check{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--color-border);border-radius:var(--radius-md);padding:14px;background:rgba(20,20,22,.58);font-size:14px;color:var(--color-text-muted)}.confirm-check input{accent-color:var(--color-brand);width:18px;height:18px;margin-top:3px}.modal-actions{display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap;margin-top:22px}.modal-actions .btn--primary{animation:glowPulse 2.1s ease-in-out infinite}@media(max-width:900px){.cancel-layout,.modal-split,.plan-grid{grid-template-columns:1fr}.modal-actions{flex-direction:column-reverse}.modal-actions .btn{width:100%}.modal-backdrop{align-items:end}.cancel-modal{border-bottom-left-radius:0;border-bottom-right-radius:0}}
</style>
<script>
document.querySelector('.modal-close')?.addEventListener('click',()=>document.querySelector('.modal-backdrop')?.classList.remove('active'));
document.querySelector('#open-cancel')?.addEventListener('click',()=>document.querySelector('.modal-backdrop')?.classList.add('active'));
</script>
</body></html>
```

## Screen 19: Admin Content Edit

Route: `/admin/content/[id]`
Reference file: `basscally-screen-19-admin-content-edit-motion.html`
Purpose: Edit scheduled, draft, or published drop

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Edit drop — Basscally Club</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0} html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased} body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden} ::selection{background:var(--color-brand);color:#fff}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1} body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}.hero-row{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(320px,.9fr);gap:24px;align-items:stretch;margin-bottom:24px}.hero-card,.card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.hero-card{padding:36px}.hero-card::before,.card--glow::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.input:focus,.textarea:focus,.select:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}.panel{padding:24px}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.field{display:flex;flex-direction:column;gap:8px}.label{font-size:13px;color:var(--color-text-muted);font-weight:600}.input,.textarea,.select{width:100%;min-height:44px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:#0D0D0F;color:var(--color-text);padding:12px 14px;font:inherit;transition:border .15s var(--ease-out),box-shadow .15s var(--ease-out)}.textarea{min-height:140px;resize:vertical}.hint{font-size:12px;color:var(--color-text-dim)}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:820px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}.divider{height:1px;background:var(--color-border);margin:18px 0}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}.ring{width:170px;height:170px;border-radius:50%;border:1px solid var(--color-border-strong);position:relative;margin:auto;background:radial-gradient(circle,rgba(255,69,0,.15),transparent 55%)}.ring::before,.ring::after{content:"";position:absolute;inset:14px;border-radius:50%;border:2px solid rgba(255,69,0,.55);border-top-color:transparent;animation:spin 2.2s linear infinite}.ring::after{inset:38px;border-color:rgba(255,255,255,.2);border-bottom-color:var(--color-brand);animation-duration:1.4s;animation-direction:reverse}@keyframes spin{to{transform:rotate(360deg)}}.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:20}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast:nth-child(2){animation-delay:.2s}.toast:nth-child(3){animation-delay:.4s}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}.file-card{border:1px dashed var(--color-border-strong);border-radius:var(--radius-lg);background:rgba(6,6,7,.55);padding:22px;display:flex;gap:16px;align-items:center}.cover{aspect-ratio:16/9;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:radial-gradient(circle at 30% 20%,rgba(255,69,0,.45),transparent 22%),linear-gradient(135deg,#251006,#080809 70%);position:relative;overflow:hidden}.cover::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.65));}.cover-label{position:absolute;left:18px;bottom:16px;right:18px;z-index:1;font-family:var(--font-display);font-size:26px;font-weight:900;line-height:1;letter-spacing:-.03em}.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(920px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:260px;height:260px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.hero-row,.grid-2,.grid-3,.center-card{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}

</style></head><body>
<div class="app-shell">

<aside class="sidebar" aria-label="Admin navigation">
  <a class="brand" href="/"><span class="brand-mark">B</span><span>Basscally Club</span></a>
  <nav class="side-nav">
    <a class="side-link " href="/admin">▦ <span>Metrics</span></a>
    <a class="side-link active" href="/admin/content">▤ <span>Content</span></a>
    <a class="side-link " href="/admin/email-logs">✉ <span>Email logs</span></a>
    <a class="side-link " href="/admin/subscribers">◉ <span>Subscribers</span></a>
    <a class="side-link " href="/admin/settings">⚙ <span>Settings</span></a>
  </nav>
  <div class="side-foot">Admin console<br>Last synced: just now</div>
</aside>

<main class="main">
  <div class="topbar">
    <div><div class="crumb">Screen 19 · Admin content edit</div><h1 class="panel-title" style="font-size:28px">Edit drop</h1></div>
    <div class="screen-tabs"><a class="tab" href="#">Preview</a><a class="tab active" href="#">Editing</a><a class="tab" href="#">Audit</a></div>
  </div>
  <section class="hero-row motion-grid">
    <div class="hero-card card--glow">
      <div class="hero-content">
        <div class="kicker">// Content control room</div>
        <h2 class="title">Ghost-note fill,<br><span class="accent">16th-note pocket.</span></h2>
        <p class="lede">Update the drop without breaking the publishing trail. Drafts can change freely. Published drops keep their email and download history.</p>
        <div class="btn-row"><a class="btn btn--primary" href="#">Save changes</a><a class="btn btn--secondary" href="#">Preview drop</a><a class="btn btn--ghost" href="#">View logs</a></div>
      </div>
    </div>
    <aside class="card panel card--glow">
      <div class="kicker">// Live preview</div>
      <div class="cover"><div class="cover-label">Ghost-note fill<br>16th-note pocket</div></div>
      <div class="divider"></div>
      <div class="grid-2"><div class="mini-stat"><div class="mini-label">Status</div><div><span class="badge badge--info">Scheduled</span></div></div><div class="mini-stat"><div class="mini-label">Publishes</div><div class="mini-value" style="font-size:22px">May 20</div></div></div>
    </aside>
  </section>
  <section class="grid-2 motion-grid">
    <form class="card panel stack">
      <div><h3 class="panel-title">Drop details</h3><p class="panel-sub">Every field here appears on the member detail page.</p></div>
      <div class="grid-2"><label class="field"><span class="label">Title</span><input class="input" value="Ghost-note fill, 16th-note pocket"></label><label class="field"><span class="label">Content type</span><select class="select"><option>Fill</option><option>Groove</option><option>Bass-less cover</option><option>Challenge</option></select></label></div>
      <div class="grid-2"><label class="field"><span class="label">Difficulty</span><select class="select"><option>Advanced</option><option>Beginner</option><option>Intermediate</option></select></label><label class="field"><span class="label">Release date</span><input class="input" type="datetime-local" value="2026-05-20T09:00"></label></div>
      <label class="field"><span class="label">Description</span><textarea class="textarea">A short pocket fill for tightening your timing between bars. Start slow. Keep the ghost notes quiet.</textarea><span class="hint">148 / 500 characters</span></label>
      <div class="file-card"><div style="font-size:28px">🎧</div><div><strong>ghost-note-fill.wav</strong><div class="hint">42.8 MB · private audio bucket</div></div><a class="btn btn--secondary" href="#" style="margin-left:auto">Replace</a></div>
    </form>
    <aside class="card panel stack">
      <div><h3 class="panel-title">Publishing trail</h3><p class="panel-sub">Keep the team clear on what happens next.</p></div>
      <div class="mini-stat"><div class="mini-label">Email subject</div><div style="font-weight:700">[New fill] Ghost-note fill, 16th-note pocket</div></div>
      <label class="field"><span class="label">Email body</span><textarea class="textarea">New practice drop just landed in the Club. This one is for tightening your ghost-note control and landing clean into the next bar.</textarea></label>
      <div class="grid-2"><button class="btn btn--secondary" type="button">Save as draft</button><button class="btn btn--primary" type="button">Update schedule</button></div>
      <div class="pulse-line"></div>
      <div class="table-wrap"><table><tr><th>Event</th><th>Status</th><th>Time</th></tr><tr><td><strong>Created</strong></td><td><span class="badge badge--success">Done</span></td><td>May 13</td></tr><tr><td><strong>Email queued</strong></td><td><span class="badge badge--info">Pending</span></td><td>On publish</td></tr><tr><td><strong>Download access</strong></td><td><span class="badge badge--success">Gated</span></td><td>Active</td></tr></table></div>
    </aside>
  </section>
</main>
</div>
</body></html>
```

## Screen 20: Upload Success Publish Queued

Route: `/admin/content/new success state`
Reference file: `basscally-screen-20-upload-success-publish-queued-motion.html`
Purpose: Publish success and queue started

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Drop published — Basscally Club</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0} html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased} body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden} ::selection{background:var(--color-brand);color:#fff}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1} body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}.hero-row{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(320px,.9fr);gap:24px;align-items:stretch;margin-bottom:24px}.hero-card,.card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.hero-card{padding:36px}.hero-card::before,.card--glow::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.input:focus,.textarea:focus,.select:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}.panel{padding:24px}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.field{display:flex;flex-direction:column;gap:8px}.label{font-size:13px;color:var(--color-text-muted);font-weight:600}.input,.textarea,.select{width:100%;min-height:44px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:#0D0D0F;color:var(--color-text);padding:12px 14px;font:inherit;transition:border .15s var(--ease-out),box-shadow .15s var(--ease-out)}.textarea{min-height:140px;resize:vertical}.hint{font-size:12px;color:var(--color-text-dim)}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:820px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}.divider{height:1px;background:var(--color-border);margin:18px 0}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}.ring{width:170px;height:170px;border-radius:50%;border:1px solid var(--color-border-strong);position:relative;margin:auto;background:radial-gradient(circle,rgba(255,69,0,.15),transparent 55%)}.ring::before,.ring::after{content:"";position:absolute;inset:14px;border-radius:50%;border:2px solid rgba(255,69,0,.55);border-top-color:transparent;animation:spin 2.2s linear infinite}.ring::after{inset:38px;border-color:rgba(255,255,255,.2);border-bottom-color:var(--color-brand);animation-duration:1.4s;animation-direction:reverse}@keyframes spin{to{transform:rotate(360deg)}}.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:20}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast:nth-child(2){animation-delay:.2s}.toast:nth-child(3){animation-delay:.4s}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}.file-card{border:1px dashed var(--color-border-strong);border-radius:var(--radius-lg);background:rgba(6,6,7,.55);padding:22px;display:flex;gap:16px;align-items:center}.cover{aspect-ratio:16/9;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:radial-gradient(circle at 30% 20%,rgba(255,69,0,.45),transparent 22%),linear-gradient(135deg,#251006,#080809 70%);position:relative;overflow:hidden}.cover::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.65));}.cover-label{position:absolute;left:18px;bottom:16px;right:18px;z-index:1;font-family:var(--font-display);font-size:26px;font-weight:900;line-height:1;letter-spacing:-.03em}.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(920px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:260px;height:260px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.hero-row,.grid-2,.grid-3,.center-card{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}

</style></head><body>
<div class="center-page">
  <div class="center-card motion-grid">
    <section class="hero-card card--glow">
      <div class="hero-content">
        <div class="kicker">// Publish queued</div>
        <h1 class="big-status">Drop<br><span style="color:var(--color-brand);font-style:italic">published.</span></h1>
        <p class="lede">The audio is live for active members. Email delivery has entered the queue and will send in batches.</p>
        <div class="btn-row"><a class="btn btn--primary" href="/admin/email-logs">Watch email logs</a><a class="btn btn--secondary" href="/admin/content">Back to content</a></div>
      </div>
    </section>
    <aside class="card panel card--glow stack">
      <div class="status-orb" aria-hidden="true"></div>
      <div class="grid-2"><div class="mini-stat"><div class="mini-label">Queued emails</div><div class="mini-value">147</div></div><div class="mini-stat"><div class="mini-label">ETA</div><div class="mini-value">04m</div></div></div>
      <div class="divider"></div>
      <div class="stack" style="gap:12px">
        <div><span class="badge badge--success">Published</span> <span class="hint">Content row updated</span></div>
        <div><span class="badge badge--info">Queued</span> <span class="hint">147 active subscribers selected</span></div>
        <div><span class="badge badge--warn">Processing</span> <span class="hint">Resend batch starting now</span></div>
      </div>
    </aside>
  </div>
</div>
<div class="toast-stack"><div class="toast toast--success"><div class="toast-dot">✓</div><div><strong>Drop published</strong><p>Members can open and download it now.</p></div><button class="toast-close">×</button></div><div class="toast toast--info"><div class="toast-dot">↗</div><div><strong>Email queue started</strong><p>147 notifications are being prepared.</p></div><button class="toast-close">×</button></div></div>
<script>document.querySelectorAll('.toast-close').forEach(b=>b.onclick=()=>b.closest('.toast').remove())</script>
</body></html>
```

## Screen 21: Member Download Blocked

Route: `/c/[id] blocked state`
Reference file: `basscally-screen-21-member-download-blocked-motion.html`
Purpose: 403 recovery for non-active users

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Download blocked — Basscally Club</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0} html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased} body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden} ::selection{background:var(--color-brand);color:#fff}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1} body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}.hero-row{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(320px,.9fr);gap:24px;align-items:stretch;margin-bottom:24px}.hero-card,.card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.hero-card{padding:36px}.hero-card::before,.card--glow::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.input:focus,.textarea:focus,.select:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}.panel{padding:24px}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.field{display:flex;flex-direction:column;gap:8px}.label{font-size:13px;color:var(--color-text-muted);font-weight:600}.input,.textarea,.select{width:100%;min-height:44px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:#0D0D0F;color:var(--color-text);padding:12px 14px;font:inherit;transition:border .15s var(--ease-out),box-shadow .15s var(--ease-out)}.textarea{min-height:140px;resize:vertical}.hint{font-size:12px;color:var(--color-text-dim)}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:820px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}.divider{height:1px;background:var(--color-border);margin:18px 0}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}.ring{width:170px;height:170px;border-radius:50%;border:1px solid var(--color-border-strong);position:relative;margin:auto;background:radial-gradient(circle,rgba(255,69,0,.15),transparent 55%)}.ring::before,.ring::after{content:"";position:absolute;inset:14px;border-radius:50%;border:2px solid rgba(255,69,0,.55);border-top-color:transparent;animation:spin 2.2s linear infinite}.ring::after{inset:38px;border-color:rgba(255,255,255,.2);border-bottom-color:var(--color-brand);animation-duration:1.4s;animation-direction:reverse}@keyframes spin{to{transform:rotate(360deg)}}.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:20}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast:nth-child(2){animation-delay:.2s}.toast:nth-child(3){animation-delay:.4s}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}.file-card{border:1px dashed var(--color-border-strong);border-radius:var(--radius-lg);background:rgba(6,6,7,.55);padding:22px;display:flex;gap:16px;align-items:center}.cover{aspect-ratio:16/9;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:radial-gradient(circle at 30% 20%,rgba(255,69,0,.45),transparent 22%),linear-gradient(135deg,#251006,#080809 70%);position:relative;overflow:hidden}.cover::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.65));}.cover-label{position:absolute;left:18px;bottom:16px;right:18px;z-index:1;font-family:var(--font-display);font-size:26px;font-weight:900;line-height:1;letter-spacing:-.03em}.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(920px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:260px;height:260px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.hero-row,.grid-2,.grid-3,.center-card{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}

</style></head><body>
<div class="center-page">
  <div class="center-card motion-grid">
    <section class="hero-card card--glow">
      <div class="hero-content">
        <div class="kicker">// Download gate</div>
        <h1 class="big-status">This drop is<br><span style="color:var(--color-brand);font-style:italic">for members.</span></h1>
        <p class="lede">Your session is valid, but your membership is not active. Join the Club to play, download, and keep new drops coming every 3 days.</p>
        <div class="btn-row"><a class="btn btn--primary" href="/checkout">Join the Club — $1.50/month</a><a class="btn btn--secondary" href="/dashboard">Back to dashboard</a></div>
      </div>
    </section>
    <aside class="card panel stack card--glow">
      <div class="cover"><div class="cover-label">Funk slap pattern<br>in E</div></div>
      <div class="grid-2"><div class="mini-stat"><div class="mini-label">Access</div><div><span class="badge badge--danger">Blocked</span></div></div><div class="mini-stat"><div class="mini-label">Reason</div><div class="mini-value" style="font-size:22px">No active sub</div></div></div>
      <div class="divider"></div>
      <div class="stack" style="gap:10px"><div><span class="badge badge--success">Included</span> <span class="hint">New drops every 3 days</span></div><div><span class="badge badge--success">Included</span> <span class="hint">Download audio files</span></div><div><span class="badge badge--success">Included</span> <span class="hint">Cancel anytime</span></div></div>
      <div class="wave" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
    </aside>
  </div>
</div>
<div class="toast-stack"><div class="toast toast--danger"><div class="toast-dot">!</div><div><strong>Download blocked</strong><p>This drop needs an active Basscally Club membership.</p></div><button class="toast-close">×</button></div></div>
<script>document.querySelectorAll('.toast-close').forEach(b=>b.onclick=()=>b.closest('.toast').remove())</script>
</body></html>
```

## Screen 22: Billing Portal Transition

Route: `/account/billing/portal`
Reference file: `basscally-screen-22-billing-portal-transition-motion.html`
Purpose: Redirect to LS portal

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Billing portal — Basscally Club</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0} html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased} body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden} ::selection{background:var(--color-brand);color:#fff}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1} body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}.hero-row{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(320px,.9fr);gap:24px;align-items:stretch;margin-bottom:24px}.hero-card,.card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.hero-card{padding:36px}.hero-card::before,.card--glow::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.input:focus,.textarea:focus,.select:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}.panel{padding:24px}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.field{display:flex;flex-direction:column;gap:8px}.label{font-size:13px;color:var(--color-text-muted);font-weight:600}.input,.textarea,.select{width:100%;min-height:44px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:#0D0D0F;color:var(--color-text);padding:12px 14px;font:inherit;transition:border .15s var(--ease-out),box-shadow .15s var(--ease-out)}.textarea{min-height:140px;resize:vertical}.hint{font-size:12px;color:var(--color-text-dim)}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:820px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}.divider{height:1px;background:var(--color-border);margin:18px 0}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}.ring{width:170px;height:170px;border-radius:50%;border:1px solid var(--color-border-strong);position:relative;margin:auto;background:radial-gradient(circle,rgba(255,69,0,.15),transparent 55%)}.ring::before,.ring::after{content:"";position:absolute;inset:14px;border-radius:50%;border:2px solid rgba(255,69,0,.55);border-top-color:transparent;animation:spin 2.2s linear infinite}.ring::after{inset:38px;border-color:rgba(255,255,255,.2);border-bottom-color:var(--color-brand);animation-duration:1.4s;animation-direction:reverse}@keyframes spin{to{transform:rotate(360deg)}}.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:20}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast:nth-child(2){animation-delay:.2s}.toast:nth-child(3){animation-delay:.4s}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}.file-card{border:1px dashed var(--color-border-strong);border-radius:var(--radius-lg);background:rgba(6,6,7,.55);padding:22px;display:flex;gap:16px;align-items:center}.cover{aspect-ratio:16/9;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:radial-gradient(circle at 30% 20%,rgba(255,69,0,.45),transparent 22%),linear-gradient(135deg,#251006,#080809 70%);position:relative;overflow:hidden}.cover::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.65));}.cover-label{position:absolute;left:18px;bottom:16px;right:18px;z-index:1;font-family:var(--font-display);font-size:26px;font-weight:900;line-height:1;letter-spacing:-.03em}.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(920px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:260px;height:260px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.hero-row,.grid-2,.grid-3,.center-card{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}

</style></head><body>
<div class="center-page">
  <div class="center-card motion-grid">
    <section class="hero-card card--glow">
      <div class="hero-content">
        <div class="kicker">// Secure billing</div>
        <h1 class="big-status">Opening your<br><span style="color:var(--color-brand);font-style:italic">billing portal.</span></h1>
        <p class="lede">You are leaving Basscally Club for the Lemon Squeezy portal. Update your card, cancel, or manage your subscription there.</p>
        <div class="btn-row"><a class="btn btn--primary" href="#">Continue to billing</a><a class="btn btn--secondary" href="/account">Back to membership</a></div>
      </div>
    </section>
    <aside class="card panel card--glow stack" style="align-items:center;text-align:center">
      <div class="ring" aria-hidden="true"></div>
      <div><h2 class="panel-title">Handing off securely</h2><p class="panel-sub">No payment details are stored inside Basscally Club.</p></div>
      <div class="pulse-line" style="width:100%"></div>
      <div class="grid-2" style="width:100%"><div class="mini-stat"><div class="mini-label">Provider</div><div class="mini-value" style="font-size:22px">Lemon</div></div><div class="mini-stat"><div class="mini-label">Return</div><div class="mini-value" style="font-size:22px">Account</div></div></div>
    </aside>
  </div>
</div>
<div class="toast-stack"><div class="toast toast--info"><div class="toast-dot">↗</div><div><strong>Secure redirect ready</strong><p>Continue when you are ready to manage billing.</p></div><button class="toast-close">×</button></div></div>
<script>setTimeout(()=>document.body.classList.add('ready'),700);document.querySelectorAll('.toast-close').forEach(b=>b.onclick=()=>b.closest('.toast').remove())</script>
</body></html>
```

## Screen 23: Toast System

Route: `global component`
Reference file: `basscally-screen-23-toast-system-motion.html`
Purpose: Success, warning, danger, info toasts

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Toast system — Basscally Club</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0} html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased} body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden} ::selection{background:var(--color-brand);color:#fff}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1} body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}.hero-row{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(320px,.9fr);gap:24px;align-items:stretch;margin-bottom:24px}.hero-card,.card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.hero-card{padding:36px}.hero-card::before,.card--glow::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}.btn:focus-visible,.input:focus,.textarea:focus,.select:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}.panel{padding:24px}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.field{display:flex;flex-direction:column;gap:8px}.label{font-size:13px;color:var(--color-text-muted);font-weight:600}.input,.textarea,.select{width:100%;min-height:44px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:#0D0D0F;color:var(--color-text);padding:12px 14px;font:inherit;transition:border .15s var(--ease-out),box-shadow .15s var(--ease-out)}.textarea{min-height:140px;resize:vertical}.hint{font-size:12px;color:var(--color-text-dim)}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:820px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}.divider{height:1px;background:var(--color-border);margin:18px 0}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}.ring{width:170px;height:170px;border-radius:50%;border:1px solid var(--color-border-strong);position:relative;margin:auto;background:radial-gradient(circle,rgba(255,69,0,.15),transparent 55%)}.ring::before,.ring::after{content:"";position:absolute;inset:14px;border-radius:50%;border:2px solid rgba(255,69,0,.55);border-top-color:transparent;animation:spin 2.2s linear infinite}.ring::after{inset:38px;border-color:rgba(255,255,255,.2);border-bottom-color:var(--color-brand);animation-duration:1.4s;animation-direction:reverse}@keyframes spin{to{transform:rotate(360deg)}}.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:20}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast:nth-child(2){animation-delay:.2s}.toast:nth-child(3){animation-delay:.4s}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}.file-card{border:1px dashed var(--color-border-strong);border-radius:var(--radius-lg);background:rgba(6,6,7,.55);padding:22px;display:flex;gap:16px;align-items:center}.cover{aspect-ratio:16/9;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:radial-gradient(circle at 30% 20%,rgba(255,69,0,.45),transparent 22%),linear-gradient(135deg,#251006,#080809 70%);position:relative;overflow:hidden}.cover::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.65));}.cover-label{position:absolute;left:18px;bottom:16px;right:18px;z-index:1;font-family:var(--font-display);font-size:26px;font-weight:900;line-height:1;letter-spacing:-.03em}.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(920px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:260px;height:260px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.hero-row,.grid-2,.grid-3,.center-card{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}

</style></head><body>
<div class="app-shell">

<aside class="sidebar" aria-label="Admin navigation">
  <a class="brand" href="/"><span class="brand-mark">B</span><span>Basscally Club</span></a>
  <nav class="side-nav">
    <a class="side-link " href="/admin">▦ <span>Metrics</span></a>
    <a class="side-link " href="/admin/content">▤ <span>Content</span></a>
    <a class="side-link " href="/admin/email-logs">✉ <span>Email logs</span></a>
    <a class="side-link " href="/admin/subscribers">◉ <span>Subscribers</span></a>
    <a class="side-link active" href="/admin/settings">⚙ <span>Settings</span></a>
  </nav>
  <div class="side-foot">Admin console<br>Last synced: just now</div>
</aside>

<main class="main">
  <div class="topbar"><div><div class="crumb">Screen 23 · Toast system</div><h1 class="panel-title" style="font-size:28px">System feedback</h1></div><div class="screen-tabs"><a class="tab active" href="#">Toast rules</a><a class="tab" href="#">Member</a><a class="tab" href="#">Admin</a></div></div>
  <section class="hero-row motion-grid">
    <div class="hero-card card--glow"><div class="hero-content"><div class="kicker">// Feedback layer</div><h2 class="title">Small messages.<br><span class="accent">Clear outcomes.</span></h2><p class="lede">Toasts should confirm action, reveal failures, and guide the next step. They should never hide important billing or access decisions.</p><div class="btn-row"><button class="btn btn--primary" onclick="spawnToast('success')">Show success</button><button class="btn btn--secondary" onclick="spawnToast('warning')">Show warning</button><button class="btn btn--secondary" onclick="spawnToast('danger')">Show danger</button></div></div></div>
    <aside class="card panel card--glow stack"><div><h3 class="panel-title">Motion rule</h3><p class="panel-sub">Toast slides in, holds long enough to read, then can dismiss. Reduced-motion users get no slide.</p></div><div class="wave" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="mini-stat"><div class="mini-label">Placement</div><div>Top-right desktop, top full-width mobile.</div></div><div class="mini-stat"><div class="mini-label">Duration</div><div>5 seconds for success/info. Manual close for billing, delete, failed payment.</div></div></aside>
  </section>
  <section class="grid-3 motion-grid">
    <div class="card panel"><span class="badge badge--success">Success</span><h3 class="panel-title" style="margin-top:16px">Action completed</h3><p class="panel-sub">Saved draft, published drop, email queued, card updated.</p></div>
    <div class="card panel"><span class="badge badge--warn">Warning</span><h3 class="panel-title" style="margin-top:16px">Action needs care</h3><p class="panel-sub">Past-due billing, scheduled drop conflict, low content buffer.</p></div>
    <div class="card panel"><span class="badge badge--danger">Error</span><h3 class="panel-title" style="margin-top:16px">Action failed</h3><p class="panel-sub">Upload failed, webhook rejected, download blocked, email failed.</p></div>
  </section>
  <section class="card panel" style="margin-top:18px"><h3 class="panel-title">Toast inventory</h3><div class="table-wrap"><table><tr><th>Trigger</th><th>Toast</th><th>Type</th><th>Next action</th></tr><tr><td><strong>Save draft</strong></td><td>Draft saved</td><td><span class="badge badge--success">Success</span></td><td>Keep editing</td></tr><tr><td><strong>Publish now</strong></td><td>Drop published. Email queue started.</td><td><span class="badge badge--success">Success</span></td><td>View logs</td></tr><tr><td><strong>Download blocked</strong></td><td>This drop is for Club members.</td><td><span class="badge badge--danger">Error</span></td><td>Join</td></tr><tr><td><strong>Payment failed</strong></td><td>Update your card to keep access.</td><td><span class="badge badge--warn">Warning</span></td><td>Billing portal</td></tr></table></div></section>
</main></div>
<div class="toast-stack" id="toasts"><div class="toast toast--success"><div class="toast-dot">✓</div><div><strong>Draft saved</strong><p>Your changes are safe. Keep editing or preview the drop.</p></div><button class="toast-close">×</button></div><div class="toast toast--warning"><div class="toast-dot">!</div><div><strong>Payment needs attention</strong><p>Update your card before May 27 to keep access.</p></div><button class="toast-close">×</button></div><div class="toast toast--danger"><div class="toast-dot">×</div><div><strong>Upload failed</strong><p>The file was too large. Use MP3 or WAV under 50MB.</p></div><button class="toast-close">×</button></div></div>
<script>
function bind(){document.querySelectorAll('.toast-close').forEach(b=>b.onclick=()=>b.closest('.toast').remove())} bind();
function spawnToast(type){const copy={success:['✓','Drop published','Email queue started for active members.'],warning:['!','Low content buffer','Only 10 days of scheduled drops remain.'],danger:['×','Something broke','Try again or check the logs.']};const [icon,title,body]=copy[type];const el=document.createElement('div');el.className='toast toast--'+type;el.innerHTML='<div class="toast-dot">'+icon+'</div><div><strong>'+title+'</strong><p>'+body+'</p></div><button class="toast-close">×</button>';document.getElementById('toasts').prepend(el);bind();}
</script>
</body></html>
```

## Screen 24: 404 Not Found

Route: `/not-found`
Reference file: `basscally-screen-24-404-motion.html`
Purpose: Broken routes and missing content

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1}
body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}
.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}
.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}
.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}
.card,.hero-card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.card::before,.hero-card::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}
.panel{padding:24px;position:relative;z-index:1}.hero-card{padding:36px}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}
.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}
.btn:focus-visible,.input:focus,.textarea:focus,.select:focus,.search:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.divider{height:1px;background:var(--color-border);margin:18px 0}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}
.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:760px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}
.search{min-height:44px;width:100%;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(10,10,11,.76);padding:0 16px;color:var(--color-text);font:inherit}
.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(980px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:250px;height:250px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}
@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}
.spin-slow{animation:spin 14s linear infinite}.spin-fast{animation:spin 3.2s linear infinite}.spin-back{animation:spinBack 9s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinBack{to{transform:rotate(-360deg)}}
.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}
.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}
.orbit-wrap{position:relative;width:240px;height:240px;margin:auto}.orbit-ring,.orbit-ring-2{position:absolute;inset:0;border:1px solid rgba(255,69,0,.18);border-radius:50%}.orbit-ring-2{inset:26px;border-color:rgba(96,165,250,.18)}.orbit-dot,.orbit-dot-2{position:absolute;width:16px;height:16px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.55);top:calc(50% - 8px);left:calc(50% - 8px);transform-origin:8px -104px;animation:spin 4s linear infinite}.orbit-dot-2{background:var(--color-info);box-shadow:0 0 18px rgba(96,165,250,.45);transform-origin:8px -78px;animation-duration:6.2s}
.doc-card{background:rgba(9,9,10,.72);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}
.search-empty{min-height:320px;display:grid;place-items:center;text-align:center;padding:30px}.search-radar{position:relative;width:170px;height:170px;border-radius:50%;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at center,rgba(255,69,0,.12),transparent 58%);margin:0 auto 18px}.search-radar::before{content:"";position:absolute;inset:-1px;border-radius:50%;border:1px solid rgba(255,69,0,.18)}.search-radar::after{content:"";position:absolute;left:50%;top:50%;width:2px;height:82px;background:linear-gradient(180deg,rgba(255,69,0,.85),transparent);transform-origin:bottom center;animation:radar 2.4s linear infinite}@keyframes radar{from{transform:translate(-50%,-100%) rotate(0deg)}to{transform:translate(-50%,-100%) rotate(360deg)}}
.error-num{font-family:var(--font-display);font-size:clamp(86px,18vw,220px);line-height:.82;letter-spacing:-.08em;font-weight:900;background:linear-gradient(180deg,#fff,rgba(255,255,255,.48));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 30px rgba(255,255,255,.08)}
.shake-icon{animation:shake 2.3s ease-in-out infinite}@keyframes shake{0%,100%{transform:translateX(0) rotate(0)}10%{transform:translateX(-2px) rotate(-4deg)}20%{transform:translateX(3px) rotate(4deg)}30%{transform:translateX(-3px) rotate(-3deg)}40%{transform:translateX(2px) rotate(3deg)}50%{transform:translateX(0) rotate(0)}}
.email-stack{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.email-preview{background:rgba(10,10,11,.7);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;position:relative}.email-preview header{padding:14px 16px;border-bottom:1px solid var(--color-border);display:flex;justify-content:space-between;align-items:center}.email-preview .content{padding:18px;display:flex;flex-direction:column;gap:14px}.mail-line{height:10px;background:linear-gradient(90deg,rgba(255,255,255,.2),rgba(255,255,255,.06));border-radius:999px;overflow:hidden;position:relative}.mail-line::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,69,0,.28),transparent);transform:translateX(-100%);animation:shine 2.8s linear infinite}.mail-line:nth-child(2)::after{animation-delay:.2s}.mail-line:nth-child(3)::after{animation-delay:.4s}@keyframes shine{to{transform:translateX(100%)}}
.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:30}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.grid-2,.grid-3,.center-card,.email-stack{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}
@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb,.orbit-wrap{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}.error-num{font-size:110px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
</style></head><body><title>404 — Not found — Basscally Club</title><div class="center-page"><div style="width:min(1120px,100%)"><div class="crumb" style="margin-bottom:14px">Screen 24 · Utility state</div>
<div class="center-card motion-grid">
  <section class="hero-card"><div class="hero-content"><div class="kicker">// Wrong route</div><div class="error-num">404</div><h1 class="big-status" style="margin:10px 0 18px">This page missed the groove.</h1><p class="lede">The link may be old, mistyped, or no longer live. The safest next step is to head back to the dashboard or return to the latest drop.</p><div class="btn-row"><a class="btn btn--primary" href="/dashboard">Go to dashboard</a><a class="btn btn--secondary" href="/">Back to home</a></div><div class="divider"></div><div class="badge badge--info">Branded 404</div></div></section>
  <aside class="card panel stack"><div class="orbit-wrap"><div class="orbit-ring"></div><div class="orbit-ring-2"></div><div class="orbit-dot"></div><div class="orbit-dot-2"></div><div style="position:absolute;inset:58px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle,rgba(255,69,0,.22),transparent 70%)"><div style="font-family:var(--font-display);font-size:60px;font-weight:900;color:var(--color-brand)">?</div></div></div><div><h3 class="panel-title">Suggested recovery</h3><p class="panel-sub">Try the main nav, the dashboard search, or the latest email link.</p></div><div class="pulse-line"></div><div class="mini-stat"><div class="mini-label">Common causes</div><div>Expired signed URL · deleted draft link · typo in route</div></div></aside>
</div>
</div></div></body></html>
```

## Screen 25: 500 Error

Route: `/error`
Reference file: `basscally-screen-25-500-motion.html`
Purpose: Production error fallback

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1}
body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}
.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}
.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}
.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}
.card,.hero-card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.card::before,.hero-card::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}
.panel{padding:24px;position:relative;z-index:1}.hero-card{padding:36px}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}
.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}
.btn:focus-visible,.input:focus,.textarea:focus,.select:focus,.search:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.divider{height:1px;background:var(--color-border);margin:18px 0}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}
.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:760px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}
.search{min-height:44px;width:100%;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(10,10,11,.76);padding:0 16px;color:var(--color-text);font:inherit}
.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(980px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:250px;height:250px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}
@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}
.spin-slow{animation:spin 14s linear infinite}.spin-fast{animation:spin 3.2s linear infinite}.spin-back{animation:spinBack 9s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinBack{to{transform:rotate(-360deg)}}
.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}
.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}
.orbit-wrap{position:relative;width:240px;height:240px;margin:auto}.orbit-ring,.orbit-ring-2{position:absolute;inset:0;border:1px solid rgba(255,69,0,.18);border-radius:50%}.orbit-ring-2{inset:26px;border-color:rgba(96,165,250,.18)}.orbit-dot,.orbit-dot-2{position:absolute;width:16px;height:16px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.55);top:calc(50% - 8px);left:calc(50% - 8px);transform-origin:8px -104px;animation:spin 4s linear infinite}.orbit-dot-2{background:var(--color-info);box-shadow:0 0 18px rgba(96,165,250,.45);transform-origin:8px -78px;animation-duration:6.2s}
.doc-card{background:rgba(9,9,10,.72);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}
.search-empty{min-height:320px;display:grid;place-items:center;text-align:center;padding:30px}.search-radar{position:relative;width:170px;height:170px;border-radius:50%;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at center,rgba(255,69,0,.12),transparent 58%);margin:0 auto 18px}.search-radar::before{content:"";position:absolute;inset:-1px;border-radius:50%;border:1px solid rgba(255,69,0,.18)}.search-radar::after{content:"";position:absolute;left:50%;top:50%;width:2px;height:82px;background:linear-gradient(180deg,rgba(255,69,0,.85),transparent);transform-origin:bottom center;animation:radar 2.4s linear infinite}@keyframes radar{from{transform:translate(-50%,-100%) rotate(0deg)}to{transform:translate(-50%,-100%) rotate(360deg)}}
.error-num{font-family:var(--font-display);font-size:clamp(86px,18vw,220px);line-height:.82;letter-spacing:-.08em;font-weight:900;background:linear-gradient(180deg,#fff,rgba(255,255,255,.48));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 30px rgba(255,255,255,.08)}
.shake-icon{animation:shake 2.3s ease-in-out infinite}@keyframes shake{0%,100%{transform:translateX(0) rotate(0)}10%{transform:translateX(-2px) rotate(-4deg)}20%{transform:translateX(3px) rotate(4deg)}30%{transform:translateX(-3px) rotate(-3deg)}40%{transform:translateX(2px) rotate(3deg)}50%{transform:translateX(0) rotate(0)}}
.email-stack{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.email-preview{background:rgba(10,10,11,.7);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;position:relative}.email-preview header{padding:14px 16px;border-bottom:1px solid var(--color-border);display:flex;justify-content:space-between;align-items:center}.email-preview .content{padding:18px;display:flex;flex-direction:column;gap:14px}.mail-line{height:10px;background:linear-gradient(90deg,rgba(255,255,255,.2),rgba(255,255,255,.06));border-radius:999px;overflow:hidden;position:relative}.mail-line::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,69,0,.28),transparent);transform:translateX(-100%);animation:shine 2.8s linear infinite}.mail-line:nth-child(2)::after{animation-delay:.2s}.mail-line:nth-child(3)::after{animation-delay:.4s}@keyframes shine{to{transform:translateX(100%)}}
.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:30}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.grid-2,.grid-3,.center-card,.email-stack{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}
@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb,.orbit-wrap{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}.error-num{font-size:110px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
</style></head><body><title>500 — Something broke — Basscally Club</title><div class="center-page"><div style="width:min(1120px,100%)"><div class="crumb" style="margin-bottom:14px">Screen 25 · Utility state</div>
<div class="center-card motion-grid">
  <section class="hero-card"><div class="hero-content"><div class="kicker">// System fault</div><div class="error-num">500</div><h1 class="big-status" style="margin:10px 0 18px">The amp clipped.<br><span style="color:var(--color-brand);font-style:italic">Try again?</span></h1><p class="lede">Something broke on our side. Save your place, retry the action, or return to a stable screen. This page is for production confidence, not panic.</p><div class="btn-row"><button class="btn btn--primary" onclick="location.reload()">Retry</button><a class="btn btn--secondary" href="/dashboard">Dashboard</a></div></div></section>
  <aside class="card panel stack"><div class="status-orb"><div style="position:absolute;inset:0;display:grid;place-items:center;font-size:54px">⚡</div></div><div class="wave" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div><h3 class="panel-title">Recovery behavior</h3><p class="panel-sub">Offer retry, safe fallback, and a support route. Do not trap the user on a dead screen.</p></div><div class="badge badge--danger">Server error</div></aside>
</div>
</div></div></body></html>
```

## Screen 26: Admin Unauthorized

Route: `/admin unauthorized state`
Reference file: `basscally-screen-26-admin-unauthorized-motion.html`
Purpose: Admin route guard rejection

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1}
body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}
.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}
.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}
.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}
.card,.hero-card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.card::before,.hero-card::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}
.panel{padding:24px;position:relative;z-index:1}.hero-card{padding:36px}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}
.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}
.btn:focus-visible,.input:focus,.textarea:focus,.select:focus,.search:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.divider{height:1px;background:var(--color-border);margin:18px 0}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}
.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:760px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}
.search{min-height:44px;width:100%;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(10,10,11,.76);padding:0 16px;color:var(--color-text);font:inherit}
.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(980px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:250px;height:250px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}
@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}
.spin-slow{animation:spin 14s linear infinite}.spin-fast{animation:spin 3.2s linear infinite}.spin-back{animation:spinBack 9s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinBack{to{transform:rotate(-360deg)}}
.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}
.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}
.orbit-wrap{position:relative;width:240px;height:240px;margin:auto}.orbit-ring,.orbit-ring-2{position:absolute;inset:0;border:1px solid rgba(255,69,0,.18);border-radius:50%}.orbit-ring-2{inset:26px;border-color:rgba(96,165,250,.18)}.orbit-dot,.orbit-dot-2{position:absolute;width:16px;height:16px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.55);top:calc(50% - 8px);left:calc(50% - 8px);transform-origin:8px -104px;animation:spin 4s linear infinite}.orbit-dot-2{background:var(--color-info);box-shadow:0 0 18px rgba(96,165,250,.45);transform-origin:8px -78px;animation-duration:6.2s}
.doc-card{background:rgba(9,9,10,.72);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}
.search-empty{min-height:320px;display:grid;place-items:center;text-align:center;padding:30px}.search-radar{position:relative;width:170px;height:170px;border-radius:50%;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at center,rgba(255,69,0,.12),transparent 58%);margin:0 auto 18px}.search-radar::before{content:"";position:absolute;inset:-1px;border-radius:50%;border:1px solid rgba(255,69,0,.18)}.search-radar::after{content:"";position:absolute;left:50%;top:50%;width:2px;height:82px;background:linear-gradient(180deg,rgba(255,69,0,.85),transparent);transform-origin:bottom center;animation:radar 2.4s linear infinite}@keyframes radar{from{transform:translate(-50%,-100%) rotate(0deg)}to{transform:translate(-50%,-100%) rotate(360deg)}}
.error-num{font-family:var(--font-display);font-size:clamp(86px,18vw,220px);line-height:.82;letter-spacing:-.08em;font-weight:900;background:linear-gradient(180deg,#fff,rgba(255,255,255,.48));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 30px rgba(255,255,255,.08)}
.shake-icon{animation:shake 2.3s ease-in-out infinite}@keyframes shake{0%,100%{transform:translateX(0) rotate(0)}10%{transform:translateX(-2px) rotate(-4deg)}20%{transform:translateX(3px) rotate(4deg)}30%{transform:translateX(-3px) rotate(-3deg)}40%{transform:translateX(2px) rotate(3deg)}50%{transform:translateX(0) rotate(0)}}
.email-stack{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.email-preview{background:rgba(10,10,11,.7);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;position:relative}.email-preview header{padding:14px 16px;border-bottom:1px solid var(--color-border);display:flex;justify-content:space-between;align-items:center}.email-preview .content{padding:18px;display:flex;flex-direction:column;gap:14px}.mail-line{height:10px;background:linear-gradient(90deg,rgba(255,255,255,.2),rgba(255,255,255,.06));border-radius:999px;overflow:hidden;position:relative}.mail-line::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,69,0,.28),transparent);transform:translateX(-100%);animation:shine 2.8s linear infinite}.mail-line:nth-child(2)::after{animation-delay:.2s}.mail-line:nth-child(3)::after{animation-delay:.4s}@keyframes shine{to{transform:translateX(100%)}}
.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:30}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.grid-2,.grid-3,.center-card,.email-stack{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}
@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb,.orbit-wrap{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}.error-num{font-size:110px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
</style></head><body><title>Admin unauthorized — Basscally Club</title><div class="center-page"><div style="width:min(1120px,100%)"><div class="crumb" style="margin-bottom:14px">Screen 26 · Admin guard</div>
<div class="center-card motion-grid">
  <section class="hero-card"><div class="hero-content"><div class="kicker">// Access denied</div><h1 class="title">This console is <span class="accent">not yours.</span></h1><p class="lede">You signed in successfully, but your email does not have admin permission for this area. Ask a super admin for access, or return to the member side.</p><div class="btn-row"><a class="btn btn--primary" href="/dashboard">Go to dashboard</a><a class="btn btn--secondary" href="/auth/login">Sign in with another email</a></div><div class="divider"></div><div class="badge badge--warn">Admin only route</div></div></section>
  <aside class="card panel stack"><div class="orbit-wrap"><div class="orbit-ring"></div><div class="orbit-ring-2"></div><div style="position:absolute;inset:40px;border-radius:50%;border:1px solid rgba(255,255,255,.08)"></div><div style="position:absolute;inset:0;display:grid;place-items:center"><div style="width:96px;height:112px;border:1px solid rgba(255,69,0,.35);border-radius:36px 36px 20px 20px;background:linear-gradient(180deg,rgba(255,69,0,.18),rgba(255,69,0,.04));position:relative"><div style="position:absolute;left:26px;top:-28px;width:42px;height:40px;border:8px solid var(--color-brand);border-bottom:0;border-radius:20px 20px 0 0"></div><div style="position:absolute;inset:0;display:grid;place-items:center;font-size:36px;color:var(--color-brand)">!</div></div></div></div><div><h3 class="panel-title">Server check</h3><p class="panel-sub">Admin routes must be gated by middleware and a server-side email or role check.</p></div></aside>
</div>
</div></div></body></html>
```

## Screen 27: Manual Resend Confirmation

Route: `/admin/email-logs/resend`
Reference file: `basscally-screen-27-manual-resend-confirmation-motion.html`
Purpose: Resend failed emails safely

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1}
body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}
.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}
.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}
.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}
.card,.hero-card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.card::before,.hero-card::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}
.panel{padding:24px;position:relative;z-index:1}.hero-card{padding:36px}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}
.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}
.btn:focus-visible,.input:focus,.textarea:focus,.select:focus,.search:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.divider{height:1px;background:var(--color-border);margin:18px 0}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}
.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:760px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}
.search{min-height:44px;width:100%;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(10,10,11,.76);padding:0 16px;color:var(--color-text);font:inherit}
.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(980px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:250px;height:250px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}
@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}
.spin-slow{animation:spin 14s linear infinite}.spin-fast{animation:spin 3.2s linear infinite}.spin-back{animation:spinBack 9s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinBack{to{transform:rotate(-360deg)}}
.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}
.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}
.orbit-wrap{position:relative;width:240px;height:240px;margin:auto}.orbit-ring,.orbit-ring-2{position:absolute;inset:0;border:1px solid rgba(255,69,0,.18);border-radius:50%}.orbit-ring-2{inset:26px;border-color:rgba(96,165,250,.18)}.orbit-dot,.orbit-dot-2{position:absolute;width:16px;height:16px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.55);top:calc(50% - 8px);left:calc(50% - 8px);transform-origin:8px -104px;animation:spin 4s linear infinite}.orbit-dot-2{background:var(--color-info);box-shadow:0 0 18px rgba(96,165,250,.45);transform-origin:8px -78px;animation-duration:6.2s}
.doc-card{background:rgba(9,9,10,.72);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}
.search-empty{min-height:320px;display:grid;place-items:center;text-align:center;padding:30px}.search-radar{position:relative;width:170px;height:170px;border-radius:50%;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at center,rgba(255,69,0,.12),transparent 58%);margin:0 auto 18px}.search-radar::before{content:"";position:absolute;inset:-1px;border-radius:50%;border:1px solid rgba(255,69,0,.18)}.search-radar::after{content:"";position:absolute;left:50%;top:50%;width:2px;height:82px;background:linear-gradient(180deg,rgba(255,69,0,.85),transparent);transform-origin:bottom center;animation:radar 2.4s linear infinite}@keyframes radar{from{transform:translate(-50%,-100%) rotate(0deg)}to{transform:translate(-50%,-100%) rotate(360deg)}}
.error-num{font-family:var(--font-display);font-size:clamp(86px,18vw,220px);line-height:.82;letter-spacing:-.08em;font-weight:900;background:linear-gradient(180deg,#fff,rgba(255,255,255,.48));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 30px rgba(255,255,255,.08)}
.shake-icon{animation:shake 2.3s ease-in-out infinite}@keyframes shake{0%,100%{transform:translateX(0) rotate(0)}10%{transform:translateX(-2px) rotate(-4deg)}20%{transform:translateX(3px) rotate(4deg)}30%{transform:translateX(-3px) rotate(-3deg)}40%{transform:translateX(2px) rotate(3deg)}50%{transform:translateX(0) rotate(0)}}
.email-stack{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.email-preview{background:rgba(10,10,11,.7);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;position:relative}.email-preview header{padding:14px 16px;border-bottom:1px solid var(--color-border);display:flex;justify-content:space-between;align-items:center}.email-preview .content{padding:18px;display:flex;flex-direction:column;gap:14px}.mail-line{height:10px;background:linear-gradient(90deg,rgba(255,255,255,.2),rgba(255,255,255,.06));border-radius:999px;overflow:hidden;position:relative}.mail-line::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,69,0,.28),transparent);transform:translateX(-100%);animation:shine 2.8s linear infinite}.mail-line:nth-child(2)::after{animation-delay:.2s}.mail-line:nth-child(3)::after{animation-delay:.4s}@keyframes shine{to{transform:translateX(100%)}}
.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:30}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.grid-2,.grid-3,.center-card,.email-stack{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}
@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb,.orbit-wrap{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}.error-num{font-size:110px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
</style></head><body><title>Manual resend confirmation — Basscally Club</title><div class="app-shell"><aside class="sidebar" aria-label="Admin navigation"><a class="brand" href="/"><span class="brand-mark">B</span><span>Basscally Club</span></a><nav class="side-nav"><a class="side-link " href="/admin">▦ <span>Metrics</span></a><a class="side-link " href="/admin/content">▤ <span>Content</span></a><a class="side-link active" href="/admin/email-logs">✉ <span>Email logs</span></a><a class="side-link " href="/admin/subscribers">◉ <span>Subscribers</span></a><a class="side-link " href="/admin/settings">⚙ <span>Settings</span></a></nav><div class="side-foot">Admin console<br>Last synced: just now</div></aside><main class="main"><div class="topbar"><div><div class="crumb">Screen 27 · Admin utility</div><h1 class="panel-title" style="font-size:28px">Manual resend confirmation</h1></div><div class="screen-tabs"><a class="tab" href="#">Logs</a><a class="tab active" href="#">Resend</a><a class="tab" href="#">Queue health</a></div></div>
<section class="grid-2 motion-grid">
  <div class="hero-card"><div class="hero-content"><div class="kicker">// Email retry</div><h2 class="title">Resend this drop<br><span class="accent">to active members?</span></h2><p class="lede">Use this only when a send failed, bounced unexpectedly, or the first queue was interrupted. Avoid duplicate sends when the original queue already completed.</p><div class="btn-row"><button class="btn btn--primary" onclick="spawnToast('success')">Resend to 412 members</button><a class="btn btn--secondary" href="/admin/email-logs">Back to logs</a></div></div></div>
  <aside class="card panel stack"><div class="orbit-wrap"><div class="orbit-ring"></div><div class="orbit-ring-2"></div><div class="orbit-dot"></div><div style="position:absolute;inset:0;display:grid;place-items:center;font-size:56px">✉</div></div><div><h3 class="panel-title">Resend scope</h3><p class="panel-sub">Only active subscribers. Skip bounced emails. Keep the subject line consistent unless the original was wrong.</p></div><div class="badge badge--brand">Drop: Funk slap pattern in E</div></aside>
</section>
<section class="card panel" style="margin-top:18px"><h3 class="panel-title">Pre-flight check</h3><div class="table-wrap"><table><tr><th>Check</th><th>Status</th><th>Reason</th></tr><tr><td><strong>Original queue finished</strong></td><td><span class="badge badge--success">Yes</span></td><td>Safe to retry only failed recipients</td></tr><tr><td><strong>Failed recipients</strong></td><td><span class="badge badge--warn">48</span></td><td>29 temporary failures, 19 provider timeouts</td></tr><tr><td><strong>Bounced addresses</strong></td><td><span class="badge badge--danger">3 skipped</span></td><td>Hard bounces excluded</td></tr></table></div></section>
<div class="toast-stack" id="toasts"></div>
<script>function spawnToast(type){const el=document.createElement('div');el.className='toast toast--success';el.innerHTML='<div class="toast-dot">✓</div><div><strong>Resend started</strong><p>48 failed recipients have been queued again.</p></div><button class="toast-close" onclick="this.parentNode.remove()">×</button>';document.getElementById('toasts').prepend(el);}</script>
</main></div></body></html>
```

## Screen 28: Soft Delete Confirmation

Route: `/admin/content/[id]/delete`
Reference file: `basscally-screen-28-soft-delete-confirmation-motion.html`
Purpose: Archive content, do not hard delete

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1}
body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}
.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}
.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}
.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}
.card,.hero-card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.card::before,.hero-card::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}
.panel{padding:24px;position:relative;z-index:1}.hero-card{padding:36px}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}
.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}
.btn:focus-visible,.input:focus,.textarea:focus,.select:focus,.search:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.divider{height:1px;background:var(--color-border);margin:18px 0}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}
.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:760px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}
.search{min-height:44px;width:100%;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(10,10,11,.76);padding:0 16px;color:var(--color-text);font:inherit}
.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(980px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:250px;height:250px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}
@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}
.spin-slow{animation:spin 14s linear infinite}.spin-fast{animation:spin 3.2s linear infinite}.spin-back{animation:spinBack 9s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinBack{to{transform:rotate(-360deg)}}
.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}
.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}
.orbit-wrap{position:relative;width:240px;height:240px;margin:auto}.orbit-ring,.orbit-ring-2{position:absolute;inset:0;border:1px solid rgba(255,69,0,.18);border-radius:50%}.orbit-ring-2{inset:26px;border-color:rgba(96,165,250,.18)}.orbit-dot,.orbit-dot-2{position:absolute;width:16px;height:16px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.55);top:calc(50% - 8px);left:calc(50% - 8px);transform-origin:8px -104px;animation:spin 4s linear infinite}.orbit-dot-2{background:var(--color-info);box-shadow:0 0 18px rgba(96,165,250,.45);transform-origin:8px -78px;animation-duration:6.2s}
.doc-card{background:rgba(9,9,10,.72);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}
.search-empty{min-height:320px;display:grid;place-items:center;text-align:center;padding:30px}.search-radar{position:relative;width:170px;height:170px;border-radius:50%;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at center,rgba(255,69,0,.12),transparent 58%);margin:0 auto 18px}.search-radar::before{content:"";position:absolute;inset:-1px;border-radius:50%;border:1px solid rgba(255,69,0,.18)}.search-radar::after{content:"";position:absolute;left:50%;top:50%;width:2px;height:82px;background:linear-gradient(180deg,rgba(255,69,0,.85),transparent);transform-origin:bottom center;animation:radar 2.4s linear infinite}@keyframes radar{from{transform:translate(-50%,-100%) rotate(0deg)}to{transform:translate(-50%,-100%) rotate(360deg)}}
.error-num{font-family:var(--font-display);font-size:clamp(86px,18vw,220px);line-height:.82;letter-spacing:-.08em;font-weight:900;background:linear-gradient(180deg,#fff,rgba(255,255,255,.48));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 30px rgba(255,255,255,.08)}
.shake-icon{animation:shake 2.3s ease-in-out infinite}@keyframes shake{0%,100%{transform:translateX(0) rotate(0)}10%{transform:translateX(-2px) rotate(-4deg)}20%{transform:translateX(3px) rotate(4deg)}30%{transform:translateX(-3px) rotate(-3deg)}40%{transform:translateX(2px) rotate(3deg)}50%{transform:translateX(0) rotate(0)}}
.email-stack{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.email-preview{background:rgba(10,10,11,.7);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;position:relative}.email-preview header{padding:14px 16px;border-bottom:1px solid var(--color-border);display:flex;justify-content:space-between;align-items:center}.email-preview .content{padding:18px;display:flex;flex-direction:column;gap:14px}.mail-line{height:10px;background:linear-gradient(90deg,rgba(255,255,255,.2),rgba(255,255,255,.06));border-radius:999px;overflow:hidden;position:relative}.mail-line::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,69,0,.28),transparent);transform:translateX(-100%);animation:shine 2.8s linear infinite}.mail-line:nth-child(2)::after{animation-delay:.2s}.mail-line:nth-child(3)::after{animation-delay:.4s}@keyframes shine{to{transform:translateX(100%)}}
.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:30}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.grid-2,.grid-3,.center-card,.email-stack{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}
@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb,.orbit-wrap{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}.error-num{font-size:110px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
</style></head><body><title>Soft delete confirmation — Basscally Club</title><div class="app-shell"><aside class="sidebar" aria-label="Admin navigation"><a class="brand" href="/"><span class="brand-mark">B</span><span>Basscally Club</span></a><nav class="side-nav"><a class="side-link " href="/admin">▦ <span>Metrics</span></a><a class="side-link active" href="/admin/content">▤ <span>Content</span></a><a class="side-link " href="/admin/email-logs">✉ <span>Email logs</span></a><a class="side-link " href="/admin/subscribers">◉ <span>Subscribers</span></a><a class="side-link " href="/admin/settings">⚙ <span>Settings</span></a></nav><div class="side-foot">Admin console<br>Last synced: just now</div></aside><main class="main"><div class="topbar"><div><div class="crumb">Screen 28 · Admin utility</div><h1 class="panel-title" style="font-size:28px">Soft delete confirmation</h1></div><div class="screen-tabs"><a class="tab" href="#">Edit</a><a class="tab active" href="#">Delete</a><a class="tab" href="#">Restore logic</a></div></div>
<section class="grid-2 motion-grid">
  <div class="hero-card"><div class="hero-content"><div class="kicker">// Destructive action</div><h2 class="title">Soft delete this drop?<br><span class="accent">Not gone forever.</span></h2><p class="lede">The drop will be hidden from members and removed from future sends, but preserved in the database for audit and recovery. Use this for mistakes, duplicates, or pulled content.</p><div class="btn-row"><button class="btn btn--primary" onclick="spawnDanger()">Soft delete drop</button><a class="btn btn--secondary" href="/admin/content/123">Keep editing</a></div></div></div>
  <aside class="card panel stack"><div class="orbit-wrap"><div class="orbit-ring shake-icon" style="border-color:rgba(248,113,113,.35)"></div><div class="orbit-ring-2 shake-icon" style="animation-delay:.2s"></div><div style="position:absolute;inset:0;display:grid;place-items:center"><div class="shake-icon" style="font-size:68px;filter:drop-shadow(0 0 18px rgba(248,113,113,.22))">🗑</div></div></div><div class="pulse-line"></div><div><h3 class="panel-title">What happens next</h3><p class="panel-sub">Status becomes archived, download links break for members, and admins can restore later from the content list.</p></div><div class="badge badge--danger">Obvious motion</div></aside>
</section>
<section class="grid-3 motion-grid" style="margin-top:18px"><div class="mini-stat"><div class="mini-label">Affected members</div><div class="mini-value">412</div></div><div class="mini-stat"><div class="mini-label">Email sends already made</div><div class="mini-value">1,204</div></div><div class="mini-stat"><div class="mini-label">Recoverable</div><div class="mini-value">Yes</div></div></section>
<div class="toast-stack" id="toasts"></div><script>function spawnDanger(){const el=document.createElement('div');el.className='toast toast--danger';el.innerHTML='<div class="toast-dot">×</div><div><strong>Drop archived</strong><p>The content has been soft deleted and hidden from members.</p></div><button class="toast-close" onclick="this.parentNode.remove()">×</button>';document.getElementById('toasts').prepend(el);}</script>
</main></div></body></html>
```

## Screen 29: Empty Search Results

Route: `member/admin state`
Reference file: `basscally-screen-29-empty-search-results-motion.html`
Purpose: Search/filter no-results

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1}
body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}
.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}
.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}
.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}
.card,.hero-card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.card::before,.hero-card::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}
.panel{padding:24px;position:relative;z-index:1}.hero-card{padding:36px}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}
.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}
.btn:focus-visible,.input:focus,.textarea:focus,.select:focus,.search:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.divider{height:1px;background:var(--color-border);margin:18px 0}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}
.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:760px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}
.search{min-height:44px;width:100%;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(10,10,11,.76);padding:0 16px;color:var(--color-text);font:inherit}
.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(980px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:250px;height:250px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}
@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}
.spin-slow{animation:spin 14s linear infinite}.spin-fast{animation:spin 3.2s linear infinite}.spin-back{animation:spinBack 9s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinBack{to{transform:rotate(-360deg)}}
.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}
.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}
.orbit-wrap{position:relative;width:240px;height:240px;margin:auto}.orbit-ring,.orbit-ring-2{position:absolute;inset:0;border:1px solid rgba(255,69,0,.18);border-radius:50%}.orbit-ring-2{inset:26px;border-color:rgba(96,165,250,.18)}.orbit-dot,.orbit-dot-2{position:absolute;width:16px;height:16px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.55);top:calc(50% - 8px);left:calc(50% - 8px);transform-origin:8px -104px;animation:spin 4s linear infinite}.orbit-dot-2{background:var(--color-info);box-shadow:0 0 18px rgba(96,165,250,.45);transform-origin:8px -78px;animation-duration:6.2s}
.doc-card{background:rgba(9,9,10,.72);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}
.search-empty{min-height:320px;display:grid;place-items:center;text-align:center;padding:30px}.search-radar{position:relative;width:170px;height:170px;border-radius:50%;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at center,rgba(255,69,0,.12),transparent 58%);margin:0 auto 18px}.search-radar::before{content:"";position:absolute;inset:-1px;border-radius:50%;border:1px solid rgba(255,69,0,.18)}.search-radar::after{content:"";position:absolute;left:50%;top:50%;width:2px;height:82px;background:linear-gradient(180deg,rgba(255,69,0,.85),transparent);transform-origin:bottom center;animation:radar 2.4s linear infinite}@keyframes radar{from{transform:translate(-50%,-100%) rotate(0deg)}to{transform:translate(-50%,-100%) rotate(360deg)}}
.error-num{font-family:var(--font-display);font-size:clamp(86px,18vw,220px);line-height:.82;letter-spacing:-.08em;font-weight:900;background:linear-gradient(180deg,#fff,rgba(255,255,255,.48));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 30px rgba(255,255,255,.08)}
.shake-icon{animation:shake 2.3s ease-in-out infinite}@keyframes shake{0%,100%{transform:translateX(0) rotate(0)}10%{transform:translateX(-2px) rotate(-4deg)}20%{transform:translateX(3px) rotate(4deg)}30%{transform:translateX(-3px) rotate(-3deg)}40%{transform:translateX(2px) rotate(3deg)}50%{transform:translateX(0) rotate(0)}}
.email-stack{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.email-preview{background:rgba(10,10,11,.7);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;position:relative}.email-preview header{padding:14px 16px;border-bottom:1px solid var(--color-border);display:flex;justify-content:space-between;align-items:center}.email-preview .content{padding:18px;display:flex;flex-direction:column;gap:14px}.mail-line{height:10px;background:linear-gradient(90deg,rgba(255,255,255,.2),rgba(255,255,255,.06));border-radius:999px;overflow:hidden;position:relative}.mail-line::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,69,0,.28),transparent);transform:translateX(-100%);animation:shine 2.8s linear infinite}.mail-line:nth-child(2)::after{animation-delay:.2s}.mail-line:nth-child(3)::after{animation-delay:.4s}@keyframes shine{to{transform:translateX(100%)}}
.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:30}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.grid-2,.grid-3,.center-card,.email-stack{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}
@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb,.orbit-wrap{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}.error-num{font-size:110px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
</style></head><body><title>Empty search results — Basscally Club</title><div class="app-shell"><aside class="sidebar" aria-label="Admin navigation"><a class="brand" href="/"><span class="brand-mark">B</span><span>Basscally Club</span></a><nav class="side-nav"><a class="side-link " href="/admin">▦ <span>Metrics</span></a><a class="side-link active" href="/admin/content">▤ <span>Content</span></a><a class="side-link " href="/admin/email-logs">✉ <span>Email logs</span></a><a class="side-link " href="/admin/subscribers">◉ <span>Subscribers</span></a><a class="side-link " href="/admin/settings">⚙ <span>Settings</span></a></nav><div class="side-foot">Admin console<br>Last synced: just now</div></aside><main class="main"><div class="topbar"><div><div class="crumb">Screen 29 · State variant</div><h1 class="panel-title" style="font-size:28px">Empty search results</h1></div><div class="screen-tabs"><a class="tab active" href="#">Search</a><a class="tab" href="#">Filters</a><a class="tab" href="#">Suggestions</a></div></div>
<section class="card panel motion-grid"><div style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap"><div><div class="kicker">// Search state</div><h2 class="panel-title" style="font-size:30px">Nothing matched “slap drill”.</h2><p class="panel-sub">This state should be clear, helpful, and never look broken.</p></div><div style="display:flex;gap:10px;min-width:min(360px,100%);flex:1"><input class="search" value="slap drill" aria-label="Search"><button class="btn btn--secondary">Clear search</button></div></div></section>
<section class="card search-empty motion-grid" style="margin-top:18px"><div><div class="search-radar"></div><h3 class="panel-title" style="font-size:32px">No drops yet.</h3><p class="lede" style="max-width:560px;margin:0 auto 20px">Try a broader search, remove filters, or create a new drop. This screen covers member and admin empty-search behavior.</p><div class="btn-row" style="justify-content:center"><button class="btn btn--primary">Create new drop</button><button class="btn btn--secondary">Reset filters</button></div></div></section>
<section class="grid-3 motion-grid" style="margin-top:18px"><div class="mini-stat"><div class="mini-label">Active filters</div><div>Type: Groove · Status: Published</div></div><div class="mini-stat"><div class="mini-label">Suggested search</div><div>Try “funk”, “fill”, or “E minor”</div></div><div class="mini-stat"><div class="mini-label">Empty-state tone</div><div>Calm, clear, no blame</div></div></section>
</main></div></body></html>
```

## Screen 30: Download Rate Limit

Route: `/c/[id] rate-limited state`
Reference file: `basscally-screen-30-download-rate-limit-motion.html`
Purpose: 60 downloads per user/hour protection

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1}
body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}
.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}
.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}
.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}
.card,.hero-card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.card::before,.hero-card::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}
.panel{padding:24px;position:relative;z-index:1}.hero-card{padding:36px}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}
.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}
.btn:focus-visible,.input:focus,.textarea:focus,.select:focus,.search:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.divider{height:1px;background:var(--color-border);margin:18px 0}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}
.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:760px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}
.search{min-height:44px;width:100%;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(10,10,11,.76);padding:0 16px;color:var(--color-text);font:inherit}
.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(980px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:250px;height:250px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}
@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}
.spin-slow{animation:spin 14s linear infinite}.spin-fast{animation:spin 3.2s linear infinite}.spin-back{animation:spinBack 9s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinBack{to{transform:rotate(-360deg)}}
.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}
.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}
.orbit-wrap{position:relative;width:240px;height:240px;margin:auto}.orbit-ring,.orbit-ring-2{position:absolute;inset:0;border:1px solid rgba(255,69,0,.18);border-radius:50%}.orbit-ring-2{inset:26px;border-color:rgba(96,165,250,.18)}.orbit-dot,.orbit-dot-2{position:absolute;width:16px;height:16px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.55);top:calc(50% - 8px);left:calc(50% - 8px);transform-origin:8px -104px;animation:spin 4s linear infinite}.orbit-dot-2{background:var(--color-info);box-shadow:0 0 18px rgba(96,165,250,.45);transform-origin:8px -78px;animation-duration:6.2s}
.doc-card{background:rgba(9,9,10,.72);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}
.search-empty{min-height:320px;display:grid;place-items:center;text-align:center;padding:30px}.search-radar{position:relative;width:170px;height:170px;border-radius:50%;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at center,rgba(255,69,0,.12),transparent 58%);margin:0 auto 18px}.search-radar::before{content:"";position:absolute;inset:-1px;border-radius:50%;border:1px solid rgba(255,69,0,.18)}.search-radar::after{content:"";position:absolute;left:50%;top:50%;width:2px;height:82px;background:linear-gradient(180deg,rgba(255,69,0,.85),transparent);transform-origin:bottom center;animation:radar 2.4s linear infinite}@keyframes radar{from{transform:translate(-50%,-100%) rotate(0deg)}to{transform:translate(-50%,-100%) rotate(360deg)}}
.error-num{font-family:var(--font-display);font-size:clamp(86px,18vw,220px);line-height:.82;letter-spacing:-.08em;font-weight:900;background:linear-gradient(180deg,#fff,rgba(255,255,255,.48));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 30px rgba(255,255,255,.08)}
.shake-icon{animation:shake 2.3s ease-in-out infinite}@keyframes shake{0%,100%{transform:translateX(0) rotate(0)}10%{transform:translateX(-2px) rotate(-4deg)}20%{transform:translateX(3px) rotate(4deg)}30%{transform:translateX(-3px) rotate(-3deg)}40%{transform:translateX(2px) rotate(3deg)}50%{transform:translateX(0) rotate(0)}}
.email-stack{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.email-preview{background:rgba(10,10,11,.7);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;position:relative}.email-preview header{padding:14px 16px;border-bottom:1px solid var(--color-border);display:flex;justify-content:space-between;align-items:center}.email-preview .content{padding:18px;display:flex;flex-direction:column;gap:14px}.mail-line{height:10px;background:linear-gradient(90deg,rgba(255,255,255,.2),rgba(255,255,255,.06));border-radius:999px;overflow:hidden;position:relative}.mail-line::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,69,0,.28),transparent);transform:translateX(-100%);animation:shine 2.8s linear infinite}.mail-line:nth-child(2)::after{animation-delay:.2s}.mail-line:nth-child(3)::after{animation-delay:.4s}@keyframes shine{to{transform:translateX(100%)}}
.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:30}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.grid-2,.grid-3,.center-card,.email-stack{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}
@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb,.orbit-wrap{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}.error-num{font-size:110px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
</style></head><body><title>Download rate-limit state — Basscally Club</title><div class="center-page"><div style="width:min(1120px,100%)"><div class="crumb" style="margin-bottom:14px">Screen 30 · Access protection</div>
<div class="center-card motion-grid">
  <section class="hero-card"><div class="hero-content"><div class="kicker">// Protection state</div><h1 class="title">Too many downloads,<br><span class="accent">too fast.</span></h1><p class="lede">You have hit the temporary download limit for this hour. The track is still yours as a member. Wait a bit, then try again. This protects signed URLs from abuse without punishing normal users.</p><div class="btn-row"><a class="btn btn--primary" href="/dashboard">Back to dashboard</a><button class="btn btn--secondary" onclick="location.reload()">Try again</button></div><div class="divider"></div><div class="badge badge--warn">Rate limited</div></div></section>
  <aside class="card panel stack"><div class="orbit-wrap"><div class="orbit-ring"></div><div class="orbit-ring-2"></div><div class="orbit-dot"></div><div style="position:absolute;inset:0;display:grid;place-items:center"><div style="font-size:64px">⏱</div></div></div><div><h3 class="panel-title">Reset window</h3><p class="panel-sub">You can request another signed URL in 17 minutes.</p></div><div class="wave"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="mini-stat"><div class="mini-label">Policy</div><div>60 download requests per user per hour.</div></div></aside>
</div>
</div></div></body></html>
```

## Screen 31: Email Template Previews

Route: `/admin/email-templates`
Reference file: `basscally-screen-31-email-template-previews-motion.html`
Purpose: Magic link, new drop, payment failed, welcome, cancellation

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{
  --color-brand:#FF4500; --color-brand-hover:#FF5C1F; --color-brand-muted:#2A1408;
  --color-bg:#050506; --color-bg-2:#0A0A0B; --color-surface:#141416; --color-surface-raised:#1C1C1F; --color-surface-sunken:#060607;
  --color-border:#26262A; --color-border-strong:#3A3A40; --color-text:#F5F5F7; --color-text-muted:#A1A1A8; --color-text-dim:#6B6B72;
  --color-success:#34D399; --color-warning:#FBBF24; --color-danger:#F87171; --color-info:#60A5FA;
  --font-display:"Cabinet Grotesk","Inter",system-ui,sans-serif; --font-body:"Geist","Inter",-apple-system,sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-8:48px;--space-10:64px;--space-12:96px;
  --radius-sm:6px;--radius-md:10px;--radius-lg:14px;--radius-xl:20px;--radius-full:9999px;
  --shadow-md:0 4px 12px rgba(0,0,0,.5); --shadow-lg:0 18px 50px rgba(0,0,0,.65); --shadow-brand-glow:0 0 32px rgba(255,69,0,.28);
  --ease-out:cubic-bezier(.16,1,.3,1); --motion-fast:150ms; --motion-default:250ms; --motion-slow:600ms;
}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
body{min-height:100vh;background:radial-gradient(circle at 12% 0%,rgba(255,69,0,.12),transparent 28%),linear-gradient(180deg,#09090A 0%,#030304 100%);overflow-x:hidden}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at top,black 20%,transparent 70%);pointer-events:none;z-index:-1}
body::after{content:"";position:fixed;inset:auto -20% -40% -20%;height:60vh;background:radial-gradient(ellipse at center,rgba(255,69,0,.08),transparent 65%);pointer-events:none;z-index:-1;filter:blur(8px)}
a{color:inherit}.app-shell{min-height:100vh;display:grid;grid-template-columns:268px minmax(0,1fr)}
.sidebar{position:sticky;top:0;height:100vh;background:rgba(10,10,11,.72);border-right:1px solid rgba(38,38,42,.75);backdrop-filter:blur(24px);padding:24px;display:flex;flex-direction:column;gap:32px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--font-display);font-weight:800;letter-spacing:-.02em}.brand-mark{width:30px;height:30px;border-radius:9px;background:var(--color-brand);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(255,69,0,.25)}
.side-nav{display:flex;flex-direction:column;gap:6px}.side-link{min-height:44px;border-radius:var(--radius-lg);padding:10px 12px;text-decoration:none;color:var(--color-text-muted);display:flex;align-items:center;gap:10px;font-size:14px;transition:all .2s var(--ease-out)}.side-link:hover,.side-link.active{background:var(--color-surface);color:var(--color-text)}.side-link.active{border:1px solid var(--color-border);box-shadow:inset 3px 0 0 var(--color-brand)}.side-foot{margin-top:auto;border-top:1px solid var(--color-border);padding-top:20px;font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.05em;text-transform:uppercase}
.main{min-width:0;padding:28px 32px 64px}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.crumb{font-family:var(--font-mono);font-size:11px;color:var(--color-text-dim);letter-spacing:.08em;text-transform:uppercase}
.screen-tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{height:34px;padding:0 14px;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(20,20,22,.7);color:var(--color-text-muted);font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center}.tab.active{background:var(--color-brand);border-color:var(--color-brand);color:#fff;box-shadow:var(--shadow-brand-glow)}
.card,.hero-card{background:linear-gradient(180deg,rgba(28,28,31,.92),rgba(13,13,15,.92));border:1px solid rgba(58,58,64,.65);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}.card::before,.hero-card::before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0%,rgba(255,69,0,.18),transparent 34%),radial-gradient(circle at 90% 80%,rgba(96,165,250,.08),transparent 38%);pointer-events:none}
.panel{padding:24px;position:relative;z-index:1}.hero-card{padding:36px}.hero-content{position:relative;z-index:1}.kicker{font-family:var(--font-mono);font-size:11px;color:var(--color-brand);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}.title{font-family:var(--font-display);font-size:clamp(38px,6vw,72px);font-weight:900;line-height:.95;letter-spacing:-.045em;margin-bottom:20px}.title .accent{color:var(--color-brand);font-style:italic}.lede{font-size:17px;color:var(--color-text-muted);max-width:620px;line-height:1.55}.lede strong{color:var(--color-text);font-weight:600}.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:28px}
.btn{min-height:44px;border-radius:var(--radius-lg);border:1px solid transparent;padding:0 18px;font-family:var(--font-body);font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer;transition:all .18s var(--ease-out)}.btn--primary{background:var(--color-brand);color:white}.btn--primary:hover{background:var(--color-brand-hover);box-shadow:var(--shadow-brand-glow);transform:translateY(-2px)}.btn--secondary{background:rgba(20,20,22,.86);color:var(--color-text);border-color:var(--color-border-strong)}.btn--secondary:hover{background:var(--color-surface-raised);border-color:var(--color-text-muted);transform:translateY(-1px)}.btn--ghost{background:transparent;color:var(--color-text-muted)}.btn--ghost:hover{background:var(--color-surface);color:var(--color-text)}
.btn:focus-visible,.input:focus,.textarea:focus,.select:focus,.search:focus{outline:2px solid rgba(255,69,0,.45);outline-offset:3px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.stack{display:flex;flex-direction:column;gap:18px}.divider{height:1px;background:var(--color-border);margin:18px 0}.panel-title{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}.panel-sub{color:var(--color-text-muted);font-size:14px}.badge{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:5px 9px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700}.badge--success{background:rgba(52,211,153,.12);color:var(--color-success);border:1px solid rgba(52,211,153,.24)}.badge--warn{background:rgba(251,191,36,.12);color:var(--color-warning);border:1px solid rgba(251,191,36,.24)}.badge--danger{background:rgba(248,113,113,.12);color:var(--color-danger);border:1px solid rgba(248,113,113,.24)}.badge--info{background:rgba(96,165,250,.12);color:var(--color-info);border:1px solid rgba(96,165,250,.24)}.badge--brand{background:var(--color-brand-muted);color:var(--color-brand);border:1px solid rgba(255,69,0,.26)}
.table-wrap{overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}table{width:100%;border-collapse:collapse;min-width:760px}th{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-dim);font-weight:700;text-align:left;padding:14px}td{font-size:14px;color:var(--color-text-muted);padding:14px;border-top:1px solid var(--color-border)}td strong{color:var(--color-text);font-weight:700}
.search{min-height:44px;width:100%;border:1px solid var(--color-border);border-radius:var(--radius-full);background:rgba(10,10,11,.76);padding:0 16px;color:var(--color-text);font:inherit}
.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.center-card{width:min(980px,100%);display:grid;grid-template-columns:1fr 1fr;gap:24px}.big-status{font-family:var(--font-display);font-size:clamp(44px,8vw,86px);line-height:.92;letter-spacing:-.05em;font-weight:900}.status-orb{width:250px;height:250px;border-radius:50%;margin:auto;background:radial-gradient(circle at center,rgba(255,69,0,.34),rgba(255,69,0,.08) 38%,transparent 62%);position:relative}.status-orb::before{content:"";position:absolute;inset:30px;border:1px solid rgba(255,69,0,.55);border-radius:50%;animation:pulseOrb 2.4s ease-in-out infinite}.status-orb::after{content:"";position:absolute;inset:74px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 60px rgba(255,69,0,.55);animation:beat 1.4s ease-in-out infinite}
@keyframes pulseOrb{0%,100%{transform:scale(.96);opacity:.45}50%{transform:scale(1.08);opacity:1}}@keyframes beat{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
.motion-grid>*{animation:rise .7s var(--ease-out) both}.motion-grid>*:nth-child(2){animation-delay:.08s}.motion-grid>*:nth-child(3){animation-delay:.16s}.motion-grid>*:nth-child(4){animation-delay:.24s}.motion-grid>*:nth-child(5){animation-delay:.32s}.motion-grid>*:nth-child(6){animation-delay:.4s}@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}
.spin-slow{animation:spin 14s linear infinite}.spin-fast{animation:spin 3.2s linear infinite}.spin-back{animation:spinBack 9s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinBack{to{transform:rotate(-360deg)}}
.pulse-line{height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--color-brand),transparent);background-size:220% 100%;animation:sweep 2.2s ease-in-out infinite}@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}
.wave{display:flex;gap:5px;height:42px;align-items:end}.wave span{width:7px;border-radius:999px;background:linear-gradient(180deg,var(--color-brand),rgba(255,69,0,.22));animation:wave 1.1s ease-in-out infinite;transform-origin:bottom}.wave span:nth-child(2){animation-delay:.1s}.wave span:nth-child(3){animation-delay:.2s}.wave span:nth-child(4){animation-delay:.3s}.wave span:nth-child(5){animation-delay:.4s}.wave span:nth-child(6){animation-delay:.5s}.wave span:nth-child(7){animation-delay:.6s}@keyframes wave{0%,100%{height:12px;opacity:.58}50%{height:40px;opacity:1}}
.orbit-wrap{position:relative;width:240px;height:240px;margin:auto}.orbit-ring,.orbit-ring-2{position:absolute;inset:0;border:1px solid rgba(255,69,0,.18);border-radius:50%}.orbit-ring-2{inset:26px;border-color:rgba(96,165,250,.18)}.orbit-dot,.orbit-dot-2{position:absolute;width:16px;height:16px;border-radius:50%;background:var(--color-brand);box-shadow:0 0 18px rgba(255,69,0,.55);top:calc(50% - 8px);left:calc(50% - 8px);transform-origin:8px -104px;animation:spin 4s linear infinite}.orbit-dot-2{background:var(--color-info);box-shadow:0 0 18px rgba(96,165,250,.45);transform-origin:8px -78px;animation-duration:6.2s}
.doc-card{background:rgba(9,9,10,.72);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-stat{background:rgba(6,6,7,.55);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:18px}.mini-label{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-dim);margin-bottom:8px}.mini-value{font-family:var(--font-display);font-size:28px;font-weight:900;letter-spacing:-.03em}
.search-empty{min-height:320px;display:grid;place-items:center;text-align:center;padding:30px}.search-radar{position:relative;width:170px;height:170px;border-radius:50%;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at center,rgba(255,69,0,.12),transparent 58%);margin:0 auto 18px}.search-radar::before{content:"";position:absolute;inset:-1px;border-radius:50%;border:1px solid rgba(255,69,0,.18)}.search-radar::after{content:"";position:absolute;left:50%;top:50%;width:2px;height:82px;background:linear-gradient(180deg,rgba(255,69,0,.85),transparent);transform-origin:bottom center;animation:radar 2.4s linear infinite}@keyframes radar{from{transform:translate(-50%,-100%) rotate(0deg)}to{transform:translate(-50%,-100%) rotate(360deg)}}
.error-num{font-family:var(--font-display);font-size:clamp(86px,18vw,220px);line-height:.82;letter-spacing:-.08em;font-weight:900;background:linear-gradient(180deg,#fff,rgba(255,255,255,.48));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 30px rgba(255,255,255,.08)}
.shake-icon{animation:shake 2.3s ease-in-out infinite}@keyframes shake{0%,100%{transform:translateX(0) rotate(0)}10%{transform:translateX(-2px) rotate(-4deg)}20%{transform:translateX(3px) rotate(4deg)}30%{transform:translateX(-3px) rotate(-3deg)}40%{transform:translateX(2px) rotate(3deg)}50%{transform:translateX(0) rotate(0)}}
.email-stack{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.email-preview{background:rgba(10,10,11,.7);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;position:relative}.email-preview header{padding:14px 16px;border-bottom:1px solid var(--color-border);display:flex;justify-content:space-between;align-items:center}.email-preview .content{padding:18px;display:flex;flex-direction:column;gap:14px}.mail-line{height:10px;background:linear-gradient(90deg,rgba(255,255,255,.2),rgba(255,255,255,.06));border-radius:999px;overflow:hidden;position:relative}.mail-line::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,69,0,.28),transparent);transform:translateX(-100%);animation:shine 2.8s linear infinite}.mail-line:nth-child(2)::after{animation-delay:.2s}.mail-line:nth-child(3)::after{animation-delay:.4s}@keyframes shine{to{transform:translateX(100%)}}
.toast-stack{position:fixed;right:24px;top:24px;display:flex;flex-direction:column;gap:12px;z-index:30}.toast{width:min(390px,calc(100vw - 32px));background:rgba(20,20,22,.94);border:1px solid var(--color-border-strong);border-radius:var(--radius-lg);padding:14px 16px;display:grid;grid-template-columns:32px 1fr auto;gap:12px;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:toastIn .6s var(--ease-out) both}.toast-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}.toast strong{font-size:14px;line-height:1.25}.toast p{font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close{background:transparent;border:0;color:var(--color-text-dim);font-size:18px;cursor:pointer}.toast--success .toast-dot{background:rgba(52,211,153,.13);color:var(--color-success)}.toast--warning .toast-dot{background:rgba(251,191,36,.13);color:var(--color-warning)}.toast--danger .toast-dot{background:rgba(248,113,113,.13);color:var(--color-danger)}.toast--info .toast-dot{background:rgba(96,165,250,.13);color:var(--color-info)}@keyframes toastIn{0%{opacity:0;transform:translateX(30px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}
@media(max-width:1023px){.app-shell{grid-template-columns:1fr}.sidebar{position:relative;height:auto;padding:18px;flex-direction:row;align-items:center;overflow:auto}.side-nav{flex-direction:row}.side-foot{display:none}.main{padding:22px 18px 56px}.grid-2,.grid-3,.center-card,.email-stack{grid-template-columns:1fr}.toast-stack{right:16px;left:16px;top:16px}.toast{width:100%}}
@media(max-width:680px){.sidebar{gap:16px}.brand span:not(.brand-mark){display:none}.side-link{font-size:0;min-width:48px;justify-content:center}.hero-card{padding:26px}.title{font-size:44px}.btn-row .btn{width:100%}.topbar{flex-direction:column;align-items:flex-start}.screen-tabs{width:100%;overflow:auto;flex-wrap:nowrap}.status-orb,.orbit-wrap{width:190px;height:190px}.toast{grid-template-columns:28px 1fr auto}.toast-dot{width:28px;height:28px}.error-num{font-size:110px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
</style></head><body><title>Email template previews — Basscally Club</title><div class="app-shell"><aside class="sidebar" aria-label="Admin navigation"><a class="brand" href="/"><span class="brand-mark">B</span><span>Basscally Club</span></a><nav class="side-nav"><a class="side-link " href="/admin">▦ <span>Metrics</span></a><a class="side-link " href="/admin/content">▤ <span>Content</span></a><a class="side-link active" href="/admin/email-logs">✉ <span>Email logs</span></a><a class="side-link " href="/admin/subscribers">◉ <span>Subscribers</span></a><a class="side-link " href="/admin/settings">⚙ <span>Settings</span></a></nav><div class="side-foot">Admin console<br>Last synced: just now</div></aside><main class="main"><div class="topbar"><div><div class="crumb">Screen 31 · Comms preview</div><h1 class="panel-title" style="font-size:28px">Email template previews</h1></div><div class="screen-tabs"><a class="tab active" href="#">Templates</a><a class="tab" href="#">Send test</a><a class="tab" href="#">Variables</a></div></div>
<section class="hero-card motion-grid"><div class="hero-content"><div class="kicker">// Transactional templates</div><h2 class="title">Preview the emails<br><span class="accent">before they land.</span></h2><p class="lede">Review the magic link, new drop notification, payment failed email, welcome message, and cancellation confirmation. Motion here helps the preview feel alive without becoming noisy.</p><div class="btn-row"><button class="btn btn--primary">Preview in browser</button><button class="btn btn--secondary">Send test email</button></div></div></section>
<section class="email-stack motion-grid" style="margin-top:18px">
  <article class="email-preview"><header><strong>Magic link</strong><span class="badge badge--info">Auth</span></header><div class="content"><div class="mail-line" style="width:78%"></div><div class="mail-line" style="width:58%"></div><div class="doc-card"><strong style="display:block;margin-bottom:8px">Sign in to Basscally Club</strong><p style="color:var(--color-text-muted);font-size:14px">Click the button below to open your dashboard.</p><div class="btn-row"><span class="btn btn--primary">Sign in</span></div></div></div></article>
  <article class="email-preview"><header><strong>New drop</strong><span class="badge badge--brand">Content</span></header><div class="content"><div class="mail-line" style="width:84%"></div><div class="mail-line" style="width:62%"></div><div class="doc-card"><strong style="display:block;margin-bottom:8px">[New Groove] Funk slap pattern in E</strong><p style="color:var(--color-text-muted);font-size:14px">New practice drop just landed in the Club.</p><div class="btn-row"><span class="btn btn--primary">Open practice drop</span></div></div></div></article>
  <article class="email-preview"><header><strong>Payment failed</strong><span class="badge badge--warn">Billing</span></header><div class="content"><div class="mail-line" style="width:76%"></div><div class="mail-line" style="width:50%"></div><div class="doc-card"><strong style="display:block;margin-bottom:8px">Your membership needs attention</strong><p style="color:var(--color-text-muted);font-size:14px">Update your card to keep access after your grace period.</p><div class="btn-row"><span class="btn btn--secondary">Update card</span></div></div></div></article>
  <article class="email-preview"><header><strong>Welcome + cancellation</strong><span class="badge badge--success">Lifecycle</span></header><div class="content"><div class="mail-line" style="width:81%"></div><div class="mail-line" style="width:59%"></div><div class="doc-card"><strong style="display:block;margin-bottom:8px">Welcome to the Club</strong><p style="color:var(--color-text-muted);font-size:14px">Start with the latest drop, then browse grooves, fills, and challenges.</p><div class="divider"></div><p style="color:var(--color-text-muted);font-size:14px">Your cancellation is confirmed. Access stays active until period end.</p></div></div></article>
</section>
<section class="grid-3 motion-grid" style="margin-top:18px"><div class="mini-stat"><div class="mini-label">Template status</div><div class="mini-value">5</div></div><div class="mini-stat"><div class="mini-label">Send test to</div><div>hello@basscally.club</div></div><div class="mini-stat"><div class="mini-label">Motion note</div><div>Shimmer lines only, no moving body copy.</div></div></section>
</main></div></body></html>
```

## Screen 32: Pricing Plan Selector

Route: `/pricing`
Reference file: `basscally-screen-32-pricing-plan-selector-motion.html`
Purpose: Founding, monthly, annual, later Club Plus

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{--color-brand:#FF4500;--color-bg:#050506;--color-surface:#141416;--color-text:#F5F5F7;--color-text-muted:#A1A1A8;--color-text-dim:#6B6B72;--color-border:#26262A;--font-display:system-ui;--font-body:system-ui;--font-mono:monospace;--radius-lg:14px;--radius-xl:20px;--ease-out:cubic-bezier(.16,1,.3,1)}*{box-sizing:border-box;margin:0;padding:0}body{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body)}.main{padding:28px 32px}.card{background:#141416;border:1px solid #26262A;border-radius:20px;padding:24px}.btn{display:inline-flex;min-height:44px;padding:0 18px;border-radius:14px;background:#FF4500;color:#fff;text-decoration:none;align-items:center}.title{font-size:60px;font-weight:900}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}@media(max-width:900px){.grid-3{grid-template-columns:1fr}}

.price-card{min-height:430px;display:flex;flex-direction:column}.price{font-family:var(--font-display);font-size:56px;font-weight:900;letter-spacing:-.05em;line-height:1}.price small{font-size:16px;color:var(--color-text-muted);letter-spacing:0}.save-ribbon{position:absolute;right:18px;top:18px}.plan-list{list-style:none;display:flex;flex-direction:column;gap:12px;margin:22px 0}.plan-list li{display:flex;gap:10px;color:var(--color-text-muted);font-size:14px}.plan-list li:before{content:'✓';color:var(--color-brand);font-weight:800}.switch-card{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center}.billing-timeline{display:flex;flex-direction:column;gap:14px}.timeline-row{display:grid;grid-template-columns:120px 1fr auto;gap:12px;align-items:center;padding:14px;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}@media(max-width:700px){.switch-card,.timeline-row{grid-template-columns:1fr}.price{font-size:46px}}
</style></head><body><title>Pricing and plan selector — Basscally Club</title><div class="app-shell"><aside class="sidebar" aria-label="Navigation"><a class="brand" href="/"><span class="brand-mark">B</span><span>Basscally Club</span></a><nav class="side-nav"><a class="side-link" href="/dashboard">▦ <span>Dashboard</span></a><a class="side-link active" href="/pricing">◉ <span>Pricing</span></a><a class="side-link" href="/account">☰ <span>Account</span></a><a class="side-link" href="/auth/login">↗ <span>Sign in</span></a></nav><div class="side-foot">Bass practice club<br>Billing ready</div></aside><main class="main"><div class="topbar"><div><div class="crumb">Screen 32 · Pricing architecture</div><h1 class="panel-title" style="font-size:28px">Pricing and plan selector</h1></div><div class="screen-tabs"><a class="tab active" href="#">Plans</a><a class="tab" href="#">Annual</a><a class="tab" href="#">Portal</a></div></div>
<section class="hero-card motion-grid"><div class="hero-content"><div class="kicker">// Choose your rhythm</div><h2 class="title">Start cheap.<br><span class="accent">Stay consistent.</span></h2><p class="lede">Basscally Club keeps the base offer light, then gives serious members a cleaner annual lock-in. The founding price rewards early members without trapping the business forever.</p><div class="btn-row"><a class="btn btn--primary" href="#plans">See plans</a><a class="btn btn--secondary" href="/auth/login">Already a member?</a></div></div></section>
<section id="plans" class="grid-3 motion-grid" style="margin-top:18px">
  <article class="card panel price-card"><span class="badge badge--brand">Founding</span><h3 class="panel-title" style="margin-top:18px">Founding Member</h3><div class="price">$1.50<small>/mo</small></div><p class="panel-sub">For the first launch members. Keep this price for life while your membership stays active.</p><ul class="plan-list"><li>Every 3-day practice drop</li><li>Bass-less covers, grooves, fills, challenges</li><li>Downloadable audio files</li><li>Founding member badge</li></ul><div style="margin-top:auto"><a class="btn btn--primary" href="/checkout?plan=founding_monthly">Lock in $1.50/month</a></div></article>
  <article class="card panel price-card" style="border-color:rgba(255,69,0,.55)"><span class="badge badge--warn save-ribbon">Public base</span><span class="badge badge--info">Monthly</span><h3 class="panel-title" style="margin-top:18px">Club Monthly</h3><div class="price">$2.99<small>/mo</small></div><p class="panel-sub">The public monthly price after the founding window closes.</p><ul class="plan-list"><li>Same core Club access</li><li>Cancel anytime</li><li>Global payment support</li><li>Member dashboard and library</li></ul><div style="margin-top:auto"><a class="btn btn--primary" href="/checkout?plan=standard_monthly">Join monthly</a></div></article>
  <article class="card panel price-card"><span class="badge badge--success save-ribbon">Best value</span><span class="badge badge--success">Annual</span><h3 class="panel-title" style="margin-top:18px">Annual Lock-in</h3><div class="price">$18<small>/year</small></div><p class="panel-sub">Best for committed players. Fewer payment fees, cleaner revenue, upfront cash for the Club.</p><ul class="plan-list"><li>12 months of Club access</li><li>Lower effective monthly cost</li><li>Downloadable drops all year</li><li>Priority annual renewal reminder</li></ul><div style="margin-top:auto"><a class="btn btn--primary" href="/checkout?plan=annual_18">Lock in $18/year</a></div></article>
</section>
<section class="grid-2 motion-grid" style="margin-top:18px"><div class="card panel"><h3 class="panel-title">Later tier</h3><p class="panel-sub">Club Plus can sit at $9/month later for feedback, live challenges, community recognition, or premium drops. Do not add it to MVP checkout unless the offer is ready.</p></div><div class="card panel"><h3 class="panel-title">Payment logic</h3><p class="panel-sub">Each CTA maps to a Lemon Squeezy variant ID. The webhook writes the selected plan into subscriptions and keeps access tied to status and period dates.</p><div class="pulse-line" style="margin-top:18px"></div></div></section>
</main></div></body></html>
```

## Screen 33: Account Billing Management

Route: `/account/billing`
Reference file: `basscally-screen-33-account-billing-management-motion.html`
Purpose: Self-serve plan, card, invoices, portal

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet"><style>
:root{--color-brand:#FF4500;--color-bg:#050506;--color-surface:#141416;--color-text:#F5F5F7;--color-text-muted:#A1A1A8;--color-text-dim:#6B6B72;--color-border:#26262A;--font-display:system-ui;--font-body:system-ui;--font-mono:monospace;--radius-lg:14px;--radius-xl:20px;--ease-out:cubic-bezier(.16,1,.3,1)}*{box-sizing:border-box;margin:0;padding:0}body{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body)}.main{padding:28px 32px}.card{background:#141416;border:1px solid #26262A;border-radius:20px;padding:24px}.btn{display:inline-flex;min-height:44px;padding:0 18px;border-radius:14px;background:#FF4500;color:#fff;text-decoration:none;align-items:center}.title{font-size:60px;font-weight:900}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}@media(max-width:900px){.grid-3{grid-template-columns:1fr}}

.price-card{min-height:430px;display:flex;flex-direction:column}.price{font-family:var(--font-display);font-size:56px;font-weight:900;letter-spacing:-.05em;line-height:1}.price small{font-size:16px;color:var(--color-text-muted);letter-spacing:0}.save-ribbon{position:absolute;right:18px;top:18px}.plan-list{list-style:none;display:flex;flex-direction:column;gap:12px;margin:22px 0}.plan-list li{display:flex;gap:10px;color:var(--color-text-muted);font-size:14px}.plan-list li:before{content:'✓';color:var(--color-brand);font-weight:800}.switch-card{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center}.billing-timeline{display:flex;flex-direction:column;gap:14px}.timeline-row{display:grid;grid-template-columns:120px 1fr auto;gap:12px;align-items:center;padding:14px;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:rgba(10,10,11,.72)}@media(max-width:700px){.switch-card,.timeline-row{grid-template-columns:1fr}.price{font-size:46px}}
</style></head><body><title>Account billing management — Basscally Club</title><div class="app-shell"><aside class="sidebar" aria-label="Navigation"><a class="brand" href="/"><span class="brand-mark">B</span><span>Basscally Club</span></a><nav class="side-nav"><a class="side-link" href="/dashboard">▦ <span>Dashboard</span></a><a class="side-link active" href="/pricing">◉ <span>Pricing</span></a><a class="side-link" href="/account">☰ <span>Account</span></a><a class="side-link" href="/auth/login">↗ <span>Sign in</span></a></nav><div class="side-foot">Bass practice club<br>Billing ready</div></aside><main class="main"><div class="topbar"><div><div class="crumb">Screen 33 · Self-serve billing</div><h1 class="panel-title" style="font-size:28px">Account billing management</h1></div><div class="screen-tabs"><a class="tab active" href="#">Plans</a><a class="tab" href="#">Annual</a><a class="tab" href="#">Portal</a></div></div>
<section class="hero-card motion-grid"><div class="hero-content"><div class="kicker">// Membership control</div><h2 class="title">Your plan,<br><span class="accent">your card, your access.</span></h2><p class="lede">Members should manage billing without contacting support. This screen links to Lemon Squeezy customer portal URLs and keeps the local database in sync through webhooks.</p><div class="btn-row"><a class="btn btn--primary" href="/account/billing/portal">Open billing portal</a><a class="btn btn--secondary" href="/account/cancel">Cancel membership</a></div></div></section>
<section class="grid-2 motion-grid" style="margin-top:18px">
  <article class="card panel"><span class="badge badge--success">Active</span><h3 class="panel-title" style="margin-top:16px">Current plan</h3><div class="price">$1.50<small>/mo</small></div><p class="panel-sub">Founding Member. Renews on June 16, 2026. Access stays active while payment status is active, cancelled within grace, or past_due before period end.</p><div class="divider"></div><div class="switch-card"><div><strong>Switch to Annual Lock-in</strong><p class="panel-sub">Move to $18/year through the customer portal when plan switching is enabled.</p></div><a class="btn btn--primary" href="/account/billing/portal?intent=upgrade_annual">Switch to annual</a></div></article>
  <aside class="card panel stack"><div class="orbit-wrap"><div class="orbit-ring"></div><div class="orbit-ring-2"></div><div class="orbit-dot"></div><div class="orbit-dot-2"></div><div style="position:absolute;inset:0;display:grid;place-items:center;font-size:62px">💳</div></div><div><h3 class="panel-title">Self-serve actions</h3><p class="panel-sub">Update card, change plan, view invoices, cancel renewal, and return to Basscally after portal action.</p></div><div class="pulse-line"></div></aside>
</section>
<section class="card panel motion-grid" style="margin-top:18px"><h3 class="panel-title">Billing history</h3><div class="table-wrap"><table><tr><th>Date</th><th>Plan</th><th>Status</th><th>Amount</th><th>Action</th></tr><tr><td><strong>May 16, 2026</strong></td><td>Founding Monthly</td><td><span class="badge badge--success">Paid</span></td><td>$1.50</td><td><a class="btn btn--ghost" href="#">Invoice</a></td></tr><tr><td><strong>June 16, 2026</strong></td><td>Founding Monthly</td><td><span class="badge badge--info">Upcoming</span></td><td>$1.50</td><td><a class="btn btn--ghost" href="#">Manage</a></td></tr></table></div></section>
<section class="grid-3 motion-grid" style="margin-top:18px"><div class="mini-stat"><div class="mini-label">Portal source</div><div>Lemon Squeezy subscription URLs</div></div><div class="mini-stat"><div class="mini-label">Local source</div><div>subscriptions table</div></div><div class="mini-stat"><div class="mini-label">Truth sync</div><div>Webhooks update status</div></div></section>
</main></div></body></html>
```
