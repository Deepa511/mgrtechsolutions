import { Check } from 'lucide-react';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { PILLAR_SEO } from '@/data/services';
import { getPost } from '@/lib/blog';

/** S5 — Pillar 02: SEO (light). */
export default function PillarContent() {
  return (
    <section
      id="seo"
      className="scroll-mt-24 py-20 md:py-28"
      aria-labelledby="pillar-content-heading"
    >
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-accent-ink">{PILLAR_SEO.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="pillar-content-heading" className="h2-section mt-4 font-medium text-forest-950">
              {PILLAR_SEO.headline}
              <span className="mt-1 block text-accent-ink">{PILLAR_SEO.headlineAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-xl text-ink-soft">{PILLAR_SEO.body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-3">
              {PILLAR_SEO.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-forest-950">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm text-ink-soft">{PILLAR_SEO.pricingNote}</p>
          </Reveal>
        </div>

        <div className="space-y-4">
          {PILLAR_SEO.fanCards.map((card, i) => {
            const post = getPost(card.slug);
            if (!post) return null;
            return (
              <Reveal key={card.slug} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-2xl border border-cream-300 bg-cream-100 p-6 transition-colors hover:border-accent-ink"
                >
                  <p className="eyebrow text-accent-ink">{card.tag}</p>
                  <p className="mt-3 text-[1.0625rem] font-medium leading-[1.4] text-forest-950">
                    {card.title}
                  </p>
                  <p className="mt-2 text-sm italic text-ink-soft">{card.example}</p>
                  <p className="mt-3 text-sm text-ink-soft">
                    {post.readTime} MIN READ · {card.descriptor}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
