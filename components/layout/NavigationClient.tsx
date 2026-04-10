/**
 * @package YURI-BIAGINI — NavigationClient
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — YURI-BIAGINI)
 * @date 2026-04-10
 * @purpose Client-side navigation with scroll state, mobile drawer, locale switcher
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { locales, localeNames, type Locale } from '@/lib/i18n/config';
import { usePathname } from 'next/navigation';

type NavLink = { href: string; label: string };

type Props = {
  links: NavLink[];
  locale: string;
  artistName: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  changeLangLabel: string;
};

export function NavigationClient({
  links,
  locale,
  artistName,
  openMenuLabel,
  closeMenuLabel,
  changeLangLabel,
}: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const switchLocale = useCallback(
    (newLocale: string) => {
      const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
      window.location.href = `/${newLocale}${pathWithoutLocale}`;
    },
    [pathname, locale]
  );

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16 lg:h-20"
      >
        {/* Logo / Artist name */}
        <a
          href={`/${locale}`}
          className="font-[var(--font-serif)] text-xl lg:text-2xl tracking-wide text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
        >
          {artistName}
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  pathname === link.href
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          {/* Locale switcher */}
          <li className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              onBlur={() => setTimeout(() => setIsLangOpen(false), 150)}
              aria-label={changeLangLabel}
              aria-expanded={isLangOpen}
              className="text-sm uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {locale.toUpperCase()}
            </button>
            {isLangOpen && (
              <ul
                role="listbox"
                className="absolute top-full right-0 mt-2 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg py-1 min-w-[140px] shadow-xl"
              >
                {locales.map((l) => (
                  <li key={l}>
                    <button
                      role="option"
                      aria-selected={l === locale}
                      onClick={() => switchLocale(l)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        l === locale
                          ? 'text-[var(--accent)] bg-[var(--bg-surface)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                      }`}
                    >
                      {localeNames[l as Locale]}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? closeMenuLabel : openMenuLabel}
          aria-expanded={isMobileOpen}
          className="lg:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`w-6 h-0.5 bg-[var(--text-primary)] transition-transform ${
              isMobileOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[var(--text-primary)] transition-opacity ${
              isMobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[var(--text-primary)] transition-transform ${
              isMobileOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 bg-[var(--bg)]/95 backdrop-blur-lg z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-2xl uppercase tracking-widest transition-colors ${
                  pathname === link.href
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-4 mt-4">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  className={`text-sm uppercase px-3 py-1 rounded border transition-colors ${
                    l === locale
                      ? 'border-[var(--accent)] text-[var(--accent)]'
                      : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
