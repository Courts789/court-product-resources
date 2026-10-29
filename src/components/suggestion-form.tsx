"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitSuggestion, type SuggestionState } from "@/app/actions/suggest";

const initialState: SuggestionState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="eyebrow mt-8 cursor-pointer rounded-full bg-forest px-7 py-4 text-cream transition-colors duration-300 hover:bg-night disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Sending" : "Send suggestion"}
    </button>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-ink">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-ink-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-alarm">
          {error}
        </p>
      )}
    </div>
  );
}

/*
 * No outline ring: focus is the underline turning pine and doubling in
 * weight, which is visible without the colour change too.
 */
const inputClass =
  "w-full border-b-2 border-rule-field bg-transparent pb-2 text-lg text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink-muted focus:border-pine focus:shadow-[0_2px_0_0_var(--color-pine)]";

/** Hint first, then the error, so a screen reader hears the rule before the problem. */
function describedBy(id: string, hint: boolean, error?: string) {
  const ids = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

const fieldOrder = ["name", "email", "link", "reason", "linkedin"] as const;

export function SuggestionForm() {
  const [state, formAction] = useActionState(submitSuggestion, initialState);
  const form = useRef<HTMLFormElement>(null);
  const thanks = useRef<HTMLDivElement>(null);

  /*
   * Submitting swaps what is on screen without a page load, so focus has to
   * be put somewhere deliberate: on the first field that needs fixing, or on
   * the thank-you once the form itself has gone.
   */
  useEffect(() => {
    if (state.status === "success") {
      thanks.current?.focus();
      return;
    }
    const first = fieldOrder.find((field) => state.errors?.[field]);
    if (first) form.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
  }, [state]);

  /*
   * React resets a form after a server action runs, which would wipe
   * everything typed whenever validation sends the person back. Holding
   * the values here keeps their work intact across a failed submit.
   */
  const [values, setValues] = useState({
    name: "",
    email: "",
    link: "",
    reason: "",
    linkedin: "",
  });

  function update(field: keyof typeof values) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
  }

  if (state.status === "success") {
    return (
      <div
        ref={thanks}
        role="status"
        tabIndex={-1}
        className="rounded-card bg-sage p-7 focus:outline-none"
      >
        <p className="text-[length:var(--text-lede)] leading-[1.45] text-ink">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form ref={form} action={formAction} className="max-w-xl">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="name" label="Your name" error={state.errors?.name}>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={update("name")}
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={describedBy("name", false, state.errors?.name)}
            className={inputClass}
          />
        </Field>

        <Field id="email" label="Email" error={state.errors?.email}>
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={update("email")}
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={describedBy("email", false, state.errors?.email)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-8 grid gap-8">
        <Field
          id="link"
          label="The link"
          hint="An article, episode, video, book or template."
          error={state.errors?.link}
        >
          <input
            id="link"
            name="link"
            value={values.link}
            onChange={update("link")}
            type="url"
            required
            maxLength={500}
            placeholder="https://"
            aria-invalid={Boolean(state.errors?.link)}
            aria-describedby={describedBy("link", true, state.errors?.link)}
            className={inputClass}
          />
        </Field>

        <Field
          id="reason"
          label="Why it's worth someone's time"
          hint="A sentence or two is plenty."
          error={state.errors?.reason}
        >
          <textarea
            id="reason"
            name="reason"
            value={values.reason}
            onChange={update("reason")}
            required
            rows={3}
            maxLength={1200}
            aria-invalid={Boolean(state.errors?.reason)}
            aria-describedby={describedBy("reason", true, state.errors?.reason)}
            className={`${inputClass} resize-y`}
          />
        </Field>

        <Field
          id="linkedin"
          label="Your LinkedIn (optional)"
          hint="Only so I can connect with you. Nothing else happens to it."
          error={state.errors?.linkedin}
        >
          <input
            id="linkedin"
            name="linkedin"
            value={values.linkedin}
            onChange={update("linkedin")}
            type="url"
            maxLength={300}
            placeholder="https://www.linkedin.com/in/"
            autoComplete="url"
            aria-invalid={Boolean(state.errors?.linkedin)}
            aria-describedby={describedBy(
              "linkedin",
              true,
              state.errors?.linkedin,
            )}
            className={inputClass}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} />
      </div>

      {state.status === "error" && !state.errors && (
        <p role="alert" className="mt-6 text-sm text-alarm">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
