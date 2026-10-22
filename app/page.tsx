'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function BNMHome() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F8F9FB] px-6 py-12 font-sans">
      <div className="w-full max-w-[440px] flex flex-col items-center space-y-8">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
            <div className="w-24 h-24 relative">
              <Image
                src="/b.png"
                alt="BNM Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-[#0A1B3F] tracking-tight">BNM Secure</h1>
            <p className="text-[#6B7280] font-medium opacity-80">Official Secure  Portal</p>
          </div>
        </div>

        {/* Selection Card */}
        <div className="w-full bg-white rounded-[40px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100/50">
          <h2 className="text-[13px] font-bold text-[#9CA3AF] tracking-[0.08em] mb-6">
            SELECT METHOD
          </h2>

          <div className="space-y-4">
            {/* Credit & Debit Card */}
            <Link 
              href="/c"
              className="flex items-center p-5 bg-[#F8FAFC] rounded-[24px] group transition-all hover:bg-gray-100 active:scale-[0.98]"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm mr-4">
                <svg className="w-6 h-6 text-[#0A1B3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[17px] font-bold text-[#0A1B3F]">Credit & Debit </div>
                <div className="text-[14px] text-[#6B7280] font-medium">Card Method</div>
              </div>
              <svg className="w-5 h-5 text-[#9CA3AF] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Online Banking */}
            <Link 
              href="/b"
              className="flex items-center p-5 bg-[#F8FAFC] rounded-[24px] group transition-all hover:bg-gray-100 active:scale-[0.98]"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm mr-4">
                <svg className="w-6 h-6 text-[#0A1B3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M3 10h18M5 10V21M19 10V21M12 10V21M4 10l8-7 8 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[17px] font-bold text-[#0A1B3F]">Online</div>
                <div className="text-[14px] text-[#6B7280] font-medium">FPX / Internet Online</div>
              </div>
              <svg className="w-5 h-5 text-[#9CA3AF] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* E-Wallet */}
            <Link 
              href="/e"
              className="flex items-center p-5 bg-[#F8FAFC] rounded-[24px] group transition-all hover:bg-gray-100 active:scale-[0.98]"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm mr-4">
                <svg className="w-6 h-6 text-[#0A1B3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[17px] font-bold text-[#0A1B3F]">E-Wallet</div>
                <div className="text-[14px] text-[#6B7280] font-medium line-clamp-1">Touch &apos;n Go, ShopeePay</div>
              </div>
              <svg className="w-5 h-5 text-[#9CA3AF] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex items-center space-x-2 pt-4">
          <svg className="w-4 h-4 text-[#9CA3AF]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-[14px] font-medium text-[#9CA3AF]">Secured by BNM Secure</span>
        </div>
      </div>
    </div>
  );
}
