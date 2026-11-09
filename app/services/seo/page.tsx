import type { Metadata } from 'next';
import ServicePage from '@/components/services/service-page/ServicePage';
import { SEO_PAGE } from '@/data/service-pages/seo';

export const metadata: Metadata = {
  title: SEO_PAGE.meta.title,
  description: SEO_PAGE.meta.description,
  alternates: { canonical: '/services/seo' },
};

export default function Page() {
  return <ServicePage data={SEO_PAGE} />;
}
