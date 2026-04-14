/**
 * @package CREATOR-STAGING — CollectionsContent
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-14
 * @purpose Client component that groups artworks by collection for the authenticated creator
 */

'use client';

import Image from 'next/image';
import { useArtworks } from '@/lib/hooks/use-artworks';
import type { EgiArtwork } from '@/lib/egi/client';

type CollectionGroup = {
  name: string;
  artworks: EgiArtwork[];
  heroImage: string | null;
};

type Props = {
  locale: string;
  labels: {
    uncategorized: string;
    works_count: string;
    explore: string;
    no_collections: string;
    placeholder_notice: string;
  };
};

export function CollectionsContent({ locale, labels }: Props) {
  const { artworks, isLoading, isPlaceholder } = useArtworks();

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

  const collectionsMap = new Map<string, CollectionGroup>();
  for (const artwork of artworks) {
    const name = artwork.collection?.name || labels.uncategorized;
    if (!collectionsMap.has(name)) {
      collectionsMap.set(name, {
        name,
        artworks: [],
        heroImage: artwork.main_image_url,
      });
    }
    collectionsMap.get(name)!.artworks.push(artwork);
  }

  const collections = Array.from(collectionsMap.values()).filter(
    (c) => c.name !== labels.uncategorized
  );

  if (collections.length === 0) {
    return (
      <p className="text-center text-[var(--text-muted)] py-20">
        {labels.no_collections}
      </p>
    );
  }

  return (
    <>
      {isPlaceholder && (
        <div className="text-center mb-8 py-3 px-6 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-sm text-[var(--text-muted)]">
          {labels.placeholder_notice}
        </div>
      )}
      <div className="space-y-16 mt-16">
        {collections.map((collection) => (
          <a
            key={collection.name}
            href={`/${locale}/works?collection=${encodeURIComponent(collection.name)}`}
            className="group block relative rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500"
          >
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              {collection.heroImage ? (
                <Image
                  src={collection.heroImage}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="100vw"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-[var(--bg-elevated)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-light text-white mb-3">
                {collection.name}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-white/70 text-sm uppercase tracking-widest">
                  {collection.artworks.length} {labels.works_count}
                </span>
                <span className="text-[var(--accent)] text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {labels.explore} →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
