export type CuratedTier = "essential" | "rising" | "classic";

export type CuratedFont = {
  id: string;
  tier: CuratedTier;
  badge: string;
  reason: string;
};

export type CuratedCategory = {
  id: string;
  title: string;
  description: string;
  fonts: CuratedFont[];
};

export const CURATED: CuratedCategory[] = [
  {
    id: "sans-serif",
    title: "Sans Serif",
    description: "For UI, web, and branding",
    fonts: [
      { id: "inter", tier: "essential", badge: "Industry Standard", reason: "The definitive screen font. Used by Linear, Vercel, GitHub. 15K+ GitHub stars." },
      { id: "geist", tier: "rising", badge: "Rising Star", reason: "Vercel's modern sans. Purpose-built for developer tools and tech products." },
      { id: "source-sans-3", tier: "essential", badge: "Adobe Quality", reason: "Adobe's open-source masterpiece. Rivals commercial typefaces in refinement." },
      { id: "ibm-plex-sans", tier: "essential", badge: "Superfamily", reason: "IBM's corporate open-source family. 9K+ stars. Sans, Serif, Mono all available." },
      { id: "dm-sans", tier: "essential", badge: "Versatile", reason: "Geometric with personality. Warmer than Inter, great for branding." },
      { id: "plus-jakarta-sans", tier: "rising", badge: "Rising Star", reason: "The new Poppins — more refined. Surging adoption in 2024-2025." },
      { id: "outfit", tier: "rising", badge: "Underrated", reason: "Modern geometric. Clean, contemporary, works for headings and body." },
      { id: "space-grotesk", tier: "essential", badge: "Personality", reason: "Retro-futuristic tech font. Distinctive single-story 'a'. Design community favorite." },
      { id: "manrope", tier: "classic", badge: "Friendly", reason: "Rounded geometric. Professional yet approachable. Great for SaaS." },
      { id: "sora", tier: "rising", badge: "Futuristic", reason: "Geometric, futuristic. Impactful headings for tech and innovation brands." },
    ],
  },
  {
    id: "serif",
    title: "Serif",
    description: "For editorial, luxury, and long-form reading",
    fonts: [
      { id: "source-serif-4", tier: "essential", badge: "Best Free Serif", reason: "Community consensus: 'the best free serif, period.' Adobe's open-source serif." },
      { id: "literata", tier: "essential", badge: "Screen Optimized", reason: "Designed for Google Play Books. The best serif for on-screen reading." },
      { id: "lora", tier: "essential", badge: "Classic", reason: "Top 20 Google Fonts. Contemporary serif with calligraphic roots. Enduring favorite." },
      { id: "fraunces", tier: "rising", badge: "Innovative", reason: "Variable axes include a unique WONK axis. Insanely expressive for a free font." },
      { id: "instrument-serif", tier: "rising", badge: "Beautiful Italic", reason: "'One of the most beautiful free italics' — Reddit. Rapidly growing adoption." },
      { id: "playfair-display", tier: "classic", badge: "Iconic", reason: "High-contrast elegance. The most popular free display serif. Luxury standard." },
      { id: "cormorant-garamond", tier: "classic", badge: "Elegant", reason: "'Best free Garamond.' French Renaissance heading with dramatic proportions." },
      { id: "newsreader", tier: "rising", badge: "Professional", reason: "Optical size axis. Dutch Renaissance roots. Commercially competitive quality." },
      { id: "crimson-pro", tier: "classic", badge: "Literary", reason: "Old-style serif with warm, bookish character. Updated with variable support." },
    ],
  },
  {
    id: "display",
    title: "Display",
    description: "Headlines and personality",
    fonts: [
      { id: "space-grotesk", tier: "essential", badge: "Tech Favorite", reason: "Surging 2024-2025 adoption. Retro-futuristic feel. Framer/Webflow staple." },
      { id: "syne", tier: "rising", badge: "Expressive", reason: "'Weird enough to be interesting, clean enough to be usable.' Art/culture favorite." },
      { id: "bricolage-grotesque", tier: "rising", badge: "Variable Magic", reason: "Ink traps, optical sizing. Variable axes create dramatic visual interest." },
      { id: "bebas-neue", tier: "classic", badge: "Impact", reason: "All-caps condensed icon. Cinema, posters, media. Ubiquitous for a reason." },
      { id: "epilogue", tier: "rising", badge: "Versatile", reason: "Wide weight and width range. Display to body in one font. Underrated." },
      { id: "dm-sans", tier: "essential", badge: "Double Duty", reason: "Geometric sans that works beautifully at display sizes. Optical size axis." },
    ],
  },
  {
    id: "monospace",
    title: "Monospace",
    description: "For code and technical use",
    fonts: [
      { id: "jetbrains-mono", tier: "essential", badge: "Developer's Choice", reason: "138 ligatures. Taller x-height. 12K+ stars. Dominant across dev communities." },
      { id: "fira-code", tier: "essential", badge: "Most Starred", reason: "77K+ GitHub stars — the most starred font repo on GitHub. Pioneer of ligatures." },
      { id: "cascadia-code", tier: "essential", badge: "Microsoft", reason: "Built for Windows Terminal & VS Code. Powerline glyphs included. 8.5K+ stars." },
      { id: "ibm-plex-mono", tier: "essential", badge: "Superfamily", reason: "Pairs with Plex Sans/Serif. Humanist warmth rare in monospace fonts." },
      { id: "geist-mono", tier: "rising", badge: "Modern", reason: "Vercel's monospace. Clean, purpose-built for code in web projects." },
      { id: "recursive", tier: "rising", badge: "5 Axes", reason: "Sans to casual, proportional to mono — all in one file. Innovative." },
    ],
  },
  {
    id: "handwriting",
    title: "Handwriting",
    description: "For creative and casual use",
    fonts: [
      { id: "caveat", tier: "essential", badge: "Most Readable", reason: "Natural handwriting that's actually legible. Variable. Community's top pick." },
      { id: "dancing-script", tier: "classic", badge: "Popular", reason: "Top 30 Google Fonts. Bouncing baseline, lively energy. Versatile script." },
      { id: "pacifico", tier: "classic", badge: "Iconic", reason: "Brush script icon. Retro-surf vibe. Instantly recognizable." },
      { id: "permanent-marker", tier: "classic", badge: "Bold", reason: "Authentic Sharpie feel. Maximum casual energy. Great for thumbnails." },
      { id: "architects-daughter", tier: "classic", badge: "Technical", reason: "Architect's hand lettering. Structured yet personal. Wireframe favorite." },
      { id: "kalam", tier: "classic", badge: "Authentic", reason: "Devanagari-inspired warmth. Looks like real handwriting, not a font." },
    ],
  },
];

// Flat list of all curated font IDs for quick lookup
export const CURATED_IDS = new Set(
  CURATED.flatMap((cat) => cat.fonts.map((f) => f.id))
);

export function getCuratedInfo(fontId: string): CuratedFont | undefined {
  for (const cat of CURATED) {
    const found = cat.fonts.find((f) => f.id === fontId);
    if (found) return found;
  }
  return undefined;
}
