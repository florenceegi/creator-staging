/**
 * @package YURI-BIAGINI — Home Page
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — YURI-BIAGINI)
 * @date 2026-04-10
 * @purpose Home page with Three.js hero, featured works section, CTA
 */

import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-[var(--bg)] flex items-center justify-center">
      <div className="text-[var(--text-muted)] text-sm animate-pulse">
        Loading...
      </div>
    </div>
  ),
});

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      {/* Hero section — fullscreen Three.js */}
      <section
        aria-label="Hero"
        className="relative h-screen w-full overflow-hidden"
      >
        <HeroScene />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl lg:text-9xl font-light tracking-wide text-[var(--text-primary)] text-center">
            Yuri Biagini
          </h1>
          <p className="mt-4 text-sm md:text-base uppercase tracking-[0.3em] text-[var(--text-secondary)]">
            Artist
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[var(--text-muted)] to-transparent animate-pulse" />
        </div>
      </section>

      {/* Featured works preview */}
      <section
        aria-labelledby="featured-heading"
        className="py-24 px-6 max-w-7xl mx-auto"
      >
        <h2
          id="featured-heading"
          className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-light text-center mb-16"
        >
          {t('works')}
        </h2>

        {/* Placeholder for featured artworks — will be populated from EGI API */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[3/4] bg-[var(--bg-surface)] rounded-lg border border-[var(--border)] flex items-center justify-center"
            >
              <span className="text-[var(--text-muted)] text-sm">
                {t('works')} {i}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={`/${locale}/works`}
            className="inline-block px-8 py-3 border border-[var(--accent)] text-[var(--accent)] text-sm uppercase tracking-widest hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300 rounded"
          >
            {t('works')}
          </a>
        </div>
      </section>
    </>
  );
}
