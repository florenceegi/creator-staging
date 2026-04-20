/**
 * @package CREATOR-STAGING — DeliveryFeatures
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose §3 features cards + §4 competitor comparison table.
 */

'use client';

import type { DeliveryContentProps } from './types';

type FeaturesProps = Pick<
  DeliveryContentProps,
  | 's3Heading'
  | 's3Body'
  | 'features'
  | 's4Heading'
  | 's4Body'
  | 'competitorHeading'
  | 'competitorHeadingPerf'
  | 'competitorHeadingA11y'
  | 'competitorHeadingSeo'
  | 'competitorHeadingSchema'
  | 'competitors'
  | 'competitorConclusion'
>;

export function DeliveryFeatures(p: FeaturesProps) {
  return (
    <>
      <section aria-labelledby="s3-heading" className="mb-24 md:mb-32">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-[var(--accent)] text-xs uppercase tracking-[0.3em] mb-4">§3</p>
          <h2
            id="s3-heading"
            className="dl-section-heading font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-light mb-6 leading-tight"
          >
            {p.s3Heading}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{p.s3Body}</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {p.features.map((f) => (
            <li
              key={f.heading}
              className="dl-card p-8 md:p-10 border border-[var(--border)] rounded-lg bg-[var(--bg-surface)]/40"
            >
              <h3 className="font-[family-name:var(--font-serif)] text-2xl font-light mb-4 leading-snug">
                {f.heading}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-3">{f.body}</p>
              {f.source && <p className="text-[var(--text-muted)] text-xs italic">{f.source}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="s4-heading" className="mb-24 md:mb-32">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-[var(--accent)] text-xs uppercase tracking-[0.3em] mb-4">§4</p>
          <h2
            id="s4-heading"
            className="dl-section-heading font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-light mb-6 leading-tight"
          >
            {p.s4Heading}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{p.s4Body}</p>
        </div>

        <h3 className="font-[family-name:var(--font-serif)] text-xl md:text-2xl font-light mb-6">
          {p.competitorHeading}
        </h3>
        <div className="overflow-x-auto mb-8 border border-[var(--border)] rounded-lg">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-[var(--bg-surface)]/60">
              <tr>
                <th scope="col" className="text-left p-4 md:p-5 font-[family-name:var(--font-serif)] font-light">—</th>
                <th scope="col" className="text-center p-4 md:p-5 font-[family-name:var(--font-serif)] font-light">{p.competitorHeadingPerf}</th>
                <th scope="col" className="text-center p-4 md:p-5 font-[family-name:var(--font-serif)] font-light">{p.competitorHeadingA11y}</th>
                <th scope="col" className="text-center p-4 md:p-5 font-[family-name:var(--font-serif)] font-light">{p.competitorHeadingSeo}</th>
                <th scope="col" className="text-center p-4 md:p-5 font-[family-name:var(--font-serif)] font-light">{p.competitorHeadingSchema}</th>
              </tr>
            </thead>
            <tbody>
              {p.competitors.map((c) => (
                <tr
                  key={c.label}
                  className={`dl-row border-t border-[var(--border)] ${
                    c.highlight ? 'bg-[var(--accent)]/10' : 'hover:bg-[var(--bg-surface)]/30'
                  }`}
                >
                  <td
                    className={`p-4 md:p-5 align-top ${
                      c.highlight ? 'text-[var(--accent)] font-medium' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {c.label}
                  </td>
                  <td className="p-4 md:p-5 text-center text-[var(--text-secondary)] font-mono">{c.perf}</td>
                  <td className="p-4 md:p-5 text-center text-[var(--text-secondary)] font-mono">{c.a11y}</td>
                  <td className="p-4 md:p-5 text-center text-[var(--text-secondary)] font-mono">{c.seo}</td>
                  <td className="p-4 md:p-5 text-center text-[var(--text-secondary)] font-mono">{c.schema}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[var(--text-secondary)] leading-relaxed max-w-4xl">{p.competitorConclusion}</p>
      </section>
    </>
  );
}
