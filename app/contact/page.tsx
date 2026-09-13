import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactOptions from '@/components/contact/ContactOptions';
import DirectDoor from '@/components/contact/DirectDoor';
import ReviewForm from '@/components/contact/ReviewForm';
import QuoteForm from '@/components/contact/QuoteForm';
import ReferEarn from '@/components/contact/ReferEarn';
import Reassurance from '@/components/contact/Reassurance';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Call and talk to the person who would build your site, send your URL for a free review, request a straight-number quote, or refer a business our way.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactOptions />
      <section className="bg-cream-50 py-20 md:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div id="talk" className="scroll-mt-24">
            <DirectDoor />
          </div>
          <div id="review" className="scroll-mt-24">
            <ReviewForm />
          </div>
        </div>
      </section>
      <section className="bg-cream-100 py-20 md:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div id="quote" className="scroll-mt-24">
            <QuoteForm />
          </div>
          <div id="refer" className="scroll-mt-24">
            <ReferEarn />
          </div>
        </div>
      </section>
      <Reassurance />
    </>
  );
}
