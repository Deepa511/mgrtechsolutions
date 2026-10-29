import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { getPost } from '@/lib/blog';

export type ArticleCard = {
  tag: string;
  title: string;
  example: string;
  slug: string;
  descriptor: string;
};

/**
 * Article cards rendered under each scroll scene. Every service gets the same
 * block: three posts that go deeper on the service. Each card resolves its
 * post via getPost() so the read time always matches the live article.
 */
export default function ServiceArticles({
  id,
  label,
  cards,
}: {
  id: string;
  label: string;
  cards: readonly ArticleCard[];
}) {
  return (
    <section className="py-12 md:py-16" aria-labelledby={id}>
      <div className="container-page">
        <Reveal>
          <p id={id} className="eyebrow text-ink-soft">{label}</p>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cards.map((card, i) => {
            const post = getPost(card.slug);
            if (!post) return null;
            return (
              <Reveal key={card.slug} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full rounded-2xl border border-cream-300 bg-cream-100 p-6 transition-colors hover:border-accent-ink"
                >
                  <p className="eyebrow text-accent-ink">{card.tag}</p>
                  <p className="mt-3 text-[1.0625rem] font-medium leading-[1.4] text-forest-950">{card.title}</p>
                  <p className="mt-2 text-sm italic text-ink-soft">{card.example}</p>
                  <p className="mt-3 text-sm text-ink-soft">{post.readTime} MIN READ · {card.descriptor}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
