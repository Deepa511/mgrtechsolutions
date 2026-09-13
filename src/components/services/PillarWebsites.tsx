import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { PILLAR_WEB_DESIGN } from '@/data/services';

/** S3 — Pillar 01: Website Design & Development (light). */
export default function PillarWebsites() {
  return (
    <section
      id="web-design"
      className="scroll-mt-24 py-20 md:py-28"
      aria-labelledby="pillar-websites-heading"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-accent-ink">{PILLAR_WEB_DESIGN.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="pillar-websites-heading" className="h2-section mt-4 font-medium text-forest-950">
                {PILLAR_WEB_DESIGN.headline}
                <span className="mt-1 block text-accent-ink">{PILLAR_WEB_DESIGN.headlineAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede mt-6 max-w-xl text-ink-soft">{PILLAR_WEB_DESIGN.body}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-3">
                {PILLAR_WEB_DESIGN.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-forest-950">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-cream-300 bg-cream-100 p-8">
              <p className="eyebrow text-ink-soft">{PILLAR_WEB_DESIGN.specSheetLabel}</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[280px] border-collapse text-left">
                  <thead>
                    <tr className="sr-only">
                      <th scope="col">Spec</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PILLAR_WEB_DESIGN.specRows.map(([label, value]) => (
                      <tr key={label} className="border-b border-cream-300 last:border-0">
                        <th scope="row" className="py-3 pr-4 text-sm font-medium text-ink-soft">
                          {label}
                        </th>
                        <td className="py-3 text-sm font-medium text-forest-950">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <p className="eyebrow text-ink-soft">{PILLAR_WEB_DESIGN.packagesLabel}</p>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {PILLAR_WEB_DESIGN.packages.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.08}>
                <article
                  className={
                    plan.featured
                      ? 'flex h-full flex-col rounded-2xl border-2 border-accent-ink bg-cream-100 p-8 transition-shadow hover:shadow-lg'
                      : 'flex h-full flex-col rounded-2xl border border-cream-300 bg-cream-100 p-8 transition-colors hover:border-accent-ink'
                  }
                >
                  <p className="eyebrow text-accent-ink">{plan.name}</p>
                  <p className="h3-card mt-4 font-medium text-forest-950">{plan.price}</p>
                  <p className="mt-3 text-[1.0625rem] leading-[1.7] text-ink-soft">{plan.pitch}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-forest-950">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="eyebrow mt-6 text-ink-soft">{plan.goodFor}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-soft">{PILLAR_WEB_DESIGN.packagesNote}</p>
        </div>
      </div>
    </section>
  );
}
