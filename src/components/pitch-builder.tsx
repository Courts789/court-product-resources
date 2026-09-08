"use client";

import { useMemo, useState } from "react";
import {
  bridges,
  emptyScores,
  origins,
  questions,
  results,
  startingRoles,
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
 * Steps are: where you're coming from, the scored questions, and what you
 * want next. The first and last are the outer lines of the pitch; the
 * ones in between decide the middle line.
 */
const totalSteps = questions.length + 2;

export function PitchBuilder() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<StartingRole | null>(null);
  const [want, setWant] = useState<Want | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array.from({ length: questions.length }, () => null),
  );
  const [copied, setCopied] = useState(false);

  const complete =
    role !== null && want !== null && answers.every((answer) => answer !== null);

  /*
   * Clamp the cursor so it can never point past the last step. Without
   * this, an unanswered gap leaves the step counter running on into an
   * empty fieldset instead of showing a question.
   */
  const lastStep = questions.length + 1;
  const boundedStep = Math.max(0, Math.min(step, lastStep));

  const winner = useMemo<Specialism | null>(() => {
    if (!answers.every((answer) => answer !== null)) return null;

    const scores: Scores = emptyScores();

    questions.forEach((question, index) => {
      const choice = answers[index];
      if (choice === null) return;
      for (const [key, value] of Object.entries(
        question.options[choice].weights,
      )) {
        scores[key as Specialism] += value ?? 0;
      }
    });

    return (Object.entries(scores) as [Specialism, number][]).sort(
      (a, b) => b[1] - a[1],
    )[0][0];
  }, [answers]);

  function choose(index: number) {
    setAnswers((previous) => {
      const next = [...previous];
      next[boundedStep - 1] = index;
      return next;
    });
    setStep(boundedStep + 1);
  }

  function restart() {
    setStep(0);
    setRole(null);
    setWant(null);
    setCopied(false);
    setAnswers(Array.from({ length: questions.length }, () => null));
  }

  if (complete && winner && role && want) {
    const result = results[winner];
    const reading = result.reading
      .map((id) => resources.find((resource) => resource.id === id))
      .filter((resource) => resource !== undefined);

    /*
     * Three sentences, written to be said rather than read. Kept as
     * separate lines on the page so it is obvious which part is which,
     * and joined into one paragraph when copied, because that is the
     * shape it needs to be in a message or a profile.
     */
    const lines = [
      `I'm ${origins[role]}.`,
      `I'm at my best ${result.pitch}.`,
      `What I want next is ${wantClauses[want]}.`,
    ];

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
            {result.title}
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
              <p className="eyebrow text-ink-muted">Coming from: {role}</p>
              <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-ink-soft">
                {bridges[role]}
              </p>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <p className="eyebrow text-ink-muted">Evidence to go and find</p>
            {/* The brag-a-log half: a pitch without examples behind it
                falls over on the first follow-up question. */}
            <ul className="mt-5">
              {result.strengths.map((strength) => (
                <li
                  key={strength}
                  className="border-b border-rule py-3 text-sm leading-relaxed text-ink-soft first:border-t"
                >
                  {strength}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-ink-muted">
              Write down one time you did each of these, with a number
              attached. That is your brag-a-log, and it is what turns the
              pitch above into something you can defend.
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
            className="eyebrow cursor-pointer rounded-full bg-pine px-7 py-4 text-paper transition-colors duration-300 hover:bg-ink"
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

  const question =
    boundedStep === 0 || boundedStep === lastStep
      ? null
      : questions[boundedStep - 1];

  const legend =
    boundedStep === 0
      ? "Where are you coming from?"
      : boundedStep === lastStep
        ? "And what do you want next?"
        : question?.prompt;

  return (
    <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="flex items-center justify-between border-b border-rule pb-4">
        <p className="eyebrow text-pine">
          Question {boundedStep + 1} of {totalSteps}
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
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span
            key={index}
            className={`h-0.5 flex-1 transition-colors duration-500 ${
              index <= boundedStep ? "bg-pine" : "bg-rule"
            }`}
          />
        ))}
      </div>

      <fieldset className="mt-10">
        <legend className="headline max-w-[22ch] text-[length:var(--text-section)] text-ink">
          {legend}
        </legend>

        <div className="mt-10 grid gap-px sm:grid-cols-2">
          {boundedStep === 0 &&
            startingRoles.map((option) => (
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

          {boundedStep === lastStep &&
            wantOptions.map((option) => (
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

          {question?.options.map((option, index) => (
            <button
              key={option.label}
              type="button"
              onClick={() => choose(index)}
              aria-pressed={answers[boundedStep - 1] === index}
              className="group border-b border-rule py-5 text-left transition-colors duration-300 hover:bg-paper-sunk sm:pr-8"
            >
              <span className="block max-w-[38ch] text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-pine">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
