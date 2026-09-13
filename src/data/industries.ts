/**
 * Industries page copy. Every string the industries page renders lives here.
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 */

/** I1 — Hero */
export const INDUSTRIES_HERO = {
  breadcrumb: 'INDUSTRIES',
  headline: 'Built for businesses that',
  headlineAccent: 'live on the phone.',
  lede:
    "Every trade and local business runs differently, but the fix is the same: a site, content, and follow-up that turn a search into a phone call. Here's who I build that for.",
} as const;

/**
 * I2 — Who it's for: four expandable audience cards. Each `expanded` block
 * is original copy written for this site (not sourced from any competitor's
 * page — a rewrite pass found nothing substantive to draw from anywhere, so
 * this is authored fresh in the site's own voice).
 */
export const INDUSTRIES_GROUPS = {
  eyebrow: '— WHO I BUILD FOR',
  headline: 'Local businesses that',
  headlineAccent: 'live on the phone.',
  groups: [
    {
      id: 'trades-contractors',
      icon: 'Wrench',
      label: 'TRADES & CONTRACTORS',
      line: 'Plumbers, electricians, plasterers, tilers: businesses where one call is a real job.',
      expanded: {
        intro:
          "A homeowner searching at 9 p.m. for an emergency plumber isn't comparison-shopping for a week. They're calling whoever answers first and looks legitimate. Trust and speed decide the job before you ever meet.",
        points: [
          'Service-area pages for every town you actually work in, not just your home base',
          'License, insurance, and years in business shown without scrolling',
          'Real job photos, not stock images of someone else\'s work',
          "Instant call-to-action and missed-call text-back, so a busy job site never costs you a lead",
        ],
      },
    },
    {
      id: 'auto-motorsports',
      icon: 'Car',
      label: 'AUTO & MOTORSPORTS',
      line: 'Shops and parts suppliers where reputation and photos do the talking.',
      expanded: {
        intro:
          "Car people research before they trust a shop with a build or a daily driver. Real photos of finished work and a service menu that reads like you know cars, not like a template, are what turn a browser into a customer.",
        points: [
          'Gallery-first layout built around your actual builds and repairs',
          'A service menu structured the way customers search, by make, model, or job',
          'Parts catalogs structured so search engines can read every category',
          'Booking or estimate requests that go straight to your phone',
        ],
      },
    },
    {
      id: 'retail-ecommerce',
      icon: 'Store',
      label: 'RETAIL & E-COMMERCE',
      line: 'Boutiques and local shops that need to look as good online as they do in person.',
      expanded: {
        intro:
          "A boutique competing online isn't competing with the store down the street. It's competing with every big retailer a customer has open in another tab. The site has to carry the same charm as walking into the shop.",
        points: [
          'A storefront built to sell, with product photography given room to do the work',
          'Secure checkout and payment processing, set up in your name',
          "Local pickup or delivery options, if that's how you actually sell",
          'Mobile checkout that stays fast, since most shopping happens on a phone',
        ],
      },
    },
    {
      id: 'local-services',
      icon: 'MapPin',
      label: 'LOCAL SERVICES',
      line: "Cleaners, landscapers, repair: anyone whose customers start with 'near me.'",
      expanded: {
        intro:
          "Cleaners, landscapers, and repair businesses live and die by ‘near me’ searches and word of mouth. Showing up for the right towns, with pricing people can actually see, is what gets the call instead of the next name on the list.",
        points: [
          'Seasonal service pages that match what people search at each time of year',
          'Every town you cover mapped and structured for local search',
          'Price ranges shown honestly, so the call is a booking, not a negotiation',
          'Online quote requests that reach you the moment they\'re submitted',
        ],
      },
    },
  ],
} as const;

/** I3 — Close (dark CTA, low-commitment variant). Phone comes from SITE. */
export const INDUSTRIES_CLOSE = {
  eyebrow: '— FREE 10-MINUTE SITE REVIEW',
  headline: "Don't see your industry? Ask anyway.",
  body:
    "The same approach works everywhere a phone call is the goal. Send me your URL. I'll tell you the 3 things most likely costing you calls: free, honest, one email.",
  callLabel: 'Call',
  secondaryCta: 'Free site review',
  secondaryHref: '/contact',
} as const;

export const INDUSTRIES = {
  hero: INDUSTRIES_HERO,
  groups: INDUSTRIES_GROUPS,
  close: INDUSTRIES_CLOSE,
} as const;
