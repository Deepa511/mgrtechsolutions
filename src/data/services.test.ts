import { describe, expect, it } from 'vitest';
import {
  PILLAR_AUTOMATION,
  PILLAR_ECOMMERCE,
  PILLAR_GOOGLE_ADS,
  PILLAR_SEO,
  PILLAR_SOCIAL_MEDIA,
  PILLAR_WEB_DESIGN,
  SYSTEM_STRIP,
} from '@/data/services';
import { getPost } from '@/lib/blog';
import { ADS_TICKS } from '@/components/services/scroll-scenes/scenes/AdsScene';
import { AUTO_TICKS } from '@/components/services/scroll-scenes/scenes/AutoScene';
import { SEO_TICKS } from '@/components/services/scroll-scenes/scenes/SeoScene';
import { SHOP_TICKS } from '@/components/services/scroll-scenes/scenes/ShopScene';
import { SOCIAL_TICKS } from '@/components/services/scroll-scenes/scenes/SocialScene';
import { WEB_TICKS } from '@/components/services/scroll-scenes/scenes/WebScene';

const PILLARS = {
  web: PILLAR_WEB_DESIGN,
  seo: PILLAR_SEO,
  ecommerce: PILLAR_ECOMMERCE,
  ads: PILLAR_GOOGLE_ADS,
  social: PILLAR_SOCIAL_MEDIA,
  automation: PILLAR_AUTOMATION,
};

describe('services page consistency', () => {
  it.each(Object.entries(PILLARS))('%s has 3 article cards that resolve to posts', (_, pillar) => {
    expect(pillar.fanCards).toHaveLength(3);
    for (const card of pillar.fanCards) expect(getPost(card.slug), card.slug).toBeDefined();
  });

  it.each(Object.entries(PILLARS))('%s has at least 4 checklist items', (_, pillar) => {
    expect(pillar.checklist.length).toBeGreaterThanOrEqual(4);
  });

  it.each(Object.entries({ WEB_TICKS, SEO_TICKS, SHOP_TICKS, ADS_TICKS, SOCIAL_TICKS, AUTO_TICKS }))(
    '%s tick in order 1,2,3,4',
    (_, ticks) => {
      expect(ticks).toHaveLength(4);
      expect([...ticks]).toEqual([...ticks].sort((a, b) => a - b));
    },
  );
});

describe('services copy is plain language', () => {
  it.each(Object.entries(PILLARS))('%s has exactly 4 scene checks', (_, pillar) => {
    expect(pillar.sceneChecks).toHaveLength(4);
  });

  it.each(Object.entries(PILLARS))('%s visible copy avoids unexplained jargon', (_, pillar) => {
    const visible = [pillar.eyebrow, pillar.headline, pillar.headlineAccent, pillar.body, ...pillar.sceneChecks].join(' ');
    for (const word of ['hand-coded', 'schema', 'SSL', 'PPC', 'Next.js', 'reels', 'keyword soup']) {
      expect(visible, word).not.toContain(word);
    }
  });
});

describe('overview cards', () => {
  it('each card has its own icon', () => {
    const icons = SYSTEM_STRIP.parts.map((p) => p.icon);
    expect(new Set(icons).size).toBe(6);
  });
});
