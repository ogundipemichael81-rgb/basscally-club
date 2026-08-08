import "server-only";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseServiceRole, isSupabaseClientConfigured } from "@/lib/env";
export const MOCK_COOKIE="basscally_mock_user_id";
export const MOCK_PERSONAS={"mock-member-active":{userId:"c0000000-0000-4000-8000-000000000001",email:"mock-member-active@basscally.club"},"mock-member-lapsed":{userId:"c0000000-0000-4000-8000-000000000002",email:"mock-member-lapsed@basscally.club"},"mock-admin-michael":{userId:"c0000000-0000-4000-8000-000000000003",email:"mock-admin-michael@basscally.club"}} as const;
export type MockPersonaId=keyof typeof MOCK_PERSONAS; export type ResolvedMember={userId:string;email:string;source:"supabase_auth"|"mock_cookie"};
export function isMockPersonaId(value:string|undefined):value is MockPersonaId{return Boolean(value&&value in MOCK_PERSONAS)};
export async function readMockPersonaId():Promise<MockPersonaId|null>{if(process.env.NODE_ENV!=="development")return null; const c=await cookies(); const id=c.get(MOCK_COOKIE)?.value; return isMockPersonaId(id)?id:null;}
export async function resolveMemberFromRequest():Promise<ResolvedMember|null>{
 if(isSupabaseClientConfigured()){try{const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); const email=user?.email?.trim().toLowerCase(); if(user&&email){const profile=await lookupUserById(user.id); if(profile){if(profile.email.trim().toLowerCase()!==email){console.error("[member-resolution] identity integrity mismatch",{userId:user.id}); return null;} return {...profile,source:"supabase_auth"};} const provisioned=await provisionPublicUser(user.id,email); return {userId:provisioned?.userId??user.id,email:provisioned?.email??email,source:"supabase_auth"};}}catch{}}
 const mockId=await readMockPersonaId(); if(!mockId)return null; const persona=MOCK_PERSONAS[mockId]; if(hasSupabaseServiceRole()&&isSupabaseClientConfigured()){const member=await lookupUserById(persona.userId); if(member)return {...member,source:"mock_cookie"};} return {...persona,source:"mock_cookie"};
}
async function lookupUserById(userId:string):Promise<{userId:string;email:string}|null>{const admin=createAdminClient(); const {data,error}=await admin.from("users").select("id,email").eq("id",userId).maybeSingle(); if(error||!data)return null; return {userId:data.id,email:data.email};}
async function provisionPublicUser(userId:string,email:string){if(!hasSupabaseServiceRole())return null; const admin=createAdminClient(); const {data,error}=await admin.from("users").upsert({id:userId,email,last_login_at:new Date().toISOString()},{onConflict:"id"}).select("id,email").single(); if(error){console.error("[member-resolution] public user provisioning failed",error.message);return null;} return {userId:data.id,email:data.email};}