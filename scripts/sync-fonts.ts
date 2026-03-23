import { writeFileSync } from "fs";
import { join } from "path";

type GoogleFont = {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
  lastModified: string;
  files: Record<string, string>;
};

type GoogleFontsResponse = {
  items: GoogleFont[];
};

async function main() {
  const apiKey = process.env.GOOGLE_FONTS_API_KEY;
  if (!apiKey) {
    console.error("Error: GOOGLE_FONTS_API_KEY env var is required");
    console.error("Set it in .env.local or pass it directly:");
    console.error("  GOOGLE_FONTS_API_KEY=xxx npx tsx scripts/sync-fonts.ts");
    process.exit(1);
  }

  console.log("Fetching fonts from Google Fonts API...");

  const url = `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&capability=VF&key=${apiKey}`;
  const res = await fetch(url);

  if (!res.ok) {
    console.error(`API error: ${res.status} ${res.statusText}`);
    const body = await res.text();
    console.error(body);
    process.exit(1);
  }

  const data: GoogleFontsResponse = await res.json();
  console.log(`Fetched ${data.items.length} fonts`);

  const fonts = data.items.map((item, index) => {
    const id = item.family
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const variable = Object.keys(item.files).some((k) => /\[.*\]/.test(k))
      || item.variants.length >= 6;

    const axes: { tag: string; start: number; end: number }[] = [];
    if (variable) {
      const weights = item.variants
        .map((v: string) => parseInt(v.replace(/\D/g, "") || "400", 10))
        .filter((w: number) => !isNaN(w) && w >= 100 && w <= 900);
      if (weights.length > 1) {
        axes.push({
          tag: "wght",
          start: Math.min(...weights),
          end: Math.max(...weights),
        });
      }
    }

    return {
      id,
      family: item.family,
      category: item.category,
      variants: item.variants,
      subsets: item.subsets,
      variable,
      axes,
      lastModified: item.lastModified,
      popularity: index + 1,
    };
  });

  const outPath = join(process.cwd(), "data", "fonts.json");
  writeFileSync(outPath, JSON.stringify(fonts, null, 2));
  console.log(`Wrote ${fonts.length} fonts to ${outPath}`);
}

main();
