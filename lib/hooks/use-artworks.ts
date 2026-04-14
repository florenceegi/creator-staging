/**
 * @package CREATOR-STAGING — useArtworks Hook
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-14
 * @purpose Client-side hook that fetches artworks for the authenticated creator, with placeholder fallback
 */

'use client';

import { useEffect, useState } from 'react';
import { useCreator } from '@/lib/creator-context';
import { getArtistArtworks, type EgiArtwork } from '@/lib/egi/client';

const PLACEHOLDER_ARTWORKS: EgiArtwork[] = Array.from({ length: 9 }, (_, i) => ({
  id: -(i + 1),
  title: `Sample Artwork ${i + 1}`,
  description: 'This is a placeholder — upload your artworks on FlorenceEGI to see them here.',
  year: 2026,
  main_image_url: `https://picsum.photos/seed/creator-${i + 1}/600/800`,
  medium_image_url: `https://picsum.photos/seed/creator-${i + 1}/900/1200`,
  large_image_url: `https://picsum.photos/seed/creator-${i + 1}/1200/1600`,
  thumbnail_image_url: `https://picsum.photos/seed/creator-${i + 1}/300/400`,
  original_image_url: `https://picsum.photos/seed/creator-${i + 1}/1800/2400`,
  blurhash: null,
  is_published: true,
  collection: i < 3
    ? { id: -1, name: 'Demo Collection A' }
    : i < 6
      ? { id: -2, name: 'Demo Collection B' }
      : { id: -3, name: 'Demo Collection C' },
  creator: null,
  url: '',
}));

export function useArtworks() {
  const { artistId, isLoading: authLoading } = useCreator();
  const [artworks, setArtworks] = useState<EgiArtwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    async function load() {
      setIsLoading(true);
      try {
        if (!artistId) {
          setArtworks(PLACEHOLDER_ARTWORKS);
          setIsPlaceholder(true);
          return;
        }
        const result = await getArtistArtworks(1, 200, undefined, artistId);
        if (result.data.length === 0) {
          setArtworks(PLACEHOLDER_ARTWORKS);
          setIsPlaceholder(true);
        } else {
          setArtworks(result.data);
          setIsPlaceholder(false);
        }
      } catch {
        setArtworks(PLACEHOLDER_ARTWORKS);
        setIsPlaceholder(true);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [artistId, authLoading]);

  return { artworks, isLoading: authLoading || isLoading, isPlaceholder };
}
