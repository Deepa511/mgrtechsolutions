import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/blog/ArticleCard';
import { getPostsByCategory } from '@/lib/blog';
import { CATEGORIES, CATEGORY_BY_SLUG } from '@/data/blog-categories';

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/blog/category/${category.slug}` },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <>
      <section className="dot-grid on-dark bg-forest-950 pb-16 pt-24">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="eyebrow text-mist">
            <Link href="/" className="transition-colors hover:text-accent">
              HOME
            </Link>
            <span className="mx-2 text-forest-700" aria-hidden="true">
              /
            </span>
            <Link href="/blog" className="transition-colors hover:text-accent">
              BLOG
            </Link>
            <span className="mx-2 text-forest-700" aria-hidden="true">
              /
            </span>
            <span className="text-accent">{category.name.toUpperCase()}</span>
          </nav>

          <p className="eyebrow mt-8 text-accent">{posts.length} ARTICLES</p>
          <h1 className="h1-page mt-4 max-w-3xl font-medium text-cream-50">{category.name}</h1>
          <p className="lede mt-6 max-w-xl text-mist">{category.tagline}</p>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.7] text-mist">
            {category.description}
          </p>
        </div>
      </section>

      <section className="bg-cream-50 py-16 md:py-20">
        <div className="container-page">
          <h2 className="sr-only">Articles in {category.name}</h2>
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-[1.0625rem] text-ink-soft">
              No articles in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
