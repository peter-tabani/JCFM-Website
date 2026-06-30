"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

/* ──────────────────────────────────────────────────────
   Login — Ministry Administration
   Single sign-in for ministry staff (Bishop, Coordinator,
   Pastors, Office).  Wires into NextAuth credentials +
   Google providers.  Demo mode accepts any password for the
   emails allowlisted in @/lib/admin.ts.
   ────────────────────────────────────────────────────── */

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const search = useSearchParams();
  const callback = search.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email || !password) {
      setErr("Please enter both email and password.");
      return;
    }
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: callback,
    });
    setLoading(false);
    if (res?.error) {
      setErr("Incorrect credentials. Please try again.");
      return;
    }
    if (res?.ok) {
      window.location.href = res.url || callback;
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#f8f6ee] lg:grid-cols-[1.1fr_1fr]">
      {/* ── Left · Brand panel (desktop) ── */}
      <aside className="relative hidden overflow-hidden bg-[#0b2545] text-white lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/hero/jcfm-hero.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b2545] via-[#0b2545]/90 to-transparent" />

        {/* Decorative grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #c9a961 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          {/* Top · crest + back link */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c9a961] transition hover:text-white"
            >
              <ArrowLeft size={12} strokeWidth={2.5} />
              Back to the Ministry Site
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border-2 border-[#c9a961] bg-[#0b2545] font-serif text-sm font-bold text-[#c9a961]">
                JCFM
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#c9a961]">
                  Administration
                </p>
                <p className="font-serif text-sm font-semibold leading-none">
                  Ministry Console
                </p>
              </div>
            </div>
          </div>

          {/* Middle · motto */}
          <div className="max-w-md">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c9a961]">
              Secure Staff Area
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold uppercase leading-[1.05] tracking-[0.02em] xl:text-5xl">
              Jesus Christ
              <br />
              <span className="text-[#c9a961]">Founder Ministry</span>
            </h1>
            <div className="mt-6 h-[2px] w-16 bg-[#c9a961]" />
            <p className="mt-6 font-serif text-lg italic text-white/85 xl:text-xl">
              Expanding the Kingdom, One Community at a Time.
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-7 text-white/65">
              This portal is reserved for pastors, the coordinator, the
              bishop, and authorised office staff. Please sign in with the
              email your office has on file.
            </p>
          </div>

          {/* Bottom · security note */}
          <div className="flex items-center gap-3 border-t border-white/15 pt-6">
            <ShieldCheck
              size={18}
              strokeWidth={1.75}
              className="text-[#c9a961]"
            />
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
              Encrypted session · 24-hour auto-logout
            </p>
          </div>
        </div>
      </aside>

      {/* ── Right · Form panel ── */}
      <main className="flex items-center justify-center px-5 py-10 sm:px-8 sm:py-14 lg:py-10">
        <div className="w-full max-w-[440px]">
          {/* Mobile crest / back link */}
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0b2545]"
            >
              <ArrowLeft size={12} strokeWidth={2.5} />
              Back to Site
            </Link>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-[#0b2545] bg-[#0b2545] font-serif text-[11px] font-bold text-[#c9a961]">
              JCFM
            </div>
          </div>

          {/* Gazette masthead */}
          <div className="border-b-2 border-[#0b2545] pb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#a8201a]">
              Document № JCFM / ADM / LOGIN
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.02em] text-[#0b2545] md:text-[40px]">
              Sign In
            </h2>
            <p className="mt-2 text-[13px] text-slate-600">
              Welcome back. Please authenticate to continue.
            </p>
          </div>

          {/* Google sign-in */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: callback })}
            className="mt-6 flex w-full items-center justify-center gap-3 border-2 border-[#0b2545] bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0b2545] transition hover:bg-[#0b2545] hover:text-white"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em] text-slate-400">
            <span className="h-[1px] flex-1 bg-[#d4d0c4]" />
            or use email
            <span className="h-[1px] flex-1 bg-[#d4d0c4]" />
          </div>

          {/* Error banner */}
          {err && (
            <div className="mb-5 flex items-start gap-3 border-l-4 border-[#a8201a] bg-[#a8201a]/5 px-4 py-3 text-[13px] text-[#a8201a]">
              <AlertCircle size={16} strokeWidth={2.25} className="mt-0.5 shrink-0" />
              {err}
            </div>
          )}

          {/* Credentials form */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#0b2545]">
                Email Address
              </label>
              <div className="flex border-2 border-[#d4d0c4] bg-white transition focus-within:border-[#0b2545]">
                <div className="flex w-12 items-center justify-center border-r border-[#d4d0c4] bg-[#f8f6ee] text-[#0b2545]">
                  <Mail size={16} strokeWidth={2} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jcfm.org"
                  autoComplete="email"
                  className="w-full px-3.5 py-3 text-[14px] text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0b2545]">
                  Password
                </label>
                <a
                  href="mailto:coordinator@jcfm.org?subject=Password%20reset%20request"
                  className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a8201a] transition hover:text-[#0b2545]"
                >
                  Forgot?
                </a>
              </div>
              <div className="flex border-2 border-[#d4d0c4] bg-white transition focus-within:border-[#0b2545]">
                <div className="flex w-12 items-center justify-center border-r border-[#d4d0c4] bg-[#f8f6ee] text-[#0b2545]">
                  <Lock size={16} strokeWidth={2} />
                </div>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-3.5 py-3 text-[14px] text-slate-900 outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="flex w-12 items-center justify-center border-l border-[#d4d0c4] bg-[#f8f6ee] text-slate-500 hover:text-[#0b2545]"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <label className="flex items-center gap-2.5 text-[12px] text-slate-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 border-[#0b2545] accent-[#0b2545]"
              />
              Keep me signed in on this device
            </label>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 bg-[#0b2545] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#0a1e3a] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In to Console
                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                    className="transition group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-8 border border-dashed border-[#c9a961] bg-[#c9a961]/10 p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a8201a]">
              Secure Sign-In
            </p>
            <p className="mt-2 text-[11px] italic leading-6 text-slate-600">
              Accounts are stored in the database with hashed passwords. Admin
              access is granted only to authorised emails. If you don&apos;t have
              an account yet, ask the coordinator to create one.
            </p>
          </div>

          <p className="mt-8 text-center text-[11px] text-slate-500">
            Need access? Speak with the coordinator:{" "}
            <a
              href="mailto:coordinator@jcfm.org"
              className="font-semibold text-[#0b2545] hover:text-[#a8201a]"
            >
              coordinator@jcfm.org
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

/* Inline Google G logomark */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11A6.59 6.59 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.95l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.07.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
