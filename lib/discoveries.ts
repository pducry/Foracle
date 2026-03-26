export type Discovery = {
  id: string;
  headline: string;
  foundry: string;
  objective: string;
  whySpecial: string;
  context: string;
};

export const DISCOVERIES: Discovery[] = [
  {
    id: "familjen-grotesk",
    headline: "Optical sizing from a legend",
    foundry: "David Berlow / Font Bureau",
    objective: "A grotesque that actually changes shape between display and text sizes — proper optical sizing, a feature usually locked behind $300+ commercial licenses.",
    whySpecial: "Designed by David Berlow, one of the most respected type designers alive. The optical size axis physically adjusts letterform proportions — not just weight scaling. At 8px the letters are wider with open counters; at 72px they tighten with refined details.",
    context: "UI systems, editorial, any project where type appears at multiple sizes simultaneously",
  },
  {
    id: "instrument-sans",
    headline: "The free font that competes with commercial grotesks",
    foundry: "Rodrigo Fuenzalida / Google Fonts",
    objective: "A contemporary editorial neo-grotesque with condensed proportions that work equally for headlines and body text. The free alternative to Suisse International.",
    whySpecial: "Tightly-spaced with a distinctly European editorial feel. Features optical sizing, tabular figures, and a complete character set. Designers report clients can't distinguish it from $200+ commercial grotesques.",
    context: "Portfolios, editorial, startup branding, any project that needs to look premium on zero budget",
  },
  {
    id: "fraunces",
    headline: "Four variable axes in one free font",
    foundry: "Undercase Type",
    objective: "A 'wonky' soft serif with parametric control over weight, optical size, quirkiness (WONK axis), and softness. 2,000+ glyphs. The most technically ambitious free font available.",
    whySpecial: "The WONK axis lets you dial from traditional to playfully eccentric. The SOFT axis controls serif roundness. This level of parametric typography usually requires custom software. Community consensus: 'the most impressive free font, technically.'",
    context: "Branding with personality, editorial design, any context where you need one font to cover a wide expressive range",
  },
  {
    id: "instrument-serif",
    headline: "One of the most beautiful free italics ever drawn",
    foundry: "Rodrigo Fuenzalida",
    objective: "A sharp editorial serif with an italic that has genuine calligraphic DNA. The serif companion to Instrument Sans — together they form a cohesive type system.",
    whySpecial: "The italic is where this font truly shines — flowing, calligraphic strokes that reference traditional penmanship without being decorative. Professional type designers have compared it favorably to commercial faces like Tiempos.",
    context: "Editorial headlines, pull quotes, literary websites, magazine headers",
  },
  {
    id: "bespoke-serif",
    headline: "Premium foundry quality, completely free",
    foundry: "James Edmondson / OH no Type Co.",
    objective: "A transitional serif from one of the most celebrated type designers working today. Part of a full type system (Sans, Serif, Slab, Stencil) — rare for free fonts.",
    whySpecial: "James Edmondson is the creator of Ohno Blazeface, Vulf Sans, and other beloved typefaces. Bespoke represents commercial-grade design intent released for free. Beautiful ball terminals, well-drawn serifs, and a complete weight range.",
    context: "Projects that need a serif from a name you can trust — editorial, corporate, publications",
  },
  {
    id: "nacelle",
    headline: "The invisible font from a one-person foundry",
    foundry: "Dot Colon",
    objective: "A humanist sans-serif with unusually refined optical adjustments. True small caps in all weights. Slightly narrow proportions for efficient, professional layouts.",
    whySpecial: "Built by a tiny foundry with near-zero marketing. 8 weights with proper small caps — a feature most free fonts skip entirely. The spacing and kerning rival fonts that cost $150+. Found via obscure Reddit threads about 'fonts from tiny foundries that are actually good.'",
    context: "Long-form body text, print, editorial layouts, documents where typographic refinement matters",
  },
  {
    id: "gabarito",
    headline: "Rounded geometry without the childishness",
    foundry: "Naipe Foundry",
    objective: "A rounded geometric sans that walks the line between friendly and professional. 9 weights. Slightly squarish geometry gives it a distinctive identity.",
    whySpecial: "Released in 2023 from a small foundry, it flew completely under the radar. Designers who found it report switching from Nunito and getting 'a noticeably more polished feel.' Soft terminals without being juvenile — a difficult balance most rounded fonts fail at.",
    context: "SaaS products, app interfaces, landing pages that need warmth without losing credibility",
  },
  {
    id: "shantell-sans",
    headline: "The handwriting font built like a real typeface",
    foundry: "Shantell Martin × Arrow Type",
    objective: "A handwritten-style variable font with axes for bounce and irregularity. 1,000+ glyphs with proper spacing, kerning, and OpenType features. What handwriting fonts should be.",
    whySpecial: "Variable axes control how 'human' the text looks — dial it from structured to chaotic. Built by Arrow Type, a respected type studio. 150+ HN points at launch. Unlike amateur handwriting fonts, this has legitimate typographic engineering.",
    context: "Annotations, personal branding, creative portfolios, anywhere a human touch is needed with professional control",
  },
];
