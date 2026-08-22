"use client";

import { useState } from "react";
import { Menu, Search, Bell, ChevronDown, LogOut, ExternalLink, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminTopbar({
  user,
  onOpenSidebar,
}: {
  user?: { name?: string | null; email?: string | null } | null;
  onOpenSidebar: () => void;
}) {
  const [openUser, setOpenUser] = useState(false);
  const initial = (user?.name || user?.email || "A").charAt(0).toUpperCase();
  const date = new Date().toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 md:px-6">
      {/* Left — mobile menu + date */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          aria-label="Open navigation"
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
        >
          <Menu size={18} strokeWidth={2} />
        </button>

        <p className="hidden text-[12.5px] text-slate-500 md:block">{date}</p>
      </div>

      {/* Middle — search */}
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search
          size={14}
          strokeWidth={2}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          placeholder="Search members, sermons, donations…"
          className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-[13px] text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-500 lg:block">
          ⌘K
        </kbd>
      </div>

      {/* Right — notifications + user */}
      <div className="flex items-center gap-1.5">
        <button
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell size={16} strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-slate-900" />
        </button>

        <div className="relative">
          <button
            onClick={() => setOpenUser((v) => !v)}
            className="flex items-center gap-2 rounded-md px-1.5 py-1 transition hover:bg-slate-100"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[12px] font-semibold text-slate-700">
              {initial}
            </span>
            <span className="hidden text-left md:block">
              <span className="block text-[12.5px] font-medium leading-tight text-slate-900">
                {user?.name || "Admin"}
              </span>
              <span className="block text-[11px] text-slate-500">
                Administrator
              </span>
            </span>
            <ChevronDown size={13} strokeWidth={2} className="text-slate-400" />
          </button>

          {openUser && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpenUser(false)}
              />
              <div className="absolute right-0 z-50 mt-1 w-64 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
                <div className="border-b border-slate-200 p-3.5">
                  <p className="text-[11px] text-slate-500">Signed in as</p>
                  <p className="mt-0.5 truncate text-[13.5px] font-semibold text-slate-900">
                    {user?.name || "Administrator"}
                  </p>
                  <p className="mt-0.5 truncate text-[11.5px] text-slate-500">
                    {user?.email || "—"}
                  </p>
                </div>
                <Link
                  href="/admin/settings"
                  onClick={() => setOpenUser(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] text-slate-700 hover:bg-slate-50"
                >
                  <User size={14} strokeWidth={1.75} />
                  Account Settings
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-2.5 border-t border-slate-200 px-3.5 py-2.5 text-[12.5px] text-slate-700 hover:bg-slate-50"
                >
                  <ExternalLink size={14} strokeWidth={1.75} />
                  View Public Site
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex w-full items-center gap-2.5 border-t border-slate-200 px-3.5 py-2.5 text-left text-[12.5px] text-slate-700 hover:bg-slate-50"
                >
                  <LogOut size={14} strokeWidth={1.75} />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
