/**
 * @package CREATOR-STAGING — Commission API
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 2.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Commission form API — creator requests a custom artwork. AWS SES mailer, Upstash rate limit, server-side honeypot, x-real-ip resolver.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { rateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/get-ip';

const sesClient = new SESClient({
  region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'eu-north-1',
});

const commissionSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  description: z.string().min(1).max(10000),
  budget: z.string().max(200).optional(),
  timeline: z.string().max(200).optional(),
  gdpr_consent: z.literal(true),
  website: z.string().max(0).optional(),
});

const RATE_LIMIT = 3;
const RATE_WINDOW = 300_000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await rateLimit(`commission:${ip}`, RATE_LIMIT, RATE_WINDOW))) {
    return NextResponse.json({ success: false, error: 'rate_limit' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const data = commissionSchema.parse(body);

    if (data.website && data.website.length > 0) {
      return NextResponse.json({ success: true });
    }

    const to = process.env.COMMISSION_EMAIL_TO || process.env.COMMISSION_EMAIL_FALLBACK || process.env.CONTACT_EMAIL_TO;
    if (!to) {
      console.error('Commission: no recipient configured');
      return NextResponse.json({ success: false, error: 'misconfigured' }, { status: 500 });
    }
    const from = process.env.MAIL_FROM_ADDRESS || 'noreply@florenceegi.com';
    const fromName = process.env.MAIL_FROM_NAME || 'FlorenceEGI';

    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      '',
      `Description:\n${data.description}`,
    ];
    if (data.budget) lines.push('', `Budget: ${data.budget}`);
    if (data.timeline) lines.push(`Timeline: ${data.timeline}`);

    try {
      await sesClient.send(
        new SendEmailCommand({
          Source: `${fromName} <${from}>`,
          Destination: { ToAddresses: [to] },
          ReplyToAddresses: [data.email],
          Message: {
            Subject: { Data: `[Commission] ${data.name}`, Charset: 'UTF-8' },
            Body: { Text: { Data: lines.join('\n'), Charset: 'UTF-8' } },
          },
        }),
      );
    } catch (sesErr) {
      console.error('SES SendEmail error (commission):', sesErr);
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
    console.error('Commission API error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
