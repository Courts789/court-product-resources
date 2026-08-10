import type { Theme } from "@/data/resources";

/**
 * One ink per theme, in the spirit of a magazine giving each section its
 * own colour. Values are dark enough to carry text on the ivory paper, so
 * they work as headings and labels rather than decoration alone.
 */
export const themeAccent: Record<Theme, string> = {
  "Getting In": "var(--color-forest)",
  "The Craft": "var(--color-navy)",
  "AI & Evals": "var(--color-brass-deep)",
  Growth: "var(--color-clay)",
  Career: "var(--color-teal)",
  "Templates & Tools": "var(--color-oxblood)",
};

/** Accent per featured voice, keyed by name, in running order. */
export const voiceAccents = [
  "var(--color-forest)",
  "var(--color-clay)",
  "var(--color-navy)",
  "var(--color-oxblood)",
  "var(--color-teal)",
] as const;

/** Initials for the monogram plates on the voices list. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
