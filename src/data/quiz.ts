/**
 * "Write your pitch."
 *
 * Not a personality test and not a bucket-assigner. It exists because
 * roles in product are splitting, merging and being invented faster than
 * the titles can keep up, so "I'm a PM" has stopped telling anyone
 * anything. When you're job hunting, writing a development plan, or just
 * answering "so what do you do", you get pushed to squeeze yourself into
 * whichever bucket the other person already has a name for.
 *
 * Five questions, in the order a person would actually be asked them:
 * what you do now, how you got here, why product in the first place,
 * what you're good at, and what you want more of. Nothing hypothetical
 * and no scenarios, because someone describing their own work is more
 * reliable than someone guessing what they'd do in an invented one.
 *
 * The route in is free text and stays exactly as written. Everything a
 * stranger would find interesting about a career is in the specifics,
 * and no set of options this page could offer would hold them.
 *
 * The strengths carry the scoring: pick two or three and the pattern
 * across them names the type of product person you are. It borrows Penny
 * Locaso's brag-a-log idea, which is that you cannot describe your own
 * value from memory under pressure, so you keep a record and work from
 * it.
 */

export const specialisms = [
  "discovery",
  "growth",
  "platform",
  "marketing",
  "delivery",
  "adoption",
] as const;

export type Specialism = (typeof specialisms)[number];

export type Scores = Record<Specialism, number>;

/** What you do today. The five buckets, and an honest way out of them. */
export const startingRoles = [
  "Product Manager",
  "Product Marketing Manager",
  "Product Designer",
  "Business Analyst",
  "Something else",
] as const;

export type StartingRole = (typeof startingRoles)[number];

/** An option that pushes the score towards one or two specialisms. */
export type Weighted = {
  /** Stable key, so an answer survives the list being reordered. */
  id: string;
  label: string;
  weights: Partial<Scores>;
};

/**
 * Why product, in the first place. Light weights: this is mostly there
 * for the pitch, because it is the question that gets asked in every
 * interview and the one people answer worst.
 */
export const attractions: readonly (Weighted & { clause: string })[] = [
  {
    id: "the-room",
    label: "Wanting to be in the room where the decision gets made",
    weights: { delivery: 1, growth: 1 },
    clause: "wanting to be in the room where the decision actually gets made",
  },
  {
    id: "solve-properly",
    label: "Solving a problem properly instead of papering over it",
    weights: { discovery: 2 },
    clause: "the chance to solve a problem properly instead of papering over it",
  },
  {
    id: "commercial",
    label: "The commercial edge: whether people will actually pay",
    weights: { growth: 2 },
    clause: "the commercial question of whether anyone will actually pay for it",
  },
  {
    id: "the-people",
    label: "Building things with people I like working with",
    weights: { delivery: 1, adoption: 1 },
    clause: "getting to build things with people I like working with",
  },
  {
    id: "learning",
    label: "How much there is to learn, constantly",
    weights: { platform: 1, discovery: 1 },
    clause: "how much there is to learn in it, constantly",
  },
  {
    id: "the-customer",
    label: "Being the person who represents the customer",
    weights: { adoption: 2, marketing: 1 },
    clause: "getting to be the person in the room representing the customer",
  },
];

/**
 * Strengths as a product person, two per specialism. These do the real
 * scoring, and the chosen ones come back on the result as the list to
 * find evidence for.
 */
