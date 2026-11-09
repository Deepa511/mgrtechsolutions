import Image from 'next/image';
import { heroPhotoFor } from '@/lib/hero-photo';
import WireframeBall from '@/components/motion/WireframeBall';

/**
 * The layer behind a service page's title: exactly the home page hero's
 * animation (the same WireframeBall with its default settings, plus the same
 * soft green glow), with an optional darkened photo
 * (public/hero/<slug>.webp) under it. Decorative only: it takes no clicks and
 * is hidden from screen readers. WireframeBall pauses off screen and paints
 * one still frame under reduced motion.
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
      <WireframeBall />
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
