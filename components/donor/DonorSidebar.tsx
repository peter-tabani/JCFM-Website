"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  HandHeart,
  Sprout,
  FolderHeart,
  Compass,
  UserCircle2,
  X,
  HelpCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = { href: string; label: string; icon: LucideIcon; sub?: string };

const SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { href: "/donors/portal/dashboard", label: "Dashboard", icon: LayoutDashboard, sub: "Your home" },
    ],
  },
  {
    title: "My Giving",
    items: [
      { href: "/donors/portal/giving", label: "My Donations", icon: HandHeart, sub: "Every gift, dated" },
      { href: "/donors/portal/sponsorships", label: "My Sponsorships", icon: Sprout, sub: "Children & projects" },
    ],
  },
  {
    title: "Discover",
    items: [
      { href: "/donors/portal/projects", label: "Active Projects", icon: FolderHeart, sub: "Where help is needed now" },
      { href: "/donors/portal/vision", label: "Future Vision", icon: Compass, sub: "What we hope to build" },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/donors/portal/account", label: "My Profile", icon: UserCircle2 },
    ],
  },
];

export default function DonorSidebar({
  user,
  onClose,
}: {
  user?: { name?: string | null; email?: string | null; image?: string | null };
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r border-white/10 bg-[#0f1626]">
      {/* Brand */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <Link href="/donors/portal/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-violet-400 text-sm font-bold text-violet-300">
            F
          </div>
          <div>
            <p className="text-[13px] font-bold leading-none text-white">Fountain of Hope</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/35">
              Donor & Sponsor Portal
            </p>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-white/35 hover:bg-white/[0.03] hover:text-white/70 lg:hidden"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Donor card */}
      {user && (
        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name || "Donor"}
                className="h-10 w-10 rounded-full border-2 border-violet-200"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600/25 text-sm font-bold text-violet-200">
                {(user.name?.[0] || "D").toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-white">
                {user.name || "Friend of Fountain of Hope"}
              </p>
              <p className="truncate text-[11px] text-white/45">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {SECTIONS.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((it) => {
                const active =
                  pathname === it.href ||
                  (it.href !== "/donors/portal/dashboard" && pathname.startsWith(it.href));
                const Icon = it.icon;
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={onClose}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                        active
                          ? "bg-violet-600/20 text-white"
                          : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      <Icon
                        size={16}
                        strokeWidth={2}
                        className={active ? "text-violet-300" : "text-white/35 group-hover:text-white/70"}
                      />
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold leading-tight">{it.label}</p>
                        {it.sub && (
                          <p
                            className={`mt-0.5 truncate text-[10.5px] leading-tight ${
                              active ? "text-violet-200/70" : "text-white/35"
                            }`}
                          >
                            {it.sub}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Help footer */}
      <div className="border-t border-white/10 px-5 py-4">
        <a
          href="mailto:info@jcfm.online"
          className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5 transition hover:bg-white/[0.06]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600/25 text-violet-300">
            <HelpCircle size={15} strokeWidth={2} />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-white">Need a hand?</p>
            <p className="text-[10.5px] text-white/45">Email the office for help</p>
          </div>
        </a>
      </div>
    </aside>
  );
}
