/**
 * Editorial plates: abstract compositions drawn in the site's inks, in
 * place of stock photography. Inline SVG so they cost no requests, scale
 * cleanly, and stay in palette. Shapes overlap with multiply blending to
 * get the ink-on-ink look of a printed cover.
 */

type PlateProps = {
  className?: string;
};

export function HeroPlate({ className }: PlateProps) {
  return (
    <svg
      viewBox="0 0 420 520"
      className={className}
      role="img"
      aria-label="Abstract editorial composition of arcs and circles in brass, forest green and clay"
    >
      <defs>
        <filter id="plate-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <clipPath id="plate-frame">
          <rect x="0" y="0" width="420" height="520" />
        </clipPath>
      </defs>

      <g clipPath="url(#plate-frame)">
        <rect width="420" height="520" fill="var(--color-paper-sunk)" />

        {/* Ruled band, like a masthead's leading rules */}
        <g stroke="var(--color-rule-strong)" strokeWidth="1">
          {[40, 52, 64, 76].map((y) => (
            <line key={y} x1="0" y1={y} x2="420" y2={y} />
          ))}
        </g>

        <g style={{ mixBlendMode: "multiply" }}>
          {/* Rising arc */}
          <path
            d="M -40 520 A 250 250 0 0 1 460 520 Z"
            fill="var(--color-forest)"
            opacity="0.92"
          />
          {/* Clay disc, half-caught by the arc */}
          <circle cx="286" cy="196" r="92" fill="var(--color-clay)" />
          {/* Brass ring */}
          <circle
            cx="150"
            cy="250"
            r="118"
            fill="none"
            stroke="var(--color-brass)"
            strokeWidth="1.5"
          />
          <circle
            cx="150"
            cy="250"
            r="86"
            fill="none"
            stroke="var(--color-brass)"
            strokeWidth="1.5"
          />
        </g>

        {/* Hairline crosshair, a printer's registration mark */}
        <g stroke="var(--color-paper)" strokeWidth="1" opacity="0.7">
          <line x1="286" y1="160" x2="286" y2="232" />
          <line x1="250" y1="196" x2="322" y2="196" />
        </g>

        <rect
          width="420"
          height="520"
          filter="url(#plate-grain)"
          opacity="0.14"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
    </svg>
  );
}

/** Small repeating motif used to break up long stretches of text. */
export function RuleMark({ className }: PlateProps) {
  return (
    <svg
      viewBox="0 0 120 12"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1="0"
        y1="6"
        x2="44"
        y2="6"
        stroke="var(--color-rule-strong)"
        strokeWidth="1"
      />
      <circle cx="60" cy="6" r="4" fill="var(--color-brass)" />
      <line
        x1="76"
        y1="6"
        x2="120"
        y2="6"
        stroke="var(--color-rule-strong)"
        strokeWidth="1"
      />
    </svg>
  );
}
