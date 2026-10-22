'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const ALL_BANKS = [
  { name: 'MayBank', logo: '/bank/Maybank_2012.svg', route: '/b/maybank' },
  { name: 'CIMB Bank', logo: '/bank/CIMB_Niaga_logo.svg', route: '/b/cimb' },
  { name: 'Public Bank', logo: '/bank/Public_Bank_Berhad_logo1.png', route: '/b/public-bank' },
  { name: 'RHB BANK', logo: '/bank/RHB_Logo.svg', route: '/b/rhb' },
  { name: 'Hong Leong Bank', logo: '/bank/Hong_Leong_Bank.svg', route: '/b/hong-leong' },
  { name: 'Affin Bank', logo: '/bank/affin_bank.png', route: '/b/affin' },
  { name: 'Alliance Bank', logo: '/bank/Alliance_Bank_Malaysia_logo.png', route: '/b/alliance' },
  { name: 'Bank Islam', logo: '/bank/BANK_ISLAM_LOGO.jpg', route: '/b/bank-islam' },
  { name: 'AgroBank', logo: '/bank/Agrobank_Logo.svg', route: '/b/agrobank' },
  { name: 'Bank Simpanan Nasional', logo: '/bank/BSN.png', route: '/b/bsn' },
  { name: 'Bank Muamalat', logo: '/bank/Muamalat_Logo.png', route: '/b/bank-muamalat' },
  { name: 'Bank Rakyat', logo: '/bank/Bank_Rakyat_logo.png', route: '/b/bank-rakyat' },
  { name: 'AmBank', logo: '/bank/ambank.png', route: '/b/ambank' },
  { name: 'HSBC Bank', logo: '/bank/HSBC_logo_(2018).svg', route: '/b/hsbc' },
  { name: 'OCBC Bank', logo: '/bank/Logo-ocbc.svg', route: '/b/ocbc' },
  {
    name: 'Standard Chartered Bank',
    logo: '/bank/Standard_Chartered_(2021).svg',
    route: '/b/standard-chartered'
  },
  { name: 'UOB Bank', logo: '/bank/UOB_Logo_(2022).svg', route: '/b/uob' },
];

export default function SelectBankPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  const filteredBanks = useMemo(() => {
    if (!search) return ALL_BANKS;
    const lowerSearch = search.toLowerCase();
    return ALL_BANKS.filter((bank) =>
      bank.name.toLowerCase().includes(lowerSearch)
    );
  }, [search]);

  const handleSelectBank = (route: string) => {
    setNavigatingTo(route);
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans pb-12">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-[#0A1B3F] hover:bg-gray-100 transition-all"
              >
                <svg className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-[#0A1B3F] leading-tight">Select Bank</h1>
                <div className="flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Secure Portal</p>
                </div>
              </div>
            </div>
            <div className="w-10 h-10 relative">
              <Image src="/b.png" alt="BNM" fill className="object-contain" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Search & Notice */}
        <div className="mb-10 space-y-6">
          <div className="relative group max-w-2xl mx-auto">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-[#9CA3AF]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your bank..."
              className="block w-full rounded-2xl border border-gray-200 bg-white py-4.5 pl-12 pr-4 text-[#0A1B3F] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0A1B3F]/5 focus:border-[#0A1B3F]/20 transition-all font-medium shadow-sm"
            />
          </div>

          <div className="flex items-center space-x-4 rounded-2xl bg-[#0A1B3F]/5 border border-[#0A1B3F]/10 p-5 max-w-2xl mx-auto">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
              <svg className="h-5 w-5 text-[#0A1B3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-[#0A1B3F] leading-relaxed opacity-80">
              Ensure your bank's pop-up blocker is disabled to complete the secure payment process.
            </p>
          </div>
        </div>

        {/* Bank Grid */}
        {filteredBanks.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 animate-in fade-in duration-500">
            {filteredBanks.map((bank) => (
              <button
                key={bank.name}
                onClick={() => handleSelectBank(bank.route)}
                disabled={navigatingTo !== null}
                className="group relative flex flex-col items-center justify-center rounded-[32px] bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:scale-[1.02] active:scale-95 disabled:opacity-50 h-44 w-full overflow-hidden"
              >
                <div className="flex h-20 w-full items-center justify-center transition-transform group-hover:scale-105 duration-500">
                  {bank.logo ? (
                    <div className="relative w-full h-full flex items-center justify-center p-2">
                      <img
                        src={bank.logo}
                        alt={bank.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-[#0A1B3F] font-bold text-2xl">
                      {bank.name.substring(0, 1)}
                    </div>
                  )}
                </div>

                <div className="w-full pt-4">
                  <span className="block text-center text-[11px] font-bold uppercase tracking-wider text-[#0A1B3F] opacity-70 group-hover:opacity-100 transition-opacity">
                    {bank.name}
                  </span>
                </div>

                {/* Loading Overlay */}
                {navigatingTo === bank.route && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                    <svg className="h-8 w-8 text-[#0A1B3F] animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 rounded-full bg-white shadow-sm border border-gray-100 p-6">
              <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21l-7-7m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A1B3F]">No banks found</h3>
            <p className="mt-2 text-sm text-[#6B7280] font-medium">No results matching "{search}"</p>
            <button
              onClick={() => setSearch('')}
              className="mt-8 text-sm font-bold text-[#0A1B3F] hover:underline uppercase tracking-widest"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>

      {/* Footer Section */}
      <div className="flex flex-col items-center space-y-3 pt-12 pb-6 opacity-60">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-[#9CA3AF]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-[14px] font-medium text-[#9CA3AF]">Secured by BNM Secure</span>
        </div>
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em]">Official Transaction Portal</p>
      </div>
    </div>
  );
}
