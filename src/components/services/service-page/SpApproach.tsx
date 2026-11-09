'use client';

import ScrollSection, { type SceneComponent } from '@/components/services/scroll-scenes/ScrollSection';
import SeoScene, { SEO_TAG, SEO_TICKS } from '@/components/services/scroll-scenes/scenes/SeoScene';
import ShopScene, { SHOP_TAG, SHOP_TICKS } from '@/components/services/scroll-scenes/scenes/ShopScene';
import AdsScene, { ADS_TAG, ADS_TICKS } from '@/components/services/scroll-scenes/scenes/AdsScene';
import SocialScene, { SOCIAL_TAG, SOCIAL_TICKS } from '@/components/services/scroll-scenes/scenes/SocialScene';
import AutoScene, { AUTO_TAG, AUTO_TICKS } from '@/components/services/scroll-scenes/scenes/AutoScene';
import type { SceneKey, ServicePageData } from '@/data/service-pages/types';

const SCENES: Record<SceneKey, { Scene: SceneComponent; tag: string; ticks: number[] }> = {
  seo: { Scene: SeoScene, tag: SEO_TAG, ticks: SEO_TICKS },
  shop: { Scene: ShopScene, tag: SHOP_TAG, ticks: SHOP_TICKS },
  ads: { Scene: AdsScene, tag: ADS_TAG, ticks: ADS_TICKS },
  social: { Scene: SocialScene, tag: SOCIAL_TAG, ticks: SOCIAL_TICKS },
  auto: { Scene: AutoScene, tag: AUTO_TAG, ticks: AUTO_TICKS },
};

/** Our approach: the pinned, scroll-driven scene beside four checks that tick on in order. */
export default function SpApproach({ data }: { data: ServicePageData['approach'] }) {
  const { Scene, tag, ticks } = SCENES[data.scene];
  return (
    <div className="wd-approach">
      <ScrollSection
        id="approach"
        eyebrow={data.eyebrow}
        heading={data.heading}
        accent={data.accent}
        body={data.body}
        checks={[...data.checks]}
        tag={tag}
        ticks={ticks}
        Scene={Scene}
      />
    </div>
  );
}
