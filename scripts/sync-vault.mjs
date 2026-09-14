/**
 * Brings the Obsidian vault up to date with the library, without guessing.
 *
 * Each note in the vault is one entry: loose `key: value` lines followed by
 * the reasons it is worth your time. This script does the part a machine
 * can do honestly. It checks the title, byline and runtime against the
 * source itself, and writes a draft for anything new. It leaves the theme,
 * the verdict and the note alone, because those are judgements, and says
 * clearly which entries still need one.
 *
 * Drafts start with an underscore, so the build ignores them until a person
 * (or a scheduled Claude run) has written those three things.
 *
 * Run it with `npm run library:sync`. Add `--json` for a machine-readable
 * report.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

/** The vault this site draws from, by Obsidian's own id for it. */
const VAULT_ID = "990c09e10e7b4b0b";
const CONTENT = "content/library";
const WORDS_PER_MINUTE = 230;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

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

const KEYS = ["title", "by", "url", "theme", "media", "time", "added"];
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
  return { fields, reasons };
}

/** Tracking parameters say who shared a link, not what it is. */
function cleanUrl(value) {
  try {
    const url = new URL(value.trim());
    for (const key of [...url.searchParams.keys()]) {
      if (/^(r|s|ref|source|triedRedirect|showWelcome|utm_.*|si|feature)$/i.test(key)) {
        url.searchParams.delete(key);
      }
    }
    return url.toString();
  } catch {
    return value.trim();
  }
}

const sameUrl = (a, b) => a.replace(/\/$/, "") === b.replace(/\/$/, "");

/** "1 September 2026" to 2026-09-01, in local time so the day never shifts. */
function isoDate(value) {
  const parsed = new Date(value);
  const date = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const MEDIA = {
  article: "Article", video: "Video", podcast: "Podcast",
  book: "Book", guide: "Guide", template: "Template",
};

const VERB = { Article: "read", Guide: "read", Book: "read", Template: "read", Video: "watch", Podcast: "listen" };

function costOf(minutes, media) {
  const verb = VERB[media] ?? "read";
  return minutes >= 120 ? `~${Math.round(minutes / 60)} hr ${verb}` : `${Math.max(1, minutes)} min ${verb}`;
}

/* ── Checking the source ─────────────────────────────────────────────────── */

async function getText(url) {
  const response = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "en" } });
  if (!response.ok) throw new Error(`${response.status} from ${url}`);
  return response.text();
}

