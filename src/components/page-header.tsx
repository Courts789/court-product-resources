type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Section stock behind the block, so each page opens in its own colour. */
  stock?: string;
  /** Section ink for the eyebrow, dark enough to set on that stock. */
  ink?: string;
};

/**
 * Shared masthead block so every page opens the same way: a stocked slab,
 * a tracked label, and a condensed headline set as large as it will go.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  stock = "var(--color-sage)",
  ink = "var(--color-pine)",
}: PageHeaderProps) {
  return (
    <section style={{ backgroundColor: stock }}>
      <div className="mx-auto max-w-[84rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <p style={{ color: ink }} className="eyebrow">
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-[16ch] text-[length:var(--text-section)] text-ink">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-[54ch] text-[length:var(--text-lede)] leading-[1.5] text-ink-soft">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
