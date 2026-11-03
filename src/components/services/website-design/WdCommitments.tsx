import Reveal from '@/components/motion/Reveal';
import { WD_COMMITMENTS } from '@/data/website-design';
import { Band, Bullets, SectionHead } from '@/components/services/website-design/WdBits';

/** The four commitments, as editorial rows: label and title, a sentence, then the details. */
export default function WdCommitments() {
  return (
    <Band labelledBy="wd-commit-heading">
      <SectionHead id="wd-commit-heading" heading={WD_COMMITMENTS.heading} lede={WD_COMMITMENTS.lede} />
      <div className="wd-rows">
        {WD_COMMITMENTS.rows.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.05}>
            <div className="wd-row">
              <div>
                <span className="wd-tag">{r.tag}</span>
                <h3>{r.title}</h3>
              </div>
              <p>{r.text}</p>
              <Bullets items={r.points} />
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}
