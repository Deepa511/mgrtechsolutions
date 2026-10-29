'use client';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { clamp, dotPos, reveal, seg, smooth, typed, type Pt, type SceneApi } from '@/components/services/scroll-scenes/lib';

export const SOCIAL_TAG = 'THE FEED';
export const SOCIAL_TICKS = [0.04, 0.16, 0.46, 0.85];

const TILES = ['var(--color-sc-7fbf9b),var(--color-sc-2f7a55)', 'var(--color-sc-f2d9a7),var(--color-sc-c98f2b)', 'var(--color-sc-b9c4cc),var(--color-sc-5d6d79)', 'var(--color-sc-d6b2b2),var(--color-sc-8c4a4a)', 'var(--color-sc-9fd0b4),var(--color-sc-17503a)', 'var(--color-sc-e8c7a0),var(--color-sc-a86a2a)', 'var(--color-sc-a9c7e8),var(--color-sc-3a6c9e)', 'var(--color-sc-c5d9a0),var(--color-sc-5c7d2a)', 'var(--color-sc-e5b8c9),var(--color-sc-9b4a6c)'];
const LIT = [0, 2, 4, 5, 6];
const REPLY = 'Yes! Message us for a free quote.';

const SocialScene = forwardRef<SceneApi>(function SocialScene(_, ref) {
  const av = useRef<HTMLSpanElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const days = useRef<(HTMLElement | null)[]>([]);
  const posted = useRef<HTMLSpanElement>(null);
  const cin = useRef<HTMLDivElement>(null);
  const cout = useRef<HTMLDivElement>(null);
  const link = useRef<HTMLDivElement>(null);
  const A = useRef<{ start: Pt; av: Pt; link: Pt }>({ start: { x: 40, y: 60 }, av: { x: 0, y: 0 }, link: { x: 0, y: 0 } });

  useImperativeHandle(ref, () => ({
    measure(ctx) { A.current = { start: { x: ctx.stage.clientWidth * 0.1, y: 60 }, av: ctx.rel(av.current!), link: ctx.rel(link.current!) }; },
    frame(p, ctx) {
      tiles.current.forEach((el, i) => { if (!el) return; const s = smooth(seg(p, 0.04 + i * 0.04, 0.08 + i * 0.04)); el.style.opacity = String(s); el.style.transform = `scale(${0.6 + 0.4 * s})`; });
      LIT.forEach((d, n) => { const el = days.current[d]; if (el) el.classList.toggle('is-on', p >= 0.4 + d * 0.03 + n * 0); });
      if (posted.current) posted.current.style.opacity = String(seg(p, 0.58, 0.62));
      reveal(cin.current, smooth(seg(p, 0.62, 0.68)));
      const on = seg(p, 0.68, 0.7);
      if (cout.current) { cout.current.style.opacity = String(on); cout.current.textContent = typed(REPLY, seg(p, 0.7, 0.86)); }
      const d = dotPos(p, A.current.start, [{ a: 0, b: 0.07, to: A.current.av }, { a: 0.88, b: 0.97, to: A.current.link }]);
      ctx.setDot(d.x, d.y, clamp(p * 30));
    },
  }), []);

  return (
    <div className="sc-phone">
      <div className="sc-notch" />
      <div className="sc-s-head"><span ref={av} className="sc-av" /><div><b>Your Business</b><small>Framingham, MA</small></div><span ref={posted} className="sc-posted">Posted today</span></div>
      <div className="sc-s-grid">{TILES.map((c, i) => (<div key={c} ref={(el) => { tiles.current[i] = el; }} className="sc-tile" style={{ background: `linear-gradient(135deg,${c})` }} />))}</div>
      <div className="sc-s-cal">{'MTWTFSS'.split('').map((d, i) => (<div key={i}>{d}<i ref={(el) => { days.current[i] = el; }} /></div>))}</div>
      <div className="sc-s-chat"><div ref={cin} className="sc-r sc-c-in">Do you do kitchens?</div><div ref={cout} className="sc-c-out" /></div>
      <div ref={link} className="sc-s-link">Link in bio: free quote</div>
    </div>
  );
});
export default SocialScene;
