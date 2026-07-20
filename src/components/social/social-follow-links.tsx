import { IconInstagram, IconTikTok } from "@/components/icons";
import { ButtonLink } from "@/components/marketing/button-link";
import { instagramUrl, tiktokUrl } from "@/lib/social-links";
import { cn } from "@/lib/utils";

type SocialFollowLinksProps = {
  layout?: "icons" | "buttons";
  className?: string;
};

export function SocialFollowLinks({ layout = "icons", className }: SocialFollowLinksProps) {
  if (layout === "icons") {
    return (
      <div className={cn("flex gap-3", className)}>
        <a
          href={tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 min-w-[44px] items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
          style={{ minWidth: 44 }}
          aria-label="Follow Basscally on TikTok"
        >
          <IconTikTok />
        </a>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 min-w-[44px] items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
          style={{ minWidth: 44 }}
          aria-label="Follow Basscally on Instagram"
        >
          <IconInstagram />
        </a>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-3 max-[680px]:flex-col", className)}>
      <ButtonLink
        href={tiktokUrl}
        variant="ghost"
        className="max-[680px]:w-full"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Basscally on TikTok"
      >
        Follow on TikTok
      </ButtonLink>
      <ButtonLink
        href={instagramUrl}
        variant="ghost"
        className="max-[680px]:w-full"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Basscally on Instagram"
      >
        Follow on Instagram
      </ButtonLink>
    </div>
  );
}
