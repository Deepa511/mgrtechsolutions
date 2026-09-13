import type { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import SystemStrip from '@/components/services/SystemStrip';
import PillarWebsites from '@/components/services/PillarWebsites';
import PillarContent from '@/components/services/PillarContent';
import PillarEcommerce from '@/components/services/PillarEcommerce';
import PillarGoogleAds from '@/components/services/PillarGoogleAds';
import PillarSocialMedia from '@/components/services/PillarSocialMedia';
import PillarAutomation from '@/components/services/PillarAutomation';
import ServicesClose from '@/components/services/ServicesClose';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Website design and development, SEO, e-commerce, Google Ads and PPC, and social media management, built and managed by the person who answers the phone.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <SystemStrip />
      <PillarWebsites />
      <PillarContent />
      <PillarEcommerce />
      <PillarGoogleAds />
      <PillarSocialMedia />
      <PillarAutomation />
      <ServicesClose />
    </>
  );
}
