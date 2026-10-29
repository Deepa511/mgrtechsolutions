# MGRTECH Site — Current Status

**Updated:** 2026-09-13
**Live:** https://www.mgrtechsolutionsinc.com (Vercel, deploys from `main`)
**Spec (authority):** `docs/superpowers/specs/2026-08-25-mgrtech-site-rebuild-design.md`

> **Read this first.** This file is the current state of the site. The spec is
> the design authority; this is what has actually shipped and what is left.
>
> **Committed and pushed to `main` on 2026-09-13.** Verify the live site
> against `git log` if you need to confirm Vercel has deployed the latest
> commit — this file doesn't track deploy status.

---

## Where the site stands

The original nine-phase rebuild shipped and the domain cutover is complete —
`mgrtechsolutionsinc.com` serves the Next.js build, not the old Vite SPA. A
second restructure landed 2026-09-13 (see below): `/work` and `/pricing` were
retired as standalone routes, Services absorbed the pricing content and grew
to six topics, and Contact grew from two doors to four.

**Routes live:** `/` · `/about` · `/blog` (132 posts, 6 categories) · `/contact` ·
`/faq` · `/industries` · `/process` · `/services`

**Retired:** `/work` and `/pricing` (+ `/website-cost`, `/seo`, `/social`) no
longer exist as routes — see "Changed on 2026-09-13" below for where their
content went.

**Health:** 112 tests passing (7 files) · `verify:copy` passing · `next build`
clean, 146 static/SSG pages.

---

## Changed on 2026-09-13 (navigation, industries, and card polish)

1. **Fixed nav clicks not scrolling.** Next's `<Link>` is a no-op when the
   href matches the current URL exactly, so clicking a nav item while
   already on that page did nothing. `navbar-mgrtech.tsx` now runs every
   nav click (top-level and dropdown) through a shared handler that detects
   the same-page case, `preventDefault()`s, and scrolls via the shared Lenis
   instance (`src/lib/lenis-instance.ts`) instead. `SmoothScroll.tsx` gained
   a companion effect that lands on the right spot (a hash target, or the
   top) on every genuine route change too.
2. **Services and Industries are now dropdowns in the nav.** Clicking the
   label still opens the full page; a separate chevron (and hovering the
   group) reveals the sub-sections, each linking to an anchor on that page
   (`/services#seo`, `/industries#auto-motorsports`, etc.) via the same
   click handler above.
3. **Industries' 4 cards are now expand-in-place accordions**, not links to
   `/contact`. Clicking a card reveals original, purpose-written content
   (an intro paragraph + 4 bullet points) per industry — checked against
   a competitor's industries page for anything to reference and found
   nothing substantive there to copy, so this is authored fresh. Arriving
   via the new nav dropdown auto-opens the matching card.
4. **Services' SEO cards now show a concrete example** under each title
   (e.g. `"best plastering job in Framingham"` for the local-SEO card), and
   the AI & Search card's title reverted to "Getting found when customers
   ask AI, not Google" per feedback.
5. **Removed duplicate eyebrow/breadcrumb text** on Services, Industries,
   Contact, Process, and the Blog index — each previously repeated the same
   word the breadcrumb directly above it already said (e.g. breadcrumb
   "SERVICES" immediately followed by an eyebrow reading "— SERVICES";
   Process's "— THE PROCESS" against a "PROCESS" breadcrumb was the same
   pattern with an extra "THE"). About and FAQ were left alone since their
   eyebrows say something different ("THE STUDIO", "FREQUENTLY ASKED").
6. **About's "Four Rules" cards** now read in sentence case ("Honesty over
   impressiveness") instead of all-caps ("HONESTY OVER IMPRESSIVENESS").

---

## Changed on 2026-09-13 (copy and design polish pass)

A site-wide content and consistency pass, on top of the restructure below.

1. **Fixed a real numbering bug.** The homepage's visible "SECTION 0N" band
   labels (`BANDS` in `src/data/home.ts`) started at 02, not 01, because the
   Hero section has no band of its own. Renumbered 01 through 07.
