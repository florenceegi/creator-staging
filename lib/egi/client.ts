/**
 * @package YURI-BIAGINI — EGI API Client
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — YURI-BIAGINI)
 * @date 2026-04-10
 * @purpose Read-only client for EGI public API — artworks, artist profile, collections
 */

const EGI_API_URL =
  process.env.NEXT_PUBLIC_EGI_API_URL || 'https://art.florenceegi.com/api';

const ARTIST_ID = process.env.NEXT_PUBLIC_ARTIST_ID || '';

export interface EgiArtwork {
  id: number;
  title: string;
  description: string | null;
  year: number | null;
  main_image_url: string | null;
  thumbnail_image_url: string | null;
  original_image_url: string | null;
  is_published: boolean;
  collection: {
    id: number;
    name: string;
  } | null;
  creator: {
    id: number;
    display_name: string;
  } | null;
  url: string;
}

export interface EgiArtistProfile {
  id: number;
  display_name: string;
  avatar_url: string | null;
  language: string | null;
  collections_count: number;
  artworks_count: number;
  profile_url: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

async function egiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${EGI_API_URL}${path}`, {
    next: { revalidate: 60 },
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`EGI API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (!json.success) {
    throw new Error(json.message || 'EGI API returned success: false');
  }

  return json;
}

export async function getArtistProfile(): Promise<EgiArtistProfile> {
  const res = await egiGet<{ success: boolean; data: EgiArtistProfile }>(
    `/public/artists/${ARTIST_ID}`
  );
  return res.data;
}

export async function getArtistArtworks(
  page = 1,
  perPage = 24,
  collectionId?: number
): Promise<{ data: EgiArtwork[]; meta: PaginationMeta }> {
  let path = `/public/artists/${ARTIST_ID}/artworks?page=${page}&per_page=${perPage}`;
  if (collectionId) {
    path += `&collection_id=${collectionId}`;
  }
  const res = await egiGet<{
    success: boolean;
    data: EgiArtwork[];
    meta: PaginationMeta;
  }>(path);
  return { data: res.data, meta: res.meta };
}

export interface EgiCollection {
  id: number;
  name: string;
  description: string | null;
  type: string;
  image_banner: string | null;
  image_card: string | null;
  creator: { id: number; display_name: string } | null;
  artworks: EgiArtwork[];
  artworks_meta: PaginationMeta;
  url: string;
}

export async function getCollection(id: number): Promise<EgiCollection> {
  const res = await egiGet<{ success: boolean; data: EgiCollection }>(
    `/public/collections/${id}`
  );
  return res.data;
}
