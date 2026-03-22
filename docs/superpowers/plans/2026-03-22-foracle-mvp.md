# Foracle MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a free font exploration website with a catalog grid and font detail pages, powered by Google Fonts API data rendered as static pages.

**Architecture:** Next.js 15 App Router with SSG. A sync script fetches Google Fonts API data into a static JSON file. Pages are generated at build time from this JSON. Client-side interactions handle filtering, search, pagination, and typography controls.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, next-themes, Google Fonts API

**Spec:** `docs/superpowers/specs/2026-03-22-foracle-mvp-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `lib/types.ts` | Font, VariableAxis, Category type definitions |
| `lib/fonts.ts` | Data access: getAll, getById, getByCategory, search |
| `scripts/sync-fonts.ts` | Fetch Google Fonts API → write `data/fonts.json` |
| `data/fonts.json` | Static font data (generated, committed) |
| `app/layout.tsx` | Root layout: theme provider, header, global CSS |
| `app/page.tsx` | Home page: server component, passes fonts to client |
| `app/HomeClient.tsx` | Home page client: hero, filters, search, grid |
| `app/font/[id]/page.tsx` | Font detail: server component, SSG, metadata |
| `app/font/[id]/FontDetailClient.tsx` | Font detail client: preview, controls, styles |
| `app/not-found.tsx` | Custom 404 page |
| `components/Header.tsx` | Site header: logo, search, theme toggle |
| `components/SearchBar.tsx` | Debounced search input |
| `components/ThemeToggle.tsx` | Dark/light mode toggle |
| `components/FilterPills.tsx` | Category filter pills |
| `components/FontCard.tsx` | Font grid card with lazy-loaded preview |
| `components/FontGrid.tsx` | Grid container with pagination + empty states |
| `components/FontPreview.tsx` | Renders text in a Google Font (dynamic loading) |
| `components/TypeControls.tsx` | Size, spacing, line-height sliders + alignment |
| `components/VariantRow.tsx` | Single variant preview in detail page |
| `components/FontMeta.tsx` | Metadata grid (designer, license, subsets) |
| `app/globals.css` | Tailwind v4 imports + theme tokens + dark mode |

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `.gitignore`, `.env.local`

- [ ] **Step 1: Scaffold Next.js 15 project**

```bash
cd /Users/pducry/Desktop/Foracle
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias="@/*" --turbopack
```

Select defaults when prompted. This creates the full Next.js project with Tailwind CSS v4 and App Router.

- [ ] **Step 2: Install additional dependencies**

```bash
cd /Users/pducry/Desktop/Foracle
npm install next-themes
```

- [ ] **Step 3: Create `.env.local` with placeholder**

Create `.env.local`:
```
GOOGLE_FONTS_API_KEY=your_api_key_here
```

- [ ] **Step 4: Update `.gitignore`**

Append to `.gitignore`:
```
.env.local
.superpowers/
```

- [ ] **Step 5: Verify the dev server starts**

```bash
cd /Users/pducry/Desktop/Foracle
npm run dev
```

Expected: Server starts at `http://localhost:3000` without errors. Stop with Ctrl+C.

- [ ] **Step 6: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add -A
git commit -m "feat: scaffold Next.js 15 project with Tailwind CSS v4"
```

---

### Task 2: Types and Data Layer

**Files:**
- Create: `lib/types.ts`, `lib/fonts.ts`, `data/fonts.json`

- [ ] **Step 1: Create type definitions**

Create `lib/types.ts`:

```ts
export type VariableAxis = {
  tag: string;
  start: number;
  end: number;
};

export type Category =
  | "sans-serif"
  | "serif"
  | "display"
  | "handwriting"
  | "monospace";

export const CATEGORY_LABELS: Record<Category, string> = {
  "sans-serif": "Sans Serif",
  serif: "Serif",
  display: "Display",
  handwriting: "Script",
  monospace: "Monospace",
};

export const ALL_CATEGORIES: Category[] = [
  "sans-serif",
  "serif",
  "display",
  "handwriting",
  "monospace",
];

