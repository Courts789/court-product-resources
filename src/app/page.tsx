import Link from "next/link";
import { Hero } from "@/components/hero";
import { HomeIndex } from "@/components/home-index";
import { ArrowUpRight } from "@/components/icons";
import { site } from "@/lib/site";

/**
 * Structured data: identifies the site and its author. The resource
 * ItemList lives on /library, alongside the entries themselves.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  description: site.description,
  url: site.url,
  inLanguage: "en-AU",
  dateModified: site.lastUpdated,
  author: {
    "@type": "Person",
    name: site.author,
    description:
      "Group Product Manager for Small Business products at MYOB, who came to product management through marketing.",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="flex-1">
        <Hero />

        <HomeIndex />

        <section aria-labelledby="home-suggest" className="bg-paper-sunk">
          <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="grid items-end gap-y-8 md:grid-cols-12 md:gap-x-16">
              <div className="md:col-span-7">
                <h2 id="home-suggest" className="eyebrow text-rust">
                  Suggest a Resource
                </h2>
                <p className="headline mt-6 max-w-[14ch] text-[length:var(--text-section)] text-ink">
                  Found something good?
                </p>
              </div>

              <div className="md:col-span-5">
                <Link
                  href="/suggest"
                  className="group inline-flex items-baseline gap-3 rounded-full bg-forest px-7 py-4 text-cream transition-colors duration-300 hover:bg-night"
                >
                  <span className="eyebrow">Send it in</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
