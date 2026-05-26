/** Application-wide constants (Phase 1 — no business logic). */

export const APP_NAME = "Basscally Hub";

export const CONTAINER_MAX_WIDTH = "72rem"; // 1200px

export const SIGNED_URL_EXPIRY_SECONDS = 60 * 60; // 1 hour

export const DOWNLOAD_RATE_LIMIT_PER_HOUR = 60;

export const EMAIL_QUEUE_MAX_ATTEMPTS = 3;

export const CONTENT_BUFFER_ALERT_DAYS = 14;

export const AUDIO_STORAGE_BUCKET = "audio";

export const COVERS_STORAGE_BUCKET = "covers";

/** Locked founding-member cap (enforced in BH-03 webhook). */
export const FOUNDING_MEMBER_CAP = 500;
