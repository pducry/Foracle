"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Font, CATEGORY_LABELS } from "@/lib/types";
import { CURATED, CuratedCategory, CuratedFont } from "@/lib/curated";
import { FontPreview } from "./FontPreview";

type CuratedSectionProps = {
  fonts: Font[];
};

function getDefaultWeight(font: Font): number {
  const numericWeights = font.variants
    .map((v) => parseInt(v.replace("italic", ""), 10))
    .filter((w) => !isNaN(w));
  if (numericWeights.includes(400)) return 400;
  return numericWeights[0] ?? 400;
}

const TIER_COLORS: Record<string, string> = {
  essential: "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]",
  rising: "bg-[var(--color-tag-rising-bg)] text-[var(--color-tag-rising-text)]",
  classic: "bg-[var(--color-tag-classic-bg)] text-[var(--color-tag-classic-text)]",
};

function CuratedCard({
  font,
  curated,
}: {
  font: Font;
  curated: CuratedFont;
}) {
  const weight = getDefaultWeight(font);

  return (
    <div
      className="group rounded-xl border border-[var(--color-border)]
        hover:border-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]
        transition-all overflow-hidden"
    >
      <Link href={`/font/${font.id}`} className="block">
        {/* Font preview */}
        <div className="px-8 py-6 min-h-[120px] flex items-center justify-center">
          <FontPreview
            family={font.family}
            text={font.family}
            weight={weight}
            className="text-3xl lg:text-4xl text-center"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="px-6 pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${TIER_COLORS[curated.tier]}`}>
            {curated.badge}
          </span>
          {font.variable && (
            <span className="px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
              Variable
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{font.family}</span>
          <span className="text-[var(--color-text-muted)]">·</span>
          <span className="text-[var(--color-text-muted)]">{CATEGORY_LABELS[font.category]}</span>
          <span className="text-[var(--color-text-muted)]">·</span>
          <span className="text-[var(--color-text-muted)]">{font.variants.length} styles</span>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{curated.reason}</p>
        <div className="flex items-center gap-2 pt-1">
          <a
            href={`https://fonts.google.com/specimen/${font.family.replace(/ /g, "+")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded text-xs uppercase tracking-wider
              border border-[var(--color-border)] text-[var(--color-text-muted)]
              hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)]
              transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Get
          </a>
          <Link
            href={`/pair?heading=${font.id}`}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs uppercase tracking-wider
              border border-[var(--color-border)] text-[var(--color-text-muted)]
              hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)]
              transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4z" />
              <path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4z" />
            </svg>
            Pair
          </Link>
        </div>
      </div>
    </div>
  );
}

const MOBILE_VISIBLE = 2;

function CategoryRow({
  category,
  fonts,
}: {
  category: CuratedCategory;
  fonts: Font[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const resolvedFonts = category.fonts
    .map((curated) => {
      const font = fonts.find((f) => f.id === curated.id);
      return font ? { font, curated } : null;
    })
    .filter(Boolean) as { font: Font; curated: CuratedFont }[];

  const visibleFonts = isMobile && !expanded
    ? resolvedFonts.slice(0, MOBILE_VISIBLE)
    : resolvedFonts;
  const hasMore = isMobile && !expanded && resolvedFonts.length > MOBILE_VISIBLE;

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold">{category.title}</h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{category.description}</p>
        </div>
        <span className="text-xs text-[var(--color-text-muted)]">{category.fonts.length} picks</span>
      </div>

      {/* Mobile: stacked vertically */}
      <div className="flex flex-col gap-3 sm:hidden">
        {visibleFonts.map(({ font, curated }) => (
          <CuratedCard key={curated.id} font={font} curated={curated} />
        ))}
        {hasMore && (
          <button
            onClick={() => setExpanded(true)}
            className="mx-auto px-5 py-2 rounded-lg text-xs font-medium
              border border-[var(--color-border)] text-[var(--color-text-muted)]
              hover:text-[var(--color-text-primary)] transition-colors"
          >
            Ver mais ({resolvedFonts.length - MOBILE_VISIBLE} restantes)
          </button>
        )}
      </div>

      {/* Desktop: horizontal scroll */}
      <div className="hidden sm:flex gap-4 overflow-x-auto pb-3">
        {resolvedFonts.map(({ font, curated }) => (
          <div key={curated.id} className="min-w-[400px] max-w-[480px] shrink-0">
            <CuratedCard font={font} curated={curated} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CuratedSection({ fonts }: CuratedSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const visibleCategories = activeCategory
    ? CURATED.filter((c) => c.id === activeCategory)
    : CURATED;

  return (
    <section className="py-8 sm:py-10">
      {/* Section title */}
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Editor&apos;s Picks
        </h2>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[var(--color-text-muted)]">
          Community-validated fonts by category
        </p>
      </div>

      {/* Category filter — wraps on mobile */}
      <div className="flex gap-2 mb-6 sm:mb-8 justify-center flex-wrap px-2 sm:px-0">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeCategory === null
              ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]"
              : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          All
        </button>
        {CURATED.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]"
                : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-8 sm:space-y-10">
        {visibleCategories.map((category) => (
          <CategoryRow key={category.id} category={category} fonts={fonts} />
        ))}
      </div>
    </section>
  );
}
