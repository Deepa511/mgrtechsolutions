import type { Metadata } from 'next';
import ServicePage from '@/components/services/service-page/ServicePage';
import { AI_AUTOMATION_PAGE } from '@/data/service-pages/ai-automation';

export const metadata: Metadata = {
  title: AI_AUTOMATION_PAGE.meta.title,
  description: AI_AUTOMATION_PAGE.meta.description,
  alternates: { canonical: '/services/ai-automation' },
};

export default function Page() {
  return <ServicePage data={AI_AUTOMATION_PAGE} />;
}
