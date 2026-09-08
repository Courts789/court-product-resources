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
 * The alternative is a pitch you wrote yourself. Three parts: who you
 * are, the kind of product person you are, and what you want next. It
 * borrows the brag-a-log idea, which is that you cannot describe your
 * own value from memory under pressure, so you keep a record and work
 * from it.
 *
 * TODO(courtney): confirm the full attribution for the brag-a-log before
 * this goes live; the copy currently credits the idea, not the person.
 *
 * Answers weight one or two specialisms each, so the middle line of the
 * pitch comes from a pattern rather than from a single question.
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

export const startingRoles = [
  "Product Manager",
  "Business Analyst",
  "Product Designer",
  "Product Marketing Manager",
  "Customer Success Manager",
  "Something else",
] as const;

export type StartingRole = (typeof startingRoles)[number];

/** What someone wants next: the third line of the pitch. */
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
  { value: "depth", label: "To go deep and be known for one thing" },
  { value: "leadership", label: "To lead people, not just a product" },
  { value: "hands-on", label: "To be building again, not coordinating" },
  { value: "mission", label: "A problem I actually care about" },
  { value: "ai", label: "A company betting properly on AI" },
];

export type Option = {
  label: string;
  /** Specialisms this answer points at, and how strongly. */
  weights: Partial<Scores>;
};

export type Question = {
  id: string;
  prompt: string;
  options: readonly Option[];
};

export const questions: readonly Question[] = [
  {
    id: "reach-for",
    prompt:
      "A new quarter starts. What do you want to get your hands on first?",
    options: [
      {
        label: "Recordings of last month's customer calls",
        weights: { discovery: 3, adoption: 1 },
      },
      {
        label: "The funnel, the pricing page and the revenue dashboards",
        weights: { growth: 3, marketing: 1 },
      },
      {
        label: "The architecture, and what the systems can actually do",
        weights: { platform: 3, delivery: 1 },
      },
      {
        label: "The competitive landscape and how we talk about ourselves",
        weights: { marketing: 3, growth: 1 },
      },
      {
        label: "The list of everything blocked, and why",
        weights: { delivery: 3, platform: 1 },
      },
      {
        label: "Churn reasons and the support ticket pile",
        weights: { adoption: 3, discovery: 1 },
      },
    ],
  },
  {
    id: "cancel-last",
    prompt: "Which meeting would you cancel last?",
    options: [
      { label: "A customer interview", weights: { discovery: 3 } },
      { label: "An experiment and pricing review", weights: { growth: 3 } },
      { label: "A technical design review", weights: { platform: 3 } },
      { label: "Launch and go-to-market planning", weights: { marketing: 3 } },
      {
        label: "Backlog refinement and sequencing",
        weights: { delivery: 3 },
      },
      {
        label: "A business review with a key account",
        weights: { adoption: 3 },
      },
    ],
  },
  {
    id: "just-build-it",
    prompt:
      "A senior stakeholder says: just build it, we know customers want this. You reach for...",
    options: [
      {
        label: "What's the evidence? Give me five interviews first",
        weights: { discovery: 3 },
      },
      {
        label: "How big is this, and what does it do to revenue?",
        weights: { growth: 3 },
      },
      {
        label: "What does this cost us to build and then maintain?",
        weights: { platform: 2, growth: 1 },
      },
      {
        label: "Who would we tell, and would they care?",
        weights: { marketing: 3 },
      },
      {
        label: "What are the dependencies, and what order does this go in?",
        weights: { delivery: 3 },
      },
      {
        label: "What would our existing customers actually do with it?",
        weights: { adoption: 3 },
      },
    ],
  },
  {
    id: "frustration",
    prompt: "What frustrates you most about how product gets done?",
    options: [
      {
        label: "Solutions going looking for a problem",
        weights: { discovery: 3 },
      },
      {
        label: "Work shipped with no measure of whether it was worth it",
        weights: { growth: 3 },
      },
      {
        label: "Short-term hacks that quietly become permanent",
        weights: { platform: 3 },
      },
      {
        label: "Genuinely good product that nobody ever hears about",
        weights: { marketing: 3 },
      },
      {
        label: "Thrash, ambiguity and no plan anyone can follow",
        weights: { delivery: 3 },
      },
      {
        label: "Customers left to work it out on their own",
        weights: { adoption: 3 },
      },
    ],
  },
  {
    id: "unit-economics",
    prompt:
      "A feature would genuinely delight users, but the unit economics don't work. What's your instinct?",
    options: [
      {
        label: "Go back to the problem. Delight is a clue, not the answer",
        weights: { discovery: 3 },
      },
      {
        label: "Find the price or the segment where the maths does work",
        weights: { growth: 3, marketing: 1 },
      },
      {
        label: "Get the cost per use down until it does work",
        weights: { platform: 3 },
      },
      {
        label: "Ask whether we're selling it to the wrong people",
        weights: { marketing: 3 },
      },
      {
        label: "Ship the thinnest version and learn before committing",
        weights: { delivery: 2, growth: 1 },
      },
      {
        label: "Check whether it protects the revenue we already have",
        weights: { adoption: 3, growth: 1 },
      },
    ],
  },
];

