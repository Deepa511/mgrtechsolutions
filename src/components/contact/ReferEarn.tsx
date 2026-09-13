import { SITE } from '@/data/site';

/**
 * DOOR 04 · Refer & Earn.
 *
 * No referral program terms exist yet — this is deliberately generic,
 * non-numeric placeholder copy (no invented dollar amounts or discount
 * percentages) until Srii sets the actual reward and conditions.
 */
export default function ReferEarn() {
  return (
    <div>
      <p className="eyebrow text-accent-ink">DOOR 04 · REFER &amp; EARN</p>
      <p className="eyebrow mt-6 text-ink-soft">THE THANK-YOU WAY</p>
      <h2 className="h3-card mt-3 font-medium text-forest-950">Know a business that needs this?</h2>

      <p className="mt-5 max-w-md text-[1.0625rem] leading-[1.7] text-ink-soft">
        Most of my work already comes from referrals. Send someone my way, and if they become a
        client, there&rsquo;s a thank-you in it for you. Reach out and I&rsquo;ll walk you through
        exactly how it works.
      </p>

      <a
        href={`mailto:${SITE.email}?subject=${encodeURIComponent('Referral')}`}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-forest-950/25 px-6 py-3 font-medium text-forest-950 transition-colors hover:border-accent-ink hover:text-accent-ink"
      >
        Ask about referring someone
      </a>
    </div>
  );
}