export type Font = {
  id: string;
  family: string;
  category: Category;
  variants: string[];
  subsets: string[];
  variable: boolean;
  axes: VariableAxis[];
  designers?: string;
  license?: string;
  lastModified: string;
  popularity: number;
  trending?: number;
  description?: string;
  numGlyphs?: number;
};
```

- [ ] **Step 2: Create seed data**

Create `data/fonts.json` with a small seed dataset (5 fonts) for development. This will be replaced by the sync script later.

```json
[
  {
    "id": "inter",
    "family": "Inter",
    "category": "sans-serif",
    "variants": ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    "subsets": ["latin", "latin-ext", "cyrillic", "greek", "vietnamese"],
    "variable": true,
    "axes": [{ "tag": "wght", "start": 100, "end": 900 }],
    "designers": "Rasmus Andersson",
    "license": "SIL Open Font License",
    "lastModified": "2024-11-07",
    "popularity": 1
  },
  {
    "id": "roboto",
    "family": "Roboto",
    "category": "sans-serif",
    "variants": ["100", "300", "400", "500", "700", "900"],
    "subsets": ["latin", "latin-ext", "cyrillic", "greek", "vietnamese"],
    "variable": false,
    "axes": [],
    "lastModified": "2024-08-12",
    "popularity": 2
  },
  {
    "id": "playfair-display",
    "family": "Playfair Display",
    "category": "serif",
    "variants": ["400", "500", "600", "700", "800", "900"],
    "subsets": ["latin", "latin-ext", "cyrillic", "vietnamese"],
    "variable": true,
    "axes": [{ "tag": "wght", "start": 400, "end": 900 }],
    "designers": "Claus Eggers Sørensen",
    "license": "SIL Open Font License",
    "lastModified": "2024-09-04",
    "popularity": 3
  },
  {
    "id": "fira-code",
    "family": "Fira Code",
    "category": "monospace",
    "variants": ["300", "400", "500", "600", "700"],
    "subsets": ["latin", "latin-ext", "cyrillic", "greek"],
    "variable": true,
    "axes": [{ "tag": "wght", "start": 300, "end": 700 }],
    "designers": "Nikita Prokopov",
    "license": "SIL Open Font License",
    "lastModified": "2024-07-31",
    "popularity": 4
  },
  {
    "id": "dancing-script",
    "family": "Dancing Script",
    "category": "handwriting",
    "variants": ["400", "500", "600", "700"],
    "subsets": ["latin", "latin-ext", "vietnamese"],
    "variable": true,
    "axes": [{ "tag": "wght", "start": 400, "end": 700 }],
    "lastModified": "2024-09-04",
    "popularity": 5
  }
]
```

- [ ] **Step 3: Create data access functions**

Create `lib/fonts.ts`:

```ts
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
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/pducry/Desktop/Foracle
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add lib/types.ts lib/fonts.ts data/fonts.json
git commit -m "feat: add Font types, seed data, and data access layer"
```

---

### Task 3: Theme Setup and Global Styles

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Set up Tailwind v4 globals with dark mode tokens**

Replace `app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #111111;
  --color-bg-tertiary: #1a1a1a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #aaaaaa;
  --color-text-muted: #666666;
  --color-border: #222222;
  --color-accent: #ffffff;
}

:root {
  color-scheme: dark;
}

:root.light {
  color-scheme: light;
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-bg-tertiary: #eeeeee;
  --color-text-primary: #0a0a0a;
  --color-text-secondary: #555555;
  --color-text-muted: #888888;
  --color-border: #e0e0e0;
  --color-accent: #0a0a0a;
}

body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Skeleton shimmer animation */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-secondary) 25%,
    var(--color-bg-tertiary) 50%,
    var(--color-bg-secondary) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

- [ ] **Step 2: Set up root layout with theme provider**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foracle — The Font Oracle",
  description: "Discover, compare, and pair 1700+ free fonts",
  openGraph: {
    title: "Foracle — The Font Oracle",
    description: "Discover, compare, and pair 1700+ free fonts",
    siteName: "Foracle",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["dark", "light"]}
          value={{ dark: "", light: "light" }}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Note: `value={{ dark: "", light: "light" }}` means dark has no class (default), light adds class `light` to `<html>`. This matches our CSS where `:root` is dark and `:root.light` is light.

- [ ] **Step 3: Verify dev server renders with dark background**

```bash
cd /Users/pducry/Desktop/Foracle
npm run dev
```

Open `http://localhost:3000`. Expected: Dark background (#0a0a0a), no errors in console.

- [ ] **Step 4: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add app/globals.css app/layout.tsx
git commit -m "feat: set up dark-first theme with Tailwind v4 tokens and next-themes"
```

---

### Task 4: Header Component (Logo + Search + Theme Toggle)

**Files:**
- Create: `components/ThemeToggle.tsx`, `components/SearchBar.tsx`, `components/Header.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create ThemeToggle**

Create `components/ThemeToggle.tsx`:

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <button className="w-9 h-9" aria-label="Toggle dark mode" />;
  }

  const isDark = theme !== "light";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-lg
        hover:bg-[var(--color-bg-tertiary)] transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

- [ ] **Step 2: Create SearchBar**

Create `components/SearchBar.tsx`:

```tsx
"use client";

import { useRef, useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export function SearchBar({
  onSearch,
  placeholder = "Search fonts...",
}: SearchBarProps) {
  const [value, setValue] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onSearch(newValue), 200);
  };

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg
          bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]
          placeholder:text-[var(--color-text-muted)]
          border border-[var(--color-border)]
          focus:outline-none focus:border-[var(--color-text-secondary)]
          transition-colors text-sm"
      />
    </div>
  );
}
```

