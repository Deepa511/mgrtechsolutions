'use client';

import { useEffect, useRef, useState } from 'react';
import { getLenisInstance } from '@/lib/lenis-instance';
import { WD_RAIL } from '@/data/website-design';

/** Room a jump leaves at the top for the section bar (navbar is hidden after a jump). */
const HEADER = 72;
/** Scroll distance under which only the navbar shows. */
const TOP_ZONE = 80;

const SECTIONS = [{ id: 'overview', label: 'Overview' }, ...WD_RAIL] as const;

/** The five links shown on small screens, in page order. */
const SHORT = [
  { id: 'included', label: "What's included" },
  { id: 'how', label: 'How it works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Get started' },
] as const;

/**
 * Where-am-I bar for the six service pages.
 *
 * 1100px and up: a pill centred at the bottom of the screen with the current
 * section's name always showing (the most prominent thing in it) and one dot per
 * section, each at least 24px to hit. A dot's name floats above it on hover or
 * keyboard focus.
 *
 * Under 1100px: no dots. Five text links across the bottom, the current one
 * highlighted, each at least 44px tall, clear of the iPhone home indicator.
 *
 * Visible from page load. It steps out of the way only while the site footer is
 * on screen, so it never sits over the footer phone number.
 */
export default function SectionBar() {
  const [current, setCurrent] = useState(0);
  // The bar appears once you scroll past the top; the site navbar steps aside
  // while scrolling down and returns (with the bar under it) on scrolling up.
  const [scrolled, setScrolled] = useState(false);
  const lockUntil = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    const els = SECTIONS.map((s) => document.getElementById(s.id));
    let lastY = window.scrollY;
    const update = () => {
      const vh = window.innerHeight;
      let cur = 0;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= vh * 0.4) cur = i;
      });
      setCurrent(cur);

      const y = window.scrollY;
      const dy = y - lastY;
      setScrolled(y > TOP_ZONE);
      if (y <= TOP_ZONE) {
        root.dataset.nav = 'shown';
        lastY = y;
      } else if (Date.now() < lockUntil.current) {
        root.dataset.nav = 'hidden'; // a section jump: keep the navbar away so the heading lands clear
        lastY = y;
      } else if (Math.abs(dy) >= 6) {
        root.dataset.nav = dy > 0 ? 'hidden' : 'shown';
        lastY = y;
      }
    };
    root.dataset.nav = 'shown';
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      delete root.dataset.nav;
    };
  }, []);

  const jump = (id: string) => (e: React.MouseEvent) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    lockUntil.current = Date.now() + 1800;
    const lenis = getLenisInstance();
    if (lenis) lenis.scrollTo(target, { offset: -HEADER });
    else target.scrollIntoView({ behavior: 'auto' }); // CSS scroll-margin-top keeps it clear of the header
    window.history.replaceState(null, '', `#${id}`);
  };

  const currentId = SECTIONS[current].id;
  // Which of the five short links is "current": the latest one already passed.
  const order = SECTIONS.map((s) => s.id as string);
  const shortCurrent = [...SHORT].reverse().find((s) => order.indexOf(s.id) <= current)?.id;

  return (
    <nav aria-label="Page sections" className="wd-bar" data-show={scrolled ? 'true' : 'false'}>
      <p className="wd-bar-now" aria-live="polite">
        <span aria-hidden="true">{String(current + 1).padStart(2, '0')}</span>
        {SECTIONS[current].label}
      </p>
      <ul className="wd-bar-dots">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} onClick={jump(s.id)} aria-label={s.label} aria-current={s.id === currentId ? 'true' : undefined}>
              <i aria-hidden="true" />
              <span aria-hidden="true">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <ul className="wd-bar-links">
        {SHORT.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} onClick={jump(s.id)} aria-current={s.id === shortCurrent ? 'true' : undefined}>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
