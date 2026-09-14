export const themes = [
  "The Craft",
  "Operating Model",
  "Design",
  "AI",
  "Evals",
  "Growth",
  "PMM",
  "Career",
  "Templates & Tools",
] as const;

export type Theme = (typeof themes)[number];

/** Format of the resource. Anything goes except an automated feed. */
export type Media =
  "Article" | "Podcast" | "Video" | "Book" | "Guide" | "Template";

export type Resource = {
  /** Stable key for React lists and deep links. */
  id: string;
  title: string;
  /** Author or publisher, shown as the byline. */
  by: string;
  url: string;
  theme: Theme;
  media: Media;
  /**
   * What it costs you, in words, e.g. "12 min read" or "85 min listen".
   * Shown on every entry: the whole point of the collection is that you
   * can see what you are committing to before you commit to it.
   */
  time: string;
  /** ISO date this entry was added, drives "new" badges and sorting. */
  added: string;
  /**
   * Why it is worth your time, as Courtney put it: the lead line of her own
   * notes on it. Never an opinion she did not write.
   */
  verdict: string;
  /**
   * The rest of her notes, pieced together into sentences. Empty when the
   * lead line already says everything she wrote.
   */
  note: string;
};

/**
 * Every entry is one thing: this episode, this essay, this chapter. Not a
 * show, not a newsletter, not a person's whole archive.
 *
 * That rule is the collection. Pointing someone at "Lenny's Podcast" hands
 * them four hundred hours and a decision to make, which is the problem
 * this site exists to solve rather than the shape of a recommendation.
 * Top Picks is the one place a whole body of work gets recommended,
 * because there the person is the point.
 *
 * The entries themselves live in content/library as one markdown file each,
 * so they can be written in Obsidian instead of hand-typed into an array.
 * `npm run library` compiles that folder into resources.generated.ts, which
 * is what this re-exports. Add an entry by adding a file, not by editing
 * the generated list. Read times come from the publisher's own word count
 * at about 230 words a minute; listen times are the episode's actual
 * runtime, rounded to the minute.
 */
export { resources } from "./resources.generated";

/** Entries added within this window of the last revision are flagged "New". */
const NEW_WINDOW_DAYS = 45;

export function isNew(resource: Resource, reference: Date): boolean {
  const added = new Date(resource.added).getTime();
  const days = (reference.getTime() - added) / 86_400_000;
  return days >= 0 && days <= NEW_WINDOW_DAYS;
}
