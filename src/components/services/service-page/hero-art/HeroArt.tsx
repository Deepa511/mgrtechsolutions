'use client';

import { useEffect, useRef } from 'react';
import { PAINTERS, STILL_T, type Variant } from './painters';

/** Reads the brand green off :root as "r,g,b" so colours stay in @theme (hard rule 4). */
function accentRgb(): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(raw);
  return m ? `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}` : '60,224,140';
}

/**
 * One service page's hero drawing, painted on a canvas that fills the hero.
 * Runs at about 30 frames a second, pauses when scrolled off screen or when the
 * tab is hidden, and under prefers-reduced-motion paints a single still frame
 * and never animates. Decorative only (the wrapper is aria-hidden).
 */
export default function HeroArt({ variant }: { variant: Variant }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const host = cv;
    const g = cv?.getContext('2d');
    if (!cv || !host || !g) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mono = getComputedStyle(document.documentElement).getPropertyValue('--font-geist-mono').trim() || 'ui-monospace, monospace';
    const painter = PAINTERS[variant]({ g, rgb: accentRgb(), mono });
    let visible = true, last = 0, raf = 0;

    const resize = () => {
      const r = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round(r.height * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      painter.resize(r.width, r.height);
      painter.frame(reduce ? STILL_T[variant] : performance.now() / 1000, reduce);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden || now - last < 33) return;
      last = now;
      painter.frame(now / 1000, false);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(host);
    resize();
    if (!reduce) raf = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [variant]);

  return <canvas ref={ref} className="wd-bd-art" />;
}
