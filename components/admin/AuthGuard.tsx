"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ShieldX, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      const cb = encodeURIComponent(pathname || "/admin");
      router.replace(`/login?callbackUrl=${cb}`);
    }
  }, [status, pathname, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f6ee]">
        <div className="flex flex-col items-center gap-3 text-[#0b2545]">
          <Loader2 size={24} className="animate-spin" strokeWidth={1.75} />
          <p className="text-[11px] font-bold uppercase tracking-[0.32em]">
            Verifying session…
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  // Session present but not an admin, show a friendly block
  if (data?.user?.role && data.user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f6ee] p-6">
        <div className="w-full max-w-md border-2 border-[#a8201a] bg-white p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-[#a8201a] bg-[#a8201a]/10 text-[#a8201a]">
            <ShieldX size={22} strokeWidth={1.75} />
          </div>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.4em] text-[#a8201a]">
            Access Denied
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold uppercase tracking-wide text-[#0b2545]">
            Not authorised
          </h2>
          <p className="mt-3 text-[13px] leading-7 text-slate-600">
            Your account <span className="font-mono">{data.user.email}</span>{" "}
            is not on the ministry administration allowlist. If this is an
            error, please contact the coordinator.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 bg-[#0b2545] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#0a1e3a]"
          >
            <ArrowLeft size={12} strokeWidth={2.5} />
            Back to Site
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
