"use client";

import { useMemo, useState } from "react";
import { categories, resources, type Category } from "@/data/resources";
import { ArrowUpRight } from "@/components/icons";

type Filter = Category | "All";

const filters: readonly Filter[] = ["All", ...categories];

export function Library() {
  const [active, setActive] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? resources
        : resources.filter((resource) => resource.category === active),
    [active],
  );

  return (
    <section
      id="library"
      aria-labelledby="library-title"
      className="border-b border-rule"
    >
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-16">
          <h2
            id="library-title"
            className="eyebrow text-brass-deep md:col-span-3"
          >
            The Library
          </h2>
          <p className="max-w-[52ch] font-display text-[length:var(--text-lede)] leading-[1.45] text-ink-soft md:col-span-9">
            Canonical sources rather than single posts, so the links keep
            working. Filter by what you need this week.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-y border-rule py-5 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filter resources by category"
            className="scroll-row -mx-5 flex gap-x-6 gap-y-3 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {filters.map((filter) => {
              const isActive = filter === active;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  aria-pressed={isActive}
                  className={`eyebrow shrink-0 cursor-pointer whitespace-nowrap border-b py-1 transition-colors duration-300 ${
                    isActive
                      ? "border-brass text-ink"
                      : "border-transparent text-ink-muted hover:border-rule-strong hover:text-ink"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="eyebrow shrink-0 text-ink-muted">
            <span className="numeral">
              {String(visible.length).padStart(2, "0")}
            </span>{" "}
            {visible.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        <ol className="mt-2">
          {visible.map((resource, index) => (
            <li key={resource.id}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-x-8 gap-y-3 border-b border-rule py-7 transition-colors duration-300 hover:bg-paper-sunk md:grid-cols-12"
              >
                <span
                  aria-hidden="true"
                  className="numeral text-sm text-brass md:col-span-1"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="md:col-span-4">
                  <h3 className="flex items-baseline gap-2 font-display text-xl leading-snug text-ink lg:text-2xl">
                    <span className="rule-link">{resource.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{resource.by}</p>
                </div>

                <p className="max-w-[54ch] text-sm leading-relaxed text-ink-soft md:col-span-5">
                  {resource.note}
                </p>

                <div className="flex gap-x-4 md:col-span-2 md:flex-col md:items-end md:gap-y-3 md:text-right">
                  <span className="eyebrow text-ink">{resource.category}</span>
                  <span className="eyebrow text-ink-muted">
                    {resource.format}
                  </span>
                </div>

                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
