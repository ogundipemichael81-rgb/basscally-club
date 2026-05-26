type Bucket = {
  count: number;
  resetAt: number;
};

const resendCooldownByEmail = new Map<string, number>();
const burstByIp = new Map<string, Bucket>();

const RESEND_COOLDOWN_MS = 60_000;
const BURST_WINDOW_MS = 15 * 60_000;
const BURST_MAX_REQUESTS = 12;

export function checkMagicLinkRateLimit(email: string, ip: string) {
  const now = Date.now();
  const normalizedEmail = email.trim().toLowerCase();

  const emailNextAllowedAt = resendCooldownByEmail.get(normalizedEmail) ?? 0;
  if (emailNextAllowedAt > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((emailNextAllowedAt - now) / 1000),
      reason: "resend_cooldown",
    } as const;
  }

  const existingBucket = burstByIp.get(ip);
  const freshBucket: Bucket =
    !existingBucket || existingBucket.resetAt <= now
      ? { count: 0, resetAt: now + BURST_WINDOW_MS }
      : existingBucket;

  if (freshBucket.count >= BURST_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((freshBucket.resetAt - now) / 1000),
      reason: "ip_burst_limit",
    } as const;
  }

  freshBucket.count += 1;
  burstByIp.set(ip, freshBucket);
  resendCooldownByEmail.set(normalizedEmail, now + RESEND_COOLDOWN_MS);

  return {
    allowed: true,
  } as const;
}

