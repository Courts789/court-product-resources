"use client";

import { useMemo, useState } from "react";
import {
  bridges,
  emptyScores,
  questions,
  results,
  startingRoles,
  type Scores,
  type Specialism,
  type StartingRole,
} from "@/data/quiz";
import { resources } from "@/data/resources";
import { ArrowUpRight } from "@/components/icons";

/** Steps are the role question plus one per scored question. */
const totalSteps = questions.length + 1;

export function Quiz() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<StartingRole | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array.from({ length: questions.length }, () => null),
  );

  const complete = role !== null && answers.every((answer) => answer !== null);

  /*
   * Clamp the cursor so it can never point past the last question. Without
   * this, an unanswered gap leaves the step counter running on into an
   * empty fieldset ("Question 7 of 6") instead of showing a question.
   */
  const boundedStep = Math.max(0, Math.min(step, questions.length));

  const winner = useMemo<Specialism | null>(() => {
    if (!complete) return null;

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
  }, [answers, complete]);

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
    setAnswers(Array.from({ length: questions.length }, () => null));
  }

  if (complete && winner) {
    const result = results[winner];
    const reading = result.reading
      .map((id) => resources.find((resource) => resource.id === id))
      .filter((resource) => resource !== undefined);

    return (
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <p className="eyebrow text-brass-deep">Your result</p>

        <h2
          style={{ color: result.accent }}
          className="mt-6 max-w-[18ch] text-[length:var(--text-section)] leading-[1.1]"
        >
          {result.title}
        </h2>

        <p className="mt-6 max-w-[52ch] font-display text-[length:var(--text-lede)] leading-[1.45] text-ink">
          {result.summary}
        </p>

        <div className="mt-12 grid gap-y-10 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-7">
            <p className="max-w-[64ch] leading-relaxed text-ink-soft">
              {result.body}
            </p>

            <div
              style={{ borderColor: result.accent }}
              className="mt-8 border-l-2 pl-6"
            >
              <p className="eyebrow text-ink">Coming from: {role}</p>
              <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-ink-soft">
                {role ? bridges[role] : null}
              </p>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <p className="eyebrow text-ink-muted">
              Where you&rsquo;d be strongest
            </p>
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
          </div>
        </div>

        {reading.length > 0 && (
          <div className="mt-14 border-t border-rule pt-10">
            <p className="eyebrow text-brass-deep">Read next</p>
            <ol className="mt-6">
              {reading.map((resource) => (
                <li key={resource.id}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-rule py-4 transition-colors duration-300 hover:bg-paper-sunk"
                  >
                    <span className="font-display text-xl text-ink">
                      <span className="rule-link">{resource.title}</span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="text-sm text-ink-muted">
                      {resource.by}
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
            className="eyebrow cursor-pointer bg-ink px-6 py-4 text-paper transition-colors duration-300 hover:bg-forest"
          >
            Take it again
          </button>
          <a href="/library" className="eyebrow rule-link text-ink-muted">
            Browse the whole library
          </a>
        </div>
      </div>
    );
  }

  const question = boundedStep === 0 ? null : questions[boundedStep - 1];

  return (
    <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="flex items-center justify-between border-b border-rule pb-4">
        <p className="eyebrow text-brass-deep">
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
              index <= boundedStep ? "bg-brass" : "bg-rule"
            }`}
          />
        ))}
      </div>

      <fieldset className="mt-10">
        <legend className="max-w-[26ch] text-[length:var(--text-section)] font-display leading-[1.15] text-ink">
          {boundedStep === 0
            ? "Where are you starting from today?"
            : question?.prompt}
        </legend>

        <div className="mt-10 grid gap-px sm:grid-cols-2">
          {boundedStep === 0
            ? startingRoles.map((option) => (
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
                  <span className="font-display text-xl text-ink transition-colors duration-300 group-hover:text-forest">
                    {option}
                  </span>
                </button>
              ))
            : question?.options.map((option, index) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => choose(index)}
                  aria-pressed={answers[boundedStep - 1] === index}
                  className="group border-b border-rule py-5 text-left transition-colors duration-300 hover:bg-paper-sunk sm:pr-8"
                >
                  <span className="block max-w-[38ch] font-display text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-forest">
                    {option.label}
                  </span>
                </button>
              ))}
        </div>
      </fieldset>
    </div>
  );
}