export type Result = {
  title: string;
  /** Section ink: dark enough to set as type, on paper or on its stock. */
  accent: string;
  /** Section stock: a pastel fill that always carries --color-ink on top. */
  stock: string;
  /** One line naming the pattern in their answers. */
  summary: string;
  body: string;
  /** Where they'd be strongest, phrased as work rather than job title. */
  strengths: readonly string[];
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
    strengths: [
      "Framing a problem so a team can act on it",
      "Continuous customer contact without it becoming a research project",
      "Killing ideas early, and cheaply",
    ],
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
    strengths: [
      "Pricing, packaging and the revenue model",
      "Designing experiments that answer a real question",
      "Arguing for profitability, not just growth",
    ],
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
    strengths: [
      "Making architecture trade-offs legible to non-engineers",
      "Evaluating AI features properly instead of vibes-testing them",
      "Seeing the maintenance bill before it arrives",
    ],
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
    strengths: [
      "Positioning and narrative that survives contact with a sales team",
      "Launches that build on each other rather than one-off moments",
      "Translating what was built into why anyone should care",
    ],
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
    strengths: [
      "Decomposing something vague into workable pieces",
      "Seeing the dependency nobody else spotted",
      "Keeping a long-term vision intact while the route changes",
    ],
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
    strengths: [
      "Onboarding and activation as product problems, not training problems",
      "Reading churn as evidence rather than bad luck",
      "Keeping the team honest about what customers experience",
    ],
    pitch:
      "on everything that happens after launch, where activation, retention and the quiet reasons people leave get decided",
    reading: ["escaping-the-build-trap", "retention-techniques", "netflix-systems-thinkers"],
  },
};

/**
 * Opening line of the pitch, keyed on where someone is coming from. The
 * point of leading with this is that the route in is the interesting
 * part, and it is the part people apologise for instead of using.
 */
export const origins: Record<StartingRole, string> = {
  "Product Manager":
    "a product manager who has stopped trying to be a generalist about it",
  "Business Analyst":
    "a product person who came through analysis, so I start from how the thing actually works",
  "Product Designer":
    "a product person with a design background, so I start from the person using it",
  "Product Marketing Manager":
    "a product person who came through marketing, so I start from whether anyone would pay for it",
  "Customer Success Manager":
    "a product person who came through the front line, so I have watched real people fail to use software",
  "Something else":
    "a product person who arrived from somewhere else, and treats that as material rather than a gap",
};

/** Closing line of the pitch: what they want next, said plainly. */
export const wantClauses: Record<Want, string> = {
  scope:
    "a bigger and messier problem to own, with the room to be wrong for a while",
  depth:
    "to go deep enough in one area that people come to me for it by name",
  leadership:
    "to lead a team, and be measured on what they do rather than on what I ship",
  "hands-on":
    "to be building again: closer to the work, further from the coordination",
  mission:
    "to work on a problem I actually care about, in a company that means it",
  ai: "a company betting properly on AI, not bolting it on to look current",
};

/** Advice keyed on where someone is starting from. */
export const bridges: Record<StartingRole, string> = {
  "Product Manager":
    "You are already in the room. The move is to go deeper here rather than broader, and be known for it.",
  "Business Analyst":
    "The shortest bridge is owning an outcome rather than a set of requirements. Start arguing about what goes on the list, not only how it gets built.",
  "Product Designer":
    "You have the craft and the customer empathy already. The gap is usually commercial: learn to argue in revenue and cost, not only in experience.",
  "Product Marketing Manager":
    "You understand the market better than most PMs ever will. The gap is usually technical fluency and the discipline of saying no to your own good ideas.",
  "Customer Success Manager":
    "You have watched real people fail to use software, which is worth more than it sounds. The gap is usually influence over what gets built, so start bringing evidence, not anecdotes.",
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
