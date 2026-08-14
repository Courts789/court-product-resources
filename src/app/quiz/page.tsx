import type { Metadata } from "next";
import { Quiz } from "@/components/quiz";
import { site } from "@/lib/site";

const description =
  "A short quiz that scores the kind of product work you actually reach for, then names the specialism that rewards it and what to read next.";

export const metadata: Metadata = {
  title: "Which Product Specialism Fits You?",
  description,
  alternates: { canonical: "/quiz" },
  openGraph: {
    title: `Which Product Specialism Fits You? · ${site.name}`,
    description,
    url: `${site.url}/quiz`,
  },
};

export default function QuizPage() {
  return (
    <main id="main" className="flex-1">
      <section className="bg-sky" aria-labelledby="quiz-title">
        <div className="mx-auto max-w-[84rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <p className="eyebrow text-slate">Find Your Fit</p>
          <h1
            id="quiz-title"
            className="mt-6 max-w-[16ch] text-[length:var(--text-section)] text-ink"
          >
            Which product specialism fits you?
          </h1>
          <p className="mt-6 max-w-[54ch] text-[length:var(--text-lede)] leading-[1.5] text-ink-soft">
            Not a personality test, and nobody gets matched to an influencer.
            Six questions on the work you actually reach for, then an honest
            read on where that would pay off and what to read next.
          </p>
        </div>
      </section>

      <Quiz />
    </main>
  );
}
