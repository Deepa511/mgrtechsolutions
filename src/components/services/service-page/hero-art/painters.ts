/**
 * Canvas painters for the six service-page hero backgrounds (SEO: map contours; Website Design: a phone that rings; Google Ads: a radar; Social Media: a tile wall; E-commerce: orders at every hour; AI Automation: messages in, replies out). Each one is a
 * small factory: it is told the canvas size (`resize`) and then asked to paint
 * a frame for a time in seconds (`frame`). Everything is drawn in code from the
 * brand green (passed in as an "r,g,b" string read from the @theme token), so
 * there are no image files and no colour literals here.
 *
 * `still` is true for the single frame painted under reduced motion.
 */

export type Env = { g: CanvasRenderingContext2D; rgb: string; mono: string };
export type Painter = { resize(W: number, H: number): void; frame(t: number, still: boolean): void };
export type Variant = 'web' | 'seo' | 'ads' | 'social' | 'shop' | 'ai';

/** A time (seconds) that gives a good-looking single frame for each drawing. */
export const STILL_T: Record<Variant, number> = { web: 5.4, seo: 7, ads: 3.1, social: 6, shop: 2.8, ai: 8 };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const rgba = (rgb: string, a: number) => `rgba(${rgb},${a.toFixed(3)})`;

/** Small seeded random generator so the layout is the same on every load. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rrect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  if (typeof g.roundRect === 'function') g.roundRect(x, y, w, h, r);
  else g.rect(x, y, w, h);
}

/* ───────────────────────── SEO: contour map, pin, ripple ───────────────────────── */

function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}
function vnoise(x: number, y: number) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x: number, y: number) {
  return vnoise(x, y) * 0.55 + vnoise(x * 2.1 + 7.3, y * 2.1 + 1.7) * 0.3 + vnoise(x * 4.3 + 3.1, y * 4.3 + 9.4) * 0.15 - 0.5;
}

