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
      { id: "inter", tier: "essential", badge: "#1 UI Font", reason: "68% of designers use it regularly. Typewolf #1. Used by Linear, Vercel, GitHub. The definitive screen font." },
      { id: "dm-sans", tier: "essential", badge: "Typewolf #2", reason: "41% designer adoption. Geometric with warmth. 'What Poppins should have been.' 8B weekly page views." },
      { id: "space-grotesk", tier: "essential", badge: "Typewolf #3", reason: "29% designer adoption. Retro-futuristic, distinctive single-story 'a'. Tech/startup staple." },
      { id: "plus-jakarta-sans", tier: "essential", badge: "Typewolf #4", reason: "34% adoption. 'The new Poppins — more refined.' Fastest growing geometric sans on Google Fonts." },
      { id: "instrument-sans", tier: "rising", badge: "Typewolf #5", reason: "Top voted in 91-upvote Reddit thread. 'Distinctive without being quirky.' Beautiful Serif companion." },
      { id: "outfit", tier: "rising", badge: "Typewolf #6", reason: "17% adoption. 'Geometric sans done right.' Superior replacement for Poppins/Montserrat." },
      { id: "sora", tier: "rising", badge: "Typewolf #7", reason: "Clean geometric, futuristic. Impactful for tech and innovation brands." },
      { id: "figtree", tier: "rising", badge: "Typewolf #10", reason: "'A friendlier Inter.' Warm, readable. Designed by Erik Kennedy from practical UI experience." },
      { id: "source-sans-3", tier: "essential", badge: "Adobe Quality", reason: "Adobe's open-source masterpiece. Rivals commercial typefaces. Institutional standard." },
      { id: "ibm-plex-sans", tier: "essential", badge: "Best System", reason: "'Most complete free font family, period.' 9K+ stars. Sans, Serif, Mono, Condensed." },
      { id: "geist", tier: "rising", badge: "Vercel", reason: "198 HN points at launch. Purpose-built for developer tools. Ships with Next.js." },
      { id: "satoshi", tier: "essential", badge: "Fontshare #1", reason: "27% adoption. 'Feels like a $200 font.' Replaced Proxima Nova for many designers. Community darling." },
      { id: "general-sans", tier: "rising", badge: "Fontshare Gem", reason: "'My go-to replacement for Neue Haas Grotesk.' Criminally underrated per 86-upvote Reddit thread." },
      { id: "manrope", tier: "classic", badge: "Friendly", reason: "Rounded geometric. Professional yet approachable. Reliable for SaaS products." },
    ],
  },
  {
    id: "serif",
    title: "Serif",
    description: "For editorial, luxury, and long-form reading",
    fonts: [
      { id: "source-serif-4", tier: "essential", badge: "Best Free Serif", reason: "Only serif in Typewolf Top 10. 22% adoption. Community consensus: 'the best free serif, period.'" },
      { id: "instrument-serif", tier: "rising", badge: "Beautiful Italic", reason: "Reddit: 'one of the most beautiful free italics.' Compared to premium Tiempos. Rapidly growing." },
      { id: "fraunces", tier: "rising", badge: "Most Innovative", reason: "267-point HN consensus pick. Variable WONK axis. 'Best display serif on Google Fonts.'" },
      { id: "literata", tier: "essential", badge: "Screen Optimized", reason: "Designed for Google Play Books. The best serif for on-screen reading. Optical size axis." },
      { id: "lora", tier: "classic", badge: "Top 20 GF", reason: "Enduring favorite. Contemporary serif with calligraphic roots. Excellent for blogs." },
      { id: "playfair-display", tier: "classic", badge: "Iconic", reason: "Most popular free display serif. High-contrast elegance. The luxury standard." },
      { id: "cormorant-garamond", tier: "classic", badge: "Best Garamond", reason: "'Best free Garamond.' French Renaissance heading with dramatic proportions." },
      { id: "newsreader", tier: "rising", badge: "Professional", reason: "Dutch Renaissance roots. Optical size axis. Commercially competitive quality." },
      { id: "crimson-pro", tier: "classic", badge: "Literary", reason: "Old-style serif with warm, bookish character. Updated with variable support." },
      { id: "bitter", tier: "classic", badge: "Screen Pioneer", reason: "One of the first fonts designed specifically for comfortable screen reading." },
    ],
  },
  {
    id: "display",
    title: "Display",
    description: "Headlines and personality",
    fonts: [
      { id: "bricolage-grotesque", tier: "essential", badge: "Breakout Hit", reason: "167 HN points. 16% adoption. 'What Poppins wishes it was.' The display font of 2024-2025." },
      { id: "syne", tier: "rising", badge: "Expressive", reason: "'Weird enough to be interesting, clean enough to be usable.' Art/culture/music favorite." },
      { id: "space-grotesk", tier: "essential", badge: "Tech Favorite", reason: "Surging adoption. Retro-futuristic feel. Framer/Webflow staple." },
      { id: "cabinet-grotesk", tier: "essential", badge: "Fontshare Hit", reason: "Compared to GT Walsheim. Premium-feeling grotesque. Ink traps at joints." },
      { id: "clash-display", tier: "rising", badge: "Fontshare Bold", reason: "Striking geometric display. Hero sections, poster design, bold branding." },
      { id: "bebas-neue", tier: "classic", badge: "Impact Icon", reason: "All-caps condensed. Cinema, posters, media. Ubiquitous for a reason." },
      { id: "epilogue", tier: "rising", badge: "Versatile", reason: "Wide weight and width range. Display to body in one font. Underrated gem." },
      { id: "dm-sans", tier: "essential", badge: "Double Duty", reason: "Geometric sans that works beautifully at display sizes. Optical size axis." },
    ],
  },
  {
    id: "monospace",
    title: "Monospace",
    description: "For code and technical use",
    fonts: [
      { id: "jetbrains-mono", tier: "essential", badge: "#1 Code Font", reason: "Mentioned ~20x in 72-comment Reddit thread. 138 ligatures. 12K+ stars. Dominant." },
      { id: "fira-code", tier: "essential", badge: "77K+ Stars", reason: "Most starred font repo on all of GitHub. Pioneered programming ligatures." },
      { id: "cascadia-code", tier: "essential", badge: "Microsoft", reason: "Built for Windows Terminal & VS Code. Powerline glyphs included. 8.5K+ stars." },
      { id: "ibm-plex-mono", tier: "essential", badge: "Best System", reason: "Pairs with Plex Sans/Serif. Humanist warmth rare in monospace. Professional." },
      { id: "geist-mono", tier: "rising", badge: "Modern", reason: "Vercel's monospace. Universal praise (even from Geist Sans skeptics). Clean, modern." },
      { id: "recursive", tier: "rising", badge: "5 Axes", reason: "Sans to casual, proportional to mono — all in one file. Most innovative free mono." },
      { id: "monaspace", tier: "rising", badge: "GitHub", reason: "14K+ stars. 5 variants with 'texture healing.' Argon, Krypton, Neon, Radon, Xenon." },
      { id: "iosevka", tier: "essential", badge: "19K+ Stars", reason: "Most customizable monospace ever. 500+ variants. Cult following on r/unixporn." },
      { id: "commit-mono", tier: "rising", badge: "Smart Kerning", reason: "Anti-ligature philosophy. Neutral, focused. Growing JetBrains Mono alternative." },
      { id: "hack", tier: "classic", badge: "16K+ Stars", reason: "Bitstream Vera heritage. Proven, reliable. Focus on character disambiguation." },
    ],
  },
  {
    id: "handwriting",
    title: "Handwriting",
    description: "For creative and casual use",
    fonts: [
      { id: "caveat", tier: "essential", badge: "Most Readable", reason: "Natural handwriting that's actually legible. Variable. Community's top pick." },
      { id: "dancing-script", tier: "classic", badge: "Top 30 GF", reason: "Bouncing baseline, lively energy. One of the most popular free scripts globally." },
      { id: "pacifico", tier: "classic", badge: "Iconic", reason: "Brush script icon. Retro-surf vibe. Instantly recognizable worldwide." },
      { id: "permanent-marker", tier: "classic", badge: "Bold", reason: "Authentic Sharpie feel. Maximum casual energy. Great for thumbnails and posters." },
      { id: "architects-daughter", tier: "classic", badge: "Technical", reason: "Architect's hand lettering. Structured yet personal. Wireframe favorite." },
      { id: "kalam", tier: "classic", badge: "Authentic", reason: "Devanagari-inspired warmth. Looks like real handwriting, not a font." },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    description: "Designed for maximum legibility",
    fonts: [
      { id: "atkinson-hyperlegible-next", tier: "essential", badge: "234 HN Points", reason: "Braille Institute font. 'If your site needs to be accessible, this should be your default.'" },
      { id: "lexend", tier: "rising", badge: "Reading Fluency", reason: "Research-backed: improves reading speed and proficiency. Variable width axes." },
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
