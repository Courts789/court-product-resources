import { resources } from "@/data/resources";
import { site } from "@/lib/site";

const formatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function Hero() {
  const updated = formatter.format(new Date(site.lastUpdated));

  return (
    <section className="border-b border-rule" aria-labelledby="hero-title">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <p className="eyebrow text-brass-deep">
          Curated for product people &middot; by {site.author}
        </p>

        <h1
          id="hero-title"
          className="mt-8 max-w-[18ch] text-[length:var(--text-display)] leading-[0.92] text-ink"
        >
          Court&rsquo;s{" "}
          <span className="italic text-ink-soft">Product Resources</span>
        </h1>

        <div className="mt-10 grid gap-x-16 gap-y-8 border-t border-rule pt-8 md:grid-cols-12">
          <p className="text-[length:var(--text-lede)] font-display leading-[1.45] text-ink-soft md:col-span-7 lg:col-span-6">
            A curated list of product management resources for people
            transitioning, upskilling, and navigating the industry&rsquo;s
            largest change&hellip;ever.
          </p>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 self-start md:col-span-4 md:col-start-9">
            <div>
              <dt className="eyebrow text-ink-muted">Entries</dt>
              <dd className="numeral mt-2 text-3xl text-ink">
                {resources.length}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-ink-muted">Last revised</dt>
              <dd className="mt-2 font-display text-lg leading-snug text-ink">
                <time dateTime={site.lastUpdated}>{updated}</time>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
