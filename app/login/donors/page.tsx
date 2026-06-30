"use client";

import { Lock, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DonorsLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f4ea] p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        
        {/* Back Navigation */}
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#7c3aed]"
        >
          <ArrowLeft size={16} />
          Back to Main Site
        </Link>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#7c3aed] text-2xl font-bold text-[#7c3aed]">
            K
          </div>
          <h1 className="mb-2 text-2xl font-bold text-slate-900">Donor Portal</h1>
          <p className="text-sm text-slate-500">
            Sign in to manage your contributions and updates.
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-[#7c3aed] focus:ring-[#7c3aed]"
              />
              <span className="text-sm text-slate-600">Remember me</span>
            </label>
            <a href="mailto:info@jcfm.org?subject=Donor%20Portal%20password%20reset" className="text-sm font-medium text-[#7c3aed] hover:text-[#6d28d9]">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-[#0f172a] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
          >
            Login to Portal
          </button>
        </form>
        
      </div>
    </div>
  );
}