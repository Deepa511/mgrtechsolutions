'use client';

import { useState, type KeyboardEvent } from 'react';
import { WD_INDUSTRIES } from '@/data/website-design';
import { Bullets } from '@/components/services/website-design/WdBits';

/** Four pill tabs, one panel visible at a time. */
export default function WdIndustries() {
  const [active, setActive] = useState(0);
  const n = WD_INDUSTRIES.items.length;

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
        {WD_INDUSTRIES.items.map((it, i) => (
          <button
            key={it.tab}
            id={`wd-ind-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`wd-ind-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {it.tab}
          </button>
        ))}
      </div>

      {WD_INDUSTRIES.items.map((it, i) => (
        <div
          key={it.tab}
          id={`wd-ind-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`wd-ind-tab-${i}`}
          className={`wd-ind${i === active ? ' wd-on' : ''}`}
        >
          <div>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
            {'towns' in it && (
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
      <p className="wd-note">{WD_INDUSTRIES.note}</p>
    </div>
  );
}
