import type { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import SystemStrip from '@/components/services/SystemStrip';
import {
  AdsSection,
  AutomationSection,
  EcommerceSection,
  SeoSection,
  SocialSection,
  WebsiteSection,
} from '@/components/services/scroll-scenes/services';
import ServiceArticles from '@/components/services/ServiceDetails';
import ServicesClose from '@/components/services/ServicesClose';
import {
  PILLAR_AUTOMATION,
  PILLAR_ECOMMERCE,
  PILLAR_GOOGLE_ADS,
  PILLAR_SEO,
  PILLAR_SOCIAL_MEDIA,
  PILLAR_WEB_DESIGN,
} from '@/data/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Website design and development, SEO, e-commerce, Google Ads and PPC, and social media management, built and managed by the person who answers the phone.',
  alternates: { canonical: '/services' },
};

/** Map a pillar's data fields onto the scroll-scene section props. */
function sceneProps(p: {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  body: string;
  sceneChecks: readonly string[];
}) {
  return {
    eyebrow: p.eyebrow,
    heading: p.headline,
    accent: p.headlineAccent,
    body: p.body,
    checks: [...p.sceneChecks],
  };
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <SystemStrip />
      <WebsiteSection {...sceneProps(PILLAR_WEB_DESIGN)} />
      <ServiceArticles id="web-articles" label="READ MORE: WEBSITES" cards={PILLAR_WEB_DESIGN.fanCards} />
      <SeoSection {...sceneProps(PILLAR_SEO)} />
      <ServiceArticles id="seo-articles" label="READ MORE: SEO" cards={PILLAR_SEO.fanCards} />
      <EcommerceSection {...sceneProps(PILLAR_ECOMMERCE)} />
      <ServiceArticles id="ecommerce-articles" label="READ MORE: E-COMMERCE" cards={PILLAR_ECOMMERCE.fanCards} />
      <AdsSection {...sceneProps(PILLAR_GOOGLE_ADS)} />
      <ServiceArticles id="google-ads-articles" label="READ MORE: GOOGLE ADS" cards={PILLAR_GOOGLE_ADS.fanCards} />
      <SocialSection {...sceneProps(PILLAR_SOCIAL_MEDIA)} />
      <ServiceArticles id="social-media-articles" label="READ MORE: SOCIAL MEDIA" cards={PILLAR_SOCIAL_MEDIA.fanCards} />
      <AutomationSection {...sceneProps(PILLAR_AUTOMATION)} />
      <ServiceArticles id="automation-articles" label="READ MORE: AUTOMATION" cards={PILLAR_AUTOMATION.fanCards} />
      <ServicesClose />
    </>
  );
}
