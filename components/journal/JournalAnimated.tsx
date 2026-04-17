/**
 * @package CREATOR-STAGING — JournalAnimated
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-17
 * @purpose Client wrapper for /journal — scroll-driven reveals
 */

'use client';

import { ScrollStoryEngine } from '@/components/scroll/ScrollStoryEngine';

const journalScenes = [
  {
    selector: '.journal-eyebrow',
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
    trigger: { start: 'top 85%' },
  },
  {
    selector: '.journal-title',
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
    trigger: { start: 'top 80%' },
  },
  {
    selector: '.journal-subtitle',
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
    trigger: { start: 'top 85%' },
  },
  {
    selector: '.journal-filters',
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    trigger: { start: 'top 85%' },
  },
  {
    selector: '.journal-post',
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.1 },
    trigger: { start: 'top 85%' },
  },
  {
    selector: '.journal-newsletter',
    from: { opacity: 0, scale: 0.97 },
    to: { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' },
    trigger: { start: 'top 80%' },
  },
];

type Props = {
  children: React.ReactNode;
};

export function JournalAnimated({ children }: Props) {
  return <ScrollStoryEngine scenes={journalScenes}>{children}</ScrollStoryEngine>;
}
