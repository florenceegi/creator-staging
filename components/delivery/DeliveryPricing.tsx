/**
 * @package CREATOR-STAGING — DeliveryPricing
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose §5 price bands + tiers + reduction notice, §5.1 full addon catalog, §6 methodology + closing.
 */

'use client';

import { SECTIONS, FEATURES } from '@/lib/site-catalog';
import type { DeliveryContentProps } from './types';

type PricingProps = Pick<
  DeliveryContentProps,
  | 's5Heading'
  | 's5Body'
  | 'bandsHeading'
  | 'bandsHeadingBand'
  | 'bandsHeadingKind'
  | 'bandsHeadingRange'
  | 'bands'
  | 'tiersHeading'
  | 'tiersIntro'
  | 'tiers'
  | 'tiersDisclaimer'
  | 'reductionHeading'
  | 'reductionBody'
  | 'catalogHeading'
  | 'catalogIntro'
  | 'catalogSectionsHeading'
  | 'catalogFeaturesHeading'
  | 'catalogColName'
  | 'catalogColSetup'
  | 'catalogColMonthly'
  | 'sectionLabels'
  | 'featureLabels'
  | 's6Heading'
  | 's6Bullets'
  | 's6Closing'
>;

export function DeliveryPricing(p: PricingProps) {
  return (
    <>
      <section aria-labelledby="s5-heading" className="mb-24 md:mb-32">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-[var(--accent)] text-xs uppercase tracking-[0.3em] mb-4">§5</p>
          <h2
            id="s5-heading"
            className="dl-section-heading font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-light mb-6 leading-tight"
          >
            {p.s5Heading}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{p.s5Body}</p>
        </div>

        <h3 className="font-[family-name:var(--font-serif)] text-xl md:text-2xl font-light mb-6">
          {p.bandsHeading}
        </h3>
        <div className="overflow-x-auto mb-16 border border-[var(--border)] rounded-lg">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-[var(--bg-surface)]/60">
              <tr>
                <th scope="col" className="text-left p-4 md:p-5 font-[family-name:var(--font-serif)] font-light">{p.bandsHeadingBand}</th>
                <th scope="col" className="text-left p-4 md:p-5 font-[family-name:var(--font-serif)] font-light">{p.bandsHeadingKind}</th>
                <th scope="col" className="text-left p-4 md:p-5 font-[family-name:var(--font-serif)] font-light">{p.bandsHeadingRange}</th>
              </tr>
            </thead>
            <tbody>
              {p.bands.map((b) => (
                <tr key={b.band} className="dl-row border-t border-[var(--border)] hover:bg-[var(--bg-surface)]/30">
                  <td className="p-4 md:p-5 text-[var(--text-primary)] align-top">{b.band}</td>
                  <td className="p-4 md:p-5 text-[var(--text-secondary)] align-top leading-relaxed">{b.kind}</td>
                  <td className="p-4 md:p-5 text-[var(--accent)] align-top font-mono whitespace-nowrap">{b.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-16">
          <h3 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-light mb-4">
            {p.tiersHeading}
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-10 max-w-3xl">{p.tiersIntro}</p>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {p.tiers.map((tier) => (
              <li
                key={tier.label}
                className={`dl-tier p-8 md:p-10 border rounded-lg flex flex-col ${
                  tier.highlight
                    ? 'border-[var(--accent)] bg-[var(--bg-surface)]/60 relative overflow-hidden'
                    : 'border-[var(--border)] bg-[var(--bg-surface)]/30'
                }`}
              >
                {tier.highlight && (
                  <span
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                    aria-hidden="true"
                  />
                )}
                <p className="text-[var(--accent)] text-xs uppercase tracking-[0.3em] mb-6">{tier.label}</p>
                <p className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light mb-2 leading-none">
                  {tier.setup}
                </p>
                <p className="text-[var(--text-muted)] text-sm mb-6">{tier.monthly}</p>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-1">{tier.body}</p>
              </li>
            ))}
          </ul>
          <p className="text-[var(--text-muted)] text-xs italic mt-6 text-center">{p.tiersDisclaimer}</p>
        </div>

        <div className="border border-[var(--border)] rounded-lg p-8 md:p-12 bg-[var(--bg-surface)]/30 max-w-4xl mx-auto">
          <h3 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-light mb-4">
            {p.reductionHeading}
          </h3>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{p.reductionBody}</p>
        </div>
      </section>

      <section aria-labelledby="catalog-heading" className="mb-24 md:mb-32">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-[var(--accent)] text-xs uppercase tracking-[0.3em] mb-4">§5.1</p>
          <h2
            id="catalog-heading"
            className="dl-section-heading font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-light mb-6 leading-tight"
          >
            {p.catalogHeading}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{p.catalogIntro}</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-[family-name:var(--font-serif)] text-xl mb-4 text-[var(--text-primary)]">
              {p.catalogSectionsHeading}
            </h3>
            <div className="border border-[var(--border)] rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[var(--bg-elevated)] text-[var(--text-muted)] text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-3 py-2">{p.catalogColName}</th>
                    <th className="text-right px-3 py-2">{p.catalogColSetup}</th>
                    <th className="text-right px-3 py-2">{p.catalogColMonthly}</th>
                  </tr>
                </thead>
                <tbody>
                  {SECTIONS.map((s) => (
                    <tr key={s.id} className="border-t border-[var(--border)]">
                      <td className="px-3 py-2 text-[var(--text-primary)]">
                        <div className="font-medium">{p.sectionLabels[s.id]?.label ?? s.id}</div>
                        <div className="text-[10px] text-[var(--text-muted)]">
                          {p.sectionLabels[s.id]?.description}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-right text-[var(--text-secondary)] whitespace-nowrap">
                        € {s.price_setup.toLocaleString('it-IT')}
                      </td>
                      <td className="px-3 py-2 text-right text-[var(--text-secondary)] whitespace-nowrap">
                        {s.price_monthly > 0 ? `€ ${s.price_monthly}/mo` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-serif)] text-xl mb-4 text-[var(--text-primary)]">
              {p.catalogFeaturesHeading}
            </h3>
            <div className="border border-[var(--border)] rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[var(--bg-elevated)] text-[var(--text-muted)] text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-3 py-2">{p.catalogColName}</th>
                    <th className="text-right px-3 py-2">{p.catalogColSetup}</th>
                    <th className="text-right px-3 py-2">{p.catalogColMonthly}</th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((f) => (
                    <tr key={f.id} className="border-t border-[var(--border)]">
                      <td className="px-3 py-2 text-[var(--text-primary)]">
                        <div className="font-medium">{p.featureLabels[f.id]?.label ?? f.id}</div>
                        <div className="text-[10px] text-[var(--text-muted)]">
                          {p.featureLabels[f.id]?.description}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-right text-[var(--text-secondary)] whitespace-nowrap">
                        € {f.price_setup.toLocaleString('it-IT')}
                      </td>
                      <td className="px-3 py-2 text-right text-[var(--text-secondary)] whitespace-nowrap">
                        {f.price_monthly > 0 ? `€ ${f.price_monthly}/mo` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="s6-heading" className="mb-24 md:mb-32">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-[var(--accent)] text-xs uppercase tracking-[0.3em] mb-4">§6</p>
          <h2
            id="s6-heading"
            className="dl-section-heading font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-light mb-6 leading-tight"
          >
            {p.s6Heading}
          </h2>
        </div>

        <ul className="space-y-4 md:space-y-5 max-w-4xl mx-auto mb-12">
          {p.s6Bullets.map((b) => (
            <li
              key={b}
              className="dl-row flex items-start gap-4 text-[var(--text-secondary)] text-lg leading-relaxed"
            >
              <span className="text-[var(--accent)] mt-1.5 shrink-0" aria-hidden="true">◆</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <p className="text-center text-[var(--text-primary)] text-xl md:text-2xl font-[family-name:var(--font-serif)] font-light italic max-w-3xl mx-auto leading-relaxed">
          {p.s6Closing}
        </p>
      </section>
    </>
  );
}
