import type Lenis from 'lenis';

/**
 * The single Lenis instance created by `SmoothScroll`, shared with anything
 * that needs to command a scroll (the navbar's same-page and anchor links).
 * Null whenever Lenis is disabled (prefers-reduced-motion) or not yet mounted.
 */
let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null): void {
  instance = lenis;
}

export function getLenisInstance(): Lenis | null {
  return instance;
}
