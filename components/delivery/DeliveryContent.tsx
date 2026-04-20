/**
 * @package CREATOR-STAGING — DeliveryContent
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 2.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Artist-facing delivery report — container. Delegates to DeliveryOverview / DeliveryFeatures / DeliveryPricing children for F-08 oversize split (WCAG AA).
 */

'use client';

import { DeliveryOverview } from './DeliveryOverview';
import { DeliveryFeatures } from './DeliveryFeatures';
import { DeliveryPricing } from './DeliveryPricing';
import type { DeliveryContentProps } from './types';

export type { DeliveryContentProps } from './types';

export function DeliveryContent(props: DeliveryContentProps) {
  return (
    <article className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <header className="text-center mb-20 md:mb-24">
        <p className="dl-eyebrow text-[var(--accent)] text-xs md:text-sm uppercase tracking-[0.35em] mb-6">
          {props.eyebrow}
        </p>
        <h1 className="dl-title font-[family-name:var(--font-serif)] text-5xl md:text-7xl font-light leading-[1.05] mb-8">
          {props.title}
        </h1>
        <p className="dl-subtitle text-[var(--text-secondary)] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          {props.subtitle}
        </p>
      </header>

      <DeliveryOverview
        leadSummary={props.leadSummary}
        metricsHeading={props.metricsHeading}
        metrics={props.metrics}
        metricsSource={props.metricsSource}
        s1Heading={props.s1Heading}
        s1Body={props.s1Body}
        deliverablesHeading={props.deliverablesHeading}
        deliverables={props.deliverables}
        configuratorHeading={props.configuratorHeading}
        configuratorBody={props.configuratorBody}
        configuratorItems={props.configuratorItems}
        s2Heading={props.s2Heading}
        s2Body={props.s2Body}
        stackHeadingLayer={props.stackHeadingLayer}
        stackHeadingTech={props.stackHeadingTech}
        stackHeadingRationale={props.stackHeadingRationale}
        stack={props.stack}
        headlessHeading={props.headlessHeading}
        headlessBody={props.headlessBody}
      />

      <DeliveryFeatures
        s3Heading={props.s3Heading}
        s3Body={props.s3Body}
        features={props.features}
        s4Heading={props.s4Heading}
        s4Body={props.s4Body}
        competitorHeading={props.competitorHeading}
        competitorHeadingPerf={props.competitorHeadingPerf}
        competitorHeadingA11y={props.competitorHeadingA11y}
        competitorHeadingSeo={props.competitorHeadingSeo}
        competitorHeadingSchema={props.competitorHeadingSchema}
        competitors={props.competitors}
        competitorConclusion={props.competitorConclusion}
      />

      <DeliveryPricing
        s5Heading={props.s5Heading}
        s5Body={props.s5Body}
        bandsHeading={props.bandsHeading}
        bandsHeadingBand={props.bandsHeadingBand}
        bandsHeadingKind={props.bandsHeadingKind}
        bandsHeadingRange={props.bandsHeadingRange}
        bands={props.bands}
        tiersHeading={props.tiersHeading}
        tiersIntro={props.tiersIntro}
        tiers={props.tiers}
        tiersDisclaimer={props.tiersDisclaimer}
        reductionHeading={props.reductionHeading}
        reductionBody={props.reductionBody}
        catalogHeading={props.catalogHeading}
        catalogIntro={props.catalogIntro}
        catalogSectionsHeading={props.catalogSectionsHeading}
        catalogFeaturesHeading={props.catalogFeaturesHeading}
        catalogColName={props.catalogColName}
        catalogColSetup={props.catalogColSetup}
        catalogColMonthly={props.catalogColMonthly}
        sectionLabels={props.sectionLabels}
        featureLabels={props.featureLabels}
        s6Heading={props.s6Heading}
        s6Bullets={props.s6Bullets}
        s6Closing={props.s6Closing}
      />

      <section
        aria-labelledby="cta-heading"
        className="border border-[var(--accent)]/40 rounded-lg p-10 md:p-16 bg-[var(--bg-surface)]/60 text-center"
      >
        <h2
          id="cta-heading"
          className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-light mb-6"
        >
          {props.ctaHeading}
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl mx-auto">
          {props.ctaBody}
        </p>
        <a
          href={props.ctaHref}
          className="inline-block px-10 py-4 bg-[var(--accent)] text-[var(--bg)] text-sm uppercase tracking-[0.2em] font-medium rounded-lg hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]"
        >
          {props.ctaButton}
        </a>
      </section>
    </article>
  );
}
