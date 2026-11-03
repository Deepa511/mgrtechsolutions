import Reveal from '@/components/motion/Reveal';
import { WD_TIMELINE } from '@/data/website-design';
import { Band, SectionHead } from '@/components/services/website-design/WdBits';
import DayBar from '@/components/services/website-design/DayBar';

/** The 15-day build as a to-scale bar, then a row per phase with the owner's time. */
export default function WdTimeline() {
  const t = WD_TIMELINE;
  return (
    <Band id="timeline" tone="dark" className="wd-tl" labelledBy="wd-timeline-heading">
      <SectionHead id="wd-timeline-heading" eyebrow={t.eyebrow} heading={t.heading} lede={t.lede} dark />
      <DayBar />
      <Reveal>
        <div className="wd-phases">
          {t.phases.map((p, i) => (
            <div key={p.key} className="wd-ph">
              <div className="wd-d">
                <i className={`wd-c${i + 1}`} />
                {p.days}
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <div className="wd-yt">{p.time}</div>
            </div>
          ))}
          <div className="wd-ph">
            <div className="wd-d">
              <i style={{ border: '1.5px dashed var(--mist)' }} />
              {t.after.days}
            </div>
            <h3>{t.after.title}</h3>
            <p>{t.after.text}</p>
            <div className="wd-yt">{t.after.time}</div>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <p className="wd-callout">
          <b>{t.callout.lead}</b> {t.callout.text}
        </p>
      </Reveal>
    </Band>
  );
}
