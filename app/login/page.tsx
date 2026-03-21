"use client";

import { useState } from "react";
import { ArrowLeft, Lock, User, Mail, GraduationCap, Users, Briefcase } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState("student");

  return (
    <div className="flex min-h-screen bg-[#f8f4ea]">
      {/* Left Side - Image & Branding (Hidden on mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-[#0f172a] p-12 lg:flex">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: "url('/images/hero/kecs-gate.webp')",
          }}
        />
        <div className="relative z-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Main Site
          </Link>
        </div>
        <div className="relative z-10 max-w-md">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d97706] text-2xl font-bold text-[#d97706]">
            K
          </div>
          <h1 className="hero-title mb-4 text-4xl text-white">
            Kenya Excellent Centre & School
          </h1>
          <p className="text-lg text-white/80">
            Natuwe Mbele Daima. Welcome to the KES official portal. Please log in
            to access your dashboard.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Back Button */}
          <Link
            href="/"
            className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 lg:hidden"
          >
            <ArrowLeft size={16} />
            Back to Main Site
          </Link>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="mb-2 text-3xl font-bold text-slate-900">
              Welcome Back
            </h2>
            <p className="text-slate-500">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="mb-8 flex rounded-lg bg-slate-200 p-1">
            <button
              onClick={() => setActiveRole("student")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${
                activeRole === "student"
                  ? "bg-white text-[#d97706] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap size={16} />
              Student
            </button>
            <button
              onClick={() => setActiveRole("staff")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${
                activeRole === "staff"
                  ? "bg-white text-[#d97706] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase size={16} />
              Staff
            </button>
            <button
              onClick={() => setActiveRole("parent")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${
                activeRole === "parent"
                  ? "bg-white text-[#d97706] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users size={16} />
              Parent
            </button>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Dynamic Username Field based on Role */}
            <div>
              <label
                htmlFor="identifier"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                {activeRole === "student" && "Admission Number"}
                {activeRole === "staff" && "Staff ID or Email"}
                {activeRole === "parent" && "Email or Phone Number"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  {activeRole === "student" ? (
                    <User size={18} />
                  ) : (
                    <Mail size={18} />
                  )}
                </div>
                <input
                  type={activeRole === "student" ? "text" : "email"}
                  id="identifier"
                  className="block w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
                  placeholder={
                    activeRole === "student"
                      ? "e.g. KECS/2026/001"
                      : activeRole === "staff"
                      ? "staff@kes.sc.ke"
                      : "parent@example.com"
                  }
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  id="password"
                  className="block w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-[#d97706] focus:ring-[#d97706]"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-medium text-[#d97706] hover:text-[#b45309]"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-[#0f172a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Registration Link */}
          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-[#d97706] hover:text-[#b45309]"
            >
              Contact Administration
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}