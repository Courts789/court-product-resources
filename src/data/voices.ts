export type Voice = {
  name: string;
  /** What they're known for, in one line. */
  role: string;
  /** The publication or home for their written work. */
  publication: string;
  url: string;
  /** Why they're worth your reading time. */
  note: string;
  /** Topics they own, used as inline metadata. */
  topics: readonly string[];
};

/**
 * Written/text output only — no podcast episodes, per the editorial rule.
 * Where a voice also hosts a show, we link their writing, not the feed.
 */
export const voices: readonly Voice[] = [
  {
    name: "Claire Vo",
    role: "CPO at LaunchDarkly; founder of ChatPRD",
    publication: "clairevo.com",
    url: "https://clairevo.com/",
    note: "Builds the AI tooling she writes about. The rare operator publishing from inside a CPO seat rather than adjacent to one.",
    topics: ["AI tooling", "PRDs", "Operating"],
  },
  {
    name: "Peter Yang",
    role: "Product lead at Roblox; ex-Reddit, Amazon, Meta",
    publication: "Behind the Craft",
    url: "https://creatoreconomy.so/",
    note: "Interviews and teardowns that stay concrete. Consistently turns a long conversation into something you can act on the same week.",
    topics: ["Craft", "AI", "Creator products"],
  },
  {
    name: "Hamel Husain",
    role: "ML engineer; co-author of Evals for AI Engineers",
    publication: "Hamel's Blog",
    url: "https://hamel.dev/",
    note: "The clearest writing anywhere on evaluating AI products. Essential if your roadmap now contains a model you cannot fully predict.",
    topics: ["Evals", "LLMs", "Measurement"],
  },
  {
    name: "Elena Verna",
    role: "Growth advisor; ex-Amplitude, Miro, SurveyMonkey",
    publication: "Elena's Growth Scoop",
    url: "https://www.elenaverna.com/",
    note: "Product-led growth without the vanity metrics. Writes about what actually compounds and what merely looks like it does.",
    topics: ["PLG", "Growth", "Monetisation"],
  },
  {
    name: "Nikhyl Singhal",
    role: "VP of Product at Meta",
    publication: "The Skip",
    url: "https://www.skip.show/",
    note: "Career architecture for product people — levels, scope, and the unglamorous mechanics of getting promoted or getting out.",
    topics: ["Career", "Levelling", "Leadership"],
  },
] as const;
