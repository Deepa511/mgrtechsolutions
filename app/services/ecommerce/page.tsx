import type { Metadata } from 'next';
import ServicePage from '@/components/services/service-page/ServicePage';
import { ECOMMERCE_PAGE } from '@/data/service-pages/ecommerce';

export const metadata: Metadata = {
  title: ECOMMERCE_PAGE.meta.title,
  description: ECOMMERCE_PAGE.meta.description,
  alternates: { canonical: '/services/ecommerce' },
};

export default function Page() {
  return <ServicePage data={ECOMMERCE_PAGE} />;
}
