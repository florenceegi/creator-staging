/**
 * @package YURI-BIAGINI — Middleware
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — YURI-BIAGINI)
 * @date 2026-04-10
 * @purpose next-intl middleware for locale routing and detection
 */

import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(it|en|fr|de|es|zh)/:path*'],
};
