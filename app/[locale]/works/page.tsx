/**
 * @package CREATOR-STAGING — Works Page
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 2.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-14
 * @purpose Gallery page — thin server shell, artworks fetched client-side for authenticated creator
 */

import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { WorksContent } from '@/components/gallery/WorksContent';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('works_title'),
    description: t('works_description'),
  };
}

export default async function WorksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'works' });

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-6xl font-light text-center mb-16">
        {t('title')}
      </h1>

      <Suspense fallback={
        <div className="flex items-center justify-center py-20 gap-3" style={{ color: 'var(--text-muted)' }}>
          <span className="text-sm tracking-wider uppercase">Loading...</span>
        </div>
      }>
        <WorksContent
          locale={locale}
          labels={{
            all: t('all'),
            view_on_egi: t('view_on_egi'),
            no_results: t('no_results'),
            no_image: t('no_image'),
          }}
          placeholderNotice={t('placeholder_notice')}
        />
      </Suspense>
    </section>
  );
}
