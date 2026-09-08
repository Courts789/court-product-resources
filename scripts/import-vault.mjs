/**
 * Pulls new rows out of the Obsidian vault into content/library as drafts.
 *
 * The vault is a capture surface: a markdown table you paste a link and a
 * line of reasoning into. This turns each new row into a draft entry file,
 * named with a leading underscore so it is ignored by the build until the
 * fields only a human can supply — theme, read time, byline — are filled in.
 *
 * Run it with `npm run library:import`.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

/** The vault this site draws from, by Obsidian's own id for it. */
const VAULT_ID = "990c09e10e7b4b0b";
const CONTENT = "content/library";

/**
 * Obsidian keeps a registry mapping vault ids to paths, and rewrites it when
 * a vault moves. Reading the path back out of that registry means this keeps
 * working when the folder gets dragged somewhere else, which hardcoding the
 * path would not. OBSIDIAN_VAULT overrides it for anyone without Obsidian.
 */
function vaultPath() {
  if (process.env.OBSIDIAN_VAULT) return process.env.OBSIDIAN_VAULT;
  const registry = join(homedir(), "Library/Application Support/obsidian/obsidian.json");
  if (!existsSync(registry)) {
    throw new Error(
      `No Obsidian registry at ${registry}. Set OBSIDIAN_VAULT to the vault folder.`,
    );
  }
  const vault = JSON.parse(readFileSync(registry, "utf8")).vaults?.[VAULT_ID];
  if (!vault) throw new Error(`Vault ${VAULT_ID} is not in Obsidian's registry.`);
  if (!existsSync(vault.path)) throw new Error(`Vault ${VAULT_ID} points at ${vault.path}, which is missing.`);
  return vault.path;
}

/** Media values the library understands, keyed by what the table tends to say. */
const MEDIA = {
  video: "Video", article: "Article", podcast: "Podcast",
  book: "Book", guide: "Guide", template: "Template",
};

const cells = (line) => line.split("|").slice(1, -1).map((c) => c.trim());
const isDivider = (line) => /^\|[\s:|-]+\|$/.test(line.trim());

/** Every markdown table row in the vault, keyed by its own column headings. */
function rows(markdown) {
  const lines = markdown.split(/\r?\n/);
  const found = [];
  let headings = null;
  for (const line of lines) {
    if (!line.trim().startsWith("|")) { headings = null; continue; }
    if (isDivider(line)) continue;
    const values = cells(line);
    if (!headings) { headings = values.map((h) => h.toLowerCase()); continue; }
    found.push(Object.fromEntries(headings.map((h, i) => [h, values[i] ?? ""])));
  }
  return found;
}

const slug = (s) =>
  s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "").slice(0, 60);

const vault = vaultPath();
const notes = readdirSync(vault).filter((f) => f.endsWith(".md"));
if (!notes.length) throw new Error(`No markdown notes in ${vault}.`);

/** Urls already in the library, so re-importing never duplicates an entry. */
const existing = new Set();
for (const file of readdirSync(CONTENT).filter((f) => f.endsWith(".md"))) {
  const url = /^url:\s*"?([^"\n]+)"?/m.exec(readFileSync(join(CONTENT, file), "utf8"));
  if (url) existing.add(url[1].trim().replace(/\/$/, ""));
}

const written = [];
const skipped = [];

for (const note of notes) {
  for (const row of rows(readFileSync(join(vault, note), "utf8"))) {
    const url = (row.link || "").trim();
    const rawTitle = (row.title || "").trim();
    if (!url || !rawTitle) continue;

    /**
     * A `<br>` in the title cell is how the table carries an author under
     * the title, so split it back apart rather than importing one blob.
     */
    const [title, by = ""] = rawTitle.split(/<br\s*\/?>/i).map((s) => s.trim());

    if (existing.has(url.replace(/\/$/, ""))) { skipped.push(title); continue; }
    const media = MEDIA[(row.type || "").trim().toLowerCase()] ?? "TODO";
    const note_ = (row["why i like it"] || "").trim();

    const id = slug(title);
    const target = join(CONTENT, `_${id}.md`);
    if (existsSync(target) || existsSync(join(CONTENT, `${id}.md`))) {
      skipped.push(title);
      continue;
    }

    const q = (s) => `"${String(s).replace(/"/g, '\\"')}"`;
    writeFileSync(
      target,
      [
        "---",
        `title: ${q(title)}`,
        `by: ${q(by || "TODO")}`,
        `url: ${q(url)}`,
        `theme: ${q("TODO")}`,
        `media: ${q(media)}`,
        `time: ${q("TODO")}`,
        `added: ${q(new Date().toISOString().slice(0, 10))}`,
        "---",
        "",
        note_ || "TODO: one sentence on why this earns a place in the collection.",
        "",
      ].join("\n"),
      "utf8",
    );
    written.push(`_${id}.md`);
    existing.add(url.replace(/\/$/, ""));
  }
}

console.log(`Vault: ${vault}`);
if (skipped.length) console.log(`Already in the library, skipped ${skipped.length}: ${skipped.join(", ")}`);
if (!written.length) {
  console.log("Nothing new to import.");
} else {
  console.log(`\nImported ${written.length} draft(s):`);
  for (const file of written) console.log(`  · ${CONTENT}/${file}`);
  console.log(
    "\nEach one has TODO fields that need a human: theme, time, byline.\n" +
      "Fill them in, drop the leading underscore, then run `npm run library`.",
  );
}
