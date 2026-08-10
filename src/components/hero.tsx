import Link from "next/link";
import { site } from "@/lib/site";
import { HeroPlate } from "@/components/plate";
import { ArrowUpRight } from "@/components/icons";

export function Hero() {
  return (
    <section className="border-b border-rule" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[84rem] gap-x-16 gap-y-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:px-12 lg:py-28">
        <div className="lg:col-span-7">
          <p className="eyebrow text-brass-deep">
            Curated for product people &middot; by {site.author}
          </p>

          <h1
            id="hero-title"
            className="mt-8 text-[length:var(--text-display)] leading-[0.92] text-ink"
          >
            Court&rsquo;s{" "}
            <span className="italic text-forest">Product Resources</span>
          </h1>

          <p className="mt-10 max-w-[46ch] border-t border-rule pt-8 font-display text-[length:var(--text-lede)] leading-[1.45] text-ink-soft">
            A curated list of product management resources for people
            transitioning, upskilling, and navigating the industry&rsquo;s
            largest change&hellip;ever.
          </p>

          <Link
            href="/library"
            className="group mt-10 inline-flex items-baseline gap-3 bg-forest px-6 py-4 text-paper transition-colors duration-300 hover:bg-ink"
          >
            <span className="eyebrow">Browse the library</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <HeroPlate className="h-auto w-full max-w-sm lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