export function seo({ g, rgb }: Env): Painter {
  const CELL = 14, LEVELS = [-0.2, -0.15, -0.1, -0.05, 0, 0.05, 0.1, 0.15, 0.2], BK = 7, STR = 0.7, RY = 0.62;
  let W = 0, H = 0, cols = 0, rows = 0, field = new Float32Array(0), px = 0, py = 0, narrow = false;
  const edge = (a: number, b: number, x0: number, y0: number, x1: number, y1: number, L: number): [number, number] => {
    const t = (L - a) / (b - a || 1e-6);
    return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
  };
  return {
    resize(w, h) {
      W = w; H = h; narrow = w < 760;
      cols = Math.ceil(W / CELL) + 2; rows = Math.ceil(H / CELL) + 2;
      field = new Float32Array(cols * rows);
      px = W * (narrow ? 0.76 : 0.74); py = H * (narrow ? 0.2 : 0.52);
    },
    frame(t, still) {
      const drift = t * 0.035;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) field[j * cols + i] = fbm(i * CELL * 0.0046 + drift, j * CELL * 0.0046 + drift * 0.55);
      g.clearRect(0, 0, W, H);
      g.globalAlpha = narrow ? 0.6 : 1;
      const maxR = Math.max(W, H) * 0.42, period = 4.6, n = still ? 2 : 3;
      const rings: { r: number; a: number }[] = [];
      for (let k = 0; k < n; k++) {
        const ph = still ? (k + 1) / (n + 1) : (t / period + k / n) % 1;
        rings.push({ r: ph * maxR, a: Math.pow(1 - ph, 1.6) });
      }
      const boost = (x: number, y: number) => {
        const dx = x - px, dy = (y - py) / RY, d = Math.sqrt(dx * dx + dy * dy);
        let b = 0;
        for (const rg of rings) { const q = (d - rg.r) / 26; b += Math.exp(-q * q) * rg.a; }
        return Math.min(b, 1);
      };
      const buckets: number[][] = Array.from({ length: BK }, () => []);
      for (const L of LEVELS) {
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i], b = field[j * cols + i + 1], c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
            const idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (d > L ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x0 = i * CELL, y0 = j * CELL, x1 = x0 + CELL, y1 = y0 + CELL;
            const T = edge(a, b, x0, y0, x1, y0, L), R = edge(b, c, x1, y0, x1, y1, L), B = edge(d, c, x0, y1, x1, y1, L), Le = edge(a, d, x0, y0, x0, y1, L);
            let segs: [number, number][][] = [];
            switch (idx) {
              case 1: case 14: segs = [[Le, B]]; break;
              case 2: case 13: segs = [[B, R]]; break;
              case 3: case 12: segs = [[Le, R]]; break;
              case 4: case 11: segs = [[T, R]]; break;
              case 5: segs = [[T, Le], [B, R]]; break;
              case 6: case 9: segs = [[T, B]]; break;
              case 7: case 8: segs = [[T, Le]]; break;
              case 10: segs = [[T, R], [Le, B]]; break;
            }
            for (const [p0, p1] of segs) {
              const al = (0.1 + boost((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2) * 0.9) * STR;
              buckets[Math.min(BK - 1, Math.floor(al * BK * 1.4))].push(p0[0], p0[1], p1[0], p1[1]);
            }
          }
        }
      }
      g.lineWidth = 1; g.lineCap = 'round';
      buckets.forEach((arr, q) => {
        if (!arr.length) return;
        g.strokeStyle = rgba(rgb, Math.min(1, (q + 0.5) / (BK * 1.4)));
        g.beginPath();
        for (let z = 0; z < arr.length; z += 4) { g.moveTo(arr[z], arr[z + 1]); g.lineTo(arr[z + 2], arr[z + 3]); }
        g.stroke();
      });
      for (const rg of rings) {
        g.beginPath(); g.ellipse(px, py, rg.r, rg.r * RY, 0, 0, Math.PI * 2);
        g.strokeStyle = rgba(rgb, rg.a * 0.55 * Math.min(1, STR + 0.25)); g.lineWidth = 1.4; g.stroke();
      }
      const gl = g.createRadialGradient(px, py, 0, px, py, 46);
      gl.addColorStop(0, rgba(rgb, 0.42)); gl.addColorStop(1, rgba(rgb, 0));
      g.fillStyle = gl; g.beginPath(); g.ellipse(px, py, 46, 46 * RY, 0, 0, Math.PI * 2); g.fill();
      // the pin
      g.beginPath();
      g.moveTo(px, py + 2);
      g.bezierCurveTo(px - 13, py - 15, px - 17, py - 22, px - 17, py - 32);
      g.arc(px, py - 32, 17, Math.PI, 0);
      g.bezierCurveTo(px + 17, py - 22, px + 13, py - 15, px, py + 2);
      g.fillStyle = rgba(rgb, 0.14); g.fill();
      g.strokeStyle = rgba(rgb, 0.95); g.lineWidth = 2; g.lineJoin = 'round'; g.stroke();
      g.beginPath(); g.arc(px, py - 32, 6, 0, Math.PI * 2); g.fillStyle = rgba(rgb, 0.95); g.fill();
      g.globalAlpha = 1;
    },
  };
}

/* ───────────── shared helpers for the painters below ───────────── */

function txt(env: Env, s: string, x: number, y: number, a: number, size: number, align: CanvasTextAlign = 'center') {
  const { g, rgb, mono } = env;
  g.font = `500 ${size}px ${mono}`;
  g.textAlign = align;
  g.textBaseline = 'middle';
  g.fillStyle = rgba(rgb, a);
  g.fillText(s, x, y);
}

const TAU = Math.PI * 2;

/* ───────────────────────── Website Design: a phone that rings ───────────────────────── */

