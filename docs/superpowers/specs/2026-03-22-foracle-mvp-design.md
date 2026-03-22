# Foracle MVP — Design Spec

## Overview

Foracle is a modern free font exploration and comparison website. The MVP focuses on a curated catalog with detailed font pages, powered by Google Fonts API data. Future versions will add font pairing recommendations (the "oracle" feature).

**Name:** Foracle (Font + Oracle)
**Tagline:** "The Font Oracle — Discover, compare, and pair free fonts"

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Data source | Google Fonts API → static JSON |
| Build | SSG via `generateStaticParams` |
| Deploy | Vercel (scheduled rebuilds for catalog updates) |

## Data Model

### Font data source

A sync script (`scripts/sync-fonts.ts`) fetches from Google Fonts Developer API and generates `data/fonts.json`.

### Font type

```ts
type VariableAxis = {
  tag: string    // "wght", "wdth", "ital"
  start: number
  end: number
}

type Font = {
  id: string              // slug: "inter", "playfair-display"
  family: string          // "Inter"
  category: "sans-serif" | "serif" | "display" | "handwriting" | "monospace"
  variants: string[]      // ["300", "400", "500", "700", "300italic", ...]
  subsets: string[]        // ["latin", "latin-ext", "cyrillic"]
  variable: boolean        // supports variable font axes
  axes: VariableAxis[]     // variable font axes
  designers: string        // "Rasmus Andersson"
  license: string          // "SIL Open Font License"
  lastModified: string     // "2024-01-15"
  popularity: number       // popularity ranking from API
  trending: number         // trending ranking from API
  description?: string     // about text if available
  numGlyphs?: number       // glyph count if available
}
```

### Sync script behavior

- Fetches full font list from `https://www.googleapis.com/webfonts/v1/webfonts`
- Transforms API response to `Font[]` schema
- Writes to `data/fonts.json`
- Run manually or via CI cron (weekly)

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSG | Home — hero, filters, font grid |
| `/font/[id]` | SSG | Font detail — preview, metadata, style explorer |

## Page Designs

### Home (`/`)

**Layout (top to bottom):**

1. **Header** — Logo "Foracle" left, search bar center-right, dark/light toggle right
2. **Hero** — Centered. Title "The Font Oracle" (large, bold). Subtitle "Discover, compare, and pair 1700+ free fonts"
3. **Filter pills** — Horizontal centered row: All (active by default) | Sans Serif | Serif | Display | Script | Monospace
4. **Font grid** — 3 columns on desktop, 2 on tablet, 1 on mobile. Each card:
   - Font name (small, top of card)
   - Large preview rendering "Aa" or custom text in the actual font (loaded via Google Fonts CSS)
   - Bottom: category label · number of styles · "variable" badge (if applicable)
5. **Pagination** — Load more button or infinite scroll

**Interactions:**
- Clicking a filter pill filters the grid (client-side, instant)
- Search filters by font family name (client-side, debounced)
- Clicking a card navigates to `/font/[id]`
- Type tester: optional global input at top that changes preview text across all cards

### Font Detail (`/font/[id]`)

**Layout (top to bottom):**

1. **Header** — Same as home, with back navigation
2. **Hero preview** — Font name rendered in the font itself, very large, centered
3. **Tags** — Category · number of styles · "variable" badge
4. **About section** — Two columns:
   - Left: "About this font" description text + "Get the font ↗" link (to Google Fonts page)
   - Right: Metadata grid 2x2 — Support (subsets), Designer, Glyphs contained, License, Manufacturer, Copyright
5. **Tabs** — Styles | Text | Glyphs
6. **Controls bar** — Three sliders: Size (12-120px), Letter Spacing (-5 to 20px), Line Height (0.8 to 2.0). Alignment buttons (left, center, right). Reset button.
7. **Styles list** — Each variant rendered as a row:
   - Variant label (e.g., "Light 300", "Regular 400", "Bold 700")
   - Preview text rendered in that variant at controlled size/spacing/height

**Interactions:**
- Sliders update all previews in real-time
- Tab switching shows different content:
  - Styles: variant list (default)
  - Text: free-form text input with live preview in selected variant
  - Glyphs: character grid showing all supported glyphs

## Components

| Component | Purpose |
|-----------|---------|
| `FontCard` | Grid card with font preview, name, category, styles count |
| `FontPreview` | Renders text in a specific Google Font (handles dynamic loading) |
| `TypeControls` | Size, letter-spacing, line-height sliders + alignment |
| `FilterPills` | Category filter buttons with active state |
| `SearchBar` | Search input with debounced filtering |
| `ThemeToggle` | Dark/light mode switch using next-themes |
| `VariantRow` | Single variant preview row in detail page |
| `GlyphGrid` | Character map grid for Glyphs tab |
| `FontMeta` | Metadata display grid (designer, license, etc.) |

## Styling

- **Dark-first** theme — dark as default, light mode via toggle
- Tailwind CSS v4 with `darkMode: "class"` strategy via `next-themes`
- Color palette: backgrounds `#0a0a0a` → `#111` → `#1a1a1a`, text `#fff` → `#aaa` → `#555`
- Light mode: inverted — white backgrounds, dark text
- Cards: subtle border or background differentiation, rounded corners (8px)
- Variable badge: pill with border, small text
- Transitions: smooth color transitions on theme toggle, hover states on cards

## Font Loading Strategy

- Google Fonts CSS API for preview rendering: `https://fonts.googleapis.com/css2?family={family}:wght@{weights}`
- Load fonts on-demand as cards enter viewport (Intersection Observer)
- On detail page: preload the font family with all variants
- Use `font-display: swap` for performance

## Project Structure

```
Foracle/
├── app/
│   ├── layout.tsx          # Root layout, theme provider, global styles
│   ├── page.tsx            # Home page
│   └── font/
│       └── [id]/
│           └── page.tsx    # Font detail page
├── components/
│   ├── FontCard.tsx
│   ├── FontPreview.tsx
│   ├── TypeControls.tsx
│   ├── FilterPills.tsx
│   ├── SearchBar.tsx
│   ├── ThemeToggle.tsx
│   ├── VariantRow.tsx
│   ├── GlyphGrid.tsx
│   └── FontMeta.tsx
├── data/
│   └── fonts.json          # Generated by sync script
├── lib/
│   ├── fonts.ts            # Data access functions (getAll, getById, getByCategory)
│   └── types.ts            # TypeScript types
├── scripts/
│   └── sync-fonts.ts       # Google Fonts API sync script
├── public/
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Future (v2+)

- **Font Pairing Oracle** — automatic pairing suggestions based on typographic tags (modern, classic, geometric, humanist) and complementary rules
- **Multiple sources** — aggregate fonts from Font Squirrel, Open Font Library
- **Manual curation** — ability to add/edit fonts manually
- **Comparison view** — side-by-side font comparison
- **Collections** — save and share font collections
