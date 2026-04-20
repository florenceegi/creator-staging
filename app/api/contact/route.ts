/**
 * @package CREATOR-STAGING — Contact API
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 2.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Contact form API — Zod validation, AWS SES mailer, Upstash rate limit, server-side honeypot, x-real-ip resolver.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { rateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/get-ip';

const sesClient = new SESClient({
  region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'eu-north-1',
});

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
  gdpr_consent: z.literal(true),
  website: z.string().max(0).optional(),
});

const RATE_LIMIT = 5;
const RATE_WINDOW = 60_000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await rateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW))) {
    return NextResponse.json({ success: false, error: 'rate_limit' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (data.website && data.website.length > 0) {
      return NextResponse.json({ success: true });
    }

    const to = process.env.CONTACT_EMAIL_TO;
    if (!to) {
      console.error('Contact: CONTACT_EMAIL_TO not configured');
      return NextResponse.json({ success: false, error: 'misconfigured' }, { status: 500 });
    }
    const from = process.env.MAIL_FROM_ADDRESS || 'noreply@florenceegi.com';
    const fromName = process.env.MAIL_FROM_NAME || 'FlorenceEGI';

    try {
      await sesClient.send(
        new SendEmailCommand({
          Source: `${fromName} <${from}>`,
          Destination: { ToAddresses: [to] },
          ReplyToAddresses: [data.email],
          Message: {
            Subject: { Data: `[Contact] ${data.subject}`, Charset: 'UTF-8' },
            Body: {
              Text: {
                Data: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
                Charset: 'UTF-8',
              },
            },
          },
        }),
      );
    } catch (sesErr) {
      console.error('SES SendEmail error (contact):', sesErr);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.issues },
        { status: 422 }
      );
    }
    console.error('Contact API error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
