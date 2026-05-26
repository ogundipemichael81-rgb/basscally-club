/**
 * Drizzle schema — Basscally Hub (BH-02).
 * Apply to Supabase Postgres (EU) via `supabase/migrations/*.sql`.
 */
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  country: text("country"),
  isFoundingMember: boolean("is_founding_member").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerCustomerId: text("provider_customer_id"),
    providerSubscriptionId: text("provider_subscription_id"),
    providerVariantId: text("provider_variant_id"),
    providerPriceId: text("provider_price_id"),
    planCode: text("plan_code").notNull(),
    status: text("status").notNull(),
    currentPeriodStart: timestamp("current_period_start", {
      withTimezone: true,
    }),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    renewsAt: timestamp("renews_at", { withTimezone: true }),
    endsAt: timestamp("ends_at", { withTimezone: true }),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
    customerPortalUrl: text("customer_portal_url"),
    updatePaymentMethodUrl: text("update_payment_method_url"),
    lastWebhookEventId: text("last_webhook_event_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("subscriptions_provider_subscription_id_unique").on(
      table.providerSubscriptionId,
    ),
  ],
);

export const artists = pgTable("artists", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  bio: text("bio"),
  heroImageUrl: text("hero_image_url"),
  tiktokHandle: text("tiktok_handle"),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const styles = pgTable("styles", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  artistId: uuid("artist_id")
    .notNull()
    .references(() => artists.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  headline: text("headline"),
  description: text("description"),
  heroImageUrl: text("hero_image_url"),
  defaultDifficulty: text("default_difficulty"),
  isPublished: boolean("is_published").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const content = pgTable("content", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  difficulty: text("difficulty"),
  audioStorageKey: text("audio_storage_key"),
  coverImageUrl: text("cover_image_url"),
  status: text("status").notNull().default("draft"),
  scheduledFor: timestamp("scheduled_for", { withTimezone: true }),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  emailSubject: text("email_subject"),
  emailBody: text("email_body"),
  createdByAdminId: uuid("created_by_admin_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const contentStyleTags = pgTable(
  "content_style_tags",
  {
    contentId: uuid("content_id")
      .notNull()
      .references(() => content.id, { onDelete: "cascade" }),
    styleId: uuid("style_id")
      .notNull()
      .references(() => styles.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.contentId, table.styleId] }),
  ],
);

export const waitlist = pgTable("waitlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  experienceLevel: text("experience_level"),
  styleInterest: text("style_interest"),
  note: text("note"),
  source: text("source"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const emailQueue = pgTable("email_queue", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  contentId: uuid("content_id").references(() => content.id),
  emailType: text("email_type").notNull(),
  status: text("status").notNull().default("pending"),
  attempts: text("attempts").notNull().default("0"),
  scheduledFor: timestamp("scheduled_for", { withTimezone: true }),
  lockedAt: timestamp("locked_at", { withTimezone: true }),
  providerMessageId: text("provider_message_id"),
  errorReason: text("error_reason"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const emailLogs = pgTable("email_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  contentId: uuid("content_id").references(() => content.id),
  emailType: text("email_type").notNull(),
  status: text("status").notNull(),
  providerMessageId: text("provider_message_id"),
  providerEventId: text("provider_event_id"),
  errorReason: text("error_reason"),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const downloads = pgTable("downloads", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  contentId: uuid("content_id")
    .notNull()
    .references(() => content.id, { onDelete: "cascade" }),
  downloadedAt: timestamp("downloaded_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  ipHash: text("ip_hash"),
  userAgentHash: text("user_agent_hash"),
});

export const auditEvents = pgTable("audit_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorUserId: uuid("actor_user_id"),
  actorEmail: text("actor_email"),
  action: text("action").notNull(),
  entityType: text("entity_type"),
  entityId: text("entity_id"),
  metadataJson: jsonb("metadata_json"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Alias for admin_audit_log naming in MVP plan — same table as audit_events. */
export const adminAuditLog = auditEvents;