export const strengths: readonly Weighted[] = [
  {
    id: "real-problem",
    label: "Getting to the real problem before anyone builds",
    weights: { discovery: 3 },
  },
  {
    id: "customer-contact",
    label: "Hearing what a customer didn't quite say",
    weights: { discovery: 2, adoption: 1 },
  },
  {
    id: "pricing",
    label: "Pricing, packaging and the commercial model",
    weights: { growth: 3 },
  },
  {
    id: "experiments",
    label: "Designing experiments and reading the numbers honestly",
    weights: { growth: 2, platform: 1 },
  },
  {
    id: "trade-offs",
    label: "Making technical trade-offs legible to everyone else",
    weights: { platform: 3 },
  },
  {
    id: "evals",
    label: "Evaluating AI features properly rather than vibe-checking them",
    weights: { platform: 2, discovery: 1 },
  },
  {
    id: "positioning",
    label: "Positioning, narrative, and making the story land",
    weights: { marketing: 3 },
  },
  {
    id: "launches",
    label: "Launches that build on each other rather than one-off moments",
    weights: { marketing: 2, adoption: 1 },
  },
  {
    id: "decomposing",
    label: "Turning something vague into work a team can start on Monday",
    weights: { delivery: 3 },
  },
  {
    id: "dependencies",
    label: "Spotting the dependency nobody else saw",
    weights: { delivery: 2, platform: 1 },
  },
  {
    id: "activation",
    label: "Onboarding, activation, and what happens after launch",
    weights: { adoption: 3 },
  },
  {
    id: "churn",
    label: "Reading churn as evidence rather than as bad luck",
    weights: { adoption: 2, growth: 1 },
  },
];

/** How many strengths someone may choose. Three is a pitch; six is a CV. */
export const MAX_STRENGTHS = 3;

/** What you want to do more of, or expand into. */
export const wants = [
  "scope",
  "depth",
  "leadership",
  "hands-on",
  "mission",
  "ai",
] as const;

export type Want = (typeof wants)[number];

export const wantOptions: readonly { value: Want; label: string }[] = [
  { value: "scope", label: "A bigger, messier problem to own" },
  { value: "depth", label: "Going deep enough to be known for one thing" },
  { value: "leadership", label: "Leading people, not just a product" },
  { value: "hands-on", label: "Building again, rather than coordinating" },
  { value: "mission", label: "A problem I actually care about" },
  { value: "ai", label: "A company betting properly on AI" },
];

/**
 * Closing line of the pitch. Gerunds, because they follow "What I want
 * to do more of is" and an infinitive there reads like a typo.
 */
export const wantClauses: Record<Want, string> = {
  scope:
    "owning a bigger and messier problem, with the room to be wrong for a while",
  depth:
    "going deep enough in one area that people come to me for it by name",
  leadership:
    "leading a team, and being measured on what they do rather than on what I ship",
  "hands-on":
    "getting back closer to the building and further from the coordinating",
  mission:
    "working on a problem I actually care about, in a company that means it",
  ai: "working somewhere betting properly on AI, rather than bolting it on to look current",
};

export type Result = {
  title: string;
  /** Section ink: dark enough to set as type, on paper or on its stock. */
  accent: string;
  /** Section stock: a pastel fill that always carries --color-ink on top. */
  stock: string;
  /** One line naming the pattern in their answers. */
  summary: string;
  body: string;
  /**
   * Middle line of the pitch, written to follow "I'm at my best". Kept
   * as a sentence fragment so the three lines join into something a
   * person could actually say out loud.
   */
  pitch: string;
  /** Resource ids from the library, shown as a reading list. */
  reading: readonly string[];
};

