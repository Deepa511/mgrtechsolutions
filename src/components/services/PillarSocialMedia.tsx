import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { PILLAR_SOCIAL_MEDIA } from '@/data/services';

/** S11 — Pillar 05: Social Media Management (light). */
export default function PillarSocialMedia() {
  return (
    <section
      id="social-media"
      className="scroll-mt-24 py-20 md:py-28"
      aria-labelledby="pillar-social-media-heading"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-accent-ink">{PILLAR_SOCIAL_MEDIA.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="pillar-social-media-heading" className="h2-section mt-4 font-medium text-forest-950">
                {PILLAR_SOCIAL_MEDIA.headline}
                <span className="mt-1 block text-accent-ink">{PILLAR_SOCIAL_MEDIA.headlineAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede mt-6 max-w-xl text-ink-soft">{PILLAR_SOCIAL_MEDIA.body}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-3">
                {PILLAR_SOCIAL_MEDIA.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-forest-950">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="mt-6 text-sm text-ink-soft lg:mt-0">{PILLAR_SOCIAL_MEDIA.scopeNote}</p>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <p className="eyebrow text-ink-soft">{PILLAR_SOCIAL_MEDIA.tiersLabel}</p>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {PILLAR_SOCIAL_MEDIA.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.08}>
                <article
                  className={
                    tier.featured
                      ? 'flex h-full flex-col rounded-2xl border-2 border-accent-ink bg-cream-100 p-8 transition-shadow hover:shadow-lg'
                      : 'flex h-full flex-col rounded-2xl border border-cream-300 bg-cream-100 p-8 transition-colors hover:border-accent-ink'
                  }
                >
                  <p className="eyebrow text-accent-ink">{tier.name}</p>
                  <p className="h3-card mt-4 font-medium text-forest-950">{tier.price}</p>
                  <p className="mt-3 text-[1.0625rem] leading-[1.7] text-ink-soft">{tier.pitch}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-forest-950">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="eyebrow mt-6 text-ink-soft">{tier.goodFor}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
