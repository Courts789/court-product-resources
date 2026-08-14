type TickerProps = {
  /** Phrases shown in order, separated by a printer's dot. */
  items: readonly string[];
  /** Band fill. Defaults to butter, the system's standing highlight. */
  stock?: string;
};

/**
 * A standing rule that runs, marking the seam between sections the way a
 * printed band does. The phrases are duplicated so the loop has no visible
 * gap; the copy is hidden from screen readers, which get the run once.
 *
 * For anyone who has asked for reduced motion the band holds still and
 * simply reads as a static rule, which is why the phrases have to make
 * sense in any order and none of them can be a call to action.
 */
export function Ticker({ items, stock = "var(--color-butter)" }: TickerProps) {
  const run = items.join("  ·  ");

  return (
    <div
      style={{ backgroundColor: stock }}
      className="overflow-hidden py-2.5 text-ink"
    >
      <span className="ticker-track headline text-base sm:text-lg">
        {run}
        <span aria-hidden="true">{"  ·  " + run}</span>
      </span>
    </div>
  );
}
