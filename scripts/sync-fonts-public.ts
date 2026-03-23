import { writeFileSync } from "fs";
import { join } from "path";

type FontMetadata = {
  family: string;
  displayName?: string;
  category: string;
  designers: string[];
  lastModified: string;
  popularity: number;
  trending: number;
  defaultSort: number;
  subsets: string[];
  axes: { tag: string; min: number; max: number }[];
  fonts: Record<string, { thickness: number | null; slant: number | null; width: number | null; lineHeight: number | null }>;
  colorCapabilities?: string[];
  isNoto?: boolean;
  description?: string;
  numGlyphs?: number;
  license?: string;
};

type MetadataResponse = {
  axisRegistry: unknown[];
  familyMetadataList: FontMetadata[];
};

async function main() {
  console.log("Fetching fonts from Google Fonts public metadata...");

  const res = await fetch("https://fonts.google.com/metadata/fonts");
  if (!res.ok) {
    console.error(`Error: ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const text = await res.text();
  // The response starts with ")]}'" which needs to be stripped
  const jsonText = text.replace(/^\)\]\}'\n/, "");
  const data: MetadataResponse = JSON.parse(jsonText);

  console.log(`Fetched ${data.familyMetadataList.length} fonts`);

  const categoryMap: Record<string, string> = {
    "Sans Serif": "sans-serif",
    "Serif": "serif",
    "Display": "display",
    "Handwriting": "handwriting",
    "Monospace": "monospace",
  };

  const fonts = data.familyMetadataList
    .filter((item) => item.category in categoryMap)
    .map((item) => {
      const category = categoryMap[item.category];
      const id = item.family
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      // Extract variants from the fonts record
      const fontKeys = Object.keys(item.fonts);
      const variants = fontKeys.map((k) => {
        // Keys are like "100", "200", "300i", "400", "700i", etc.
        return k;
      });

      const hasAxes = item.axes && item.axes.length > 0;
      const axes = (item.axes || []).map((a) => ({
        tag: a.tag,
        start: a.min,
        end: a.max,
      }));

      return {
        id,
        family: item.family,
        category,
        variants,
        subsets: item.subsets,
        variable: hasAxes,
        axes,
        designers: item.designers?.join(", "),
        license: item.license,
        lastModified: item.lastModified,
        popularity: item.popularity,
        trending: item.trending,
        description: item.description,
        numGlyphs: item.numGlyphs,
      };
    })
    .sort((a, b) => a.popularity - b.popularity);

  const outPath = join(process.cwd(), "data", "fonts.json");
  writeFileSync(outPath, JSON.stringify(fonts, null, 2));
  console.log(`Wrote ${fonts.length} fonts to ${outPath}`);

  // Stats
  const categories: Record<string, number> = {};
  for (const f of fonts) {
    categories[f.category] = (categories[f.category] || 0) + 1;
  }
  console.log("\nBy category:");
  for (const [cat, count] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`);
  }
  console.log(`\nVariable fonts: ${fonts.filter((f) => f.variable).length}`);
}

main();
