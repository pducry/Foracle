export type PairCollection = {
  id: string;
  title: string;
  description: string;
  pairs: { headingId: string; bodyId: string; note: string }[];
};

export const COLLECTIONS: PairCollection[] = [
  {
    id: "saas",
    title: "Best for SaaS",
    description: "Clean, professional pairings that build trust and improve readability for software products.",
    pairs: [
      { headingId: "inter", bodyId: "source-sans-3", note: "Geometric clarity meets humanist warmth — the modern SaaS default" },
      { headingId: "manrope", bodyId: "inter", note: "Rounded geometric heading with ultra-readable body text" },
      { headingId: "space-grotesk", bodyId: "dm-sans", note: "Technical personality with friendly readability" },
      { headingId: "outfit", bodyId: "nunito-sans", note: "Contemporary heading paired with a soft, approachable body" },
    ],
  },
  {
    id: "editorial",
    title: "Elegant Editorial",
    description: "Timeless serif and mixed pairings for magazines, long-form content, and luxury brands.",
    pairs: [
      { headingId: "playfair-display", bodyId: "lora", note: "High contrast display serif over transitional body — classic editorial" },
      { headingId: "cormorant-garamond", bodyId: "proza-libre", note: "Elegant French Renaissance heading with modern humanist body" },
      { headingId: "libre-baskerville", bodyId: "source-serif-4", note: "British typographic tradition meets contemporary serif" },
      { headingId: "dm-serif-display", bodyId: "crimson-text", note: "Bold serif display heading over scholarly body text" },
    ],
  },
  {
    id: "developer",
    title: "Developer Portfolios",
    description: "Technical moods with monospace accents for developer and engineering portfolios.",
    pairs: [
      { headingId: "jetbrains-mono", bodyId: "inter", note: "Developer-native heading with the web's most readable sans-serif" },
      { headingId: "space-grotesk", bodyId: "fira-code", note: "Geometric heading meets ligature-rich monospace for code-heavy sites" },
      { headingId: "sora", bodyId: "ibm-plex-mono", note: "Futuristic geometric heading with IBM's engineering monospace" },
      { headingId: "archivo", bodyId: "source-code-pro", note: "Grotesque precision heading with Adobe's coding typeface" },
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Pairings that balance visual appeal with conversion — designed for product pages and storefronts.",
    pairs: [
      { headingId: "dm-serif-display", bodyId: "nunito-sans", note: "Premium feel heading with friendly, scannable body text" },
      { headingId: "poppins", bodyId: "open-sans", note: "Modern geometric heading with the universal body typeface" },
      { headingId: "josefin-sans", bodyId: "lato", note: "Elegant thin heading with warm humanist body" },
      { headingId: "raleway", bodyId: "merriweather-sans", note: "Stylish display heading paired with screen-optimized body" },
    ],
  },
  {
    id: "creative",
    title: "Creative & Portfolio",
    description: "Expressive, personality-driven pairings for designers, artists, and creative agencies.",
    pairs: [
      { headingId: "abril-fatface", bodyId: "poppins", note: "Dramatic high-contrast display over clean geometric body" },
      { headingId: "righteous", bodyId: "open-sans", note: "Rounded retro heading with neutral modern body" },
      { headingId: "bebas-neue", bodyId: "montserrat", note: "Condensed uppercase heading meets versatile geometric body" },
      { headingId: "anton", bodyId: "work-sans", note: "Bold impact heading with friendly rounded body text" },
    ],
  },
];
