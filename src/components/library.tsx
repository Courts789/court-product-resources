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
import { scoreItem } from "@/lib/fuzzy";
import { themeInk, themeStock } from "@/lib/accents";
import { PageHeader } from "@/components/page-header";
import { ArrowUpRight } from "@/components/icons";

type ThemeFilter = Theme | "All";
type Sort = "theme" | "newest";

const themeFilters: readonly ThemeFilter[] = ["All", ...themes];

const mediaFilters: readonly Media[] = [
  "Article",
  "Podcast",
  "Video",
  "Book",
  "Guide",
  "Template",
];

/** "New" is measured against the last revision, so it's stable across renders. */
const reference = new Date(site.lastUpdated);

/**
 * Fields the search reads, weighted so a match on a title or a person
 * outranks one buried in a note. Title edges out byline so that searching
 * a name surfaces that person's own entry above things they made.
 */
function searchFields(resource: Resource) {
  return [
    { value: resource.title, weight: 3.2 },
    { value: resource.by, weight: 3 },
    { value: resource.theme, weight: 1.5 },
    { value: resource.media, weight: 1.5 },
    { value: resource.note, weight: 1 },
  ];
}

/**
 * The masthead changes height across breakpoints, so its height can't be
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
  /* Narrow screens only: the chip rows are always shown from the large
     step up, where they cost a single line. */
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visible = useMemo(() => {
    const scored = resources
      .filter(
        (resource) =>
          (theme === "All" || resource.theme === theme) &&
          (media === null || resource.media === media),
      )
      .map((resource) => ({
        resource,
        score: query === "" ? 1 : scoreItem(searchFields(resource), query),
      }))
      .filter((entry) => entry.score > 0);

    if (query !== "") {
      // Relevance wins while searching, so the closest match leads.
      scored.sort((a, b) => b.score - a.score);
    } else if (sort === "newest") {
      scored.sort((a, b) => b.resource.added.localeCompare(a.resource.added));
    }

    return scored.map((entry) => entry.resource);
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

  /* Counted for the disclosure button, so a collapsed filter set can still
     say how much of the collection it is hiding. Search is excluded: the
     field it came from stays on screen and speaks for itself. */
  const activeFilters = (theme !== "All" ? 1 : 0) + (media !== null ? 1 : 0);

  function reset() {
    setQuery("");
    setTheme("All");
    setMedia(null);
  }

  return (
    <>
      <PageHeader
        eyebrow="The Library"
        title="Everything worth your time, in one place."
        intro="Articles, podcasts, videos, books and templates. Grouped by theme, searchable, and sorted by hand rather than by an algorithm."
      />

      {/* Wrapping the controls and the list together bounds the sticky
          element to this block, so the filter bar releases at the end of
          the list instead of hovering over whatever follows. */}
      <div className="relative">
        <div
          style={{ top: mastheadHeight }}
          className="sticky z-30 border-b border-rule bg-paper"
        >
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-3 border-b border-rule py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-5">
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
                  className="w-full border-b-2 border-rule bg-transparent pb-2 text-base text-ink outline-none transition-colors duration-300 placeholder:text-ink-muted focus:border-pine sm:text-lg"
                />
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-start sm:gap-6">
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
                      className={`eyebrow cursor-pointer whitespace-nowrap border-b-2 py-1 transition-colors duration-300 ${
                        sort === value
                          ? "border-pine text-ink"
                          : "border-transparent text-ink-muted hover:text-ink"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/*
                  On a phone the chip rows are taller than the entries they
                  filter, so they fold away behind this. The button carries
                  the count, which is the part you need while they are shut.
                */}
                <button
                  type="button"
                  onClick={() => setFiltersOpen((value) => !value)}
                  aria-expanded={filtersOpen}
                  aria-controls="library-filters"
                  className="eyebrow flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border-2 border-rule px-3 py-2 text-ink transition-colors duration-300 hover:border-rule-strong sm:px-3.5 lg:hidden"
                >
                  Filters
                  {activeFilters > 0 && (
                    <span className="rounded-full bg-pine px-1.5 py-0.5 text-paper">
                      {activeFilters}
                    </span>
                  )}
                </button>

                {/* Kept for screen readers so filtering still announces a
                  result, without putting a counter back on the page. */}
                <p aria-live="polite" className="sr-only">
                  {visible.length} {visible.length === 1 ? "entry" : "entries"}
                </p>
              </div>
            </div>

            <div
              id="library-filters"
              className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-3 py-4 lg:flex`}
            >
              <div
                role="group"
                aria-label="Filter by theme"
                className="scroll-row -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
              >
                {themeFilters.map((name) => {
                  const active = theme === name;
                  /* The chip wears its own section stock once chosen, which
                     is the same colour the group heading below carries. */
                  const stock =
                    name === "All" ? "var(--color-ink)" : themeStock[name];
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setTheme(name)}
                      aria-pressed={active}
                      style={
                        active ? { backgroundColor: stock } : { borderColor: stock }
                      }
                      className={`eyebrow shrink-0 cursor-pointer whitespace-nowrap rounded-full border-2 px-3.5 py-2 transition-colors duration-300 ${
                        active
                          ? name === "All"
                            ? "border-ink text-paper"
                            : "text-ink"
                          : "text-ink-muted hover:text-ink"
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
                {/* Full-strength muted ink: at 70% this label fell to 2.97:1. */}
                <span className="eyebrow shrink-0 text-ink-muted">Format</span>
                {mediaFilters.map((name) => {
                  const active = media === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setMedia(active ? null : name)}
                      aria-pressed={active}
                      className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3 py-1 text-xs transition-colors duration-300 ${
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
                    className="eyebrow rule-link shrink-0 cursor-pointer text-pine"
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
            <p className="py-16 text-center text-xl text-ink-muted">
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
                  {/* The section's stock, run edge to edge, so scrolling the
                      library reads as moving between printed sections. */}
                  <h2
                    style={{ backgroundColor: themeStock[section.name] }}
                    className="flex items-baseline gap-4 rounded-card px-5 py-4 text-2xl text-ink sm:text-3xl"
                  >
                    {section.name}
                    <span
                      style={{ color: themeInk[section.name] }}
                      className="eyebrow ml-auto"
                    >
                      {section.items.length}{" "}
                      {section.items.length === 1 ? "entry" : "entries"}
                    </span>
                  </h2>
                  <ResourceList items={section.items} />
                </section>
              ))
            : visible.length > 0 && <ResourceList items={visible} />}
        </div>
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
              style={{ color: themeInk[resource.theme] }}
              className="numeral text-base md:col-span-1"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="md:col-span-4">
              <h3 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xl text-ink lg:text-2xl">
                <span className="rule-link">{resource.title}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                {isNew(resource, reference) && (
                  <span className="eyebrow rounded-full bg-butter px-2.5 py-1 text-ink">
                    New
                  </span>
                )}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{resource.by}</p>
            </div>

            <p className="max-w-[54ch] text-sm leading-relaxed text-ink-soft md:col-span-5">
              {resource.note}
            </p>

            <div className="flex items-center gap-2 md:col-span-2 md:flex-col md:items-end">
              <span
                style={{ backgroundColor: themeStock[resource.theme] }}
                className="eyebrow rounded-full px-3 py-1.5 text-ink"
              >
                {resource.theme}
              </span>
              <span className="eyebrow rounded-full border border-rule px-3 py-1.5 text-ink-muted">
                {resource.media}
              </span>
            </div>

            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
