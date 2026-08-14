import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Voices } from "@/components/voices";
import { voices } from "@/data/voices";
import { site } from "@/lib/site";

const description =
  "The five people Courtney Bain comes back to most: Claire Vo, Peter Yang, Hamel Husain, Elena Verna and Nikhyl Singhal.";

export const metadata: Metadata = {
  title: "Top Picks",
  description,
  alternates: { canonical: "/top-picks" },
  openGraph: {
    title: `Top Picks · ${site.name}`,
    description,
    url: `${site.url}/top-picks`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Top Picks",
  itemListElement: voices.map((voice, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: voice.name,
    description: voice.note,
    url: voice.url,
  })),
};

export default function TopPicksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="Top Picks"
          title="My five go-to people."
          intro="When I need a straight answer, I start here, because they actually know what they're talking about."
          stock="var(--color-butter)"
          ink="var(--color-olive)"
        />
        <div className="pt-14">
          <Voices />
        </div>
      </main>
    </>
  );
}
