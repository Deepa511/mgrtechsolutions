export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** progress of p inside [a, b], clamped 0..1 */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const smooth = (t: number) => t * t * (3 - 2 * t);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const typed = (s: string, t: number) => s.slice(0, Math.round(clamp(t) * s.length));
/** fade + small rise, driven by t in 0..1 */
export function reveal(el: HTMLElement | null, t: number) {
  if (!el) return;
  el.style.opacity = String(t);
  el.style.transform = `translateY(${(1 - t) * 8}px)`;
}

export type Pt = { x: number; y: number };
export type Ctx = {
  stage: HTMLElement;
  scale: number;
  /** centre of an element in stage coordinates */
  rel: (el: Element) => Pt;
  /** move the orange lead dot (stage coordinates) */
  setDot: (x: number, y: number, opacity: number) => void;
};
export type SceneApi = {
  /** called on mount and resize, after the scene has been scaled to fit */
  measure: (ctx: Ctx) => void;
  /** called every animation frame with scroll progress p in 0..1 */
  frame: (p: number, ctx: Ctx) => void;
};
export type DotSeg = { a: number; b: number; to: Pt };
/** the dot travels start -> seg1.to -> seg2.to ... as p passes each [a,b] window */
export function dotPos(p: number, start: Pt, segs: DotSeg[]): Pt {
  let pos = start;
  for (const s of segs) {
    const k = smooth(seg(p, s.a, s.b));
    pos = { x: lerp(pos.x, s.to.x, k), y: lerp(pos.y, s.to.y, k) - Math.sin(k * Math.PI) * 30 };
  }
  return pos;
}
