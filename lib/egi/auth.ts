/**
 * @package CREATOR-STAGING — EGI Auth Client
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.1.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-14
 * @purpose Sanctum cookie auth — fetch authenticated creator from EGI API
 */

const EGI_BASE_URL =
  process.env.NEXT_PUBLIC_EGI_API_URL?.replace('/api', '') ||
  'https://art.florenceegi.com';

export interface AuthCreator {
  id: number;
  display_name: string;
  nick_name: string | null;
  email: string;
  avatar_url: string | null;
  language: string | null;
  collections_count: number;
  artworks_count: number;
}

/** Read a cookie value by name */
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Fetch the authenticated creator from EGI via Sanctum cookie.
 * Must be called client-side (browser has the .florenceegi.com cookie).
 * Returns null if not authenticated.
 */
export async function getAuthenticatedCreator(): Promise<AuthCreator | null> {
  try {
    const xsrfToken = getCookie('XSRF-TOKEN');
    const sessionCookie = getCookie('egi_florence_session');

    // M-143 debug: log cookie state
    console.log('[M-143 auth] cookies:', { xsrfToken: !!xsrfToken, sessionCookie: !!sessionCookie, allCookies: document.cookie.split(';').map(c => c.trim().split('=')[0]) });

    if (!xsrfToken && !sessionCookie) {
      console.log('[M-143 auth] no cookies found, returning null');
      return null;
    }

    const headers: Record<string, string> = { Accept: 'application/json' };
    if (xsrfToken) {
      headers['X-XSRF-TOKEN'] = xsrfToken;
    }

    // M-143 debug: also call debug endpoint
    try {
      const debugRes = await fetch(`${EGI_BASE_URL}/api/debug-auth`, {
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });
      if (debugRes.ok) {
        const debugData = await debugRes.json();
        console.log('[M-143 debug-auth]', debugData);
      }
    } catch (e) {
      console.log('[M-143 debug-auth error]', e);
    }

    const res = await fetch(`${EGI_BASE_URL}/api/user`, {
      credentials: 'include',
      headers,
    });

    console.log('[M-143 auth] /api/user status:', res.status);

    if (!res.ok) return null;

    const user = await res.json();
    if (!user?.id) return null;

    return {
      id: user.id,
      display_name: user.display_name || user.name || '',
      nick_name: user.nick_name || null,
      email: user.email || '',
      avatar_url: user.profile_photo_url || null,
      language: user.language || null,
      collections_count: user.collections_count ?? 0,
      artworks_count: user.artworks_count ?? 0,
    };
  } catch {
    return null;
  }
}

/**
 * Initialize Sanctum CSRF cookie (required before first authenticated request).
 */
export async function initSanctumCsrf(): Promise<void> {
  try {
    await fetch(`${EGI_BASE_URL}/sanctum/csrf-cookie`, {
      credentials: 'include',
    });
  } catch {
    // Silent fail — auth will fail gracefully
  }
}
