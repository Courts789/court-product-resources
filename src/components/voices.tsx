import { voices } from "@/data/voices";
import { ArrowUpRight } from "@/components/icons";
import { initials, voiceInks, voiceStocks } from "@/lib/accents";

export function Voices() {
  return (
    <section>
      <div className="mx-auto max-w-[84rem] px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
        <ol className="border-t border-rule">
          {voices.map((voice, index) => {
            const stock = voiceStocks[index % voiceStocks.length];
            const ink = voiceInks[index % voiceInks.length];
            return (
              <li key={voice.name}>
                <a
                  href={voice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-x-8 gap-y-4 border-b border-rule py-7 transition-colors duration-300 hover:bg-paper-sunk md:grid-cols-12 md:py-10"
                >
                  {/*
                    Monogram plate stands in for a portrait: in palette, and
                    no licensing question. It shares a line with the name at
                    every width; on a phone that is what keeps the entry from
                    spending a whole row on a circle.
                  */}
                  <div className="flex items-center gap-4 md:col-span-5 md:gap-6">
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: stock }}
                      className="headline flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg text-ink transition-transform duration-300 group-hover:-translate-y-0.5 md:h-16 md:w-16 md:text-xl"
                    >
                      {initials(voice.name)}
                    </span>

                    <div className="min-w-0">
                      <h3 className="flex items-baseline gap-2 text-xl text-ink sm:text-2xl lg:text-[1.75rem]">
                        <span className="rule-link">{voice.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted md:mt-2">
                        {voice.role}
                      </p>
                    </div>
                  </div>

                  <p className="max-w-[54ch] text-sm leading-relaxed text-ink-soft md:col-span-4">
                    {voice.note}
                  </p>

                  <div className="md:col-span-3 md:text-right">
                    <span style={{ color: ink }} className="eyebrow block">
                      {voice.publication}
                    </span>
                    <span className="mt-2 block text-xs leading-relaxed text-ink-muted md:mt-3">
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
