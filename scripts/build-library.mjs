/**
 * Turns content/library/*.md into src/data/resources.generated.ts.
 *
 * The library is written as markdown so entries can be edited in Obsidian
 * rather than hand-typed into a TypeScript array. It is compiled rather than
 * read at runtime because library.tsx and pitch-builder.tsx are client
 * components that import `resources` directly, and a client bundle has no fs.
 *
 * The generated file is committed, so `next build` never has to run this.
 * Run it after editing the vault: `npm run library`.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const CONTENT = "content/library";
const SOURCE = "src/data/resources.ts";
const OUT = "src/data/resources.generated.ts";

/**
 * The controlled vocabulary lives in resources.ts, which owns the types.
 * Reading it back out here keeps one source of truth: add a theme there and
 * the validation below follows automatically.
 */
function vocabulary() {
  const src = readFileSync(SOURCE, "utf8");
  const themeBlock = /export const themes = \[([\s\S]*?)\] as const;/.exec(src);
  const mediaBlock = /export type Media =([\s\S]*?);/.exec(src);
  if (!themeBlock || !mediaBlock) {
    throw new Error(`Could not read themes/Media out of ${SOURCE}.`);
  }
  const strings = (s) => [...s.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  return { themes: strings(themeBlock[1]), media: strings(mediaBlock[1]) };
}

/**
 * Minimal frontmatter reader: `key: "value"` pairs, one per line, everything
 * after the closing fence is the note. Deliberately not a YAML parser — the
 * schema is seven flat strings and a dependency would earn its keep at none.
 */
function parse(file, raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!match) throw new Error(`${file}: missing frontmatter block.`);
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const pair = /^([A-Za-z]+):\s*(.*)$/.exec(line);
    if (!pair) throw new Error(`${file}: cannot read frontmatter line "${line}".`);
    const value = pair[2].trim();
    fields[pair[1]] =
      value.startsWith('"') && value.endsWith('"')
        ? value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
        : value;
  }
  return { fields, note: match[2].trim() };
}

const { themes, media } = vocabulary();
/**
 * A leading underscore means "not an entry yet": drafts you are still
 * writing, and the vault's own README. Obsidian is a scratchpad as much as
 * a source, so half-finished notes must not be able to break the build.
 */
const files = readdirSync(CONTENT)
  .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
  .sort();
const problems = [];
const entries = [];

for (const file of files) {
  const id = file.replace(/\.md$/, "");
  let parsed;
  try {
    parsed = parse(file, readFileSync(join(CONTENT, file), "utf8"));
  } catch (error) {
    problems.push(error.message);
    continue;
  }
  const { fields, note } = parsed;

  for (const key of ["title", "by", "url", "theme", "media", "time", "added", "verdict"]) {
    if (!fields[key]) problems.push(`${file}: missing "${key}".`);
  }
  if (fields.theme && !themes.includes(fields.theme)) {
    problems.push(`${file}: theme "${fields.theme}" is not one of ${themes.join(", ")}.`);
  }
  if (fields.media && !media.includes(fields.media)) {
    problems.push(`${file}: media "${fields.media}" is not one of ${media.join(", ")}.`);
  }
  if (fields.added && !/^\d{4}-\d{2}-\d{2}$/.test(fields.added)) {
    problems.push(`${file}: added "${fields.added}" is not a YYYY-MM-DD date.`);
  }
  if (fields.url && !/^https?:\/\//.test(fields.url)) {
    problems.push(`${file}: url "${fields.url}" is not an http(s) link.`);
  }
  if (!note) problems.push(`${file}: no note. Every entry needs its one sentence.`);

  /*
   * House style, enforced rather than remembered. The banned list and the
   * em dash are the two things that reliably creep back in, and a note
   * that runs past three sentences is two entries wearing one heading.
   */
  const banned =
    /\b(game.?chang\w*|unlocks?|unlocking|supercharges?|elevates?|seamless\w*|cutting.edge|best.in.class|revolutionar\w*|leverages?|leveraging|robust|deep dive)\b/i;
  const hit = banned.exec(note) ?? banned.exec(fields.verdict ?? "");
  if (hit) problems.push(`${file}: "${hit[0]}" is on the banned word list.`);
  if (/[\u2014]/.test(note) || /[\u2014]/.test(fields.verdict ?? "")) {
    problems.push(`${file}: em dash. Use a period or a comma.`);
  }
  const sentences = note.split(/[.!?](?:\s|$)/).filter((s) => s.trim()).length;
  if (sentences > 3) problems.push(`${file}: note runs to ${sentences} sentences, max is 3.`);

  entries.push({ id, ...fields, note });
}

const seen = new Map();
for (const entry of entries) {
  const url = entry.url?.replace(/\/$/, "");
  if (seen.has(url)) problems.push(`${entry.id}.md: same url as ${seen.get(url)}.md.`);
  else seen.set(url, entry.id);
}

if (problems.length) {
  console.error(`\nThe library did not build. ${problems.length} problem(s):\n`);
  for (const problem of problems) console.error(`  · ${problem}`);
  console.error("");
  process.exit(1);
}

/** Grouped by theme, newest first within a theme, so diffs stay readable. */
entries.sort(
  (a, b) =>
    themes.indexOf(a.theme) - themes.indexOf(b.theme) ||
    b.added.localeCompare(a.added) ||
    a.id.localeCompare(b.id),
);

const str = (s) => JSON.stringify(s);
const body = entries
  .map((e) =>
    [
      "  {",
      `    id: ${str(e.id)},`,
      `    title: ${str(e.title)},`,
      `    by: ${str(e.by)},`,
      `    url: ${str(e.url)},`,
      `    theme: ${str(e.theme)},`,
      `    media: ${str(e.media)},`,
      `    time: ${str(e.time)},`,
      `    added: ${str(e.added)},`,
      `    verdict: ${str(e.verdict)},`,
      `    note: ${str(e.note)},`,
      "  },",
    ].join("\n"),
  )
  .join("\n");

writeFileSync(
  OUT,
  `// Generated by scripts/build-library.mjs from content/library/*.md.
// Do not edit by hand: edit the markdown and run \`npm run library\`.

import type { Resource } from "./resources";

export const resources: readonly Resource[] = [${body ? `\n${body}\n` : ""}];
`,
  "utf8",
);

const plural = entries.length === 1 ? "entry" : "entries";
console.log(`Library built: ${entries.length} ${plural} → ${OUT}`);
