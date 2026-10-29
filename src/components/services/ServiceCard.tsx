'use client';

import { useState, type PointerEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ServiceIcon, { type ServiceIconName } from '@/components/services/ServiceIcon';

type Props = {
  index: string;
  name: string;
  line: string;
  target: string;
  icon: ServiceIconName;
  cta: string;
};

/** One overview card: lifts on hover, redraws its icon, follows the pointer with a soft glow. */
export default function ServiceCard({ index, name, line, target, icon, cta }: Props) {
  const reduce = useReducedMotion();
  const [replay, setReplay] = useState(0);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.a
      href={target}
      onPointerEnter={() => setReplay((n) => n + 1)}
      onPointerMove={onMove}
      whileHover={reduce ? undefined : { y: -4 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream-300 bg-cream-100 p-8 hover:border-accent-ink hover:shadow-lg motion-reduce:transition-none"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)',
        }}
      />
      <div className="relative flex items-start justify-between">
        <p className="eyebrow text-accent-ink">{index}</p>
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cream-300 bg-cream-50 text-accent-ink transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-forest-950 group-focus-visible:bg-accent group-focus-visible:text-forest-950 motion-reduce:transition-none">
          <ServiceIcon name={icon} replay={replay} />
        </span>
      </div>
      <p className="h3-card relative mt-4 font-medium text-forest-950">{name}</p>
      <p className="relative mt-3 text-[1.0625rem] leading-[1.7] text-ink-soft">{line}</p>
      <p className="relative mt-auto pt-6 text-sm font-medium text-accent-ink transition-all [@media(hover:hover)]:translate-x-[-6px] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-x-0 [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:!translate-x-0 group-focus-visible:!opacity-100 motion-reduce:transition-none motion-reduce:!translate-x-0 motion-reduce:!opacity-100">
        {cta} <span aria-hidden="true">&rarr;</span>
      </p>
    </motion.a>
  );
}
