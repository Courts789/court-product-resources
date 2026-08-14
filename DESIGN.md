# Field Press

The design system for Court's Product Resources.

A field guide, not a feed. Cream stock, near-black ink with a green bias,
pine green carrying every deliberate act, and six pastel stocks so each
theme reads as its own printed section.

Everything below is defined once in [`src/app/globals.css`](src/app/globals.css)
as Tailwind v4 theme tokens. Use the token, never the hex.

---

## Colour

### Stock and ink

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#EFECE1` | Page ground |
| `paper-sunk` | `#E5E1D2` | Recessed sections, alternating bands |
| `ink` | `#14180F` | Headlines, primary text, the masthead and footer fills |
| `ink-soft` | `#3B4033` | Body copy at length |
| `ink-muted` | `#5C6153` | Metadata, bylines, secondary labels |
| `rule` | `rgba(20,24,15,.16)` | Hairlines between rows |
| `rule-strong` | `rgba(20,24,15,.34)` | Hairlines that need to be seen |

### Primary

| Token | Value | Use |
| --- | --- | --- |
| `pine` | `#1D4A31` | Buttons, links, active states, the hero slab |
| `pine-deep` | `#143523` | Pressed state; pine set as text on a pine tint |

Pine carries every deliberate act on the page and nothing else. If
something is not an action or a primary surface, it is not pine.

### Section stocks and inks

One pair per theme. The stock is a card fill and always carries `ink` on
top; the ink is the same hue taken dark enough to set as type, on paper or
on its own stock. Mapped in [`src/lib/accents.ts`](src/lib/accents.ts).

| Theme | Stock | Ink |
| --- | --- | --- |
| Getting In | `sage` `#D3E0C9` | `pine` `#1D4A31` |
| The Craft | `butter` `#EEE0AB` | `olive` `#5E5417` |
| AI & Evals | `lilac` `#DDD6EA` | `plum` `#533268` |
| Growth | `blush` `#EED8CD` | `rust` `#8A4326` |
| Career | `sky` `#CFDDE6` | `slate` `#2C4A63` |
| Templates & Tools | `apricot` `#F0DCC0` | `ember` `#7E4A18` |

`butter` doubles as the standing highlight outside the theme system: the
Suggest button, the ticker band, the "New" badge, and type set on pine.

`alarm` `#9B2C2C` is the only failure colour. It is not decorative and
never appears outside form validation.

**The rule that keeps this coherent:** body copy is always `ink-soft`,
never a section ink. Section inks are for labels, rules, numerals and
counts only.

### Contrast

Every text and background pair in the system meets WCAG AA, verified
against all seven pages including the quiz result state. Adding a new
pairing means re-checking it: the section inks were chosen to sit right at
the edge of AA on their own stock, so a lighter stock breaks them.

There is no dark variant. The design commits to one light treatment the
way a printed guide does, and nothing should acquire a dark mode
piecemeal.

---

## Type

All web-safe. No font files, no network request, no swap flash. Removing
`next/font` was a deliberate part of this system, not an oversight.

| Token | Stack | Use |
| --- | --- | --- |
| `--font-condensed` | Helvetica Neue Condensed Bold → Arial Narrow → Roboto Condensed → Liberation Sans Narrow → Impact | Headlines, numerals, the wordmark, the ticker |
| `--font-sans` | `system-ui` → Segoe UI → Roboto → Helvetica | Body, ledes, labels, form fields |
| `--font-serif` | Georgia → Times | Quotation only |

Georgia appears in exactly one place: the pull quote on The Premise.
Quotation is set apart from the grotesque everything else is in, so it
reads as a voice rather than as more of the page. Do not spread it.

### Scale

| Token | Range |
| --- | --- |
| `--text-display` | `2.75rem → 5.25rem` — the home hero only |
| `--text-section` | `1.875rem → 3.25rem` — page titles, section statements |
| `--text-lede` | `1.0625rem → 1.25rem` — the paragraph under a title |

Condensed capitals set much larger than a normal-width face for the same
measure, so both display steps are lower than a wide grotesque would take.

### Headings

The base layer styles `h1`–`h3` directly, so a heading needs no classes:

- `h1`, `h2` — condensed, bold, **uppercase**
- `h3` — condensed, bold, sentence case

`h3` deliberately stays in sentence case. Sixty library titles in capitals
stop being scannable.

---

## Utilities

| Class | What it does |
| --- | --- |
| `eyebrow` | Tracked capitals for labels and metadata. Set in the UI face, not the condensed one: at 11px condensed capitals close up and stop being readable. |
| `headline` | The condensed uppercase voice for things that are not headings — the wordmark, the ticker, a monogram. |
| `numeral` | Condensed tabular figures, so index columns line up. |
| `rule-link` | Underline that draws in from the left on hover and focus. |
| `scroll-row` | A row that scrolls sideways on narrow screens with the bar hidden. |
| `ticker-track` | The running band. Holds still under `prefers-reduced-motion`. |

---

## Shape and motion

`--radius-card` (`14px`) is the one rounded thing, on cards and on pills.
Everything else is cut square. Buttons and chips are full `rounded-full`
capsules; rows and rules have no radius at all.

The ticker is the only ambient motion in the system. Everything else is a
300ms colour or transform response to hover and focus. Because the ticker
stops entirely under `prefers-reduced-motion`, its phrases have to read in
any order and none of them can be a call to action.

---

## Components

| File | Notes |
| --- | --- |
| [`site-header.tsx`](src/components/site-header.tsx) | Ink bar. Suggest is the only ask on the site, so it is the only button. |
| [`page-header.tsx`](src/components/page-header.tsx) | Every page opens with a stocked slab. Pass `stock` and `ink` as a matched pair from the table above. |
| [`ticker.tsx`](src/components/ticker.tsx) | The running band between sections. |
| [`plate.tsx`](src/components/plate.tsx) | Flat cut-paper SVG in the section stocks, in place of stock photography. |
| [`home-index.tsx`](src/components/home-index.tsx) | The one place the whole palette is seen at once. |

---

## Adding a theme

1. Add the stock and ink tokens to `@theme` in `globals.css`.
2. Add both to `themeStock` and `themeInk` in `src/lib/accents.ts`.
3. Check the new ink against both `paper` and its own stock at 4.5:1.

The type system, spacing and components need no changes: the library
derives its sections, filters and chips from the theme list.
