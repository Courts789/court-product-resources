/**
 * Keeps the library in step with the Obsidian vault, taking the vault at its
 * word.
 *
 * Each note in the vault is one entry: loose `key: value` lines followed by
 * the reasons it is worth your time. Whatever Courtney wrote is what the site
 * shows. The title, byline, format, time and date come straight from the
 * note, the folder the note is filed in is the theme, and the note's theme
 * line becomes search tags. Nothing is looked up or recalculated, so the
 * script makes no network calls.
 *
 * It writes a draft for anything new and brings published entries back into
 * line when the note changes. The verdict and note are the one thing it
 * cannot do, because they are her why lines pieced into sentences, so it
 * flags those for a person (or the scheduled Claude run) instead.
 *
 * Drafts start with an underscore, so the build ignores them until the
 * verdict and note are written.
 *
 * Run it with `npm run library:sync`. `--json` prints a machine-readable
 * report. `--mark-current <entry.md>` records that an entry's verdict and
 * note have been updated to match its why lines.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, dirname, join, relative, sep } from "node:path";

/** The vault this site draws from, by Obsidian's own id for it. */
const VAULT_ID = "990c09e10e7b4b0b";
const CONTENT = "content/library";
const SOURCE = "src/data/resources.ts";

/**
 * Obsidian keeps a registry of vault ids to paths and rewrites it when a
 * vault moves, so resolving the id there survives the folder being dragged
 * somewhere else. OBSIDIAN_VAULT overrides it for anyone without Obsidian.
 */
function vaultPath() {
  if (process.env.OBSIDIAN_VAULT) return process.env.OBSIDIAN_VAULT;
  const registry = join(homedir(), "Library/Application Support/obsidian/obsidian.json");
  if (!existsSync(registry)) {
    throw new Error(`No Obsidian registry at ${registry}. Set OBSIDIAN_VAULT to the vault folder.`);
  }
  const vault = JSON.parse(readFileSync(registry, "utf8")).vaults?.[VAULT_ID];
  if (!vault) throw new Error(`Vault ${VAULT_ID} is not in Obsidian's registry.`);
  if (!existsSync(vault.path)) throw new Error(`Vault ${VAULT_ID} points at ${vault.path}, which is missing.`);
  return vault.path;
}

/* ── Reading the vault ───────────────────────────────────────────────────── */

const KEYS = ["title", "by", "url", "theme", "format", "media", "time", "added"];
const WHY = /^why\s+it['’]?s\s+worth\s+(?:reading|watching|listening|it)\s*:\s*(.*)$/i;

/**
 * Everything after the "why it's worth reading" line belongs to it, one
 * reason per line, because that is how the notes are actually written.
 */
function parseNote(raw) {
  const fields = {};
  const reasons = [];
  let inReasons = false;
  for (const line of raw.split(/\r?\n/)) {
    const why = WHY.exec(line.trim());
    if (why) {
      inReasons = true;
      if (why[1].trim()) reasons.push(why[1].trim());
      continue;
    }
    if (inReasons) {
      const reason = line.trim().replace(/^[-*•]\s*/, "");
      if (reason) reasons.push(reason);
      continue;
    }
    const pair = /^([A-Za-z]+)\s*:\s*(.*)$/.exec(line.trim());
    if (pair && KEYS.includes(pair[1].toLowerCase())) {
      fields[pair[1].toLowerCase()] = pair[2].trim();
    }
  }
  /* The template says "format"; older notes said "media". */
  if (!fields.format && fields.media) fields.format = fields.media;
  return { fields, reasons };
}

/** The site's themes, read from the file that owns them. */
const THEMES = (() => {
  const block = /export const themes = \[([\s\S]*?)\] as const;/.exec(readFileSync(SOURCE, "utf8"));
  if (!block) throw new Error(`Could not read themes out of ${SOURCE}.`);
  return [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
})();

const MEDIA = {
  article: "Article", video: "Video", podcast: "Podcast",
  book: "Book", guide: "Guide", template: "Template",
};

const VERB = { Article: "read", Guide: "read", Book: "read", Template: "read", Video: "watch", Podcast: "listen" };

/**
 * The theme is the nearest folder above the note whose name is a theme, so
 * "Court's Product Resources/AI/note.md" is AI. Case does not matter.
 */
function themeOf(path, vault) {
  const folders = relative(vault, dirname(path)).split(sep).reverse();
  for (const folder of folders) {
    const theme = THEMES.find((t) => t.toLowerCase() === folder.trim().toLowerCase());
    if (theme) return theme;
  }
  return null;
}

/** Every note in the vault, however deep, except the Drafts folder and Obsidian's own files. */
function notesIn(dir) {
  const found = [];
  for (const name of readdirSync(dir).sort()) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name.startsWith(".") || /^drafts?$/i.test(name)) continue;
      found.push(...notesIn(path));
    } else if (name.endsWith(".md") && !/^template\.md$/i.test(name)) {
      found.push(path);
    }
  }
  return found;
}

