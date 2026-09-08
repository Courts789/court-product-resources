import { Asterisk } from "@/components/icons";

/**
 * The three boxes are the settled part of this page: what it is, what it
 * isn't, who it's for. Everything above them is the argument for why they
 * are needed, and it should not restate them.
 */
const columns = [
  {
    heading: "What this is",
    stock: "var(--color-sage)",
    ink: "var(--color-pine)",
    body: "Specific things. This episode, this article, this chapter, with a line on what you get out of it and roughly what it costs you in time.",
  },
  {
    heading: "What this isn't",
    stock: "var(--color-blush)",
    ink: "var(--color-rust)",
    body: "A feed, a follow list, or a wall of shows to subscribe to. Nothing lands here because it trended, and nothing is here to be scrolled past.",
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
          <div className="md:col-span-7">
            <p className="text-[length:var(--text-lede)] leading-[1.5] text-ink">
              I have felt the overwhelm since the day I moved into product.
              The books, the frameworks, the newsletters everyone assumes
              you&rsquo;ve already read. Then AI arrived and multiplied all of
              it by about a hundred.
            </p>

            <p className="mt-8 max-w-[68ch] leading-relaxed text-ink-soft">
              It isn&rsquo;t only that there is more. It&rsquo;s that so much of
              it is the same thing said again, or thin, or quietly selling you
              a course at the end. And the good stuff keeps getting longer:
              podcasts that were forty minutes are now two and a half hours.
              Keeping up with everything out there stopped being difficult and
              became genuinely impossible, which means the useful skill is no
              longer finding things. It&rsquo;s knowing which forty minutes are
              worth your evening.
            </p>

            {/*
              The one place Georgia appears. Quotation is set apart from the
              grotesque everything else is in, so it reads as a voice rather
              than as more of the page.
            */}
            <blockquote className="mt-10 border-l-2 border-pine pl-6">
              <p className="font-serif text-[length:var(--text-section)] leading-[1.18] text-pine">
                So nothing here comes from a feed. Every entry is something I
                read, watched or listened to properly, and thought was good
                enough to be worth amplifying.
              </p>
            </blockquote>
          </div>

          <div className="flex items-start self-start rounded-card bg-butter p-6 md:col-span-4 md:col-start-9">
            <Asterisk className="mt-1 h-4 w-4 shrink-0 text-olive" />
            <p className="ml-4 text-sm leading-relaxed text-ink-soft">
              I genuinely love this part: consuming it, arguing with it, and
              passing on what stuck. Half the value of a good episode is the
              conversation afterwards, so treat everything here as an opening
              argument rather than a verdict. Tell me where I&rsquo;m wrong.
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
