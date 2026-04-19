/**
 * @package CREATOR-STAGING — JSON-LD Factories
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 3.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-19
 * @purpose Schema.org structured data factories — SSOT-compliant (ecosistema/SEO_STANDARD_FLORENCEEGI.md)
 */

import type { EgiArtwork } from '@/lib/egi/client';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://creator-staging.florenceegi.com';
const ARTIST_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Creator Staging';

const LOCALE_MAP: Record<string, string> = {
  it: 'it-IT',
  en: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  pt: 'pt-PT',
  zh: 'zh-CN',
};

function inLanguageOf(locale: string): string {
  return LOCALE_MAP[locale] ?? 'en-US';
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'FlorenceEGI',
    url: 'https://florenceegi.com',
    logo: `${SITE_URL}/apple-touch-icon.png`,
  };
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: ARTIST_NAME,
    url: SITE_URL,
    sameAs: ['https://art.florenceegi.com'],
    jobTitle: 'Artist',
    worksFor: { '@id': `${SITE_URL}/#organization` },
  };
}

export function websiteJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: ARTIST_NAME,
    url: SITE_URL,
    inLanguage: inLanguageOf(locale),
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/${locale}/works?q={query}`,
      'query-input': 'required name=query',
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  };
}

export function aboutPageJsonLd(locale: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${SITE_URL}/${locale}/about`,
    inLanguage: inLanguageOf(locale),
    description,
    mainEntity: { '@id': `${SITE_URL}/#person` },
  };
}

export function artworkJsonLd(artwork: EgiArtwork, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: artwork.title,
    description: artwork.description || undefined,
    image: artwork.original_image_url || artwork.main_image_url || undefined,
    url: `${SITE_URL}/${locale}/works/${artwork.id}`,
    inLanguage: inLanguageOf(locale),
    creator: {
      '@type': 'Person',
      name: artwork.creator?.display_name || ARTIST_NAME,
    },
    isPartOf: artwork.collection
      ? { '@type': 'CollectionPage', name: artwork.collection.name }
      : undefined,
    offers: {
      '@type': 'Offer',
      url: artwork.url,
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  };
}

export function collectionPageJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Works — ${ARTIST_NAME}`,
    url: `${SITE_URL}/${locale}/works`,
    inLanguage: inLanguageOf(locale),
    creator: { '@id': `${SITE_URL}/#person` },
  };
}
