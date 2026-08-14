import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SuggestionForm } from "@/components/suggestion-form";
import { site } from "@/lib/site";

const description =
  "Found something worth reading, watching or listening to? Send it in and it might earn a place in the library.";

export const metadata: Metadata = {
  title: "Suggest a Resource",
  description,
  alternates: { canonical: "/suggest" },
  openGraph: {
    title: `Suggest a Resource · ${site.name}`,
    description,
    url: `${site.url}/suggest`,
  },
};

export default function SuggestPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Suggest a Resource"
        title="Found something good?"
        intro="Every entry here was picked by a person, and that includes the ones people send me."
        stock="var(--color-apricot)"
        ink="var(--color-ember)"
      />

      <section className="bg-paper-sunk">
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-16">
            <div className="md:col-span-4">
              <p className="max-w-[34ch] text-sm leading-relaxed text-ink-muted">
                Tell me what you found and why it stuck with you. The why
                matters more than the link, because that is what decides whether
                it earns a place.
              </p>
            </div>

            <div className="md:col-span-8">
              <SuggestionForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
