import Reveal from '@/components/motion/Reveal';
import ServiceCard from '@/components/services/ServiceCard';
import { SYSTEM_STRIP } from '@/data/services';

/** S2 — System overview strip: six anchor cards into the pillars. All appear together. */
export default function SystemStrip() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="system-strip-heading">
      <div className="container-page">
        <h2 id="system-strip-heading" className="sr-only">
          The system, at a glance
        </h2>
        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {SYSTEM_STRIP.parts.map((part) => (
              <ServiceCard key={part.index} {...part} cta={SYSTEM_STRIP.cta} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
