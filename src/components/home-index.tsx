import Link from "next/link";
import { themes } from "@/data/resources";
import { voices } from "@/data/voices";
import { ArrowUpRight } from "@/components/icons";

/**
 * The home page is a shop window rather than a container: each destination
 * shows a genuine taste of what's behind it, not a generic blurb.
 *
 * Each takes one of the section stocks, so the home page is where the
 * whole palette is seen at once and the rest of the site is recognisable
 * as coming from it.
 */
const destinations = [
  {
    href: "/library",
    eyebrow: "The Library",
    title: "Everything worth your time, in one place.",
    teaser:
      "Articles, podcasts, videos, books and templates. Searchable, filterable, grouped by theme.",
    stock: "var(--color-sage)",
    ink: "var(--color-pine)",
    taste: themes,
  },
  {
    href: "/top-picks",
    eyebrow: "Top Picks",
    title: "The five people I come back to most.",
    teaser:
      "When I need a straight answer, I start here, because they actually know what they're talking about.",
    stock: "var(--color-butter)",
    ink: "var(--color-olive)",
    taste: voices.map((voice) => voice.name),
  },
  {
    href: "/quiz",
    eyebrow: "Find Your Fit",
    title: "Which product specialism fits you?",
    teaser:
      "Six questions on the work you actually reach for. No personality test, and nobody gets matched to an influencer.",
    stock: "var(--color-sky)",
    ink: "var(--color-slate)",
    taste: [
      "Discovery",
      "Growth",
      "Platform",
      "Marketing",
      "Delivery",
      "Adoption",
    ],
  },
  {
    href: "/premise",
    eyebrow: "The Premise",
    title: "No clickbait. No overwhelming feed.",
    teaser:
      "Just conversations, templates, and summaries on product management: to get you in, or lift you up.",
    stock: "var(--color-blush)",
    ink: "var(--color-rust)",
    taste: ["Picked by a person", "Never by an algorithm"],
  },
  {
    href: "/about",
    eyebrow: "About Me",
    title: "Curated by Courtney Bain.",
    teaser:
      "Group Product Manager for Small Business at MYOB, who came to product through marketing and never stopped asking whether people would pay for it.",
    stock: "var(--color-lilac)",
    ink: "var(--color-plum)",
    taste: ["MYOB", "Cashrewards", "Rokt"],
  },
] as const;

export function HomeIndex() {
  return (
    <section aria-labelledby="index-title">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <h2 id="index-title" className="eyebrow text-ink-muted">
          What&rsquo;s Inside
        </h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <li key={destination.href}>
              <Link
                href={destination.href}
                style={{ backgroundColor: destination.stock }}
                className="group flex h-full flex-col rounded-card p-7 transition-transform duration-300 hover:-translate-y-1"
              >
                <p
                  style={{ color: destination.ink }}
                  className="eyebrow"
                >
                  {destination.eyebrow}
                </p>

                <h3 className="mt-4 flex items-start gap-2 text-2xl text-ink lg:text-[1.75rem]">
                  <span>{destination.title}</span>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </h3>

                <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-ink-soft">
                  {destination.teaser}
                </p>

                <ul
                  aria-hidden="true"
                  className="mt-auto flex flex-wrap gap-1.5 pt-8"
                >
                  {destination.taste.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-ink/20 px-2.5 py-1 text-xs text-ink-soft transition-colors duration-300 group-hover:border-ink/45"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
