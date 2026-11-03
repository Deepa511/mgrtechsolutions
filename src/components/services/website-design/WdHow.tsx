import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { WD_HOW } from '@/data/website-design';
import { Band, Bullets, SectionHead } from '@/components/services/website-design/WdBits';
import ScrollRail from '@/components/services/website-design/ScrollRail';

/** Four steps on a vertical rail, each with We do / You do / You get. */
export default function WdHow() {
  return (
    <Band id="how" labelledBy="wd-how-heading">
      <SectionHead id="wd-how-heading" eyebrow={WD_HOW.eyebrow} heading={WD_HOW.heading} lede={WD_HOW.lede} />
      <ScrollRail>
        {WD_HOW.steps.map((s) => (
          <Reveal key={s.title}>
            <div className="wd-stp">
              <div className="wd-head">
                <h3>{s.title}</h3>
              </div>
              <p>{s.text}</p>
              <div className="wd-trio">
                <div>
                  <h4>We do</h4>
                  <Bullets items={s.we} />
                </div>
                <div>
                  <h4>You do</h4>
                  <Bullets items={s.you} />
                </div>
                <div>
                  <h4>You get</h4>
                  <Bullets items={s.get} />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ScrollRail>
      <p className="wd-note">
        {WD_HOW.readLead}{' '}
        <Link className="wd-lk" href={`/blog/${WD_HOW.read.slug}`}>
          {WD_HOW.read.label}
        </Link>
        .
      </p>
    </Band>
  );
}
