import { NextResponse } from "next/server";
/** Magic-link login is deliberately retired. Password login and account-first onboarding are the only supported paths. */
export async function POST(){return NextResponse.json({error:"Email-link sign-in is unavailable. Sign in with your password."},{status:410});}
