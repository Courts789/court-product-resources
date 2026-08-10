import { SuggestionForm } from "@/components/suggestion-form";
import { RuleMark } from "@/components/plate";

export function SuggestSection() {
  return (
    <section
      id="suggest"
      aria-labelledby="suggest-title"
      className="border-t border-rule bg-paper-sunk"
    >
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-4">
            <h2 id="suggest-title" className="eyebrow text-brass-deep">
              Suggest a Resource
            </h2>
            <p className="mt-6 max-w-[24ch] font-display text-[length:var(--text-section)] leading-[1.15] text-ink">
              Found something good?
            </p>
            <RuleMark className="mt-6 h-3 w-28" />
            <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-ink-muted">
              Every entry here was picked by a person, and that includes the
              ones people send me. Tell me what you found and why it stuck with
              you.
            </p>
          </div>

          <div className="md:col-span-8">
            <SuggestionForm />
          </div>
        </div>
      </div>
    </section>
  );
}