export function web(env: Env): Painter {
  const { g, rgb } = env;
  const c = (a: number) => rgba(rgb, a);
  let W = 0, H = 0, cx = 0, cy = 0, ph = 0, pw = 0;
  const P = 262;
  const content = (sx: number, y0: number, sw: number) => {
    rrect(g, sx + 8, y0 + 8, sw - 16, 86, 8); g.stroke();
    g.beginPath(); g.moveTo(sx + 18, y0 + 34); g.lineTo(sx + sw * 0.7, y0 + 34); g.moveTo(sx + 18, y0 + 50); g.lineTo(sx + sw * 0.5, y0 + 50); g.stroke();
    rrect(g, sx + 18, y0 + 66, 56, 18, 9); g.stroke();
    const cw = (sw - 24) / 2;
    rrect(g, sx + 8, y0 + 104, cw, 60, 6); g.stroke();
    rrect(g, sx + 16 + cw, y0 + 104, cw, 60, 6); g.stroke();
    g.beginPath();
    g.moveTo(sx + 8, y0 + 182); g.lineTo(sx + sw - 20, y0 + 182);
    g.moveTo(sx + 8, y0 + 194); g.lineTo(sx + sw * 0.6, y0 + 194);
    g.moveTo(sx + 8, y0 + 206); g.lineTo(sx + sw * 0.75, y0 + 206);
    g.stroke();
    rrect(g, sx + 8, y0 + 222, sw - 16, 28, 6); g.stroke();
  };
  return {
    resize(w, h) {
      W = w; H = h;
      const narrow = w < 760;
      ph = Math.min(h * 0.82, 440); pw = ph * 0.5; cx = w * (narrow ? 0.7 : 0.74); cy = h * 0.52;
    },
    frame(t) {
      g.clearRect(0, 0, W, H);
      g.lineJoin = 'round'; g.lineCap = 'round';
      const sx = cx - pw / 2 + 10, sy = cy - ph / 2 + 28, sw = pw - 20, sh = ph - 28 - 14, bx = cx, by = sy + sh - 26;
      // rings from the call button
      for (let k = 0; k < 3; k++) {
        // Ripple period in seconds: bigger = slower (was 2.6).
        const p = (t / 5.2 + k / 3) % 1;
        g.beginPath(); g.arc(bx, by, 18 + p * pw * 1.25, 0, TAU);
        g.strokeStyle = c((1 - p) * 0.5); g.lineWidth = 1.5; g.stroke();
      }
      const gl = g.createRadialGradient(cx, cy, 0, cx, cy, ph * 0.8);
      gl.addColorStop(0, c(0.12)); gl.addColorStop(1, c(0));
      g.fillStyle = gl; g.fillRect(0, 0, W, H);
      rrect(g, cx - pw / 2, cy - ph / 2, pw, ph, 28);
      g.fillStyle = c(0.05); g.fill(); g.strokeStyle = c(0.7); g.lineWidth = 1.6; g.stroke();
      g.beginPath(); g.moveTo(cx - 16, cy - ph / 2 + 13); g.lineTo(cx + 16, cy - ph / 2 + 13); g.strokeStyle = c(0.4); g.stroke();
      // the page, scrolling
      g.save();
      rrect(g, sx, sy, sw, sh, 14); g.clip();
      g.lineWidth = 1.2; g.strokeStyle = c(0.34);
      const o = (t * 24) % P;
      for (let j = -1; j < 3; j++) content(sx, sy - o + j * P, sw);
      g.restore();
      const pulse = 0.5 + 0.5 * Math.sin(t * 3.2);
      rrect(g, sx + 8, by - 15, sw - 16, 30, 15);
      g.fillStyle = c(0.28 + 0.2 * pulse); g.fill(); g.strokeStyle = c(0.9); g.lineWidth = 1.4; g.stroke();
      txt(env, 'Tap to call', bx, by + 0.5, 0.95, 11);
      // incoming call chips, left of the phone
      for (let k = 0; k < 2; k++) {
        const q = (t / 3.4 + k * 0.5) % 1, a = Math.sin(q * Math.PI);
        const yy = cy + ph * 0.18 - q * ph * 0.5 - k * 30, xx = cx - pw / 2 - 70 - k * 24;
        rrect(g, xx - 48, yy - 11, 96, 22, 11);
        g.fillStyle = c(a * 0.18); g.fill(); g.strokeStyle = c(a * 0.8); g.lineWidth = 1.2; g.stroke();
        g.beginPath(); g.arc(xx - 34, yy, 3, 0, TAU); g.fillStyle = c(a); g.fill();
        txt(env, 'New call', xx + 6, yy + 0.5, a * 0.9, 10);
      }
    },
  };
}

