import type { Metadata } from 'next';
import ServicePage from '@/components/services/service-page/ServicePage';
import { GOOGLE_ADS_PAGE } from '@/data/service-pages/google-ads';

export const metadata: Metadata = {
  title: GOOGLE_ADS_PAGE.meta.title,
  description: GOOGLE_ADS_PAGE.meta.description,
  alternates: { canonical: '/services/google-ads' },
};

export default function Page() {
  return <ServicePage data={GOOGLE_ADS_PAGE} />;
}
