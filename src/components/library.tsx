"use client";

import { useEffect, useMemo, useState } from "react";
import {
  isNew,
  resources,
  themes,
  type Media,
  type Resource,
  type Theme,
} from "@/data/resources";
import { site } from "@/lib/site";
import { themeAccent } from "@/lib/accents";
import { ArrowUpRight } from "@/components/icons";

type ThemeFilter = Theme | "All";
type Sort = "theme" | "newest";

const themeFilters: readonly ThemeFilter[] = ["All", ...themes];

const mediaFilters: readonly Media[] = [
  "Article",
  "Newsletter",
  "Podcast",
  "Video",
  "Talk",
  "Guide",
  "Template",
];

/** "New" is measured against the last revision, so it's stable across renders. */
const reference = new Date(site.lastUpdated);

function matchesQuery(resource: Resource, query: string): boolean {
  const haystack =
    `${resource.title} ${resource.by} ${resource.note} ${resource.theme} ${resource.media}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

/**
 * The masthead wraps to two rows at narrow widths, so its height can't be
 * hard-coded as a sticky offset for the controls below it. Measure it and
 * keep the value current as the viewport changes.
 */
function useMastheadHeight(): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const masthead = document.querySelector("header");
    if (!masthead) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.target.getBoundingClientRect().height);
    });
    observer.observe(masthead);
    return () => observer.disconnect();
  }, []);

  return height;
}

export function Library() {
  const mastheadHeight = useMastheadHeight();
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<ThemeFilter>("All");
  const [media, setMedia] = useState<Media | null>(null);
  const [sort, setSort] = useState<Sort>("theme");

  const visible = useMemo(() => {
    const filtered = resources.filter(
      (resource) =>
        (theme === "All" || resource.theme === theme) &&
        (media === null || resource.media === media) &&
        (query === "" || matchesQuery(resource, query)),
    );

    return sort === "newest"
      ? [...filtered].sort((a, b) => b.added.localeCompare(a.added))
      : filtered;
  }, [query, theme, media, sort]);

  /* Grouped headings only make sense when browsing the whole collection by
     theme. Searching or sorting by date produces one ranked list instead. */
  const grouped = sort === "theme" && query === "";

  const sections = useMemo(
    () =>
      themes
        .map((name) => ({
          name,
          items: visible.filter((resource) => resource.theme === name),
        }))
        .filter((section) => section.items.length > 0),
    [visible],
  );

  const isFiltered = query !== "" || theme !== "All" || media !== null;

  function reset() {
    setQuery("");
    setTheme("All");
    setMedia(null);
  }

  return (
    <>
      <div className="border-b border-rule">
        <div className="mx-auto max-w-[84rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <p className="eyebrow text-brass-deep">The Library</p>
          <h1 className="mt-6 max-w-[16ch] text-[length:var(--text-section)] leading-[1.1] text-ink">
            Everything worth your time, in one place.
          </h1>
          <p className="mt-6 max-w-[58ch] font-display text-[length:var(--text-lede)] leading-[1.45] text-ink-soft">
            Articles, newsletters, podcasts, talks and templates. Grouped by
            theme, searchable, and sorted by hand rather than by an algorithm.
          </p>
        </div>
      </div>

      {/* Controls stick under the masthead so filters stay reachable while
          scrolling a long list. */}
      <div
        style={{ top: mastheadHeight }}
        className="sticky z-30 border-b border-rule bg-paper"
      >
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-4 border-b border-rule py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex-1 lg:max-w-md">
              <label htmlFor="library-search" className="sr-only">
                Search the library
              </label>
              <input
                id="library-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, person or topic"
                className="w-full border-b border-rule bg-transparent pb-2 font-display text-lg text-ink outline-none transition-colors duration-300 placeholder:text-ink-muted focus:border-brass"
              />
            </div>

            <div className="flex items-center gap-6">
              <div
                role="group"
                aria-label="Sort the library"
                className="flex items-center gap-4"
              >
                {(
                  [
                    ["theme", "By theme"],
                    ["newest", "Newest"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSort(value)}
                    aria-pressed={sort === value}
                    className={`eyebrow cursor-pointer border-b py-1 transition-colors duration-300 ${
                      sort === value
                        ? "border-brass text-ink"
                        : "border-transparent text-ink-muted hover:text-ink"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Kept for screen readers so filtering still announces a
                  result, without putting a counter back on the page. */}
              <p aria-live="polite" className="sr-only">
                {visible.length} {visible.length === 1 ? "entry" : "entries"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 py-4">
            <div
              role="group"
              aria-label="Filter by theme"
              className="scroll-row -mx-5 flex gap-x-6 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:gap-y-2 sm:overflow-visible sm:px-0"
            >
              {themeFilters.map((name) => {
                const active = theme === name;
                const accent =
                  name === "All" ? "var(--color-ink)" : themeAccent[name];
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setTheme(name)}
                    aria-pressed={active}
                    style={
                      active
                        ? { color: accent, borderColor: accent }
                        : undefined
                    }
                    className={`eyebrow shrink-0 cursor-pointer whitespace-nowrap border-b py-1 transition-colors duration-300 ${
                      active
                        ? ""
                        : "border-transparent text-ink-muted hover:border-rule-strong hover:text-ink"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>

            <div
              role="group"
              aria-label="Filter by format"
              className="scroll-row -mx-5 flex items-center gap-x-4 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:gap-y-2 sm:overflow-visible sm:px-0"
            >
              <span className="eyebrow shrink-0 text-ink-muted/70">Format</span>
              {mediaFilters.map((name) => {
                const active = media === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setMedia(active ? null : name)}
                    aria-pressed={active}
                    className={`shrink-0 cursor-pointer whitespace-nowrap border px-3 py-1 text-xs transition-colors duration-300 ${
                      active
                        ? "border-ink bg-ink text-paper"
                        : "border-rule text-ink-muted hover:border-rule-strong hover:text-ink"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
              {isFiltered && (
                <button
                  type="button"
                  onClick={reset}
                  className="eyebrow rule-link shrink-0 cursor-pointer text-brass-deep"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[84rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        {visible.length === 0 && (
          <p className="py-16 text-center font-display text-xl text-ink-muted">
            Nothing matches that yet.{" "}
            <button
              type="button"
              onClick={reset}
              className="rule-link cursor-pointer text-ink"
            >
              Clear the filters
            </button>{" "}
            to see everything.
          </p>
        )}

        {grouped
          ? sections.map((section) => (
              <section key={section.name} className="mb-14 last:mb-0">
                <h2
                  style={{
                    color: themeAccent[section.name],
                    borderColor: themeAccent[section.name],
                  }}
                  className="eyebrow flex items-center gap-3 border-b-2 pb-3"
                >
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: themeAccent[section.name] }}
                    className="h-2.5 w-2.5 shrink-0"
                  />
                  {section.name}
                </h2>
                <ResourceList items={section.items} />
              </section>
            ))
          : visible.length > 0 && <ResourceList items={visible} />}
      </div>
    </>
  );
}

function ResourceList({ items }: { items: readonly Resource[] }) {
  return (
    <ol>
      {items.map((resource, index) => (
        <li key={resource.id}>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-x-8 gap-y-3 border-b border-rule py-7 transition-colors duration-300 hover:bg-paper-sunk md:grid-cols-12"
          >
            <span
              aria-hidden="true"
              style={{ color: themeAccent[resource.theme] }}
              className="numeral text-sm md:col-span-1"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="md:col-span-4">
              <h3 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display text-xl leading-snug text-ink lg:text-2xl">
                <span className="rule-link">{resource.title}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                {isNew(resource, reference) && (
                  <span className="eyebrow border border-brass px-1.5 py-0.5 text-brass-deep">
                    New
                  </span>
                )}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{resource.by}</p>
            </div>

            <p className="max-w-[54ch] text-sm leading-relaxed text-ink-soft md:col-span-5">
              {resource.note}
            </p>

            <div className="flex items-center gap-x-4 md:col-span-2 md:flex-col md:items-end md:gap-y-3 md:text-right">
              <span
                style={{ color: themeAccent[resource.theme] }}
                className="eyebrow font-semibold"
              >
                {resource.theme}
              </span>
              <span className="eyebrow text-ink-muted">{resource.media}</span>
            </div>

            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
