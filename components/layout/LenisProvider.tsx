/**
 * @package CREATOR-STAGING — LenisProvider
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-10
 * @purpose Smooth scroll provider with Lenis — disabled on reduced-motion
 */

'use client';


export function LenisProvider({ children }: { children: React.ReactNode }) {
  // Lenis disabled — native scroll is better UX on all devices

  return <>{children}</>;
}
