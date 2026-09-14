import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

/*
 * The one place on the site allowed to be a joke at product management's
 * expense. It still has to do the job of a 404, so the route home is the
 * biggest thing on the page and the library link is right behind it.
 */
export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 items-center bg-forest text-cream">
      <div className="mx-auto w-full max-w-[84rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <p className="eyebrow text-highlight">Error 404 &middot; Not Reproducible</p>

        <h1 className="mt-8 max-w-[16ch] text-[length:var(--text-display)] text-cream">
          Every product manager dreads a bug.
        </h1>

        <p className="mt-8 max-w-[52ch] text-[length:var(--text-lede)] leading-[1.5] text-cream/80">
          This is one of them. The page you asked for does not exist, was
          quietly descoped, or is sitting in a backlog somewhere marked
          &ldquo;P3, revisit next quarter&rdquo;.
        </p>

        <p className="mt-6 max-w-[52ch] leading-relaxed text-cream/70">
          Nobody is going to write a post-mortem about it. Turn around, go
          home, and we will both pretend the acceptance criteria were clear
          all along.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/"
            className="group inline-flex items-baseline gap-3 rounded-full bg-highlight px-7 py-4 text-night transition-colors duration-300 hover:bg-cream"
          >
            <span className="eyebrow">Return home</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/library"
            className="eyebrow rounded-full border border-cream/40 px-7 py-4 text-cream transition-colors duration-300 hover:border-cream"
          >
            Or go straight to the library
          </Link>
        </div>
      </div>
    </main>
  );
}
