/**
 * @package CREATOR-STAGING — JournalContent
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-17
 * @purpose Journal feed with tag filter — editorial post cards (WCAG AA)
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

type Tag = { key: string; label: string };

type Post = {
  key: string;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
};

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  allLabel: string;
  tagsLabel: string;
  tags: Tag[];
  posts: Post[];
  readMoreLabel: string;
  emptyStateTitle: string;
  emptyStateBody: string;
  newsletterHeading: string;
  newsletterBody: string;
  newsletterCta: string;
};

export function JournalContent({
  eyebrow,
  title,
  subtitle,
  allLabel,
  tagsLabel,
  tags,
  posts,
  readMoreLabel,
  emptyStateTitle,
  emptyStateBody,
  newsletterHeading,
  newsletterBody,
  newsletterCta,
}: Props) {
  const locale = useLocale();
  const [activeTag, setActiveTag] = useState<string>('all');

  const filteredPosts = useMemo(() => {
    if (activeTag === 'all') return posts;
    const tagLabel = tags.find((t) => t.key === activeTag)?.label;
    return posts.filter((p) => p.tag === tagLabel);
  }, [activeTag, posts, tags]);

  return (
    <article className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <header className="text-center mb-20 md:mb-24">
        <p className="journal-eyebrow text-[var(--accent)] text-xs md:text-sm uppercase tracking-[0.35em] mb-6">
          {eyebrow}
        </p>
        <h1 className="journal-title font-[family-name:var(--font-serif)] text-5xl md:text-7xl font-light leading-[1.05] mb-8">
          {title}
        </h1>
        <p className="journal-subtitle text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </header>

      <nav
        aria-label={tagsLabel}
        className="journal-filters flex flex-wrap justify-center gap-2 md:gap-3 mb-16 md:mb-20"
      >
        <button
          type="button"
          onClick={() => setActiveTag('all')}
          aria-pressed={activeTag === 'all'}
          className={`px-5 py-2 text-xs uppercase tracking-[0.2em] border rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
            activeTag === 'all'
              ? 'bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]'
              : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
          }`}
        >
          {allLabel}
        </button>
        {tags.map((tag) => (
          <button
            key={tag.key}
            type="button"
            onClick={() => setActiveTag(tag.key)}
            aria-pressed={activeTag === tag.key}
            className={`px-5 py-2 text-xs uppercase tracking-[0.2em] border rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
              activeTag === tag.key
                ? 'bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]'
                : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </nav>

      <section aria-labelledby="posts-heading">
        <h2 id="posts-heading" className="sr-only">
          {title}
        </h2>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-24 max-w-xl mx-auto">
            <h3 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-light mb-4">
              {emptyStateTitle}
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">{emptyStateBody}</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {filteredPosts.map((post) => (
              <li
                key={post.key}
                className="journal-post group p-8 md:p-10 border border-[var(--border)] rounded-lg bg-[var(--bg-surface)]/40 hover:border-[var(--accent)]/60 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 mb-4 text-xs uppercase tracking-[0.2em]">
                  <span className="text-[var(--text-muted)]">{post.date}</span>
                  <span className="text-[var(--text-muted)]" aria-hidden="true">·</span>
                  <span className="text-[var(--accent)]">{post.tag}</span>
                </div>
                <h3 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-light leading-tight mb-4 group-hover:text-[var(--accent)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)] text-xs uppercase tracking-[0.2em]">
                    {post.readTime}
                  </span>
                  <Link
                    href={`/${locale}/journal/${post.key}`}
                    className="inline-block text-sm uppercase tracking-[0.2em] text-[var(--accent)] border-b border-transparent hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] rounded-sm"
                    aria-label={`${readMoreLabel} — ${post.title}`}
                  >
                    {readMoreLabel} →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside
        aria-labelledby="newsletter-heading"
        className="journal-newsletter mt-32 md:mt-40 border border-[var(--accent)]/30 rounded-lg p-10 md:p-16 text-center max-w-3xl mx-auto bg-[var(--bg-surface)]/40"
      >
        <h2
          id="newsletter-heading"
          className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-light mb-4"
        >
          {newsletterHeading}
        </h2>
        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">{newsletterBody}</p>
        <Link
          href={`/${locale}/contact`}
          className="inline-block px-10 py-4 border border-[var(--accent)] text-[var(--accent)] text-sm uppercase tracking-[0.25em] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        >
          {newsletterCta}
        </Link>
      </aside>
    </article>
  );
}
