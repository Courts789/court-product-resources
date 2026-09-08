import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Premise } from "@/components/premise";
import { site } from "@/lib/site";

const description =
  "Why this collection exists: more is published every week than anyone can get through, so this is the specific things that were actually worth the time.";

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
        title="There is far too much of it now."
        intro="More is published every week than any one person could get through, and a good half of it is repetitive, thin, or quietly selling you something."
        stock="var(--color-blush)"
        ink="var(--color-rust)"
      />
      <Premise />
    </main>
  );
}
