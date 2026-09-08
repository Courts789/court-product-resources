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
  /** One sentence on why it earns a place in the collection. */
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
 * Add new rows here. Filtering, search, themes, the quiz reading lists
 * and the sitemap all derive from this list. Read times come from the
 * publisher's own word count at about 230 words a minute; listen times
 * are the episode's actual runtime, rounded to the minute.
 */
export const resources: readonly Resource[] = [
  // ── Getting In ────────────────────────────────────────────────────────────
  {
    id: "product-vs-feature-teams",
    title: "Product vs. Feature Teams",
    by: "Marty Cagan",
    url: "https://www.svpg.com/product-vs-feature-teams/",
    theme: "Getting In",
    media: "Article",
    time: "7 min read",
    added: "2026-05-02",
    note: "The single clearest explanation of why two teams with identical job titles produce completely different work. Read this before your first interview.",
  },
  {
    id: "opportunity-solution-tree",
    title: "The Opportunity Solution Tree",
    by: "Teresa Torres",
    url: "https://www.producttalk.org/2016/08/opportunity-solution-tree/",
    theme: "Getting In",
    media: "Article",
    time: "16 min read",
    added: "2026-05-14",
    note: "One diagram that fixes how you connect a business outcome to the thing you're about to build. Long, and worth every minute of it.",
  },
  {
    id: "how-to-hire-a-pm",
    title: "How to Hire a Product Manager",
    by: "Ken Norton",
    url: "https://www.bringthedonuts.com/essays/productmanager.html",
    theme: "Getting In",
    media: "Article",
    time: "12 min read",
    added: "2026-05-14",
    note: "Written for hiring managers, which is exactly why candidates should read it. This is the scorecard you're being marked against.",
  },
  {
    id: "product-job-market-2026",
    title: "State of the Product Job Market in Early 2026",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/p/state-of-the-product-job-market-in-ee9",
    theme: "Getting In",
    media: "Article",
    time: "7 min read",
    added: "2026-08-20",
    note: "Actual hiring data rather than vibes. Where the openings are, which titles are growing, and what that means if you're job hunting right now.",
  },
  {
    id: "verrilli-pm-regret",
    title: "This CPO Regrets That Product Management Exists",
    by: "Tom Verrilli on Lenny's Podcast",
    url: "https://www.lennysnewsletter.com/p/this-cpo-regrets-that-product-management",
    theme: "Getting In",
    media: "Podcast",
    time: "85 min listen",
    added: "2026-08-20",
    note: "Whatnot's CPO argues for fewer, more senior PMs doing real IC work. Uncomfortable listening if you're trying to get in, and the more useful for it.",
  },

  // ── The Craft ─────────────────────────────────────────────────────────────
  {
    id: "tbm-four-prioritization-jobs",
    title: "TBM 351: The 4 Prioritization Jobs",
    by: "John Cutler",
    url: "https://cutlefish.substack.com/p/tbm-351-the-4-prioritization-jobs",
    theme: "The Craft",
    media: "Article",
    time: "11 min read",
    added: "2026-05-14",
    note: "Why your prioritisation framework keeps failing: you're using one tool for four different jobs. Separating them is the whole fix.",
  },
  {
    id: "tbm-why-no-strategy",
    title: "TBM 30/52: Why Don't We Have a Strategy?",
    by: "John Cutler",
    url: "https://cutlefish.substack.com/p/tbm-3052-why-do-we-have-no-strategy",
    theme: "The Craft",
    media: "Article",
    time: "3 min read",
    added: "2026-05-14",
    note: "Three minutes, and it will explain the last two years of your working life. The cheapest thing in this library by a distance.",
  },
  {
    id: "tbm-feature-factory-practice",
    title: "TBM 279: How to Practise Product Management in a Feature Factory",
    by: "John Cutler",
    url: "https://cutlefish.substack.com/p/tbm-279-how-to-learn-and-practice",
    theme: "The Craft",
    media: "Article",
    time: "5 min read",
    added: "2026-06-20",
    note: "For everyone whose org isn't the one in the books. How to build the craft anyway, without waiting for permission or a reorg.",
  },
  {
    id: "sharpening-judgement",
    title: "The Looking Glass: Sharpening Judgement",
    by: "Julie Zhuo",
    url: "https://lg.substack.com/p/the-looking-glass-sharpening-judgement",
    theme: "The Craft",
    media: "Article",
    time: "13 min read",
    added: "2026-06-20",
    note: "Judgement is the part of the job no competency framework can describe and no model can do for you. This is the best writing on how it's actually built.",
  },
  {
    id: "waterline-model",
    title: "How to Debug a Team That Isn't Working",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/p/how-to-debug-a-team-that-isnt-working",
    theme: "The Craft",
    media: "Article",
    time: "12 min read",
    added: "2026-08-20",
    note: "The Waterline Model: a way to diagnose a struggling team that doesn't start and end with blaming the people in it.",
  },
  {
    id: "netflix-systems-thinkers",
    title: "Why Netflix Is Betting on Systems Thinkers, Not Specialists",
    by: "Elizabeth Stone on Lenny's Podcast",
    url: "https://www.lennysnewsletter.com/p/netflix-cpto-on-ai-and-the-future",
    theme: "The Craft",
    media: "Podcast",
    time: "72 min listen",
    added: "2026-08-20",
    note: "Netflix's CPTO on what she now hires for, and why breadth is beating depth in the AI era. The clearest signal I've heard on where the craft is heading.",
  },

  // ── AI & Evals ────────────────────────────────────────────────────────────
  {
    id: "hamel-evals",
    title: "Your AI Product Needs Evals",
    by: "Hamel Husain",
    url: "https://hamel.dev/blog/posts/evals/",
    theme: "AI & Evals",
    media: "Article",
    time: "14 min read",
    added: "2026-07-11",
    note: "Start here. The argument for why shipping AI without an evaluation system is shipping blind, and what to build instead.",
  },
  {
    id: "hamel-evals-faq",
    title: "AI Evals: Everything You Need to Know",
    by: "Hamel Husain",
    url: "https://hamel.dev/blog/posts/evals-faq/",
    theme: "AI & Evals",
    media: "Guide",
    time: "45 min read",
    added: "2026-07-11",
    note: "The FAQ compiled from teaching thousands of PMs and engineers. Long, but it's a reference: skim the headings and read the three that apply to you.",
  },
  {
    id: "hamel-llm-judge",
    title: "Using LLM-as-a-Judge for Evaluation",
    by: "Hamel Husain",
    url: "https://hamel.dev/blog/posts/llm-judge/",
    theme: "AI & Evals",
    media: "Guide",
    time: "28 min read",
    added: "2026-07-11",
    note: "The technique everyone name-drops and almost nobody sets up properly. This is the complete version, including how it goes wrong.",
  },
  {
    id: "beyond-vibe-checks",
    title: "Beyond Vibe Checks: A PM's Complete Guide to Evals",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete",
    theme: "AI & Evals",
    media: "Article",
    time: "14 min read",
    added: "2026-07-25",
    note: "The PM-shaped version of the eval argument. If Hamel's writing is one level too technical for your week, read this one first.",
  },
  {
    id: "pragmatic-evals",
    title: "A Pragmatic Guide to LLM Evals for Devs",
    by: "Gergely Orosz",
    url: "https://newsletter.pragmaticengineer.com/p/evals",
    theme: "AI & Evals",
    media: "Guide",
    time: "23 min read",
    added: "2026-07-25",
    note: "What your engineers are reading about evals. Worth knowing so the conversation starts somewhere past the definitions.",
  },
  {
    id: "persistent-ai-coworkers",
    title: "AI's Third Era: The Rise of Persistent AI Coworkers",
    by: "Tara Seshan on Lenny's Podcast",
    url: "https://www.lennysnewsletter.com/p/ais-third-era-the-rise-of-persistent",
    theme: "AI & Evals",
    media: "Podcast",
    time: "82 min listen",
    added: "2026-09-01",
    note: "On building for where the models will be in two years rather than where they are today. The most useful hour and a bit on AI product strategy I've spent.",
  },

  // ── Growth ────────────────────────────────────────────────────────────────
  {
    id: "hard-truths-growth",
    title: "11 Hard Truths About Working in Growth",
    by: "Elena Verna",
    url: "https://www.elenaverna.com/p/11-hard-truths-about-working-in-growth",
    theme: "Growth",
    media: "Article",
    time: "8 min read",
    added: "2026-05-02",
    note: "Read this before you take a growth role. It is the honest job description nobody puts in the ad.",
  },
  {
    id: "growth-in-ai-companies",
    title: "9 Ways Growth Is Different in AI Companies",
    by: "Elena Verna",
    url: "https://www.elenaverna.com/p/9-ways-growth-is-different-in-ai",
    theme: "Growth",
    media: "Article",
    time: "7 min read",
    added: "2026-06-20",
    note: "The playbooks genuinely have changed, and this is the clearest account of which parts and why. Short, specific, no hedging.",
  },
  {
    id: "retention-techniques",
    title: "5 New Retention Techniques You May Not Have Tried",
    by: "Elena Verna",
    url: "https://www.elenaverna.com/p/5-of-my-favorite-new-retention-techniques",
    theme: "Growth",
    media: "Article",
    time: "8 min read",
    added: "2026-06-20",
    note: "Tactical rather than theoretical. You can take at least one of these into your next planning session and argue for it.",
  },
  {
    id: "ai-freemium-playbooks",
    title: "Why SaaS Freemium Playbooks Don't Work in AI",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/p/why-saas-freemium-playbooks-dont",
    theme: "Growth",
    media: "Article",
    time: "13 min read",
    added: "2026-08-20",
    note: "When inference costs money per use, free stops being free. The best thing I've read on pricing an AI product properly.",
  },
  {
    id: "duolingo-growth",
    title: "How Duolingo Reignited User Growth",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth",
    theme: "Growth",
    media: "Article",
    time: "20 min read",
    added: "2026-05-14",
    note: "An older piece and still the best worked example of a growth model going from stalled to compounding. Read it as a case study, not a checklist.",
  },

  // ── Career ────────────────────────────────────────────────────────────────
  {
    id: "next-career-move",
    title: "How to Figure Out Your Next Career Move",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/p/how-to-figure-out-your-next-career",
    theme: "Career",
    media: "Article",
    time: "21 min read",
    added: "2026-09-01",
    note: "Six questions to work through when you know something needs to change but not what. Do it with a pen rather than skimming it.",
  },
  {
    id: "expertise-downfall",
    title: "The Thing You Are Expert at Will Be Your Career Downfall",
    by: "Julie Zhuo",
    url: "https://lg.substack.com/p/the-thing-you-are-expert-at-will",
    theme: "Career",
    media: "Article",
    time: "8 min read",
    added: "2026-06-20",
    note: "The trap of being known for one thing, right at the moment the industry is redefining every role in it. Eight minutes, and it stings.",
  },
  {
    id: "ic-career-flex",
    title: "IC Work Is the New Career Flex",
    by: "Elena Verna",
    url: "https://www.elenaverna.com/p/ic-work-is-the-new-career-flex",
    theme: "Career",
    media: "Article",
    time: "11 min read",
    added: "2026-08-20",
    note: "Permission to stop treating management as the only way up, from someone who has done both at scale.",
  },
  {
    id: "what-happens-to-pm",
    title: "So What's Going to Happen to Product Management Anyway?",
    by: "Peter Yang",
    url: "https://creatoreconomy.so/p/so-whats-going-to-happen-to-product-management-anyway",
    theme: "Career",
    media: "Article",
    time: "9 min read",
    added: "2026-07-25",
    note: "The question everyone is asking, answered without doom or hype. Nine minutes for the version of this argument that's actually thought through.",
  },
  {
    id: "ai-job-interview",
    title: "How to Use AI for Your Next Job Interview",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/p/how-to-use-ai-in-your-next-job-interview",
    theme: "Career",
    media: "Article",
    time: "20 min read",
    added: "2026-08-20",
    note: "Practical prep rather than cheating: research, rehearsal and pressure-testing your own answers before someone else does.",
  },
  {
    id: "reality-of-tech-interviews",
    title: "The Reality of Tech Interviews",
    by: "Gergely Orosz",
    url: "https://newsletter.pragmaticengineer.com/p/the-reality-of-tech-interviews",
    theme: "Career",
    media: "Article",
    time: "24 min read",
    added: "2026-07-11",
    note: "What hiring processes actually look like now, with data. Sobering, and far more useful than another list of interview tips.",
  },
  {
    id: "mosseri-authenticity",
    title: "AI Is a Tailwind for Authenticity",
    by: "Adam Mosseri on Lenny's Podcast",
    url: "https://www.lennysnewsletter.com/p/adam-mosseri-ai-is-a-tailwind-for",
    theme: "Career",
    media: "Podcast",
    time: "68 min listen",
    added: "2026-08-20",
    note: "Instagram's head on the product team structures emerging in 2026 and the traits he now hires for. Listen for the second half.",
  },

  // ── Templates & Tools ─────────────────────────────────────────────────────
  {
    id: "ai-tools-ranked",
    title: "24 AI Tools Ranked From Essential to Forgettable",
    by: "Peter Yang",
    url: "https://creatoreconomy.so/p/24-ai-tools-ranked-from-essential-to-forgettable",
    theme: "Templates & Tools",
    media: "Article",
    time: "6 min read",
    added: "2026-07-25",
    note: "Someone else has done the trialling so you don't have to. Six minutes to skip a month of tool tourism.",
  },
  {
    id: "ai-prototyping-guide",
    title: "A Guide to AI Prototyping for Product Managers",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/p/a-guide-to-ai-prototyping-for-product",
    theme: "Templates & Tools",
    media: "Guide",
    time: "17 min read",
    added: "2026-07-25",
    note: "From idea to something clickable in an afternoon. The highest-leverage skill a PM can pick up this year, taught step by step.",
  },
  {
    id: "pm-second-brain",
    title: "How to Build Your PM Second Brain With ChatGPT",
    by: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/p/how-to-build-your-pm-second-brain",
    theme: "Templates & Tools",
    media: "Guide",
    time: "12 min read",
    added: "2026-08-20",
    note: "A direct answer to the overwhelm this site is about: a system for holding everything you've read so you can actually retrieve it.",
  },
  {
    id: "vibe-coding-rules",
    title: "12 Rules to Vibe Code Without Frustration",
    by: "Peter Yang",
    url: "https://creatoreconomy.so/p/12-rules-to-vibe-code-without-frustration",
    theme: "Templates & Tools",
    media: "Article",
    time: "6 min read",
    added: "2026-07-25",
    note: "Read this before your first weekend of building, not after the third time you throw the whole project away.",
  },
  {
    id: "claude-code-tutorial",
    title: "Claude Code Beginner's Tutorial: Build an App in 15 Minutes",
    by: "Peter Yang",
    url: "https://creatoreconomy.so/p/claude-code-beginners-tutorial-build-a-movie-app-in-15-minutes",
    theme: "Templates & Tools",
    media: "Video",
    time: "15 min watch",
    added: "2026-08-01",
    note: "Follow along rather than watch. Fifteen minutes and you'll have shipped something, which is worth more than any amount of reading about it.",
  },
  {
    id: "chatprd",
    title: "ChatPRD",
    by: "Claire Vo",
    url: "https://www.chatprd.ai/",
    theme: "Templates & Tools",
    media: "Template",
    time: "10 min to set up",
    added: "2026-07-25",
    note: "Drafts and critiques PRDs on demand. Most useful as a second opinion on structure, not as a first draft you ship unread.",
  },

  // ── Books ─────────────────────────────────────────────────────────────────
  // A book is already a specific thing, so these stay. Links point at each
  // author's own site; swap in a preferred bookseller if you'd rather.
  {
    id: "inspired",
    title: "Inspired",
    by: "Marty Cagan",
    url: "https://www.svpg.com/books/",
    theme: "Getting In",
    media: "Book",
    time: "~8 hr read",
    added: "2026-08-10",
    note: "The one most teams have half-read. Worth finishing properly, because the second half is where the operating model actually lives.",
  },
  {
    id: "continuous-discovery-habits",
    title: "Continuous Discovery Habits",
    by: "Teresa Torres",
    url: "https://www.producttalk.org/continuous-discovery-habits/",
    theme: "The Craft",
    media: "Book",
    time: "~5 hr read",
    added: "2026-08-10",
    note: "The most practical book on talking to customers weekly without it becoming a research project nobody has time for.",
  },
  {
    id: "escaping-the-build-trap",
    title: "Escaping the Build Trap",
    by: "Melissa Perri",
    url: "https://melissaperri.com/",
    theme: "Career",
    media: "Book",
    time: "~4 hr read",
    added: "2026-08-10",
    note: "Shipping output is not the same as producing value. The clearest articulation of why, and what to change structurally.",
  },
];

/** Entries added within this window of the last revision are flagged "New". */
const NEW_WINDOW_DAYS = 45;

export function isNew(resource: Resource, reference: Date): boolean {
  const added = new Date(resource.added).getTime();
  const days = (reference.getTime() - added) / 86_400_000;
  return days >= 0 && days <= NEW_WINDOW_DAYS;
}
