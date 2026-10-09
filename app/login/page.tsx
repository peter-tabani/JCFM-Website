"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail, Phone } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const search = useSearchParams();
  const callback = search.get("callbackUrl") || "/admin";
  // Phone/PIN is the normal admin login for ministry leaders. Email is reserved for the developer.
  const [mode, setMode] = useState<"admin" | "staff">("staff");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const destination = mode === "admin" ? callback : "/staff/uploads";
      const result = await signIn("credentials", mode === "admin"
        ? { email, password, redirect: false, callbackUrl: destination }
        : { phone: email, pin: password, redirect: false, callbackUrl: destination });

      if (result?.error) {
        setError(mode === "admin" ? "Incorrect email or password. Please try again." : "Phone number or PIN is incorrect, or this account is unavailable.");
        return;
      }

      if (result?.ok) {
        window.location.href = result.url || destination;
      }
    } catch {
      setError("Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-5 py-8">
      <div className="w-full max-w-md">
        {error && (
          <div
            className="mb-5 flex items-center gap-3 border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
            <AlertCircle size={18} className="shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-email" className="mb-2 block text-sm text-white">
              {mode === "admin" ? "Email" : "Phone number"}
            </label>
            <div className="flex min-h-12 border border-white/20 bg-white/5 focus-within:border-white/60">
              <span className="flex w-12 shrink-0 items-center justify-center text-white/60" aria-hidden="true">
                {mode === "admin" ? <Mail size={18} /> : <Phone size={18} />}
              </span>
              <input
                id="admin-email"
                type={mode === "admin" ? "email" : "tel"}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete={mode === "admin" ? "username" : "tel"}
                required
                className="w-full bg-transparent px-3 text-base text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm text-white">
              {mode === "admin" ? "Password" : "PIN"}
            </label>
            <div className="flex min-h-12 border border-white/20 bg-white/5 focus-within:border-white/60">
              <span className="flex w-12 shrink-0 items-center justify-center text-white/60" aria-hidden="true">
                <Lock size={18} />
              </span>
              <input
                id="admin-password"
                type={mode === "staff" ? "password" : showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={mode === "staff" ? "one-time-code" : "current-password"}
                inputMode={mode === "staff" ? "numeric" : undefined}
                maxLength={mode === "staff" ? 8 : undefined}
                pattern={mode === "staff" ? "[0-9]{8}" : undefined}
                required
                className="w-full bg-transparent px-3 text-base text-white outline-none"
              />
              {mode === "admin" && <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="flex min-h-12 w-12 shrink-0 items-center justify-center text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex min-h-12 w-full items-center justify-center gap-3 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
            {!loading && <ArrowRight size={17} />}
          </button>
          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === "staff" ? "admin" : "staff");
                setEmail("");
                setPassword("");
                setError(null);
              }}
              className="min-h-11 px-2 text-sm text-white/75 underline underline-offset-4 hover:text-white"
            >
              {mode === "staff" ? "Login as developer" : "Back to admin login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
