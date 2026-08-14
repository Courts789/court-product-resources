import { Asterisk } from "@/components/icons";

const columns = [
  {
    heading: "What this is",
    stock: "var(--color-sage)",
    ink: "var(--color-pine)",
    body: "Conversations, templates, and summaries. Articles, podcasts, videos and books, whatever format the good stuff happens to arrive in.",
  },
  {
    heading: "What this isn't",
    stock: "var(--color-blush)",
    ink: "var(--color-rust)",
    body: "An automated feed. Nothing lands here because it trended, and nothing is here to be scrolled past on the way to something else.",
  },
  {
    heading: "Who it's for",
    stock: "var(--color-sky)",
    ink: "var(--color-slate)",
    body: "People moving into product, people already in it who want to get sharper, and anyone trying to work out what this job becomes on the other side of AI.",
  },
] as const;

export function Premise() {
  return (
    <section>
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-16">
          {/*
            The one place Georgia appears. Quotation is set apart from the
            grotesque everything else is in, so it reads as a voice rather
            than as more of the page.
          */}
          <blockquote className="md:col-span-7">
            <p className="font-serif text-[length:var(--text-section)] leading-[1.18] text-ink">
              No clickbait. No overwhelming feed. No pointless conference
              keynotes where you learn nothing.
            </p>
            <p className="mt-6 font-serif text-[length:var(--text-section)] italic leading-[1.18] text-pine">
              Just conversations, templates, and summaries on product
              management: to get you in, or lift you up.
            </p>
          </blockquote>

          <div className="flex items-start self-start rounded-card bg-butter p-6 md:col-span-4 md:col-start-9">
            <Asterisk className="mt-1 h-4 w-4 shrink-0 text-olive" />
            <p className="ml-4 text-sm leading-relaxed text-ink-soft">
              There are podcast episodes, videos and keynote recordings in here.
              The good ones. Every entry was picked by a person who read,
              watched or listened to it first.
            </p>
          </div>
        </div>

        <dl className="mt-16 grid gap-4 sm:grid-cols-3">
          {columns.map((column) => (
            <div
              key={column.heading}
              style={{ backgroundColor: column.stock }}
              className="rounded-card p-7"
            >
              <dt style={{ color: column.ink }} className="eyebrow">
                {column.heading}
              </dt>
              <dd className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ink-soft">
                {column.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
