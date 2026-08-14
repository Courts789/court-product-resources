import Link from "next/link";
import { navigation } from "@/lib/site";

export function SiteHeader() {
  // Ink bar, not cream. The masthead reads as the spine of the guide and
  // separates itself from the page rather than floating above it.
  return (
    <header className="sticky top-0 z-40 bg-ink text-paper">
      <div className="mx-auto flex max-w-[84rem] flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="headline text-lg text-paper transition-colors duration-300 hover:text-butter sm:text-xl"
        >
          Court&rsquo;s Product Resources
        </Link>

        <nav aria-label="Sections">
          {/* Scrolls horizontally on narrow screens rather than collapsing
              behind a menu button. Every section stays one tap away. */}
          <ul className="scroll-row -mx-5 flex items-center gap-5 overflow-x-auto px-5 sm:mx-0 sm:gap-6 sm:overflow-visible sm:px-0">
            {navigation
              .filter((item) => item.href !== "/suggest")
              .map((item) => (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    className="eyebrow inline-block py-1 text-paper/70 transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            {/* Suggest is the only ask on the page, so it gets the button. */}
            <li className="shrink-0">
              <Link
                href="/suggest"
                className="eyebrow inline-block rounded-full bg-butter px-4 py-2 text-ink transition-colors duration-300 hover:bg-paper"
              >
                Suggest
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
