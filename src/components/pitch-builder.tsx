"use client";

import { useMemo, useState } from "react";
import {
  attractions,
  bridges,
  emptyScores,
  MAX_STRENGTHS,
  results,
  startingRoles,
  strengths,
  wantClauses,
  wantOptions,
  type Scores,
  type Specialism,
  type StartingRole,
  type Want,
} from "@/data/quiz";
import { resources } from "@/data/resources";
import { ArrowUpRight } from "@/components/icons";

/**
 * Five steps, in the order a person would actually be asked them: what
 * you do now, how you got here, why product, what you're good at, and
 * what you want more of.
 */
const steps = ["role", "pathway", "attraction", "strengths", "want"] as const;
const lastStep = steps.length - 1;

const PATHWAY_MAX = 260;

const prompts: Record<(typeof steps)[number], string> = {
  role: "What do you do today?",
  pathway: "Where did you start, and how did you get to product?",
  attraction: "What drew you to product in the first place?",
  strengths: "What are you actually good at?",
  want: "And what do you want to do more of?",
};

export function PitchBuilder() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<StartingRole | null>(null);
  const [pathway, setPathway] = useState("");
  const [attraction, setAttraction] = useState<string | null>(null);
  const [picked, setPicked] = useState<readonly string[]>([]);
  const [want, setWant] = useState<Want | null>(null);
  const [copied, setCopied] = useState(false);

  /* Pathway is the one optional answer: some people genuinely started in
     product, and the rest can write it later. */
  const complete =
    role !== null && attraction !== null && picked.length > 0 && want !== null;

  const boundedStep = Math.max(0, Math.min(step, lastStep));

  const winner = useMemo<Specialism | null>(() => {
    if (picked.length === 0) return null;

    const scores: Scores = emptyScores();

    const chosen = [
      ...strengths.filter((strength) => picked.includes(strength.id)),
      ...attractions.filter((option) => option.id === attraction),
    ];

    for (const option of chosen) {
      for (const [key, value] of Object.entries(option.weights)) {
        scores[key as Specialism] += value ?? 0;
      }
    }

    return (Object.entries(scores) as [Specialism, number][]).sort(
      (a, b) => b[1] - a[1],
    )[0][0];
  }, [picked, attraction]);

  function toggleStrength(id: string) {
    setPicked((previous) => {
      if (previous.includes(id)) {
        return previous.filter((value) => value !== id);
      }
      /* At the cap, the newest choice pushes out the oldest rather than
         silently doing nothing, which reads as a broken button. */
      const next = [...previous, id];
      return next.length > MAX_STRENGTHS ? next.slice(1) : next;
    });
  }

  function restart() {
    setStep(0);
    setRole(null);
    setPathway("");
    setAttraction(null);
    setPicked([]);
    setWant(null);
    setCopied(false);
  }

  if (complete && winner && role && want) {
    const result = results[winner];
    const chosenStrengths = strengths.filter((strength) =>
      picked.includes(strength.id),
    );
    const why = attractions.find((option) => option.id === attraction);
    const reading = result.reading
      .map((id) => resources.find((resource) => resource.id === id))
      .filter((resource) => resource !== undefined);

    /*
     * Written to be said rather than read. The route in is dropped in
     * exactly as typed and never grafted onto a generated clause: it is
     * the one sentence on the page that is entirely theirs, and stitching
     * it into a template is how you get a pitch that sounds like a form.
     */
    const lines = [
      `I'm a ${role.toLowerCase()}.`,
      pathway.trim(),
      why ? `What drew me to product was ${why.clause}.` : "",
      `I'm at my best ${result.pitch}.`,
      `What I want to do more of is ${wantClauses[want]}.`,
    ].filter((line) => line !== "");

    async function copyPitch() {
      try {
        await navigator.clipboard.writeText(lines.join(" "));
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2400);
      } catch {
        /* Clipboard refused (permissions, insecure context). The pitch is
           on the page in full, so there is nothing to recover from. */
      }
    }

    return (
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <p className="eyebrow text-ink-muted">Your pitch</p>

        <div
          style={{ backgroundColor: result.stock }}
          className="mt-6 rounded-card p-7 sm:p-10"
        >
          <p style={{ color: result.accent }} className="eyebrow">
            The type of product person you are: {result.title}
          </p>

          <blockquote className="mt-6">
            {lines.map((line) => (
              <p
                key={line}
                className="max-w-[46ch] font-serif text-[length:var(--text-section)] leading-[1.2] text-ink"
              >
                {line}
              </p>
            ))}
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <button
              type="button"
              onClick={copyPitch}
              className="eyebrow cursor-pointer rounded-full bg-ink px-6 py-3.5 text-paper transition-colors duration-300 hover:bg-pine"
            >
              {copied ? "Copied" : "Copy the pitch"}
            </button>
            <p className="max-w-[38ch] text-sm leading-relaxed text-ink-soft">
              Change the words until they sound like you. The structure is
              the useful part, not the phrasing.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-y-10 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-7">
            <p className="eyebrow text-ink-muted">Why this came out</p>
            <p className="mt-5 max-w-[52ch] text-[length:var(--text-lede)] leading-[1.5] text-ink">
              {result.summary}
            </p>
            <p className="mt-6 max-w-[64ch] leading-relaxed text-ink-soft">
              {result.body}
            </p>

            <div className="mt-8 rounded-card bg-paper-sunk p-6">
              <p className="eyebrow text-ink-muted">Working as: {role}</p>
              <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-ink-soft">
                {bridges[role]}
              </p>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <p className="eyebrow text-ink-muted">Evidence to go and find</p>
            {/* Their own strengths, handed back as homework. A pitch
                without examples behind it falls over on the first
                follow-up question. */}
            <ul className="mt-5">
              {chosenStrengths.map((strength) => (
                <li
                  key={strength.id}
                  className="border-b border-rule py-3 text-sm leading-relaxed text-ink-soft first:border-t"
                >
                  {strength.label}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-ink-muted">
              Write down one time you did each of these, with a number
              attached. That is your brag-a-log, Penny Locaso&rsquo;s idea,
              and it is what turns the pitch above into something you can
              defend.
            </p>
          </div>
        </div>

        {reading.length > 0 && (
          <div className="mt-14 border-t border-rule pt-10">
            <p className="eyebrow text-ink-muted">Read next</p>
            <ol className="mt-6">
              {reading.map((resource) => (
                <li key={resource.id}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-rule py-4 transition-colors duration-300 hover:bg-paper-sunk"
                  >
                    <span className="text-xl text-ink">
                      <span className="rule-link">{resource.title}</span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="text-sm text-ink-muted">
                      {resource.by}
                    </span>
                    <span className="numeral ml-auto text-xs text-ink-muted">
                      {resource.time}
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-center gap-8">
          <button
            type="button"
            onClick={restart}
            className="eyebrow cursor-pointer rounded-full bg-forest px-7 py-4 text-cream transition-colors duration-300 hover:bg-night"
          >
            Start again
          </button>
          <a href="/library" className="eyebrow rule-link text-ink-muted">
            Browse the whole library
          </a>
        </div>
      </div>
    );
  }

  const current = steps[boundedStep];

  return (
    <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="flex items-center justify-between border-b border-rule pb-4">
        <p className="eyebrow text-pine">
          Question {boundedStep + 1} of {steps.length}
        </p>
        {boundedStep > 0 && (
          <button
            type="button"
            onClick={() => setStep(boundedStep - 1)}
            className="eyebrow cursor-pointer text-ink-muted transition-colors duration-300 hover:text-ink"
          >
            Back
          </button>
        )}
      </div>

      {/* Progress is decorative; the count above carries the same information. */}
      <div aria-hidden="true" className="mt-4 flex gap-1.5">
        {steps.map((name, index) => (
          <span
            key={name}
            className={`h-0.5 flex-1 transition-colors duration-500 ${
              index <= boundedStep ? "bg-pine" : "bg-rule"
            }`}
          />
        ))}
      </div>

      <fieldset className="mt-10">
        <legend className="headline max-w-[22ch] text-[length:var(--text-section)] text-ink">
          {prompts[current]}
        </legend>

        {current === "role" && (
          <div className="mt-10 grid gap-px sm:grid-cols-2">
            {startingRoles.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setRole(option);
                  setStep(1);
                }}
                aria-pressed={role === option}
                className="group border-b border-rule py-5 text-left transition-colors duration-300 hover:bg-paper-sunk sm:pr-8"
              >
                <span className="text-xl text-ink transition-colors duration-300 group-hover:text-pine">
                  {option}
                </span>
              </button>
            ))}
          </div>
        )}

        {current === "pathway" && (
          <div className="mt-8 max-w-2xl">
            <p className="text-sm leading-relaxed text-ink-soft">
              One or two sentences, in your words. This is the only part of
              the pitch nobody else could write, so it goes in exactly as you
              type it. Where you came from, and what moved you across.
            </p>

            <label htmlFor="pathway" className="sr-only">
              Where you started, and how you got to product
            </label>
            <textarea
              id="pathway"
              value={pathway}
              onChange={(event) =>
                setPathway(event.target.value.slice(0, PATHWAY_MAX))
              }
              rows={3}
              maxLength={PATHWAY_MAX}
              placeholder="I started in agency media and moved into product because I kept selling things I couldn't fix."
              className="mt-6 w-full resize-y border-b-2 border-rule bg-transparent pb-2 text-lg text-ink outline-none transition-colors duration-300 placeholder:text-ink-muted focus:border-pine"
            />

            <div className="mt-3 flex items-center justify-between">
              <span className="numeral text-xs text-ink-muted">
                {pathway.length} / {PATHWAY_MAX}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="eyebrow cursor-pointer rounded-full bg-forest px-7 py-4 text-cream transition-colors duration-300 hover:bg-night"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => {
                  setPathway("");
                  setStep(2);
                }}
                className="eyebrow cursor-pointer text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                Skip this one
              </button>
            </div>
          </div>
        )}

        {current === "attraction" && (
          <div className="mt-10 grid gap-px sm:grid-cols-2">
            {attractions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setAttraction(option.id);
                  setStep(3);
                }}
                aria-pressed={attraction === option.id}
                className="group border-b border-rule py-5 text-left transition-colors duration-300 hover:bg-paper-sunk sm:pr-8"
              >
                <span className="block max-w-[38ch] text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-pine">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {current === "strengths" && (
          <div className="mt-8">
            <p className="max-w-[54ch] text-sm leading-relaxed text-ink-soft">
              Pick up to {MAX_STRENGTHS}, and pick the ones you could give an
              example of rather than the ones that sound best. These decide
              the type of product person the pitch says you are.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {strengths.map((strength) => {
                const active = picked.includes(strength.id);
                return (
                  <button
                    key={strength.id}
                    type="button"
                    onClick={() => toggleStrength(strength.id)}
                    aria-pressed={active}
                    className={`cursor-pointer rounded-full border-2 px-4 py-2.5 text-left text-sm leading-snug transition-colors duration-300 ${
                      active
                        ? "border-pine bg-forest text-cream"
                        : "border-rule text-ink-soft hover:border-rule-strong hover:text-ink"
                    }`}
                  >
                    {strength.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => setStep(4)}
                disabled={picked.length === 0}
                className="eyebrow cursor-pointer rounded-full bg-forest px-7 py-4 text-cream transition-colors duration-300 hover:bg-night disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
              <p aria-live="polite" className="text-sm text-ink-muted">
                {picked.length === 0
                  ? "Pick at least one."
                  : `${picked.length} of ${MAX_STRENGTHS} chosen.`}
              </p>
            </div>
          </div>
        )}

        {current === "want" && (
          <div className="mt-10 grid gap-px sm:grid-cols-2">
            {wantOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setWant(option.value)}
                aria-pressed={want === option.value}
                className="group border-b border-rule py-5 text-left transition-colors duration-300 hover:bg-paper-sunk sm:pr-8"
              >
                <span className="block max-w-[38ch] text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-pine">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </fieldset>
    </div>
  );
}
