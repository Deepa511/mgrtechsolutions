'use client';

import ScrollSection from '@/components/services/scroll-scenes/ScrollSection';
import WdBuildScene, { BUILD_TAG, BUILD_TICKS } from '@/components/services/website-design/WdBuildScene';
import { WD_APPROACH } from '@/data/website-design';

/** Our approach: the pinned, scroll-driven build scene beside four checks that tick on in order. */
export default function WdApproach() {
  return (
    <div className="wd-approach">
      <ScrollSection
        id="approach"
        eyebrow={WD_APPROACH.eyebrow}
        heading={WD_APPROACH.heading}
        accent={WD_APPROACH.accent}
        body={WD_APPROACH.body}
        checks={[...WD_APPROACH.checks]}
        tag={BUILD_TAG}
        ticks={BUILD_TICKS}
        Scene={WdBuildScene}
      />
    </div>
  );
}
