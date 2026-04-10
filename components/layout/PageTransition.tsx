/**
 * @package YURI-BIAGINI — PageTransition
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — YURI-BIAGINI)
 * @date 2026-04-10
 * @purpose Fade-in transition on route change with GSAP — respects reduced-motion (R4)
 */

'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  children: React.ReactNode;
};

export function PageTransition({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const el = containerRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    return () => {
      gsap.killTweensOf(el);
    };
  }, [pathname, prefersReducedMotion]);

  return <div ref={containerRef}>{children}</div>;
}
