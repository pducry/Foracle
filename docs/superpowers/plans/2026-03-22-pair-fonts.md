# Pair Fonts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add font pairing with instant typographic suggestions and optional AI-generated rationales via Claude API.

**Architecture:** Client-side scoring engine (`lib/pairing.ts`) provides instant suggestions. Next.js Route Handler (`app/api/pair/route.ts`) calls Claude Haiku for rationales in background. Progressive enhancement — works without API key.

**Tech Stack:** Next.js 16, React 19, Tailwind 4, TypeScript, @anthropic-ai/sdk

**Spec:** `docs/superpowers/specs/2026-03-22-pair-fonts-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `lib/pairing.ts` | Create | Scoring rules engine — pure functions |
| `app/api/pair/route.ts` | Create | Route Handler — Claude API integration |
| `components/FontSelector.tsx` | Create | Searchable font dropdown with preview |
| `components/PairPreview.tsx` | Create | Text preview with heading + body fonts |
| `components/AiRationale.tsx` | Create | AI rationale card with loading/empty/content states |
| `components/PairSuggestions.tsx` | Create | Horizontal scrollable suggestion cards |
| `components/PairPlayground.tsx` | Create | Main playground orchestrator |
| `components/PairSection.tsx` | Create | "Pairs well with" section for detail page |
| `app/pair/page.tsx` | Create | Server component — loads fonts |
| `app/pair/PairClient.tsx` | Create | Client component — playground state management |
| `components/Header.tsx` | Modify | Add Explore/Pair nav links |
| `app/font/[id]/FontDetailClient.tsx` | Modify | Add PairSection at bottom |
| `app/font/[id]/page.tsx` | Modify | Pass allFonts to detail client |

---

### Task 1: Install Anthropic SDK

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the dependency**

Run: `npm install @anthropic-ai/sdk`

- [ ] **Step 2: Verify installation**

Run: `node -e "require('@anthropic-ai/sdk')"`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @anthropic-ai/sdk dependency"
```

---

### Task 2: Pairing Rules Engine

**Files:**
- Create: `lib/pairing.ts`

- [ ] **Step 1: Create the scoring engine**

```ts
// lib/pairing.ts
import { Font, Category } from "./types";

export type PairRole = "Heading" | "Body" | "Code";

export type PairSuggestion = {
  font: Font;
  score: number;
  role: PairRole;
};

const CONTRAST_PAIRS: [Category, Category][] = [
  ["serif", "sans-serif"],
  ["sans-serif", "serif"],
  ["display", "monospace"],
  ["monospace", "display"],
  ["handwriting", "sans-serif"],
  ["sans-serif", "handwriting"],
];

function hasContrast(a: Category, b: Category): boolean {
  return CONTRAST_PAIRS.some(([x, y]) => x === a && y === b);
}

function scoreCandidate(primary: Font, candidate: Font): number {
  if (primary.id === candidate.id) return -1;

  let score = 0;

  // Category contrast (+3)
  if (hasContrast(primary.category, candidate.category)) {
    score += 3;
  }

  // Same category, different family (+1)
  if (primary.category === candidate.category) {
    score += 1;
  }

  // Weight complement (+2): if primary has few weights, prefer wide range
  const primaryWeightCount = primary.variants.filter(
    (v) => !v.includes("i")
  ).length;
  const candidateWeightCount = candidate.variants.filter(
    (v) => !v.includes("i")
  ).length;
  if (primaryWeightCount <= 3 && candidateWeightCount >= 5) {
    score += 2;
  } else if (candidateWeightCount >= 4) {
    score += 1;
  }

  // Subset compatibility (+1)
  const primarySubsets = new Set(primary.subsets);
  const sharedSubsets = candidate.subsets.filter((s) => primarySubsets.has(s));
  if (sharedSubsets.length >= Math.min(primary.subsets.length, 3)) {
    score += 1;
  }

  // Popularity boost (+1): top 200 fonts
  if (candidate.popularity <= 200) {
    score += 1;
  }

  return score;
}

const HEADING_CATEGORIES: Category[] = ["display", "handwriting"];
const BODY_CATEGORIES: Category[] = ["sans-serif", "serif"];

function assignRole(primary: Font, candidate: Font): PairRole {
  if (candidate.category === "monospace") return "Code";

  const primaryIsHeading = HEADING_CATEGORIES.includes(primary.category);

  if (primaryIsHeading) {
    // Primary is heading-type, so suggest body/code roles
    if (BODY_CATEGORIES.includes(candidate.category)) return "Body";
    return "Body";
  }

  // Primary is body-type, suggest heading roles
  if (HEADING_CATEGORIES.includes(candidate.category)) return "Heading";
  if (candidate.category === "serif" && primary.category === "sans-serif")
    return "Heading";
  if (candidate.category === "sans-serif" && primary.category === "serif")
    return "Body";

  return "Body";
}

export function getPairSuggestions(
  primary: Font,
  allFonts: Font[],
  limit = 6
): PairSuggestion[] {
  return allFonts
    .map((candidate) => ({
      font: candidate,
      score: scoreCandidate(primary, candidate),
      role: assignRole(primary, candidate),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.font.popularity - b.font.popularity; // lower = more popular
    })
    .slice(0, limit);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit lib/pairing.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add lib/pairing.ts
git commit -m "feat: add font pairing scoring engine"
```

