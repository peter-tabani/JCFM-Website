"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye, EyeOff, ArrowRight, Loader2,
  CheckCircle2, Heart,
} from "lucide-react";

// ── Donor storage helpers ─────────────────────────────
type StoredDonor = {
  name: string;
  email: string;
  phone: string;
  password: string;
  smsSent: boolean;
  joinedAt: string;
};

const getDonors = (): StoredDonor[] => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("kes_donors") || "[]"); }
  catch { return []; }
};

const saveDonors = (donors: StoredDonor[]) =>
  localStorage.setItem("kes_donors", JSON.stringify(donors));

const findByEmail = (email: string) =>
  getDonors().find((d) => d.email?.toLowerCase() === email.toLowerCase());

const findByPhone = (phone: string) => {
  const clean = phone.replace(/\s/g, "").replace(/^0/, "+254");
  return getDonors().find(
    (d) => d.phone?.replace(/\s/g, "").replace(/^0/, "+254") === clean
  );
};

const findByLoginId = (id: string) =>
  id.match(/^\+?[\d\s]{7,}$/) ? findByPhone(id) : findByEmail(id);

export default function DonorPortalPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");

  // Login
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [existingAccount, setExistingAccount] = useState(false);

  // Register
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/donors/portal/dashboard" });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    setExistingAccount(false);

    const donor = findByLoginId(loginId);
    if (!donor) {
      setLoginError("No account found with that email or phone number.");
      setLoginLoading(false);
      return;
    }
    if (donor.password !== loginPassword) {
      setLoginError("Incorrect password. Please try again.");
      setLoginLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: donor.email || donor.phone,
      password: loginPassword,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/donors/portal/dashboard");
    } else {
      setLoginError("Sign in failed. Please try again.");
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");

    if (!regName.trim()) { setRegError("Please enter your full name."); return; }
    if (!regEmail && !regPhone) { setRegError("Please enter an email or phone number."); return; }
    if (regPassword !== regConfirm) { setRegError("Passwords do not match."); return; }
    if (regPassword.length < 6) { setRegError("Password must be at least 6 characters."); return; }

    const existingByEmail = regEmail ? findByEmail(regEmail) : null;
    const existingByPhone = regPhone ? findByPhone(regPhone) : null;

    if (existingByEmail || existingByPhone) {
      setExistingAccount(true);
      setTab("login");
      setLoginId(regEmail || regPhone);
      return;
    }

    setRegLoading(true);
    try {
      const donors = getDonors();
      const newDonor: StoredDonor = {
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        smsSent: false,
        joinedAt: new Date().toISOString(),
      };
      donors.push(newDonor);
      saveDonors(donors);

      if (regEmail) {
        await fetch("/api/donor-welcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: regName, email: regEmail }),
        });
      }

      if (regPhone && !newDonor.smsSent) {
        const smsRes = await fetch("/api/donor-sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: regName, phone: regPhone }),
        });
        if (smsRes.ok) {
          const updated = getDonors().map((d) =>
            d.phone === regPhone ? { ...d, smsSent: true } : d
          );
          saveDonors(updated);
        }
      }

      await signIn("credentials", {
        email: regEmail || regPhone,
        password: regPassword,
        redirect: false,
      });

      setRegSuccess(true);
      setTimeout(() => router.push("/donors/portal/dashboard"), 2500);
    } catch {
      setRegError("Something went wrong. Please try again.");
      setRegLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col lg:flex-row">

      {/* ── Left Branding Panel ── */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0f172a] p-12 lg:flex lg:w-[42%]">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <Link href="/" className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#d97706] text-sm font-bold text-[#d97706]">K</div>
          <div>
            <p className="font-bold text-white">KES</p>
            <p className="text-xs text-white/40">Kenya Excellent Centre & School</p>
          </div>
        </Link>
        <div className="relative">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/20 text-[#d97706]">
            <Heart size={28} />
          </div>
          <h1 className="hero-title mb-4 text-4xl font-medium leading-tight text-white">
            Your giving<br />
            <span className="text-[#d97706]">changes lives</span><br />
            in Likoni.
          </h1>
          <p className="mb-8 text-base leading-8 text-white/55">
            Join our community of donors helping children access quality education regardless of their background.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { n: "250+", l: "Children\nSponsored" },
              { n: "2013", l: "Year\nFounded" },
              { n: "10+", l: "National\nAlumni" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xl font-bold text-[#d97706]">{s.n}</p>
                <p className="mt-1 whitespace-pre-line text-xs leading-4 text-white/50">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-white/25">© {new Date().getFullYear()} Kenya Excellent Centre & School</p>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex flex-1 items-center justify-center bg-white px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#d97706] text-sm font-bold text-[#d97706]">K</div>
            <div>
              <p className="font-bold text-slate-800">KES Donor Portal</p>
              <p className="text-xs text-slate-400">Kenya Excellent Centre & School</p>
            </div>
          </Link>

          {/* Existing account notice */}
          {existingAccount && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-[#d97706]/30 bg-[#fffaf2] p-4">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#d97706]" />
              <div>
                <p className="text-sm font-bold text-slate-900">Welcome back! 👋</p>
                <p className="text-xs leading-6 text-slate-600">
                  You already have an account. We have switched you to sign in — just enter your password below.
                </p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mb-7 flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => { setTab("login"); setLoginError(""); setExistingAccount(false); }}
              className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${tab === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab("register"); setRegError(""); setExistingAccount(false); }}
              className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${tab === "register" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              Create Account
            </button>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="mb-5 flex w-full items-center justify-center gap-3 rounded-full border-2 border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
          >
            {googleLoading ? <Loader2 size={18} className="animate-spin" /> : (
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.7-3.3-11.3-8H6.4C9.8 35.6 16.3 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C37.1 39 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/>
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">or continue with email / phone</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* ── LOGIN ── */}
          {tab === "login" && (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="label">Email or Phone Number</label>
                  <input
                    required
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
  
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      required
                      type={showLoginPass ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      
                      className="input pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPass((s) => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showLoginPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{loginError}</div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d97706] py-4 font-semibold text-white hover:bg-[#b45309] disabled:opacity-60"
                >
                  {loginLoading
                    ? <><Loader2 size={17} className="animate-spin" /> Signing in...</>
                    : <>Sign In <ArrowRight size={17} /></>}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-slate-500">
                No account?{" "}
                <button onClick={() => setTab("register")} className="font-semibold text-[#d97706] hover:underline">
                  Create one free →
                </button>
              </p>
            </>
          )}

          {/* ── REGISTER ── */}
          {tab === "register" && (
            <>
              {regSuccess ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="hero-title mb-3 text-3xl text-slate-900">You&apos;re in!</h3>
                  <p className="max-w-sm text-sm leading-8 text-slate-600">
                    Welcome, <strong>{regName}</strong>!{" "}
                    {regEmail && <>A welcome email is heading to <strong>{regEmail}</strong>.</>}{" "}
                    {regPhone && <>A welcome SMS has been sent to <strong>{regPhone}</strong>.</>}{" "}
                    Taking you to your dashboard...
                  </p>
                  <Loader2 size={20} className="mt-4 animate-spin text-[#d97706]" />
                </div>
              ) : (
                <>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="label">Full Name *</label>
                      <input
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        
                        className="input"
                      />
                    </div>

                    <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-500">
                      💡 You can register with <strong>email</strong>, <strong>phone</strong>, or <strong>both</strong>. At least one is required.
                    </div>

                    <div>
                      <label className="label">Email Address</label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="label">Phone Number</label>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        
                        className="input"
                      />
                      {regPhone && (
                        <p className="mt-1.5 text-xs text-[#d97706]">
                          📱 You will receive a welcome SMS — sent once only.
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="label">Password *</label>
                      <div className="relative">
                        <input
                          required
                          type={showRegPass ? "text" : "password"}
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="Min. 6 characters"
                          className="input pr-11"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPass((s) => !s)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                          {showRegPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="label">Confirm Password *</label>
                      <input
                        required
                        type="password"
                        value={regConfirm}
                        onChange={(e) => setRegConfirm(e.target.value)}
                        placeholder="Repeat your password"
                        className="input"
                      />
                    </div>

                    {regError && (
                      <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{regError}</div>
                    )}

                    <button
                      type="submit"
                      disabled={regLoading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d97706] py-4 font-semibold text-white hover:bg-[#b45309] disabled:opacity-60"
                    >
                      {regLoading
                        ? <><Loader2 size={17} className="animate-spin" /> Creating account...</>
                        : <><Heart size={17} /> Create My Account</>}
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      Welcome SMS is sent once on registration — never on future logins.
                    </p>
                  </form>

                  <p className="mt-5 text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <button onClick={() => setTab("login")} className="font-semibold text-[#d97706] hover:underline">
                      Sign in →
                    </button>
                  </p>
                </>
              )}
            </>
          )}

          <p className="mt-8 text-center text-xs text-slate-400">
            <Link href="/" className="hover:text-[#d97706]">← Back to KES website</Link>
          </p>
        </div>
      </div>
    </main>
  );
}