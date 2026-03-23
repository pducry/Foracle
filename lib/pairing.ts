// lib/pairing.ts
import { Font, Category } from "./types";

export type PairRole = "Heading" | "Body" | "Code";

export type PairSuggestion = {
  font: Font;
  score: number;
  role: PairRole;
};

const CONTRAST_PAIRS: [Category, Category][] = [
  ["serif", "sans-serif"],
  ["sans-serif", "serif"],
  ["display", "monospace"],
  ["monospace", "display"],
  ["handwriting", "sans-serif"],
  ["sans-serif", "handwriting"],
];

function hasContrast(a: Category, b: Category): boolean {
  return CONTRAST_PAIRS.some(([x, y]) => x === a && y === b);
}

function scoreCandidate(primary: Font, candidate: Font): number {
  if (primary.id === candidate.id) return -1;

  let score = 0;

  // Category contrast (+3)
  if (hasContrast(primary.category, candidate.category)) {
    score += 3;
  }

  // Same category, different family (+1)
  if (primary.category === candidate.category) {
    score += 1;
  }

  // Weight complement (+2): if primary has few weights, prefer wide range
  const primaryWeightCount = primary.variants.filter(
    (v) => !v.includes("i")
  ).length;
  const candidateWeightCount = candidate.variants.filter(
    (v) => !v.includes("i")
  ).length;
  if (primaryWeightCount <= 3 && candidateWeightCount >= 5) {
    score += 2;
  } else if (candidateWeightCount >= 4) {
    score += 1;
  }

  // Subset compatibility (+1)
  const primarySubsets = new Set(primary.subsets);
  const sharedSubsets = candidate.subsets.filter((s) => primarySubsets.has(s));
  if (sharedSubsets.length >= Math.min(primary.subsets.length, 3)) {
    score += 1;
  }

  // Popularity boost (+1): top 200 fonts
  if (candidate.popularity <= 200) {
    score += 1;
  }

  return score;
}

const HEADING_CATEGORIES: Category[] = ["display", "handwriting"];
const BODY_CATEGORIES: Category[] = ["sans-serif", "serif"];

function assignRole(primary: Font, candidate: Font): PairRole {
  if (candidate.category === "monospace") return "Code";

  const primaryIsHeading = HEADING_CATEGORIES.includes(primary.category);

  if (primaryIsHeading) {
    if (BODY_CATEGORIES.includes(candidate.category)) return "Body";
    return "Body";
  }

  if (HEADING_CATEGORIES.includes(candidate.category)) return "Heading";
  if (candidate.category === "serif" && primary.category === "sans-serif")
    return "Heading";
  if (candidate.category === "sans-serif" && primary.category === "serif")
    return "Body";

  return "Body";
}

export function getPairSuggestions(
  primary: Font,
  allFonts: Font[],
  limit = 6
): PairSuggestion[] {
  return allFonts
    .map((candidate) => ({
      font: candidate,
      score: scoreCandidate(primary, candidate),
      role: assignRole(primary, candidate),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.font.popularity - b.font.popularity;
    })
    .slice(0, limit);
}
