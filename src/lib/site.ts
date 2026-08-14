/**
 * Single source of truth for site-wide identity and SEO strings.
 * Update NEXT_PUBLIC_SITE_URL in the environment when the domain is live.
 */
export const site = {
  name: "Court's Product Resources",
  tagline: "Curated product management resources, without the noise.",
  description:
    "A curated collection of product management resources for people transitioning, upskilling, and navigating the industry's largest change ever. Conversations, templates, and summaries, chosen by hand and never by algorithm.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://courtsproductresources.com",
  author: "Courtney Bain",
  locale: "en_AU",
  lastUpdated: "2026-08-09",
} as const;

/**
 * Every section is its own route; the home page is an index of them.
 * Ordered who and why first, then the content itself, with the call to
 * action last.
 */
export const navigation = [
  { href: "/about", label: "About" },
  { href: "/premise", label: "The Premise" },
  { href: "/library", label: "The Library" },
  { href: "/top-picks", label: "Top Picks" },
  { href: "/quiz", label: "Find Your Fit" },
  { href: "/suggest", label: "Suggest" },
] as const;
