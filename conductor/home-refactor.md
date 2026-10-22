# Implementation Plan: Home Page Refactoring

## Objective
Update the home page (`app/page.tsx`) to match the new BNM Secure portal design shown in `docs/home-2.png` and use the logo `public/b.png`. The existing Touch 'n Go logic will be discarded as per user request.

## Key Files & Context
- `app/page.tsx`: The main entry point to be completely rewritten.
- `docs/home-2.png`: The reference design.
- `public/b.png`: The BNM Secure logo.
- Existing routes `/b` (Online Banking) and `/c` (Credit/Debit Card) will be linked from the new portal.

## Implementation Steps
1. **Rewrite `app/page.tsx`**:
   - Create a new functional component for the BNM Secure portal.
   - Use a light gray/blue background for the full screen (e.g., `bg-slate-50` or `#F4F7FB`).
   - Center the content vertically and horizontally.

2. **Header Section**:
   - Add the BNM logo (`/b.png`) inside a white, rounded, shadow-bearing container.
   - Add the title "BNM Secure" with a dark blue color (`text-[#0A1B3F]` or similar) and bold font.
   - Add the subtitle "Official Secure Transaction Portal" in gray.

3. **Transaction Method Card**:
   - Create a central white card (`bg-white rounded-3xl shadow-sm p-6 w-full max-w-md`).
   - Add the section title "SELECT TRANSACTION METHOD" (uppercase, bold, light gray text, tracking wide).
   - Create three clickable option rows:
     - **Credit & Debit Card**: Links to `/c`. Subtitle: "Visa, Mastercard". Icon: Card.
     - **Online Banking**: Links to `/b`. Subtitle: "FPX / Internet Banking". Icon: Bank building.
     - **E-Wallet**: Placeholder action (e.g., alerts "Coming soon" or links to a `#` hash). Subtitle: "Boost, Touch 'n Go, ShopeePay". Icon: Wallet/Card.
   - Style each row with a light gray background (`bg-slate-50`), rounded corners (`rounded-2xl`), and a right-pointing chevron.

4. **Footer**:
   - Add a small footer below the card with a lock icon and "Secured by BNM Secure" in a muted gray color.

## Verification & Testing
- Run `npm run dev` to ensure the new page renders without errors.
- Verify the layout matches `docs/home-2.png` in visual hierarchy, spacing, and colors.
- Click "Credit & Debit Card" to ensure it routes to `/c`.
- Click "Online Banking" to ensure it routes to `/b`.
