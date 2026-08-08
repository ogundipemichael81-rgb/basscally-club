import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
export async function GET(){const auth=await requireAdminApi();if(!auth.ok)return auth.response;return NextResponse.json({ok:true},{headers:{"Cache-Control":"private, no-store"}});}