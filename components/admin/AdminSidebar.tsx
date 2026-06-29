"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  MapPin,
  Mic2,
  Users,
  Banknote,
  GraduationCap,
  Settings,
  LogOut,
  X,
  ExternalLink,
} from "lucide-react";

type NavItem = { label: string; href: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }> };

const PRIMARY: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
];

const MINISTRY: NavItem[] = [
  { label: "Branches", href: "/admin/branches", icon: MapPin },
  { label: "Sermons", href: "/admin/sermons", icon: Mic2 },
  { label: "Members", href: "/admin/members", icon: Users },
];

const FINANCE: NavItem[] = [
  { label: "Donations", href: "/admin/donations", icon: Banknote },
];

const SCHOOL: NavItem[] = [
  { label: "Fountain of Hope", href: "/admin/school", icon: GraduationCap },
];

const SYSTEM: NavItem[] = [
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({
  onClose,
  user,
}: {
  onClose?: () => void;
  user?: { name?: string | null; email?: string | null } | null;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const Section = ({ title, items }: { title: string; items: NavItem[] }) => (
    <div className="px-3">
      <p className="px-2 pt-5 pb-1.5 text-[11px] font-medium text-slate-400">
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map((n) => {
          const active = isActive(n.href);
          return (
            <li key={n.href}>
              <Link
                href={n.href}
                onClick={onClose}
                className={`group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <n.icon
                  size={16}
                  strokeWidth={1.75}
                  className={active ? "text-white" : "text-slate-400 group-hover:text-slate-700"}
                />
                {n.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <aside className="flex h-full w-full flex-col overflow-y-auto border-r border-slate-200 bg-white text-slate-900 lg:w-[240px]">
      {/* ── Brand header ── */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
        <Link href="/admin" onClick={onClose} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-[11px] font-semibold text-white">
            JCFM
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-none text-slate-900">
              Ministry Console
            </p>
            <p className="mt-1 text-[11px] text-slate-500">Administration</p>
          </div>
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          >
            <X size={16} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* ── Nav groups ── */}
      <nav className="flex-1 py-2">
        <Section title="Home" items={PRIMARY} />
        <Section title="Ministry" items={MINISTRY} />
        <Section title="Finance" items={FINANCE} />
        <Section title="Education" items={SCHOOL} />
        <Section title="System" items={SYSTEM} />
      </nav>

      {/* ── Footer · User + Logout ── */}
      <div className="border-t border-slate-200 p-3">
        <div className="flex items-center gap-2.5 rounded-md px-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[12px] font-semibold text-slate-700">
            {(user?.name || user?.email || "A").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-slate-900">
              {user?.name || "Administrator"}
            </p>
            <p className="truncate text-[11px] text-slate-500">
              {user?.email || "—"}
            </p>
          </div>
        </div>

        <div className="mt-2 flex gap-1">
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200 px-2 py-1.5 text-[11.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <ExternalLink size={12} strokeWidth={2} />
            Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200 px-2 py-1.5 text-[11.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <LogOut size={12} strokeWidth={2} />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
