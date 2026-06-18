/**
 * @package FABIO-GIANNI — Zero-tracking / privacy-by-design integration test
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FABIO-GIANNI — M-FABIOGIANNI-001)
 * @date 2026-06-18
 * @purpose Attesta la policy CEO PRIVACY-BY-DESIGN ZERO-TRACKING sul DOM SERVER reale
 *          (build prod + `npm run start`). Verifica:
 *            (a) la response NON imposta alcun cookie  (Set-Cookie count == 0);
 *            (b) l'HTML servito NON contiene alcun marcatore di tracking di terze parti
 *                (hub.florenceegi.com, analytics-tracker, FEAnalyticsConfig, lso-ecosystem,
 *                 florenceegi.com/lso-ecosystem.js).
 *
 *          NB sul gate isProdDomain: i tracker ereditati dal template renderizzavano SOLO
 *          quando host.endsWith('florenceegi.com'). Per esercitare il VERO path di produzione
 *          (e ottenere un RED genuino prima della bonifica), il test invia l'header
 *          `Host: fabio-gianni.florenceegi.com` — così il server crede di essere sul dominio
 *          prod e, se i tracker fossero ancora presenti, li emetterebbe.
 *
 *          RED  prima della bonifica: l'HTML contiene i marcatori → FAIL.
 *          GREEN dopo  la bonifica:   nessun marcatore, nessun Set-Cookie → PASS.
 *
 *          Richiede build prod + server attivo:
 *            NODE_OPTIONS=--max-old-space-size=4096 npm run build
 *            PORT=3005 npm run start &
 *          Uso: BASE_URL=http://localhost:3005 node tests/zero-tracking.test.mjs
 */

const BASE = process.env.BASE_URL || 'http://localhost:3005';
const LOCALE = process.env.LOCALE || 'it';
const PROD_HOST = 'fabio-gianni.florenceegi.com';

function fail(msg) {
  console.error('❌ zero-tracking FAILED: ' + msg);
  process.exit(1);
}
function assert(cond, msg) {
  if (!cond) fail(msg);
}

const url = `${BASE}/${LOCALE}`;
// Host header = dominio prod → esercita il path isProdDomain (dove vivevano i tracker).
const res = await fetch(url, {
  headers: { Accept: 'text/html', Host: PROD_HOST },
}).catch((e) => fail(`fetch error (server prod attivo su ${BASE}? \`npm run start\`): ${e.message}`));

assert(res.ok, `status ${res.status} da ${url}`);

// (a) ZERO cookie ----------------------------------------------------------
// getSetCookie() (Node >=18.14) ritorna l'array completo degli header Set-Cookie.
const setCookies =
  typeof res.headers.getSetCookie === 'function'
    ? res.headers.getSetCookie()
    : (res.headers.get('set-cookie') ? [res.headers.get('set-cookie')] : []);
assert(
  setCookies.length === 0,
  `(a) attesi 0 Set-Cookie, trovati ${setCookies.length}: ${JSON.stringify(setCookies)}`,
);

// (b) ZERO marcatori di tracking nell'HTML --------------------------------
const html = await res.text();
const FORBIDDEN = [
  'hub.florenceegi.com',
  'analytics-tracker',
  'FEAnalyticsConfig',
  'lso-ecosystem',
];
const hits = FORBIDDEN.filter((needle) => html.includes(needle));
assert(
  hits.length === 0,
  `(b) HTML contiene marcatori di tracking vietati: ${JSON.stringify(hits)}`,
);

console.log('✓ zero-tracking: 0 Set-Cookie + HTML privo di tracker terze parti');
console.log(`  host inviato : ${PROD_HOST} (path isProdDomain esercitato)`);
console.log(`  Set-Cookie   : ${setCookies.length}`);
console.log(`  marcatori    : nessuno tra [${FORBIDDEN.join(', ')}]`);
process.exit(0);
