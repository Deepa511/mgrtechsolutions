/**
 * Services page copy. Every string the services page renders lives here.
 *
 * Six topics, one page, six anchor sections (spec follow-up to the original
 * 3-pillar model): Web Design & Development, SEO, E-commerce, Google Ads +
 * PPC, Social Media Management, and AI Automation. The pricing content in
 * the last four pillars is folded in from the retired /pricing route tree
 * (src/data/pricing-page.ts, seo-packages.ts, social-packages.ts). Those
 * files stay in the repo as source data, no longer route-backed.
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 */

/** S1 — Hero */
export const SERVICES_HERO = {
  breadcrumb: 'SERVICES',
  headline: 'Six services,',
  headlineAccent: 'one accountable point of contact.',
  lede:
    'You can hire six different vendors for six different things. What actually makes the phone ring is a website, SEO, e-commerce, paid ads, social media, and the follow-up that catches every inquiry, planned together and built by the person who answers the phone.',
} as const;

/** S2 — Overview strip: six anchor cards into the pillars. */
export const SYSTEM_STRIP = {
  parts: [
    {
      index: '01',
      name: 'Website Design & Development',
      line: 'Hand-coded, fast, built to be found.',
      target: '#web-design',
    },
    {
      index: '02',
      name: 'SEO',
      line: 'Pages and articles that answer real questions.',
      target: '#seo',
    },
    {
      index: '03',
      name: 'E-commerce',
      line: 'A storefront that sells while you sleep.',
      target: '#ecommerce',
    },
    {
      index: '04',
      name: 'Google Ads & PPC',
      line: 'Paid visibility today, not just data for a report.',
      target: '#google-ads',
    },
    {
      index: '05',
      name: 'Social Media Management',
      line: 'A feed that looks like an active, trusted business.',
      target: '#social-media',
    },
    {
      index: '06',
      name: 'AI Automation',
      line: 'Follow-up that never sleeps.',
      target: '#automation',
    },
  ],
} as const;

/** S3 — Pillar 01: Website Design & Development */
export const PILLAR_WEB_DESIGN = {
  eyebrow: 'PART 01 · WEBSITE DESIGN & DEVELOPMENT',
  headline: "A website that's an asset,",
  headlineAccent: 'not a brochure.',
  body:
    'Every site I build is hand-coded in modern frameworks. No templates, no page builders, no rented themes. That means it loads fast, ranks clean, and you own every line of it.',
  checklist: [
    'Custom design, built for your business, not a theme with your logo on it',
    'Hand-coded with Next.js-style modern tooling, fast on any phone',
    'Local SEO structure baked in: towns, services, schema markup',
    'Google Business Profile setup and connection',
    'Domain, hosting, SSL: set up, explained, and in your name',
    'Launch in 15 days (five weeks for e-commerce), with a private preview along the way',
  ],
  specSheetLabel: 'SPEC SHEET',
  specRows: [
    ['STACK', 'HAND-CODED, MODERN FRAMEWORK'],
    ['TEMPLATES', 'NONE, EVER'],
    ['LOAD TIME', 'UNDER 2 SECONDS, MOBILE'],
    ['OWNERSHIP', '100% YOURS'],
    ['TIMELINE', '5 WEEKS, CALL TO LAUNCH'],
    ['WHO BUILDS', 'THE PERSON YOU CALL'],
  ],
  packagesLabel: 'STARTING PACKAGES',
  packagesNote: "PRICES ARE STARTING POINTS. YOUR FINAL NUMBER IS LOCKED IN WRITING BEFORE ANY WORK BEGINS.",
  packages: [
    {
      name: 'The Site',
      price: 'FROM $X,XXX',
      pitch: 'A hand-coded website built to be found and chosen.',
      includes: [
        'Custom design, no templates, ever',
        'Mobile-first, loads in under 2 seconds',
        'Google Business Profile setup',
        'Launch in 15 days',
      ],
      goodFor: 'GOOD FOR: STARTING FROM ZERO OR REPLACING A PLACEHOLDER',
      featured: false,
    },
    {
      name: 'The System',
      price: 'FROM $X,XXX',
      pitch: 'The site plus the content and follow-up that make it ring.',
      includes: [
        'Everything in The Site',
        'Content plan + written pages & articles',
        'Contact forms with instant auto-reply',
        'AI follow-up automation for every inquiry',
      ],
      goodFor: 'GOOD FOR: BUSINESSES THAT WANT THE PHONE TO RING, NOT JUST A SITE TO EXIST',
      featured: true,
    },
    {
      name: 'The Rebuild',
      price: 'FROM $X,XXX',
      pitch: 'Your existing site, taken apart and rebuilt properly.',
      includes: [
        'Full audit of your current site',
        'Content salvage: the good stuff comes along, rewritten',
        "Redirects & SEO preservation, so you don't lose your rankings",
        'Everything in The Site',
      ],
      goodFor: "GOOD FOR: AN OLD SITE THAT'S QUIETLY COSTING YOU CALLS",
      featured: false,
    },
  ],
} as const;

