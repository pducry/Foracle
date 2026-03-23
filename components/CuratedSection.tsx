"use client";

import { useState } from "react";
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
  rising: "bg-emerald-500/20 text-emerald-300",
  classic: "bg-amber-500/20 text-amber-300",
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
    <Link
      href={`/font/${font.id}`}
      className="group block rounded-xl border border-[var(--color-border)]
        hover:border-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]
        transition-all overflow-hidden"
    >
      {/* Font preview */}
      <div className="px-6 pt-8 pb-6 min-h-[160px] flex items-center justify-center">
        <FontPreview
          family={font.family}
          text={font.family}
          weight={weight}
          className="text-3xl lg:text-4xl text-center"
        />
      </div>

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
      </div>
    </Link>
  );
}

function CategoryRow({
  category,
  fonts,
}: {
  category: CuratedCategory;
  fonts: Font[];
}) {
  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold">{category.title}</h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{category.description}</p>
        </div>
        <span className="text-xs text-[var(--color-text-muted)]">{category.fonts.length} picks</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3">
        {category.fonts.map((curated) => {
          const font = fonts.find((f) => f.id === curated.id);
          if (!font) return null;
          return (
            <div key={curated.id} className="min-w-[280px] max-w-[320px] shrink-0">
              <CuratedCard font={font} curated={curated} />
            </div>
          );
        })}
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
    <section className="py-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Editor's Picks</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Best Free Fonts</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1 max-w-xl">
            Community-validated picks based on real designer usage, GitHub adoption, and typographic quality.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-8">
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
      <div className="space-y-10">
        {visibleCategories.map((category) => (
          <CategoryRow key={category.id} category={category} fonts={fonts} />
        ))}
      </div>
    </section>
  );
}
