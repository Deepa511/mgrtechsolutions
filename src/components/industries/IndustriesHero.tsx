import Link from 'next/link';
import { INDUSTRIES_HERO } from '@/data/industries';

/** I1 — Industries hero (dark). */
export default function IndustriesHero() {
  return (
    <section className="dot-grid on-dark bg-forest-950 pb-10 pt-16">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="eyebrow text-mist">
          <Link href="/" className="transition-colors hover:text-accent">
            HOME
          </Link>
          <span className="mx-2 text-forest-700" aria-hidden="true">
            /
          </span>
          <span className="text-accent">{INDUSTRIES_HERO.breadcrumb}</span>
        </nav>

        <div className="mt-10">
          <h1 className="h1-page font-medium text-cream-50">
            {INDUSTRIES_HERO.headline}
            <span className="mt-1 block text-accent">{INDUSTRIES_HERO.headlineAccent}</span>
          </h1>

          <p className="lede mt-6 max-w-xl text-mist">{INDUSTRIES_HERO.lede}</p>
        </div>
      </div>
    </section>
  );
}
