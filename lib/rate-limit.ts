/**
 * @package CREATOR-STAGING — Rate Limiter
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-14
 * @purpose In-memory sliding window rate limiter for API routes — no external deps
 */

const store = new Map<string, number[]>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  const cutoff = now - windowMs;
  for (const [key, timestamps] of store) {
    const valid = timestamps.filter((t) => t > cutoff);
    if (valid.length === 0) store.delete(key);
    else store.set(key, valid);
  }
}

/**
 * Check if a request should be rate-limited.
 * @param key   Unique identifier (e.g. IP address)
 * @param limit Max requests allowed in the window
 * @param windowMs Window duration in milliseconds (default: 60s)
 * @returns true if the request is allowed, false if rate-limited
 */
export function rateLimit(key: string, limit: number, windowMs = 60_000): boolean {
  cleanup(windowMs);

  const now = Date.now();
  const cutoff = now - windowMs;
  const timestamps = (store.get(key) || []).filter((t) => t > cutoff);

  if (timestamps.length >= limit) {
    store.set(key, timestamps);
    return false;
  }

  timestamps.push(now);
  store.set(key, timestamps);
  return true;
}
