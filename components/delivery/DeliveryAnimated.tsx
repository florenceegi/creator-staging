/**
 * @package CREATOR-STAGING — DeliveryAnimated
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-19
 * @purpose Client wrapper for /what-you-get — scroll-driven reveals for artist delivery narrative
 */

'use client';

import { ScrollStoryEngine } from '@/components/scroll/ScrollStoryEngine';

const deliveryScenes = [
  {
    selector: '.dl-eyebrow',
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
    trigger: { start: 'top 85%' },
  },
  {
    selector: '.dl-title',
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
    trigger: { start: 'top 80%' },
  },
  {
    selector: '.dl-subtitle',
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
    trigger: { start: 'top 85%' },
  },
  {
    selector: '.dl-metric',
    from: { opacity: 0, y: 16 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08 },
    trigger: { start: 'top 85%' },
  },
  {
    selector: '.dl-section-heading',
    from: { opacity: 0, y: 24 },
    to: { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
    trigger: { start: 'top 85%' },
  },
  {
    selector: '.dl-card',
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.1 },
    trigger: { start: 'top 85%' },
  },
  {
    selector: '.dl-row',
    from: { opacity: 0, x: -16 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', stagger: 0.06 },
    trigger: { start: 'top 90%' },
  },
  {
    selector: '.dl-tier',
    from: { opacity: 0, scale: 0.96 },
    to: { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out', stagger: 0.12 },
    trigger: { start: 'top 85%' },
  },
];

type Props = {
  children: React.ReactNode;
};

export function DeliveryAnimated({ children }: Props) {
  return <ScrollStoryEngine scenes={deliveryScenes}>{children}</ScrollStoryEngine>;
}
