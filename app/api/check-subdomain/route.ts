/**
 * @package CREATOR-STAGING — Subdomain availability API
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Validate creator subdomain wish — syntax + reserved blacklist. Definitive assignment happens at build handoff (FlorenceEGI SRL operator), this endpoint provides a first-pass check.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/get-ip';

const RESERVED = new Set([
  'admin', 'api', 'www', 'mail', 'ftp', 'ssh', 'root', 'support',
  'hub', 'art', 'sigillo', 'info', 'credential', 'natan', 'natan-loc',
  'egi', 'egi-hub', 'egi-info', 'egi-credential', 'egi-sigillo', 'egi-stat', 'egi-doc',
  'creator', 'creator-staging', 'la-bottega', 'bottega',
  'florenceegi', 'florence-egi', 'florence',
  'app', 'web', 'blog', 'shop', 'store', 'dashboard', 'portal', 'console',
  'stage', 'staging', 'dev', 'test', 'preview', 'demo',
  'signup', 'signin', 'login', 'logout', 'register', 'auth', 'oauth',
  'help', 'docs', 'status', 'security', 'legal', 'privacy', 'terms',
  'about', 'contact', 'press', 'careers', 'jobs',
  'mx', 'smtp', 'imap', 'pop', 'webmail', 'cpanel', 'whm',
]);

const schema = z.object({
  subdomain: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'invalid_syntax'),
});

type CheckStatus = 'available' | 'taken' | 'reserved' | 'invalid';

const RATE_LIMIT = 30;
const RATE_WINDOW = 60_000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await rateLimit(`check-subdomain:${ip}`, RATE_LIMIT, RATE_WINDOW))) {
    return NextResponse.json({ status: 'invalid', error: 'rate_limit' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<{ status: CheckStatus }>({ status: 'invalid' }, { status: 200 });
    }
    const sub = parsed.data.subdomain;

    if (RESERVED.has(sub)) {
      return NextResponse.json<{ status: CheckStatus }>({ status: 'reserved' });
    }

    return NextResponse.json<{ status: CheckStatus }>({ status: 'available' });
  } catch {
    return NextResponse.json<{ status: CheckStatus }>({ status: 'invalid' }, { status: 400 });
  }
}
