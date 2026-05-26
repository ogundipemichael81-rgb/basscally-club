import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verifies Lemon Squeezy webhook signature (HMAC SHA256 of raw body).
 * @see https://docs.lemonsqueezy.com/help/webhooks/signing-requests
 */
export function verifyLemonSqueezySignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!secret || !signatureHeader) {
    return false;
  }

  const digest = createHmac("sha256", secret).update(rawBody).digest("hex");

  try {
    const expected = Buffer.from(digest, "utf8");
    const received = Buffer.from(signatureHeader, "utf8");
    if (expected.length !== received.length) {
      return false;
    }
    return timingSafeEqual(expected, received);
  } catch {
    return false;
  }
}
