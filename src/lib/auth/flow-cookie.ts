import { getServerEnv } from "@/lib/env";

export const AUTH_FLOW_COOKIE = "basscally_auth_flow";
export type AuthFlowPurpose = "recovery_pending" | "signup_pending" | "claim_pending";
function secret() { const env = getServerEnv(); return env.AUTH_FLOW_SECRET || env.SUPABASE_SERVICE_ROLE_KEY || "development-auth-flow-secret"; }
function encode(value: string) { return btoa(value).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", ""); }
async function sign(value: string) { const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]); return encode(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))))); }
export async function encodeAuthFlow(purpose: AuthFlowPurpose) { const value = `${purpose}.${Date.now() + 15 * 60 * 1000}`; return `${value}.${await sign(value)}`; }
export async function readAuthFlow(raw?: string | null): Promise<AuthFlowPurpose | null> { if (!raw) return null; const [purpose, expires, signature] = raw.split("."); if (!purpose || !expires || !signature || Number(expires) < Date.now()) return null; if (signature !== await sign(`${purpose}.${expires}`)) return null; return purpose === "recovery_pending" || purpose === "signup_pending" || purpose === "claim_pending" ? purpose : null; }
