'use client';

import { useEffect, useRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';
import { clamp, type Ctx, type SceneApi } from '@/components/services/scroll-scenes/lib';
import './scenes.css';

export type SceneComponent = ForwardRefExoticComponent<RefAttributes<SceneApi>>;

export type SectionProps = {
  id: string;
  eyebrow: string;
  heading: ReactNode;
  accent: ReactNode;
  body: ReactNode;
  checks: string[];
  /** small label in the corner of the stage */
  tag: string;
  /** scroll progress (0..1) at which each checklist item ticks on, one per item */
  ticks: number[];
  Scene: SceneComponent;
  /** put the animation on the left, copy on the right */
  flip?: boolean;
  /** scroll length of the pinned section in vh (shorter = faster overall). Default 300 */
  length?: number;
};

export default function ScrollSection({ id, eyebrow, heading, accent, body, checks, tag, ticks, Scene, flip, length = 300 }: SectionProps) {
  const root = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneWrap = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const api = useRef<SceneApi>(null);
  const checkEls = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const sec = root.current, stage = stageRef.current, wrap = sceneWrap.current, dotEl = dotRef.current;
    if (!sec || !stage || !wrap || !dotEl) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx: Ctx = {
      stage, scale: 1,
      rel: (el) => { const a = el.getBoundingClientRect(), s = stage.getBoundingClientRect(); return { x: a.left - s.left + a.width / 2, y: a.top - s.top + a.height / 2 }; },
      setDot: (x, y, o) => { dotEl.style.transform = `translate(${x}px,${y}px)`; dotEl.style.opacity = String(o); },
    };
    const measure = () => {
      const fitH = (stage.clientHeight - 36) / wrap.offsetHeight;
      const fitW = (stage.clientWidth - 24) / wrap.offsetWidth;
      ctx.scale = Math.min(1, fitH, fitW);
      wrap.style.transform = `scale(${ctx.scale})`;
      api.current?.measure(ctx);
    };
    const frame = (p: number) => {
      api.current?.frame(p, ctx);
      ticks.forEach((t, i) => checkEls.current[i]?.classList.toggle('is-on', p >= t));
      if (bar.current) bar.current.style.width = `${p * 100}%`;
      if (hint.current) hint.current.style.opacity = p < 0.03 ? '1' : '0';
    };

    let target = 0, cur = 0, raf = 0;
    const readTarget = () => { const r = sec.getBoundingClientRect(); target = clamp(-r.top / Math.max(1, sec.offsetHeight - window.innerHeight)); };
    const tick = () => {
      cur += (target - cur) * 0.18;                       // light smoothing; still follows scroll speed
      if (Math.abs(target - cur) < 0.0004) cur = target;
      frame(cur);
      raf = cur !== target ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => { readTarget(); if (!raf) raf = requestAnimationFrame(tick); };
    const onResize = () => { measure(); onScroll(); };

    measure(); readTarget();
    if (reduce) target = 1;
    cur = reduce ? 1 : target;
    frame(cur);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); if (raf) cancelAnimationFrame(raf); };
  }, [ticks]);

  return (
    <section ref={root} id={id} className={`sc${flip ? ' sc-flip' : ''}`} style={{ ['--sc-length' as string]: `${length}vh` }} aria-labelledby={`${id}-heading`}>
      <div className="sc-pin">
        <div className="sc-wrap">
          <div className="sc-copy">
            <div className="sc-eyebrow">{eyebrow}</div>
            <h2 id={`${id}-heading`} className="sc-h2">{heading} <span>{accent}</span></h2>
            <p className="sc-lede">{body}</p>
            <ul className="sc-checks">
              {checks.map((c, i) => (<li key={c} ref={(el) => { checkEls.current[i] = el; }}><i>&#10003;</i><span>{c}</span></li>))}
            </ul>
            <div ref={hint} className="sc-hint">SCROLL TO PLAY &#8595;</div>
          </div>
          <div ref={stageRef} className="sc-stage" role="img" aria-label={`Animation: ${tag.toLowerCase()}`}>
            <div className="sc-tag">{tag}</div>
            <div className="sc-example">EXAMPLE ONLY, NOT A REAL CLIENT</div>
            <div ref={dotRef} className="sc-dot" aria-hidden="true" />
            <div ref={sceneWrap} className="sc-scene" aria-hidden="true"><Scene ref={api} /></div>
            <div ref={bar} className="sc-bar" />
          </div>
        </div>
      </div>
    </section>
  );
}
