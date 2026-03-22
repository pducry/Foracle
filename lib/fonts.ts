import fontsData from "@/data/fonts.json";
import { Font, Category } from "./types";

const fonts: Font[] = fontsData as Font[];

export function getAllFonts(): Font[] {
  return fonts;
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
