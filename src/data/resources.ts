export const themes = [
  "Getting In",
  "The Craft",
  "AI & Evals",
  "Growth",
  "Career",
  "Templates & Tools",
] as const;

export type Theme = (typeof themes)[number];

/** Format of the resource. Anything goes except an automated feed. */
export type Media =
  | "Article"
  | "Newsletter"
  | "Podcast"
  | "Video"
  | "Talk"
  | "Guide"
  | "Template";

export type Resource = {
  /** Stable key for React lists and deep links. */
  id: string;
  title: string;
  /** Author or publisher, shown as the byline. */
  by: string;
  url: string;
  theme: Theme;
  media: Media;
  /** ISO date this entry was added — drives "new" badges and sorting. */
  added: string;
  /** One sentence on why it earns a place in the collection. */
  note: string;
};

/**
 * Entries point at canonical homes (a publication, a show, an author's
 * archive, a specific essay) rather than at single posts that rot.
 * Add new rows here — filtering, search, themes and the sitemap all
 * derive from this list.
 */
export const resources: readonly Resource[] = [
  // ── Getting In ────────────────────────────────────────────────────────────
  {
    id: "lennys-newsletter",
    title: "Lenny's Newsletter",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/",
    theme: "Getting In",
    media: "Newsletter",
    added: "2026-05-02",
    note: "The default starting point. Deep, sourced answers to the questions every new PM asks in their first year.",
  },
  {
    id: "lennys-podcast",
    title: "Lenny's Podcast",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/podcast",
    theme: "Getting In",
    media: "Podcast",
    added: "2026-08-01",
    note: "Long-form interviews with operators who have actually done the thing. Worth the full hour rather than the summary.",
  },
  {
    id: "svpg-articles",
    title: "SVPG Articles",
    by: "Marty Cagan",
    url: "https://www.svpg.com/articles/",
    theme: "Getting In",
    media: "Article",
    added: "2026-05-02",
    note: "The archive that defined the empowered product team. Opinionated, occasionally uncomfortable, still the baseline vocabulary.",
  },
  {
    id: "product-talk",
    title: "Product Talk",
    by: "Teresa Torres",
    url: "https://www.producttalk.org/",
    theme: "Getting In",
    media: "Article",
    added: "2026-05-14",
    note: "Continuous discovery, taught properly. The opportunity solution tree alone will change how you run interviews.",
  },
  {
    id: "first-round-review",
    title: "First Round Review",
    by: "First Round Capital",
    url: "https://review.firstround.com/",
    theme: "Getting In",
    media: "Article",
    added: "2026-05-14",
    note: "Long-form operator interviews with the editorial standard of a magazine. Read for range before you specialise.",
  },
  {
    id: "mind-the-product",
    title: "Mind the Product",
    by: "Mind the Product",
    url: "https://www.mindtheproduct.com/",
    theme: "Getting In",
    media: "Talk",
    added: "2026-06-20",
    note: "Conference talks and community writing. The keynote archive is genuinely good once you know whose sessions to pick.",
  },

  // ── The Craft ─────────────────────────────────────────────────────────────
  {
    id: "behind-the-craft",
    title: "Behind the Craft",
    by: "Peter Yang",
    url: "https://creatoreconomy.so/",
    theme: "The Craft",
    media: "Newsletter",
    added: "2026-05-02",
    note: "Teardowns and operator interviews. Peter writes up the useful part so you can act on it the same week.",
  },
  {
    id: "beautiful-mess",
    title: "The Beautiful Mess",
    by: "John Cutler",
    url: "https://cutlefish.substack.com/",
    theme: "The Craft",
    media: "Newsletter",
    added: "2026-05-14",
    note: "Systems thinking about why product orgs behave the way they do. The best diagnosis of dysfunction you'll find written down.",
  },
  {
    id: "looking-glass",
    title: "The Looking Glass",
    by: "Julie Zhuo",
    url: "https://lg.substack.com/",
    theme: "The Craft",
    media: "Newsletter",
    added: "2026-05-14",
    note: "Design-rooted writing on judgement and taste — the parts of the job that never make it into a competency framework.",
  },
  {
    id: "melissa-perri",
    title: "Melissa Perri",
    by: "Melissa Perri",
    url: "https://melissaperri.com/blog",
    theme: "The Craft",
    media: "Article",
    added: "2026-06-20",
    note: "The build trap, product operations, and what product leadership means once you're past a single team.",
  },
  {
    id: "bring-the-donuts",
    title: "Bring the Donuts",
    by: "Ken Norton",
    url: "https://www.bringthedonuts.com/",
    theme: "The Craft",
    media: "Article",
    added: "2026-06-20",
    note: "Essays and a reading list from a former Google PM turned coach. Short pieces, unusually high signal per word.",
  },

  // ── AI & Evals ────────────────────────────────────────────────────────────
  {
    id: "hamel-evals",
    title: "Your AI Product Needs Evals",
    by: "Hamel Husain",
    url: "https://hamel.dev/blog/posts/evals/",
    theme: "AI & Evals",
    media: "Article",
    added: "2026-07-11",
    note: "Start here. The argument for why shipping AI without an evaluation system is shipping blind, and what to build instead.",
  },
  {
    id: "hamel-evals-faq",
    title: "LLM Evals: Everything You Need to Know",
    by: "Hamel Husain",
    url: "https://hamel.dev/blog/posts/evals-faq/",
    theme: "AI & Evals",
    media: "Guide",
    added: "2026-07-11",
    note: "The FAQ compiled from teaching thousands of PMs and engineers. Answers the questions you'd be embarrassed to ask.",
  },
  {
    id: "hamel-blog",
    title: "Hamel's Blog",
    by: "Hamel Husain",
    url: "https://hamel.dev/",
    theme: "AI & Evals",
    media: "Article",
    added: "2026-07-11",
    note: "The full archive — error analysis, LLM-as-judge, and the failure modes that only show up in production.",
  },
  {
    id: "how-i-ai",
    title: "How I AI",
    by: "Claire Vo",
    url: "https://www.lennysnewsletter.com/p/introducing-how-i-ai",
    theme: "AI & Evals",
    media: "Podcast",
    added: "2026-08-01",
    note: "Thirty-minute episodes built around a live demo. You watch someone actually use the tool rather than describe it.",
  },
  {
    id: "anthropic-docs",
    title: "Claude Documentation",
    by: "Anthropic",
    url: "https://docs.claude.com/",
    theme: "AI & Evals",
    media: "Guide",
    added: "2026-07-25",
    note: "Read the primary source. Prompt design, tool use, and evaluation guidance straight from the people building the model.",
  },
  {
    id: "claire-vo",
    title: "Claire Vo",
    by: "Claire Vo",
    url: "https://clairevo.com/",
    theme: "AI & Evals",
    media: "Article",
    added: "2026-07-25",
    note: "A sitting CPO writing about running product with AI in the loop, rather than speculating about it from the sidelines.",
  },

  // ── Growth ────────────────────────────────────────────────────────────────
  {
    id: "elenas-growth-scoop",
    title: "Elena's Growth Scoop",
    by: "Elena Verna",
    url: "https://www.elenaverna.com/",
    theme: "Growth",
    media: "Newsletter",
    added: "2026-05-02",
    note: "Product-led growth from someone who has run it at scale. Clear on what compounds and what only looks like it does.",
  },
  {
    id: "reforge-blog",
    title: "Reforge Blog",
    by: "Reforge",
    url: "https://www.reforge.com/blog",
    theme: "Growth",
    media: "Article",
    added: "2026-06-20",
    note: "Structured frameworks for growth loops, retention, and monetisation. Dense — read one piece properly rather than five quickly.",
  },

  // ── Career ────────────────────────────────────────────────────────────────
  {
    id: "the-skip",
    title: "The Skip",
    by: "Nikhyl Singhal",
    url: "https://www.skip.show/",
    theme: "Career",
    media: "Podcast",
    added: "2026-05-02",
    note: "Levels, scope, and the honest mechanics of promotion. Both the writing and the episodes are worth your time.",
  },
  {
    id: "pragmatic-engineer",
    title: "The Pragmatic Engineer",
    by: "Gergely Orosz",
    url: "https://newsletter.pragmaticengineer.com/",
    theme: "Career",
    media: "Newsletter",
    added: "2026-05-14",
    note: "Written for engineers, invaluable for PMs. The fastest way to understand what your counterparts are actually dealing with.",
  },
  {
    id: "irrational-exuberance",
    title: "Irrational Exuberance",
    by: "Will Larson",
    url: "https://lethain.com/",
    theme: "Career",
    media: "Article",
    added: "2026-06-20",
    note: "Engineering leadership writing that transfers cleanly to product. Especially good on strategy documents and org design.",
  },

  // ── Templates & Tools ─────────────────────────────────────────────────────
  {
    id: "chatprd",
    title: "ChatPRD",
    by: "Claire Vo",
    url: "https://www.chatprd.ai/",
    theme: "Templates & Tools",
    media: "Template",
    added: "2026-07-25",
    note: "Drafts and critiques PRDs on demand. Most useful as a second opinion on structure, not as a first draft you ship unread.",
  },
];

/** Entries added within this window of the last revision are flagged "New". */
const NEW_WINDOW_DAYS = 45;

export function isNew(resource: Resource, reference: Date): boolean {
  const added = new Date(resource.added).getTime();
  const days = (reference.getTime() - added) / 86_400_000;
  return days >= 0 && days <= NEW_WINDOW_DAYS;
}
