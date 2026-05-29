/**
 * Auth guards — server-side session checks for API routes and server actions.
 */

export { getAdminSession, requireAdminApi } from "@/lib/admin/auth";
export type { AdminSession } from "@/lib/admin/auth";

export async function requireUser(): Promise<never> {
  throw new Error("requireUser is not implemented in Phase 1 scaffold.");
}

export async function requireSubscription(): Promise<never> {
  throw new Error("requireSubscription is not implemented in Phase 1 scaffold.");
}

/** @deprecated Use requireAdminApi() for route handlers. */
export async function requireAdmin(): Promise<never> {
  throw new Error("Use requireAdminApi() from @/lib/admin/auth in route handlers.");
}
