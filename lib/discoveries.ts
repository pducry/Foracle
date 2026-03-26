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
];
