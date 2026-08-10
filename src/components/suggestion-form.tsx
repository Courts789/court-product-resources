"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitSuggestion, type SuggestionState } from "@/app/actions/suggest";

const initialState: SuggestionState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="eyebrow mt-8 cursor-pointer bg-forest px-6 py-4 text-paper transition-colors duration-300 hover:bg-ink disabled:cursor-wait disabled:opacity-70"
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
      {hint && <p className="mt-2 text-xs text-ink-muted">{hint}</p>}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-oxblood">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full border-b border-rule bg-transparent pb-2 font-display text-lg text-ink outline-none transition-colors duration-300 placeholder:text-ink-muted focus:border-brass";

export function SuggestionForm() {
  const [state, formAction] = useActionState(submitSuggestion, initialState);

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
  });

  function update(field: keyof typeof values) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
  }

  if (state.status === "success") {
    return (
      <div className="border-l-2 border-forest pl-6">
        <p className="font-display text-[length:var(--text-lede)] leading-[1.4] text-ink">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="max-w-xl">
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
            aria-describedby={state.errors?.name ? "name-error" : undefined}
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
            aria-describedby={state.errors?.email ? "email-error" : undefined}
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
            aria-describedby={state.errors?.link ? "link-error" : undefined}
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
            aria-describedby={state.errors?.reason ? "reason-error" : undefined}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} />
      </div>

      {state.status === "error" && !state.errors && (
        <p role="alert" className="mt-6 text-sm text-oxblood">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
