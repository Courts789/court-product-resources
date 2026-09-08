# The Library

One file per entry. The filename (minus `.md`) is the entry's id and shows up
in deep links, so keep it lowercase and hyphenated.

```
---
title: "Product vs. Feature Teams"
by: "Marty Cagan"
url: "https://www.svpg.com/product-vs-feature-teams/"
theme: "Getting In"
media: "Article"
time: "7 min read"
added: "2026-05-02"
verdict: "Start here"
---

What it is and what you get, in two sentences at most.
```

`verdict` is the call in a few words — "Worth it", "Start here", "Worth it for
one chapter" — and never "it depends" without saying what it depends on. The
note underneath describes the thing; the verdict is what you think of it.

`theme` must be one of: Getting In, The Craft, AI & Evals, Growth, Career,
Templates & Tools. `media` must be one of: Article, Podcast, Video, Book,
Guide, Template. Both lists are defined in `src/data/resources.ts` — add to
them there first if you need a new one.

Every entry is *one thing*: this episode, this essay, this chapter. Not a
show, not a newsletter, not a person's whole archive.

Files starting with `_` are ignored, so drafts can live here safely.

Run `npm run library` after editing to compile this folder into the site.
It refuses to build on a bad entry and tells you which file is wrong.
