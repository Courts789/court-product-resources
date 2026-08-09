import { navigation, site } from "@/lib/site";

export function SiteHeader() {
  // Solid fill, not a translucent blur — the masthead sits on the page,
  // it doesn't float above it.
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-[84rem] flex-col gap-3 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-8 lg:px-12">
        <a
          href="#main"
          className="font-display text-lg leading-none tracking-tight text-ink transition-colors duration-300 hover:text-brass-deep sm:text-xl"
        >
          Court&rsquo;s <span className="italic">Product Resources</span>
        </a>

        <nav aria-label="Sections">
          {/* Scrolls horizontally on narrow screens rather than collapsing
              behind a menu button — every section stays one tap away. */}
          <ul className="scroll-row -mx-5 flex items-center gap-6 overflow-x-auto px-5 sm:mx-0 sm:gap-7 sm:overflow-visible sm:px-0">
            {navigation.map((item) => (
              <li key={item.href} className="shrink-0">
                <a
                  href={item.href}
                  className="eyebrow rule-link inline-block py-1 text-ink-muted transition-colors duration-300 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="hidden shrink-0 lg:block">
              <span className="eyebrow text-brass-deep">{site.edition}</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
