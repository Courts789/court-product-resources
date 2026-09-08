"use server";

/**
 * Handles suggestion submissions.
 *
 * Submissions are forwarded to whatever endpoint SUGGESTIONS_WEBHOOK_URL
 * points at (a Zapier or Make hook, a Formspree form, an Airtable
 * automation, a Slack incoming webhook). Until that variable is set the
 * action refuses rather than pretending to succeed, so nobody's
 * recommendation is silently dropped.
 */

export type SuggestionState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level problems, keyed by input name. */
  errors?: Record<string, string>;
};

const MAX_LENGTHS = {
  name: 120,
  email: 200,
  link: 500,
  reason: 1200,
  linkedin: 300,
};

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function submitSuggestion(
  _previous: SuggestionState,
  formData: FormData,
): Promise<SuggestionState> {
  // Bots fill hidden fields; people don't.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Thanks, that's been received." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const link = String(formData.get("link") ?? "").trim();
  const reason = String(formData.get("reason") ?? "").trim();
  const linkedin = String(formData.get("linkedin") ?? "").trim();

  const errors: Record<string, string> = {};

  if (!name) errors.name = "Please add your name.";
  else if (name.length > MAX_LENGTHS.name)
    errors.name = "That's a little long.";

  if (!email) errors.email = "Please add an email address.";
  else if (!isEmail(email) || email.length > MAX_LENGTHS.email)
    errors.email = "That doesn't look like an email address.";

  if (!link) errors.link = "Please add a link.";
  else if (!isHttpUrl(link) || link.length > MAX_LENGTHS.link)
    errors.link = "Please use a full link starting with http or https.";

  if (!reason) errors.reason = "Tell me why it's worth reading.";
  else if (reason.length > MAX_LENGTHS.reason)
    errors.reason = "Please keep this under 1200 characters.";

  /* Optional, so an empty value is fine. Anything else has to be a real
     LinkedIn profile URL, since the only thing it's for is connecting. */
  if (linkedin) {
    if (!isHttpUrl(linkedin) || linkedin.length > MAX_LENGTHS.linkedin)
      errors.linkedin = "Please use a full link starting with http or https.";
    else if (!/(^|\.)linkedin\.com$/i.test(new URL(linkedin).hostname))
      errors.linkedin = "That doesn't look like a LinkedIn profile.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  const endpoint = process.env.SUGGESTIONS_WEBHOOK_URL;

  if (!endpoint) {
    console.error(
      "[suggestions] SUGGESTIONS_WEBHOOK_URL is not set, so this submission was not delivered:",
      { name, email, link, reason, linkedin },
    );
    return {
      status: "error",
      message:
        "Suggestions aren't connected yet, so this didn't send. Please try again later.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        link,
        reason,
        linkedin: linkedin || null,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Endpoint responded ${response.status}`);
    }
  } catch (error) {
    console.error("[suggestions] delivery failed:", error);
    return {
      status: "error",
      message: "Something went wrong sending that. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Thank you. If it earns a place, it'll appear in the library.",
  };
}
