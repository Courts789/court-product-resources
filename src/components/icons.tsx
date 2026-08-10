/**
 * Minimal line-icon set. Stroked, 1px, currentColor, no filled shapes,
 * no emoji. Decorative by default; callers supply accessible text.
 */

type IconProps = {
  className?: string;
};

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M4.5 11.5L11.5 4.5" />
      <path d="M5.75 4.5H11.5V10.25" />
    </svg>
  );
}

export function Asterisk({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M8 2.5V13.5" />
      <path d="M3.24 5.25L12.76 10.75" />
      <path d="M3.24 10.75L12.76 5.25" />
    </svg>
  );
}
