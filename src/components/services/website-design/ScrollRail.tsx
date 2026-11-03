'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Vertical rail for the "how it works" steps. A green line fills down as the
 * list scrolls through the viewport (CSS var --p); the numbered balls sit on
 * top of it (z-index), so the line passes behind the numbers.
 */
export default function ScrollRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - r.top) / r.height;
      el.style.setProperty('--p', String(Math.max(0, Math.min(1, reduce ? 1 : p))));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={ref} className="wd-rail">
      {children}
    </div>
  );
}
