'use client';

import { useState, type KeyboardEvent } from 'react';
import type { ServicePageData } from '@/data/service-pages/types';
import { Bullets } from '@/components/services/website-design/WdBits';

/** Pill tabs, one panel visible at a time. */
export default function SpIndustries({ data }: { data: ServicePageData['industries'] }) {
  const [active, setActive] = useState(0);
  const n = data.items.length;

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActive((a) => (a + 1) % n);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActive((a) => (a - 1 + n) % n);
    }
  };

  return (
    <div>
      <div className="wd-pills" role="tablist" aria-label="Industries" onKeyDown={onKey}>
        {data.items.map((it, i) => (
          <button
            key={it.tab}
            id={`sp-ind-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`sp-ind-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {it.tab}
          </button>
        ))}
      </div>

      {data.items.map((it, i) => (
        <div
          key={it.tab}
          id={`sp-ind-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`sp-ind-tab-${i}`}
          className={`wd-ind${i === active ? ' wd-on' : ''}`}
        >
          <div>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
            {it.towns && (
              <div className="wd-towns" aria-label="Example towns">
                {it.towns.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}
          </div>
          <Bullets items={it.points} />
        </div>
      ))}
      <p className="wd-note">{data.note}</p>
    </div>
  );
}
