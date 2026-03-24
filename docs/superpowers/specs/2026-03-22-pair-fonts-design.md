# Pair Fonts — Design Spec

**Date:** 2026-03-22
**Status:** Approved
**Project:** Foracle — The Font Oracle

## Overview

Add a font pairing feature to Foracle that helps users discover which fonts work well together. The system combines instant client-side suggestions (based on typographic rules) with AI-generated rationales (via Claude API) that explain *why* a pairing works.

Two entry points: a dedicated `/pair` playground page and a "Pairs well with" section on each font's detail page.

## Architecture

**Approach:** Client-Side Rules + Server API Route for AI (progressive enhancement).

Suggestions appear instantly via typographic scoring rules running in the browser. A Next.js Route Handler calls the Claude API in the background to enrich suggestions with rationales. If no API key is configured, the feature works without rationales — graceful degradation.

## Pairing Rules Engine — `lib/pairing.ts`

Pure function, no side effects.

**Scoring (per candidate font):**

| Rule | Points | Logic |
|------|--------|-------|
| Category contrast | +3 | serif ↔ sans-serif, display ↔ monospace, handwriting ↔ sans-serif |
| Same category, different family | +1 | Two sans-serifs with distinct personalities |
| Weight complement | +2 | If primary has few weights, prefer candidates with wide weight range |
| Subset compatibility | +1 | Both fonts support the same subsets (latin, cyrillic, etc.) |
| Popularity boost | +1 | More popular fonts get slight preference |

**Output:** Given a font, returns top 6 suggestions sorted by score descending. Tiebreaker: popularity (lower number = more popular = ranked first).

**Roles:** Each suggestion includes a role assignment:
- `display`, `handwriting` → "Heading"
- `sans-serif`, `serif` → "Body"
- `monospace` → "Code"

Role is assigned relative to the primary font: if the primary is already a heading-type font, suggestions are biased toward body/code roles.

**API:**
```ts
type PairSuggestion = {
  font: Font;
  score: number;
  role: "Heading" | "Body" | "Code";
};

function getPairSuggestions(primary: Font, allFonts: Font[]): PairSuggestion[];
```

## AI Route — `POST /api/pair`

Next.js Route Handler at `app/api/pair/route.ts`.

**Request:**
```json
{
  "primary": "Inter",
  "suggestions": ["Playfair Display", "Lora", "Merriweather"],
  "primaryCategory": "sans-serif"
}
```

**Response:**
```json
{
  "rationales": {
    "Playfair Display": "Contraste clássico entre a geometria clean da Inter e as serifas elegantes da Playfair...",
    "Lora": "...",
    "Merriweather": "..."
  },
  "extraSuggestions": [
    { "family": "Source Serif Pro", "rationale": "..." }
  ]
}
```

**Behavior:**
- If `ANTHROPIC_API_KEY` is not set in `.env.local`, returns `501 Not Configured`
- Client treats 501 as "no AI available" and shows suggestions without rationales
- Model: `claude-haiku-4-5-20251001` (fast, low cost)
- Prompt sends the primary font + top suggestions from rules, asks for 2-3 sentence rationales + up to 2 extra suggestions the rules may have missed
- `extraSuggestions` from the AI response are appended to the end of the suggestions row in the UI

## Pages and Navigation

### Header Update

Add navigation links next to the logo:
- **Explore** — links to `/` (home)
- **Pair** — links to `/pair`

Search bar and theme toggle remain on the right.

### Page: `/pair` — Playground

Full-width layout with:

1. **Two font selectors** — side by side, labeled "Heading Font" and "Body Font". Each is a searchable dropdown. Swap button (⇄) between them.
2. **Preview area** — large card showing heading text in font A and body text in font B. Default sample text, editable.
3. **AI Rationale card** — appears below preview. States: loading (shimmer), empty (no API key), content (rationale text). Animated entry.
4. **Suggestions row** — horizontal scrollable row of suggestion cards showing font name, category, and score. Clicking a card selects it as the secondary font.

**URL state:** `/pair?heading=playfair-display&body=inter` — supports deep linking and "Try pair" links from detail page.

**Flow:**
1. User selects font A → `lib/pairing.ts` calculates top 6 instantly
2. First suggestion auto-selected as font B
3. Background `POST /api/pair` fires
4. AI rationale animates in when response arrives
5. User can manually change font B via selector or by clicking a suggestion

### Font Detail Page — "Pairs well with" Section

Added below existing content on `/font/[id]`:

- Section header: "Pairs well with"
- 3-column grid of suggestion cards
- Each card shows: font name (rendered in that font), short rationale (from AI or empty), category, role, and "Try pair →" link
- "Try pair" navigates to `/pair?heading=X&body=Y`
- Same progressive enhancement: suggestions load instantly, rationales arrive from AI in background

## New Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `PairPlayground` | Main playground orchestrator — manages state, triggers scoring + AI | `components/PairPlayground.tsx` |
| `FontSelector` | Searchable font dropdown with preview | `components/FontSelector.tsx` |
| `PairPreview` | Text preview with heading + body fonts applied | `components/PairPreview.tsx` |
| `AiRationale` | Card showing AI rationale with loading/empty/content states | `components/AiRationale.tsx` |
| `PairSuggestions` | Horizontal scrollable row of suggestion cards | `components/PairSuggestions.tsx` |
| `PairSection` | "Pairs well with" section for detail page | `components/PairSection.tsx` |

## New Files

| File | Purpose |
|------|---------|
| `lib/pairing.ts` | Scoring rules engine (pure functions) |
| `app/api/pair/route.ts` | Route Handler — Claude API integration |
| `app/pair/page.tsx` | Server component — loads fonts, renders PairClient |
| `app/pair/PairClient.tsx` | Client component — playground with state management |

## Dependencies

- `@anthropic-ai/sdk` — Anthropic SDK for Claude API calls (new dependency)

## Configuration

- `ANTHROPIC_API_KEY` in `.env.local` — optional, enables AI rationales when present
