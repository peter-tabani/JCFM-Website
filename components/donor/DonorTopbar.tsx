"use client";

import { signOut } from "next-auth/react";
import { Menu, LogOut, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DonorTopbar({
  user,
  onOpenSidebar,
}: {
  user?: { name?: string | null; email?: string | null; image?: string | null };
  onOpenSidebar?: () => void;
}) {
  const initial = (user?.name?.[0] || "D").toUpperCase();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center gap-3 px-5 md:px-8">
        {/* Mobile menu */}
        <button
          onClick={onOpenSidebar}
          className="rounded-full p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        <p className="hidden text-[12px] text-slate-500 md:block">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
        </p>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/"
            className="hidden items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 sm:inline-flex"
          >
            <ExternalLink size={12} strokeWidth={2.25} />
            Public Site
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name || "Donor"}
                className="h-8 w-8 rounded-full border border-violet-200"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-[12px] font-bold text-violet-800">
                {initial}
              </div>
            )}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/donors/portal" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-semibold text-slate-600 hover:bg-slate-50"
            title="Sign out"
          >
            <LogOut size={12} strokeWidth={2.25} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
