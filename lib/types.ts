export type VariableAxis = {
  tag: string;
  start: number;
  end: number;
};

export type Category =
  | "sans-serif"
  | "serif"
  | "display"
  | "handwriting"
  | "monospace";

export const CATEGORY_LABELS: Record<Category, string> = {
  "sans-serif": "Sans Serif",
  serif: "Serif",
  display: "Display",
  handwriting: "Script",
  monospace: "Monospace",
};

export const ALL_CATEGORIES: Category[] = [
  "sans-serif",
  "serif",
  "display",
  "handwriting",
  "monospace",
];

export type Font = {
  id: string;
  family: string;
  category: Category;
  variants: string[];
  subsets: string[];
  variable: boolean;
  axes: VariableAxis[];
  designers?: string;
  license?: string;
  lastModified: string;
  popularity: number;
  trending?: number;
  description?: string;
  numGlyphs?: number;
  source?: string;
};
