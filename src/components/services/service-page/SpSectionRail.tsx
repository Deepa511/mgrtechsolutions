'use client';

import { useEffect, useState } from 'react';
import { getLenisInstance } from '@/lib/lenis-instance';
import { WD_RAIL } from '@/data/website-design';

/**
 * Dot rail fixed to the right edge (screens 1100px and up). The dot for the
 * section you are in is filled and ringed; a section's name shows on hover or
 * focus. Hidden until you scroll past the first screen.
 */
export default function SpSectionRail() {
  const [current, setCurrent] = useState(-1);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const els = WD_RAIL.map((s) => document.getElementById(s.id));
    const update = () => {
      const vh = window.innerHeight;
      let cur = -1;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= vh * 0.4) cur = i;
      });
      setCurrent(cur);
      setShown(cur >= 0 && window.scrollY > vh * 0.5);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const jump = (id: string) => (e: React.MouseEvent) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const lenis = getLenisInstance();
    if (lenis) lenis.scrollTo(target);
    else target.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <nav aria-label="Page sections" className={`wd-srail${shown ? ' wd-on' : ''}`}>
      {WD_RAIL.map((s, i) => (
        <a key={s.id} href={`#${s.id}`} onClick={jump(s.id)} aria-label={s.label} aria-current={i === current ? 'true' : undefined}>
          <span aria-hidden="true">{s.label}</span>
        </a>
      ))}
    </nav>
  );
}
