"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function StaffGuard({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const role = data?.user?.role;
  const mustChangePin = data?.user?.mustChangePin;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname || "/staff/uploads")}`);
    } else if (status === "authenticated" && role === "admin") {
      router.replace("/admin");
    } else if (status === "authenticated" && role !== "staff") {
      router.replace("/login");
    } else if (role === "staff" && mustChangePin && pathname !== "/staff/change-pin") {
      router.replace("/staff/change-pin");
    } else if (role === "staff" && !mustChangePin && pathname === "/staff/change-pin") {
      router.replace("/staff/uploads");
    }
  }, [mustChangePin, pathname, role, router, status]);

  if (status !== "authenticated" || role !== "staff" || (mustChangePin && pathname !== "/staff/change-pin")) {
    return <div className="flex min-h-screen items-center justify-center bg-[#080808] text-white"><Loader2 className="animate-spin" /></div>;
  }

  return <>{children}</>;
}
