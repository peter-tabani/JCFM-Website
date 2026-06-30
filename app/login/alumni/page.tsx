"use client";

import { User, Key } from "lucide-react";
import Link from "next/link";

export default function StaffLogin() {
  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-[#f4f4f4]"
      style={{ 
        backgroundImage: 'radial-gradient(#d4d4d4 1px, transparent 1px)', 
        backgroundSize: '12px 12px' 
      }}
    >
      <div className="w-full max-w-[450px] px-4">
        
        {/* Main Login Card */}
        <div className="rounded-sm border border-slate-200 bg-white p-8 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          <h1 className="hero-title mb-8 text-3xl font-semibold text-slate-700">
            Alumni Login
          </h1>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* ID Input Group */}
            <div className="flex overflow-hidden rounded-sm border border-slate-300 focus-within:border-slate-400">
              <div className="flex w-14 items-center justify-center border-r border-slate-300 bg-[#f8f9fa] text-slate-400">
                <User size={20} className="text-slate-400" />
              </div>
              <input
                type="text"
                className="w-full px-4 py-3.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                placeholder="Alumni Email"
              />
            </div>

            {/* Password Input Group */}
            <div className="flex overflow-hidden rounded-sm border border-slate-300 focus-within:border-slate-400">
              <div className="flex w-14 items-center justify-center border-r border-slate-300 bg-[#f8f9fa] text-slate-400">
                <Key size={20} className="text-slate-400" />
              </div>
              <input
                type="password"
                className="w-full px-4 py-3.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                placeholder="Password"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="rounded-sm bg-[#689f38] px-8 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#558b2f]"
              >
                Log In
              </button>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-5 flex items-center justify-between px-2">
          <a
            href="mailto:info@jcfm.org?subject=Alumni%20Portal%20password%20reset"
            className="text-sm font-medium text-[#00695c] hover:underline"
          >
            Reset Password
          </a>
          
          {/* Back to Home Link - Added for better navigation */}
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
          >
            Return to Main Site
          </Link>
        </div>

      </div>
    </div>
  );
}