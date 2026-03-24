import fontsData from "@/data/fonts.json";
import { Font, Category } from "./types";

const fonts: Font[] = fontsData as Font[];

// Interleave categories so the grid shows variety
function interleaveByCategory(list: Font[]): Font[] {
  const buckets: Record<string, Font[]> = {};
  for (const f of list) {
    (buckets[f.category] ??= []).push(f);
  }
  const categories = Object.keys(buckets);
  const result: Font[] = [];
  let added = true;
  while (added) {
    added = false;
    for (const cat of categories) {
      const font = buckets[cat].shift();
      if (font) {
        result.push(font);
        added = true;
      }
    }
  }
  return result;
}

const interleaved: Font[] = interleaveByCategory(fonts);

export function getAllFonts(): Font[] {
  return interleaved;
}

export function getFontById(id: string): Font | undefined {
  return fonts.find((f) => f.id === id);
}

export function getFontsByCategory(category: Category): Font[] {
  return fonts.filter((f) => f.category === category);
}

export function searchFonts(query: string): Font[] {
  const lower = query.toLowerCase();
  return fonts.filter((f) => f.family.toLowerCase().includes(lower));
}

export function getFontCount(): number {
  return fonts.length;
}
