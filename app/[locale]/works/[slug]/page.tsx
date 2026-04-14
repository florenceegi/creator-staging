/**
 * @package CREATOR-STAGING — Work Detail Page
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-10
 * @purpose Single artwork page with HD image, details, and link to EGI for purchase
 */

import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getArtistArtworks } from '@/lib/egi/client';
import { artworkJsonLd } from '@/lib/seo/jsonld';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artworkId = parseInt(slug, 10);
  if (isNaN(artworkId)) return { title: 'Not Found' };

  let artwork;
  try {
    const result = await getArtistArtworks(1, 100);
    artwork = result.data.find((a) => a.id === artworkId);
  } catch {
    return { title: 'Not Found' };
  }

  if (!artwork) return { title: 'Not Found' };

  return {
    title: artwork.title,
    description: artwork.description || undefined,
    openGraph: {
      title: artwork.title,
      description: artwork.description || undefined,
      images: artwork.original_image_url
        ? [{ url: artwork.original_image_url }]
        : undefined,
      type: 'article',
    },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const artworkId = parseInt(slug, 10);
  if (isNaN(artworkId)) notFound();

  const t = await getTranslations({ locale, namespace: 'works' });

  let artwork;
  try {
    const result = await getArtistArtworks(1, 100);
    artwork = result.data.find((a) => a.id === artworkId);
  } catch {
    notFound();
  }

  if (!artwork) notFound();

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(artworkJsonLd(artwork, locale)) }}
    />
    <article className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image */}
        <figure className="relative">
          {artwork.original_image_url || artwork.main_image_url ? (
            <Image
              src={artwork.original_image_url || artwork.main_image_url!}
              alt={artwork.title || 'Artwork'}
              width={1200}
              height={1600}
              className="w-full h-auto rounded-lg"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="aspect-[3/4] bg-[var(--bg-surface)] rounded-lg flex items-center justify-center">
              <span className="text-[var(--text-muted)]">No Image</span>
            </div>
          )}
        </figure>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-light mb-4">
            {artwork.title}
          </h1>

          {artwork.collection?.name && (
            <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-6">
              {artwork.collection.name}
            </p>
          )}

          {artwork.year && (
            <p className="text-[var(--text-secondary)] mb-2">{artwork.year}</p>
          )}

          {artwork.description && (
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-prose">
              {artwork.description}
            </p>
          )}

          {/* CTA: view on EGI */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <a
              href={artwork.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-[var(--accent)] text-[var(--bg)] text-sm uppercase tracking-widest hover:bg-[var(--accent-hover)] transition-colors rounded"
            >
              {t('view_on_egi')}
            </a>
            <a
              href={`/${locale}/works`}
              className="inline-flex items-center justify-center px-8 py-3 border border-[var(--border)] text-[var(--text-secondary)] text-sm uppercase tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors rounded"
            >
              &larr; {t('title')}
            </a>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
