import { RuleMark } from "@/components/plate";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Accent ink for the eyebrow, so each page has its own colour. */
  accent?: string;
};

/** Shared masthead block so every page opens the same way. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  accent = "var(--color-brass-deep)",
}: PageHeaderProps) {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[84rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <p style={{ color: accent }} className="eyebrow">
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-[20ch] text-[length:var(--text-section)] leading-[1.1] text-ink">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-[58ch] font-display text-[length:var(--text-lede)] leading-[1.45] text-ink-soft">
            {intro}
          </p>
        ) : (
          <RuleMark className="mt-8 h-3 w-28" />
        )}
      </div>
    </section>
  );
}