/** S5 — Pillar 02: SEO */
export const PILLAR_SEO = {
  eyebrow: 'PART 02 · SEO',
  headline: 'Content that answers the questions',
  headlineAccent: 'customers ask before they call.',
  body:
    'People search their questions long before they search your name. The business that answers those questions clearly is the one that gets found, by Google and increasingly by AI assistants. I plan and write that content with you.',
  checklist: [
    'A content plan built from the questions your customers actually ask',
    'Service pages written in plain English, not keyword soup',
    'Articles that build trust and keep bringing in search traffic',
    'On-page SEO done properly: titles, structure, internal links',
    'Technical SEO audit and fixes, plus Google Business Profile management',
    'Monthly reporting, so you see what actually moved',
  ],
  /**
   * Each card links to a real, published post (checked against
   * content/blog/*.md before writing this). `slug` resolves the post via
   * `getPost()` in `src/lib/blog.ts` so the title and read time shown always
   * match the live article, and `tag`/`title`/`descriptor` are curated
   * card copy rather than the full (longer) article title.
   */
  fanCards: [
    {
      tag: 'LOCAL SEO',
      title: 'What do your customers actually type into Google?',
      example: '"best plastering job in Framingham"',
      slug: 'local-keyword-research-for-service-businesses',
      descriptor: 'ANSWERS A REAL SEARCH',
    },
    {
      tag: 'LEAD GENERATION',
      title: 'Why your phone stopped ringing, and 5 fixes',
      example: 'A customer already comparing quotes calls the business that answers first',
      slug: '5-reasons-losing-leads-online',
      descriptor: 'BUILDS TRUST',
    },
    {
      tag: 'AI & SEARCH',
      title: 'Getting found when customers ask AI, not Google',
      example: '"Who\'s a good electrician near me?" asked straight to ChatGPT',
      slug: 'how-chatgpt-finds-businesses',
      descriptor: 'KEEPS TRAFFIC COMING',
    },
  ],
  pricingNote:
    'Ongoing SEO runs $500/mo as part of the Standard marketing package, bundled with social media management. See Social Media Management below.',
} as const;

/**
 * S7 — Pillar 03: E-commerce.
 *
 * DRAFTED COPY. No existing source material anywhere in the codebase (only
 * a passing industry tag and a build-timeline caveat). Written in the
 * site's voice, modeled on the other pillars. Flagged for Srii's review
 * before publishing anything more specific (pricing, platform names).
 */
export const PILLAR_ECOMMERCE = {
  eyebrow: 'PART 03 · E-COMMERCE',
  headline: 'A storefront that sells',
  headlineAccent: 'while you sleep.',
  body:
    "A product catalog is not a website feature you bolt on later. It's a different kind of build, from checkout flow to how search engines read your categories. I build stores the same way I build service sites: hand-coded, fast, and structured so every product page can be found on its own.",
  checklist: [
    'Product catalog built to scale, from a dozen items to a full inventory',
    'Secure checkout and payment processing, set up in your name',
    'Shipping, tax, and inventory rules configured for how you actually sell',
    'Product pages structured for search, not just browsing',
    'Mobile checkout that stays under 2 seconds, cart included',
  ],
  specSheetLabel: 'HOW IT WORKS',
  specRows: [
    ['STACK', 'SAME HAND-CODED APPROACH, STORE-BUILT'],
    ['TIMELINE', '~5 WEEKS, CALL TO LAUNCH'],
    ['PRICING', 'QUOTED TO YOUR CATALOG, NOT A FLAT RATE'],
    ['OWNERSHIP', '100% YOURS, INCLUDING PAYMENT ACCOUNTS'],
  ],
} as const;

/** S9 — Pillar 04: Google Ads + PPC */
export const PILLAR_GOOGLE_ADS = {
  eyebrow: 'PART 04 · GOOGLE ADS & PPC',
  headline: 'Paid ads that pay for themselves,',
  headlineAccent: 'not just data for a report.',
  body:
    "SEO earns visibility over months. Ads buy it starting today. The keyword someone searches, the ad they see, and the page they land on all have to say the same thing. Misalignment between those three is where most wasted ad spend comes from, and it's the first thing I fix.",
  checklist: [
    'Campaign audit, keyword and competitor research to start',
    'Campaign structure built so keyword, ad, and landing page all match',
    'Conversion tracking for calls, forms, and sales, not just clicks',
    'Ongoing bid, budget, and ad-copy management every month',
    'Meta Ads (Facebook & Instagram) management included alongside Google',
    'Monthly reporting on leads and cost per lead, not vanity metrics',
  ],
  specSheetLabel: 'HOW IT’S PRICED',
  specRows: [
    ['MANAGEMENT FEE', '$999/MO'],
    ['AD SPEND', 'PAID DIRECTLY TO GOOGLE & META, NO MARKUP'],
    ['INCLUDES', 'GOOGLE ADS + META ADS MANAGEMENT'],
    ['STARTS WITH', 'A JUMPSTART PROJECT'],
    ['OWNERSHIP', 'YOUR AD ACCOUNTS, ALWAYS'],
  ],
  adSpendNote:
    'The $999 fee is management only. You pay Google and Meta directly, and if you ever leave, the accounts and their history go with you.',
} as const;