- [ ] **Step 3: Create Header**

Create `components/Header.tsx`:

```tsx
"use client";

import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
};

export function Header({ onSearch, showSearch = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link
          href="/"
          className="text-lg font-bold text-[var(--color-text-primary)] shrink-0"
        >
          Foracle
        </Link>

        {showSearch && onSearch && (
          <div className="flex-1 max-w-sm ml-auto">
            <SearchBar onSearch={onSearch} />
          </div>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Add Header to layout**

Update `app/layout.tsx` — no, the Header needs client-side `onSearch` so it will be rendered per-page, not in layout. Keep layout as-is. The Header will be included in each page component.

- [ ] **Step 5: Test header renders in a temporary page**

Update `app/page.tsx` temporarily:

```tsx
"use client";

import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header onSearch={(q) => console.log(q)} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Foracle</h1>
      </main>
    </>
  );
}
```

```bash
cd /Users/pducry/Desktop/Foracle
npm run dev
```

Expected: Header renders with logo, search bar, and theme toggle. Toggle switches between dark/light. Search logs to console.

- [ ] **Step 6: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add components/ThemeToggle.tsx components/SearchBar.tsx components/Header.tsx app/page.tsx
git commit -m "feat: add Header with SearchBar and ThemeToggle components"
```

---

### Task 5: FilterPills Component

**Files:**
- Create: `components/FilterPills.tsx`

- [ ] **Step 1: Create FilterPills**

Create `components/FilterPills.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { Category, CATEGORY_LABELS, ALL_CATEGORIES } from "@/lib/types";

type FilterPillsProps = {
  selected: Category | null;
  onSelect: (category: Category | null) => void;
};

const options: (Category | null)[] = [null, ...ALL_CATEGORIES];

export function FilterPills({ selected, onSelect }: FilterPillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % options.length;
    else if (e.key === "ArrowLeft") nextIndex = (index - 1 + options.length) % options.length;
    else return;

    e.preventDefault();
    const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[nextIndex]?.focus();
    onSelect(options[nextIndex]);
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      className="flex flex-wrap justify-center gap-2"
    >
      {options.map((opt, i) => (
        <button
          key={opt ?? "all"}
          role="tab"
          tabIndex={selected === opt ? 0 : -1}
          aria-selected={selected === opt}
          onClick={() => onSelect(opt)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === opt
              ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)]"
              : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          {opt === null ? "All" : CATEGORY_LABELS[opt]}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
cd /Users/pducry/Desktop/Foracle
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add components/FilterPills.tsx
git commit -m "feat: add FilterPills component with category selection"
```

---

### Task 6: FontCard and FontPreview Components

**Files:**
- Create: `components/FontPreview.tsx`, `components/FontCard.tsx`

- [ ] **Step 1: Create FontPreview**

Create `components/FontPreview.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

type FontPreviewProps = {
  family: string;
  text?: string;
  weight?: number;
  weights?: number[];
  style?: React.CSSProperties;
  className?: string;
};

export function FontPreview({
  family,
  text = "Aa",
  weight = 400,
  weights,
  style,
  className = "",
}: FontPreviewProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const encoded = family.replace(/ /g, "+");
          const linkId = `font-${encoded}`;

          if (!document.getElementById(linkId)) {
            // Build weight list: use provided weights array or single weight
            const weightList = weights ?? [weight];
            const weightParam = weightList.sort((a, b) => a - b).join(";");

            const link = document.createElement("link");
            link.id = linkId;
            link.rel = "stylesheet";
            link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@${weightParam}&display=swap`;
            document.head.appendChild(link);
          }

          // Use document.fonts.load() to detect specific font face loading
          document.fonts
            .load(`${weight} 1em "${family}"`)
            .then(() => setLoaded(true))
            .catch(() => setLoaded(true)); // Show text even if font fails to load

          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [family, weight, weights]);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-300 ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        fontFamily: `"${family}", sans-serif`,
        fontWeight: weight,
        ...style,
      }}
    >
      {text}
    </div>
  );
}
```

- [ ] **Step 2: Create FontCard**

Create `components/FontCard.tsx`:

```tsx
"use client";

import Link from "next/link";
import { Font, CATEGORY_LABELS } from "@/lib/types";
import { FontPreview } from "./FontPreview";

type FontCardProps = {
  font: Font;
};

function getDefaultWeight(font: Font): number {
  // Prefer 400, otherwise pick the first available numeric weight
  const numericWeights = font.variants
    .map((v) => parseInt(v.replace("italic", ""), 10))
    .filter((w) => !isNaN(w));
  if (numericWeights.includes(400)) return 400;
  return numericWeights[0] ?? 400;
}

