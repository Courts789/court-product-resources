/**
 * Single source of truth for site-wide identity and SEO strings.
 * Update NEXT_PUBLIC_SITE_URL in the environment when the domain is live.
 */
export const site = {
  name: "Court's Product Resources",
  tagline: "Curated product management resources, without the noise.",
  description:
    "A curated collection of product management resources for people transitioning, upskilling, and navigating the industry's largest change ever. Conversations, templates, and summaries — chosen by hand, never by algorithm.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://courtsproductresources.com",
  author: "Courtney Bain",
  locale: "en_AU",
  lastUpdated: "2026-08-09",
} as const;

/**
 * Hash targets are prefixed with "/" so they resolve from any route,
 * including the library page.
 */
export const navigation = [
  { href: "/#premise", label: "The Premise" },
  { href: "/#about", label: "About" },
  { href: "/#voices", label: "Top Picks" },
  { href: "/library", label: "The Library" },
] as const;
