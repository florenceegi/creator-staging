/**
 * @package CREATOR-STAGING — DeliveryOverview
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Summary metrics + §1 deliverables + §2 stack table — "what you get + how it's built".
 */

'use client';

import type { DeliveryContentProps } from './types';

type OverviewProps = Pick<
  DeliveryContentProps,
  | 'leadSummary'
  | 'metricsHeading'
  | 'metrics'
  | 'metricsSource'
  | 's1Heading'
  | 's1Body'
  | 'deliverablesHeading'
  | 'deliverables'
  | 'configuratorHeading'
  | 'configuratorBody'
  | 'configuratorItems'
  | 's2Heading'
  | 's2Body'
  | 'stackHeadingLayer'
  | 'stackHeadingTech'
  | 'stackHeadingRationale'
  | 'stack'
  | 'headlessHeading'
  | 'headlessBody'
>;

export function DeliveryOverview(p: OverviewProps) {
  return (
    <>
      <section aria-labelledby="summary-heading" className="mb-24 md:mb-32">
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <h2 id="summary-heading" className="dl-section-heading sr-only">
            {p.metricsHeading}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed text-center">
            {p.leadSummary}
          </p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {p.metrics.map((m) => (
            <li
              key={m.label}
              className="dl-metric p-6 md:p-7 border border-[var(--border)] rounded-lg bg-[var(--bg-surface)]/40 text-center"
            >
              <p className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-light mb-2 leading-none text-[var(--accent)]">
                {m.value}
              </p>
              <p className="text-[var(--text-primary)] text-sm uppercase tracking-[0.2em] mb-1">
                {m.label}
              </p>
              <p className="text-[var(--text-muted)] text-xs">{m.note}</p>
            </li>
          ))}
        </ul>
        <p className="text-center text-[var(--text-muted)] text-xs mt-6 italic">{p.metricsSource}</p>
      </section>

      <section aria-labelledby="s1-heading" className="mb-24 md:mb-32">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-[var(--accent)] text-xs uppercase tracking-[0.3em] mb-4">§1</p>
          <h2
            id="s1-heading"
            className="dl-section-heading font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-light mb-6 leading-tight"
          >
            {p.s1Heading}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{p.s1Body}</p>
        </div>

        <h3 className="font-[family-name:var(--font-serif)] text-xl md:text-2xl font-light mb-8">
          {p.deliverablesHeading}
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {p.deliverables.map((d) => (
            <li
              key={d.title}
              className="dl-card p-8 md:p-10 border border-[var(--border)] rounded-lg bg-[var(--bg-surface)]/40"
            >
              <h4 className="font-[family-name:var(--font-serif)] text-xl font-light mb-3 leading-snug">
                {d.title}
              </h4>
              <p className="text-[var(--text-secondary)] leading-relaxed">{d.body}</p>
            </li>
          ))}
        </ul>

        <div className="border border-[var(--accent)]/30 rounded-lg p-8 md:p-12 bg-[var(--bg-surface)]/40">
          <h3 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-light mb-4">
            {p.configuratorHeading}
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6 max-w-3xl">
            {p.configuratorBody}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {p.configuratorItems.map((item) => (
              <li
                key={item}
                className="dl-row flex items-start gap-3 text-[var(--text-secondary)]"
              >
                <span className="text-[var(--accent)] mt-1.5 shrink-0" aria-hidden="true">◆</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="s2-heading" className="mb-24 md:mb-32">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-[var(--accent)] text-xs uppercase tracking-[0.3em] mb-4">§2</p>
          <h2
            id="s2-heading"
            className="dl-section-heading font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-light mb-6 leading-tight"
          >
            {p.s2Heading}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{p.s2Body}</p>
        </div>

        <div className="overflow-x-auto mb-16 border border-[var(--border)] rounded-lg">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-[var(--bg-surface)]/60">
              <tr>
                <th scope="col" className="text-left p-4 md:p-5 font-[family-name:var(--font-serif)] font-light text-[var(--text-primary)]">
                  {p.stackHeadingLayer}
                </th>
                <th scope="col" className="text-left p-4 md:p-5 font-[family-name:var(--font-serif)] font-light text-[var(--text-primary)]">
                  {p.stackHeadingTech}
                </th>
                <th scope="col" className="text-left p-4 md:p-5 font-[family-name:var(--font-serif)] font-light text-[var(--text-primary)]">
                  {p.stackHeadingRationale}
                </th>
              </tr>
            </thead>
            <tbody>
              {p.stack.map((row) => (
                <tr
                  key={row.layer}
                  className="dl-row border-t border-[var(--border)] hover:bg-[var(--bg-surface)]/30 transition-colors"
                >
                  <td className="p-4 md:p-5 text-[var(--text-primary)] align-top">{row.layer}</td>
                  <td className="p-4 md:p-5 text-[var(--accent)] align-top">{row.tech}</td>
                  <td className="p-4 md:p-5 text-[var(--text-secondary)] align-top leading-relaxed">{row.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border border-[var(--border)] rounded-lg p-8 md:p-12 bg-[var(--bg-surface)]/30 max-w-4xl mx-auto">
          <h3 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-light mb-4">
            {p.headlessHeading}
          </h3>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{p.headlessBody}</p>
        </div>
      </section>
    </>
  );
}