export function FontCard({ font }: FontCardProps) {
  const weight = getDefaultWeight(font);

  return (
    <Link
      href={`/font/${font.id}`}
      className="group block rounded-lg bg-[var(--color-bg-secondary)]
        border border-[var(--color-border)] hover:border-[var(--color-text-muted)]
        transition-colors overflow-hidden"
    >
      <div className="px-5 pt-4">
        <span className="text-xs text-[var(--color-text-secondary)]">
          {font.family}
        </span>
      </div>

      <div className="px-5 py-8 flex items-center justify-center min-h-[120px]">
        <FontPreview
          family={font.family}
          text={font.family}
          weight={weight}
          className="text-3xl text-[var(--color-text-primary)]"
        />
      </div>

      <div className="px-5 pb-4 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        <span>{CATEGORY_LABELS[font.category]}</span>
        <span>·</span>
        <span>{font.variants.length} styles</span>
        {font.variable && (
          <span className="px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[10px]">
            variable
          </span>
        )}
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: Verify it compiles**

```bash
cd /Users/pducry/Desktop/Foracle
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add components/FontPreview.tsx components/FontCard.tsx
git commit -m "feat: add FontCard and FontPreview with lazy font loading"
```

---

### Task 7: FontGrid with Pagination and Empty States

**Files:**
- Create: `components/FontGrid.tsx`

- [ ] **Step 1: Create FontGrid**

Create `components/FontGrid.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { Font } from "@/lib/types";
import { FontCard } from "./FontCard";

const PAGE_SIZE = 36;

type FontGridProps = {
  fonts: Font[];
  query?: string;
  categoryLabel?: string;
};

export function FontGrid({ fonts, query, categoryLabel }: FontGridProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Reset pagination when fonts list changes (filter/search)
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [fonts]);

  const showMore = () => setVisible((v) => v + PAGE_SIZE);
  const hasMore = visible < fonts.length;

  if (fonts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--color-text-secondary)] text-lg">
          {query
            ? `No fonts found for "${query}"`
            : categoryLabel
              ? `No ${categoryLabel} fonts found`
              : "No fonts found"}
        </p>
        <p className="text-[var(--color-text-muted)] text-sm mt-2">
          Try clearing your search or filters
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fonts.slice(0, visible).map((font) => (
          <FontCard key={font.id} font={font} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={showMore}
            className="px-6 py-2.5 rounded-lg text-sm font-medium
              bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]
              hover:text-[var(--color-text-primary)] border border-[var(--color-border)]
              hover:border-[var(--color-text-muted)] transition-colors"
          >
            Load more fonts ({fonts.length - visible} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
cd /Users/pducry/Desktop/Foracle
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add components/FontGrid.tsx
git commit -m "feat: add FontGrid with load-more pagination and empty states"
```

---

### Task 8: Home Page Assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Build the home page (server component for SSG/SEO)**

Replace `app/page.tsx` — this is a server component that passes data to the client:

```tsx
import { getAllFonts } from "@/lib/fonts";
import { HomeClient } from "./HomeClient";

export default function Home() {
  const fonts = getAllFonts();

  return <HomeClient fonts={fonts} />;
}
```

- [ ] **Step 1b: Create the client-side home component**

Create `app/HomeClient.tsx`:

```tsx
"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { FilterPills } from "@/components/FilterPills";
import { FontGrid } from "@/components/FontGrid";
import { Font, Category, CATEGORY_LABELS } from "@/lib/types";

type HomeClientProps = {
  fonts: Font[];
};

export function HomeClient({ fonts }: HomeClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | null>(null);

  const filtered = useMemo(() => {
    let result = fonts;

    if (category) {
      result = result.filter((f) => f.category === category);
    }

    if (search) {
      const lower = search.toLowerCase();
      result = result.filter((f) =>
        f.family.toLowerCase().includes(lower)
      );
    }

    return result;
  }, [fonts, search, category]);

  return (
    <>
      <Header onSearch={setSearch} />

      <main id="main-content" className="max-w-7xl mx-auto px-4">
        {/* Hero */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            The Font Oracle
          </h1>
          <p className="mt-3 text-[var(--color-text-muted)] text-base">
            Discover, compare, and pair {fonts.length.toLocaleString()}+ free
            fonts
          </p>
        </section>

        {/* Filter pills */}
        <section className="pb-8">
          <FilterPills selected={category} onSelect={setCategory} />
        </section>

        {/* Font grid */}
        <section className="pb-16">
          <FontGrid
            fonts={filtered}
            query={search}
            categoryLabel={category ? CATEGORY_LABELS[category] : undefined}
          />
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Test the full home page**

```bash
cd /Users/pducry/Desktop/Foracle
npm run dev
```

Open `http://localhost:3000`. Expected:
- Dark background with Foracle header
- "The Font Oracle" hero with subtitle
- Filter pills (All, Sans Serif, Serif, Display, Script, Monospace)
- Grid of 5 seed font cards with previews loading from Google Fonts
- Clicking pills filters the grid
- Searching filters by name
- Theme toggle switches dark/light
- Empty state shows when filter/search has no results

- [ ] **Step 3: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add app/page.tsx app/HomeClient.tsx
git commit -m "feat: build home page with hero, filters, search, and font grid"
```

---

### Task 9: TypeControls Component

**Files:**
- Create: `components/TypeControls.tsx`

- [ ] **Step 1: Create TypeControls**

Create `components/TypeControls.tsx`:

```tsx
"use client";

type TypeSettings = {
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  textAlign: "left" | "center" | "right";
};

type TypeControlsProps = {
  settings: TypeSettings;
  onChange: (settings: TypeSettings) => void;
};

export type { TypeSettings };

export function TypeControls({ settings, onChange }: TypeControlsProps) {
  const update = (partial: Partial<TypeSettings>) =>
    onChange({ ...settings, ...partial });

  const reset = () =>
    onChange({ fontSize: 48, letterSpacing: 0, lineHeight: 1.2, textAlign: "left" });

  return (
    <div className="flex flex-wrap items-center gap-6 py-4">
      {/* Size */}
      <label className="flex items-center gap-3 flex-1 min-w-[180px]">
        <span className="text-xs text-[var(--color-text-muted)] w-10 shrink-0">Size</span>
        <input
          type="range"
          min={12}
          max={120}
          value={settings.fontSize}
          onChange={(e) => update({ fontSize: Number(e.target.value) })}
          className="flex-1 accent-[var(--color-accent)]"
          aria-label="Font size"
          aria-valuemin={12}
          aria-valuemax={120}
          aria-valuenow={settings.fontSize}
        />
        <span className="text-xs text-[var(--color-text-muted)] w-10 text-right">
          {settings.fontSize}px
        </span>
      </label>

      {/* Letter Spacing */}
      <label className="flex items-center gap-3 flex-1 min-w-[180px]">
        <span className="text-xs text-[var(--color-text-muted)] w-16 shrink-0">Spacing</span>
        <input
          type="range"
          min={-5}
          max={20}
          step={0.5}
          value={settings.letterSpacing}
          onChange={(e) => update({ letterSpacing: Number(e.target.value) })}
          className="flex-1 accent-[var(--color-accent)]"
          aria-label="Letter spacing"
          aria-valuemin={-5}
          aria-valuemax={20}
          aria-valuenow={settings.letterSpacing}
        />
        <span className="text-xs text-[var(--color-text-muted)] w-10 text-right">
          {settings.letterSpacing}px
        </span>
      </label>

      {/* Line Height */}
      <label className="flex items-center gap-3 flex-1 min-w-[180px]">
        <span className="text-xs text-[var(--color-text-muted)] w-14 shrink-0">Height</span>
        <input
          type="range"
          min={0.8}
          max={2.0}
          step={0.05}
          value={settings.lineHeight}
          onChange={(e) => update({ lineHeight: Number(e.target.value) })}
          className="flex-1 accent-[var(--color-accent)]"
          aria-label="Line height"
          aria-valuemin={0.8}
          aria-valuemax={2.0}
          aria-valuenow={settings.lineHeight}
        />
        <span className="text-xs text-[var(--color-text-muted)] w-8 text-right">
          {settings.lineHeight.toFixed(1)}
        </span>
      </label>

      {/* Alignment */}
      <div className="flex items-center gap-1">
        {(["left", "center", "right"] as const).map((align) => (
          <button
            key={align}
            onClick={() => update({ textAlign: align })}
            className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
              settings.textAlign === align
                ? "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
            aria-label={`Align ${align}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {align === "left" && (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="15" y2="12" />
                  <line x1="3" y1="18" x2="18" y2="18" />
                </>
              )}
              {align === "center" && (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="6" y1="12" x2="18" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
              {align === "right" && (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="9" y1="12" x2="21" y2="12" />
                  <line x1="6" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={reset}
        className="w-8 h-8 flex items-center justify-center rounded
          text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        aria-label="Reset type settings"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
cd /Users/pducry/Desktop/Foracle
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add components/TypeControls.tsx
git commit -m "feat: add TypeControls with size, spacing, line-height sliders and alignment"
```

---

### Task 10: VariantRow and FontMeta Components

**Files:**
- Create: `components/VariantRow.tsx`, `components/FontMeta.tsx`

- [ ] **Step 1: Create VariantRow**

Create `components/VariantRow.tsx`:

```tsx
import { FontPreview } from "./FontPreview";

const WEIGHT_NAMES: Record<string, string> = {
  "100": "Thin",
  "200": "Extra Light",
  "300": "Light",
  "400": "Regular",
  "500": "Medium",
  "600": "Semi Bold",
  "700": "Bold",
  "800": "Extra Bold",
  "900": "Black",
};

type VariantRowProps = {
  family: string;
  variant: string;
  previewText: string;
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  textAlign: "left" | "center" | "right";
};

export function VariantRow({
  family,
  variant,
  previewText,
  fontSize,
  letterSpacing,
  lineHeight,
  textAlign,
}: VariantRowProps) {
  const isItalic = variant.includes("italic");
  const weight = parseInt(variant.replace("italic", "") || "400", 10);
  const name = WEIGHT_NAMES[String(weight)] || weight.toString();
  const label = `${name} ${weight}${isItalic ? " Italic" : ""}`;

  return (
    <div className="border-b border-[var(--color-border)] py-6">
      <p className="text-xs text-[var(--color-text-muted)] mb-2">
        {family} {label}
      </p>
      <FontPreview
        family={family}
        text={previewText}
        weight={weight}
        style={{
          fontSize: `${fontSize}px`,
          letterSpacing: `${letterSpacing}px`,
          lineHeight: lineHeight,
          textAlign: textAlign,
          fontStyle: isItalic ? "italic" : "normal",
        }}
        className="text-[var(--color-text-primary)]"
      />
    </div>
  );
}
```

- [ ] **Step 2: Create FontMeta**

Create `components/FontMeta.tsx`:

```tsx
import { Font, CATEGORY_LABELS } from "@/lib/types";

type FontMetaProps = {
  font: Font;
};

export function FontMeta({ font }: FontMetaProps) {
  const items = [
    { label: "Support", value: font.subsets.join(", ") },
    { label: "Designer", value: font.designers },
    {
      label: "Glyphs",
      value: font.numGlyphs ? font.numGlyphs.toLocaleString() : undefined,
    },
    { label: "License", value: font.license },
  ].filter((item) => item.value);

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map(({ label, value }) => (
        <div key={label}>
          <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
          <p className="text-sm text-[var(--color-text-primary)] font-medium mt-0.5">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Verify it compiles**

```bash
cd /Users/pducry/Desktop/Foracle
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add components/VariantRow.tsx components/FontMeta.tsx
git commit -m "feat: add VariantRow and FontMeta components for detail page"
```

---

### Task 11: Font Detail Page

**Files:**
- Create: `app/font/[id]/page.tsx`, `app/not-found.tsx`

- [ ] **Step 1: Create the detail page**

Create `app/font/[id]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllFonts, getFontById } from "@/lib/fonts";
import { CATEGORY_LABELS } from "@/lib/types";
import { FontDetailClient } from "./FontDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllFonts().map((font) => ({ id: font.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const font = getFontById(id);
  if (!font) return { title: "Font not found — Foracle" };

  return {
    title: `${font.family} — Foracle`,
    description: `Explore ${font.family}, a free ${CATEGORY_LABELS[font.category].toLowerCase()} font with ${font.variants.length} styles`,
    openGraph: {
      title: `${font.family} — Foracle`,
      description: `Explore ${font.family}, a free ${CATEGORY_LABELS[font.category].toLowerCase()} font with ${font.variants.length} styles`,
    },
  };
}

export default async function FontPage({ params }: Props) {
  const { id } = await params;
  const font = getFontById(id);

  if (!font) notFound();

  return <FontDetailClient font={font} />;
}
```

- [ ] **Step 2: Create the client component for the detail page**

Create `app/font/[id]/FontDetailClient.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Font, CATEGORY_LABELS } from "@/lib/types";
import { Header } from "@/components/Header";
import { FontPreview } from "@/components/FontPreview";
import { FontMeta } from "@/components/FontMeta";
import { TypeControls, TypeSettings } from "@/components/TypeControls";
import { VariantRow } from "@/components/VariantRow";

type Props = {
  font: Font;
};

export function FontDetailClient({ font }: Props) {
  const [tab, setTab] = useState<"styles" | "text">("styles");
  const [customText, setCustomText] = useState("");
  const [settings, setSettings] = useState<TypeSettings>({
    fontSize: 48,
    letterSpacing: 0,
    lineHeight: 1.2,
    textAlign: "left",
  });

  const previewText = customText || "Alice in Wonderland";

  // Sort variants: numeric weights first, then italics
  const sortedVariants = [...font.variants].sort((a, b) => {
    const aWeight = parseInt(a.replace("italic", "") || "400", 10);
    const bWeight = parseInt(b.replace("italic", "") || "400", 10);
    const aItalic = a.includes("italic");
    const bItalic = b.includes("italic");
    if (aWeight !== bWeight) return aWeight - bWeight;
    return aItalic === bItalic ? 0 : aItalic ? 1 : -1;
  });

  // Preload all weights for detail page
  const weights = [
    ...new Set(
      font.variants.map((v) =>
        parseInt(v.replace("italic", "") || "400", 10)
      )
    ),
  ];
  const sortedWeights = weights.sort((a, b) => a - b);
  // Build CSS2 API tuples: 0,100;0,300;0,400;1,100;1,300;1,400
  const tuples = [
    ...sortedWeights.map((w) => `0,${w}`),
    ...sortedWeights.map((w) => `1,${w}`),
  ].join(";");
  const encodedFamily = font.family.replace(/ /g, "+");

  return (
    <>
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?family=${encodedFamily}:ital,wght@${tuples}&display=swap`}
      />

      <Header showSearch={false} />

      <main className="max-w-4xl mx-auto px-4">
        {/* Back link */}
        <div className="py-4">
          <Link
            href="/"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            ← Back to catalog
          </Link>
        </div>

        {/* Hero preview */}
        <section className="text-center py-12 border-b border-[var(--color-border)]">
          <FontPreview
            family={font.family}
            text={font.family}
            weight={400}
            className="text-6xl md:text-8xl text-[var(--color-text-primary)]"
          />
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <span>{CATEGORY_LABELS[font.category]}</span>
            <span className="text-[var(--color-text-muted)]">·</span>
            <span>{font.variants.length} styles</span>
            {font.variable && (
              <span className="px-2 py-0.5 rounded border border-[var(--color-border)] text-xs">
                variable
              </span>
            )}
          </div>
        </section>

        {/* About + Metadata */}
        <section className="py-8 border-b border-[var(--color-border)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm font-semibold mb-3">About this font</h2>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {font.description ||
                  `${font.family} is a free ${CATEGORY_LABELS[font.category].toLowerCase()} font with ${font.variants.length} styles${font.variable ? " and variable font support" : ""}.`}
              </p>
              <a
                href={`https://fonts.google.com/specimen/${font.family.replace(/ /g, "+")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-[var(--color-text-primary)] hover:underline"
              >
                Get the font ↗
              </a>
            </div>
            <FontMeta font={font} />
          </div>
        </section>

        {/* Tabs */}
        <section className="py-6">
          <div className="flex gap-6 border-b border-[var(--color-border)]">
            {(["styles", "text"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                  tab === t
                    ? "border-[var(--color-text-primary)] text-[var(--color-text-primary)]"
                    : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Controls */}
          <TypeControls settings={settings} onChange={setSettings} />

          {/* Tab content */}
          {tab === "styles" && (
            <div>
              {sortedVariants.map((variant) => (
                <VariantRow
                  key={variant}
                  family={font.family}
                  variant={variant}
                  previewText={previewText}
                  fontSize={settings.fontSize}
                  letterSpacing={settings.letterSpacing}
                  lineHeight={settings.lineHeight}
                  textAlign={settings.textAlign}
                />
              ))}
            </div>
          )}

          {tab === "text" && (
            <div className="py-6">
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type your text here..."
                className="w-full p-4 rounded-lg bg-[var(--color-bg-secondary)]
                  border border-[var(--color-border)] text-[var(--color-text-primary)]
                  placeholder:text-[var(--color-text-muted)]
                  focus:outline-none focus:border-[var(--color-text-secondary)]
                  resize-y min-h-[80px] text-sm"
              />
              <div className="mt-6 py-8">
                <FontPreview
                  family={font.family}
                  text={customText || "Type something above to preview..."}
                  weight={400}
                  style={{
                    fontSize: `${settings.fontSize}px`,
                    letterSpacing: `${settings.letterSpacing}px`,
                    lineHeight: settings.lineHeight,
                    textAlign: settings.textAlign,
                  }}
                  className="text-[var(--color-text-primary)]"
                />
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Create custom 404 page**

Create `app/not-found.tsx`:

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--color-text-primary)]">
          404
        </h1>
        <p className="mt-4 text-[var(--color-text-secondary)]">
          Font not found
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2.5 rounded-lg text-sm font-medium
            bg-[var(--color-accent)] text-[var(--color-bg-primary)]
            hover:opacity-90 transition-opacity"
        >
          Back to catalog
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify build succeeds**

```bash
cd /Users/pducry/Desktop/Foracle
npm run build
```

Expected: Build succeeds. Static params generated for all 5 seed fonts.

- [ ] **Step 5: Test the detail page**

```bash
cd /Users/pducry/Desktop/Foracle
npm run dev
```

Open `http://localhost:3000/font/inter`. Expected:
- "Inter" rendered in Inter font (large, centered)
- Tags: Sans Serif · 9 styles · variable
- About section with metadata
- Tabs: Styles and Text
- Controls: sliders for size, spacing, height + alignment buttons
- Variant list showing all weights with live preview
- Text tab with textarea for custom preview
- Back to catalog link works
- Opening `/font/nonexistent` shows 404 page

- [ ] **Step 6: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add app/font/[id]/page.tsx app/font/[id]/FontDetailClient.tsx app/not-found.tsx
git commit -m "feat: build font detail page with preview, metadata, controls, and style explorer"
```

---

### Task 12: Sync Script

**Files:**
- Create: `scripts/sync-fonts.ts`

- [ ] **Step 1: Create the sync script**

Create `scripts/sync-fonts.ts`:

```ts
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

    // Detect variable font: check if API returned axes data, or if file URLs contain "[wght]" pattern
    // The Google Fonts API (with capability=VF or sort param) returns axis ranges in the files keys
    const variable = Object.keys(item.files).some((k) => /\[.*\]/.test(k))
      || item.variants.length >= 6; // Heuristic: fonts with many weights are often variable

    // Extract axes from variant ranges if present
    const axes: { tag: string; start: number; end: number }[] = [];
    if (variable) {
      // Simple heuristic: check weight range from variants
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
```

- [ ] **Step 2: Install tsx for running TypeScript scripts**

```bash
cd /Users/pducry/Desktop/Foracle
npm install -D tsx
```

- [ ] **Step 3: Add sync script to package.json**

Add to `package.json` scripts section:

```json
"sync-fonts": "tsx scripts/sync-fonts.ts"
```

- [ ] **Step 4: Test the sync script**

Set your actual Google Fonts API key in `.env.local`, then:

```bash
cd /Users/pducry/Desktop/Foracle
source .env.local 2>/dev/null; GOOGLE_FONTS_API_KEY=$GOOGLE_FONTS_API_KEY npm run sync-fonts
```

Expected: "Fetched 1700+ fonts" and `data/fonts.json` is updated with the full dataset.

- [ ] **Step 5: Verify the site works with full data**

```bash
cd /Users/pducry/Desktop/Foracle
npm run dev
```

Open `http://localhost:3000`. Expected: Full catalog of 1700+ fonts with working filters, search, pagination, and detail pages.

- [ ] **Step 6: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add scripts/sync-fonts.ts package.json data/fonts.json
git commit -m "feat: add Google Fonts API sync script and full font dataset"
```

---

### Task 13: Skip-to-Content and Final Accessibility Pass

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add skip-to-content link to layout**

In `app/layout.tsx`, add inside `<body>` before `<ThemeProvider>`:

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
    focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg
    focus:bg-[var(--color-accent)] focus:text-[var(--color-bg-primary)]
    focus:text-sm focus:font-medium"
>
  Skip to content
</a>
```

- [ ] **Step 2: Add `id="main-content"` to main elements**

`app/HomeClient.tsx` already has `id="main-content"` on its `<main>` tag. Add it to FontDetailClient too:

In `app/font/[id]/FontDetailClient.tsx`, change `<main>` to:
```tsx
<main id="main-content" className="max-w-4xl mx-auto px-4">
```

- [ ] **Step 3: Verify full build**

```bash
cd /Users/pducry/Desktop/Foracle
npm run build
```

Expected: Build succeeds with all static pages generated.

- [ ] **Step 4: Commit**

```bash
cd /Users/pducry/Desktop/Foracle
git add app/layout.tsx app/font/[id]/FontDetailClient.tsx
git commit -m "feat: add skip-to-content link and final accessibility improvements"
```

---

### Task 14: Final Verification

- [ ] **Step 1: Run production build and start**

```bash
cd /Users/pducry/Desktop/Foracle
npm run build && npm run start
```

- [ ] **Step 2: Test all features**

Open `http://localhost:3000` and verify:
- [ ] Dark theme loads by default
- [ ] Theme toggle switches to light and back
- [ ] Hero shows with correct title and font count
- [ ] Filter pills filter the grid correctly
- [ ] Search filters by font name
- [ ] Cards show font previews with actual Google Fonts
- [ ] "Load more" button works
- [ ] Empty states show for no-result searches/filters
- [ ] Clicking a card navigates to detail page
- [ ] Detail page shows hero preview in the actual font
- [ ] Metadata section displays correctly
- [ ] Type controls (size, spacing, height) update previews live
- [ ] Alignment buttons work
- [ ] Reset button restores defaults
- [ ] Styles tab shows all variants
- [ ] Text tab allows custom text preview
- [ ] Back to catalog link works
- [ ] 404 page shows for invalid font IDs
- [ ] Tab/keyboard navigation works on pills, controls, buttons

- [ ] **Step 3: Commit any final fixes if needed**