---

### Task 3: AI Route Handler

**Files:**
- Create: `app/api/pair/route.ts`

- [ ] **Step 1: Create the route handler**

```ts
// app/api/pair/route.ts
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

type PairRequest = {
  primary: string;
  suggestions: string[];
  primaryCategory: string;
};

type PairResponse = {
  rationales: Record<string, string>;
  extraSuggestions: { family: string; rationale: string }[];
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI rationales not configured" },
      { status: 501 }
    );
  }

  const body: PairRequest = await request.json();
  const { primary, suggestions, primaryCategory } = body;

  if (!primary || !suggestions?.length) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  const prompt = `You are a typography expert. A user selected "${primary}" (${primaryCategory}) as their primary font and the system suggested these pairings: ${suggestions.join(", ")}.

For each suggested font, write a 2-3 sentence rationale explaining WHY this pairing works typographically. Focus on contrast, proportion, readability, and mood.

Also suggest up to 2 additional fonts from Google Fonts that could pair well with "${primary}" that aren't in the list above.

Respond in JSON format:
{
  "rationales": { "Font Name": "rationale text", ... },
  "extraSuggestions": [{ "family": "Font Name", "rationale": "why it works" }]
}

Respond ONLY with valid JSON, no markdown.`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const parsed: PairResponse = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("AI pair error:", error);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/api/pair/route.ts
git commit -m "feat: add AI pairing route handler with Claude API"
```

---

### Task 4: FontSelector Component

**Files:**
- Create: `components/FontSelector.tsx`

Reference: `components/SearchBar.tsx` for existing search input styling.

- [ ] **Step 1: Create FontSelector**

```tsx
// components/FontSelector.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Font, CATEGORY_LABELS } from "@/lib/types";

type FontSelectorProps = {
  label: string;
  fonts: Font[];
  selected: Font | null;
  onSelect: (font: Font) => void;
};

export function FontSelector({
  label,
  fonts,
  selected,
  onSelect,
}: FontSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? fonts.filter((f) =>
        f.family.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 50)
    : fonts.slice(0, 50);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div ref={ref} className="relative flex-1">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
        {label}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]
          rounded-xl px-4 py-3 hover:border-[var(--color-text-muted)] transition-colors"
      >
        {selected ? (
          <>
            <div className="text-lg font-semibold">{selected.family}</div>
            <div className="text-xs text-[var(--color-text-muted)]">
              {CATEGORY_LABELS[selected.category]} · {selected.variants.length} weights
              {selected.variable ? " · Variable" : ""}
            </div>
          </>
        ) : (
          <div className="text-[var(--color-text-muted)]">Choose a font...</div>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50
          bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
          rounded-xl shadow-xl max-h-80 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-[var(--color-border)]">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fonts..."
              className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg-tertiary)]
                text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
                border border-[var(--color-border)] focus:outline-none
                focus:border-[var(--color-text-secondary)] text-sm"
            />
          </div>
          <div className="overflow-y-auto">
            {filtered.map((font) => (
              <button
                key={font.id}
                onClick={() => {
                  onSelect(font);
                  setOpen(false);
                  setQuery("");
                }}
                className={`w-full text-left px-4 py-3 hover:bg-[var(--color-bg-tertiary)] transition-colors
                  ${selected?.id === font.id ? "bg-[var(--color-bg-tertiary)]" : ""}`}
              >
                <div className="text-sm font-medium">{font.family}</div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  {CATEGORY_LABELS[font.category]} · {font.variants.length} weights
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/FontSelector.tsx
git commit -m "feat: add FontSelector searchable dropdown component"
```

