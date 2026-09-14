import type { Theme } from "@/data/resources";

/**
 * Each theme is a printed section with its own stock and its own ink.
 *
 * `themeStock` fills cards and blocks, and always carries --color-ink on
 * top. `themeInk` is the same hue taken dark enough to set as type, on
 * paper or on its own stock; it is for labels, rules and numerals, never
 * for body copy, which stays --color-ink-soft everywhere.
 */
export const themeStock: Record<Theme, string> = {
  "Getting In": "var(--color-sage)",
  "The Craft": "var(--color-butter)",
  "Operating Model": "var(--color-rose)",
  AI: "var(--color-lilac)",
  Evals: "var(--color-mint)",
  Growth: "var(--color-blush)",
  Career: "var(--color-sky)",
  "Templates & Tools": "var(--color-apricot)",
};

export const themeInk: Record<Theme, string> = {
  "Getting In": "var(--color-pine)",
  "The Craft": "var(--color-olive)",
  "Operating Model": "var(--color-berry)",
  AI: "var(--color-plum)",
  Evals: "var(--color-teal)",
  Growth: "var(--color-rust)",
  Career: "var(--color-slate)",
  "Templates & Tools": "var(--color-ember)",
};

/** Stock and ink per featured voice, in running order. */
export const voiceStocks = [
  "var(--color-sage)",
  "var(--color-butter)",
  "var(--color-blush)",
  "var(--color-sky)",
  "var(--color-lilac)",
] as const;

export const voiceInks = [
  "var(--color-pine)",
  "var(--color-olive)",
  "var(--color-rust)",
  "var(--color-slate)",
  "var(--color-plum)",
] as const;

/** Initials for the monogram plates on the voices list. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
