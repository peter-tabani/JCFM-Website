"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mic2, Users, Banknote, Menu } from "lucide-react";

// Mobile-only bottom tab bar. The primary destinations for phone use, plus a
// "Menu" button that opens the full navigation drawer. Hidden on lg+ where the
// fixed sidebar takes over.
const TABS = [
  { label: "Home", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Sermons", href: "/admin/sermons", icon: Mic2 },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Giving", href: "/admin/donations", icon: Banknote },
];

export default function AdminBottomNav({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden">
      {TABS.map((t) => {
        const active = isActive(t.href, t.exact);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition ${
              active ? "text-slate-900" : "text-slate-400"
            }`}
          >
            <t.icon size={20} strokeWidth={active ? 2.25 : 1.75} />
            {t.label}
          </Link>
        );
      })}
      <button
        onClick={onOpenMenu}
        aria-label="Open full menu"
        className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-slate-400 transition hover:text-slate-900"
      >
        <Menu size={20} strokeWidth={1.75} />
        Menu
      </button>
    </nav>
  );
}