---

### Task 5: PairPreview Component

**Files:**
- Create: `components/PairPreview.tsx`

Reference: `components/FontPreview.tsx` for font loading pattern.

- [ ] **Step 1: Create PairPreview**

```tsx
// components/PairPreview.tsx
"use client";

import { useState } from "react";
import { FontPreview } from "./FontPreview";

type PairPreviewProps = {
  headingFamily: string;
  bodyFamily: string;
};

const DEFAULT_HEADING = "The quick brown fox jumps over the lazy dog";
const DEFAULT_BODY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export function PairPreview({ headingFamily, bodyFamily }: PairPreviewProps) {
  const [headingText, setHeadingText] = useState(DEFAULT_HEADING);
  const [bodyText, setBodyText] = useState(DEFAULT_BODY);

  return (
    <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl p-8 lg:p-12">
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setHeadingText(e.currentTarget.textContent || DEFAULT_HEADING)}
        className="text-3xl lg:text-4xl mb-6 outline-none"
        style={{ fontFamily: `"${headingFamily}", sans-serif`, fontWeight: 700 }}
      >
        {headingText}
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setBodyText(e.currentTarget.textContent || DEFAULT_BODY)}
        className="text-base leading-relaxed text-[var(--color-text-secondary)] outline-none"
        style={{ fontFamily: `"${bodyFamily}", sans-serif`, fontWeight: 400 }}
      >
        {bodyText}
      </div>
      <FontPreview family={headingFamily} text="" weight={700} weights={[700]} className="hidden" />
      <FontPreview family={bodyFamily} text="" weight={400} weights={[400]} className="hidden" />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/PairPreview.tsx
git commit -m "feat: add PairPreview component for heading + body preview"
```

---

### Task 6: AiRationale Component

**Files:**
- Create: `components/AiRationale.tsx`

- [ ] **Step 1: Create AiRationale**

```tsx
// components/AiRationale.tsx
"use client";

type AiRationaleProps = {
  rationale: string | null;
  loading: boolean;
};

export function AiRationale({ rationale, loading }: AiRationaleProps) {
  if (!loading && !rationale) return null;

  return (
    <div className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">✦</span>
        <span className="text-sm font-semibold">AI Rationale</span>
      </div>
      {loading ? (
        <div className="space-y-2">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-3/4 rounded" />
        </div>
      ) : (
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed animate-in">
          {rationale}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add animation keyframe to globals.css**

Add to `app/globals.css` after the existing `.skeleton` block:

```css
.animate-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 3: Commit**

```bash
git add components/AiRationale.tsx app/globals.css
git commit -m "feat: add AiRationale component with loading/content states"
```

---

### Task 7: PairSuggestions Component

**Files:**
- Create: `components/PairSuggestions.tsx`

- [ ] **Step 1: Create PairSuggestions**

```tsx
// components/PairSuggestions.tsx
"use client";

import { PairSuggestion } from "@/lib/pairing";
import { CATEGORY_LABELS } from "@/lib/types";

type PairSuggestionsProps = {
  suggestions: PairSuggestion[];
  selectedId: string | null;
  onSelect: (suggestion: PairSuggestion) => void;
  primaryFamily: string;
};

export function PairSuggestions({
  suggestions,
  selectedId,
  onSelect,
  primaryFamily,
}: PairSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div>
      <div className="text-sm text-[var(--color-text-muted)] mb-3">
        Suggestions for <strong className="text-[var(--color-text-primary)]">{primaryFamily}</strong>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {suggestions.map((s) => (
          <button
            key={s.font.id}
            onClick={() => onSelect(s)}
            className={`min-w-[160px] shrink-0 text-left rounded-lg p-3 border transition-colors
              ${
                selectedId === s.font.id
                  ? "bg-[var(--color-bg-tertiary)] border-[var(--color-text-secondary)]"
                  : "bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
              }`}
          >
            <div className="text-sm font-semibold truncate">{s.font.family}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">
              {CATEGORY_LABELS[s.font.category]} · {s.role} · {s.score}pts
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/PairSuggestions.tsx
git commit -m "feat: add PairSuggestions horizontal scrollable row"
```

