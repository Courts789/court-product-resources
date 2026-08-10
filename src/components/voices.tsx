import { voices } from "@/data/voices";
import { ArrowUpRight } from "@/components/icons";
import { initials, voiceAccents } from "@/lib/accents";

export function Voices() {
  return (
    <section
      id="voices"
      aria-labelledby="voices-title"
      className="border-b border-rule"
    >
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-16">
          <h2
            id="voices-title"
            className="eyebrow text-brass-deep md:col-span-3"
          >
            Top Picks
          </h2>
          <p className="max-w-[52ch] font-display text-[length:var(--text-lede)] leading-[1.45] text-ink-soft md:col-span-9">
            The five people I come back to most. When I need a straight answer,
            I start here, because they actually know what they&rsquo;re talking
            about.
          </p>
        </div>

        <ol className="mt-14 border-t border-rule">
          {voices.map((voice, index) => {
            const accent = voiceAccents[index % voiceAccents.length];
            return (
              <li key={voice.name}>
                <a
                  href={voice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-x-8 gap-y-4 border-b border-rule py-8 transition-colors duration-300 hover:bg-paper-sunk md:grid-cols-12 md:py-10"
                >
                  {/* Monogram plate stands in for a portrait: in palette,
                      and no licensing question. */}
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: accent }}
                    className="flex h-14 w-14 shrink-0 items-center justify-center font-display text-lg text-paper transition-transform duration-300 group-hover:-translate-y-0.5 md:col-span-1 md:h-16 md:w-16"
                  >
                    {initials(voice.name)}
                  </span>

                  <div className="md:col-span-4">
                    <h3 className="flex items-baseline gap-2 font-display text-2xl leading-tight text-ink lg:text-[1.75rem]">
                      <span className="rule-link">{voice.name}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {voice.role}
                    </p>
                  </div>

                  <p className="max-w-[54ch] text-sm leading-relaxed text-ink-soft md:col-span-5">
                    {voice.note}
                  </p>

                  <div className="md:col-span-2 md:text-right">
                    <span
                      style={{ color: accent }}
                      className="eyebrow block font-semibold"
                    >
                      {voice.publication}
                    </span>
                    <span className="mt-3 block text-xs leading-relaxed text-ink-muted">
                      {voice.topics.join(" · ")}
                    </span>
                  </div>

                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
