/**
 * @package CREATOR-STAGING — CommissionCTA
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-14
 * @purpose Call to action to commission FlorenceEGI SRL to build the production site
 */

'use client';

interface CommissionCTAProps {
  labels: {
    title: string;
    description: string;
    button: string;
  };
  locale: string;
}

export function CommissionCTA({ labels, locale }: CommissionCTAProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-[var(--border)]">
      <h3 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
        {labels.title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {labels.description}
      </p>
      <a
        href={`/${locale}/commission`}
        className="block w-full text-center px-4 py-3 bg-[var(--accent)] text-[var(--bg)] text-sm uppercase tracking-widest font-medium rounded-lg hover:opacity-90 transition-opacity"
      >
        {labels.button}
      </a>
    </div>
  );
}
