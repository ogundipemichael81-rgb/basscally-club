import "server-only";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin/allowlist";
export type AdminSession={userId:string;email:string};
export async function getAdminSession():Promise<AdminSession|null>{try{const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();const email=user?.email?.trim().toLowerCase();if(!user||!email||!isAdminEmail(email))return null;return {userId:user.id,email};}catch{return null;}}
export async function requireAdminApi(){const session=await getAdminSession();if(!session)return {ok:false as const,response:NextResponse.json({error:"Admin access required."},{status:401})};return {ok:true as const,session};}
export async function requireAdminPage():Promise<AdminSession>{const session=await getAdminSession();if(session)return session;let hasUser=false;try{const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();hasUser=Boolean(user);}catch{}redirect(hasUser?"/admin/unauthorized":"/admin/login");}