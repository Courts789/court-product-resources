import Link from "next/link";
import { navigation, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-6">
            <p className="eyebrow text-brass">Curated by hand</p>
            <p className="mt-6 max-w-[38ch] font-display text-[length:var(--text-section)] leading-[1.25]">
              Revised when something earns its place, not on a schedule.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-paper/60">Sections</p>
            <ul className="mt-6 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rule-link text-sm text-paper/85 transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-paper/60">The one rule</p>
            <p className="mt-6 text-sm leading-relaxed text-paper/85">
              Chosen by a person, never by an algorithm. No automated feeds.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-paper/60">{site.name}</p>
          <p className="eyebrow text-paper/60">
            &copy; {new Date().getFullYear()} {site.author}
          </p>
        </div>
      </div>
    </footer>
  );
}
