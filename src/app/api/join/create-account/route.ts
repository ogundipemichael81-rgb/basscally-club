import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin/allowlist";
import { isJoinPlanKey } from "@/lib/checkout/plans";
const bodySchema=z.object({email:z.string().trim().email().max(320),password:z.string().min(12).max(128),plan:z.string()});
const buckets=new Map<string,{count:number;reset:number}>();
function allowed(request:NextRequest,key:string){const now=Date.now();const b=buckets.get(key);if(!b||b.reset<now){buckets.set(key,{count:1,reset:now+900000});return true;}if(b.count>=5)return false;b.count++;return true;}
function sameOrigin(request:NextRequest){const origin=request.headers.get("origin");return !origin||new URL(origin).host===request.nextUrl.host;}
export async function POST(request:NextRequest){if(!sameOrigin(request))return NextResponse.json({error:"Invalid request."},{status:403});let input;try{input=bodySchema.parse(await request.json());}catch{return NextResponse.json({error:"Check your email and password."},{status:400});}const email=input.email.toLowerCase();if(!isJoinPlanKey(input.plan)||isAdminEmail(email)||email.endsWith("@basscally.club"))return NextResponse.json({error:"This email may already have a Basscally account. Sign in to continue."},{status:409});const ip=request.headers.get("x-forwarded-for")?.split(",")[0]??"unknown";if(!allowed(request,`${ip}:${email}`))return NextResponse.json({error:"Please wait before trying again."},{status:429});const admin=createAdminClient();const {data,error}=await admin.auth.admin.createUser({email,password:input.password,email_confirm:true});if(error||!data.user)return NextResponse.json({error:"This email may already have a Basscally account. Sign in to continue."},{status:409});const {error:profileError}=await admin.from("users").upsert({id:data.user.id,email,last_login_at:new Date().toISOString()},{onConflict:"id"});if(profileError){await admin.auth.admin.deleteUser(data.user.id);return NextResponse.json({error:"We could not create your account. Try again shortly."},{status:500});}return NextResponse.json({ok:true});}

