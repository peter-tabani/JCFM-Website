"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";

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
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: callback,
      });

      if (result?.error) {
        setError("Incorrect email or password. Please try again.");
        return;
      }

      if (result?.ok) {
        window.location.href = result.url || callback;
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
              Email
            </label>
            <div className="flex min-h-12 border border-white/20 bg-white/5 focus-within:border-white/60">
              <span className="flex w-12 shrink-0 items-center justify-center text-white/60" aria-hidden="true">
                <Mail size={18} />
              </span>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
                className="w-full bg-transparent px-3 text-base text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm text-white">
              Password
            </label>
            <div className="flex min-h-12 border border-white/20 bg-white/5 focus-within:border-white/60">
              <span className="flex w-12 shrink-0 items-center justify-center text-white/60" aria-hidden="true">
                <Lock size={18} />
              </span>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="w-full bg-transparent px-3 text-base text-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="flex min-h-12 w-12 shrink-0 items-center justify-center text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
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
        </form>
      </div>
    </main>
  );
}
