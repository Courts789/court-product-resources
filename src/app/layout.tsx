import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { themeStorageKey } from "@/lib/theme";
import { site } from "@/lib/site";
import "./globals.css";

/*
 * No webfonts. The whole type system is web-safe (condensed grotesque,
 * system UI, Georgia), so there is nothing to download, nothing to
 * preload, and no swap flash on first paint. See globals.css.
 */

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author }],
  creator: site.author,
  keywords: [
    "product management resources",
    "product manager career change",
    "transitioning into product management",
    "AI product management",
    "product management newsletters",
    "PRD templates",
    "product discovery",
    "product-led growth",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/*
          Runs while the HTML parses, before first paint, so a dark reader
          never sees the cream page flash. A saved choice wins; otherwise
          the system preference decides. suppressHydrationWarning above
          lets React accept the attribute this adds.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t;try{t=localStorage.getItem("${themeStorageKey}")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t})()`,
          }}
        />
      </head>
      {/*
        Browser extensions commonly inject attributes onto <body> before
        React hydrates (ColorZilla's cz-shortcut-listen, Grammarly, and
        friends), which reads as a hydration mismatch. This suppresses the
        warning for this element's own attributes only. Mismatches inside
        the tree still surface normally.
      */}
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-paper text-ink"
      >
        <a
          href="#main"
          className="eyebrow sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-night focus:px-5 focus:py-3 focus:text-highlight"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
