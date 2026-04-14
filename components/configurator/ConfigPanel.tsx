/**
 * @package CREATOR-STAGING — ConfigPanel
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-14
 * @purpose Production configurator panel — creator chooses template, animation, 3D scene, subdomain
 */

'use client';

import { useState, useCallback } from 'react';
import { useCreator } from '@/lib/creator-context';
import { useVariant, type VariantId } from '@/lib/hooks/useVariant';
import { type AnimationId } from '@/lib/hooks/useAnimation';
import { type SceneId } from '@/lib/hooks/useScene';
import { SubdomainInput } from './SubdomainInput';
import { CommissionCTA } from './CommissionCTA';

/* ── Catalogue ──────────────────────────────────────────────── */

const TEMPLATES: { id: VariantId; name: string; desc: string; color: string }[] = [
  { id: '01', name: 'Galeria Oscura',       desc: 'Dark, cinematic, gallery-first',     color: '#C8A96E' },
  { id: '02', name: 'Canvas Vivo',          desc: 'Warm, organic, paint-like',          color: '#C4622D' },
  { id: '03', name: 'Immersive 3D',         desc: 'Spatial depth, floating elements',   color: '#c8a97e' },
  { id: '04', name: 'Scrollytelling',       desc: 'Narrative vertical, editorial',      color: '#D4A853' },
  { id: '05', name: 'Magazine Art',         desc: 'Grid-heavy, bold typography',        color: '#E63946' },
  { id: '06', name: 'Brutalist Statement',  desc: 'Raw, high contrast, statement',      color: '#FF0000' },
];

const ANIMATIONS: { id: AnimationId; name: string; icon: string }[] = [
  { id: 'minimal',   name: 'Minimal',    icon: '○' },
  { id: 'cinematic', name: 'Cinematic',  icon: '◐' },
  { id: 'energetic', name: 'Energetic',  icon: '⚡' },
  { id: 'editorial', name: 'Editorial',  icon: '▤' },
  { id: 'fluid',     name: 'Fluid',      icon: '◎' },
  { id: 'none',      name: 'None',       icon: '—' },
];

const SCENES: { id: SceneId; name: string }[] = [
  { id: 'particles',         name: 'Particle Field' },
  { id: 'morph-sphere',      name: 'Morphing Sphere' },
  { id: 'wave-grid',         name: 'Wave Grid' },
  { id: 'floating-gallery',  name: 'Floating Gallery' },
  { id: 'ribbon-flow',       name: 'Ribbon Flow' },
  { id: 'crystal',           name: 'Crystal' },
  { id: 'noise-terrain',     name: 'Noise Terrain' },
  { id: 'aurora',            name: 'Aurora' },
  { id: 'dot-sphere',        name: 'Dot Sphere' },
  { id: 'smoke',             name: 'Smoke' },
  { id: 'none',              name: 'No 3D' },
];

type Tab = 'template' | 'animation' | '3d' | 'site';

interface ConfigPanelProps {
  locale: string;
  labels: {
    toggle: string;
    tab_template: string;
    tab_animation: string;
    tab_3d: string;
    tab_site: string;
    subdomain_title: string;
    subdomain_placeholder: string;
    subdomain_suffix: string;
    subdomain_checking: string;
    subdomain_available: string;
    subdomain_taken: string;
    commission_title: string;
    commission_description: string;
    commission_button: string;
    current_combo: string;
  };
}

