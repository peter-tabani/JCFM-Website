"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import StaffGuard from "@/components/admin/StaffGuard";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  return <StaffGuard>
    <div className="min-h-screen bg-[#080808] text-white">
      <header className="sticky top-0 z-20 flex min-h-14 items-center justify-between border-b border-white/15 bg-[#080808] px-4 sm:px-6">
        <Link href="/staff/uploads" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-xs font-bold text-black">JCFM</span>
          <span><span className="block text-sm font-semibold">Photo uploads</span><span className="block text-xs text-white/55">{data?.user?.name || "Staff"}</span></span>
        </Link>
        <button onClick={() => void signOut({ callbackUrl: "/login" })} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-3 text-sm hover:bg-white/10"><LogOut size={16} /> Sign out</button>
      </header>
      {children}
    </div>
  </StaffGuard>;
}
