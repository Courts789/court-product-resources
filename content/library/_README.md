# The Library

One file per entry. The filename (minus `.md`) is the entry's id and shows up
in deep links, so keep it short, lowercase and hyphenated.

## Where entries come from

Entries start life as notes in the Obsidian vault (id `990c09e10e7b4b0b`),
one note per thing, copied from its `Template.md`:

```
title: Stop Using Claude Chat. Get Into the Terminal.
by: Veronika Wax
url: https://veronikawax.substack.com/p/stop-using-claude-chat-get-into-the
theme: GTM, AI-productivity
media: Article
time: 5 minutes
added: 14 September 2026
why it's worth reading:
In a chat you get an answer. In a repo you get an asset.
Step by step instructions and simple break down.
```

`npm run library:sync` reads the vault and, for anything new, writes a draft
here named with a leading underscore. It checks the title, byline and runtime
against the source (YouTube and Substack so far) and uses the source when the
two disagree, listing every disagreement so nothing changes silently. It
never writes the theme, verdict or note: the theme is a judgement, and the
other two are my own words, pieced together by hand.

A scheduled Claude run does that part every morning and opens a pull request.
Merging it deploys.

## The entry format

```
---
title: "Stop Using Claude Chat. Get Into the Terminal."
by: "Veronika Wax"
url: "https://veronikawax.substack.com/p/stop-using-claude-chat-get-into-the"
theme: "Templates & Tools"
media: "Article"
time: "8 min read"
added: "2026-09-14"
verdict: "In a chat you get an answer. In a repo you get an asset."
vaultHash: "9865bd6e7e10"
---

The rest of the why lines, pieced together. Empty if the verdict says it all.
```

`theme` must be one of: The Craft, Operating Model, Design, AI, Evals,
Growth, PMM, Career, Templates & Tools. `media` must be one of: Article, Podcast, Video, Book,
Guide, Template. Both lists live in `src/data/resources.ts`, so add to them
there first if you need a new one.

`verdict` and the note come only from the "why it's worth reading" lines in
the vault note, never from anyone else's opinion or a summary of the source.
The verdict is the lead line. The note is the rest, pieced together into
sentences with only the joining words and punctuation needed, and it is left
empty when the verdict already uses every line. A banned word in the notes is
swapped for its plainest equivalent.

`vaultHash` fingerprints the vault note the entry came from. When the note is
edited, the sync notices and lists the entry as changed.

Every entry is one thing: this episode, this essay, this chapter. Not a show,
not a newsletter, not a person's whole archive.

Files starting with `_` are ignored by the build. `npm run library` compiles
the rest and refuses to build on a bad entry, naming the file: a missing
field, a TODO left behind, a banned word, an em dash, or a note past three
sentences.
