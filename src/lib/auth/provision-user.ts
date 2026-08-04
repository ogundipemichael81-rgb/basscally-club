import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseServiceRole } from "@/lib/env";
export async function provisionPublicUser(user:{id:string;email?:string|null}){if(!user.email||!hasSupabaseServiceRole())return;const admin=createAdminClient();const {error}=await admin.from("users").upsert({id:user.id,email:user.email.trim().toLowerCase(),last_login_at:new Date().toISOString()},{onConflict:"id"});if(error)console.error("[auth] public user provisioning failed:",error.message);}
