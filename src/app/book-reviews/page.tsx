import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ArrowUpRight } from "@/components/icons";
import { site } from "@/lib/site";

const description =
  "Book reviews are coming. Slowly. In the meantime, the library has things you can finish this week.";

export const metadata: Metadata = {
  title: "Book Reviews",
  description,
  alternates: { canonical: "/book-reviews" },
  openGraph: {
    title: `Book Reviews · ${site.name}`,
    description,
    url: `${site.url}/book-reviews`,
  },
  /* Nothing to index until there is something to read. */
  robots: { index: false, follow: true },
};

/* A progress bar is the joke and the status update at the same time. */
const shelf = [
  { title: "Inspired", by: "Marty Cagan", progress: 62 },
  { title: "Escaping the Build Trap", by: "Melissa Perri", progress: 41 },
  { title: "Continuous Discovery Habits", by: "Teresa Torres", progress: 88 },
  { title: "The one on my bedside table", by: "Since March", progress: 9 },
] as const;

export default function BookReviewsPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Book Reviews"
        title="Coming soon. Emphasis on the soon."
        intro="I am a slow reader. Genuinely, catastrophically slow. I read the same paragraph three times, put the book down to think about it, and then answer an email."
        stock="var(--color-apricot)"
        ink="var(--color-ember)"
      />

      <section>
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-16">
            <div className="md:col-span-6">
              <p className="text-[length:var(--text-lede)] leading-[1.5] text-ink">
                Everyone else seems to finish a product book in a weekend and
                post the summary by Monday. I have been forty pages from the
                end of the same one since autumn.
              </p>

              <p className="mt-8 max-w-[60ch] leading-relaxed text-ink-soft">
                So this section will exist, and the reviews will be honest
                about which chapters you can skip, because at my reading speed
                a wasted chapter is roughly a fortnight. Until then, the
                library is full of things you can actually finish tonight, and
                every one of them tells you upfront how long it will take.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/library"
                  className="group inline-flex items-baseline gap-3 rounded-full bg-pine px-7 py-4 text-paper transition-colors duration-300 hover:bg-ink"
                >
                  <span className="eyebrow">Something shorter</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <Link href="/suggest" className="eyebrow rule-link text-ink">
                  Tell me what to read next
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <p className="eyebrow text-ink-muted">Currently, allegedly, reading</p>
              <ul className="mt-6">
                {shelf.map((book) => (
                  <li key={book.title} className="border-b border-rule py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-lg text-ink">{book.title}</span>
                      <span className="numeral text-xs text-ink-muted">
                        {book.progress}%
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">{book.by}</p>
                    <div
                      aria-hidden="true"
                      className="mt-3 h-1 w-full rounded-full bg-rule"
                    >
                      <div
                        style={{ width: `${book.progress}%` }}
                        className="h-1 rounded-full bg-ember"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                Percentages are aspirational and have been for some time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
