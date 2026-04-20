/**
 * @package CREATOR-STAGING — Client IP resolver
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Extract real client IP behind CloudFront/Nginx. x-real-ip primary (Nginx set_real_ip_from), x-forwarded-for LAST hop fallback (hardest to spoof), 'unknown' if absent.
 */

import type { NextRequest } from 'next/server';

export function getClientIp(request: NextRequest): string {
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    const parts = xff.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }

  return 'unknown';
}
