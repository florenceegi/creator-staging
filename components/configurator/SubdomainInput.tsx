/**
 * @package CREATOR-STAGING — SubdomainInput
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 2.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-20
 * @purpose Subdomain chooser — debounced call to /api/check-subdomain (syntax + reserved blacklist), aria-live status for screen readers.
 */

'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

type Status = 'idle' | 'checking' | 'available' | 'taken' | 'reserved' | 'invalid';

interface SubdomainInputProps {
  labels: {
    title: string;
    placeholder: string;
    suffix: string;
    checking: string;
    available: string;
    taken: string;
    reserved?: string;
    invalid?: string;
  };
}

export function SubdomainInput({ labels }: SubdomainInputProps) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sanitize = (raw: string) =>
    raw.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '').slice(0, 32);

  const check = useCallback(async (subdomain: string) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setStatus('checking');
    try {
      const res = await fetch('/api/check-subdomain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subdomain }),
        signal: ctrl.signal,
      });
      const data = (await res.json()) as { status?: Status };
      const next = data.status;
      if (next === 'available' || next === 'taken' || next === 'reserved' || next === 'invalid') {
        setStatus(next);
      } else {
        setStatus('invalid');
      }
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') return;
      setStatus('invalid');
    }
  }, []);

  useEffect(() => {
    if (value.length < 3) {
      setStatus('idle');
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => check(value), 400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, check]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(sanitize(e.target.value));
  };

  const message =
    status === 'checking' ? labels.checking :
    status === 'available' ? labels.available :
    status === 'taken' ? labels.taken :
    status === 'reserved' ? (labels.reserved ?? labels.taken) :
    status === 'invalid' ? (labels.invalid ?? labels.taken) :
    '';

  const tone =
    status === 'checking' ? 'text-[var(--text-muted)]' :
    status === 'available' ? 'text-green-500' :
    'text-red-500';

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
          aria-describedby="subdomain-status"
        />
        <span className="px-3 py-2.5 text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] border-l border-[var(--border)] whitespace-nowrap">
          {labels.suffix}
        </span>
      </div>
      <p
        id="subdomain-status"
        role="status"
        aria-live="polite"
        className={`text-xs min-h-[1rem] ${tone}`}
      >
        {status !== 'idle' ? message : ''}
      </p>
    </div>
  );
}
