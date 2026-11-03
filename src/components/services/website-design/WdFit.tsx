import Reveal from '@/components/motion/Reveal';
import { WD_FIT } from '@/data/website-design';
import { Band, Bullets, SectionHead } from '@/components/services/website-design/WdBits';

/** Split panels: who it suits (light) and who it doesn't (dark). */
export default function WdFit() {
  return (
    <Band id="fit" labelledBy="wd-fit-heading">
      <SectionHead id="wd-fit-heading" eyebrow={WD_FIT.eyebrow} heading={WD_FIT.heading} lede={WD_FIT.lede} />
      <Reveal>
        <div className="wd-split">
          <div className="wd-yes">
            <h3>{WD_FIT.yesTitle}</h3>
            <Bullets items={WD_FIT.yes} />
          </div>
          <div className="wd-no wd-night">
            <h3>{WD_FIT.noTitle}</h3>
            <Bullets items={WD_FIT.no} x />
          </div>
        </div>
      </Reveal>
    </Band>
  );
}
