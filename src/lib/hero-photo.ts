import 'server-only';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Optional hero photo for a service page. If `public/hero/<slug>.webp`
 * exists when the site is built, its URL is returned; otherwise null and the
 * page shows the line drawing alone. Dropping a file into public/hero is all
 * it takes to add one.
 */
export function heroPhotoFor(slug: string): string | null {
  return existsSync(join(process.cwd(), 'public', 'hero', `${slug}.webp`)) ? `/hero/${slug}.webp` : null;
}
