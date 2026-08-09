import { Asterisk } from "@/components/icons";

const columns = [
  {
    heading: "What this is",
    body: "Conversations, templates, and summaries. Things written down, so you can skim them, save them, and come back when the problem is actually in front of you.",
  },
  {
    heading: "What this isn't",
    body: "A feed. There is no algorithm here, nothing to scroll past, and no keynote recording where the useful part arrives at minute forty-one.",
  },
  {
    heading: "Who it's for",
    body: "People moving into product, people already in it who want to get sharper, and anyone trying to work out what this job becomes on the other side of AI.",
  },
] as const;

export function Premise() {
  return (
    <section
      id="premise"
      aria-labelledby="premise-title"
      className="border-b border-rule bg-paper-sunk"
    >
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <h2 id="premise-title" className="eyebrow text-brass-deep">
          The Premise
        </h2>

        <div className="mt-10 grid gap-y-12 md:grid-cols-12 md:gap-x-16">
          <blockquote className="md:col-span-7">
            <p className="text-[length:var(--text-section)] font-display leading-[1.25] text-ink">
              No clickbait. No overwhelming feed. No pointless conference
              keynotes where you learn nothing.
            </p>
            <p className="mt-6 text-[length:var(--text-section)] font-display italic leading-[1.25] text-ink-soft">
              Just conversations, templates, and summaries on product
              management&nbsp;&mdash; to get you in, or lift you up.
            </p>
          </blockquote>

          <div className="flex items-start md:col-span-4 md:col-start-9">
            <Asterisk className="mt-1 h-4 w-4 shrink-0 text-brass" />
            <p className="ml-4 text-sm leading-relaxed text-ink-muted">
              Everything listed here is text you can read at your own pace.
              Where a contributor also hosts a show, the link points at their
              writing rather than the audio feed.
            </p>
          </div>
        </div>

        <dl className="mt-16 grid gap-px border-t border-rule sm:grid-cols-3 sm:border-t-0">
          {columns.map((column) => (
            <div
              key={column.heading}
              className="border-b border-rule py-8 sm:border-b-0 sm:border-t sm:pr-8"
            >
              <dt className="font-display text-xl text-ink">
                {column.heading}
              </dt>
              <dd className="mt-3 max-w-[42ch] text-sm leading-relaxed text-ink-muted">
                {column.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
