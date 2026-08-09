import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Premise } from "@/components/premise";
import { Voices } from "@/components/voices";
import { Library } from "@/components/library";
import { SiteFooter } from "@/components/site-footer";
import { resources } from "@/data/resources";
import { site } from "@/lib/site";

/**
 * Structured data: describes the page as a curated collection so search
 * engines can read the index as a list rather than as loose prose.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: site.name,
  description: site.description,
  url: site.url,
  inLanguage: "en-AU",
  dateModified: site.lastUpdated,
  author: {
    "@type": "Person",
    name: site.author,
  },
  mainEntity: {
    "@type": "ItemList",
    name: "The Library",
    numberOfItems: resources.length,
    itemListElement: resources.map((resource, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: resource.title,
      description: resource.note,
      url: resource.url,
    })),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Premise />
        <Voices />
        <Library />
      </main>
      <SiteFooter />
    </>
  );
}
