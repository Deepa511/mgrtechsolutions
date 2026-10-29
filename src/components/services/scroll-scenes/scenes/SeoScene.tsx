'use client';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { clamp, dotPos, seg, smooth, typed, type Pt, type SceneApi } from '@/components/services/scroll-scenes/lib';

export const SEO_TAG = 'THE CLIMB';
export const SEO_TICKS = [0.3, 0.44, 0.58, 0.76];

const QUERY = 'plasterer framingham ma';
const RH = 56, GAP = 8, STEP = RH + GAP, YOU = 5;
const NAMES: [string, string, number][] = [
  ['Bay State Plastering', '4.8', 112], ['Sullivan Plaster Co.', '4.7', 86], ['Metro Finish Interiors', '4.6', 74],
  ['Hartwell Drywall', '4.5', 51], ['Charles River Walls', '4.4', 38], ['Your Business', '4.9', 0],
];

const SeoScene = forwardRef<SceneApi>(function SeoScene(_, ref) {
  const q = useRef<HTMLSpanElement>(null);
  const searchBox = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const calls = useRef<HTMLSpanElement>(null);
  const cn = useRef<HTMLElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const A = useRef<{ start: Pt; search: Pt; call: Pt }>({ start: { x: 40, y: 60 }, search: { x: 100, y: 100 }, call: { x: 300, y: 200 } });

  useImperativeHandle(ref, () => ({
    measure(ctx) {
      const s = ctx.stage.getBoundingClientRect(), sb = searchBox.current!.getBoundingClientRect(), lb = list.current!.getBoundingClientRect();
      A.current = {
        start: { x: s.width * 0.1, y: 60 },
        search: { x: sb.left - s.left + 38 * ctx.scale, y: sb.top - s.top + sb.height / 2 },
        call: { x: lb.right - s.left - 27 * ctx.scale, y: lb.top - s.top + (RH / 2) * ctx.scale },
      };
    },
    frame(p, ctx) {
      if (q.current) q.current.textContent = typed(QUERY, seg(p, 0.03, 0.15));
      const lo = seg(p, 0.15, 0.21);
      if (list.current) list.current.style.opacity = String(lo);
      const climb = smooth(seg(p, 0.23, 0.74)), pos = 5 * (1 - climb);
      rows.current.forEach((el, i) => {
        if (!el) return;
        const slot = i === YOU ? pos : i + clamp(i + 1 - pos, 0, 1);
        el.style.transform = `translateY(${slot * STEP}px)`;
        const n = el.querySelector('.sc-n'); if (n) n.textContent = String(Math.round(slot) + 1);
      });
      const top = climb >= 0.999;
      rows.current[YOU]?.classList.toggle('is-lead', top);
      if (pill.current) { pill.current.textContent = lo < 0.5 ? 'Not ranked' : top ? '#1 in your area' : `Ranked #${Math.round(pos) + 1}`; pill.current.classList.toggle('is-top', top); }
      const d = dotPos(p, A.current.start, [{ a: 0, b: 0.07, to: A.current.search }, { a: 0.74, b: 0.86, to: A.current.call }]);
      ctx.setDot(d.x, d.y, clamp(p * 30));
      if (calls.current) calls.current.style.opacity = String(0.3 + 0.7 * seg(p, 0.84, 0.9));
      if (cn.current) cn.current.textContent = String(Math.round(seg(p, 0.86, 0.98) * 7));
    },
  }), []);

  return (
    <div className="sc-phone">
      <div className="sc-notch" />
      <div ref={searchBox} className="sc-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-sc-777777)" strokeWidth="2.4" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.8-4.8" /></svg>
        <span ref={q} /><span className="sc-caret" />
      </div>
      <div className="sc-rankbar"><span>Plasterers near you</span><span ref={pill} className="sc-pill">Not ranked</span></div>
      <div ref={list} className="sc-list">
        {NAMES.map(([name, rating, reviews], i) => (
          <div key={name} ref={(el) => { rows.current[i] = el; }} className={`sc-row${i === YOU ? ' is-you' : ''}`}>
            <div className="sc-n">{i + 1}</div>
            <div className="sc-t"><b>{name}{i === YOU && <span className="sc-badge">TOP 3</span>}</b>
              <small>{i === YOU ? 'New this year · Open now' : <>{rating} <span className="sc-stars">★★★★★</span> ({reviews})</>}</small></div>
            <div className="sc-cbtn"><svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" /></svg></div>
          </div>
        ))}
      </div>
      <div className="sc-counter"><span>Calls this month</span><span ref={calls} className="sc-calls"><strong ref={cn}>0</strong></span></div>
    </div>
  );
});
export default SeoScene;
