import type { Metadata } from "next";
import { Library } from "@/components/library";
import { resources } from "@/data/resources";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Library",
  description:
    "The full collection: articles, podcasts, videos, books and templates on product management, grouped by theme and searchable.",
  alternates: { canonical: "/library" },
  openGraph: {
    title: `The Library · ${site.name}`,
    description:
      "The full collection: articles, podcasts, videos, books and templates on product management, grouped by theme and searchable.",
    url: `${site.url}/library`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `The Library · ${site.name}`,
  description: metadata.description,
  url: `${site.url}/library`,
  inLanguage: "en-AU",
  dateModified: site.lastUpdated,
  author: { "@type": "Person", name: site.author },
  mainEntity: {
    "@type": "ItemList",
    name: "The Library",
    numberOfItems: resources.length,
    itemListElement: resources.map((resource, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: resource.title,
      description: resource.note || resource.verdict,
      url: resource.url,
    })),
  },
};

export default function LibraryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="flex-1">
        <Library />
      </main>
    </>
  );
}
