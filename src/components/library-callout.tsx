import Link from "next/link";
import { resources, themes } from "@/data/resources";
import { ArrowUpRight } from "@/components/icons";

/** Home-page entry point to the full collection, which lives at /library. */
export function LibraryCallout() {
  return (
    <section aria-labelledby="library-callout-title" className="bg-paper-sunk">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-7">
            <p className="eyebrow text-brass-deep">The Library</p>
            <h2
              id="library-callout-title"
              className="mt-6 max-w-[16ch] text-[length:var(--text-section)] leading-[1.1] text-ink"
            >
              The full collection, grouped by theme.
            </h2>
            <p className="mt-6 max-w-[54ch] leading-relaxed text-ink-soft">
              Articles, newsletters, podcasts, talks and templates &mdash;
              searchable, filterable, and sorted by whatever you need this week.
            </p>

            <Link
              href="/library"
              className="group mt-10 inline-flex items-baseline gap-3 border-b border-ink pb-2 font-display text-xl text-ink transition-colors duration-300 hover:border-brass hover:text-brass-deep"
            >
              Browse all {resources.length} entries
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="self-end md:col-span-4 md:col-start-9">
            {themes.map((theme) => {
              const count = resources.filter(
                (resource) => resource.theme === theme,
              ).length;
              return (
                <li
                  key={theme}
                  className="flex items-baseline justify-between border-b border-rule py-3 first:border-t"
                >
                  <span className="eyebrow text-ink">{theme}</span>
                  <span className="numeral text-sm text-ink-muted">
                    {String(count).padStart(2, "0")}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