/** The theme line, split into tags: "vibe-coding, AI" to "vibe-coding, AI". */
const tagsOf = (line) =>
  (line ?? "")
    .split(/[,;]/)
    .map((tag) => tag.trim())
    .filter((tag, index, all) => tag && all.findIndex((t) => t.toLowerCase() === tag.toLowerCase()) === index)
    .join(", ");

/**
 * "10 minutes" on an article becomes "10 min read". The number is hers; only
 * the wording follows the site's style, and anything already in that style,
 * or not a plain number of minutes, is kept exactly as written.
 */
function timeOf(value, media) {
  const written = (value ?? "").trim();
  const minutes = /^(\d+)\s*(?:m|mins?|minutes?)$/i.exec(written)?.[1];
  const hours = /^(\d+(?:\.\d+)?)\s*(?:h|hrs?|hours?)$/i.exec(written)?.[1];
  const verb = VERB[media];
  if (minutes && verb) return `${minutes} min ${verb}`;
  if (hours && verb) return `${hours} hr ${verb}`;
  return written;
}

/** "1 September 2026" to 2026-09-01, in local time so the day never shifts. */
function isoDate(value) {
  const written = (value ?? "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(written)) return written;
  const parsed = new Date(written);
  if (Number.isNaN(parsed.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`;
}

/** What the vault says each site field should be. Empty means she left it blank. */
function fromVault(fields, path, vault) {
  const media = MEDIA[(fields.format ?? "").toLowerCase()] ?? "";
  return {
    url: (fields.url ?? "").trim(),
    title: fields.title ?? "",
    by: fields.by ?? "",
    theme: themeOf(path, vault) ?? "",
    media,
    time: timeOf(fields.time, media),
    added: isoDate(fields.added),
    tags: tagsOf(fields.theme),
  };
}

/* ── Comparing with the library ──────────────────────────────────────────── */

const quote = (value) => `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
const unquote = (value) => (value ?? "").replace(/^"|"$/g, "").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
/**
 * Two links are the same page if they only differ by a share code such as
 * Substack's `?r=`, so re-sharing a link never creates a duplicate entry.
 * The url itself is still kept exactly as written.
 */
const pageOf = (value) => {
  try {
    const url = new URL(value.trim());
    for (const key of [...url.searchParams.keys()]) {
      if (/^(r|s|ref|source|si|feature|triedRedirect|showWelcome|utm_.*)$/i.test(key)) url.searchParams.delete(key);
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    return value.trim().replace(/\/$/, "");
  }
};
const sameUrl = (a, b) => pageOf(a) === pageOf(b);

function readEntry(file) {
  const raw = readFileSync(join(CONTENT, file), "utf8");
  const get = (key) => unquote(new RegExp(`^${key}:\\s*(.*?)\\s*$`, "m").exec(raw)?.[1]);
  const fields = Object.fromEntries(["title", "by", "url", "theme", "media", "time", "added", "tags", "vaultHash"].map((k) => [k, get(k)]));
  return { file, draft: file.startsWith("_"), ...fields };
}

/** Set one frontmatter field in an entry file, adding the line if it is missing. */
function setField(file, key, value) {
  const path = join(CONTENT, file);
  const raw = readFileSync(path, "utf8");
  const line = `${key}: ${quote(value)}`;
  const pattern = new RegExp(`^${key}:.*$`, "m");
  const next = pattern.test(raw) ? raw.replace(pattern, () => line) : raw.replace(/\n---\n/, () => `\n${line}\n---\n`);
  writeFileSync(path, next, "utf8");
}

const slugify = (title) => {
  const base = title.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (base.length <= 60) return base;
  return base.slice(0, 61).replace(/-[^-]*$/, "");
};

/**
 * Fingerprints only the why lines. Those are the words the verdict and note
 * are pieced from, so they are the only edit that needs a person. Every
 * other field is copied across by this script on its own.
 */
const hash = (reasons) =>
  createHash("sha1").update(reasons.join("\n").replace(/\s+/g, " ").trim()).digest("hex").slice(0, 12);

/* ── Run ─────────────────────────────────────────────────────────────────── */

const SYNCED = ["title", "by", "url", "theme", "media", "time", "added", "tags"];

const vault = vaultPath();
const entries = readdirSync(CONTENT)
  .filter((f) => f.endsWith(".md") && f !== "_README.md")
  .map(readEntry);

const markIndex = process.argv.indexOf("--mark-current");
const markFile = markIndex > -1 ? basename(process.argv[markIndex + 1] ?? "") : null;

const report = {
  vault, created: [], refreshed: [], pending: [], changed: [], updated: [], unchanged: [],
  blanks: [], split: [], skipped: [],
};

for (const path of notesIn(vault)) {
  const name = relative(vault, path);
  const { fields, reasons } = parseNote(readFileSync(path, "utf8"));

  if (!fields.url || !fields.title) {
    report.skipped.push(name);
    continue;
  }

  const url = fields.url.trim();
  if ((url.match(/https?:\/\//g) ?? []).length > 1 || /\s/.test(url)) {
    report.split.push(name);
    continue;
  }

  const wanted = fromVault(fields, path, vault);
  const blank = Object.entries({ ...wanted, why: reasons.join("") })
    .filter(([key, value]) => key !== "tags" && !value)
    .map(([key]) => (key === "media" ? "format" : key === "theme" ? "theme folder" : key));
  if (blank.length) report.blanks.push({ vault: name, missing: blank });

  const noteHash = hash(reasons);
  const existing = entries.find((entry) => entry.url && sameUrl(entry.url, url));

  if (existing && !existing.draft) {
    const changes = SYNCED.filter((key) => wanted[key] && existing[key] !== wanted[key]);
    for (const key of changes) setField(existing.file, key, wanted[key]);
    if (changes.length) report.updated.push({ entry: existing.file, fields: changes });

    if (markFile === existing.file) {
      setField(existing.file, "vaultHash", noteHash);
      report.unchanged.push(existing.file);
    } else if (existing.vaultHash === noteHash) {
      report.unchanged.push(existing.file);
    } else {
      report.changed.push({ vault: name, entry: existing.file, reasons });
    }
    continue;
  }

  if (existing?.draft && existing.vaultHash === noteHash && SYNCED.every((key) => existing[key] === (wanted[key] || "TODO") || key === "tags")) {
    report.pending.push({ vault: name, draft: existing.file });
    continue;
  }

  const file = `_${slugify(wanted.title)}.md`;
  if (existing?.draft && existing.file !== file) unlinkSync(join(CONTENT, existing.file));

  const draft = [
    "---",
    `title: ${quote(wanted.title)}`,
    `by: ${quote(wanted.by || "TODO")}`,
    `url: ${quote(url)}`,
    `theme: ${quote(wanted.theme || "TODO")}`,
    `media: ${quote(wanted.media || "TODO")}`,
    `time: ${quote(wanted.time || "TODO")}`,
    `added: ${quote(wanted.added || "TODO")}`,
    `verdict: "TODO"`,
    `tags: ${quote(wanted.tags)}`,
    `vaultHash: ${quote(noteHash)}`,
    "---",
    "",
    "TODO: the rest of the why lines, pieced into sentences. Delete this line if the verdict uses them all.",
    "",
    "<!-- From the vault, for whoever writes the verdict and note.",
    `note: ${name}`,
    "why:",
    ...(reasons.length ? reasons.map((r) => `- ${r}`) : ["- (none given)"]),
    "-->",
    "",
  ].join("\n");

  writeFileSync(join(CONTENT, file), draft, "utf8");
  (existing ? report.refreshed : report.created).push({ vault: name, draft: file });
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const list = (label, items, show) => {
    if (!items.length) return;
    console.log(`\n${label} (${items.length})`);
    for (const item of items) console.log(`  · ${show(item)}`);
  };
  console.log(`Vault: ${vault}`);
  list("New drafts", report.created, (i) => `${i.draft}  ← ${i.vault}`);
  list("Drafts refreshed", report.refreshed, (i) => `${i.draft}  ← ${i.vault}`);
  list("Drafts still waiting for a verdict and note", report.pending, (i) => `${i.draft}  ← ${i.vault}`);
  list("Published entries updated to match the vault", report.updated, (i) => `${i.entry}: ${i.fields.join(", ")}`);
  list("Published, but the why lines changed, so the verdict and note need redoing", report.changed, (i) => `${i.entry}  ← ${i.vault}`);
  list("Left blank in the vault", report.blanks, (i) => `${i.vault}: ${i.missing.join(", ")}`);
  list("Holds more than one link, split into one note per link", report.split, (i) => i);
  list("Skipped, no title or url", report.skipped, (i) => i);
  if (!report.created.length && !report.refreshed.length && !report.pending.length && !report.changed.length && !report.updated.length) {
    console.log("\nNothing new in the vault.");
  }
}