/** S11 — Pillar 05: Social Media Management */
export const PILLAR_SOCIAL_MEDIA = {
  eyebrow: 'PART 05 · SOCIAL MEDIA MANAGEMENT',
  headline: 'A feed that looks like',
  headlineAccent: 'an active, trusted business.',
  body:
    "A homeowner comparing two contractors looks both up. One has job-site reels and a post from this week. The other hasn't posted since spring. That gap decides more calls than most owners realize, and it's the part that's hardest to keep up while you're running crews all week.",
  checklist: [
    'On-site shoots turned into videos and images every month',
    'Captions written for every post',
    'Scheduling and publishing handled for you',
    'Community management: comments and messages answered',
    'Also available bundled with SEO for $500/mo as part of the Standard marketing package',
  ],
  scopeNote:
    'Pricing below is for service-based trades businesses. E-commerce and retail are scoped individually to catalog size and volume.',
  tiersLabel: 'CONTENT RETAINER TIERS',
  tiers: [
    {
      name: 'Basic',
      price: '$499/mo',
      pitch: 'One shoot a month, turned into three posts a week.',
      includes: ['1 on-site shoot/mo', '12 total posts/mo', 'Scheduling & publishing', 'Community management'],
      goodFor: 'GOOD FOR: PROVING THE MODEL',
      featured: false,
    },
    {
      name: 'Standard',
      price: '$1,082/mo',
      pitch: 'Two shoots a month and near-daily presence.',
      includes: ['2 on-site shoots/mo', '20 total posts/mo', 'Scheduling & publishing', 'Community management'],
      goodFor: 'GOOD FOR: BEING SEEN EVERY WEEK',
      featured: true,
    },
    {
      name: 'Growth',
      price: '$1,500/mo',
      pitch: 'The fullest cadence, built for scale.',
      includes: ['2 on-site shoots/mo', '28 total posts/mo', 'Scheduling & publishing', 'Community management'],
      goodFor: 'GOOD FOR: SCALING PRESENCE DELIBERATELY',
      featured: false,
    },
  ],
} as const;

/** S13 — Pillar 06: AI Automation */
export const PILLAR_AUTOMATION = {
  eyebrow: 'PART 06 · AI AUTOMATION',
  headline: 'AI automation means',
  headlineAccent: 'no lead gets forgotten.',
  body:
    "Strip away the buzzword and it's simple: when someone reaches out, they hear back in seconds, even at 11 p.m., even on a job site, even on vacation. Inquiries get acknowledged, sorted, and followed up automatically, and you get a clean summary instead of a missed opportunity.",
  checklist: [
    'Contact forms that actually reach you, and confirm instantly to the customer',
    'Automatic first replies, so every inquiry feels answered',
    "Follow-up sequences for quotes and estimates that haven't heard back",
    'Lead summaries delivered to you in plain English',
    'Built on your site, under your control, no mystery subscriptions',
  ],
  timelineLabel: 'INQUIRY TIMELINE',
  timeline: [
    { time: '11:04 PM', event: 'NEW INQUIRY', detail: '"Need an estimate for a bathroom retile"' },
    { time: '11:04 PM', event: 'AUTO-REPLY SENT', detail: '"Thanks! You\'ll hear from us by morning."' },
    { time: '11:04 PM', event: 'NOTIFICATION TO YOU', detail: 'summary in plain English' },
    { time: 'NEXT AM', event: 'YOU CALL BACK', detail: 'lead is warm, not gone' },
  ],
} as const;

/** S14 — Close (dark CTA, low-commitment variant). Phone comes from SITE. */
export const SERVICES_CLOSE = {
  eyebrow: '— FREE 10-MINUTE SITE REVIEW',
  headline: "Not sure which part you're missing?",
  body:
    "Send me your URL. I'll tell you the 3 things most likely costing you calls. Free, honest, one email.",
  callLabel: 'Call',
  secondaryCta: 'Free site review',
  secondaryHref: '/contact',
} as const;

export const SERVICES = {
  hero: SERVICES_HERO,
  systemStrip: SYSTEM_STRIP,
  pillarWebDesign: PILLAR_WEB_DESIGN,
  pillarSeo: PILLAR_SEO,
  pillarEcommerce: PILLAR_ECOMMERCE,
  pillarGoogleAds: PILLAR_GOOGLE_ADS,
  pillarSocialMedia: PILLAR_SOCIAL_MEDIA,
  pillarAutomation: PILLAR_AUTOMATION,
  close: SERVICES_CLOSE,
} as const;
