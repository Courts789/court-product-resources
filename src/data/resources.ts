export const categories = [
  "Getting In",
  "The Craft",
  "AI & Evals",
  "Growth",
  "Career",
  "Templates",
] as const;

export type Category = (typeof categories)[number];

export type Format = "Essay" | "Newsletter" | "Guide" | "Library" | "Template";

export type Resource = {
  /** Stable key for React lists and deep links. */
  id: string;
  title: string;
  /** Author or publisher, shown as the byline. */
  by: string;
  url: string;
  category: Category;
  format: Format;
  /** One sentence on why it earns a place in the index. */
  note: string;
};

/**
 * Entries point at canonical homes (a publication, an author's archive, a
 * specific essay) rather than at single posts that rot. Add new rows here —
 * the filter UI and sitemap derive everything else from this list.
 */
export const resources: readonly Resource[] = [
  // ── Getting In ────────────────────────────────────────────────────────────
  {
    id: "lennys-newsletter",
    title: "Lenny's Newsletter",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/",
    category: "Getting In",
    format: "Newsletter",
    note: "The default starting point. Deep, sourced answers to the questions every new PM asks in their first year.",
  },
  {
    id: "svpg-articles",
    title: "SVPG Articles",
    by: "Marty Cagan",
    url: "https://www.svpg.com/articles/",
    category: "Getting In",
    format: "Library",
    note: "The archive that defined the empowered product team. Opinionated, occasionally uncomfortable, still the baseline vocabulary.",
  },
  {
    id: "product-talk",
    title: "Product Talk",
    by: "Teresa Torres",
    url: "https://www.producttalk.org/",
    category: "Getting In",
    format: "Library",
    note: "Continuous discovery, taught properly. The opportunity solution tree alone will change how you run interviews.",
  },
  {
    id: "first-round-review",
    title: "First Round Review",
    by: "First Round Capital",
    url: "https://review.firstround.com/",
    category: "Getting In",
    format: "Library",
    note: "Long-form operator interviews with the editorial standard of a magazine. Read for range before you specialise.",
  },
  {
    id: "mind-the-product",
    title: "Mind the Product",
    by: "Mind the Product",
    url: "https://www.mindtheproduct.com/",
    category: "Getting In",
    format: "Library",
    note: "Broad community coverage. Useful for mapping the landscape and finding the sub-discipline that actually suits you.",
  },

  // ── The Craft ─────────────────────────────────────────────────────────────
  {
    id: "behind-the-craft",
    title: "Behind the Craft",
    by: "Peter Yang",
    url: "https://creatoreconomy.so/",
    category: "The Craft",
    format: "Newsletter",
    note: "Teardowns and operator interviews, written up so you can act on them without listening to an hour of audio.",
  },
  {
    id: "beautiful-mess",
    title: "The Beautiful Mess",
    by: "John Cutler",
    url: "https://cutlefish.substack.com/",
    category: "The Craft",
    format: "Newsletter",
    note: "Systems thinking about why product orgs behave the way they do. The best diagnosis of dysfunction you'll find written down.",
  },
  {
    id: "looking-glass",
    title: "The Looking Glass",
    by: "Julie Zhuo",
    url: "https://lg.substack.com/",
    category: "The Craft",
    format: "Newsletter",
    note: "Design-rooted writing on judgement and taste — the parts of the job that never make it into a competency framework.",
  },
  {
    id: "melissa-perri",
    title: "Melissa Perri",
    by: "Melissa Perri",
    url: "https://melissaperri.com/blog",
    category: "The Craft",
    format: "Library",
    note: "The build trap, product operations, and what product leadership means once you're past a single team.",
  },
  {
    id: "bring-the-donuts",
    title: "Bring the Donuts",
    by: "Ken Norton",
    url: "https://www.bringthedonuts.com/",
    category: "The Craft",
    format: "Library",
    note: "Essays and a reading list from a former Google PM turned coach. Short pieces, unusually high signal per word.",
  },

  // ── AI & Evals ────────────────────────────────────────────────────────────
  {
    id: "hamel-evals",
    title: "Your AI Product Needs Evals",
    by: "Hamel Husain",
    url: "https://hamel.dev/blog/posts/evals/",
    category: "AI & Evals",
    format: "Essay",
    note: "Start here. The argument for why shipping AI without an evaluation system is shipping blind, and what to build instead.",
  },
  {
    id: "hamel-evals-faq",
    title: "LLM Evals: Everything You Need to Know",
    by: "Hamel Husain",
    url: "https://hamel.dev/blog/posts/evals-faq/",
    category: "AI & Evals",
    format: "Guide",
    note: "The FAQ compiled from teaching thousands of PMs and engineers. Answers the questions you'd be embarrassed to ask.",
  },
  {
    id: "hamel-blog",
    title: "Hamel's Blog",
    by: "Hamel Husain",
    url: "https://hamel.dev/",
    category: "AI & Evals",
    format: "Library",
    note: "The full archive — error analysis, LLM-as-judge, and the failure modes that only show up in production.",
  },
  {
    id: "anthropic-docs",
    title: "Claude Documentation",
    by: "Anthropic",
    url: "https://docs.claude.com/",
    category: "AI & Evals",
    format: "Guide",
    note: "Read the primary source. Prompt design, tool use, and evaluation guidance straight from the people building the model.",
  },
  {
    id: "claire-vo",
    title: "Claire Vo",
    by: "Claire Vo",
    url: "https://clairevo.com/",
    category: "AI & Evals",
    format: "Library",
    note: "A sitting CPO writing about running product with AI in the loop, rather than speculating about it from the sidelines.",
  },

  // ── Growth ────────────────────────────────────────────────────────────────
  {
    id: "elenas-growth-scoop",
    title: "Elena's Growth Scoop",
    by: "Elena Verna",
    url: "https://www.elenaverna.com/",
    category: "Growth",
    format: "Newsletter",
    note: "Product-led growth from someone who has run it at scale. Clear on what compounds and what only looks like it does.",
  },
  {
    id: "reforge-blog",
    title: "Reforge Blog",
    by: "Reforge",
    url: "https://www.reforge.com/blog",
    category: "Growth",
    format: "Library",
    note: "Structured frameworks for growth loops, retention, and monetisation. Dense — read one piece properly rather than five quickly.",
  },

  // ── Career ────────────────────────────────────────────────────────────────
  {
    id: "the-skip",
    title: "The Skip",
    by: "Nikhyl Singhal",
    url: "https://www.skip.show/",
    category: "Career",
    format: "Newsletter",
    note: "Levels, scope, and the honest mechanics of promotion. The writing to read before your next career conversation.",
  },
  {
    id: "pragmatic-engineer",
    title: "The Pragmatic Engineer",
    by: "Gergely Orosz",
    url: "https://newsletter.pragmaticengineer.com/",
    category: "Career",
    format: "Newsletter",
    note: "Written for engineers, invaluable for PMs. The fastest way to understand what your counterparts are actually dealing with.",
  },
  {
    id: "irrational-exuberance",
    title: "Irrational Exuberance",
    by: "Will Larson",
    url: "https://lethain.com/",
    category: "Career",
    format: "Library",
    note: "Engineering leadership writing that transfers cleanly to product. Especially good on strategy documents and org design.",
  },

  // ── Templates ─────────────────────────────────────────────────────────────
  {
    id: "chatprd",
    title: "ChatPRD",
    by: "Claire Vo",
    url: "https://www.chatprd.ai/",
    category: "Templates",
    format: "Template",
    note: "Drafts and critiques PRDs on demand. Most useful as a second opinion on structure, not as a first draft you ship unread.",
  },
] as const;
