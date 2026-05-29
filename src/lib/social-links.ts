import { clientEnv } from "@/lib/env";

const DEFAULT_WHATSAPP_COMMUNITY_URL =
  "https://chat.whatsapp.com/DJBtxeOSjoX8coymswNbvY?mode=ems_copy_c";

/** Env override, then official Basscally WhatsApp community invite. */
export const whatsappCommunityUrl =
  clientEnv.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL.trim() || DEFAULT_WHATSAPP_COMMUNITY_URL;

export const tiktokUrl =
  "https://www.tiktok.com/@basscally?_r=1&_t=ZS-92en0E5NZ0a";

export const instagramUrl =
  "https://www.instagram.com/basscally?igsh=bGJ4NzNnNWVjem04";

export function hasWhatsAppCommunityLink(): boolean {
  return (
    whatsappCommunityUrl.startsWith("http://") ||
    whatsappCommunityUrl.startsWith("https://")
  );
}
