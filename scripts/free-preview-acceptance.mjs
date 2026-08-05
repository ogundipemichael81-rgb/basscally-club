import { createClient } from "@supabase/supabase-js";
import { chromium } from "playwright";

const baseUrl = process.env.TEST_BASE_URL || "http://localhost:3000";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const testPassword = process.env.FREE_PREVIEW_TEST_PASSWORD;

if (!supabaseUrl || !serviceKey || !testPassword) {
  throw new Error("Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and FREE_PREVIEW_TEST_PASSWORD before running this acceptance test.");
}

const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
const { data: preview, error: previewError } = await admin
  .from("content")
  .select("id, title, status, is_free_preview, audio_storage_key")
  .eq("status", "published")
  .eq("is_free_preview", true)
  .not("audio_storage_key", "is", null)
  .maybeSingle();
if (previewError) throw new Error(`Preview query failed: ${previewError.message}`);
if (!preview) throw new Error("No valid published free preview exists.");

const email = `free-preview-${Date.now()}@example.invalid`;
const { data: created, error: createError } = await admin.auth.admin.createUser({ email, password: testPassword, email_confirm: true });
if (createError || !created.user) throw new Error(`Could not create test user: ${createError?.message ?? "unknown error"}`);
const userId = created.user.id;
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const result = { previewId: preview.id, previewTitle: preview.title, userEmail: email, dashboard: false, reload: false, detail: false, playback: false, speedControls: false, downloadDenied: false, premiumLocked: false };

try {
  await page.goto(`${baseUrl}/auth/login`, { waitUntil: "networkidle" });
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password").fill(testPassword);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL(/\/dashboard/);
  const previewLink = page.locator(`a[href="/c/${preview.id}"]`).first();
  result.dashboard = (await previewLink.count()) === 1 && (await page.getByText(preview.title, { exact: true }).count()) > 0;
  await page.reload({ waitUntil: "networkidle" });
  result.reload = (await page.locator(`a[href="/c/${preview.id}"]`).count()) > 0;
  await previewLink.click();
  await page.waitForURL(new RegExp(`/c/${preview.id}$`));
  result.detail = true;
  result.playback = (await page.getByRole("button", { name: "Play" }).count()) > 0;
  result.speedControls = (await page.getByText(/pitch preserved/i).count()) > 0;
  result.downloadDenied = (await page.getByRole("button", { name: /download/i }).count()) === 0;
  result.premiumLocked = (await page.getByText(/activate membership|locked/i).count()) > 0;
} finally {
  await browser.close();
  await admin.auth.admin.deleteUser(userId);
}

console.log(JSON.stringify(result, null, 2));
if (!Object.entries(result).filter(([key]) => key !== "previewId" && key !== "previewTitle" && key !== "userEmail").every(([, value]) => value === true)) process.exitCode = 1;
