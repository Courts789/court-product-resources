import Link from "next/link";
import { navigation } from "@/lib/site";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  /*
   * Ink bar, not cream. The masthead reads as the spine of the guide and
   * separates itself from the page rather than floating above it.
   *
   * One row at every width, and a fixed height so the menu panel can sit
   * flush beneath it without measuring anything. Below the extra-large
   * step the sections move behind the menu button: seven of them plus the
   * wordmark will not fit on a tablet, or on a small laptop, without the
   * labels wrapping onto a second line.
   */
  return (
    <header className="sticky top-0 z-40 bg-night text-cream">
      <div className="mx-auto flex h-14 max-w-[84rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-16 lg:gap-8 lg:px-12">
        <Link
          href="/"
          className="headline shrink-0 text-base text-cream transition-colors duration-300 hover:text-highlight sm:text-lg lg:text-xl"
        >
          Court&rsquo;s Product Resources
        </Link>

        <div className="flex items-center gap-1 xl:gap-4">
          <nav aria-label="Sections" className="hidden xl:block">
            <ul className="flex items-center gap-5 2xl:gap-6">
              {navigation
                .filter((item) => item.href !== "/suggest")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="eyebrow inline-block whitespace-nowrap py-1 text-cream/70 transition-colors duration-300 hover:text-cream"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              {/* Suggest is the only ask on the site, so it gets the button. */}
              <li>
                <Link
                  href="/suggest"
                  className="eyebrow inline-block rounded-full bg-highlight px-4 py-2 text-night transition-colors duration-300 hover:bg-cream"
                >
                  Suggest
                </Link>
              </li>
            </ul>
          </nav>

          {/* Beside the menu button on narrow screens, after Suggest on wide. */}
          <ThemeToggle />
          <SiteNav />
        </div>
      </div>
    </header>
  );
}
