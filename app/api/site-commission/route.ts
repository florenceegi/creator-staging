/**
 * @package CREATOR-STAGING — Site Commission API
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Artist commissions personal site to FlorenceEGI WebAgency via Resend email — distinct from /api/commission (which is artwork-commission for clients of the artist)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

const tierSchema = z.enum(['creator', 'studio', 'maestro']);

const siteCommissionSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional(),
  tier: tierSchema,
  template: z.string().max(50).optional(),
  animation: z.string().max(50).optional(),
  scene: z.string().max(50).optional(),
  subdomain_wish: z.string().max(60).optional(),
  timeline: z.string().max(200).optional(),
  message: z.string().max(10000).optional(),
  gdpr_consent: z.literal(true),
});

const RATE_LIMIT = 3;
const RATE_WINDOW = 300_000;

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!rateLimit(`site-commission:${ip}`, RATE_LIMIT, RATE_WINDOW)) {
    return NextResponse.json({ success: false, error: 'rate_limit' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const data = siteCommissionSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.WEBAGENCY_EMAIL_TO || process.env.COMMISSION_EMAIL_TO || 'webagency@florenceegi.com';

    if (!apiKey) {
      console.warn('RESEND_API_KEY not configured — site-commission email not sent');
      return NextResponse.json({ success: true });
    }

    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
    ];
    if (data.phone) lines.push(`Phone: ${data.phone}`);
    lines.push('', `Tier: ${data.tier.toUpperCase()}`);
    if (data.template) lines.push(`Template: ${data.template}`);
    if (data.animation) lines.push(`Animation: ${data.animation}`);
    if (data.scene) lines.push(`Scene: ${data.scene}`);
    if (data.subdomain_wish) lines.push(`Subdomain wish: ${data.subdomain_wish}`);
    if (data.timeline) lines.push(`Timeline: ${data.timeline}`);
    if (data.message) lines.push('', `Message:\n${data.message}`);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FlorenceEGI WebAgency <noreply@florenceegi.com>',
        to: [to],
        reply_to: data.email,
        subject: `[Site ${data.tier.toUpperCase()}] ${data.name}`,
        text: lines.join('\n'),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend API error:', err);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.issues },
        { status: 422 },
      );
    }
    console.error('Site commission API error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
