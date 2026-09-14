"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
type Step = (typeof steps)[number];
const lastStep = steps.length - 1;

const PATHWAY_MAX = 260;

/** How long a picked answer stays lit before the card turns. */
const TURN_DELAY = 260;

const prompts: Record<Step, string> = {
  role: "What do you do today?",
  pathway: "How did you get to product?",
  attraction: "What drew you to product?",
  strengths: "What are you actually good at?",
  want: "What do you want more of?",
};

/** Each question gets its own stock, so the card visibly turns a page. */
const stocks: Record<Step, string> = {
  role: "var(--color-sage)",
  pathway: "var(--color-butter)",
  attraction: "var(--color-lilac)",
  strengths: "var(--color-mint)",
  want: "var(--color-blush)",
};

const letters = "ABCDEF";

type Choice = { key: string; label: string };

export function PitchBuilder() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [role, setRole] = useState<StartingRole | null>(null);
  const [pathway, setPathway] = useState("");
  const [attraction, setAttraction] = useState<string | null>(null);
  const [picked, setPicked] = useState<readonly string[]>([]);
  const [want, setWant] = useState<Want | null>(null);
  const [copied, setCopied] = useState(false);
  const [turning, setTurning] = useState(false);
  const stage = useRef<HTMLElement>(null);
  const moved = useRef(false);

  /* Pathway is the one optional answer: some people genuinely started in
     product, and the rest can write it later. */
  const complete =
    role !== null && attraction !== null && picked.length > 0 && want !== null;

  const boundedStep = Math.max(0, Math.min(step, lastStep));
  const current = steps[boundedStep];

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

  /* Keep the card in view as it turns, but never yank the page on load. */
  useEffect(() => {
    if (!moved.current) return;
    const element = stage.current;
    if (!element) return;
    if (element.getBoundingClientRect().top < 0) {
      element.scrollIntoView({ block: "start" });
    }
    /*
     * Turning the card unmounts the button that was just pressed, which
     * drops focus back to the top of the document. Hand it to the new
     * question (or the result) so keyboard and screen reader users carry
     * on from where they are.
     */
    element
      .querySelector<HTMLElement>("[data-focus-target]")
      ?.focus({ preventScroll: true });
  }, [step, complete]);

  function go(next: number) {
    moved.current = true;
    setDirection(next < boundedStep ? "back" : "forward");
    setStep(next);
  }

  /** Light the answer for a beat, then turn to the next card. */
  function answer(commit: () => void, next?: number) {
    if (turning) return;
    setTurning(true);
    commit();
    window.setTimeout(() => {
      setTurning(false);
      moved.current = true;
      if (next !== undefined) go(next);
    }, TURN_DELAY);
  }

  const choices: Record<"role" | "attraction" | "want", readonly Choice[]> = {
    role: startingRoles.map((option) => ({ key: option, label: option })),
    attraction: attractions.map((option) => ({
      key: option.id,
      label: option.label,
    })),
    want: wantOptions.map((option) => ({
      key: option.value,
      label: option.label,
    })),
  };

  function choose(key: string) {
    if (current === "role") {
      answer(() => setRole(key as StartingRole), 1);
    } else if (current === "attraction") {
      answer(() => setAttraction(key), 3);
    } else if (current === "want") {
      /* The last answer completes the quiz, so there is no card to turn to. */
      answer(() => setWant(key as Want));
    }
  }

  const selected =
    current === "role" ? role : current === "attraction" ? attraction : want;

  /* Quiz-style shortcuts: press A to F to answer a single-choice card. */
  useEffect(() => {
    if (complete) return;
    if (current !== "role" && current !== "attraction" && current !== "want") {
      return;
    }
    const options = choices[current];

    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable]")) return;
      /* Only while the quiz has focus, so a stray letter typed (or spoken
         by voice control) elsewhere on the page never answers a question. */
      if (!stage.current?.contains(target)) return;
      const index = letters.indexOf(event.key.toUpperCase());
      if (index >= 0 && index < options.length) choose(options[index].key);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

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
    moved.current = true;
    setDirection("back");
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
      <section
        ref={stage}
        id="quiz"
        aria-labelledby="result-title"
        className="scroll-mt-16"
      >
        <div className="mx-auto max-w-[64rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <p className="eyebrow rise text-ink-muted">Your pitch</p>
          <h2
            id="result-title"
            data-focus-target
            tabIndex={-1}
            style={{ "--delay": "80ms" } as React.CSSProperties}
            className="rise mt-5 text-[length:var(--text-section)] text-ink focus:outline-none"
          >
            {result.title}
          </h2>

          <div
            style={{ backgroundColor: result.stock, "--delay": "160ms" } as React.CSSProperties}
            className="rise mt-8 rounded-card p-7 sm:p-12"
          >
            <p style={{ color: result.accent }} className="eyebrow">
              Say this out loud
            </p>

            <blockquote className="mt-6 space-y-3">
              {lines.map((line, index) => (
                <p
                  key={line}
                  style={{ "--delay": `${400 + index * 160}ms` } as React.CSSProperties}
                  className="rise max-w-[46ch] font-serif text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] leading-[1.3] text-ink"
                >
                  {line}
                </p>
              ))}
            </blockquote>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <button
                type="button"
                onClick={copyPitch}
                className="eyebrow cursor-pointer rounded-full bg-ink px-6 py-3.5 text-paper transition-colors duration-300 hover:bg-pine"
              >
                {copied ? "Copied" : "Copy the pitch"}
              </button>
              {/* A relabelled button is not reliably read out. */}
              <span role="status" className="sr-only">
                {copied ? "Pitch copied to the clipboard" : ""}
              </span>
              <p className="max-w-[38ch] text-sm leading-relaxed text-ink-soft">
                Change the words until they sound like you. The structure is
                the useful part.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-y-12 md:grid-cols-12 md:gap-x-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-ink-muted">Why this came out</p>
              <p className="mt-5 max-w-[52ch] text-[length:var(--text-lede)] leading-[1.5] text-ink">
                {result.summary}
              </p>
              <p className="mt-6 max-w-[64ch] leading-relaxed text-ink-soft">
                {result.body}
              </p>

              <div className="mt-8 border-t border-rule pt-6">
                <p className="eyebrow text-ink-muted">Working as: {role}</p>
                <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-ink-soft">
                  {bridges[role]}
                </p>
              </div>
            </div>

            <div className="md:col-span-5">
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
                Write down one time you did each, with a number attached.
                That is your brag-a-log, and it makes the pitch defensible.
              </p>
            </div>
          </div>

          {reading.length > 0 && (
            <div className="mt-16 border-t border-rule pt-10">
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
      </section>
    );
  }

  return (
    <section
      ref={stage}
      id="quiz"
      aria-label="Pitch quiz"
      className="scroll-mt-16"
    >
      <div className="mx-auto max-w-[52rem] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-pine" aria-live="polite">
            Question {boundedStep + 1} of {steps.length}
          </p>
          {boundedStep > 0 && (
            <button
              type="button"
              onClick={() => go(boundedStep - 1)}
              className="eyebrow cursor-pointer text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              Back
            </button>
          )}
        </div>

        {/* Progress is decorative; the count above carries the same information. */}
        <div aria-hidden="true" className="mt-4 h-1 bg-rule">
          <div
            style={{ width: `${((boundedStep + 1) / steps.length) * 100}%` }}
            className="h-full bg-pine transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        </div>

        <div
          style={{ backgroundColor: stocks[current] }}
          className="mt-8 overflow-hidden rounded-card transition-colors duration-500"
        >
          <fieldset
            key={current}
            data-focus-target
            tabIndex={-1}
            className={`p-6 focus:outline-none sm:p-10 ${direction === "back" ? "turn-back" : "turn-forward"}`}
          >
            <legend className="float-left w-full">
              <span className="headline block max-w-[18ch] text-[length:var(--text-section)] text-ink">
                {prompts[current]}
              </span>
            </legend>

            {(current === "role" ||
              current === "attraction" ||
              current === "want") && (
              <div className="clear-both pt-8">
                <ul className="grid gap-2.5">
                  {choices[current].map((option, index) => {
                    const active = selected === option.key;
                    return (
                      <li
                        key={option.key}
                        style={{ "--delay": `${120 + index * 50}ms` } as React.CSSProperties}
                        className="rise"
                      >
                        <button
                          type="button"
                          onClick={() => choose(option.key)}
                          aria-pressed={active}
                          className={`group flex w-full cursor-pointer items-center gap-4 rounded-card border-2 px-4 py-3.5 text-left transition-[background-color,border-color,transform] duration-300 active:scale-[0.99] sm:px-5 sm:py-4 ${
                            active
                              ? "border-pine bg-forest text-cream"
                              : "border-rule-strong bg-paper/60 text-ink hover:-translate-y-0.5 hover:border-ink hover:bg-paper"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`numeral grid h-8 w-8 shrink-0 place-items-center border text-sm transition-colors duration-300 ${
                              active
                                ? "border-cream text-cream"
                                : "border-rule-strong text-ink-muted group-hover:border-ink group-hover:text-ink"
                            }`}
                          >
                            {letters[index]}
                          </span>
                          <span className="text-lg leading-snug">
                            {option.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-6 hidden text-xs text-ink-muted sm:block">
                  Tip: press a letter key to answer.
                </p>
              </div>
            )}

            {current === "pathway" && (
              <div className="clear-both pt-6">
                <p className="max-w-[52ch] text-sm leading-relaxed text-ink-soft">
                  One or two sentences, in your words. It goes into the pitch
                  exactly as you type it.
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
                  className="mt-6 w-full resize-y rounded-card border-2 border-rule-field bg-paper/60 p-4 text-lg text-ink outline-none transition-[background-color,border-color,box-shadow] duration-300 placeholder:text-ink-muted focus:border-pine focus:bg-paper focus:shadow-[0_0_0_2px_var(--color-pine)]"
                />

                <p className="numeral mt-2 text-right text-xs text-ink-muted">
                  {pathway.length} / {PATHWAY_MAX}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={() => go(2)}
                    className="eyebrow cursor-pointer rounded-full bg-forest px-7 py-4 text-cream transition-colors duration-300 hover:bg-night"
                  >
                    {pathway.trim() ? "Next" : "Skip this one"}
                  </button>
                </div>
              </div>
            )}

            {current === "strengths" && (
              <div className="clear-both pt-6">
                <p className="max-w-[52ch] text-sm leading-relaxed text-ink-soft">
                  Pick up to {MAX_STRENGTHS}, the ones you could give an
                  example of. These decide your type.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {strengths.map((strength, index) => {
                    const active = picked.includes(strength.id);
                    return (
                      <button
                        key={strength.id}
                        type="button"
                        onClick={() => toggleStrength(strength.id)}
                        aria-pressed={active}
                        style={{ "--delay": `${100 + index * 30}ms` } as React.CSSProperties}
                        className={`rise cursor-pointer rounded-full border-2 px-4 py-2.5 text-left text-sm leading-snug transition-colors duration-300 ${
                          active
                            ? "border-pine bg-forest text-cream"
                            : "border-rule-strong bg-paper/60 text-ink-soft hover:border-ink hover:text-ink"
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
                    onClick={() => go(4)}
                    disabled={picked.length === 0}
                    className="eyebrow cursor-pointer rounded-full bg-forest px-7 py-4 text-cream transition-colors duration-300 hover:bg-night disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                  <p aria-live="polite" className="numeral text-sm text-ink-muted">
                    {picked.length} of {MAX_STRENGTHS}
                  </p>
                </div>
              </div>
            )}
          </fieldset>
        </div>
      </div>
    </section>
  );
}