export const results: Record<Specialism, Result> = {
  discovery: {
    title: "Discovery and Research",
    accent: "var(--color-pine)",
    stock: "var(--color-sage)",
    summary: "You want to be sure the problem is real before anyone builds.",
    body: "You are drawn to the part of the job that happens before a solution exists. That is rarer than it should be, because most validation runs backwards: teams build, then test to confirm a decision already made. Your instinct is the other way round, which makes you valuable on any team about to spend six months on a guess.",
    pitch:
      "in the messy bit before anyone has decided what to build, turning a vague complaint into a problem a team can act on",
    reading: ["opportunity-solution-tree", "continuous-discovery-habits", "product-vs-feature-teams"],
  },
  growth: {
    title: "Growth and Monetisation",
    accent: "var(--color-rust)",
    stock: "var(--color-blush)",
    summary:
      "You reach for the commercial question before the feature question.",
    body: "You think in loops, funnels and unit economics, and you are uncomfortable when work ships without a number attached. This is the specialism most product people avoid and most businesses need. It also ages well: as AI drops the cost of building, the interesting question stops being what can we build and becomes what is worth building.",
    pitch:
      "where the product meets the commercial model, arguing about pricing, retention and whether a thing is worth building at all",
    reading: ["hard-truths-growth", "growth-in-ai-companies", "ai-freemium-playbooks"],
  },
  platform: {
    title: "Platform and Technical",
    accent: "var(--color-slate)",
    stock: "var(--color-sky)",
    summary: "You care what it costs to run, not just what it costs to build.",
    body: "You are happiest close to the system: what it can do, where it strains, and what today's shortcut costs in two years. With AI in the stack this has become a first-class product specialism rather than a supporting one, because the hard questions are now about evaluation, reliability and cost per call.",
    pitch:
      "close to the system, making the architecture and the trade-offs legible to the people who have to decide about them",
    reading: ["hamel-evals", "hamel-evals-faq", "pragmatic-evals"],
  },
  marketing: {
    title: "Product Marketing",
    accent: "var(--color-plum)",
    stock: "var(--color-lilac)",
    summary: "You think about who hears it, not only who uses it.",
    body: "You start from the market and work inwards: who this is for, why they would switch, and what makes the story land. Product people often treat this as someone else's job right up until a good product launches to silence. Coming at product from this direction is an advantage, not a detour.",
    pitch:
      "connecting what got built to why anyone should care, and making the positioning hold up outside the building",
    reading: ["what-happens-to-pm", "sharpening-judgement", "ai-freemium-playbooks"],
  },
  delivery: {
    title: "Delivery and Systems",
    accent: "var(--color-ember)",
    stock: "var(--color-apricot)",
    summary: "You turn ambiguity into something a team can actually execute.",
    body: "You are the person who makes the plan real: dependencies mapped, sequence clear, blockers surfaced before they bite. This is the natural bridge from business analysis into product, and the trap is stopping there. The step up is owning the outcome as well as the plan, which means arguing about what goes on the list, not only the order.",
    pitch:
      "turning ambiguity into something a team can execute, spotting the dependency nobody else saw",
    reading: ["tbm-four-prioritization-jobs", "waterline-model", "tbm-why-no-strategy"],
  },
  adoption: {
    title: "Customer and Adoption",
    accent: "var(--color-olive)",
    stock: "var(--color-butter)",
    summary: "You measure success by what happens after the launch.",
    body: "You think about the part most roadmaps ignore: whether anyone actually got value from what shipped. Onboarding, activation, retention and the quiet reasons people leave. Customer-facing experience is an unusually strong foundation for product, because you have watched real people fail to use software and you never forget it.",
    pitch:
      "on everything that happens after launch, where activation, retention and the quiet reasons people leave get decided",
    reading: ["escaping-the-build-trap", "retention-techniques", "netflix-systems-thinkers"],
  },
};

/** Advice keyed on what someone does today, shown beside the result. */
export const bridges: Record<StartingRole, string> = {
  "Product Manager":
    "You are already in the room. The move is to go deeper here rather than broader, and be known for it.",
  "Business Analyst":
    "The shortest bridge is owning an outcome rather than a set of requirements. Start arguing about what goes on the list, not only how it gets built.",
  "Product Designer":
    "You have the craft and the customer empathy already. The gap is usually commercial: learn to argue in revenue and cost, not only in experience.",
  "Product Marketing Manager":
    "You understand the market better than most PMs ever will. The gap is usually technical fluency and the discipline of saying no to your own good ideas.",
  "Something else":
    "Most product people arrive from somewhere else, so whatever you did before is material rather than a handicap. Name the transferable part and lead with it.",
};

export function emptyScores(): Scores {
  return {
    discovery: 0,
    growth: 0,
    platform: 0,
    marketing: 0,
    delivery: 0,
    adoption: 0,
  };
}
