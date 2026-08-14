import Link from "next/link";
import { themes } from "@/data/resources";
import { voices } from "@/data/voices";
import { ArrowUpRight } from "@/components/icons";

/**
 * The home page is a shop window rather than a container: each destination
 * shows a genuine taste of what's behind it, not a generic blurb.
 */
const destinations = [
  {
    href: "/library",
    eyebrow: "The Library",
    title: "Everything worth your time, in one place.",
    teaser:
      "Articles, podcasts, videos, books and templates. Searchable, filterable, grouped by theme.",
    accent: "var(--color-forest)",
    taste: themes,
  },
  {
    href: "/top-picks",
    eyebrow: "Top Picks",
    title: "The five people I come back to most.",
    teaser:
      "When I need a straight answer, I start here, because they actually know what they're talking about.",
    accent: "var(--color-clay)",
    taste: voices.map((voice) => voice.name),
  },
  {
    href: "/quiz",
    eyebrow: "Find Your Fit",
    title: "Which product specialism fits you?",
    teaser:
      "Six questions on the work you actually reach for. No personality test, and nobody gets matched to an influencer.",
    accent: "var(--color-navy)",
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
    accent: "var(--color-oxblood)",
    taste: ["Picked by a person", "Never by an algorithm"],
  },
  {
    href: "/about",
    eyebrow: "About Me",
    title: "Curated by Courtney Bain.",
    teaser:
      "Group Product Manager for Small Business at MYOB, who came to product through marketing and never stopped asking whether people would pay for it.",
    accent: "var(--color-teal)",
    taste: ["MYOB", "Cashrewards", "Rokt"],
  },
] as const;

export function HomeIndex() {
  return (
    <section aria-labelledby="index-title" className="border-b border-rule">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <h2 id="index-title" className="eyebrow text-brass-deep">
          What&rsquo;s Inside
        </h2>

        <ol className="mt-10 border-t border-rule">
          {destinations.map((destination, index) => (
            <li key={destination.href}>
              <Link
                href={destination.href}
                className="group grid gap-x-8 gap-y-4 border-b border-rule py-8 transition-colors duration-300 hover:bg-paper-sunk md:grid-cols-12 md:py-10"
              >
                <span
                  aria-hidden="true"
                  style={{ color: destination.accent }}
                  className="numeral text-sm md:col-span-1"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="md:col-span-5">
                  <p
                    style={{ color: destination.accent }}
                    className="eyebrow font-semibold"
                  >
                    {destination.eyebrow}
                  </p>
                  <h3 className="mt-3 flex items-baseline gap-2 font-display text-2xl leading-tight text-ink lg:text-[1.75rem]">
                    <span className="rule-link">{destination.title}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </h3>
                </div>

                <p className="max-w-[52ch] text-sm leading-relaxed text-ink-soft md:col-span-4">
                  {destination.teaser}
                </p>

                <ul
                  aria-hidden="true"
                  className="flex flex-wrap gap-x-3 gap-y-2 self-start md:col-span-2 md:justify-end"
                >
                  {destination.taste.map((item) => (
                    <li
                      key={item}
                      className="border border-rule px-2 py-1 text-xs text-ink-muted transition-colors duration-300 group-hover:border-rule-strong"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
