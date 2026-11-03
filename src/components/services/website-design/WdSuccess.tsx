'use client';

import { useState } from 'react';
import { WD_SUCCESS } from '@/data/website-design';
import { Bullets } from '@/components/services/website-design/WdBits';

/** Launch-day checklist the owner can tick, beside the three-stage path and what we don't promise. */
export default function WdSuccess() {
  const [ticked, setTicked] = useState<boolean[]>(() => WD_SUCCESS.checks.map(() => false));
  const count = ticked.filter(Boolean).length;
  const total = WD_SUCCESS.checks.length;

  return (
    <div className="wd-succ">
      <div className="wd-chk">
        <h3>{WD_SUCCESS.checklistTitle}</h3>
        <div className="wd-prog">
          <span aria-live="polite">{count} of {total} checked</span>
          <span className="wd-tr" aria-hidden="true">
            <span className="wd-fl" style={{ width: `${(count / total) * 100}%` }} />
          </span>
        </div>
        {WD_SUCCESS.checks.map((c, i) => (
          <label key={c.title} className="wd-ck">
            <input
              type="checkbox"
              checked={ticked[i]}
              onChange={() => setTicked((t) => t.map((v, k) => (k === i ? !v : v)))}
            />
            <div>
              <b>{c.title}</b>
              <span>{c.text}</span>
            </div>
          </label>
        ))}
        <div className={`wd-done${count === total ? ' wd-on' : ''}`} role="status">
          {count === total ? WD_SUCCESS.doneText : ''}
        </div>
      </div>

      <div>
        <div className="wd-path">
          {WD_SUCCESS.path.map((s) => (
            <div key={s.title} className="wd-st">
              <span className="wd-when">{s.when}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <div className="wd-nope">
          <h3>{WD_SUCCESS.nope.title}</h3>
          <Bullets items={WD_SUCCESS.nope.items} warn />
        </div>
      </div>
    </div>
  );
}
