import Link from "next/link";
import { navigation, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        {/* One row of sections, now that the standing rule and the
            revision note have come out of the footer. */}
        <p className="eyebrow text-paper/50">Sections</p>
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-x-10">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-paper/85 transition-colors duration-300 hover:text-butter"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-3 border-t border-paper/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-paper/50">{site.name}</p>
          <p className="eyebrow text-paper/50">
            &copy; {new Date().getFullYear()} {site.author}
          </p>
        </div>
      </div>
    </footer>
  );
}
