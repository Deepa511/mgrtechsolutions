import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { PILLAR_ECOMMERCE } from '@/data/services';

/** S7 — Pillar 03: E-commerce (light). */
export default function PillarEcommerce() {
  return (
    <section
      id="ecommerce"
      className="scroll-mt-24 py-20 md:py-28"
      aria-labelledby="pillar-ecommerce-heading"
    >
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-accent-ink">{PILLAR_ECOMMERCE.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="pillar-ecommerce-heading" className="h2-section mt-4 font-medium text-forest-950">
              {PILLAR_ECOMMERCE.headline}
              <span className="mt-1 block text-accent-ink">{PILLAR_ECOMMERCE.headlineAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-xl text-ink-soft">{PILLAR_ECOMMERCE.body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-3">
              {PILLAR_ECOMMERCE.checklist.map((item) => (
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
            <p className="eyebrow text-ink-soft">{PILLAR_ECOMMERCE.specSheetLabel}</p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[280px] border-collapse text-left">
                <thead>
                  <tr className="sr-only">
                    <th scope="col">Spec</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {PILLAR_ECOMMERCE.specRows.map(([label, value]) => (
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
    </section>
  );
}
