'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { WD_TIMELINE } from '@/data/website-design';

/** The 15-day build drawn to scale. Segments grow in from the left when it scrolls into view. */
export default function DayBar() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const t = WD_TIMELINE;

  return (
    <>
      <div
        ref={ref}
        className={`wd-daybar${seen ? ' wd-in' : ''}`}
        role="img"
        aria-label="A 15-day build drawn to scale: discovery, preview, full build, review, go live"
      >
        {t.phases.map((p, i) => (
          <div key={p.key} className={`wd-seg-d wd-c${i + 1}`} style={{ flex: p.weight }} title={p.days}>
            <b>{p.bar}</b>
            <span>{p.short}</span>
          </div>
        ))}
      </div>
      <div className="wd-ruler" aria-hidden="true">
        {t.phases.map((p) => (
          <span key={p.key} style={{ flex: p.weight }}>
            {p.mark}
          </span>
        ))}
      </div>
    </>
  );
}
