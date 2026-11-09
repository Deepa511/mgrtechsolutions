import type { Metadata } from 'next';
import ServicePage from '@/components/services/service-page/ServicePage';
import { SOCIAL_PAGE } from '@/data/service-pages/social-media';

export const metadata: Metadata = {
  title: SOCIAL_PAGE.meta.title,
  description: SOCIAL_PAGE.meta.description,
  alternates: { canonical: '/services/social-media' },
};

export default function Page() {
  return <ServicePage data={SOCIAL_PAGE} />;
}