/* ───────────────────────── Google Ads: a radar that rings the phone ───────────────────────── */

export function ads(env: Env): Painter {
  const { g, rgb } = env;
  const c = (a: number) => rgba(rgb, a);
  const RY = 0.58;
  let W = 0, H = 0, cx = 0, cy = 0, R = 0;
  let blips: { a: number; d: number }[] = [];
  return {
    resize(w, h) {
      W = w; H = h;
      const narrow = w < 760;
      cx = w * (narrow ? 0.7 : 0.74); cy = h * 0.54; R = Math.min(w * (narrow ? 0.5 : 0.3), h * 0.62);
      const r = rng(21);
      blips = Array.from({ length: 11 }, () => ({ a: r() * TAU, d: 0.22 + r() * 0.74 }));
    },
    frame(t) {
      g.clearRect(0, 0, W, H);
      const sw = t * 0.8;
      g.save(); g.translate(cx, cy); g.scale(1, RY);
      for (let k = 1; k <= 4; k++) {
        g.beginPath(); g.arc(0, 0, (R * k) / 4, 0, TAU);
        g.strokeStyle = c(0.1 + k * 0.03); g.lineWidth = (1 / RY) * 0.9; g.stroke();
      }
      g.beginPath(); g.moveTo(-R, 0); g.lineTo(R, 0); g.moveTo(0, -R); g.lineTo(0, R); g.strokeStyle = c(0.12); g.lineWidth = 1; g.stroke();
      g.beginPath();
      for (let i = 0; i < 72; i++) {
        const a = (i / 72) * TAU, l = i % 6 === 0 ? R * 0.05 : R * 0.025;
        g.moveTo(Math.cos(a) * R, Math.sin(a) * R); g.lineTo(Math.cos(a) * (R + l), Math.sin(a) * (R + l));
      }
      g.strokeStyle = c(0.3); g.stroke();
      const cg = g.createConicGradient(sw - 1.4, 0, 0);
      cg.addColorStop(0, c(0)); cg.addColorStop(1.4 / TAU, c(0.4)); cg.addColorStop(1.4 / TAU + 0.0001, c(0)); cg.addColorStop(1, c(0));
      g.beginPath(); g.arc(0, 0, R, 0, TAU); g.fillStyle = cg; g.fill();
      g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(sw) * R, Math.sin(sw) * R); g.strokeStyle = c(0.9); g.lineWidth = 1.6; g.stroke();
      // blips flash when the beam passes, then send out a ring: a call coming in
      for (const b of blips) {
        const age = ((((sw - b.a) % TAU) + TAU) % TAU) / 0.8, x = Math.cos(b.a) * R * b.d, y = Math.sin(b.a) * R * b.d, glow = Math.exp(-age * 0.9);
        if (age < 2.4) { g.beginPath(); g.arc(x, y, 4 + age * 26, 0, TAU); g.strokeStyle = c((1 - age / 2.4) * 0.6); g.lineWidth = (1.4 / RY) * 0.7; g.stroke(); }
        g.beginPath(); g.arc(x, y, (2.6 / RY) * 0.6 + glow * 2, 0, TAU); g.fillStyle = c(0.25 + 0.75 * glow); g.fill();
      }
      g.restore();
      const gl = g.createRadialGradient(cx, cy, 0, cx, cy, 40);
      gl.addColorStop(0, c(0.45)); gl.addColorStop(1, c(0));
      g.fillStyle = gl; g.beginPath(); g.arc(cx, cy, 40, 0, TAU); g.fill();
      g.beginPath(); g.arc(cx, cy, 4.5, 0, TAU); g.fillStyle = c(0.95); g.fill();
    },
  };
}

