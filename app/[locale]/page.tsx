/**
 * @package CREATOR-STAGING — Home Page
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 3.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-14
 * @purpose Home page — variant-aware hero + featured works from authenticated creator (client-side)
 */

import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getVariant } from '@/lib/variant';
import { getScene } from '@/lib/scene3d';

import { HeroImmersive } from '@/components/heroes/HeroImmersive';
import { HeroCanvas } from '@/components/heroes/HeroCanvas';
import { HeroOscura } from '@/components/heroes/HeroOscura';
import { HeroScrollytelling } from '@/components/heroes/HeroScrollytelling';
import { HeroMagazine } from '@/components/heroes/HeroMagazine';
import { HeroBrutalist } from '@/components/heroes/HeroBrutalist';
import { HeroAnimated } from '@/components/heroes/HeroAnimated';
import { HeroWrapper } from '@/components/three/HeroWrapper';
import { HomeFeaturedWorks } from '@/components/home/HomeContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'nav' });
  const tWorks = await getTranslations({ locale, namespace: 'works' });
  const tHero = await getTranslations({ locale, namespace: 'hero' });
  const variant = await getVariant();
  const sceneId = await getScene();
  const has3D = sceneId !== 'none';

  const artistName = process.env.NEXT_PUBLIC_SITE_NAME || 'Creator Staging';

  return (
    <>
      {/* Hero — variant-aware, no server-side artwork (auth is client-only) */}
      <HeroAnimated>
      <div className="relative">
        {has3D && (
          <div className="absolute inset-0 z-0">
            <HeroWrapper />
          </div>
        )}
        <div className={has3D ? 'relative z-10' : ''}>
          {variant === '01' && (
            <HeroOscura
              artistName={artistName}
              tagline={tHero('tagline')}
            />
          )}
          {variant === '02' && (
            <HeroCanvas
              artistName={artistName}
              tagline={tHero('tagline')}
              scrollLabel={tWorks('view_on_egi')}
              locale={locale}
            />
          )}
          {variant === '03' && (
            <HeroImmersive artistName={artistName} subtitle={tHero('tagline')} />
          )}
          {variant === '04' && (
            <HeroScrollytelling artistName={artistName} />
          )}
          {variant === '05' && (
            <HeroMagazine
              artistName={artistName}
              artworks={[]}
              locale={locale}
              latestExhibitionLabel={t('exhibitions')}
            />
          )}
          {variant === '06' && (
            <HeroBrutalist
              artistName={artistName}
              locale={locale}
            />
          )}
        </div>
      </div>
      </HeroAnimated>

      {/* Featured works — client-side, uses authenticated creator ID */}
      <HomeFeaturedWorks
        variant={variant}
        locale={locale}
        worksLabel={t('works')}
        viewOnEgiLabel={tWorks('view_on_egi')}
      />
    </>
  );
}
