'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type TargetAndTransition, type Transition } from 'framer-motion';

export type ServiceIconName = 'web' | 'seo' | 'shop' | 'ads' | 'social' | 'auto';

/** Line paths on a 48x48 grid. Every shape draws itself when the card scrolls into view. */
const PATHS: Record<ServiceIconName, string[]> = {
  web: ['M6 10h36v28H6z', 'M6 18h36', 'M12 14h.01M17 14h.01', 'M14 26h12M14 32h20'],
  seo: ['M21 8a13 13 0 1 0 0 26 13 13 0 0 0 0-26z', 'M30.5 30.5 42 42', 'M15 24l4 4 7-8'],
  shop: ['M5 8h6l5 20h20l5-14H13', 'M19 38h.01M33 38h.01'],
  ads: ['M8 20v8h8l16 9V11l-16 9z', 'M38 18a8 8 0 0 1 0 12', 'M16 28l3 10h5l-2-8'],
  social: ['M8 10h32v22H22l-9 8v-8H8z', 'M24 25l-6-6a4 4 0 0 1 6-5 4 4 0 0 1 6 5z'],
  auto: ['M27 4 12 26h11l-3 18 16-23H25z'],
};

/** A slow, tiny loop that keeps each icon feeling alive once it has drawn. */
const IDLE: Record<ServiceIconName, { animate: TargetAndTransition; transition: Transition }> = {
  web: { animate: { y: [0, -2, 0] }, transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } },
  seo: { animate: { rotate: [-6, 6, -6] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } },
  shop: { animate: { x: [0, 2, 0] }, transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } },
  ads: { animate: { rotate: [0, -5, 0, 5, 0] }, transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } },
  social: { animate: { scale: [1, 1.06, 1] }, transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } },
  auto: { animate: { opacity: [1, 0.55, 1] }, transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } },
};

/** `replay` changes each time the card is hovered, which redraws the lines. */
export default function ServiceIcon({ name, replay = 0 }: { name: ServiceIconName; replay?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' });
  const idle = IDLE[name];

  return (
    <svg
      ref={ref}
      viewBox="0 0 48 48"
      className="h-12 w-12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {reduce ? (
        <g>{PATHS[name].map((d) => <path key={d} d={d} />)}</g>
      ) : (
        <motion.g
          style={{ transformOrigin: '24px 24px' }}
          animate={inView ? idle.animate : undefined}
          transition={idle.transition}
        >
          {PATHS[name].map((d) => (
            <motion.path
              key={`${d}-${replay}`}
              d={d}
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </motion.g>
      )}
    </svg>
  );
}
