'use client';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { clamp, dotPos, reveal, seg, smooth, typed, type Pt, type SceneApi } from '@/components/services/scroll-scenes/lib';

export const AUTO_TAG = 'THE 11 PM REPLY';
// order matches the checklist: confirmation, first reply, follow-ups, lead summary
export const AUTO_TICKS = [0.2, 0.38, 0.46, 0.84];

const MSG = 'Need an estimate for a bathroom retile';
const fmt = (mins: number) => { const t = mins % 1440, h = Math.floor(t / 60), m = t % 60; return `${(h % 12) || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };

const AutoScene = forwardRef<SceneApi>(function AutoScene(_, ref) {
  const clk = useRef<HTMLElement>(null);
  const min = useRef<HTMLDivElement>(null);
  const mt = useRef<HTMLSpanElement>(null);
  const typing = useRef<HTMLDivElement>(null);
  const mout = useRef<HTMLDivElement>(null);
  const notif = useRef<HTMLDivElement>(null);
  const cb = useRef<HTMLDivElement>(null);
  const A = useRef<{ start: Pt; msg: Pt; cb: Pt }>({ start: { x: 40, y: 60 }, msg: { x: 0, y: 0 }, cb: { x: 0, y: 0 } });

  useImperativeHandle(ref, () => ({
    measure(ctx) { A.current = { start: { x: ctx.stage.clientWidth * 0.1, y: 60 }, msg: ctx.rel(min.current!), cb: ctx.rel(cb.current!) }; },
    frame(p, ctx) {
      const typeP = seg(p, 0.04, 0.22);
      if (min.current) { min.current.style.opacity = String(seg(p, 0.03, 0.05)); }
      if (mt.current) mt.current.textContent = typed(MSG, typeP);
      if (typing.current) typing.current.style.display = p > 0.24 && p < 0.34 ? 'flex' : 'none';
      reveal(mout.current, smooth(seg(p, 0.34, 0.4)));
      reveal(notif.current, smooth(seg(p, 0.42, 0.5)));
      if (clk.current) clk.current.textContent = fmt(23 * 60 + 4 + Math.round(506 * smooth(seg(p, 0.52, 0.78))));
      reveal(cb.current, smooth(seg(p, 0.8, 0.86)));
      const d = dotPos(p, A.current.start, [{ a: 0, b: 0.07, to: A.current.msg }, { a: 0.84, b: 0.94, to: A.current.cb }]);
      ctx.setDot(d.x, d.y, clamp(p * 30));
    },
  }), []);

  return (
    <div className="sc-phone">
      <div className="sc-notch" />
      <div className="sc-clock"><b ref={clk}>11:04 PM</b><small>New inquiry from your website</small></div>
      <div className="sc-chat">
        <div ref={min} className="sc-m sc-m-in"><span ref={mt} /></div>
        <div ref={typing} className="sc-typing"><i /><i /><i /></div>
        <div ref={mout} className="sc-r sc-m sc-m-out">Thanks! You&apos;ll hear from us by morning.</div>
      </div>
      <div ref={notif} className="sc-r sc-notif"><small>NEW LEAD SUMMARY</small><b>Bathroom retile estimate</b><span>Wants an estimate this week. Phone on file.</span></div>
      <div ref={cb} className="sc-r sc-cb">You called back: lead is warm</div>
    </div>
  );
});
export default AutoScene;
