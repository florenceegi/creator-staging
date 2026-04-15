/**
 * @package CREATOR-STAGING — HeroCanvas (Template 02)
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 2.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-15
 * @purpose Split layout hero — left text, right featured artwork from authenticated creator
 */

'use client';

import Image from 'next/image';
import { useArtworks } from '@/lib/hooks/use-artworks';

type Props = {
  artistName: string;
  tagline: string;
  scrollLabel: string;
  locale: string;
};

export function HeroCanvas({ artistName, tagline, scrollLabel, locale }: Props) {
  const { artworks, isLoading } = useArtworks();
  const featuredWork = !isLoading && artworks.length > 0 ? artworks[0] : null;

  return (
    <section aria-label="Hero" className="min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
        {/* Left — text 60% */}
        <div className="lg:col-span-3 space-y-6">
          <h1
            className="text-6xl md:text-7xl lg:text-[96px] font-bold tracking-[-0.04em] leading-[0.95] text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-display, var(--font-sans))' }}
          >
            {artistName}
          </h1>
          <p
            className="text-xl md:text-2xl italic text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {tagline}
          </p>
          <div className="flex items-center gap-3 pt-8 text-[var(--accent)]">
            <span className="text-sm tracking-widest uppercase">{scrollLabel}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>

        {/* Right — featured artwork 40% */}
        <div className="lg:col-span-2">
          {featuredWork?.main_image_url ? (
            <a href={`/${locale}/works/${featuredWork.id}`} className="group block">
              <div className="relative border border-[var(--border)] shadow-sm hover:shadow-lg transition-shadow duration-500 bg-[var(--bg-surface)] p-2">
                <Image
                  src={featuredWork.main_image_url}
                  alt={featuredWork.title || 'Featured artwork'}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  unoptimized
                />
              </div>
              {featuredWork.title && (
                <p className="mt-4 text-sm text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors"
                   style={{ fontFamily: 'var(--font-serif)' }}>
                  {featuredWork.title}
                </p>
              )}
            </a>
          ) : (
            !isLoading && (
              <div className="aspect-[3/4] bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--text-muted)] text-sm">No artworks yet</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
