"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import AuthGuard from "@/components/admin/AuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Shell>{children}</Shell>
    </AuthGuard>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ── Sidebar (desktop fixed, mobile drawer) ── */}
      <div className="hidden lg:block lg:w-[240px] lg:shrink-0">
        <div className="fixed top-0 left-0 h-screen w-[240px]">
          <AdminSidebar user={data?.user} />
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-[280px] max-w-[88vw] transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar user={data?.user} onClose={() => setOpen(false)} />
      </div>

      {/* ── Main column ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar user={data?.user} onOpenSidebar={() => setOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
