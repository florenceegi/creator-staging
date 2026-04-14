@/home/fabio/NATAN_LOC/CLAUDE_ECOSYSTEM_CORE.md

# CREATOR-STAGING — Configuratore Sito Creator (Oracode OS3)

> Configuratore + template madre per siti creator FlorenceEGI.
> Il creator autenticato sceglie template, animazione, scena 3D, subdomain
> e commissiona FlorenceEGI SRL (web agency) per la costruzione del sito.
> Stack: Next.js 15 (App Router) + Three.js + GSAP + next-intl
> URL: creator-staging.florenceegi.com | Path: /home/fabio/CREATOR-STAGING
> Branch: main | Deploy: PM2 cluster su EC2 (port 3010)

---

## Ruolo nell'Organismo

```
Configuratore sito creator — preview + commissioning flow.
Il creator NON assembla un sito. Sceglie preferenze estetiche e
commissiona la Web Agency FlorenceEGI SRL, che costruirà il sito
da zero usando AI dentro LSO.

Due modalità (stessa codebase):
  SITE_MODE=configurator  → creator-staging.florenceegi.com
                             Auth obbligatoria, switcher/pannello visibile,
                             dati da API EGI dinamica, CTA "Commissiona"
  SITE_MODE=production    → {artista}.florenceegi.com (fork del template)
                             Nessun switcher, config fissa, pubblico, SSG/ISR

Quando il creator commissiona:
  1. Fork del template madre → nuovo repo {artista}-site
  2. Applica config scelta (variant + animation + scene + subdomain)
  3. Deploy su {artista}.florenceegi.com
  4. Personalizzazioni avanzate = commit sul fork
  5. Aggiornamenti base dal template madre = merge periodico (AI-assisted)

API EGI consumate (pubbliche, read-only):
  GET /api/public/artists/{id}           → profilo artista
  GET /api/public/artists/{id}/artworks  → opere paginate
  GET /api/public/artists/{id}/timeline  → biografia + capitoli timeline
  GET /api/public/collections/{id}       → collezione con opere

Auth: Sanctum cookie (.florenceegi.com) → GET /api/user per creator autenticato
```

---

## Stack

```
Framework  → Next.js 15 (App Router, SSG, ISR, Server Components)
React      → React 19
3D         → Three.js + @react-three/fiber + @react-three/drei
Animazioni → GSAP 3 (core + ScrollTrigger + Flip) + Splitting.js + Lenis
i18n       → next-intl v3 — 6 lingue: IT EN FR DE ES ZH
Styling    → Tailwind CSS v4
Analytics  → FEAnalytics ecosistema
Deploy     → PM2 cluster mode su EC2 (port 3010)
```

---

## Sistema Varianti (396 combinazioni)

```
Template (6):  01-Oscura, 02-Canvas, 03-Immersive, 04-Scrollytelling, 05-Magazine, 06-Brutalist
Animazione (6): minimal, cinematic, energetic, editorial, fluid, none
Scena 3D (11): particles, morph-sphere, wave-grid, floating-gallery, ribbon-flow,
               crystal, noise-terrain, aurora, dot-sphere, smoke, none

Switching: cookie-based via API routes (/api/variant, /api/animation, /api/scene)
Ogni template ha hero, navigazione, galleria, cursore strutturalmente diversi.
```

---

## Regole Specifiche

| # | Regola | Enforcement |
|---|--------|-------------|
| P0-0 | **No Alpine/Livewire** | Solo React + Vanilla TS |
| P0-2 | **i18n atomic** | Nessun testo hardcoded — tutto in messages/ JSON |
| P0-9 | **6 lingue** | IT EN FR DE ES ZH — SEMPRE tutte e sei |
| R1 | **Max 500 righe/file** | TypeScript/TSX inclusi |
| R2 | **Three.js lazy** | `next/dynamic` con `ssr: false` — mai SSR per Canvas |
| R3 | **GSAP cleanup** | `kill()` su unmount — zero memory leak |
| R4 | **Reduced motion** | `prefers-reduced-motion` → GSAP duration=0, Three.js fallback statico |
| R5 | **WCAG 2.1 AA+** | Skip-to-content, focus-visible, aria-labels, contrast 4.5:1 |
| R6 | **Opere da EGI** | MAI duplicare dati opere — fetch da API EGI, link a art.florenceegi.com |
| R7 | **Auth Sanctum** | Cookie .florenceegi.com, SANCTUM_STATEFUL_DOMAINS deve includere creator-staging |

---

## File Critici

```
# Configuratore
components/configurator/ConfigPanel.tsx      → Pannello scelta template/anim/3D/subdomain
components/configurator/SubdomainInput.tsx   → Input subdomain + validazione
components/configurator/CommissionCTA.tsx    → Bottone "Commissiona alla Web Agency" + disclaimer

# Template system
components/heroes/Hero*.tsx                  → 6 hero strutturalmente diversi
components/three/scenes/*.tsx                → 10 scene 3D
components/three/Scene3DSwitch.tsx           → Dynamic import scene attiva
lib/variant.ts · lib/animation.ts · lib/scene3d.ts → Cookie-based config

# Core
app/[locale]/layout.tsx          → Root layout con providers
app/[locale]/page.tsx            → Home con hero variant-aware
lib/egi/client.ts                → EGI API client
lib/egi/auth.ts                  → Sanctum auth client
messages/*.json                  → Traduzioni UI 6 lingue
```

---

## Checklist Pre-Risposta

```
1. Ho TUTTE le info necessarie?           NO → CHIEDI (P0-1)
2. Testo hardcoded?                       SI → messages/*.json (P0-2)
3. Tutte 6 lingue?                        NO → NON PROCEDERE (P0-9)
4. Three.js con ssr:false?                NO → BLOCCO (R2)
5. GSAP kill() su unmount?                NO → BLOCCO (R3)
6. prefers-reduced-motion gestito?        NO → BLOCCO (R4)
7. WCAG: aria, focus, contrast?           NO → BLOCCO (R5)
8. Opere da EGI API (non duplicate)?      NO → BLOCCO (R6)
9. File > 500 righe?                      SI → SPLIT (R1)
10. Auth mode verificato (configurator vs production)? NO → BLOCCO (R7)
```

---

*M-051 — FlorenceEGI Organismo Software — CREATOR-STAGING v2.0.0 (2026-04-14)*
