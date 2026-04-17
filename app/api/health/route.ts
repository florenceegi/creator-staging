/**
 * @package CREATOR-STAGING — Health Check API
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-17
 * @purpose Readiness deep check per ALB + CI/CD (Pattern B3)
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type CheckStatus = 'ok' | 'warning' | 'error';
type Check = { status: CheckStatus; code?: number; message?: string };

export async function GET() {
  const checks: Record<string, Check> = {};
  const healthy = true;

  // --- EGI upstream API (warning only, non bloccante) ---
  const egiUrl = process.env.NEXT_PUBLIC_EGI_API_URL || 'https://art.florenceegi.com/api';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${egiUrl}/health`, {
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    checks.egi_api = res.ok
      ? { status: 'ok' }
      : { status: 'warning', code: res.status };
  } catch (e) {
    checks.egi_api = {
      status: 'warning',
      message: e instanceof Error ? e.message : 'unknown',
    };
  }

  // --- Self runtime ---
  checks.runtime = { status: 'ok' };

  const status = healthy ? 'healthy' : 'unhealthy';
  const httpCode = healthy ? 200 : 503;

  return NextResponse.json(
    {
      status,
      organ: process.env.NEXT_PUBLIC_SITE_NAME || 'CREATOR-STAGING',
      env: process.env.NODE_ENV || 'unknown',
      version: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
      checks,
      ts: new Date().toISOString(),
    },
    { status: httpCode },
  );
}