/* ───────────────────────── Social media: a tilted wall of tiles, hearts floating up ───────────────────────── */

type Tile = { y: number; h: number; a: number; hl: boolean };
type Col = { x: number; tiles: Tile[]; L: number; v: number; o: number };

export function social(env: Env): Painter {
  const { g, rgb } = env;
  const c = (a: number) => rgba(rgb, a);
  const TH = -0.3, cs = Math.cos(TH), sn = Math.sin(TH), gap = 14;
  let W = 0, H = 0, cx = 0, cy = 0, colW = 100;
  let cols: Col[] = [];
  let hearts: { x: number; y: number; s: number; ph: number }[] = [];
  const pr = (x: number, y: number): [number, number] => {
    const xr = x * cs - y * sn, yr = x * sn + y * cs, f = 1 / (1 + yr * 0.0011);
    return [cx + xr * f, cy + yr * f * 0.66];
  };
  const heart = (s: number) => {
    g.beginPath();
    g.moveTo(0, s * 0.9);
    g.bezierCurveTo(-s * 1.3, -s * 0.1, -s * 0.5, -s * 1.1, 0, -s * 0.35);
    g.bezierCurveTo(s * 0.5, -s * 1.1, s * 1.3, -s * 0.1, 0, s * 0.9);
  };
  return {
    resize(w, h) {
      W = w; H = h;
      const narrow = w < 760;
      cx = w * (narrow ? 0.62 : 0.76); cy = h * 0.5; colW = clamp(w * 0.085, 66, 112);
      const r = rng(8), n = narrow ? 5 : 7;
      cols = [];
      for (let k = 0; k < n; k++) {
        const tiles: Tile[] = []; let acc = 0;
        for (let i = 0; i < 7; i++) { const th = colW * (0.8 + r() * 0.9); tiles.push({ y: acc, h: th, a: 0.04 + r() * 0.09, hl: r() > 0.5 }); acc += th + gap; }
        cols.push({ x: (k - (n - 1) / 2) * (colW + gap), tiles, L: acc, v: (14 + r() * 18) * (k % 2 ? -1 : 1), o: r() * acc });
      }
      hearts = Array.from({ length: 14 }, () => ({ x: (r() - 0.5) * n * (colW + gap), y: (r() - 0.3) * h * 0.7, s: 6 + r() * 5, ph: r() }));
    },
    frame(t) {
      g.clearRect(0, 0, W, H);
      g.lineJoin = 'round';
      for (const col of cols) {
        const off = (((col.o + t * col.v) % col.L) + col.L) % col.L;
        for (const tl of col.tiles) {
          for (let rep = -2; rep <= 1; rep++) {
            const y = tl.y - off + rep * col.L;
            if (y > H * 1.1 || y + tl.h < -H * 1.1) continue;
            const x0 = col.x - colW / 2, x1 = col.x + colW / 2;
            const p0 = pr(x0, y), p1 = pr(x1, y), p2 = pr(x1, y + tl.h), p3 = pr(x0, y + tl.h);
            g.beginPath(); g.moveTo(p0[0], p0[1]); g.lineTo(p1[0], p1[1]); g.lineTo(p2[0], p2[1]); g.lineTo(p3[0], p3[1]); g.closePath();
            const gr = g.createLinearGradient(p0[0], p0[1], p2[0], p2[1]);
            gr.addColorStop(0, c(tl.a * 1.7)); gr.addColorStop(1, c(tl.a * 0.5));
            g.fillStyle = gr; g.fill(); g.strokeStyle = c(0.3); g.lineWidth = 1; g.stroke();
            if (tl.hl) { const m = pr(col.x - colW * 0.2, y + tl.h * 0.32); g.beginPath(); g.arc(m[0], m[1], 3.2, 0, TAU); g.fillStyle = c(0.35); g.fill(); }
          }
        }
      }
      hearts.forEach((h, i) => {
        const ph = (t / 4.6 + h.ph) % 1, a = Math.sin(ph * Math.PI);
        if (a <= 0) return;
        const q = pr(h.x + Math.sin(ph * 6 + i) * 12, h.y - ph * 110);
        g.save(); g.translate(q[0], q[1]); heart(h.s); g.fillStyle = c(a * 0.8); g.fill(); g.restore();
      });
    },
  };
}

