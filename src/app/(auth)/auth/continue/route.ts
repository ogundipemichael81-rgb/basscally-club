import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabasePublishableKey,getSupabaseUrl,isSupabaseClientConfigured } from "@/lib/env";
import { isAdminEmail } from "@/lib/admin/allowlist";
import { provisionPublicUser } from "@/lib/auth/provision-user";
export async function GET(request:NextRequest){if(!isSupabaseClientConfigured())return NextResponse.redirect(new URL("/auth/login?authError=Sign-in%20is%20not%20configured.",request.url));const response=NextResponse.redirect(new URL("/dashboard",request.url));const supabase=createServerClient(getSupabaseUrl(),getSupabasePublishableKey(),{cookies:{getAll:()=>request.cookies.getAll(),setAll:cookies=>cookies.forEach(({name,value,options})=>response.cookies.set(name,value,options))}});const {data:{user}}=await supabase.auth.getUser();if(!user)return NextResponse.redirect(new URL("/auth/login?authError=Please%20sign%20in%20again.",request.url));await provisionPublicUser(user);response.headers.set("Cache-Control","private, no-store");response.headers.set("Location",new URL(isAdminEmail(user.email)?"/admin":"/dashboard",request.url).toString());return response;}
