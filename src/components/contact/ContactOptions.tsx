import Reveal from '@/components/motion/Reveal';

const OPTIONS = [
  {
    index: '01',
    name: 'Talk to a Human',
    line: 'Call or email, one point of contact, no handoffs.',
    target: '#talk',
  },
  {
    index: '02',
    name: 'Free Site Review',
    line: 'Send your URL, get the 3 things costing you calls.',
    target: '#review',
  },
  {
    index: '03',
    name: 'Request a Quote',
    line: 'Tell me what you need, get a real starting number.',
    target: '#quote',
  },
  {
    index: '04',
    name: 'Refer & Earn',
    line: "Send a business my way, and I'll thank you when they sign on.",
    target: '#refer',
  },
] as const;

/** Contact page — four-door selector, same pattern as Services' SystemStrip. */
export default function ContactOptions() {
  return (
    <section className="bg-cream-50 py-16" aria-labelledby="contact-options-heading">
      <div className="container-page">
        <h2 id="contact-options-heading" className="sr-only">
          Four ways to start
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OPTIONS.map((option, i) => (
            <Reveal key={option.index} delay={i * 0.08}>
              <a
                href={option.target}
                className="block h-full rounded-2xl border border-cream-300 bg-cream-100 p-8 transition-colors hover:border-accent-ink"
              >
                <p className="eyebrow text-accent-ink">{option.index}</p>
                <p className="h3-card mt-4 font-medium text-forest-950">{option.name}</p>
                <p className="mt-3 text-[1.0625rem] leading-[1.7] text-ink-soft">{option.line}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
