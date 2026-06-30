"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DonorAuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/donors/portal");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white/[0.03]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-violet-800 text-base font-bold text-violet-900">
            F
          </div>
          <p className="text-sm text-white/45">Loading your portal…</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return <>{children}</>;
}
