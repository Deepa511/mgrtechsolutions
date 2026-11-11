import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { WD_FAQ } from '@/data/website-design';

/** FAQ: sticky side column beside native accordions (no JS needed). */
export default function WdFaq() {
  return (
    <section id="faq" aria-labelledby="wd-faq-heading" className="wd-band wd-alt">
      <div className="wd-wrap wd-faqw">
        <Reveal>
          <div className="wd-faqside">
            <p className="wd-eyebrow">{WD_FAQ.eyebrow}</p>
            <h2 id="wd-faq-heading">{WD_FAQ.heading}</h2>
            <p className="wd-lede" style={{ fontSize: '1rem' }}>{WD_FAQ.lede}</p>
            <div className="wd-btnrow" style={{ marginTop: 22 }}>
              <a className="wd-btn wd-btn-ghost" href="#contact">Ask a question</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div>
            {WD_FAQ.items.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>
                  {f.a}
                  {'read' in f && (
                    <>
                      {' '}
                      See{' '}
                      <Link className="wd-lk" href={`/blog/${f.read.slug}`}>
                        {f.read.label}
                      </Link>
                      .
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