function youtubeId(url) {
  const match = /(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([\w-]{11})/.exec(url);
  return match?.[1];
}

/**
 * What the source says about itself. YouTube's oEmbed gives the title and
 * channel, and the watch page carries the exact length. Substack, including
 * custom domains, answers /api/v1/posts/<slug> with the word count or the
 * episode length. Anything else returns nothing, and the vault's own values
 * stand, marked as unverified.
 */
async function verify(url) {
  const id = youtubeId(url);
  if (id) {
    const watch = `https://www.youtube.com/watch?v=${id}`;
    const oembed = JSON.parse(
      await getText(`https://www.youtube.com/oembed?url=${encodeURIComponent(watch)}&format=json`),
    );
    const page = await getText(watch);
    const seconds = Number(/"lengthSeconds":"(\d+)"/.exec(page)?.[1]);
    return {
      source: "YouTube",
      url: watch,
      title: oembed.title,
      by: oembed.author_name,
      media: "Video",
      minutes: seconds ? Math.round(seconds / 60) : undefined,
    };
  }

  const slug = /\/p\/([^/?#]+)/.exec(url)?.[1];
  if (slug) {
    const origin = new URL(url).origin;
    try {
      const post = JSON.parse(await getText(`${origin}/api/v1/posts/${slug}`));
      const podcast = post.type === "podcast" && post.podcast_duration;
      return {
        source: "Substack",
        url: post.canonical_url ?? url,
        title: post.title,
        by: post.publishedBylines?.[0]?.name,
        media: podcast ? "Podcast" : "Article",
        minutes: podcast
          ? Math.round(post.podcast_duration / 60)
          : post.wordcount
            ? Math.round(post.wordcount / WORDS_PER_MINUTE)
            : undefined,
      };
    } catch {
      return null;
    }
  }
  return null;
}

/* ── Comparing with the library ──────────────────────────────────────────── */

function readEntry(file) {
  const raw = readFileSync(join(CONTENT, file), "utf8");
  const get = (key) => new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, "m").exec(raw)?.[1];
  return { file, url: get("url"), vaultHash: get("vaultHash"), draft: file.startsWith("_") };
}

const slugify = (title) => {
  const base = title.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (base.length <= 60) return base;
  return base.slice(0, 61).replace(/-[^-]*$/, "");
};

const hash = (text) => createHash("sha1").update(text.replace(/\s+/g, " ").trim()).digest("hex").slice(0, 12);
const quote = (value) => `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

/* ── Run ─────────────────────────────────────────────────────────────────── */

const vault = vaultPath();
const entries = readdirSync(CONTENT)
  .filter((f) => f.endsWith(".md") && f !== "_README.md")
  .map(readEntry);

const report = { vault, created: [], refreshed: [], pending: [], changed: [], unchanged: [], skipped: [], mismatches: [], unverified: [] };

for (const name of readdirSync(vault).filter((f) => f.endsWith(".md")).sort()) {
  const raw = readFileSync(join(vault, name), "utf8");
  const { fields, reasons } = parseNote(raw);

  if (/^template\.md$/i.test(name) || !fields.url || !fields.title) {
    report.skipped.push(name);
    continue;
  }

  const url = cleanUrl(fields.url);
  const noteHash = hash(raw);
  const existing = entries.find((entry) => entry.url && sameUrl(entry.url, url));

  if (existing && !existing.draft) {
    if (existing.vaultHash === noteHash) report.unchanged.push(existing.file);
    else report.changed.push({ vault: name, entry: existing.file, reasons });
    continue;
  }

  if (existing?.draft && existing.vaultHash === noteHash) {
    report.pending.push({ vault: name, draft: existing.file });
    continue;
  }

  let checked = null;
  try {
    checked = await verify(url);
  } catch (error) {
    report.unverified.push({ vault: name, reason: error.message });
  }
  if (!checked) report.unverified.push({ vault: name, reason: "No source this script knows how to check." });

  const vaultMedia = MEDIA[(fields.media ?? "").toLowerCase()];
  const vaultMinutes = Number(/\d+/.exec(fields.time ?? "")?.[0]) || undefined;
  const media = checked?.media ?? vaultMedia ?? "TODO";
  const minutes = checked?.minutes ?? vaultMinutes;
  const title = checked?.title ?? fields.title;
  /*
   * A YouTube channel often hosts other people, so a byline written in the
   * vault beats the channel name. Substack bylines are the actual author.
   */
  const by = (checked?.source === "YouTube" ? fields.by || checked.by : checked?.by || fields.by) || "TODO";

  const differs = (label, ours, theirs) => {
    if (ours && theirs && String(ours).trim().toLowerCase() !== String(theirs).trim().toLowerCase()) {
      report.mismatches.push({ vault: name, field: label, vaultSays: ours, sourceSays: theirs });
    }
  };
  if (checked) {
    differs("title", fields.title.replace(/[’]/g, "'"), checked.title?.replace(/[’]/g, "'"));
    if (checked.source !== "YouTube") differs("by", fields.by, checked.by);
    differs("media", vaultMedia, checked.media);
    if (vaultMinutes && checked.minutes && Math.abs(vaultMinutes - checked.minutes) > 1) {
      differs("time", `${vaultMinutes} min`, `${checked.minutes} min`);
    }
  }

  const file = `_${slugify(title)}.md`;
  if (existing?.draft && existing.file !== file) unlinkSync(join(CONTENT, existing.file));

  const draft = [
    "---",
    `title: ${quote(title)}`,
    `by: ${quote(by)}`,
    `url: ${quote(checked?.url ?? url)}`,
    `theme: "TODO"`,
    `media: ${quote(media)}`,
    `time: ${quote(minutes ? costOf(minutes, media) : "TODO")}`,
    `added: ${quote(isoDate(fields.added))}`,
    `verdict: "TODO"`,
    `vaultHash: ${quote(noteHash)}`,
    "---",
    "",
    "TODO: what it is and what you get, in two sentences at most.",
    "",
    "<!-- From the vault, for whoever writes the verdict and note.",
    `note: ${name}`,
    `tags: ${fields.theme || "(none)"}`,
    "why:",
    ...(reasons.length ? reasons.map((r) => `- ${r}`) : ["- (none given)"]),
    "-->",
    "",
  ].join("\n");

  writeFileSync(join(CONTENT, file), draft, "utf8");
  (existing ? report.refreshed : report.created).push({ vault: name, draft: file, verifiedBy: checked?.source ?? null });
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
  list("New drafts", report.created, (i) => `${i.draft}  ← ${i.vault}${i.verifiedBy ? `, checked on ${i.verifiedBy}` : ""}`);
  list("Drafts refreshed", report.refreshed, (i) => `${i.draft}  ← ${i.vault}`);
  list("Drafts still waiting for a verdict and note", report.pending, (i) => `${i.draft}  ← ${i.vault}`);
  list("Published, but edited in the vault since", report.changed, (i) => `${i.entry}  ← ${i.vault}`);
  list("Source disagrees with the vault (source used)", report.mismatches, (i) => `${i.vault}: ${i.field} is "${i.vaultSays}" in the vault, "${i.sourceSays}" at the source`);
  list("Could not verify (vault values used)", report.unverified, (i) => `${i.vault}: ${i.reason}`);
  list("Skipped", report.skipped, (i) => i);
  if (!report.created.length && !report.refreshed.length && !report.changed.length) {
    console.log("\nNothing new in the vault.");
  }
}
