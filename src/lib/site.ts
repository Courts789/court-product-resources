import { libraryUpdated } from "@/data/resources.generated";

/**
 * A copy edit moves this by hand. A new library entry moves the site's date
 * on its own, because entries now arrive from the vault on a schedule and a
 * hand-kept date would always lag behind them, hiding the "New" badge.
 */
const edited = "2026-09-08";

/**
 * Single source of truth for site-wide identity and SEO strings.
 * Update NEXT_PUBLIC_SITE_URL in the environment when the domain is live.
 */
export const site = {
  name: "Court's Product Resources",
  tagline: "Curated product management resources, without the noise.",
  description:
    "A curated collection of product management resources for people transitioning, upskilling, and navigating the industry's largest change ever. Specific episodes and specific articles, chosen by a person who consumed them first.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://courtsproductresources.com",
  author: "Courtney Bain",
  locale: "en_AU",
  lastUpdated: libraryUpdated > edited ? libraryUpdated : edited,
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
  { href: "/book-reviews", label: "Book Reviews" },
  { href: "/pitch", label: "Your Pitch" },
  { href: "/suggest", label: "Suggest" },
] as const;
