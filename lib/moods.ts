import { Category } from "./types";

export type Mood = "elegant" | "technical" | "playful" | "editorial";

export type MoodConfig = {
  id: Mood;
  label: string;
  description: string;
  headingCategories: Category[];
  bodyCategories: Category[];
  preferVariable: boolean;
  minWeights: number;
};

export const MOODS: MoodConfig[] = [
  {
    id: "elegant",
    label: "Elegant",
    description: "Refined serif pairings for luxury, fashion, and editorial brands",
    headingCategories: ["serif", "display"],
    bodyCategories: ["serif", "sans-serif"],
    preferVariable: true,
    minWeights: 4,
  },
  {
    id: "technical",
    label: "Technical",
    description: "Clean sans-serif and monospace combos for tech, SaaS, and developer tools",
    headingCategories: ["sans-serif"],
    bodyCategories: ["sans-serif", "monospace"],
    preferVariable: true,
    minWeights: 5,
  },
  {
    id: "playful",
    label: "Playful",
    description: "Expressive display and handwriting fonts for creative, kids, and lifestyle brands",
    headingCategories: ["display", "handwriting"],
    bodyCategories: ["sans-serif"],
    preferVariable: false,
    minWeights: 2,
  },
  {
    id: "editorial",
    label: "Editorial",
    description: "Classic serif headings with readable body text for magazines, blogs, and publications",
    headingCategories: ["serif"],
    bodyCategories: ["serif", "sans-serif"],
    preferVariable: true,
    minWeights: 4,
  },
];

export function getMoodById(id: Mood): MoodConfig {
  return MOODS.find((m) => m.id === id)!;
}
