/**
 * Field plates: flat, cut-paper compositions in the section stocks, in
 * place of stock photography. Inline SVG so they cost no requests, scale
 * cleanly, and stay in palette.
 *
 * Field Press is a flat system, so these are built from overlapping solid
 * shapes with hard edges rather than blended inks. The only softness is
 * the card radius, which the plate shares so it sits with everything else.
 */

type PlateProps = {
  className?: string;
};

export function HeroPlate({ className }: PlateProps) {
  return (
    <svg
      viewBox="0 0 420 460"
      className={className}
      role="img"
      aria-label="Flat composition of stacked shapes in sage, butter, blush and sky"
    >
      <defs>
        <clipPath id="plate-frame">
          <rect x="0" y="0" width="420" height="460" rx="14" />
        </clipPath>
      </defs>

      <g clipPath="url(#plate-frame)">
        <rect width="420" height="460" fill="var(--color-paper)" />

        {/* Six bands, one per theme, read bottom-up like a stratum column */}
        <rect y="330" width="420" height="130" fill="var(--color-sage)" />
        <rect y="266" width="420" height="64" fill="var(--color-butter)" />
        <rect y="214" width="420" height="52" fill="var(--color-blush)" />

        {/* Disc rising out of the bands, split into two stocks */}
        <circle cx="210" cy="300" r="118" fill="var(--color-sky)" />
        <path
          d="M 92 300 A 118 118 0 0 1 328 300 Z"
          fill="var(--color-lilac)"
        />

        {/* Pine keyline arc, the primary asserting itself once */}
        <circle
          cx="210"
          cy="300"
          r="118"
          fill="none"
          stroke="var(--color-pine)"
          strokeWidth="2"
        />
        <line
          x1="92"
          y1="300"
          x2="328"
          y2="300"
          stroke="var(--color-pine)"
          strokeWidth="2"
        />

        {/* Ruled band at the head, like a guide's leading rules */}
        <g stroke="var(--color-rule-strong)" strokeWidth="2">
          {[40, 56, 72].map((y) => (
            <line key={y} x1="34" y1={y} x2="386" y2={y} />
          ))}
        </g>
        <rect
          x="34"
          y="104"
          width="86"
          height="14"
          rx="7"
          fill="var(--color-apricot)"
        />
      </g>
    </svg>
  );
}
