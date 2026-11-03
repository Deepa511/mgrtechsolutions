import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { WD_RELATED } from '@/data/website-design';
import { Band, SectionHead } from '@/components/services/website-design/WdBits';

/** Link rows to the other services. */
export default function WdRelated() {
  return (
    <Band labelledBy="wd-related-heading">
      <SectionHead id="wd-related-heading" eyebrow={WD_RELATED.eyebrow} heading={WD_RELATED.heading} lede={WD_RELATED.lede} />
      <Reveal>
        <div className="wd-lrows">
          {WD_RELATED.items.map((r) => (
            <Link key={r.title} className="wd-lrow" href={r.href}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <i aria-hidden="true">&rarr;</i>
            </Link>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}
