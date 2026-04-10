/**
 * @package YURI-BIAGINI — i18n Config
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — YURI-BIAGINI)
 * @date 2026-04-10
 * @purpose i18n configuration — 6 languages, IT default, EN fallback
 */

export const locales = ['it', 'en', 'fr', 'de', 'es', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'it';
export const fallbackLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  zh: '中文',
};
