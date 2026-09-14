import Link from "next/link";
import { navigation, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-night text-cream">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        {/*
          Rule 06: the AI step is the reason to trust the site, not a
          disclaimer to bury. It names what the person actually did.
        */}
        <p className="max-w-[34ch] text-[length:var(--text-lede)] leading-[1.4] text-cream">
          Drafted with AI. Read by a human before it&rsquo;s listed.
        </p>

        <p className="eyebrow mt-12 text-cream/50">Sections</p>
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-x-10">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-cream/85 transition-colors duration-300 hover:text-highlight"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-cream/50">{site.name}</p>
          <p className="eyebrow text-cream/50">
            &copy; {new Date().getFullYear()} {site.author}
          </p>
        </div>
      </div>
    </footer>
  );
}
