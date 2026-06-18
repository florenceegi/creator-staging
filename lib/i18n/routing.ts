/**
 * @package CREATOR-STAGING — i18n Routing
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.1.0 (FlorenceEGI — CREATOR-STAGING · M-CREATOR-001)
 * @date 2026-06-18
 * @purpose next-intl routing configuration with locale prefix.
 *          v1.1.0 (policy CEO PRIVACY-BY-DESIGN ZERO-TRACKING): localeCookie:false —
 *          il prefisso ('always') è già nell'URL, quindi il cookie NEXT_LOCALE è ridondante
 *          e non viene scritto. Zero cookie impostati dalla pipeline i18n.
 */

import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeCookie: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
