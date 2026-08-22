import { Facebook, Instagram, Youtube, Music2, MessageCircle } from "lucide-react";
import { siteData } from "@/data/site";

const PLATFORMS = [
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "youtube", label: "YouTube", icon: Youtube },
  { key: "tiktok", label: "TikTok", icon: Music2 },
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle },
] as const;

export default function SocialLinks({ className = "" }: { className?: string }) {
  const links = PLATFORMS.filter((p) => siteData.social[p.key]);

  // Nothing configured yet — render nothing rather than a row of dead icons.
  if (links.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((p) => (
        <a
          key={p.key}
          href={siteData.social[p.key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#c4b5fd] hover:text-[#c4b5fd]"
        >
          <p.icon size={16} strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
}