---

### Task 8: PairPlayground Component

**Files:**
- Create: `components/PairPlayground.tsx`

- [ ] **Step 1: Create PairPlayground**

```tsx
// components/PairPlayground.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Font } from "@/lib/types";
import { getPairSuggestions, PairSuggestion } from "@/lib/pairing";
import { FontSelector } from "./FontSelector";
import { PairPreview } from "./PairPreview";
import { AiRationale } from "./AiRationale";
import { PairSuggestions } from "./PairSuggestions";

type PairPlaygroundProps = {
  fonts: Font[];
  initialHeadingId?: string;
  initialBodyId?: string;
};

export function PairPlayground({
  fonts,
  initialHeadingId,
  initialBodyId,
}: PairPlaygroundProps) {
  const findFont = (id?: string) => (id ? fonts.find((f) => f.id === id) ?? null : null);

  const [heading, setHeading] = useState<Font | null>(findFont(initialHeadingId));
  const [body, setBody] = useState<Font | null>(findFont(initialBodyId));
  const [suggestions, setSuggestions] = useState<PairSuggestion[]>([]);
  const [rationale, setRationale] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [allRationales, setAllRationales] = useState<Record<string, string>>({});

  // Primary font is whichever was selected first or heading
  const primary = heading;

  // Compute suggestions when heading changes
  useEffect(() => {
    if (!primary) {
      setSuggestions([]);
      return;
    }
    const results = getPairSuggestions(primary, fonts);
    setSuggestions(results);

    // Auto-select first suggestion as body if no body selected
    if (!body && results.length > 0) {
      setBody(results[0].font);
    }
  }, [primary, fonts]);

  // Fetch AI rationale when suggestions are ready
  const fetchRationale = useCallback(async () => {
    if (!heading || !body || suggestions.length === 0) return;

    setAiLoading(true);
    setRationale(null);

    try {
      const res = await fetch("/api/pair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primary: heading.family,
          suggestions: suggestions.slice(0, 6).map((s) => s.font.family),
          primaryCategory: heading.category,
        }),
      });

      if (res.status === 501) {
        // No API key configured
        setAiLoading(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setAllRationales(data.rationales ?? {});
        setRationale(data.rationales?.[body.family] ?? null);

        // Append extraSuggestions from AI to the suggestions row
        if (data.extraSuggestions?.length) {
          const extraFonts: PairSuggestion[] = data.extraSuggestions
            .map((extra: { family: string; rationale: string }) => {
              const found = fonts.find(
                (f) => f.family.toLowerCase() === extra.family.toLowerCase()
              );
              if (!found || suggestions.some((s) => s.font.id === found.id)) return null;
              return { font: found, score: 0, role: "Body" as const };
            })
            .filter(Boolean) as PairSuggestion[];
          if (extraFonts.length > 0) {
            setSuggestions((prev) => [...prev, ...extraFonts]);
          }
        }
      }
    } catch {
      // Silently fail — AI is progressive enhancement
    } finally {
      setAiLoading(false);
    }
  }, [heading, body, suggestions.length]);

  useEffect(() => {
    fetchRationale();
  }, [fetchRationale]);

  const handleSwap = () => {
    setHeading(body);
    setBody(heading);
  };

  const handleSuggestionSelect = (s: PairSuggestion) => {
    setBody(s.font);
    // Update rationale from cached AI response
    setRationale(allRationales[s.font.family] ?? null);
  };

  return (
    <div className="space-y-6">
      {/* Font selectors */}
      <div className="flex items-end gap-4">
        <FontSelector
          label="Heading Font"
          fonts={fonts}
          selected={heading}
          onSelect={setHeading}
        />
        <button
          onClick={handleSwap}
          className="shrink-0 mb-1 p-2 rounded-lg border border-[var(--color-border)]
            text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
            hover:border-[var(--color-text-muted)] transition-colors"
          aria-label="Swap fonts"
        >
          ⇄
        </button>
        <FontSelector
          label="Body Font"
          fonts={fonts}
          selected={body}
          onSelect={setBody}
        />
      </div>

      {/* Preview */}
      {heading && body && (
        <PairPreview
          headingFamily={heading.family}
          bodyFamily={body.family}
        />
      )}

      {/* AI Rationale */}
      {heading && body && (
        <AiRationale rationale={rationale} loading={aiLoading} />
      )}

      {/* Suggestions */}
      {heading && (
        <PairSuggestions
          suggestions={suggestions}
          selectedId={body?.id ?? null}
          onSelect={handleSuggestionSelect}
          primaryFamily={heading.family}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/PairPlayground.tsx
git commit -m "feat: add PairPlayground orchestrator component"
```

