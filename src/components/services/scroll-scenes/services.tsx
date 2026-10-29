'use client';

import ScrollSection, { type SectionProps } from '@/components/services/scroll-scenes/ScrollSection';
import WebScene, { WEB_TAG, WEB_TICKS } from '@/components/services/scroll-scenes/scenes/WebScene';
import SeoScene, { SEO_TAG, SEO_TICKS } from '@/components/services/scroll-scenes/scenes/SeoScene';
import ShopScene, { SHOP_TAG, SHOP_TICKS } from '@/components/services/scroll-scenes/scenes/ShopScene';
import AdsScene, { ADS_TAG, ADS_TICKS } from '@/components/services/scroll-scenes/scenes/AdsScene';
import SocialScene, { SOCIAL_TAG, SOCIAL_TICKS } from '@/components/services/scroll-scenes/scenes/SocialScene';
import AutoScene, { AUTO_TAG, AUTO_TICKS } from '@/components/services/scroll-scenes/scenes/AutoScene';

type Override = Partial<Omit<SectionProps, 'Scene' | 'tag' | 'ticks'>>;

const DEFAULTS: Record<string, Omit<SectionProps, 'flip' | 'length'>> = {
  web: {
    id: 'web-design', eyebrow: 'PART 01 · WEBSITE DESIGN & DEVELOPMENT',
    heading: "A website that's an asset,", accent: 'not a brochure.',
    body: 'Built by hand for your business: fast on any phone, easy for Google to read, and every line of it belongs to you.',
    checks: ['Custom design, no templates', 'Loads in under 2 seconds on a phone', 'Local search structure built in', 'Domain and hosting in your name'],
    tag: WEB_TAG, ticks: WEB_TICKS, Scene: WebScene,
  },
  seo: {
    id: 'seo', eyebrow: 'PART 02 · SEO',
    heading: 'Be the business they find', accent: 'when they search.',
    body: 'Customers search long before they call. We build the pages, profile and content that move you from page two to the top of the map.',
    checks: ['A page for every town you work in', 'Google Business Profile set up and kept current', "Articles that answer customers' questions", 'Monthly report, so you see what moved'],
    tag: SEO_TAG, ticks: SEO_TICKS, Scene: SeoScene,
  },
  shop: {
    id: 'ecommerce', eyebrow: 'PART 03 · E-COMMERCE',
    heading: 'A storefront that sells', accent: 'while you sleep.',
    body: 'Products, secure checkout, shipping and tax, built so every product page can be found on its own.',
    checks: ['Catalog built to scale', 'Secure checkout in your name', 'Shipping, tax and stock rules set up', 'Product pages structured for search'],
    tag: SHOP_TAG, ticks: SHOP_TICKS, Scene: ShopScene,
  },
  ads: {
    id: 'google-ads', eyebrow: 'PART 04 · GOOGLE ADS & PPC',
    heading: 'Paid ads that pay for themselves,', accent: 'not just data for a report.',
    body: 'SEO earns visibility over months. Ads buy it starting today, and the search, the ad and the page they land on all say the same thing.',
    checks: ['Keyword, ad and landing page all match', 'Tracking for calls, forms and sales', 'Bids, budget and ad copy managed monthly', 'Reports on leads and cost per lead'],
    tag: ADS_TAG, ticks: ADS_TICKS, Scene: AdsScene,
  },
  social: {
    id: 'social-media', eyebrow: 'PART 05 · SOCIAL MEDIA MANAGEMENT',
    heading: 'A feed that looks like', accent: 'an active, trusted business.',
    body: 'A homeowner comparing two contractors looks both up. The one with a recent post and real job photos gets the call.',
    checks: ['On-site shoots turned into posts', 'Captions written for every post', 'Scheduled and published for you', 'Comments and messages answered'],
    tag: SOCIAL_TAG, ticks: SOCIAL_TICKS, Scene: SocialScene,
  },
  auto: {
    id: 'automation', eyebrow: 'PART 06 · AI AUTOMATION',
    heading: 'No lead gets', accent: 'forgotten.',
    body: "When someone reaches out, they hear back in seconds, even at 11 PM, even while you're on a job site. You get a clear summary instead of a missed opportunity.",
    checks: ['Instant confirmation to the customer', 'Automatic first reply, any hour', 'Follow-ups on quotes that went quiet', 'Plain-English lead summary for you'],
    tag: AUTO_TAG, ticks: AUTO_TICKS, Scene: AutoScene,
  },
};

const make = (key: keyof typeof DEFAULTS, flip: boolean) =>
  function Section(props: Override & { length?: number }) {
    return <ScrollSection {...DEFAULTS[key]} flip={flip} {...props} />;
  };

export const WebsiteSection = make('web', false);
export const SeoSection = make('seo', true);
export const EcommerceSection = make('shop', false);
export const AdsSection = make('ads', true);
export const SocialSection = make('social', false);
export const AutomationSection = make('auto', true);

/** All six in order. Pass length (vh) to change the scroll length of every section. */
export default function ServicesScenes({ length = 300 }: { length?: number }) {
  return (
    <>
      <WebsiteSection length={length} />
      <SeoSection length={length} />
      <EcommerceSection length={length} />
      <AdsSection length={length} />
      <SocialSection length={length} />
      <AutomationSection length={length} />
    </>
  );
}