export function ConfigPanel({ locale, labels }: ConfigPanelProps) {
  const { siteMode, isAuthenticated, isLoading } = useCreator();
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('template');
  const currentVariant = useVariant();

  const getAttr = (name: string, fallback: string) => {
    if (typeof document === 'undefined') return fallback;
    return document.documentElement.getAttribute(name) || fallback;
  };

  const currentAnimation = getAttr('data-animation', 'cinematic');
  const currentScene = getAttr('data-scene', 'particles');
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';

  const switchTo = useCallback((type: string, value: string) => {
    window.location.href = `/api/${type}?${type.charAt(0)}=${value}&redirect=${encodeURIComponent(path)}`;
  }, [path]);

  // Only render in configurator mode for authenticated users
  if (siteMode !== 'configurator') return null;
  if (isLoading || !isAuthenticated) return null;

  const activeTemplate = TEMPLATES.find((t) => t.id === currentVariant);

  return (
    <div className="fixed top-4 right-4 z-[9999]" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.75)',
          borderColor: activeTemplate?.color || 'rgba(255,255,255,0.15)',
        }}
        aria-label={labels.toggle}
        aria-expanded={isOpen}
      >
        <span
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: activeTemplate?.color }}
        />
        <span className="text-xs text-white/80 font-medium tracking-wide uppercase">
          {isOpen ? '✕' : labels.toggle}
        </span>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="absolute top-14 right-0 w-[320px] max-h-[85vh] flex flex-col rounded-xl shadow-2xl border border-[var(--border)] overflow-hidden bg-[var(--bg-surface)] backdrop-blur-md">
          {/* Tabs */}
          <div className="flex border-b border-[var(--border)] flex-shrink-0">
            {([
              { key: 'template' as Tab, label: labels.tab_template },
              { key: 'animation' as Tab, label: labels.tab_animation },
              { key: '3d' as Tab, label: labels.tab_3d },
              { key: 'site' as Tab, label: labels.tab_site },
            ]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 px-1 py-2.5 text-[10px] uppercase tracking-wider font-bold transition-colors ${
                  tab === key
                    ? 'text-[var(--text-primary)] border-b-2 border-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-1">
            {/* Templates */}
            {tab === 'template' && (
              <div className="space-y-0.5">
                {TEMPLATES.map(({ id, name, desc, color }) => (
                  <button
                    key={id}
                    onClick={() => switchTo('variant', id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors ${
                      id === currentVariant
                        ? 'bg-[var(--bg-elevated)]'
                        : 'hover:bg-[var(--bg-elevated)]/50'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0 border border-[var(--border)]"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[var(--text-primary)] font-medium">
                        <span className="text-[var(--text-muted)] mr-1">{id}</span> {name}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] truncate">{desc}</div>
                    </div>
                    {id === currentVariant && (
                      <span className="text-[var(--accent)] text-xs">●</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Animations */}
            {tab === 'animation' && (
              <div className="space-y-0.5">
                {ANIMATIONS.map(({ id, name, icon }) => (
                  <button
                    key={id}
                    onClick={() => switchTo('animation', id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors ${
                      id === currentAnimation
                        ? 'bg-[var(--bg-elevated)]'
                        : 'hover:bg-[var(--bg-elevated)]/50'
                    }`}
                  >
                    <span className="w-6 text-center text-base text-[var(--text-muted)]">{icon}</span>
                    <span className="text-sm text-[var(--text-primary)]">{name}</span>
                    {id === currentAnimation && (
                      <span className="ml-auto text-[var(--accent)] text-xs">●</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* 3D Scenes */}
            {tab === '3d' && (
              <div className="space-y-0.5">
                {SCENES.map(({ id, name }) => (
                  <button
                    key={id}
                    onClick={() => switchTo('scene', id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors ${
                      id === currentScene
                        ? 'bg-[var(--bg-elevated)]'
                        : 'hover:bg-[var(--bg-elevated)]/50'
                    }`}
                  >
                    <span className="w-6 text-center text-xs text-[var(--text-muted)] font-mono">
                      {id === 'none' ? '—' : '◆'}
                    </span>
                    <span className="text-sm text-[var(--text-primary)]">{name}</span>
                    {id === currentScene && (
                      <span className="ml-auto text-[var(--accent)] text-xs">●</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Site config: subdomain + commission */}
            {tab === 'site' && (
              <div className="p-3 space-y-6">
                <SubdomainInput
                  labels={{
                    title: labels.subdomain_title,
                    placeholder: labels.subdomain_placeholder,
                    suffix: labels.subdomain_suffix,
                    checking: labels.subdomain_checking,
                    available: labels.subdomain_available,
                    taken: labels.subdomain_taken,
                  }}
                />
                <CommissionCTA
                  locale={locale}
                  labels={{
                    title: labels.commission_title,
                    description: labels.commission_description,
                    button: labels.commission_button,
                  }}
                />
              </div>
            )}
          </div>

          {/* Footer — current combo */}
          <div className="px-3 py-2 bg-[var(--bg-elevated)] border-t border-[var(--border)] text-[9px] text-[var(--text-muted)] text-center flex-shrink-0">
            {activeTemplate?.name || currentVariant} × {currentAnimation} × {currentScene}
          </div>
        </div>
      )}
    </div>
  );
}
