'use client';

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { useReducedMotion } from 'framer-motion';
import { WD_INCLUDED, type Tier } from '@/data/website-design';
import { ReadLink } from '@/components/services/website-design/WdBits';

const TIER_LABEL: Record<Tier, string | null> = { 1: null, 2: 'Standard and Custom', 3: 'Custom only' };
const N = WD_INCLUDED.categories.length;
const pad = (n: number) => String(n).padStart(2, '0');

/** Where a card sits relative to the active one: stacked behind, active, or slid up and gone. */
function cardVars(d: number): CSSProperties {
  const v = (ty: number, sc: number, op: number, bl: number, z: number) =>
    ({ '--ty': `${ty}px`, '--sc': sc, '--op': op, '--bl': `${bl}px`, zIndex: z }) as CSSProperties;
  if (d === 0) return v(0, 1, 1, 0, 10);
  if (d < 0) return v(-56, 0.97, 0, 6, 6);
  return v(14 * d, 1 - 0.03 * d, d === 1 ? 0.55 : d === 2 ? 0.3 : 0, 0, 10 - d);
}

/**
 * "What's included" as a vertical card deck: a tab list beside a stack of
 * cards that swap up and down, so eight areas take one screen, not many.
 * Auto-plays until the visitor touches it; never auto-plays under reduced motion.
 */
export default function WdIncluded() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio >= 0.35), { threshold: [0, 0.35, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (i: number, user = true) => {
    setActive(((i % N) + N) % N);
    if (user) setStopped(true);
  };
  const stop = Boolean(reduce) || stopped;

  const onKey = (e: KeyboardEvent) => {
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!next) return;
    e.preventDefault();
    go(active + next);
    tabs.current[(active + next + N) % N]?.focus();
  };

  return (
    <div
      ref={root}
      className={`wd-deck${stop ? ' wd-stop' : ''}${held || !inView ? ' wd-paused' : ''}`}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="wd-dtabs" role="tablist" aria-label="What's included" aria-orientation="vertical" onKeyDown={onKey}>
        {WD_INCLUDED.categories.map((c, i) => (
          <button
            key={c.title}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`wd-dt${i}`}
            className="wd-dt"
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`wd-dp${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => go(i)}
            onAnimationEnd={() => {
              if (i === active && !stop) go(i + 1, false);
            }}
          >
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path d={c.icon} />
            </svg>
            <b>{c.title}</b>
            <small>{c.items.length}</small>
          </button>
        ))}
      </div>

      <div className="wd-dstage">
        {WD_INCLUDED.categories.map((c, i) => {
          const on = i === active;
          return (
            <article
              key={c.title}
              id={`wd-dp${i}`}
              className={`wd-dcard wd-night${on ? ' wd-on' : ''}`}
              role="tabpanel"
              aria-labelledby={`wd-dt${i}`}
              aria-hidden={!on}
              inert={!on}
              style={cardVars(i - active)}
            >
              <div className="wd-dtop">
                <svg className="wd-ico" viewBox="0 0 48 48" aria-hidden="true">
                  <path pathLength={1} d={c.icon} />
                </svg>
                <span className="wd-dnum" aria-hidden="true">{pad(i + 1)} / {pad(N)}</span>
              </div>
              <h3>{c.title}</h3>
              <p className="wd-dd">{c.desc}</p>
              <ul className="wd-bul">
                {c.items.map(([tier, text], k) => (
                  <li key={text} style={{ '--i': k } as CSSProperties}>
                    <span>
                      {text}
                      {TIER_LABEL[tier as Tier] && <span className="wd-from">{TIER_LABEL[tier as Tier]}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="wd-dfoot">{'read' in c && <ReadLink slug={c.read.slug} label={c.read.label} />}</div>
            </article>
          );
        })}
        <div className="wd-dnav">
          <button type="button" aria-label="Previous area" onClick={() => go(active - 1)}>&uarr;</button>
          <button type="button" aria-label="Next area" onClick={() => go(active + 1)}>&darr;</button>
        </div>
      </div>
    </div>
  );
}
