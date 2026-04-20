/**
 * @package CREATOR-STAGING — Rate Limiter (Upstash-backed with in-memory fallback)
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 2.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Distributed rate limiter across Next.js serverless instances. Upstash Redis sliding window when UPSTASH_REDIS_REST_URL/TOKEN are set. Fallback to in-memory single-instance limiter otherwise (dev only).
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

const upstashRedis = hasUpstash
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

const limiterCache = new Map<string, Ratelimit>();

function getUpstashLimiter(limit: number, windowMs: number): Ratelimit | null {
  if (!upstashRedis) return null;
  const cacheKey = `${limit}:${windowMs}`;
  const cached = limiterCache.get(cacheKey);
  if (cached) return cached;
  const windowSec = Math.max(1, Math.round(windowMs / 1000));
  const limiter = new Ratelimit({
    redis: upstashRedis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
    prefix: 'creator-staging:rl',
    analytics: false,
  });
  limiterCache.set(cacheKey, limiter);
  return limiter;
}

const memoryStore = new Map<string, number[]>();
const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function memoryCleanup(windowMs: number): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  const cutoff = now - windowMs;
  for (const [key, timestamps] of memoryStore) {
    const valid = timestamps.filter((t) => t > cutoff);
    if (valid.length === 0) memoryStore.delete(key);
    else memoryStore.set(key, valid);
  }
}

function memoryRateLimit(key: string, limit: number, windowMs: number): boolean {
  memoryCleanup(windowMs);
  const now = Date.now();
  const cutoff = now - windowMs;
  const timestamps = (memoryStore.get(key) || []).filter((t) => t > cutoff);
  if (timestamps.length >= limit) {
    memoryStore.set(key, timestamps);
    return false;
  }
  timestamps.push(now);
  memoryStore.set(key, timestamps);
  return true;
}

export async function rateLimit(key: string, limit: number, windowMs = 60_000): Promise<boolean> {
  const limiter = getUpstashLimiter(limit, windowMs);
  if (limiter) {
    try {
      const { success } = await limiter.limit(key);
      return success;
    } catch (err) {
      console.error('Upstash ratelimit error, falling back to memory:', err);
    }
  }
  return memoryRateLimit(key, limit, windowMs);
}
