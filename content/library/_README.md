# The Library

One file per entry. The filename (minus `.md`) is the entry's id and shows up
in deep links, so keep it short, lowercase and hyphenated.

## Where entries come from

Every entry starts as a note in the Obsidian vault (id `990c09e10e7b4b0b`),
one note per link, copied from `Drafts/Template.md` and filed in the folder
for its theme:

```
Court's Product Resources/
  AI/
    Insight into Claude Code.md
  Career/
    Marty Cagan and Benedict Evans take on AI changing role of PMs.md
```

```
title: A Fresh Definition of The Product Role
by: Marty Cagan
url: https://www.svpg.com/a-fresh-definition-of-the-product-role/
theme: product-management, AI-evolution
format: Article
time: 10 minutes
added: 12 September 2026
why it's worth reading:
Reminder of the craft of product management still plays an important role.
People have other jobs.
```

The vault is taken at its word. `npm run library:sync` copies the title,
byline, url, format, time and date exactly as written, with the time put in
the site's style ("10 minutes" on an article shows as "10 min read"). The
folder sets the theme, and the note's own `theme:` line becomes search tags.
Nothing is looked up or recalculated.

For a new note it writes a draft here, named with a leading underscore and
ignored by git and the build. When a published note changes, it updates the
entry to match. It flags a note that holds more than one link, and any field
left blank.

The one thing it cannot write is the verdict and note, so a scheduled Claude
run does that every morning and opens a pull request. Merging it deploys.

## The entry format

```
---
title: "A Fresh Definition of The Product Role"
by: "Marty Cagan"
url: "https://www.svpg.com/a-fresh-definition-of-the-product-role/"
theme: "Career"
media: "Article"
time: "10 min read"
added: "2026-09-12"
verdict: "Reminder that the craft of product management still plays an important role, and what to continue to work on"
tags: "product-management, AI-evolution"
vaultHash: "d06f10364d51"
---

The rest of the why lines, pieced together. Empty if the verdict says it all.
```

`theme` must be one of: The Craft, Operating Model, Design, AI, Evals,
Growth, PMM, Career, Templates & Tools. `media` must be one of: Article,
Podcast, Video, Book, Guide, Template. Both lists live in
`src/data/resources.ts`, and a new theme needs a folder of the same name in
the vault.

`verdict` and the note come only from the "why it's worth reading" lines,
never from anyone else's opinion or a summary of the source. The verdict is
the lead line. The note is the rest, pieced together into sentences with only
the joining words and punctuation needed, and left empty when the verdict
already uses every line. A banned word in the notes is swapped for its
plainest equivalent.

`vaultHash` fingerprints the why lines. When they change, the sync lists the
entry so its verdict and note can be redone. Once they are,
`npm run library:sync -- --mark-current <entry.md>` records that.

Files starting with `_` are ignored by the build. `npm run library` compiles
the rest and refuses to build on a bad entry, naming the file: a missing
field, a url holding more than one link, a TODO left behind, a banned word,
an em dash, or a note past three sentences.