---

### Task 9: Pair Page

**Files:**
- Create: `app/pair/page.tsx`
- Create: `app/pair/PairClient.tsx`

- [ ] **Step 1: Create the server page**

```tsx
// app/pair/page.tsx
import { Metadata } from "next";
import { getAllFonts } from "@/lib/fonts";
import { PairClient } from "./PairClient";

export const metadata: Metadata = {
  title: "Pair Fonts — Foracle",
  description: "Find the perfect font pairing with AI-powered suggestions",
  openGraph: {
    title: "Pair Fonts — Foracle",
    description: "Find the perfect font pairing with AI-powered suggestions",
  },
};

export default function PairPage() {
  const fonts = getAllFonts();
  return <PairClient fonts={fonts} />;
}
```

- [ ] **Step 2: Create the client component**

```tsx
// app/pair/PairClient.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Font } from "@/lib/types";
import { Header } from "@/components/Header";
import { PairPlayground } from "@/components/PairPlayground";

function PairContent({ fonts }: { fonts: Font[] }) {
  const searchParams = useSearchParams();
  const headingId = searchParams.get("heading") ?? undefined;
  const bodyId = searchParams.get("body") ?? undefined;

  return (
    <PairPlayground
      fonts={fonts}
      initialHeadingId={headingId}
      initialBodyId={bodyId}
    />
  );
}

type PairClientProps = {
  fonts: Font[];
};

export function PairClient({ fonts }: PairClientProps) {
  return (
    <>
      <Header showSearch={false} />
      <main id="main-content" className="px-6 lg:px-10">
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Pair Fonts
          </h1>
          <p className="mt-3 text-[var(--color-text-muted)] text-base">
            Find the perfect combination for your next project
          </p>
        </section>

        <section className="pb-16">
          <Suspense>
            <PairContent fonts={fonts} />
          </Suspense>
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify page renders**

Run: `npm run dev`
Open: `http://localhost:3000/pair`
Expected: Page renders with two font selectors, no errors in console

- [ ] **Step 4: Commit**

```bash
git add app/pair/page.tsx app/pair/PairClient.tsx
git commit -m "feat: add /pair page with playground"
```

---

### Task 10: Update Header Navigation

**Files:**
- Modify: `components/Header.tsx`

- [ ] **Step 1: Add nav links to Header**

In `components/Header.tsx`, replace the current header content div. The `Link` import already exists. Add `usePathname` import and navigation links:

Replace the content inside the `<div>` after `<header>`:

```tsx
// At top, add usePathname import:
import { usePathname } from "next/navigation";

// Inside the component, add:
const pathname = usePathname();

// Replace the inner div content with:
<div className="px-6 lg:px-10 h-14 flex items-center gap-6">
  <Link
    href="/"
    className="text-lg font-bold text-[var(--color-text-primary)] shrink-0"
  >
    Foracle
  </Link>

  <nav className="flex items-center gap-4">
    <Link
      href="/"
      className={`text-sm transition-colors ${
        pathname === "/"
          ? "text-[var(--color-text-primary)]"
          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
      }`}
    >
      Explore
    </Link>
    <Link
      href="/pair"
      className={`text-sm transition-colors ${
        pathname === "/pair"
          ? "text-[var(--color-text-primary)]"
          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
      }`}
    >
      Pair
    </Link>
  </nav>

  <div className="flex-1" />

  {showSearch && onSearch && (
    <div className="max-w-sm">
      <SearchBar onSearch={onSearch} />
    </div>
  )}

  <ThemeToggle />
</div>
```

- [ ] **Step 2: Verify both pages show correct active state**

