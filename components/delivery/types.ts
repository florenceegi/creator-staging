/**
 * @package CREATOR-STAGING — Delivery types
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Shared row/item types for the delivery report.
 */

import type { SectionId, FeatureId } from '@/lib/site-catalog';

export type DeliveryMetric = { label: string; value: string; note: string };
export type DeliveryDeliverable = { title: string; body: string };
export type DeliveryStackRow = { layer: string; tech: string; rationale: string };
export type DeliveryFeatureItem = { heading: string; body: string; source?: string };
export type DeliveryCompetitorRow = {
  label: string;
  perf: string;
  a11y: string;
  seo: string;
  schema: string;
  highlight?: boolean;
};
export type DeliveryTier = {
  label: string;
  setup: string;
  monthly: string;
  body: string;
  highlight?: boolean;
};
export type DeliveryPriceBand = { band: string; kind: string; range: string };

export type DeliveryCatalogLabels = {
  sectionLabels: Record<SectionId, { label: string; description: string }>;
  featureLabels: Record<FeatureId, { label: string; description: string }>;
};

export type DeliveryContentProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  leadSummary: string;
  metricsHeading: string;
  metrics: DeliveryMetric[];
  metricsSource: string;

  s1Heading: string;
  s1Body: string;
  deliverablesHeading: string;
  deliverables: DeliveryDeliverable[];
  configuratorHeading: string;
  configuratorBody: string;
  configuratorItems: string[];

  s2Heading: string;
  s2Body: string;
  stackHeadingLayer: string;
  stackHeadingTech: string;
  stackHeadingRationale: string;
  stack: DeliveryStackRow[];
  headlessHeading: string;
  headlessBody: string;

  s3Heading: string;
  s3Body: string;
  features: DeliveryFeatureItem[];

  s4Heading: string;
  s4Body: string;
  competitorHeading: string;
  competitorHeadingPerf: string;
  competitorHeadingA11y: string;
  competitorHeadingSeo: string;
  competitorHeadingSchema: string;
  competitors: DeliveryCompetitorRow[];
  competitorConclusion: string;

  s5Heading: string;
  s5Body: string;
  bandsHeading: string;
  bandsHeadingBand: string;
  bandsHeadingKind: string;
  bandsHeadingRange: string;
  bands: DeliveryPriceBand[];
  tiersHeading: string;
  tiersIntro: string;
  tiers: DeliveryTier[];
  tiersDisclaimer: string;
  reductionHeading: string;
  reductionBody: string;

  catalogHeading: string;
  catalogIntro: string;
  catalogSectionsHeading: string;
  catalogFeaturesHeading: string;
  catalogColName: string;
  catalogColSetup: string;
  catalogColMonthly: string;
  sectionLabels: DeliveryCatalogLabels['sectionLabels'];
  featureLabels: DeliveryCatalogLabels['featureLabels'];

  s6Heading: string;
  s6Bullets: string[];
  s6Closing: string;

  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
  ctaHref: string;
};
