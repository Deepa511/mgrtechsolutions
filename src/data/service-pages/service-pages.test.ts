import { describe, expect, it } from 'vitest';
import { getPost } from '@/lib/blog';
import { SERVICE_PAGES } from '@/data/service-pages';

/** Every string in a page's data, depth first. */
function strings(v: unknown, out: string[] = []): string[] {
  if (typeof v === 'string') out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, out));
  return out;
}

/** Every blog slug a page links to. */
function slugs(page: (typeof SERVICE_PAGES)[number]): string[] {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') {
      const o = v as Record<string, unknown>;
      if (typeof o.slug === 'string' && o !== (page as unknown)) out.push(o.slug);
      if (Array.isArray(o.slugs)) out.push(...(o.slugs as string[]));
      Object.values(o).forEach(walk);
    }
  };
  walk({ ...page, slug: undefined });
  return out;
}

describe.each(SERVICE_PAGES.map((p) => [p.slug, p] as const))('service page: %s', (_slug, page) => {
  it('links only to blog posts that exist', () => {
    const missing = slugs(page).filter((s) => !getPost(s));
    expect(missing).toEqual([]);
  });

  it('has the same section shape as every other page', () => {
    expect(page.problem.items).toHaveLength(4);
    expect(page.approach.checks).toHaveLength(4);
    expect(page.commitments.rows).toHaveLength(4);
    expect(page.included.categories).toHaveLength(8);
    expect(page.how.steps).toHaveLength(4);
    expect(page.success.checks).toHaveLength(7);
    expect(page.success.path).toHaveLength(3);
    expect(page.compare.columns).toHaveLength(4);
    expect(page.compare.rows).toHaveLength(6);
    for (const r of page.compare.rows) expect(r.cells).toHaveLength(4);
    expect(page.industries.items).toHaveLength(4);
    expect(page.guides.groups).toHaveLength(3);
    expect(page.faq.items.length).toBeGreaterThanOrEqual(10);
    expect(page.pricing.plans.length).toBeGreaterThanOrEqual(1);
    expect(page.pricing.plans.length).toBeLessThanOrEqual(3);
    expect(page.pricing.facts).toHaveLength(3);
    expect(page.timeline.phases.length).toBeGreaterThanOrEqual(3);
    expect(page.timeline.phases.length).toBeLessThanOrEqual(5);
  });

  it('shows no real prices, no company-size claims and no em dashes', () => {
    const text = strings(page).join('\n');
    expect(text).not.toMatch(/\$\s?\d/);
    expect(text).not.toMatch(/\bone[-\s]person\b|\bsolo\b/i);
    expect(text).not.toMatch(/—/);
  });

  it('keeps the page title, description and slug sensible', () => {
    expect(page.meta.title.length).toBeGreaterThan(2);
    expect(page.meta.description.length).toBeLessThanOrEqual(200);
    expect(page.slug).toMatch(/^[a-z-]+$/);
  });

  it('gives every phase a unique key and a positive weight', () => {
    const keys = page.timeline.phases.map((p) => p.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const p of page.timeline.phases) expect(p.weight).toBeGreaterThan(0);
  });

  it('uses a one-path icon for every included area', () => {
    for (const c of page.included.categories) {
      expect(c.icon.length).toBeGreaterThan(10);
      expect(c.items.length).toBeGreaterThanOrEqual(4);
    }
  });
});
