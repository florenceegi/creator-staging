/**
 * @package CREATOR-STAGING — i18n Request Config
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-10
 * @purpose next-intl request configuration for Server Components
 */

import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'it';
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
