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
    id: "technical",
    label: "Technical",
    description: "Sans-serif and monospace only. For dashboards, SaaS, CRM, and developer tools — serifs have no place in data-dense interfaces.",
    headingCategories: ["sans-serif"],
    bodyCategories: ["sans-serif", "monospace"],
    preferVariable: true,
    minWeights: 5,
  },
  {
    id: "editorial",
    label: "Editorial",
    description: "Serif headings with serif or sans-serif body. For blogs, magazines, and long-form reading where typographic rhythm matters.",
    headingCategories: ["serif"],
    bodyCategories: ["serif", "sans-serif"],
    preferVariable: true,
    minWeights: 4,
  },
  {
    id: "elegant",
    label: "Elegant",
    description: "Refined serif and display pairings for luxury, fashion, and editorial brands. Where personality meets sophistication.",
    headingCategories: ["serif", "display"],
    bodyCategories: ["serif", "sans-serif"],
    preferVariable: true,
    minWeights: 4,
  },
  {
    id: "playful",
    label: "Playful",
    description: "Display and handwriting headings with sans-serif body. For creative, kids, and lifestyle brands that need energy.",
    headingCategories: ["display", "handwriting"],
    bodyCategories: ["sans-serif"],
    preferVariable: false,
    minWeights: 2,
  },
];

export function getMoodById(id: Mood): MoodConfig {
  return MOODS.find((m) => m.id === id)!;
}
