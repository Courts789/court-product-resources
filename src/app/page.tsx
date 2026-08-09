import { Hero } from "@/components/hero";
import { Premise } from "@/components/premise";
import { About } from "@/components/about";
import { Voices } from "@/components/voices";
import { LibraryCallout } from "@/components/library-callout";
import { site } from "@/lib/site";

/**
 * Structured data: identifies the site and its author. The resource
 * ItemList lives on /library, alongside the entries themselves.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  description: site.description,
  url: site.url,
  inLanguage: "en-AU",
  dateModified: site.lastUpdated,
  author: {
    "@type": "Person",
    name: site.author,
    description:
      "Product manager who spent a decade in another field before transitioning into product management.",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="flex-1">
        <Hero />
        <Premise />
        <About />
        <Voices />
        <LibraryCallout />
      </main>
    </>
  );
}
