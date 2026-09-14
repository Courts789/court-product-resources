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
      aria-label="Loose clippings scattering above a single highlighted pick, settling into stacked sage, butter and blush bands"
    >
      <defs>
        <clipPath id="plate-frame">
          <rect x="0" y="0" width="420" height="460" rx="14" />
        </clipPath>
      </defs>

      <g clipPath="url(#plate-frame)">
        <rect width="420" height="460" fill="var(--color-paper)" />

        {/* Clippings: an unsorted field, cut square, no radius */}
        <g stroke="var(--color-rule-strong)">
          <rect x="60" y="40" width="16" height="16" fill="var(--color-blush)" />
          <rect
            x="104"
            y="34"
            width="16"
            height="10"
            fill="var(--color-sky)"
            transform="rotate(-10 112 39)"
          />
          <rect x="164" y="58" width="12" height="12" fill="none" strokeWidth="1.5" />
          <rect
            x="206"
            y="30"
            width="12"
            height="12"
            fill="var(--color-apricot)"
            transform="rotate(14 212 36)"
          />
          <line x1="248" y1="46" x2="266" y2="58" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="296" y="36" width="14" height="14" fill="var(--color-lilac)" />
          <rect
            x="330"
            y="54"
            width="14"
            height="8"
            fill="var(--color-butter)"
            transform="rotate(-7 337 58)"
          />
          <rect x="362" y="34" width="10" height="10" fill="none" strokeWidth="1.5" />
          <rect x="42" y="90" width="10" height="10" fill="var(--color-butter)" />
          <rect
            x="144"
            y="88"
            width="12"
            height="12"
            fill="var(--color-blush)"
            transform="rotate(11 150 94)"
          />
          <line x1="228" y1="86" x2="244" y2="98" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="312" y="92" width="12" height="12" fill="var(--color-sky)" />
          <rect x="376" y="82" width="14" height="14" fill="none" strokeWidth="1.5" />
          <rect x="196" y="102" width="8" height="8" fill="var(--color-lilac)" />
        </g>

        {/* The pick: one chip riding the sorting line */}
        <line
          x1="34"
          y1="150"
          x2="386"
          y2="150"
          stroke="var(--color-rule-strong)"
          strokeWidth="2"
        />
        <rect x="178" y="143.5" width="64" height="13" rx="6.5" fill="var(--color-apricot)" />

        {/* Settled: the field resolves into stock, bottom-up */}
        <rect y="160" width="420" height="40" fill="var(--color-blush)" />
        <rect y="200" width="420" height="45" fill="var(--color-butter)" />
        <rect y="245" width="420" height="215" fill="var(--color-sage)" />

        <circle cx="210" cy="300" r="92" fill="var(--color-sky)" />
        <path
          d="M 118 300 A 92 92 0 0 1 302 300 Z"
          fill="var(--color-lilac)"
        />

        {/* Pine keyline: the primary asserting itself once */}
        <circle
          cx="210"
          cy="300"
          r="92"
          fill="none"
          stroke="var(--color-pine)"
          strokeWidth="2"
        />
        <line
          x1="118"
          y1="300"
          x2="302"
          y2="300"
          stroke="var(--color-pine)"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
