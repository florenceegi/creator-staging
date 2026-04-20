/**
 * @package CREATOR-STAGING — Get My Site Page
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Artist-facing route to commission FlorenceEGI WebAgency to build the personal site — distinct from /commission (artwork-commission to the artist)
 */

import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { SiteCommissionForm } from '@/components/site-commission/SiteCommissionForm';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site_commission' });
  return {
    title: `${t('title')} — FlorenceEGI WebAgency`,
    description: t('subtitle'),
    robots: { index: false, follow: false },
  };
}

export default async function GetMySitePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'site_commission' });

  const labels = {
    name: t('name'),
    email: t('email'),
    phone: t('phone'),
    tier: t('tier'),
    tier_creator: t('tier_creator'),
    tier_studio: t('tier_studio'),
    tier_maestro: t('tier_maestro'),
    subdomain_wish: t('subdomain_wish'),
    subdomain_suffix: t('subdomain_suffix'),
    timeline: t('timeline'),
    message: t('message'),
    send: t('send'),
    sending: t('sending'),
    success: t('success'),
    error: t('error'),
    rate_limit: t('rate_limit'),
    placeholder_name: t('placeholder_name'),
    placeholder_email: t('placeholder_email'),
    placeholder_phone: t('placeholder_phone'),
    placeholder_subdomain: t('placeholder_subdomain'),
    placeholder_timeline: t('placeholder_timeline'),
    placeholder_message: t('placeholder_message'),
    current_config: t('current_config'),
    gdpr_consent: t('gdpr_consent'),
    gdpr_privacy_policy: t('gdpr_privacy_policy'),
    gdpr_consent_required: t('gdpr_consent_required'),
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <section className="max-w-3xl mx-auto px-6 pt-32 pb-16">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4">{t('eyebrow')}</p>
          <h1 className="font-[var(--font-serif)] text-4xl sm:text-5xl leading-tight text-[var(--text-primary)] mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{t('subtitle')}</p>
        </header>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-xl">
          <SiteCommissionForm labels={labels} />
        </div>

        <p className="mt-8 text-xs text-[var(--text-muted)] text-center">
          {t('disclaimer')}{' '}
          <a href={`/${locale}/what-you-get`} className="text-[var(--accent)] underline hover:opacity-80">
            {t('learn_more')}
          </a>
        </p>
      </section>
    </div>
  );
}
