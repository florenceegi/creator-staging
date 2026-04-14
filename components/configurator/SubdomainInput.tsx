/**
 * @package CREATOR-STAGING — SubdomainInput
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-14
 * @purpose Subdomain chooser — the creator picks their desired subdomain for production site
 */

'use client';

import { useState, useCallback } from 'react';

interface SubdomainInputProps {
  labels: {
    title: string;
    placeholder: string;
    suffix: string;
    checking: string;
    available: string;
    taken: string;
  };
}

export function SubdomainInput({ labels }: SubdomainInputProps) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  const sanitize = (raw: string) =>
    raw.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '').slice(0, 32);

  const check = useCallback(async (subdomain: string) => {
    if (subdomain.length < 3) {
      setStatus('idle');
      return;
    }
    setStatus('checking');
    // Future: POST /api/check-subdomain → EGI-HUB validation
    // For now simulate a brief delay then mark available
    await new Promise((r) => setTimeout(r, 600));
    setStatus('available');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = sanitize(e.target.value);
    setValue(clean);
    if (clean.length >= 3) {
      check(clean);
    } else {
      setStatus('idle');
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
        {labels.title}
      </h3>
      <div className="flex items-center gap-0 rounded-lg overflow-hidden border border-[var(--border)] focus-within:border-[var(--accent)] transition-colors">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={labels.placeholder}
          maxLength={32}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
          aria-label={labels.title}
        />
        <span className="px-3 py-2.5 text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] border-l border-[var(--border)] whitespace-nowrap">
          {labels.suffix}
        </span>
      </div>
      {status !== 'idle' && (
        <p className={`text-xs ${
          status === 'checking' ? 'text-[var(--text-muted)]' :
          status === 'available' ? 'text-green-500' : 'text-red-500'
        }`}>
          {status === 'checking' && labels.checking}
          {status === 'available' && labels.available}
          {status === 'taken' && labels.taken}
        </p>
      )}
    </div>
  );
}