/* ───────────────────────── E-commerce: orders at every hour ───────────────────────── */

const TIMES = ['2:14 AM', '11:48 PM', '5:31 AM', '9:07 AM', '1:52 AM', '10:26 PM', '4:40 AM', '7:15 PM', '3:03 AM', '12:19 AM'];

export function shop(env: Env): Painter {
  const { g, rgb } = env;
  const c = (a: number) => rgba(rgb, a);
  const RH = 52, N = 6;
  let W = 0, H = 0, x0 = 0, x1 = 0, y0 = 0;
  return {
    resize(w, h) {
      W = w; H = h;
      const narrow = w < 760;
      x0 = narrow ? w * 0.1 : w * 0.6; x1 = w * 0.95; y0 = h * 0.66 - (N * RH) / 2;
    },
    frame(t) {
      g.clearRect(0, 0, W, H);
      g.lineCap = 'round'; g.lineJoin = 'round';
      const T = 2.1, n = Math.floor(t / T), fr = (t / T) % 1, e = fr * fr * (3 - 2 * fr);
      for (let j = 0; j <= N; j++) {
        const id = n - j, y = y0 + (j + e - 1) * RH + RH / 2;
        const a = j === 0 ? e : (j === N ? 1 - e : 1) * Math.max(0.25, 1 - j * 0.14), isNew = j === 0;
        if (a <= 0) continue;
        rrect(g, x0, y - RH / 2 + 5, x1 - x0, RH - 10, 12);
        g.fillStyle = c(isNew ? a * 0.2 : a * 0.05); g.fill(); g.strokeStyle = c(a * (isNew ? 0.9 : 0.4)); g.lineWidth = isNew ? 1.5 : 1.1; g.stroke();
        rrect(g, x0 + 14, y - 12, 24, 24, 6); g.strokeStyle = c(a * 0.6); g.stroke();
        g.beginPath(); g.moveTo(x0 + 14, y - 3); g.lineTo(x0 + 38, y - 3); g.moveTo(x0 + 26, y - 12); g.lineTo(x0 + 26, y - 3); g.stroke();
        g.beginPath(); g.moveTo(x0 + 52, y - 5); g.lineTo(x0 + 52 + (x1 - x0) * 0.28, y - 5); g.moveTo(x0 + 52, y + 6); g.lineTo(x0 + 52 + (x1 - x0) * 0.17, y + 6);
        g.strokeStyle = c(a * 0.4); g.lineWidth = 1.5; g.stroke();
        txt(env, TIMES[((id % TIMES.length) + TIMES.length) % TIMES.length], x1 - 62, y, a * 0.9, 12, 'right');
        g.beginPath(); g.arc(x1 - 30, y, 8, 0, TAU); g.strokeStyle = c(a * 0.8); g.lineWidth = 1.2; g.stroke();
        g.beginPath(); g.moveTo(x1 - 34, y); g.lineTo(x1 - 31, y + 3); g.lineTo(x1 - 26, y - 3); g.strokeStyle = c(a * 0.95); g.lineWidth = 1.6; g.stroke();
      }
    },
  };
}

/* ───────────────────────── AI automation: messages in, a reply typed at the gate, replies out ───────────────────────── */

