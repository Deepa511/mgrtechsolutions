import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { getPost } from '@/lib/blog';
import { WD_GUIDES } from '@/data/website-design';
import { Band, SectionHead } from '@/components/services/website-design/WdBits';

/** A featured guide plus the rest grouped by question. Titles come from the real posts. */
export default function WdGuides() {
  const feat = getPost(WD_GUIDES.featured.slug);
  return (
    <Band id="guides" labelledBy="wd-guides-heading">
      <SectionHead id="wd-guides-heading" eyebrow={WD_GUIDES.eyebrow} heading={WD_GUIDES.heading} lede={WD_GUIDES.lede} />
      <div className="wd-gd">
        {feat && (
          <Reveal>
            <Link className="wd-feat" href={`/blog/${feat.slug}`}>
              <span>{WD_GUIDES.featured.kicker}</span>
              <b>{feat.title}</b>
              <p>{WD_GUIDES.featured.blurb}</p>
              <em>Read the guide &rarr;</em>
            </Link>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <div className="wd-glist">
            {WD_GUIDES.groups.map((g) => (
              <section key={g.title} aria-label={g.title}>
                <h3>{g.title}</h3>
                {g.slugs.map((slug) => {
                  const post = getPost(slug);
                  return post ? (
                    <Link key={slug} href={`/blog/${slug}`}>
                      {post.title}
                    </Link>
                  ) : null;
                })}
              </section>
            ))}
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
