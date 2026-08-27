import Link from "next/link";
import { navigation } from "@/lib/site";
import { SiteNav } from "@/components/site-nav";

export function SiteHeader() {
  /*
   * Ink bar, not cream. The masthead reads as the spine of the guide and
   * separates itself from the page rather than floating above it.
   *
   * One row at every width, and a fixed height so the menu panel can sit
   * flush beneath it without measuring anything. Below the large step the
   * sections move behind the menu button: six of them plus the wordmark
   * will not fit on a tablet without shrinking the labels past reading.
   */
  return (
    <header className="sticky top-0 z-40 bg-ink text-paper">
      <div className="mx-auto flex h-14 max-w-[84rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-16 lg:gap-8 lg:px-12">
        <Link
          href="/"
          className="headline shrink-0 text-base text-paper transition-colors duration-300 hover:text-butter sm:text-lg lg:text-xl"
        >
          Court&rsquo;s Product Resources
        </Link>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-6">
            {navigation
              .filter((item) => item.href !== "/suggest")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="eyebrow inline-block py-1 text-paper/70 transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            {/* Suggest is the only ask on the site, so it gets the button. */}
            <li>
              <Link
                href="/suggest"
                className="eyebrow inline-block rounded-full bg-butter px-4 py-2 text-ink transition-colors duration-300 hover:bg-paper"
              >
                Suggest
              </Link>
            </li>
          </ul>
        </nav>

        <SiteNav />
      </div>
    </header>
  );
}
