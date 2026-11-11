import Reveal from '@/components/motion/Reveal';
import { SITE } from '@/data/site';
import { WD_CLOSE } from '@/data/website-design';

/** Closing call to action (dark): free site review by phone or email. */
export default function WdClose() {
  return (
    <section id="contact" aria-labelledby="wd-close-heading" className="wd-night wd-band wd-close">
      <div className="wd-wrap">
        <Reveal>
          <p className="wd-eyebrow wd-eyebrow-accent">{WD_CLOSE.eyebrow}</p>
          <h2 id="wd-close-heading">
            {WD_CLOSE.heading} <span>{WD_CLOSE.accent}</span>
          </h2>
          <p className="wd-lede">{WD_CLOSE.body}</p>
          <div className="wd-btnrow">
            <a className="wd-btn wd-btn-primary" href={SITE.phoneHref} aria-label={`Call ${SITE.name} at ${SITE.phone}`}>
              Call us
            </a>
            <a className="wd-btn wd-btn-ghost" href={`mailto:${SITE.email}`}>{WD_CLOSE.emailCta}</a>
          </div>
          <p className="wd-reach">
            Email: <b>{SITE.email}</b>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
