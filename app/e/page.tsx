'use client';

import Image from 'next/image';
import Link from 'next/link';

const EWALLETS = [
    {
        id: 'tng',
        name: "Touch 'n Go",
        logo: "/bank/Touch_'n_Go_logo.svg",
        subtitle: "E-Wallet & Digital Payment",
        route: '/e/t'
    },
    {
        id: 'shopee',
        name: "ShopeePay",
        logo: "/bank/Shopee_logo.svg",
        subtitle: "Shopee Digital Wallet",
      route: '/e/s'
    }
];

export default function EWalletPage() {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F8F9FB] px-6 py-12 font-sans">
            <div className="w-full max-w-[440px] flex flex-col items-center space-y-8">
                
                {/* Header Section (Matching app/c/page.tsx) */}
                <div className="flex flex-col items-center space-y-6 w-full relative">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="absolute left-0 top-0 group flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0A1B3F] shadow-sm border border-gray-100 transition-all hover:bg-gray-50 active:scale-95"
                    >
                        <svg className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>

                    <div className="bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50">
                        <div className="w-16 h-16 relative">
                            <Image src="/b.png" alt="BNM" fill className="object-contain" />
                        </div>
                    </div>
                    
                    <div className="text-center space-y-1">
                        <h1 className="text-2xl font-bold text-[#0A1B3F]">E-Wallet Selection</h1>
                        <p className="text-[#6B7280] font-medium text-sm">Official Secure Transaction Portal</p>
                    </div>
                </div>

                {/* Selection Card (Matching form container style) */}
                <div className="w-full bg-white rounded-[40px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100/50">
                    <h2 className="text-[13px] font-bold text-[#9CA3AF] tracking-[0.08em] mb-6 ml-1">
                        SELECT E-WALLET PROVIDER
                    </h2>

                    <div className="space-y-4">
                        {EWALLETS.map((wallet) => (
                            <Link
                                key={wallet.id}
                                className="w-full flex items-center p-5 bg-[#F8F9FB] rounded-[24px] group transition-all hover:bg-gray-100 active:scale-[0.98] text-left"
                                href={wallet.route}
                            >
                                <div className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-sm mr-4 p-2 relative">
                                    <img 
                                        src={wallet.logo} 
                                        alt={wallet.name} 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[17px] font-bold text-[#0A1B3F]">{wallet.name}</div>
                                    <div className="text-[13px] text-[#6B7280] font-medium">{wallet.subtitle}</div>
                                </div>
                                <svg className="w-5 h-5 text-[#9CA3AF] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 p-4 rounded-2xl bg-[#F8F9FB] border border-gray-50 flex items-start space-x-3">
                        <svg className="w-5 h-5 text-[#0A1B3F] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-[12px] text-[#6B7280] leading-relaxed font-medium">
                            Please ensure you have the respective e-wallet application installed on your device to proceed with the payment.
                        </p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="flex flex-col items-center space-y-3 pt-4 opacity-60">
                    <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-[#9CA3AF]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[14px] font-medium text-[#9CA3AF]">Secured by BNM Secure</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
