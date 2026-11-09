'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import type { Phase } from '@/data/service-pages/types';

/** The build drawn to scale. Segments grow in from the left when it scrolls into view. */
export default function SpDayBar({ phases, label }: { phases: readonly Phase[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  return (
    <>
      <div ref={ref} className={`wd-daybar${seen ? ' wd-in' : ''}`} role="img" aria-label={label}>
        {phases.map((p, i) => (
          <div key={p.key} className={`wd-seg-d wd-c${i + 1}`} style={{ flex: p.weight }} title={p.days}>
            <b>{p.bar}</b>
            <span>{p.short}</span>
          </div>
        ))}
      </div>
      <div className="wd-ruler" aria-hidden="true">
        {phases.map((p) => (
          <span key={p.key} style={{ flex: p.weight }}>
            {p.mark}
          </span>
        ))}
      </div>
    </>
  );
}
