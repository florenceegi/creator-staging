/**
 * @package CREATOR-STAGING — WorksContent
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-14
 * @purpose Client component that fetches artworks for the authenticated creator and renders the gallery
 */

'use client';

import { useSearchParams } from 'next/navigation';
import { useArtworks } from '@/lib/hooks/use-artworks';
import { WorksGallery } from './WorksGallery';

type Props = {
  locale: string;
  labels: {
    all: string;
    view_on_egi: string;
    no_results: string;
    no_image: string;
  };
  placeholderNotice: string;
};

export function WorksContent({ locale, labels, placeholderNotice }: Props) {
  const { artworks, isLoading, isPlaceholder } = useArtworks();
  const searchParams = useSearchParams();
  const collectionFilter = searchParams.get('collection');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3" style={{ color: 'var(--text-muted)' }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="animate-spin">
          <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
          <path d="M11 2a9 9 0 019 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        </svg>
        <span className="text-sm tracking-wider uppercase">Loading...</span>
      </div>
    );
  }

  const filtered = collectionFilter
    ? artworks.filter((a) => a.collection?.name === collectionFilter)
    : artworks;

  return (
    <>
      {isPlaceholder && (
        <div className="text-center mb-8 py-3 px-6 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-sm text-[var(--text-muted)]">
          {placeholderNotice}
        </div>
      )}
      <WorksGallery
        artworks={filtered}
        locale={locale}
        labels={labels}
      />
    </>
  );
}
