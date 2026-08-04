import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireNormalUser } from "@/lib/auth/authorization";
export async function GET(request:NextRequest){const user=await requireNormalUser();if(!user)return NextResponse.json({error:"Sign in required."},{status:401});const id=request.nextUrl.searchParams.get("intent");if(!id)return NextResponse.json({error:"Missing checkout status."},{status:400});const admin=createAdminClient();const {data}=await admin.from("checkout_intents").select("status,expires_at").eq("id",id).eq("user_id",user.id).maybeSingle();if(!data)return NextResponse.json({error:"Checkout not found."},{status:404});const expired=data.status!=="paid"&&new Date(data.expires_at).getTime()<Date.now();return NextResponse.json({status:expired?"expired":data.status});}

