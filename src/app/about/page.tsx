import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { About } from "@/components/about";
import { site } from "@/lib/site";

const description =
  "Courtney Bain, Group Product Manager for Small Business products at MYOB, on coming to product through marketing and what she looks for in a resource.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${site.name}`,
    description,
    url: `${site.url}/about`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${site.url}/about`,
  mainEntity: {
    "@type": "Person",
    name: site.author,
    jobTitle: "Group Product Manager, Small Business",
    worksFor: { "@type": "Organization", name: "MYOB" },
    image: `${site.url}/courtney-bain.jpg`,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="About Me"
          title="Someone who is passionate about the art of product."
          stock="var(--color-lilac)"
          ink="var(--color-plum)"
        />
        <About />
      </main>
    </>
  );
}
