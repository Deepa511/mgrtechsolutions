import type { ReactNode } from 'react';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';

type Tone = 'plain' | 'tint' | 'dark';
const TONE: Record<Tone, string> = { plain: '', tint: ' wd-alt', dark: ' wd-dark' };

/** One page section. Alternates plain / tint / dark down the page. */
export function Band({
  id,
  labelledBy,
  tone = 'plain',
  className = '',
  children,
}: {
  id?: string;
  labelledBy: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`wd-band${TONE[tone]}${className ? ` ${className}` : ''}`}>
      <div className="wd-wrap">{children}</div>
    </section>
  );
}

/** Eyebrow, heading and short explanation that open each section. */
export function SectionHead({
  id,
  eyebrow,
  heading,
  lede,
  dark = false,
}: {
  id: string;
  eyebrow?: string;
  heading: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal>
      <div className="wd-sechead">
        {eyebrow && <p className={`wd-eyebrow${dark ? ' wd-eyebrow-accent' : ''}`}>{eyebrow}</p>}
        <h2 id={id}>{heading}</h2>
        {lede && <p className="wd-lede">{lede}</p>}
      </div>
    </Reveal>
  );
}

/** Check-mark list. `x` swaps the marks for crosses, `warn` for exclamation marks. */
export function Bullets({ items, x = false, warn = false }: { items: readonly ReactNode[]; x?: boolean; warn?: boolean }) {
  return (
    <ul className={`wd-bul${x ? ' wd-x' : ''}${warn ? ' wd-warn' : ''}`}>
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

/** "Read: <post>" link to a blog article. */
export function ReadLink({ slug, label }: { slug: string; label: string }) {
  return (
    <p className="wd-rd">
      <b>Read</b>
      <Link href={`/blog/${slug}`}>{label}</Link>
    </p>
  );
}
