import Link from "next/link";
import { site } from "@/lib/site";
import { HeroPlate } from "@/components/plate";
import { ArrowUpRight } from "@/components/icons";

export function Hero() {
  return (
    <section className="bg-pine text-paper" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[84rem] items-center gap-x-16 gap-y-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:px-12 lg:py-24">
        <div className="lg:col-span-7">
          <p className="eyebrow text-butter">
            Curated for product people &middot; by {site.author}
          </p>

          <h1
            id="hero-title"
            className="mt-8 max-w-[13ch] text-[length:var(--text-display)] text-paper"
          >
            Everything worth reading.{" "}
            <span className="text-butter">Nothing that isn&rsquo;t.</span>
          </h1>

          <p className="mt-8 max-w-[46ch] text-[length:var(--text-lede)] leading-[1.5] text-paper/80">
            A curated list of product management resources for people
            transitioning, upskilling, and navigating the industry&rsquo;s
            largest change&hellip;ever.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/library"
              className="group inline-flex items-baseline gap-3 rounded-full bg-butter px-7 py-4 text-ink transition-colors duration-300 hover:bg-paper"
            >
              <span className="eyebrow">Browse the library</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/quiz"
              className="eyebrow rounded-full border border-paper/40 px-7 py-4 text-paper transition-colors duration-300 hover:border-paper"
            >
              Find your fit
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <HeroPlate className="h-auto w-full max-w-sm lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
