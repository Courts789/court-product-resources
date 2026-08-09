import { site } from "@/lib/site";

/**
 * PLACEHOLDER COPY — Courtney to replace the paragraphs below.
 * The first paragraph holds the facts already confirmed; the rest are
 * scaffolding so the layout is real while the words get written.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-b border-rule"
    >
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-3">
            <h2 id="about-title" className="eyebrow text-brass-deep">
              About Me
            </h2>
            <p className="mt-6 font-display text-2xl leading-tight text-ink">
              {site.author}
            </p>
          </div>

          <div className="md:col-span-8 lg:col-span-7">
            <p className="font-display text-[length:var(--text-lede)] leading-[1.5] text-ink">
              Everything here is curated by me. I spent a decade building a
              career elsewhere before transitioning into product management —
              which, as it turns out, is the norm rather than the exception. We
              generally all come from various pathways, and that&rsquo;s exactly
              why this is a profession where everyone stays keen to learn and
              grow.
            </p>

            <p className="mt-6 max-w-[62ch] leading-relaxed text-ink-soft">
              {/* TODO: replace with the real bio. */}
              More to come here — what I worked on before product, what I work
              on now, and the parts of the transition nobody warned me about.
            </p>

            <p className="mt-6 max-w-[62ch] leading-relaxed text-ink-soft">
              {/* TODO: replace with the real bio. */}
              And a note on how I choose what makes it onto this list.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