export function ai(env: Env): Painter {
  const { g, rgb } = env;
  const c = (a: number) => rgba(rgb, a);
  const LANES = 6, PW = 104, PH = 30;
  let W = 0, H = 0, cx = 0, x0 = 0, x1 = 0, wrap = 0;
  let ys: number[] = [];
  return {
    resize(w, h) {
      W = w; H = h;
      const narrow = w < 760;
      x0 = narrow ? w * 0.08 : w * 0.42; x1 = w * 1.03; wrap = x1 - x0 + PW * 2; cx = w * (narrow ? 0.64 : 0.7);
      ys = Array.from({ length: LANES }, (_, i) => h * 0.2 + (h * 0.62 * i) / (LANES - 1));
    },
    frame(t) {
      g.clearRect(0, 0, W, H);
      g.lineCap = 'round'; g.lineJoin = 'round';
      const gl = g.createLinearGradient(cx - 70, 0, cx + 70, 0);
      gl.addColorStop(0, c(0)); gl.addColorStop(0.5, c(0.16)); gl.addColorStop(1, c(0));
      g.fillStyle = gl; g.fillRect(cx - 70, H * 0.06, 140, H * 0.88);
      g.beginPath(); g.moveTo(cx, H * 0.08); g.lineTo(cx, H * 0.92); g.strokeStyle = c(0.5); g.lineWidth = 1.5; g.stroke();
      for (let i = 0; i < LANES; i++) {
        const y = ys[i], v = 32 + i * 5;
        g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.strokeStyle = c(0.07); g.lineWidth = 1; g.stroke();
        for (let k = 0; k < 4; k++) {
          const x = x0 - PW + (((k / 4) * wrap + t * v + i * 41) % wrap), dist = x - cx;
          rrect(g, x - PW / 2, y - PH / 2, PW, PH, PH / 2);
          if (dist > 24) {
            // a reply: filled, with a tick
            g.fillStyle = c(0.2); g.fill(); g.strokeStyle = c(0.85); g.lineWidth = 1.4; g.stroke();
            g.beginPath(); g.moveTo(x + PW / 2 - 30, y); g.lineTo(x + PW / 2 - 24, y + 5); g.lineTo(x + PW / 2 - 14, y - 5); g.strokeStyle = c(0.95); g.lineWidth = 1.8; g.stroke();
            g.beginPath(); g.moveTo(x - PW / 2 + 14, y - 4); g.lineTo(x - PW / 2 + 14 + PW * 0.38, y - 4); g.moveTo(x - PW / 2 + 14, y + 4); g.lineTo(x - PW / 2 + 14 + PW * 0.24, y + 4);
            g.strokeStyle = c(0.55); g.lineWidth = 1.4; g.stroke();
          } else if (dist > -30) {
            // at the gate: the reply is being typed
            g.fillStyle = c(0.1); g.fill(); g.strokeStyle = c(0.6); g.lineWidth = 1.3; g.stroke();
            for (let d = 0; d < 3; d++) { g.beginPath(); g.arc(x - 12 + d * 12, y + Math.sin(t * 9 + d * 1.1) * 3, 2.6, 0, TAU); g.fillStyle = c(0.95); g.fill(); }
          } else {
            // a message coming in
            g.strokeStyle = c(0.34); g.lineWidth = 1.2; g.stroke();
            g.beginPath(); g.moveTo(x - PW / 2 + 14, y - 4); g.lineTo(x - PW / 2 + 14 + PW * 0.5, y - 4); g.moveTo(x - PW / 2 + 14, y + 4); g.lineTo(x - PW / 2 + 14 + PW * 0.32, y + 4);
            g.strokeStyle = c(0.22); g.lineWidth = 1.4; g.stroke();
          }
        }
      }
    },
  };
}

export const PAINTERS: Record<Variant, (env: Env) => Painter> = { web, seo, ads, social, shop, ai };
