import type { ServicePageData } from '@/data/service-pages/types';
import { AI_AUTOMATION_PAGE } from '@/data/service-pages/ai-automation';
import { ECOMMERCE_PAGE } from '@/data/service-pages/ecommerce';
import { GOOGLE_ADS_PAGE } from '@/data/service-pages/google-ads';
import { SEO_PAGE } from '@/data/service-pages/seo';
import { SOCIAL_PAGE } from '@/data/service-pages/social-media';

/**
 * The five service pages built on the shared template. Website Design has its
 * own page (app/services/website-design) and is not part of this registry.
 */
export const SERVICE_PAGES: readonly ServicePageData[] = [
  SEO_PAGE,
  ECOMMERCE_PAGE,
  GOOGLE_ADS_PAGE,
  SOCIAL_PAGE,
  AI_AUTOMATION_PAGE,
];
