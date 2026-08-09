/**
 * Single source of truth for site-wide identity and SEO strings.
 * Update NEXT_PUBLIC_SITE_URL in the environment when the domain is live.
 */
export const site = {
  name: "Court's Product Resources",
  shortName: "Court's Product Resources",
  tagline: "Curated product management resources, without the noise.",
  description:
    "A curated index of product management resources for people transitioning in, upskilling, and navigating the industry's largest change ever. No clickbait, no overwhelming feed — just conversations, templates, and summaries.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://courtsproductresources.com",
  author: "Court Bain",
  locale: "en_AU",
  /** Shown in the masthead and colophon. */
  edition: "Volume One",
  lastUpdated: "2026-08-09",
} as const;

export const navigation = [
  { href: "#premise", label: "The Premise" },
  { href: "#voices", label: "Featured Voices" },
  { href: "#library", label: "The Library" },
  { href: "#colophon", label: "Colophon" },
] as const;
