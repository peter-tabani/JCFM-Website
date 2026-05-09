"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import DonorAuthGuard from "@/components/donor/DonorAuthGuard";
import DonorSidebar from "@/components/donor/DonorSidebar";
import DonorTopbar from "@/components/donor/DonorTopbar";

export default function DonorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DonorAuthGuard>
      <Shell>{children}</Shell>
    </DonorAuthGuard>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:block lg:w-[260px] lg:shrink-0">
        <div className="fixed left-0 top-0 h-screen w-[260px]">
          <DonorSidebar user={data?.user} />
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-[280px] max-w-[88vw] transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <DonorSidebar user={data?.user} onClose={() => setOpen(false)} />
      </div>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <DonorTopbar user={data?.user} onOpenSidebar={() => setOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
