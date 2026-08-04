"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export function CheckoutSuccess(){
 const router=useRouter(); const id=useSearchParams().get("intent");
 const [message,setMessage]=useState(()=>id?"Confirming your membership...":"We could not identify this payment. No membership access was activated.");
 useEffect(()=>{ if(!id)return; let active=true; let attempts=0; const check=async()=>{ const r=await fetch(`/api/checkout/status?intent=${encodeURIComponent(id)}`,{cache:"no-store"}); const d=await r.json(); if(!active)return; if(d.status==="paid"){setMessage("Your Basscally Hub membership is active.");setTimeout(()=>router.replace("/dashboard"),700);return;} if(["manual_review","failed","expired"].includes(d.status)){setMessage(d.status==="expired"?"Payment is still processing. You can return to your dashboard later.":"Your payment needs a quick account check. Please contact Basscally support.");return;} attempts++; if(attempts>=20){setMessage("Payment may still be processing. You can safely return to your dashboard later.");return;} setTimeout(check,3000);}; void check(); return ()=>{active=false};},[id,router]);
 return <main className="mx-auto flex min-h-screen max-w-lg items-center px-5"><section className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center"><p className="text-sm text-[var(--color-brand)]">PAYMENT STATUS</p><h1 className="mt-3 text-3xl font-black">{message}</h1></section></main>;
}
