import type { Metadata } from "next";
import { PitchBuilder } from "@/components/pitch-builder";
import { site } from "@/lib/site";

const description =
  "Roles in product are splitting and being reinvented faster than the titles can keep up. Seven questions, and you leave with three sentences on who you are, the kind of product person you are, and what you want next.";

export const metadata: Metadata = {
  title: "Write Your Pitch",
  description,
  alternates: { canonical: "/pitch" },
  openGraph: {
    title: `Write Your Pitch · ${site.name}`,
    description,
    url: `${site.url}/pitch`,
  },
};

export default function PitchPage() {
  return (
    <main id="main" className="flex-1">
      <section className="bg-sky" aria-labelledby="pitch-title">
        <div className="mx-auto max-w-[84rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <p className="eyebrow text-slate">Your Pitch</p>
          <h1
            id="pitch-title"
            className="mt-6 max-w-[18ch] text-[length:var(--text-section)] text-ink"
          >
            Stop explaining yourself in someone else&rsquo;s bucket.
          </h1>

          <div className="mt-8 grid gap-y-8 md:grid-cols-12 md:gap-x-16">
            <p className="text-[length:var(--text-lede)] leading-[1.5] text-ink-soft md:col-span-7">
              Job hunting, writing a development plan, or just answering
              &ldquo;so what do you do&rdquo;: every one of them pushes you to
              squeeze yourself into whichever product bucket the other person
              already has a name for. Meanwhile the roles are splitting,
              merging and being invented faster than the titles can keep up.
            </p>

            <p className="max-w-[42ch] text-sm leading-relaxed text-ink-soft md:col-span-4 md:col-start-9">
              So write your own instead. Seven questions, and you leave with
              three sentences: who you are, the kind of product person you
              are, and what you want next. It borrows Penny Locaso&rsquo;s brag-a-log
              idea, because nobody can describe their own value from memory
              under pressure. I have watched too many good people take ten minutes
              to introduce themselves in an interview. This takes thirty
              seconds.
            </p>
          </div>
        </div>
      </section>

      <PitchBuilder />
    </main>
  );
}
