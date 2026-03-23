export type PairCollection = {
  id: string;
  title: string;
  description: string;
  context: string;
  pairs: { headingId: string; bodyId: string; note: string }[];
};

export const COLLECTIONS: PairCollection[] = [
  {
    id: "dashboard",
    title: "Dashboard & SaaS",
    description: "Sans-serif only. Dashboards demand clarity, scanability, and neutral tone. Serifs add noise to data-dense interfaces.",
    context: "KPIs, tables, charts, navigation, status labels — every element competes for attention. Use geometric or grotesque sans-serifs with strong x-height and clear number sets.",
    pairs: [
      { headingId: "inter", bodyId: "source-sans-3", note: "The industry default. Inter's tabular figures and optical sizing are built for dashboards." },
      { headingId: "geist", bodyId: "inter", note: "Vercel's font for headings, Inter for data. Modern tech stack aesthetic." },
      { headingId: "space-grotesk", bodyId: "dm-sans", note: "Technical personality in headings, friendly clarity in body. Great for developer-facing SaaS." },
      { headingId: "outfit", bodyId: "figtree", note: "Geometric precision meets warm readability. Clean without being cold." },
      { headingId: "plus-jakarta-sans", bodyId: "ibm-plex-sans", note: "Contemporary headings with IBM's engineered body text. Enterprise-grade." },
    ],
  },
  {
    id: "crm",
    title: "CRM & Enterprise",
    description: "Strictly sans-serif. CRM interfaces are information-dense — tables, pipelines, contact cards. Legibility at small sizes is non-negotiable.",
    context: "Users scan hundreds of records daily. The font must disappear — never distract from the data. Prioritize x-height, clear number rendering, and weight range for hierarchy.",
    pairs: [
      { headingId: "ibm-plex-sans", bodyId: "inter", note: "IBM's corporate clarity meets the web standard. Built for enterprise scale." },
      { headingId: "inter", bodyId: "dm-sans", note: "Inter for structure, DM Sans for labels and descriptions. Subtle warmth in a professional context." },
      { headingId: "manrope", bodyId: "source-sans-3", note: "Rounded geometry softens dense data. Adobe's body text handles long contact lists." },
      { headingId: "figtree", bodyId: "inter", note: "Friendly headings over Inter's systematic body. Approachable CRM for small teams." },
      { headingId: "sora", bodyId: "plus-jakarta-sans", note: "Forward-looking headings with modern body. For next-gen CRM products." },
    ],
  },
  {
    id: "blog",
    title: "Blog & Editorial",
    description: "Serifs shine here. Long-form reading benefits from the rhythm and flow that serifs provide. Mix serif headings with sans-serif body, or go full serif.",
    context: "Reading comfort over 1000+ words is the priority. Serif headings create editorial authority, while body text needs generous x-height and open counters.",
    pairs: [
      { headingId: "playfair-display", bodyId: "source-serif-4", note: "High-contrast display meets Adobe's best body serif. Classic editorial hierarchy." },
      { headingId: "instrument-serif", bodyId: "inter", note: "Beautiful editorial heading over the web's most readable sans. Modern blog standard." },
      { headingId: "fraunces", bodyId: "literata", note: "Expressive variable heading with Google's screen-optimized serif. Contemporary editorial." },
      { headingId: "cormorant-garamond", bodyId: "lora", note: "French elegance over calligraphic warmth. For literary and cultural publications." },
      { headingId: "dm-serif-display", bodyId: "crimson-pro", note: "Bold serif headline over old-style body. Traditional magazine feel." },
    ],
  },
  {
    id: "developer",
    title: "Developer & Technical",
    description: "Sans-serif headings with monospace body or accents. Code-native aesthetic that respects the technical audience.",
    context: "Developer portfolios, documentation sites, technical blogs. Monospace fonts signal code credibility; sans-serif headings provide hierarchy.",
    pairs: [
      { headingId: "space-grotesk", bodyId: "jetbrains-mono", note: "Retro-futuristic heading with the developer's favorite mono. Perfect for dev portfolios." },
      { headingId: "inter", bodyId: "fira-code", note: "Clean heading over ligature-rich code font. Documentation and technical writing." },
      { headingId: "sora", bodyId: "ibm-plex-mono", note: "Futuristic heading with IBM's engineering mono. For AI/ML product sites." },
      { headingId: "geist", bodyId: "geist-mono", note: "Vercel's matched pair. The Next.js ecosystem standard." },
      { headingId: "outfit", bodyId: "recursive", note: "Geometric heading with the most versatile mono. 5 variable axes for creative coding." },
    ],
  },
  {
    id: "creative",
    title: "Creative & Portfolio",
    description: "Personality-driven pairings. Display fonts for impact, balanced by readable sans-serif body text. Break the rules, but readably.",
    context: "Design portfolios, agency sites, creative studios. The heading font IS the design statement. Body text stays out of the way.",
    pairs: [
      { headingId: "bricolage-grotesque", bodyId: "dm-sans", note: "The breakout display font of 2024-2025 over a clean geometric body." },
      { headingId: "syne", bodyId: "inter", note: "Art/culture heading with the universal body. Expressive without sacrificing readability." },
      { headingId: "bebas-neue", bodyId: "work-sans", note: "Maximum impact condensed heading over friendly rounded body." },
      { headingId: "space-grotesk", bodyId: "outfit", note: "Tech-personality heading with modern geometric body. For design-engineer hybrids." },
    ],
  },
];
