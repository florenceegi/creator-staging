/**
 * @package CREATOR-STAGING — HeroOscura (Template 01)
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 2.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-15
 * @purpose Fullscreen featured artwork with gradient overlay — from authenticated creator
 */

'use client';

import Image from 'next/image';
import { useArtworks } from '@/lib/hooks/use-artworks';

type Props = {
  artistName: string;
  tagline: string;
};

export function HeroOscura({ artistName, tagline }: Props) {
  const { artworks } = useArtworks();
  const featuredWork = artworks.length > 0 ? artworks[0] : null;

  return (
    <section aria-label="Hero" className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      {featuredWork?.main_image_url ? (
        <Image
          src={featuredWork.main_image_url}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--bg)]" />
      )}

      {/* Gradient overlay from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

      {/* Content bottom-left */}
      <div className="absolute bottom-16 left-8 md:left-16 z-10">
        <h1
          className="text-6xl md:text-8xl lg:text-[120px] font-light tracking-[-0.02em] leading-[0.9] text-[var(--text-primary)]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {artistName}
        </h1>
        <p className="mt-4 text-sm md:text-base text-[var(--text-muted)] tracking-wide">
          {tagline}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-16 z-10">
        <div className="w-px h-20 bg-gradient-to-b from-[var(--accent)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