Run: `npm run dev`
Check: `http://localhost:3000/` — "Explore" link is white, "Pair" is muted
Check: `http://localhost:3000/pair` — "Pair" link is white, "Explore" is muted

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: add Explore/Pair navigation links to header"
```

---

### Task 11: PairSection for Detail Page

**Files:**
- Create: `components/PairSection.tsx`
- Modify: `app/font/[id]/FontDetailClient.tsx`
- Modify: `app/font/[id]/page.tsx`

- [ ] **Step 1: Create PairSection component**

```tsx
// components/PairSection.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Font, CATEGORY_LABELS } from "@/lib/types";
import { getPairSuggestions, PairSuggestion } from "@/lib/pairing";
import { FontPreview } from "./FontPreview";

type PairSectionProps = {
  font: Font;
  allFonts: Font[];
};

export function PairSection({ font, allFonts }: PairSectionProps) {
  const [rationales, setRationales] = useState<Record<string, string>>({});
  const [aiLoading, setAiLoading] = useState(false);

  const suggestions = useMemo(
    () => getPairSuggestions(font, allFonts),
    [font, allFonts]
  );

  // Fetch AI rationales once suggestions are computed
  useEffect(() => {
    if (suggestions.length === 0) return;

    let cancelled = false;
    setAiLoading(true);

    (async () => {
      try {
        const res = await fetch("/api/pair", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            primary: font.family,
            suggestions: suggestions.map((s) => s.font.family),
            primaryCategory: font.category,
          }),
        });

        if (res.ok && !cancelled) {
          const data = await res.json();
          setRationales(data.rationales ?? {});
        }
      } catch {
        // Silent fail
      } finally {
        if (!cancelled) setAiLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [font, suggestions]);

  if (suggestions.length === 0) return null;

  return (
    <section className="py-8 border-t border-[var(--color-border)]">
      <h2 className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
        Pairs well with
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {suggestions.map((s) => {
          const pairUrl =
            s.role === "Heading"
              ? `/pair?heading=${s.font.id}&body=${font.id}`
              : `/pair?heading=${font.id}&body=${s.font.id}`;

          return (
            <div
              key={s.font.id}
              className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-4"
            >
              <FontPreview
                family={s.font.family}
                text={s.font.family}
                weight={600}
                weights={[600]}
                className="text-lg font-semibold mb-2"
              />
              {(aiLoading || rationales[s.font.family]) && (
                <div className="mb-2">
                  {aiLoading && !rationales[s.font.family] ? (
                    <div className="space-y-1">
                      <div className="skeleton h-3 w-full rounded" />
                      <div className="skeleton h-3 w-2/3 rounded" />
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {rationales[s.font.family]}
                    </p>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span>
                  {CATEGORY_LABELS[s.font.category]} · {s.role}
                </span>
                <Link
                  href={pairUrl}
                  className="text-[var(--color-text-primary)] hover:underline"
                >
                  Try pair →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update FontDetailClient to include PairSection**

In `app/font/[id]/FontDetailClient.tsx`:

Add import at top:
```tsx
import { PairSection } from "@/components/PairSection";
```

Update the Props type:
```tsx
type Props = { font: Font; allFonts: Font[] };
```

Update function signature:
```tsx
export function FontDetailClient({ font, allFonts }: Props) {
```

Add `<PairSection>` before the closing `</main>`:
```tsx
        <PairSection font={font} allFonts={allFonts} />
      </main>
```

- [ ] **Step 3: Update page.tsx to pass allFonts**

In `app/font/[id]/page.tsx`, modify `FontPage` to pass all fonts:

```tsx
export default async function FontPage({ params }: Props) {
  const { id } = await params;
  const font = getFontById(id);
  if (!font) notFound();
  const allFonts = getAllFonts();
  return <FontDetailClient font={font} allFonts={allFonts} />;
}
```

- [ ] **Step 4: Verify detail page shows pairing section**

Run: `npm run dev`
Open: `http://localhost:3000/font/inter`
Expected: "Pairs well with" section appears with suggestion cards

- [ ] **Step 5: Commit**

```bash
git add components/PairSection.tsx app/font/[id]/FontDetailClient.tsx app/font/[id]/page.tsx
git commit -m "feat: add Pairs well with section to font detail page"
```

---

### Task 12: Build Verification

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Verify pages work**

Run: `npm run dev`
Check all entry points:
- `http://localhost:3000/` — home with Explore/Pair nav
- `http://localhost:3000/pair` — playground with font selectors
- `http://localhost:3000/pair?heading=playfair-display&body=inter` — deep link
- `http://localhost:3000/font/inter` — detail page with "Pairs well with" section

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address build issues"
```
