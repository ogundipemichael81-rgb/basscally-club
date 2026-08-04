import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { subscriptionGrantsAccess } from "@/lib/subscriptions/access";

export type NormalUser={id:string;email:string};
export async function requireNormalUser():Promise<NormalUser|null>{ const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user?.email)return null; const admin=createAdminClient(); const {data:profile}=await admin.from("users").select("id,email").eq("id",user.id).maybeSingle(); if(!profile||profile.email.trim().toLowerCase()!==user.email.trim().toLowerCase())return null; return {id:user.id,email:user.email.trim().toLowerCase()}; }
export async function requireActiveMember(){const user=await requireNormalUser();if(!user)return null;const admin=createAdminClient();const {data}=await admin.from("subscriptions").select("status,current_period_end,ends_at,cancel_at_period_end").eq("user_id",user.id);return data?.some(subscriptionGrantsAccess)?user:null;}

