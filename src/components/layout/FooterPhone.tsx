'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * The footer phone number, very large on one line. The digits appear one after
 * another, once, when the footer first scrolls into view. Until the browser has
 * run this (and for anyone who prefers reduced motion) every digit is simply
 * there, so the number is never missing.
 *
 * The link has one accessible name; the individual digits are hidden from
 * screen readers so the number is not read out piece by piece.
 */
export default function FooterPhone({ phone, href, label }: { phone: string; href: string; label: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  // 'idle' = everything visible (server render, reduced motion); 'wait' = digits hidden, waiting for the footer.
  const [phase, setPhase] = useState<'idle' | 'wait' | 'play'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    // Already on screen when this loads (a short page): play straight away.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setPhase('play');
      return;
    }
    setPhase('wait');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('play');
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <a
      ref={ref}
      href={href}
      aria-label={label}
      className="footer-phone"
      data-phase={phase}
    >
      {[...phone].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="footer-phone__ch"
          style={{ transitionDelay: phase === 'play' ? `${i * 70}ms` : '0ms' }}
        >
          {ch}
        </span>
      ))}
    </a>
  );
}
