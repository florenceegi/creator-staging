/**
 * @package CREATOR-STAGING — PlaceholderContent
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-14
 * @purpose Generic placeholder for CMS-managed sections (exhibitions, press) when no data yet
 */

interface PlaceholderContentProps {
  title: string;
  message: string;
  icon?: string;
}

export function PlaceholderContent({ title, message, icon = '◇' }: PlaceholderContentProps) {
  return (
    <div className="py-32 px-6 text-center max-w-2xl mx-auto">
      <div className="text-4xl mb-6 text-[var(--text-muted)]">{icon}</div>
      <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-light mb-4 text-[var(--text-primary)]">
        {title}
      </h2>
      <p className="text-[var(--text-secondary)] leading-relaxed">
        {message}
      </p>
    </div>
  );
}
