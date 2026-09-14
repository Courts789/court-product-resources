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
never writes the theme, verdict or note, because those are judgements.

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
verdict: "Worth it if your work still lives in chat"
vaultHash: "9865bd6e7e10"
---

What it is and what you get, in two sentences at most.
```

`theme` must be one of: Getting In, The Craft, AI & Evals, Growth, Career,
Templates & Tools. `media` must be one of: Article, Podcast, Video, Book,
Guide, Template. Both lists live in `src/data/resources.ts`, so add to them
there first if you need a new one.

`verdict` is the call in a few words, such as "Worth it", "Start here" or
"Worth it for one chapter", and never "it depends" without saying on what.
The note describes the thing; the verdict is what I think of it.

`vaultHash` fingerprints the vault note the entry came from. When the note is
edited, the sync notices and lists the entry as changed.

Every entry is one thing: this episode, this essay, this chapter. Not a show,
not a newsletter, not a person's whole archive.

Files starting with `_` are ignored by the build. `npm run library` compiles
the rest and refuses to build on a bad entry, naming the file: a missing
field, a TODO left behind, a banned word, an em dash, or a note past three
sentences.
