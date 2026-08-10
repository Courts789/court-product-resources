/**
 * Typo-tolerant search over a small, fixed corpus.
 *
 * This is fuzzy rather than semantic: it forgives misspellings and partial
 * words ("clare" finds Claire Vo, "evls" finds the evals writing) but it
 * does not understand meaning, so it will not connect "pricing" to an
 * article about monetisation unless the word appears in the text. True
 * semantic search needs embeddings and a vector index, which is a server
 * and a model for a collection this size. Fuzzy matching over weighted
 * fields gets the behaviour that actually matters here.
 */

/** Fold case, strip accents and punctuation so tokens compare cleanly. */
export function normalise(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Levenshtein distance, abandoned early once it exceeds `max`. Bailing out
 * keeps this cheap enough to run over every field on every keystroke.
 */
function editDistance(a: string, b: string, max: number): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    let rowBest = i;

    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost,
      );
      current.push(value);
      if (value < rowBest) rowBest = value;
    }

    if (rowBest > max) return max + 1;
    previous = current;
  }

  return previous[b.length];
}

/** How much misspelling to forgive, scaled to the length of the term. */
function tolerance(term: string): number {
  if (term.length <= 3) return 0;
  if (term.length <= 5) return 1;
  return 2;
}

/**
 * Score one search term against one field. Returns 0 for no match, with
 * stronger signals scoring higher so results can be ranked by relevance.
 */
function scoreTerm(term: string, field: string): number {
  if (!field) return 0;

  if (field.startsWith(term)) return 1;
  if (field.includes(term)) return 0.8;

  const max = tolerance(term);
  let best = 0;

  for (const token of field.split(" ")) {
    if (!token) continue;

    if (token.startsWith(term)) {
      best = Math.max(best, 0.95);
      continue;
    }

    if (max === 0) continue;

    const distance = editDistance(term, token, max);
    if (distance <= max) {
      // A closer match on a longer word is worth more than a loose one.
      best = Math.max(best, 0.75 - (distance - 1) * 0.15);
    }

    // Catch typos inside longer words, e.g. "newslettr" against a title.
    if (token.length > term.length && token.length - term.length <= 3) {
      const prefixDistance = editDistance(
        term,
        token.slice(0, term.length),
        max,
      );
      if (prefixDistance <= max) {
        best = Math.max(best, 0.6);
      }
    }
  }

  return best;
}

export type WeightedField = {
  value: string;
  weight: number;
};

/**
 * Score an item against a query. Every term must match something, so extra
 * words narrow the result rather than widening it. Returns 0 when the item
 * should be excluded.
 */
export function scoreItem(fields: WeightedField[], query: string): number {
  const terms = normalise(query).split(" ").filter(Boolean);
  if (terms.length === 0) return 1;

  const prepared = fields.map((field) => ({
    value: normalise(field.value),
    weight: field.weight,
  }));

  let total = 0;

  for (const term of terms) {
    let bestForTerm = 0;

    for (const field of prepared) {
      const score = scoreTerm(term, field.value) * field.weight;
      if (score > bestForTerm) bestForTerm = score;
    }

    // One unmatched term disqualifies the item entirely.
    if (bestForTerm === 0) return 0;
    total += bestForTerm;
  }

  return total;
}
