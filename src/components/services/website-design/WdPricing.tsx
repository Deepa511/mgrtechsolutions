import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { PRICE_MASK, WD_PRICING } from '@/data/website-design';
import { Band, Bullets, SectionHead } from '@/components/services/website-design/WdBits';

/** Three plan columns (Standard raised and dark) and the three facts under them. */
export default function WdPricing() {
  return (
    <Band id="pricing" tone="tint" labelledBy="wd-pricing-heading">
      <SectionHead id="wd-pricing-heading" eyebrow={WD_PRICING.eyebrow} heading={WD_PRICING.heading} lede={WD_PRICING.lede} />

      <Reveal>
        <div className="wd-plans">
          {WD_PRICING.plans.map((p) => {
            const hl = 'highlight' in p && p.highlight;
            return (
              <article key={p.name} className={`wd-plan${hl ? ' wd-hl' : ''}`}>
                {'badge' in p && <span className="wd-badge">{p.badge}</span>}
                <span className="wd-ptag">{p.name}</span>
                <p className="wd-price">{PRICE_MASK}</p>
                <p className="wd-pnote">{p.note}</p>
                <p className="wd-pitch">{p.pitch}</p>
                <p className="wd-plead">{p.lead}</p>
                <Bullets items={p.items} />
                <p className="wd-goodfor">{p.goodFor}</p>
              </article>
            );
          })}
        </div>
      </Reveal>

      <Reveal>
        <div className="wd-facts3">
          {WD_PRICING.facts.map((f) => (
            <div key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <Bullets items={f.items} x={f.kind === 'x'} />
            </div>
          ))}
        </div>
      </Reveal>

      <p className="wd-note">
        {WD_PRICING.readLead}{' '}
        {WD_PRICING.reads.map((r, i) => (
          <span key={r.slug}>
            {i > 0 && ' and '}
            <Link className="wd-lk" href={`/blog/${r.slug}`}>
              {r.label}
            </Link>
          </span>
        ))}
        .
      </p>
    </Band>
  );
}
