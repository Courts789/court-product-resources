import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Premise } from "@/components/premise";
import { site } from "@/lib/site";

const description =
  "Why this collection exists: no clickbait, no overwhelming feed, and nothing here because an algorithm decided it should be.";

export const metadata: Metadata = {
  title: "The Premise",
  description,
  alternates: { canonical: "/premise" },
  openGraph: {
    title: `The Premise · ${site.name}`,
    description,
    url: `${site.url}/premise`,
  },
};

export default function PremisePage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="The Premise"
        title="Why this exists."
        intro="A person picked every entry here, and can tell you why. That is the whole idea."
        accent="var(--color-clay)"
      />
      <Premise />
    </main>
  );
}
