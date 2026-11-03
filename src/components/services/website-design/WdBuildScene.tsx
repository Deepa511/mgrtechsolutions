'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { clamp, seg, smooth, type Pt, type SceneApi } from '@/components/services/scroll-scenes/lib';

export const BUILD_TAG = 'THE BUILD';
/** Scroll progress at which each of the four checklist items ticks on. */
export const BUILD_TICKS = [0.15, 0.55, 0.68, 0.82];

/**
 * The approach scene: a browser window fills in block by block while a
 * "load time" gauge goes from Slow to Fast, a "100% YOURS" stamp lands, and
 * the call button rings. Driven by scroll progress from ScrollSection.
 */
const WdBuildScene = forwardRef<SceneApi>(function WdBuildScene(_, ref) {
  const blocks = useRef<(HTMLElement | null)[]>([]);
  const call = useRef<HTMLButtonElement>(null);
  const label = useRef<HTMLElement>(null);
  const fill = useRef<HTMLElement>(null);
  const stamp = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);
  const A = useRef<{ start: Pt; hero: Pt; call: Pt }>({ start: { x: 40, y: 60 }, hero: { x: 150, y: 200 }, call: { x: 150, y: 400 } });

  useImperativeHandle(
    ref,
    () => ({
      measure(ctx) {
        reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        A.current = {
          start: { x: ctx.stage.clientWidth * 0.1, y: 60 },
          hero: ctx.rel(blocks.current[1]!),
          call: ctx.rel(call.current!),
        };
      },
      frame(p, ctx) {
        blocks.current.forEach((el, i) => {
          if (!el) return;
          const t = smooth(seg(p, 0.05 + i * 0.09, 0.12 + i * 0.09));
          el.style.opacity = String(t);
          el.style.transform = `translateY(${(1 - t) * 14}px)`;
        });
        const g = seg(p, 0.4, 0.7);
        const e = 1 - Math.pow(1 - g, 3);
        if (label.current) label.current.textContent = g < 0.02 ? 'Slow' : g > 0.98 ? 'Fast' : 'Getting faster';
        if (fill.current) fill.current.style.width = `${100 - e * 55}%`;
        const s = smooth(seg(p, 0.76, 0.82));
        if (stamp.current) {
          stamp.current.style.opacity = String(s);
          stamp.current.style.transform = `rotate(8deg) scale(${1.8 - 0.8 * s})`;
        }
        call.current?.classList.toggle('wd-ring', p >= 0.9 && !reduce.current);
        const { start, hero, call: c } = A.current;
        let d: Pt;
        if (p < 0.08) {
          const t = smooth(seg(p, 0, 0.08));
          d = { x: start.x + (hero.x - start.x) * t, y: start.y + (hero.y - start.y) * t };
        } else if (p < 0.84) {
          d = hero;
        } else {
          const t = smooth(seg(p, 0.84, 0.95));
          d = { x: hero.x + (c.x - hero.x) * t, y: hero.y + (c.y - hero.y) * t };
        }
        ctx.setDot(d.x, d.y, reduce.current ? 0 : clamp(p * 30) * (p > 0.97 ? 0 : 1));
      },
    }),
    [],
  );

  return (
    <div className="wd-browser">
      <div className="wd-bhead">
        <i />
        <i />
        <i />
        <span className="wd-burl">yourbusiness.com</span>
      </div>
      <div className="wd-bbody">
        <div className="wd-sr wd-bnav" ref={(el) => { blocks.current[0] = el; }}>
          <span className="wd-blogo" />
          <span><s /><s /><s /></span>
        </div>
        <div className="wd-sr wd-bhero" ref={(el) => { blocks.current[1] = el; }}>
          <h4>Your town&apos;s trusted crew.</h4>
          <p>Free quotes. Local. Insured.</p>
        </div>
        <div className="wd-sr wd-bphoto" ref={(el) => { blocks.current[2] = el; }} />
        <div className="wd-sr wd-bchips" ref={(el) => { blocks.current[3] = el; }}>
          <span>Ashland</span>
          <span>Framingham</span>
          <span>Natick</span>
        </div>
        <div className="wd-sr" ref={(el) => { blocks.current[4] = el; }}>
          <button ref={call} className="wd-callbtn" type="button" tabIndex={-1}>Call now</button>
        </div>
      </div>
      <div className="wd-gauge">
        <div className="wd-g1">
          <span>On a phone</span>
          <b ref={label}>Slow</b>
        </div>
        <div className="wd-gtrack"><span ref={fill} className="wd-gfill" /></div>
      </div>
      <div ref={stamp} className="wd-stamp">100% YOURS</div>
    </div>
  );
});

export default WdBuildScene;
