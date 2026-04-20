/**
 * @package CREATOR-STAGING — Root Layout
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 3.4.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Root layout minimale — passthrough. Html/body/providers vivono in [locale]/layout.tsx per supportare lang={locale} dinamico (WCAG 3.1.1 + SEO hreflang).
 */

import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://creator-staging.florenceegi.com'
  ),
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Creator Staging',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