2. **Fixed a real content gap on `/process`.** The homepage correctly
   itemizes the 90-minute client time budget as 60 (call) + 15 (preview
   review) + 15 (refine review). `/process`'s own `WEEK_TIMELINE` only
   surfaced one 15-minute touchpoint and buried the second inside a
   "Week 3–4 Build" step chipped `0 MIN`, so its own chips summed to 75, not
   90. Split into separate Week 3 (Build) and Week 4 (Review and refine)
   steps so the two pages now agree.
3. **Removed every em dash from rendered site copy** (kept the leading
   `— LABEL` eyebrow/kicker convention, which is a deliberate visual marker
   applied identically on every page, not a sentence-joining dash). Replaced
   mid-sentence dashes with periods, commas, or colons depending on what
   read most plainly. Scope: `home.ts`, `services.ts`, `industries.ts`,
   `process.ts`, `about.ts`, `faq.ts`, `blog-categories.ts`, every
   `app/**/page.tsx` metadata description, and inline copy across
   `contact/*.tsx`, `home/Stages.tsx`, `home/StageSegment.tsx`,
   `navbar-mgrtech.tsx`, and the blog route chrome. The 4 retired `/pricing`
   data files were left alone (confirmed dead, not rendered anywhere).
4. **Rewrote casual/jargon copy.** Dropped the word "system" from the
   Services and Industries hero copy; rewrote the homepage's "HOW THE WORK
   ACTUALLY WORKS" kicker; removed redundant one-line taglines that added
   ambiguity without new information (`HERO.strapline` on the homepage,
   `PROCESS_HERO.countdown.caption`, About's `headlineAccent: 'On purpose.'`,
   Contact's rhetorical `"None of them are a form you'll regret."`).
5. **Services pillars now show their full title**, not just "PART 0N" — each
   pillar's `eyebrow` is now e.g. `'PART 01 · WEBSITE DESIGN & DEVELOPMENT'`.
6. **Removed the 5 connector strips** between Services pillars
   ("EVERYTHING FEEDS THE PHONE" etc.) — bare text banners with no other
   content. `Connector.tsx` deleted, confirmed unused elsewhere.
7. **Services' 3 SEO "fan cards" are real, clickable links now.** They used
   to be static text with invented read-times and no `href`. Each now links
   to a real post via `getPost()` in `src/lib/blog.ts` (so title/read-time
   never drift from the actual article): local keyword research, the
   "phone stopped ringing" lead-loss post, and the ChatGPT recommendation
   post. One of the original 3 card topics ("plastering job cost in
   Framingham") had no matching post anywhere in the 132 articles and was
   rewritten around a real Local SEO post instead of left dangling.
8. **Contact page now frames the "already have a site?" choice** explicitly
   in the hero lede, ahead of the 4-option card grid.
9. **Blog now matches the site's dark-hero theme.** All three blog routes
   (`/blog`, `/blog/category/[slug]`, `/blog/[slug]`) previously used a
   different, lighter hero shell with no breadcrumb and no accent-span
   headline. Rebuilt to the same `dot-grid on-dark bg-forest-950` shell as
   every other page. Also fixed two instances of a card sitting at the same
   background shade as its section (invisible layering): the blog index's
   category tiles and the category/article pages' `ArticleCard` grids.
   Rewrote the 6 category taglines from casual sentence fragments to plain,
   complete descriptions.

**Known inconsistency, flagged rather than fixed (not clearly in scope of
this pass):** the homepage's own closing CTA (`DUAL_CLOSE` in `home.ts`)
still says "TWO WAYS TO START" (call or free review), while `/contact` now
offers four ways (call, review, quote, referral). Both are internally
correct for their own scope, but a visitor bouncing between the two pages
could notice the count differs. Worth a decision: either the homepage CTA
stays intentionally minimal (2 of the 4, the two lowest-commitment options),
or it should be updated to mention all 4.

---

## Changed on 2026-09-13 (restructure)

A site-wide restructure: nav trimmed to Home / Services / Industries / Process
/ Blog / About / FAQ / Contact.

1. **`/work` retired.** Its 7-project grid and LIVE/DEMO legend already
   overlapped the homepage's own portfolio section (`WorkSection.tsx`), which
   showed only 5 of the 7. The 2 missing projects (Chaubandi Boutique, Route
   126 Exotic Puppies) were added to `src/data/work-showcase.ts` so the
   homepage now shows all 7, and the homepage's "See all projects" button
   (which pointed at `/work`) was removed since there's nowhere left to link
   to. `src/components/work/WorkHero.tsx`, `LegendStrip.tsx`, `CaseBlocks.tsx`,
   and `EighthSlot.tsx` were deleted; `WorkShowcaseGrid`/`WorkShowcaseCard`
   stayed, since the homepage depends on them.
2. **`/pricing` and its 3 sub-pages retired**, folded into an expanded
   `/services`. Their data files (`pricing-page.ts`, `website-cost-guide.ts`,
   `seo-packages.ts`, `social-packages.ts`) stayed in the repo as source data
   for the new Services pillars, no longer route-backed.
3. **Services grew from 3 pillars to 6**: Website Design & Development, SEO,
   E-commerce, Google Ads & PPC, Social Media Management, and AI Automation —
   one page, six anchor-linked sections, same `SystemStrip` card pattern
   extended to 6 cards. **E-commerce copy is drafted, not sourced** — no
   existing material existed anywhere in the codebase for it; flagged in
   `src/data/services.ts` for Srii's review before treating it as final.
4. **Contact grew from two doors to four**: Talk to a Human, Free Site Review
   (both pre-existing), plus new Request a Quote (`QuoteForm.tsx`, posts to
   new `/api/quote`) and Refer & Earn (`ReferEarn.tsx`, deliberately generic
   placeholder copy — no referral reward/terms exist yet, and none were
   invented). A **"Book a Slot" scheduling option was deliberately left out**
   — no real booking link exists, and CLAUDE.md rule 10 forbids linking a
   placeholder one. Add it once a real link exists.
5. **Card hover/click pass**: Industries' 4 audience cards now link to
   `/contact` with the `SystemStrip` hover-border treatment (previously
   static, non-clickable). New Social Media pricing-tier cards on Services
   got the same treatment.
6. **Two dangling links fixed** as a side effect of the routes above:
   `src/data/process.ts`'s "See pricing" CTA and the homepage's
   `PricingPreview.tsx` CTA both pointed at the now-gone `/pricing` — both
   repointed to `/services`.

**Known pre-existing issue, not touched by this pass:** the homepage's
`WORK.legend`/lede text in `src/data/home.ts` says "three live, two demos,"
which was already stale before this change (the data has always had more
than 2 non-live entries) and is now more visibly wrong with 7 tiles instead
of 5. Worth a copy pass.

---

## Changed on 2026-09-05

Merged `fix/stat-sourcing` into `main`. Three commits:

1. **Every homepage statistic now carries a source.** Figures live in
   `src/data/home.ts` with a `sources:` array beside the claim.
2. **Two claims removed** because they did not survive being traced — a Drift
   number measured on B2B SaaS companies, and a survey finding that had been
   restated into something it never said. Both had been live for months.
3. **Missed-call figure reframed** across two studies (411 Locals 2024 for small
   businesses generally, Invoca 2023 for home services specifically) rather than
   resting on one.
4. **Hero headline changed** to *"You've paid for a website before. / It looked
   fine. It never rang."*
5. **New guard in `scripts/verify-copy.mjs`** — warns when a string of 60+ chars
   in `src/data/*.ts` contains a percentage or an "N times more likely"
   construction with no `sources`/`proofSource` key in the same export block.
   It checks that attribution *exists*, not that it is correct. That part is a
   reading job.

**Decisions taken the same day, so they are not re-litigated:**
- A second hero "kicker" line was written and **dropped** — it said nearly the
  same thing as the new headline, and two competing hooks above the fold weaken
  each other.
- A `/mockup` homepage prototype was built as a throwaway and **deleted**. It is
  not coming back. Ignore any reference to it.

---

## Still open

| Item | Detail |
|---|---|
| **Real pricing** | Still `$X,XXX` placeholders, now surfaced on `/services` (Web Design pillar) via `src/data/services.ts`'s `PILLAR_WEB_DESIGN.packages`, sourced from `pricing-page.ts`. Needs real numbers from Srii. |
| **E-commerce copy** | `PILLAR_ECOMMERCE` in `src/data/services.ts` is drafted, not sourced — no existing material existed for this topic anywhere in the codebase. Needs Srii's review. |
| **Referral program terms** | `ReferEarn.tsx` on `/contact` runs deliberately generic, non-numeric copy — no reward amount, discount, or conditions have been set. Needs Srii's decision before it can say anything specific. |
| **Resend domain verification** | Leads send from `onboarding@resend.dev`, which **only delivers to the account address**. Verify `mgrtechsolutionsinc.com` in Resend so leads arrive from a branded address. Highest-value open item — it affects whether leads land. This now also covers the new `/api/quote` route. |
| **Testimonial permission** | Two quotes run as disclosed placeholders. |
| **Calendly / booking link** | No URL exists. "Book a Slot" was deliberately left off the 2026-09-13 Contact rebuild for this reason — add it once a real link exists (spec §11). |
| **Logo** | PNG + app icons done. An SVG would be sharper. |
| **Pre-existing lint error** | `src/components/contact/ReviewForm.tsx:22` — `setState` inside an effect. Present on `main` before this work; not a regression. |

---

## Traps for a fresh session

- **The plan checkboxes are stale.** All 226 boxes across `docs/superpowers/plans/`
  read `[ ]` even though the work shipped. Do not read them as outstanding.
  Completion is evidenced by git history and the live site.
- **`C:\Clients\Site Information\app`** is the retired Vite SPA. Reference only,
  never deployed (spec §12). Its duplicated blog content was archived to
  `C:\Clients\_mgrtech_duplicates_archive` on 2026-09-04, so it will not build
  until restored — see that folder's README.
- **`C:\Dev\mgrtech-site` and `C:\Clients\mgrtech-site`** are two checkouts of a
  legacy scaffold repo. Each holds something the other lacks (Dev has a unique
  design spec; Clients has an untracked logo). Neither is safely deletable
  without merging them first. Unresolved.
- **Hard rules live in `CLAUDE.md`** and are machine-enforced: the retired phone
  number `508-306-1802` must appear nowhere, and no copy may claim the company
  is one person. `npm run verify:copy` fails the build on both.

## Services scroll scenes (branch `feature/scroll-scenes`)

`/services` now renders six pinned, scroll-driven scenes from
`src/components/services/scroll-scenes/`, fed from `src/data/services.ts`
(first four checklist items), each followed by a `ServiceDetails` block with
the specs, packages, tiers and timeline. Section ids are unchanged. Scene
mock colours are `--color-sc-*` tokens in `@theme`. Scene text (competitor
names, review counts, "25 leads", "$60 per lead", "7 calls") is illustrative
placeholder. Copy rewritten in plain language (4 scene checks per service, EXAMPLE label on scenes). OPEN: confirm launch time (15 days vs 5 weeks) before stating it. Each service shows 3 article cards below its scene (no pricing or spec content on this page). Not yet checked in a real browser: Lenis rewind and anchor jumps,
reduced motion, 390px.

Overview cards on /services have drawn-on line icons (ServiceIcon.tsx, all six draw together, static under reduced motion); hero paragraph widened to max-w-3xl.

Overview cards: hover lift, icon redraw and idle loops, pointer glow, slide-in "See how it works" arrow (ServiceCard.tsx). Hero second line reads "to get more calls, with one point of contact."
