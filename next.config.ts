import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * @package CREATOR-STAGING — Next.js Config
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.3.0 (FlorenceEGI — CREATOR-STAGING · M-CREATOR-001)
 * @date 2026-06-18
 * @purpose Next.js configuration with i18n, standalone output for PM2 deploy, image domains.
 *          ignoreBuildErrors/ignoreDuringBuilds rimossi (debito M-071 saldato via type JSX import React 19).
 *          v1.3.0 (policy CEO PRIVACY-BY-DESIGN ZERO-TRACKING): security headers completi —
 *          SEC-1 HSTS, SEC-2 CSP STRETTA, SEC-6 Permissions-Policy, SEC-7 COOP, X-Frame-Options,
 *          X-Content-Type-Options, Referrer-Policy (Web Quality Gate). CSP same-origin only:
 *          NESSUN origin di terze parti (zero hub.florenceegi.com / florenceegi.com) — tracker
 *          analytics + lso-ecosystem eliminati. 'unsafe-inline' su script-src resta per i soli
 *          JSON-LD inline (SEO); nonce+strict-dynamic richiederebbe refactor della pipeline di
 *          rendering Next/Tailwind → DEBITO PE-6 (hardening CSP con nonce, futura mission).
 */

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/**
 * Content-Security-Policy STRETTA — policy CEO PRIVACY-BY-DESIGN ZERO-TRACKING.
 * Derivata dall'INVENTARIO reale delle sorgenti DOPO la bonifica (M-CREATOR-001,
 * grounding in app/ components/ lib/):
 *  - script di terze parti: NESSUNO (tracker analytics + lso-ecosystem rimossi).
 *  - script inline: SOLO JSON-LD x3 (SEO, dangerouslySetInnerHTML) → 'unsafe-inline'.
 *  - connect: fetch client SOLO same-origin (/api/* proxy) → connect-src 'self'.
 *  - img: next/image serve same-origin via /_next/image; img remote dirette su https → 'self' data: https:.
 *  - font: next/font/google è self-hostato same-origin (Next 15) → 'self' data:.
 *  - style: Tailwind v4 + Next iniettano inline → 'unsafe-inline'.
 *  - worker: /sw.js same-origin → worker-src 'self'.
 * Nessun origin di terze parti in script-src/connect-src: nessuno script né connessione esce
 * dal same-origin. 'unsafe-inline' su script-src resta per i soli JSON-LD (debito PE-6: nonce/strict-dynamic).
 */
const cspDirectives: Record<string, string[]> = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
  ],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': [
    "'self'",
  ],
  'worker-src': ["'self'"],
  'manifest-src': ["'self'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': [],
};

const contentSecurityPolicy = Object.entries(cspDirectives)
  .map(([directive, values]) => (values.length > 0 ? `${directive} ${values.join(' ')}` : directive))
  .join('; ');

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'art.florenceegi.com',
      },
      {
        protocol: 'https',
        hostname: 'media.florenceegi.com',
      },
      {
        protocol: 'https',
        hostname: '*.mypinata.cloud',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        // SEC-1 — HSTS (2 anni, includeSubDomains, preload-ready). Effetto solo su HTTPS.
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        // SEC-6 — Permissions-Policy: disabilita API potenti non usate dal sito.
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        // SEC-7 — COOP: isola il browsing context (cross-origin opener).
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        // SEC-2 — CSP STRETTA same-origin (vedi cspDirectives sopra).
        { key: 'Content-Security-Policy', value: contentSecurityPolicy },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
