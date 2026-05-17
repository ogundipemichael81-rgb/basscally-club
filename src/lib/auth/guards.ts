/**
 * Auth guard stubs — Phase 1 placeholders only.
 * Real server-side checks added when Supabase auth is wired.
 */

export async function requireUser(): Promise<never> {
  throw new Error("requireUser is not implemented in Phase 1 scaffold.");
}

export async function requireSubscription(): Promise<never> {
  throw new Error("requireSubscription is not implemented in Phase 1 scaffold.");
}

export async function requireAdmin(): Promise<never> {
  throw new Error("requireAdmin is not implemented in Phase 1 scaffold.");
}
