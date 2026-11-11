import Image from 'next/image';
import { heroPhotoFor } from '@/lib/hero-photo';
import HeroArt from '@/components/services/service-page/hero-art/HeroArt';
import type { Variant } from '@/components/services/service-page/hero-art/painters';

/** Which drawing each service page gets. */
const VARIANT: Record<string, Variant> = {
  'website-design': 'web',
  seo: 'seo',
  'google-ads': 'ads',
  'social-media': 'social',
  ecommerce: 'shop',
  'ai-automation': 'ai',
};

/**
 * The layer behind a service page's title: that page's own animated drawing
 * (page layouts, map contours, target rings, post cards, delivery routes or a
 * node network), faded out on the left so the title stays clean, with an
 * optional darkened photo (public/hero/<slug>.webp) under it. Decorative only:
 * it takes no clicks and is hidden from screen readers.
 */
export default function HeroBackdrop({ slug }: { slug: string }) {
  const photo = heroPhotoFor(slug);
  return (
    <div className="wd-bd" aria-hidden="true">
      {photo && (
        <>
          <Image src={photo} alt="" fill priority sizes="100vw" className="wd-bd-photo" />
          <div className="wd-bd-shade" />
        </>
      )}
      <HeroArt variant={VARIANT[slug] ?? 'seo'} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 30%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent)',
        }}
      />
    </div>
  );
}
