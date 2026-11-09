import Link from 'next/link';
import { SITE } from '@/data/site';
import { WD_HERO } from '@/data/website-design';
import HeroBackdrop from '@/components/services/service-page/HeroBackdrop';

/** Hero (dark): promise, two actions, and four quick facts. */
export default function WdHero() {
  return (
    <section className="wd-night wd-hero" aria-labelledby="wd-hero-heading">
      <HeroBackdrop slug="website-design" />
      <div className="wd-wrap">
        <nav aria-label="Breadcrumb" className="wd-crumbs">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/services">Services</Link>
          <span aria-hidden="true">/</span>
          <span>{WD_HERO.breadcrumb}</span>
        </nav>
        <h1 id="wd-hero-heading">
          {WD_HERO.headline}
          <em>{WD_HERO.headlineAccent}</em>
        </h1>
        <p className="wd-lede">{WD_HERO.lede}</p>
        <div className="wd-btnrow">
          <a className="wd-btn wd-btn-primary" href={SITE.phoneHref}>
            Call <span className="wd-tel">{SITE.phone}</span>
          </a>
          <a className="wd-btn wd-btn-ghost" href="#contact">{WD_HERO.secondaryCta}</a>
        </div>
        <small>{WD_HERO.location}</small>
        <div className="wd-strip">
          {WD_HERO.facts.map((f) => (
            <div key={f.title}>
              <b>{f.title}</b>
              {f.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
